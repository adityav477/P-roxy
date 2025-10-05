import Cerebras from '@cerebras/cerebras_cloud_sdk';
import getPrompt from './ragPrompt.js';
import dotenv from "dotenv"
dotenv.config({ path: new URL('../stt/.env', import.meta.url).pathname })

const { GITHUB_TOKEN, CEREBRAS_API_KEY } = process.env;
const client = new Cerebras({
  apiKey: process.envCEREBRAS_API_KEY,
});

if (!GITHUB_TOKEN || !CEREBRAS_API_KEY) {
  throw new Error("API keys for GitHub or Cerebras are not set in the .env file.");
}

async function generateGitHubQuery(userMessage, REPO_OWNER, REPO_NAME) {
  console.log("🤖 Step 1: Asking LLM to generate a GitHub search query...");

  const prompt = getPrompt(userMessage, REPO_OWNER, REPO_NAME);
  // const prompt = getPrompt2(userMessage, REPO_OWNER, REPO_NAME);
  try {
    const completionCreateResponse = await client.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": `${prompt} `
        }
      ],
      model: 'gpt-oss-120b',
      stream: false,
      max_completion_tokens: 500,
      temperature: 0.4,
      top_p: 1,
      reasoning_effort: "medium"
    });

    console.log(completionCreateResponse);
    console.log(completionCreateResponse?.choices[0]?.message.content);

    const resultString = completionCreateResponse.choices[0]?.message.content;
    if (!resultString) {
      throw new Error("Emptry response from the LLM");
    }
    const result = JSON.parse(resultString);


    return result;
  } catch (error) {
    console.error("Error calling Cerebras API for query generation:", error.message);
    throw error;
  }
}

export default generateGitHubQuery;
