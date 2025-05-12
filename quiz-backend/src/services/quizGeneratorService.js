import openai from '../config/openaiKey.js';
import { getUserPrompt, SYSTEM_QUIZ_PROMPT } from '../prompts/quizPromt.js';



//generate a quiz from the extracted text, the output is predefined by the system prompt and some specifications in the function.
export const generateQuiz = async (extractedText) => {
    try {
        const prompt = getUserPrompt(extractedText);
        const SystemPrompt = SYSTEM_QUIZ_PROMPT;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {role: 'system', content: SystemPrompt},
                {role: 'user', content: prompt},
            ],
            temperature: 0.9,
            max_tokens: 8000,
            response_format: {type: 'json_object'},
        });

        const quizData = JSON.parse(response.choices[0].message.content);
        return quizData;        
    }catch(error){
        console.error('Error generating quiz:', error);
        throw new Error('Failed to generate quiz');
    }
}
