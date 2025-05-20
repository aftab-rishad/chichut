"use server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

const GenerateAIContent = async ({ prompt }) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 500,
        temperature: 0.1,
      },
    });
    console.log("Generated content:", response?.text);
    return {
      name: response.text,
      status: "success",
    };
  } catch (error) {
    console.error("Error generating name:", error);
    return {
      error: "An error occurred while generating the name.",
      status: "error",
    };
  }
};

export default GenerateAIContent;
