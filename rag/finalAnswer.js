import Cerebras from '@cerebras/cerebras_cloud_sdk';
import dotenv from "dotenv";
dotenv.config({ path: new URL('../stt/.env', import.meta.url).pathname })


const { CEREBRAS_API_KEY } = process.env;
const client = new Cerebras({
  apiKey: CEREBRAS_API_KEY,
});

async function generateFinalAnswer(userMessage, githubContext) {
  console.log("\n🧠 Step 3: Asking LLM to synthesize the final answer...");
  console.log("githubcontext in finalAnswer:", githubContext);
  console.log("userMessage:", userMessage);

  // System prompt - defines the assistant's role and behavior
  const systemPrompt = `You are an experienced software engineer and mentor, chatting in a casual Scrum meeting style. Use the provided GitHub context and the user's question to respond like a friendly, knowledgeable engineer—clear, conversational, and practical. Mimic real human responses (e.g., laugh at jokes, react to humor) since this will be converted to voice for Google Meet.

If the context is missing or doesn't answer the question, acknowledge it kindly and suggest next steps or workarounds instead of just saying "I don't know."

### Response Guidelines:
1. Start with a brief greeting or acknowledgment (e.g., "Hey team," "Got it!").
2. Restate the question in your own words to confirm understanding.
3. Point out relevant details from the GitHub context you'll use. If none, say:
   "Hah, looks like we don't have that context here—no worries, let's…"
4. Provide a step-by-step solution or explanation, including code snippets or CLI commands where helpful.
5. React naturally: laugh at jokes ("😂 Good one!"), encourage contributions ("Great catch!"), and use light humor where appropriate.
6. Close with a friendly prompt for next steps (e.g., "Let me know if that helps!" or "Any other questions before we move on?").

### Tone & Style:
- Conversational and upbeat, as in a live stand-up or Scrum meeting.
- Empathetic and encouraging, like mentoring a teammate.
- Use simple, clear language; sprinkle in casual interjections ("Awesome," "Gotcha," "Sweet!").
- Keep responses to about 2-4 sentences for quick voice delivery.`;

  // User prompt - contains the actual context and question
  const userPrompt = `Here is the GitHub context from the repository:

---
GitHub Context:
${githubContext && githubContext.length > 0
      ? JSON.stringify(githubContext, null, 2)
      : "No GitHub context available for this query."}
---

User's Question:
${userMessage}

Please provide a helpful answer based on the context above.`;

  try {
    const completionCreateResponse = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      model: 'gpt-oss-120b',
      stream: false,
      max_completion_tokens: 200,
      temperature: 1,
      top_p: 1,
      reasoning_effort: "medium"
    });

    console.log("Full API Response:", completionCreateResponse);
    console.log("Final response message:", completionCreateResponse?.choices[0]?.message?.content);

    const resultString = completionCreateResponse.choices[0]?.message?.content;
    return resultString;

  } catch (error) {
    console.error("Error calling Cerebras API for answer generation:", error.message);
    throw error;
  }
}

export default generateFinalAnswer;
