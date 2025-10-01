import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { ChatCompletion } from '@cerebras/cerebras_cloud_sdk/resources.mjs';

const { GITHUB_TOKEN, CEREBRAS_API_KEY } = process.env;
const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});
// console.log("cerebras api key:", CEREBRAS_API_KEY);

if (!GITHUB_TOKEN || !CEREBRAS_API_KEY) {
  throw new Error("API keys for GitHub or Cerebras are not set in the .env file.");
}

async function generateGitHubQuery(userMessage: string, REPO_OWNER: string, REPO_NAME: string) {
  console.log("🤖 Step 1: Asking LLM to generate a GitHub search query...");

  const prompt = `You are an expert GitHub API query generation system. Your task is to analyze natural language queries and convert them into precise, optimized GitHub API search queries.

## CONTEXT & BACKGROUND
You are working with GitHub's REST API search endpoints. The target repository is "${REPO_OWNER}/${REPO_NAME}". Your goal is to translate user requests into structured JSON objects that specify the correct API endpoint (including the HTTP method) and search query parameters.

## AVAILABLE ENDPOINTS
You must choose from these three GitHub API search endpoints, which all use the GET method:
1. "/search/issues" - For issues, pull requests, and discussions
2. "/search/commits" - For commit history and changes
3. "/search/code" - For source code and file contents

## GITHUB SEARCH SYNTAX REFERENCE
Key search qualifiers you can use:
- Repository: repo:${REPO_OWNER}/${REPO_NAME} (REQUIRED in every query)
- Issue/PR filters: is:issue, is:pr, is:open, is:closed, is:merged, is:draft
- Time-based: created:>2023-01-01, updated:<2024-01-01, sort:created-desc, sort:updated-asc
- Content location: in:title, in:body, in:comments
- User filters: author:username, assignee:username, involves:username
- Labels: label:bug, label:"feature request"
- Code Search Specific: language:javascript, filename:server.js
- Commit & Code Search: path:src/utils/, path:package.json
- Commit Search Specific: author-name:username, committer:username, merge:false

## OUTPUT FORMAT REQUIREMENTS
Return ONLY a valid JSON object with exactly these two keys:
- "url": A string combining the HTTP method ('GET') and one of the three search endpoints listed above. Example: "GET /search/issues"
- "q": The complete search query string including repo:${REPO_OWNER}/${REPO_NAME}

## QUERY OPTIMIZATION STRATEGIES
1. **Endpoint Selection Logic:**
   - Use "/search/issues" for: bugs, features, discussions, pull requests, reviews.
   - Use "/search/commits" for: history of changes, what code was modified, commit messages.
   - Use "/search/code" for: finding function/class definitions, locating specific code snippets *inside* files.

2. **Qualifier Selection Logic:**
   - To find **changes to a file**, use a **commit search** with the \`path:\` qualifier.
   - To find **code inside a file**, use a **code search** with the \`filename:\` or \`path:\` qualifier.

## EXAMPLES
User: "what's the latest on the login bug?"
Output: {
  "url": "GET /search/issues",
  "q": "is:issue is:open sort:updated-desc repo:${REPO_OWNER}/${REPO_NAME} login bug in:title,body"
}

User: "where is the PaymentGateway class defined?"
Output: {
  "url": "GET /search/code",
  "q": "repo:${REPO_OWNER}/${REPO_NAME} \\"class PaymentGateway\\""
}

User: "show me recent changes in the main package.json file"
Output: {
  "url": "GET /search/commits",
  "q": "repo:${REPO_OWNER}/${REPO_NAME} sort:committer-date-desc path:package.json"
}

// UPDATED EXAMPLE
User: "find the database connection logic inside the config file"
Output: {
  "url": "GET /search/code",
  "q": "repo:${REPO_OWNER}/${REPO_NAME} database connection path:config.js"
}
---
### User Request:
"${userMessage}"

Generate the optimized GitHub API query JSON:`;

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
    console.log(completionCreateResponse?.choices[0]?.message.content);

    const resultString = completionCreateResponse.choices[0]?.message.content;
    if (!resultString) {
      throw new Error("Emptry response from the LLM");
    }
    const result = JSON.parse(resultString);

    // const result =
    // {
    //   "url": "/search/issues",
    //   "q": `is:issue is:open sort:updated-desc repo:${REPO_OWNER}/${REPO_NAME} login bug`
    // }

    console.log(result.url);
    console.log(result.q);

    return result;
    // const query = response.data.choices[0].text.trim();
    // console.log(`🔍 Generated Query: "${query}"`);
  } catch (error) {
    console.error("Error calling Cerebras API for query generation:", error.message);
    throw error;
  }
}

// await generateGitHubQuery("what's the latest on the login bug?", "adityav477", "obsidian")

export default generateGitHubQuery;
