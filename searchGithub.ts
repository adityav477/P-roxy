import { Octokit } from "@octokit/rest";

const { GITHUB_TOKEN } = process.env;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function searchGitHub(githubURL: string, githubQuery: string) {
  console.log("\n🔎 Step 2: Searching GitHub with the generated query...");
  console.log("\n githubURL:", githubURL, " githubQuery:", githubQuery);
  try {
    // We use search.issuesAndPullRequests as it's versatile
    const response = await octokit.request(`${githubURL}`, {
      q: githubQuery,
      per_page: 5, // Get the top 5 most relevant items
    });

    if (response.data.items.length === 0) {
      return "No relevant information found on GitHub.";
    }

    // Format the results into a clean context string for the next LLM
    // const context = response.data.items
    //   .map(item => `- [${item.state}] ${item.title} (#${item.number}): ${item.body?.substring(0, 100)}...`)
    //   .join("\n");
    //
    // console.log("📄 Found context from GitHub.");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching GitHub:", error.message);
    return "An error occurred while searching GitHub.";
  }
}

export default searchGitHub;

