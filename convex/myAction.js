import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText:v.any(),
    fileId:v.string()
  },
  handler: async (ctx , args) => {

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey:process.env.GOOGLE_API_KEY, // You need to add your API key
      modelName: "embedding-001", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title:"Document title"
    });
    
    await ConvexVectorStore.fromTexts(
      args.splitText, // array
      {fileId:args.fileId}, // string
      embeddings,
      { ctx }
    );
    return "Document embedded successfully";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId:v.string()
  },
  handler: async (ctx, args) => {
     const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey:process.env.GOOGLE_API_KEY, // You need to add your API key
      modelName: "embedding-001", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title:"Document title"
    });
    const vectorStore = new ConvexVectorStore(
      embeddings
      , { ctx });

    const resultOne = (await vectorStore.similaritySearch(args.query, 1)).filter(q=>q.metadata.fileId==args.fileId);
    console.log(resultOne);

    return JSON.stringify(resultOne);
  },
});

