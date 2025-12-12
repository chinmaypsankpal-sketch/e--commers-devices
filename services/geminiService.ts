import { GoogleGenAI, ChatSession } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

let chatSession: ChatSession | null = null;

const SYSTEM_INSTRUCTION = `
You are an intelligent sales assistant for 'ElectroTech', an electronics e-commerce store.
Your goal is to help customers find products, explain features, and guide them to purchase.

Here is our current product catalog:
${MOCK_PRODUCTS.map(p => `- ${p.name} ($${p.price}): ${p.description}`).join('\n')}

Rules:
1. Be helpful, concise, and polite.
2. Only recommend products from the catalog above.
3. If a user asks about a product we don't have, politely suggest a similar alternative from our catalog if possible, or state we don't carry it.
4. Keep answers short (under 50 words) unless detailed technical specs are asked.
5. Use emojis occasionally to be friendly.
`;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "I'm sorry, I'm currently offline (API Key missing). Please try again later.";
    }

    if (!chatSession) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      chatSession = chat;
    }

    const result = await chatSession.sendMessage({ message: userMessage });
    return result.text || "I'm not sure how to answer that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server. Please try again.";
  }
};
