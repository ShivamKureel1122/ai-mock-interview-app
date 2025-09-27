import { GoogleGenAI } from '@google/genai';
// import dotenv from 'dotenv'

// dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
})

const geminiAPI = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  })
  // console.log(response.text);
  return response
}

export default geminiAPI
