import { Index } from "@upstash/vector";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";

// Singleton pattern for embeddings
let embeddingsInstance: HuggingFaceInferenceEmbeddings | null = null;

export const getEmbeddings = () => {
  if (!embeddingsInstance) {
    if (!process.env.HUGGINGFACEHUB_API_KEY) {
      throw new Error("HUGGINGFACEHUB_API_KEY is not set");
    }
    
    embeddingsInstance = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACEHUB_API_KEY,
      model: "sentence-transformers/all-MiniLM-L6-v2",
    });
  }
  
  return embeddingsInstance;
};

// Initialize Upstash Vector Store
export const getVectorStore = async () => {
  if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
    throw new Error("Upstash Vector credentials are not set");
  }

  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  const embeddings = getEmbeddings();

  return new UpstashVectorStore(embeddings, {
    index,
    namespace: "chatbot-docs", // Organize by namespace
  });
};
