const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // ✅ Corrected dotenv call

// Ensure API Key is loaded
if (!process.env.GEMINI_API_KEY) {
  console.error("⚠️  Gemini API Key is missing! Check your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("Gemini API Key Loaded Successfully ✅");

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const userPrompt = "I want adhar card.";
const prompt = `Extract a one-word document name from this request in JSON format: "${userPrompt}"`;

async function generateContent() {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text(); 

    console.log("Gemini API Response:", response);
  } catch (error) {
    console.error("❌ Error generating content:", error);
  }
}

generateContent();
