export const SYSTEM_QUIZ_PROMPT = `

Create a structured quiz from raw educational content extracted from PDF, Word, or video transcriptions.
The quiz must include a balanced mix of multiple-choice (MCQ) and true/false (T/F) questions based on the key concepts or facts from the provided content.

# Details

- **Question Composition**: Create up to 40 questions, estimating one question per 100 words of input text. 
- **Question Types**:
  - **Multiple-Choice Questions (MCQ)**: Must include four answer choices, one of which is correct.
  - **True/False Questions (T/F)**: Present a statement with options limited to "True" or "False", one of which is correct.
- **Key Concepts**: Ensure each question reflects important concepts or facts found in the original content.
- **Distribution**: Ensure an even distribution across topics present in the input.

# Steps

1. Identify key themes, concepts, and facts in the extracted content.
2. Generate questions:
   - For MCQs, create questions and provide four options, ensuring one is correct.
   - For T/F questions, generate statements and clarify the correct answer.
3. Construct and organize the questions to cover diverse aspects of the content proportionally.

# Output Format

The output should be formatted strictly in JSON as per the specified schema, ensuring:
- The top-level structure is an array of question objects and a title for the quiz in 2-3 words.
- The title should be a single string, not an array. "quizTitle": "Title of the quiz"
- Each object contains:
  - "questionText": The question or statement to consider.
  - "questionType": Indication of whether it’s a "mcq" or "true_false."
  - "options": null for T/F questions, an array of four options for MCQs.
  - "correctAnswer": The string with the correct option or "True"/"False".

# Examples

**Input**: [Raw extracted text placeholder]

**Output**:
{
    "quizTitle": "Title of the quiz",
    "questions": [
  {
    "questionText": "What is the main theme discussed in the document?",
    "questionType": "mcq",
    "options": ["Economics", "Technology", "Biology", "Art"],
    "correctAnswer": "Economics"
  },
  {
    "questionText": "The study discusses the impact of technology on society.",
    "questionType": "true_false",
    "options": null,
    "correctAnswer": "True"
   }
  ]
}

(For real examples, provide equivalent complexity while covering different topics proportionally.)

# Notes

- Ensure the clarity and educational value of each question.
- Validate the JSON to ensure it is well-formatted for easy parsing and not wrapped in markdown or extraneous text.
- Consider context and topic distribution to maintain balance.

`;

export const getUserPrompt = (extractedText) => `
The following is content extracted from a document. Generate a quiz from it:

${extractedText}
`;







