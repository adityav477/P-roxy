import dotenv from "dotenv";
import generateGitHubQuery from "./llm.js";
import searchGitHub from "./searchGithub.js";
import generateFinalAnswer from "./finalAnswer.js";
import { speakInMeeting } from "../tts/tts.js";
dotenv.config({ path: new URL('../stt/.env', import.meta.url).pathname })

async function LLMLogic(userQuestion) {
  // async function LLMLogic() {
  // const userQuestion = "what's the latest on the login bug?"; // Example question
  // const userQuestion = "What's the latest on the issue where the Google Sheets node fails on large uploads?"
  // In your main function
  // const userQuestion = "What's the status of the Salesforce node timeout bug?";
  // const userQuestion = "What was the last commit that updated the axios dependency?";
  // const userQuestion = "Where is the function that parses webhook requests defined ? ";
  // const userQuestion = "What was the last commit that updated dependencies?";
  // const userQuestion = "Where is the package.json file?";
  // const userQuestion = "Add status check for project json files in git folder #20369"
  // Expected query: repo:adityav477/n8n filename:package.json
  //How do I handle authentication

  console.log(`User Question: "${userQuestion}"\n` + "-".repeat(40));
  console.log("botid in process:", process.env.BOT_ID);

  try {
    const githubQueryResult = await generateGitHubQuery(userQuestion,
      "octokit",
      "octokit.js");
    console.log(githubQueryResult);
    const githubContext = await searchGitHub(githubQueryResult.url, githubQueryResult.p);
    // console.log("Github Context:", githubContext?.items);
    if (githubContext?.items) {
      const finalAnswer = await generateFinalAnswer(userQuestion, githubContext?.items);
      console.log("finalAnswer:", finalAnswer);
      speakInMeeting(finalAnswer, process.env.BOT_ID);
    }
    // console.log("\n" + "=".repeat(40) + `\n✅ Final Answer: ${finalAnswer}`);
  } catch (error) {
    console.error("\nAn error occurred in the main process:", error.message);
  }
}

// LLMLogic();
export default LLMLogic;

