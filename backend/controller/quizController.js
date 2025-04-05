import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuiz = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    
    // Array to store multiple quiz questions
    const quizQuestions = [];
    
    // Generate 10 quiz questions
    for (let i = 0; i < 10; i++) {
      const prompt = `
Generate a unique quiz question about sustainable living practices. Focus on different areas like energy conservation, waste management, sustainable shopping, water conservation, or eco-friendly transportation. The question should be concise and educational, with 4 multiple choice options. Format the response strictly as:
{
  "question": "Your question here",
  "options": [
    { id: "A", text: "Generate the option" }
      { id: "B", text: "Generate the option" }
        { id: "C", text: "Generate the option" }
          { id: "D", text: "Generate the option" }
    
    ],
  "correctAnswer": "Correct Option Letter (A/B/C/D)",
  "points" : "give 10 points to each correct answer",
  "explanation": "A brief explanation of why the correct answer is the best choice for sustainable living."
}

Make sure this question is different from previous ones. Avoid overly technical language—keep it beginner-friendly and informative.
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Clean response text
      const cleanText = responseText.replace(/```json|```/g, '').trim();

      try {
        const quiz = JSON.parse(cleanText);
        quizQuestions.push(quiz);
      } catch (parseError) {
        console.error("Failed to parse question:", parseError);
        // Continue with the loop even if one question fails
      }
    }

    // Return all generated questions
    res.json({ questions: quizQuestions });

  } catch (error) {
    console.error("Quiz generation failed:", error);
    res.status(500).json({ message: "Failed to generate quiz" });
  }
};