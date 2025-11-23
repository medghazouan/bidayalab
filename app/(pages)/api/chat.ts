// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import * as path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: 'text-embedding-004',
    });

    // Load vector store
    const vectorStorePath = path.join(process.cwd(), 'vectorstore');
    const vectorStore = await FaissStore.load(vectorStorePath, embeddings);

    // Search for relevant context
    const relevantDocs = await vectorStore.similaritySearch(message, 3);
    const context = relevantDocs
      .map((doc, idx) => `[Source ${idx + 1}]\n${doc.pageContent}`)
      .join('\n\n---\n\n');

    // Create prompt
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a helpful assistant. Answer questions based ONLY on the provided context.

Rules:
- If the answer is not in the context, say "I don't have that information."
- Be concise and accurate
- Only use information from the context

Context:
{context}`,
      ],
      ['human', '{question}'],
    ]);

    // Initialize Gemini
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: 'gemini-1.5-flash-latest',
      temperature: 0.3,
      maxOutputTokens: 500,
    });

    // Create chain
    const chain = RunnableSequence.from([
      promptTemplate,
      model,
      new StringOutputParser(),
    ]);

    // Get response
    const response = await chain.invoke({
      context: context,
      question: message,
    });

    return res.status(200).json({
      response: response.trim(),
      sources: relevantDocs.length,
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    if (error instanceof Error && error.message?.includes('vector store')) {
      return res.status(500).json({ 
        error: 'Please run: npm run ingest' 
      });
    }

    return res.status(500).json({ 
      error: 'Something went wrong' 
    });
  }
}