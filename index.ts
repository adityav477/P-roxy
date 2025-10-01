import axios from "axios";
import dotenv from "dotenv";
import generateGitHubQuery from "./llm";
import searchGitHub from "./searchGithub";
import generateFinalAnswer from "./finalAnswer";

// Load environment variables from .env file
dotenv.config();

// --- Configuration ---

// Cerebras API endpoint (NOTE: This is a placeholder, update with the actual endpoint)
const CEREBRAS_API_URL = "https://api.cerebras.net/v1/completions";
const { CEREBRAS_API_KEY } = process.env;

// --- Initialize Clients ---

//--- Step1: generate github search query

// --- Step 2: Search GitHub with the Generated Query ---

// --- LLM 2: Generate the Final Answer ---

// --- Main Execution ---
async function main() {
  // const userQuestion = "what's the latest on the login bug?"; // Example question
  // const userQuestion = "What's the latest on the issue where the Google Sheets node fails on large uploads?"
  // In your main function
  // const userQuestion = "What's the status of the Salesforce node timeout bug?";
  // const userQuestion = "What was the last commit that updated the axios dependency?";
  // const userQuestion = "Where is the function that parses webhook requests defined ? ";
  // const userQuestion = "What was the last commit that updated dependencies?";
  const userQuestion = "Where is the package.json file?";
  // Expected query: repo:adityav477/n8n filename:package.json

  console.log(`User Question: "${userQuestion}"\n` + "-".repeat(40));

  try {
    const githubQueryResult = await generateGitHubQuery(userQuestion, "n8n-io", "n8n");
    console.log(githubQueryResult);
    const githubContext = await searchGitHub(githubQueryResult.url, githubQueryResult.q);
    console.log("Github Context:", githubContext);
    const finalAnswer = await generateFinalAnswer(userQuestion, githubContext);
    console.log("finalAnswer:", finalAnswer);

    // console.log("\n" + "=".repeat(40) + `\n✅ Final Answer: ${finalAnswer}`);
  } catch (error) {
    console.error("\nAn error occurred in the main process:", error.message);
  }
}

main();
