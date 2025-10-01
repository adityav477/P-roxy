import dotenv from "dotenv";
import Cerebras from '@cerebras/cerebras_cloud_sdk';
import generateGitHubQuery from "./llm";
import searchGitHub from "./searchGithub";

// Load environment variables from .env file
dotenv.config();

const { CEREBRAS_API_KEY } = process.env;

const client = new Cerebras({
  apiKey: CEREBRAS_API_KEY,
});

// --- Step 3: Generate the Final Answer ---
async function generateFinalAnswer(userMessage: string, githubContext: string) {
  console.log("\n🧠 Step 3: Asking LLM to synthesize the final answer...");

  const prompt = `You are a helpful AI assistant that answers questions about GitHub repositories.

The user asked: "${userMessage}"

Based on the following information retrieved from GitHub, provide a clear, concise, and helpful answer.
If the information doesn't fully answer the question, say so and explain what was found.

### GitHub Search Results:
${githubContext}

### Instructions:
- Answer the user's question directly and clearly
- Reference specific issues, PRs, commits, or files when relevant
- Include URLs if they would be helpful
- If no relevant information was found, explain that clearly
- Keep your response concise but informative

Provide your answer:`;

  try {
    const completionCreateResponse = await client.chat.completions.create({
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ],
      model: 'gpt-oss-120b',
      stream: false,
      max_completion_tokens: 800,
      temperature: 0.7,
      top_p: 1,
    });

    const answer = completionCreateResponse.choices[0]?.message.content?.trim();

    if (!answer) {
      throw new Error("Empty response from the LLM");
    }

    return answer;
  } catch (error) {
    console.error("Error calling Cerebras API for answer generation:", error);
    throw error;
  }
}

// --- Main Execution ---
async function main() {
  // Test questions - uncomment the one you want to use
  // const userQuestion = "what's the latest on the login bug?";
  // const userQuestion = "What's the latest on the issue where the Google Sheets node fails on large uploads?";
  // const userQuestion = "What's the status of the Salesforce node timeout bug?";
  // const userQuestion = "What was the last commit that updated the axios dependency?";
  // const userQuestion = "Where is the function that parses webhook requests defined?";
  const userQuestion = "Where is the package.json file?";

  console.log("\n" + "=".repeat(60));
  console.log(`💬 User Question: "${userQuestion}"`);
  console.log("=".repeat(60));

  try {
    // Step 1: Generate GitHub search query using LLM
    const githubQueryResult = await generateGitHubQuery(
      userQuestion,
      "adityav477",
      "n8n"
    );

    // Step 2: Search GitHub with the generated query
    const githubContext = await searchGitHub(
      githubQueryResult.url,
      githubQueryResult.q
    );

    console.log("\n📋 GitHub Context Retrieved:");
    console.log("-".repeat(60));
    console.log(githubContext);
    console.log("-".repeat(60));

    // Step 3: Generate final answer using the GitHub context
    const finalAnswer = await generateFinalAnswer(userQuestion, githubContext);

    console.log("\n" + "=".repeat(60));
    console.log("✅ FINAL ANSWER:");
    console.log("=".repeat(60));
    console.log(finalAnswer);
    console.log("=".repeat(60) + "\n");

  } catch (error: any) {
    console.error("\n❌ An error occurred in the main process:");
    console.error(error.message);
    if (error.stack) {
      console.error("\nStack trace:", error.stack);
    }
  }
}

main();
