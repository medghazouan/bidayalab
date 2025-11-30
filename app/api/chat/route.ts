interface Message {
  role: 'user' | 'assistant';
  content: string;
}

import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getVectorStore } from "@/lib/vectorStore";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Document } from "@langchain/core/documents";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, history } = body;

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Validate API keys
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    console.log("Question:", question);

    // Initialize vector store and retriever
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever({
      k: 3,
      searchType: "similarity",
    });

    // Retrieve relevant documents
    const docs = await retriever.invoke(question);
    console.log(`Found ${docs.length} relevant documents`);

    // Initialize Gemini Flash
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.7,
      maxOutputTokens: 2048,
    });

    // Create context from retrieved documents
    const formatDocs = (docs: Document[]) => {
      return docs
        .map((doc, i) => `[Document ${i + 1}]:\n${doc.pageContent}`)
        .join("\n\n");
    };

    // Enhanced prompt for better structured responses
    const prompt = ChatPromptTemplate.fromTemplate(`
You are BidayaLab's professional AI assistant. Answer questions clearly using the provided context.

FORMATTING RULES (IMPORTANT):
• Use bullet points (•) for lists of items
• Add blank lines between paragraphs for readability
• Keep answers concise (2-4 sentences or 3-5 bullet points)
• Use this structure: Brief intro → Details (as bullets if multiple items) → Short conclusion
• For services/features: list them as bullet points
• For locations/contact: mention clearly
• Be friendly but professional

EXAMPLE FORMAT:
BidayaLab offers three main services:

• Web Development - Fast, responsive websites with React & Next.js
• Digital Marketing - Facebook and Google advertising campaigns  
• Branding - Logo design and comprehensive visual identity

We're based in Marrakech and serve clients worldwide.

Context:
{context}

{history}

Question: {question}

Well-structured Answer:`);

    // Format conversation history
    const historyText = history && history.length > 0
      ? "Previous conversation:\n" + (history as Message[]).map((msg) =>
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join("\n")
      : "";

    // Create RAG chain
    const chain = RunnableSequence.from([
      {
        context: () => formatDocs(docs),
        question: (input: { question: string }) => input.question,
        history: () => historyText,
      },
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    // Get answer
    const answer = await chain.invoke({ question });
    console.log("Answer generated successfully");

    // Prepare source documents
    const sources = docs.map((doc, i) => ({
      id: i + 1,
      content: doc.pageContent.substring(0, 200) + "...",
      source: doc.metadata.source || "Unknown",
      metadata: doc.metadata,
    }));

    return NextResponse.json({
      answer,
      sources,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process question';
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Handle specific error types
    if (error instanceof Error && error.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid API key configuration" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    );
  }
}
