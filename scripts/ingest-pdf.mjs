import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function ingestPDF() {
  try {
    console.log("🚀 Starting PDF ingestion...\n");

    // Load PDF
    console.log("📄 Loading PDF...");
    const loader = new PDFLoader("data/document.pdf");
    const docs = await loader.load();
    console.log(`✅ Loaded ${docs.length} pages\n`);

    // Split text
    console.log("✂️  Splitting text...");
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(docs);
    console.log(`✅ Created ${splitDocs.length} chunks\n`);

    // Save documents to JSON
    console.log("💾 Saving documents...");
    const vectorStoreDir = "data/vectorstore";
    
    if (!fs.existsSync(vectorStoreDir)) {
      fs.mkdirSync(vectorStoreDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(vectorStoreDir, "documents.json"),
      JSON.stringify(splitDocs, null, 2)
    );

    console.log("✅ Vector store saved!\n");
    console.log(`📊 Summary:`);
    console.log(`   - Pages: ${docs.length}`);
    console.log(`   - Chunks: ${splitDocs.length}`);
    console.log(`   - Location: ${vectorStoreDir}/documents.json`);
  } catch (error) {
    console.error("💥 Error:", error.message);
    process.exit(1);
  }
}

ingestPDF();
