import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import type { MessageContentComplex } from "@langchain/core/messages";
import * as path from "path";
import * as fs from "fs";

let cachedVectorStore: MemoryVectorStore | null = null;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // Load documents from JSON
    const docsPath = path.join(
      process.cwd(),
      "data/vectorstore/documents.json"
    );

    if (!fs.existsSync(docsPath)) {
      return Response.json(
        { error: "Vector store not found. Please run: npm run ingest" },
        { status: 500 }
      );
    }

    const docsData = JSON.parse(fs.readFileSync(docsPath, "utf-8"));

    // Create vector store if not cached
    if (!cachedVectorStore) {
      console.log("⏳ Building vector store...");

      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY!,
        model: "text-embedding-004",
      });

      cachedVectorStore = await MemoryVectorStore.fromDocuments(
        docsData,
        embeddings
      );

      console.log("✅ Vector store ready");
    }

    // Search for relevant documents
    const relevantDocs = await cachedVectorStore.similaritySearch(message, 3);

    if (relevantDocs.length === 0) {
      return Response.json({
        response: "I couldn't find relevant information in the PDF.",
        sources: 0,
      });
    }

    const context = relevantDocs
      .map((doc: Document) => doc.pageContent)
      .join("\n\n---\n\n");

    // Initialize Gemini model
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
      model:"gemini-2.5-flash",
      temperature: 0.3,
      maxOutputTokens: 500,
    });

    // Create prompt and invoke directly (simpler, more reliable)
    const prompt = `You are a helpful assistant. Answer questions ONLY based on this context. If the answer is not in the context, say "I don't have that information."

Context:
${context}

Question: ${message}

Answer:`;

    const result = await model.invoke(prompt);

    // Extract text from result
    const responseText =
      typeof result.content === "string"
        ? result.content
        : Array.isArray(result.content)
          ? result.content
              .map((c: MessageContentComplex) =>
                typeof c === "string" ? c : ("text" in c ? c.text : JSON.stringify(c))
              )
              .join("")
          : JSON.stringify(result.content);

    return Response.json({
      response: responseText,
      sources: relevantDocs.length,
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}