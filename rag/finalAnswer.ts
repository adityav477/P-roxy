import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { ChatCompletion } from '@cerebras/cerebras_cloud_sdk/resources.mjs';

const { GITHUB_TOKEN, CEREBRAS_API_KEY } = process.env;
const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function generateFinalAnswer(userMessage, githubContext) {
  console.log("\n🧠 Step 3: Asking LLM to synthesize the final answer...");

  const prompt = `
    You are a helpful AI assistant. Answer the user's question based ONLY on the context provided from GitHub.
    Speak in a clear and direct manner.

    ---
    ### GitHub Context:
    ${githubContext}
    ---

    ### User's Question:
    ${userMessage}

    ### Final Answer:
  `;

  try {
    const completionCreateResponse: ChatCompletion = await client.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": `${prompt}`
        }
      ],
      model: 'gpt-oss-120b',
      stream: false,
      max_completion_tokens: 1000,
      temperature: 1,
      top_p: 1,
      reasoning_effort: "medium"
    });

    console.log(completionCreateResponse);
    console.log("final response message:", completionCreateResponse?.choices[0]?.message.content);

    const resultString = completionCreateResponse.choices[0]?.message.content;

    return resultString;
  } catch (error) {
    console.error("Error calling Cerebras API for answer generation:", error.message);
    throw error;
  }
}

export default generateFinalAnswer;
