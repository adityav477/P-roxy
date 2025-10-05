const examples = `
Search code

Searches for query terms inside of a file. This method returns up to 100 results per page.

When searching for code, you can get text match metadata for the file content and file path fields when you pass the text-match media type. For more details about how to receive highlighted search results, see Text match metadata.

For example, if you want to find the definition of the addClass function inside jQuery repository, your query would look something like this:

q=addClass+in:file+language:js+repo:jquery/jquery

This query searches for the keyword addClass within a file's contents. The query limits the search to files where the language is JavaScript in the jquery/jquery repository.

Considerations for code search:

Due to the complexity of searching code, there are a few restrictions on how searches are performed:

    Only the default branch is considered. In most cases, this will be the master branch.
    Only files smaller than 384 KB are searchable.
    You must always include at least one search term when searching source code. For example, searching for language:go is not valid, while amazing language:go is.

This endpoint requires you to authenticate and limits you to 10 requests per minute.
Fine-grained access tokens for "Search code"

This endpoint works with the following fine-grained token types:

    GitHub App user access tokens
    GitHub App installation access tokens
    Fine-grained personal access tokens

The fine-grained token does not require any permissions.

This endpoint can be used without authentication if only public resources are requested.
Parameters for "Search code"
Headers
Name, Type, Description
accept string

Setting to application/vnd.github+json is recommended.
Query parameters
Name, Type, Description
q string Required

The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching code" for a detailed list of qualifiers.
sort string

This field is closing down. Sorts the results of your query. Can only be indexed, which indicates how recently a file has been indexed by the GitHub search infrastructure. Default: best match

Value: indexed
order string

This field is closing down. Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort.

Default: desc

Can be one of: desc, asc
per_page integer

The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30
page integer

The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
HTTP response status codes for "Search code"
Status code	Description
200	

OK
304	

Not modified
403	

Forbidden
422	

Validation failed, or the endpoint has been spammed.
503	

Service unavailable
Code samples for "Search code"
Request example
get/search/code

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit()

await octokit.request('GET /search/code', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

Response

Status: 200
{
  "total_count": 7,
  "incomplete_results": false,
  "items": [
    {
      "name": "classes.js",
      "path": "src/attributes/classes.js",
      "sha": "d7212f9dee2dcc18f084d7df8f417b80846ded5a",
      "url": "https://api.github.com/repositories/167174/contents/src/attributes/classes.js?ref=825ac3773694e0cd23ee74895fd5aeb535b27da4",
      "git_url": "https://api.github.com/repositories/167174/git/blobs/d7212f9dee2dcc18f084d7df8f417b80846ded5a",
      "html_url": "https://github.com/jquery/jquery/blob/825ac3773694e0cd23ee74895fd5aeb535b27da4/src/attributes/classes.js",
      "repository": {
        "id": 167174,
        "node_id": "MDEwOlJlcG9zaXRvcnkxNjcxNzQ=",
        "name": "jquery",
        "full_name": "jquery/jquery",
        "owner": {
          "login": "jquery",
          "id": 70142,
          "node_id": "MDQ6VXNlcjcwMTQy",
          "avatar_url": "https://0.gravatar.com/avatar/6906f317a4733f4379b06c32229ef02f?d=https%3A%2F%2Fidenticons.github.com%2Ff426f04f2f9813718fb806b30e0093de.png",
          "gravatar_id": "",
          "url": "https://api.github.com/users/jquery",
          "html_url": "https://github.com/jquery",
          "followers_url": "https://api.github.com/users/jquery/followers",
          "following_url": "https://api.github.com/users/jquery/following{/other_user}",
          "gists_url": "https://api.github.com/users/jquery/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/jquery/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/jquery/subscriptions",
          "organizations_url": "https://api.github.com/users/jquery/orgs",
          "repos_url": "https://api.github.com/users/jquery/repos",
          "events_url": "https://api.github.com/users/jquery/events{/privacy}",
          "received_events_url": "https://api.github.com/users/jquery/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/jquery/jquery",
        "description": "jQuery JavaScript Library",
        "fork": false,
        "url": "https://api.github.com/repos/jquery/jquery",
        "forks_url": "https://api.github.com/repos/jquery/jquery/forks",
        "keys_url": "https://api.github.com/repos/jquery/jquery/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/jquery/jquery/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/jquery/jquery/teams",
        "hooks_url": "https://api.github.com/repos/jquery/jquery/hooks",
        "issue_events_url": "https://api.github.com/repos/jquery/jquery/issues/events{/number}",
        "events_url": "https://api.github.com/repos/jquery/jquery/events",
        "assignees_url": "https://api.github.com/repos/jquery/jquery/assignees{/user}",
        "branches_url": "https://api.github.com/repos/jquery/jquery/branches{/branch}",
        "tags_url": "https://api.github.com/repos/jquery/jquery/tags",
        "blobs_url": "https://api.github.com/repos/jquery/jquery/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/jquery/jquery/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/jquery/jquery/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/jquery/jquery/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/jquery/jquery/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/jquery/jquery/languages",
        "stargazers_url": "https://api.github.com/repos/jquery/jquery/stargazers",
        "contributors_url": "https://api.github.com/repos/jquery/jquery/contributors",
        "subscribers_url": "https://api.github.com/repos/jquery/jquery/subscribers",
        "subscription_url": "https://api.github.com/repos/jquery/jquery/subscription",
        "commits_url": "https://api.github.com/repos/jquery/jquery/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/jquery/jquery/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/jquery/jquery/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/jquery/jquery/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/jquery/jquery/contents/{+path}",
        "compare_url": "https://api.github.com/repos/jquery/jquery/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/jquery/jquery/merges",
        "archive_url": "https://api.github.com/repos/jquery/jquery/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/jquery/jquery/downloads",
        "issues_url": "https://api.github.com/repos/jquery/jquery/issues{/number}",
        "pulls_url": "https://api.github.com/repos/jquery/jquery/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/jquery/jquery/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/jquery/jquery/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/jquery/jquery/labels{/name}",
        "deployments_url": "http://api.github.com/repos/octocat/Hello-World/deployments",
        "releases_url": "http://api.github.com/repos/octocat/Hello-World/releases{/id}"
      },
      "score": 1
    }
  ]
}
Search commits

Find commits via various criteria on the default branch (usually main). This method returns up to 100 results per page.

When searching for commits, you can get text match metadata for the message field when you provide the text-match media type. For more details about how to receive highlighted search results, see Text match metadata.

For example, if you want to find commits related to CSS in the octocat/Spoon-Knife repository. Your query would look something like this:

q=repo:octocat/Spoon-Knife+css
Fine-grained access tokens for "Search commits"

This endpoint works with the following fine-grained token types:

    GitHub App user access tokens
    GitHub App installation access tokens
    Fine-grained personal access tokens

The fine-grained token does not require any permissions.

This endpoint can be used without authentication if only public resources are requested.
Parameters for "Search commits"
Headers
Name, Type, Description
accept string

Setting to application/vnd.github+json is recommended.
Query parameters
Name, Type, Description
q string Required

The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching commits" for a detailed list of qualifiers.
sort string

Sorts the results of your query by author-date or committer-date. Default: best match

Can be one of: author-date, committer-date
order string

Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort.

Default: desc

Can be one of: desc, asc
per_page integer

The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30
page integer

The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
HTTP response status codes for "Search commits"
Status code	Description
200	

OK
304	

Not modified
Code samples for "Search commits"
Request example
get/search/commits

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit()

await octokit.request('GET /search/commits', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

Response

Status: 200
{
  "total_count": 1,
  "incomplete_results": false,
  "items": [
    {
      "url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
      "sha": "bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
      "html_url": "https://github.com/octocat/Spoon-Knife/commit/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
      "comments_url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f/comments",
      "commit": {
        "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
        "author": {
          "date": "2014-02-04T14:38:36-08:00",
          "name": "The Octocat",
          "email": "octocat@nowhere.com"
        },
        "committer": {
          "date": "2014-02-12T15:18:55-08:00",
          "name": "The Octocat",
          "email": "octocat@nowhere.com"
        },
        "message": "Create styles.css and updated README",
        "tree": {
          "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/trees/a639e96f9038797fba6e0469f94a4b0cc459fa68",
          "sha": "a639e96f9038797fba6e0469f94a4b0cc459fa68"
        },
        "comment_count": 8
      },
      "author": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {},
      "parents": [
        {
          "url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
          "html_url": "https://github.com/octocat/Spoon-Knife/commit/a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
          "sha": "a30c19e3f13765a3b48829788bc1cb8b4e95cee4"
        }
      ],
      "repository": {
        "id": 1300192,
        "node_id": "MDEwOlJlcG9zaXRvcnkxMzAwMTky",
        "name": "Spoon-Knife",
        "full_name": "octocat/Spoon-Knife",
        "owner": {
          "login": "octocat",
          "id": 583231,
          "node_id": "MDQ6VXNlcjU4MzIzMQ==",
          "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/octocat",
          "html_url": "https://github.com/octocat",
          "followers_url": "https://api.github.com/users/octocat/followers",
          "following_url": "https://api.github.com/users/octocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
          "organizations_url": "https://api.github.com/users/octocat/orgs",
          "repos_url": "https://api.github.com/users/octocat/repos",
          "events_url": "https://api.github.com/users/octocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/octocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/octocat/Spoon-Knife",
        "description": "This repo is for demonstration purposes only.",
        "fork": false,
        "url": "https://api.github.com/repos/octocat/Spoon-Knife",
        "forks_url": "https://api.github.com/repos/octocat/Spoon-Knife/forks",
        "keys_url": "https://api.github.com/repos/octocat/Spoon-Knife/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/octocat/Spoon-Knife/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/octocat/Spoon-Knife/teams",
        "hooks_url": "https://api.github.com/repos/octocat/Spoon-Knife/hooks",
        "issue_events_url": "https://api.github.com/repos/octocat/Spoon-Knife/issues/events{/number}",
        "events_url": "https://api.github.com/repos/octocat/Spoon-Knife/events",
        "assignees_url": "https://api.github.com/repos/octocat/Spoon-Knife/assignees{/user}",
        "branches_url": "https://api.github.com/repos/octocat/Spoon-Knife/branches{/branch}",
        "tags_url": "https://api.github.com/repos/octocat/Spoon-Knife/tags",
        "blobs_url": "https://api.github.com/repos/octocat/Spoon-Knife/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/octocat/Spoon-Knife/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/octocat/Spoon-Knife/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/octocat/Spoon-Knife/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/octocat/Spoon-Knife/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/octocat/Spoon-Knife/languages",
        "stargazers_url": "https://api.github.com/repos/octocat/Spoon-Knife/stargazers",
        "contributors_url": "https://api.github.com/repos/octocat/Spoon-Knife/contributors",
        "subscribers_url": "https://api.github.com/repos/octocat/Spoon-Knife/subscribers",
        "subscription_url": "https://api.github.com/repos/octocat/Spoon-Knife/subscription",
        "commits_url": "https://api.github.com/repos/octocat/Spoon-Knife/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/octocat/Spoon-Knife/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/octocat/Spoon-Knife/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/octocat/Spoon-Knife/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/octocat/Spoon-Knife/contents/{+path}",
        "compare_url": "https://api.github.com/repos/octocat/Spoon-Knife/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/octocat/Spoon-Knife/merges",
        "archive_url": "https://api.github.com/repos/octocat/Spoon-Knife/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/octocat/Spoon-Knife/downloads",
        "issues_url": "https://api.github.com/repos/octocat/Spoon-Knife/issues{/number}",
        "pulls_url": "https://api.github.com/repos/octocat/Spoon-Knife/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/octocat/Spoon-Knife/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/octocat/Spoon-Knife/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/octocat/Spoon-Knife/labels{/name}",
        "releases_url": "https://api.github.com/repos/octocat/Spoon-Knife/releases{/id}",
        "deployments_url": "https://api.github.com/repos/octocat/Spoon-Knife/deployments"
      },
      "score": 1,
      "node_id": "MDQ6VXNlcjU4MzIzMQ=="
    }
  ]
}
Search issues and pull requests

Warning

Notice: Search for issues and pull requests will be overridden by advanced search on November 4, 2025. You can read more about this change on the GitHub blog.
Fine-grained access tokens for "Search issues and pull requests"

This endpoint works with the following fine-grained token types:

    GitHub App user access tokens
    GitHub App installation access tokens
    Fine-grained personal access tokens

The fine-grained token does not require any permissions.

This endpoint can be used without authentication if only public resources are requested.
Parameters for "Search issues and pull requests"
Headers
Name, Type, Description
accept string

Setting to application/vnd.github+json is recommended.
Query parameters
Name, Type, Description
q string Required

The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching issues and pull requests" for a detailed list of qualifiers.
sort string

Sorts the results of your query by the number of comments, reactions, reactions-+1, reactions--1, reactions-smile, reactions-thinking_face, reactions-heart, reactions-tada, or interactions. You can also sort results by how recently the items were created or updated, Default: best match

Can be one of: comments, reactions, reactions-+1, reactions--1, reactions-smile, reactions-thinking_face, reactions-heart, reactions-tada, interactions, created, updated
order string

Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort.

Default: desc

Can be one of: desc, asc
per_page integer

The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30
page integer

The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
advanced_search string

Set to true to use advanced search. Example: http://api.github.com/search/issues?q={query}&advanced_search=true
HTTP response status codes for "Search issues and pull requests"
Status code	Description
200	

OK
304	

Not modified
403	

Forbidden
422	

Validation failed, or the endpoint has been spammed.
503	

Service unavailable
Code samples for "Search issues and pull requests"
Request example
get/search/issues

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit()

await octokit.request('GET /search/issues', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

Response

Status: 200
{
  "total_count": 280,
  "incomplete_results": false,
  "items": [
    {
      "url": "https://api.github.com/repos/batterseapower/pinyin-toolkit/issues/132",
      "repository_url": "https://api.github.com/repos/batterseapower/pinyin-toolkit",
      "labels_url": "https://api.github.com/repos/batterseapower/pinyin-toolkit/issues/132/labels{/name}",
      "comments_url": "https://api.github.com/repos/batterseapower/pinyin-toolkit/issues/132/comments",
      "events_url": "https://api.github.com/repos/batterseapower/pinyin-toolkit/issues/132/events",
      "html_url": "https://github.com/batterseapower/pinyin-toolkit/issues/132",
      "id": 35802,
      "node_id": "MDU6SXNzdWUzNTgwMg==",
      "number": 132,
      "title": "Line Number Indexes Beyond 20 Not Displayed",
      "user": {
        "login": "Nick3C",
        "id": 90254,
        "node_id": "MDQ6VXNlcjkwMjU0",
        "avatar_url": "https://secure.gravatar.com/avatar/934442aadfe3b2f4630510de416c5718?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Nick3C",
        "html_url": "https://github.com/Nick3C",
        "followers_url": "https://api.github.com/users/Nick3C/followers",
        "following_url": "https://api.github.com/users/Nick3C/following{/other_user}",
        "gists_url": "https://api.github.com/users/Nick3C/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Nick3C/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Nick3C/subscriptions",
        "organizations_url": "https://api.github.com/users/Nick3C/orgs",
        "repos_url": "https://api.github.com/users/Nick3C/repos",
        "events_url": "https://api.github.com/users/Nick3C/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Nick3C/received_events",
        "type": "User",
        "site_admin": true
      },
      "labels": [
        {
          "id": 4,
          "node_id": "MDU6TGFiZWw0",
          "url": "https://api.github.com/repos/batterseapower/pinyin-toolkit/labels/bug",
          "name": "bug",
          "color": "ff0000"
        }
      ],
      "state": "open",
      "assignee": null,
      "milestone": {
        "url": "https://api.github.com/repos/octocat/Hello-World/milestones/1",
        "html_url": "https://github.com/octocat/Hello-World/milestones/v1.0",
        "labels_url": "https://api.github.com/repos/octocat/Hello-World/milestones/1/labels",
        "id": 1002604,
        "node_id": "MDk6TWlsZXN0b25lMTAwMjYwNA==",
        "number": 1,
        "state": "open",
        "title": "v1.0",
        "description": "Tracking milestone for version 1.0",
        "creator": {
          "login": "octocat",
          "id": 1,
          "node_id": "MDQ6VXNlcjE=",
          "avatar_url": "https://github.com/images/error/octocat_happy.gif",
          "gravatar_id": "",
          "url": "https://api.github.com/users/octocat",
          "html_url": "https://github.com/octocat",
          "followers_url": "https://api.github.com/users/octocat/followers",
          "following_url": "https://api.github.com/users/octocat/following{/other_user}",
          "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
          "organizations_url": "https://api.github.com/users/octocat/orgs",
          "repos_url": "https://api.github.com/users/octocat/repos",
          "events_url": "https://api.github.com/users/octocat/events{/privacy}",
          "received_events_url": "https://api.github.com/users/octocat/received_events",
          "type": "User",
          "site_admin": false
        },
        "open_issues": 4,
        "closed_issues": 8,
        "created_at": "2011-04-10T20:09:31Z",
        "updated_at": "2014-03-03T18:58:10Z",
        "closed_at": "2013-02-12T13:22:01Z",
        "due_on": "2012-10-09T23:39:01Z"
      },
      "comments": 15,
      "created_at": "2009-07-12T20:10:41Z",
      "updated_at": "2009-07-19T09:23:43Z",
      "closed_at": null,
      "pull_request": {
        "url": "https://api/github.com/repos/octocat/Hello-World/pull/1347",
        "html_url": "https://github.com/octocat/Hello-World/pull/1347",
        "diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff",
        "patch_url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347"
      },
      "body": "...",
      "score": 1,
      "locked": true,
      "author_association": "COLLABORATOR",
      "state_reason": "completed"
    }
  ]
}
Search labels

Find labels in a repository with names or descriptions that match search keywords. Returns up to 100 results per page.

When searching for labels, you can get text match metadata for the label name and description fields when you pass the text-match media type. For more details about how to receive highlighted search results, see Text match metadata.

For example, if you want to find labels in the linguist repository that match bug, defect, or enhancement. Your query might look like this:

q=bug+defect+enhancement&repository_id=64778136

The labels that best match the query appear first in the search results.
Fine-grained access tokens for "Search labels"

This endpoint works with the following fine-grained token types:

    GitHub App user access tokens
    GitHub App installation access tokens
    Fine-grained personal access tokens

The fine-grained token must have the following permission set:

    "Metadata" repository permissions (read)

This endpoint can be used without authentication or the aforementioned permissions if only public resources are requested.
Parameters for "Search labels"
Headers
Name, Type, Description
accept string

Setting to application/vnd.github+json is recommended.
Query parameters
Name, Type, Description
repository_id integer Required

The id of the repository.
q string Required

The search keywords. This endpoint does not accept qualifiers in the query. To learn more about the format of the query, see Constructing a search query.
sort string

Sorts the results of your query by when the label was created or updated. Default: best match

Can be one of: created, updated
order string

Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort.

Default: desc

Can be one of: desc, asc
per_page integer

The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30
page integer

The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
HTTP response status codes for "Search labels"
Status code	Description
200	

OK
304	

Not modified
403	

Forbidden
404	

Resource not found
422	

Validation failed, or the endpoint has been spammed.
Code samples for "Search labels"
Request example
get/search/labels

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
})

await octokit.request('GET /search/labels', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

Response

Status: 200
{
  "total_count": 2,
  "incomplete_results": false,
  "items": [
    {
      "id": 418327088,
      "node_id": "MDU6TGFiZWw0MTgzMjcwODg=",
      "url": "https://api.github.com/repos/octocat/linguist/labels/enhancement",
      "name": "enhancement",
      "color": "84b6eb",
      "default": true,
      "description": "New feature or request.",
      "score": 1
    },
    {
      "id": 418327086,
      "node_id": "MDU6TGFiZWw0MTgzMjcwODY=",
      "url": "https://api.github.com/repos/octocat/linguist/labels/bug",
      "name": "bug",
      "color": "ee0701",
      "default": true,
      "description": "Something isn't working.",
      "score": 1
    }
  ]
}
Search repositories

Find repositories via various criteria. This method returns up to 100 results per page.

When searching for repositories, you can get text match metadata for the name and description fields when you pass the text-match media type. For more details about how to receive highlighted search results, see Text match metadata.

For example, if you want to search for popular Tetris repositories written in assembly code, your query might look like this:

q=tetris+language:assembly&sort=stars&order=desc

This query searches for repositories with the word tetris in the name, the description, or the README. The results are limited to repositories where the primary language is assembly. The results are sorted by stars in descending order, so that the most popular repositories appear first in the search results.
Fine-grained access tokens for "Search repositories"

This endpoint works with the following fine-grained token types:

    GitHub App user access tokens
    GitHub App installation access tokens
    Fine-grained personal access tokens

The fine-grained token does not require any permissions.

This endpoint can be used without authentication if only public resources are requested.
Parameters for "Search repositories"
Headers
Name, Type, Description
accept string

Setting to application/vnd.github+json is recommended.
Query parameters
Name, Type, Description
q string Required

The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching for repositories" for a detailed list of qualifiers.
sort string

Sorts the results of your query by number of stars, forks, or help-wanted-issues or how recently the items were updated. Default: best match

Can be one of: stars, forks, help-wanted-issues, updated
order string

Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort.

Default: desc

Can be one of: desc, asc
per_page integer

The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30
page integer

The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
HTTP response status codes for "Search repositories"
Status code	Description
200	

OK
304	

Not modified
422	

Validation failed, or the endpoint has been spammed.
503	

Service unavailable
Code samples for "Search repositories"
Request example
get/search/repositories

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit()

await octokit.request('GET /search/repositories', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

Response

Status: 200
{
  "total_count": 40,
  "incomplete_results": false,
  "items": [
    {
      "id": 3081286,
      "node_id": "MDEwOlJlcG9zaXRvcnkzMDgxMjg2",
      "name": "Tetris",
      "full_name": "dtrupenn/Tetris",
      "owner": {
        "login": "dtrupenn",
        "id": 872147,
        "node_id": "MDQ6VXNlcjg3MjE0Nw==",
        "avatar_url": "https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
        "gravatar_id": "",
        "url": "https://api.github.com/users/dtrupenn",
        "received_events_url": "https://api.github.com/users/dtrupenn/received_events",
        "type": "User",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "site_admin": true
      },
      "private": false,
      "html_url": "https://github.com/dtrupenn/Tetris",
      "description": "A C implementation of Tetris using Pennsim through LC4",
      "fork": false,
      "url": "https://api.github.com/repos/dtrupenn/Tetris",
      "created_at": "2012-01-01T00:31:50Z",
      "updated_at": "2013-01-05T17:58:47Z",
      "pushed_at": "2012-01-01T00:37:02Z",
      "homepage": "https://github.com",
      "size": 524,
      "stargazers_count": 1,
      "watchers_count": 1,
      "language": "Assembly",
      "forks_count": 0,
      "open_issues_count": 0,
      "master_branch": "master",
      "default_branch": "master",
      "score": 1,
      "archive_url": "https://api.github.com/repos/dtrupenn/Tetris/{archive_format}{/ref}",
      "assignees_url": "https://api.github.com/repos/dtrupenn/Tetris/assignees{/user}",
      "blobs_url": "https://api.github.com/repos/dtrupenn/Tetris/git/blobs{/sha}",
      "branches_url": "https://api.github.com/repos/dtrupenn/Tetris/branches{/branch}",
      "collaborators_url": "https://api.github.com/repos/dtrupenn/Tetris/collaborators{/collaborator}",
      "comments_url": "https://api.github.com/repos/dtrupenn/Tetris/comments{/number}",
      "commits_url": "https://api.github.com/repos/dtrupenn/Tetris/commits{/sha}",
      "compare_url": "https://api.github.com/repos/dtrupenn/Tetris/compare/{base}...{head}",
      "contents_url": "https://api.github.com/repos/dtrupenn/Tetris/contents/{+path}",
      "contributors_url": "https://api.github.com/repos/dtrupenn/Tetris/contributors",
      "deployments_url": "https://api.github.com/repos/dtrupenn/Tetris/deployments",
      "downloads_url": "https://api.github.com/repos/dtrupenn/Tetris/downloads",
      "events_url": "https://api.github.com/repos/dtrupenn/Tetris/events",
      "forks_url": "https://api.github.com/repos/dtrupenn/Tetris/forks",
      "git_commits_url": "https://api.github.com/repos/dtrupenn/Tetris/git/commits{/sha}",
      "git_refs_url": "https://api.github.com/repos/dtrupenn/Tetris/git/refs{/sha}",
      "git_tags_url": "https://api.github.com/repos/dtrupenn/Tetris/git/tags{/sha}",
      "git_url": "git:github.com/dtrupenn/Tetris.git",
      "issue_comment_url": "https://api.github.com/repos/dtrupenn/Tetris/issues/comments{/number}",
      "issue_events_url": "https://api.github.com/repos/dtrupenn/Tetris/issues/events{/number}",
      "issues_url": "https://api.github.com/repos/dtrupenn/Tetris/issues{/number}",
      "keys_url": "https://api.github.com/repos/dtrupenn/Tetris/keys{/key_id}",
      "labels_url": "https://api.github.com/repos/dtrupenn/Tetris/labels{/name}",
      "languages_url": "https://api.github.com/repos/dtrupenn/Tetris/languages",
      "merges_url": "https://api.github.com/repos/dtrupenn/Tetris/merges",
      "milestones_url": "https://api.github.com/repos/dtrupenn/Tetris/milestones{/number}",
      "notifications_url": "https://api.github.com/repos/dtrupenn/Tetris/notifications{?since,all,participating}",
      "pulls_url": "https://api.github.com/repos/dtrupenn/Tetris/pulls{/number}",
      "releases_url": "https://api.github.com/repos/dtrupenn/Tetris/releases{/id}",
      "ssh_url": "git@github.com:dtrupenn/Tetris.git",
      "stargazers_url": "https://api.github.com/repos/dtrupenn/Tetris/stargazers",
      "statuses_url": "https://api.github.com/repos/dtrupenn/Tetris/statuses/{sha}",
      "subscribers_url": "https://api.github.com/repos/dtrupenn/Tetris/subscribers",
      "subscription_url": "https://api.github.com/repos/dtrupenn/Tetris/subscription",
      "tags_url": "https://api.github.com/repos/dtrupenn/Tetris/tags",
      "teams_url": "https://api.github.com/repos/dtrupenn/Tetris/teams",
      "trees_url": "https://api.github.com/repos/dtrupenn/Tetris/git/trees{/sha}",
      "clone_url": "https://github.com/dtrupenn/Tetris.git",
      "mirror_url": "git:git.example.com/dtrupenn/Tetris",
      "hooks_url": "https://api.github.com/repos/dtrupenn/Tetris/hooks",
      "svn_url": "https://svn.github.com/dtrupenn/Tetris",
      "forks": 1,
      "open_issues": 1,
      "watchers": 1,
      "has_issues": true,
      "has_projects": true,
      "has_pages": true,
      "has_wiki": true,
      "has_downloads": true,
      "archived": true,
      "disabled": true,
      "visibility": "private",
      "license": {
        "key": "mit",
        "name": "MIT License",
        "url": "https://api.github.com/licenses/mit",
        "spdx_id": "MIT",
        "node_id": "MDc6TGljZW5zZW1pdA==",
        "html_url": "https://api.github.com/licenses/mit"
      }
    }
  ]
}
Search topics

Find topics via various criteria. Results are sorted by best match. This method returns up to 100 results per page. See "Searching topics" for a detailed list of qualifiers.

When searching for topics, you can get text match metadata for the topic's short_description, description, name, or display_name field when you pass the text-match media type. For more details about how to receive highlighted search results, see Text match metadata.

For example, if you want to search for topics related to Ruby that are featured on https://github.com/topics. Your query might look like this:

q=ruby+is:featured

This query searches for topics with the keyword ruby and limits the results to find only topics that are featured. The topics that are the best match for the query appear first in the search results.
Fine-grained access tokens for "Search topics"

This endpoint works with the following fine-grained token types:

    GitHub App user access tokens
    GitHub App installation access tokens
    Fine-grained personal access tokens

The fine-grained token does not require any permissions.

This endpoint can be used without authentication if only public resources are requested.
Parameters for "Search topics"
Headers
Name, Type, Description
accept string

Setting to application/vnd.github+json is recommended.
Query parameters
Name, Type, Description
q string Required

The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query.
per_page integer

The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30
page integer

The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
HTTP response status codes for "Search topics"
Status code	Description
200	

OK
304	

Not modified
Code samples for "Search topics"
Request example
get/search/topics

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit()

await octokit.request('GET /search/topics', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

Response

Status: 200
{
  "total_count": 6,
  "incomplete_results": false,
  "items": [
    {
      "name": "ruby",
      "display_name": "Ruby",
      "short_description": "Ruby is a scripting language designed for simplified object-oriented programming.",
      "description": "Ruby was developed by Yukihiro \"Matz\" Matsumoto in 1995 with the intent of having an easily readable programming language. It is integrated with the Rails framework to create dynamic web-applications. Ruby's syntax is similar to that of Perl and Python.",
      "created_by": "Yukihiro Matsumoto",
      "released": "December 21, 1995",
      "created_at": "2016-11-28T22:03:59Z",
      "updated_at": "2017-10-30T18:16:32Z",
      "featured": true,
      "curated": true,
      "score": 1
    },
    {
      "name": "rails",
      "display_name": "Rails",
      "short_description": "Ruby on Rails (Rails) is a web application framework written in Ruby.",
      "description": "Ruby on Rails (Rails) is a web application framework written in Ruby. It is meant to help simplify the building of complex websites.",
      "created_by": "David Heinemeier Hansson",
      "released": "December 13 2005",
      "created_at": "2016-12-09T17:03:50Z",
      "updated_at": "2017-10-30T16:20:19Z",
      "featured": true,
      "curated": true,
      "score": 1
    },
    {
      "name": "python",
      "display_name": "Python",
      "short_description": "Python is a dynamically typed programming language.",
      "description": "Python is a dynamically typed programming language designed by Guido Van Rossum. Much like the programming language Ruby, Python was designed to be easily read by programmers. Because of its large following and many libraries, Python can be implemented and used to do anything from webpages to scientific research.",
      "created_by": "Guido van Rossum",
      "released": "February 20, 1991",
      "created_at": "2016-12-07T00:07:02Z",
      "updated_at": "2017-10-27T22:45:43Z",
      "featured": true,
      "curated": true,
      "score": 1
    },
    {
      "name": "jekyll",
      "display_name": "Jekyll",
      "short_description": "Jekyll is a simple, blog-aware static site generator.",
      "description": "Jekyll is a blog-aware, site generator written in Ruby. It takes raw text files, runs it through a renderer and produces a publishable static website.",
      "created_by": "Tom Preston-Werner",
      "released": "2008",
      "created_at": "2016-12-16T21:53:08Z",
      "updated_at": "2017-10-27T19:00:24Z",
      "featured": true,
      "curated": true,
      "score": 1
    },
    {
      "name": "sass",
      "display_name": "Sass",
      "short_description": "Sass is a stable extension to classic CSS.",
      "description": "Sass is a stylesheet language with a main implementation in Ruby. It is an extension of CSS that makes improvements to the old stylesheet format, such as being able to declare variables and using a cleaner nesting syntax.",
      "created_by": "Hampton Catlin, Natalie Weizenbaum, Chris Eppstein",
      "released": "November 28, 2006",
      "created_at": "2016-12-16T21:53:45Z",
      "updated_at": "2018-01-16T16:30:40Z",
      "featured": true,
      "curated": true,
      "score": 1
    },
    {
      "name": "homebrew",
      "display_name": "Homebrew",
      "short_description": "Homebrew is a package manager for macOS.",
      "description": "Homebrew is a package manager for Apple's macOS operating system. It simplifies the installation of software and is popular in the Ruby on Rails community.",
      "created_by": "Max Howell",
      "released": "2009",
      "created_at": "2016-12-17T20:30:44Z",
      "updated_at": "2018-02-06T16:14:56Z",
      "featured": true,
      "curated": true,
      "score": 1
    }
  ]
}
Search users

Find users via various criteria. This method returns up to 100 results per page.

When searching for users, you can get text match metadata for the issue login, public email, and name fields when you pass the text-match media type. For more details about highlighting search results, see Text match metadata. For more details about how to receive highlighted search results, see Text match metadata.

For example, if you're looking for a list of popular users, you might try this query:

q=tom+repos:%3E42+followers:%3E1000

This query searches for users with the name tom. The results are restricted to users with more than 42 repositories and over 1,000 followers.

This endpoint does not accept authentication and will only include publicly visible users. As an alternative, you can use the GraphQL API. The GraphQL API requires authentication and will return private users, including Enterprise Managed Users (EMUs), that you are authorized to view. For more information, see "GraphQL Queries."
Fine-grained access tokens for "Search users"

This endpoint works with the following fine-grained token types:

    GitHub App user access tokens
    GitHub App installation access tokens
    Fine-grained personal access tokens

The fine-grained token does not require any permissions.

This endpoint can be used without authentication if only public resources are requested.
Parameters for "Search users"
Headers
Name, Type, Description
accept string

Setting to application/vnd.github+json is recommended.
Query parameters
Name, Type, Description
q string Required

The query contains one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see Constructing a search query. See "Searching users" for a detailed list of qualifiers.
sort string

Sorts the results of your query by number of followers or repositories, or when the person joined GitHub. Default: best match

Can be one of: followers, repositories, joined
order string

Determines whether the first search result returned is the highest number of matches (desc) or lowest number of matches (asc). This parameter is ignored unless you provide sort.

Default: desc

Can be one of: desc, asc
per_page integer

The number of results per page (max 100). For more information, see "Using pagination in the REST API."

Default: 30
page integer

The page number of the results to fetch. For more information, see "Using pagination in the REST API."

Default: 1
HTTP response status codes for "Search users"
Status code	Description
200	

OK
304	

Not modified
422	

Validation failed, or the endpoint has been spammed.
503	

Service unavailable
Code samples for "Search users"
Request example
get/search/users

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit()

await octokit.request('GET /search/users', {
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

Response

Status: 200
{
  "total_count": 12,
  "incomplete_results": false,
  "items": [
    {
      "login": "mojombo",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://secure.gravatar.com/avatar/25c7c18223fb42a4c6ae1c8db6f50f9b?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
      "gravatar_id": "",
      "url": "https://api.github.com/users/mojombo",
      "html_url": "https://github.com/mojombo",
      "followers_url": "https://api.github.com/users/mojombo/followers",
      "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
      "organizations_url": "https://api.github.com/users/mojombo/orgs",
      "repos_url": "https://api.github.com/users/mojombo/repos",
      "received_events_url": "https://api.github.com/users/mojombo/received_events",
      "type": "User",
      "score": 1,
      "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
      "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
      "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
      "site_admin": true
    }
  ]
}
`
export default examples
