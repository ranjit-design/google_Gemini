
import ContextProvider from "../context/context";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const MODEL_NAME = "gemini-2.5-flash-preview-04-17" // Gemini model name
const API_KEY ="AIzaSyAVtU89p9sRC-uV6cGa7zs3Blg51S4U6Tg";


async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });

    const result = await chat.sendMessage(prompt); // Send message to Gemini}
    const response = result.response;
    console.log(await response.text()); // Gemini's response
    return response.text(); // Return the response text
 }

  export default runChat;