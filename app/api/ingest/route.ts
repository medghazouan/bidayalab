import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getVectorStore } from "@/lib/vectorStore";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // Required for file system access
export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: Request) {
  try {
    // Optional: Add authentication check here
    // const authorized = checkAuth(request);
    // if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const docsDir = path.join(process.cwd(), "docs");
    
    // Create docs directory if it doesn't exist
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
      return NextResponse.json(
        { 
          error: "Docs directory created. Please add markdown files to the 'docs' folder.",
          created: true 
        },
        { status: 404 }
      );
    }

    // Read all markdown files
    const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No markdown files found in docs directory" },
        { status: 404 }
      );
    }

    console.log(`Found ${files.length} markdown files`);

    // Load documents
    const documents = files.map((file) => {
      const filePath = path.join(docsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      
      return {
        pageContent: content,
        metadata: { 
          source: file,
          type: "markdown",
          timestamp: new Date().toISOString()
        },
      };
    });

    // Split documents into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800,
      chunkOverlap: 100,
      separators: ["\n## ", "\n### ", "\n#### ", "\n\n", "\n", " ", ""],
    });

    const chunks = await splitter.splitDocuments(documents);
    console.log(`Split into ${chunks.length} chunks`);

    // Store in Upstash Vector
    const vectorStore = await getVectorStore();
    
    // Process in batches to avoid timeout
    const batchSize = 50;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      await vectorStore.addDocuments(batch);
      console.log(`Processed batch ${Math.floor(i / batchSize) + 1}`);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ingested ${files.length} files into ${chunks.length} chunks`,
      files: files,
      chunks: chunks.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to ingest documents';
        const errorStack = error instanceof Error ? error.stack : undefined;
        
        console.error("Ingestion error:", error);
        return NextResponse.json(
            {
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? errorStack : undefined
            },
            { status: 500 }
        );
    }
}

// Optional: GET endpoint to check ingestion status
export async function GET() {
  try {
    const docsDir = path.join(process.cwd(), "docs");
    
    if (!fs.existsSync(docsDir)) {
      return NextResponse.json({ exists: false, files: [] });
    }

    const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));
    
    return NextResponse.json({
      exists: true,
      files: files,
      count: files.length,
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
    );
    }
}
