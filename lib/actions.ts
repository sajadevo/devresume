"use server";

// @utils
import { signIn, signOut as signOutFn } from "@/auth";

const ENDPOINT = "https://api.github.com";
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

export async function getUserLanguages(username: string) {
  // Fetch user repositories
  const reposResponse = await fetch(
    `${ENDPOINT}/users/${username}/repos?per_page=10&sort=pushed`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  const repos = await reposResponse.json();

  if (!Array.isArray(repos)) {
    console.error("Error fetching repos:", repos);
    return;
  }

  // Fetch languages for each repository
  const repoData = await Promise.all(
    repos.map(async (repo) => {
      if (!repo.fork) {
        const languagesResponse = await fetch(
          `${ENDPOINT}/repos/${username}/${repo.name}/languages`,
          {
            headers: {
              Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            },
          }
        );

        const languages = await languagesResponse.json();

        return languages;
      }
    })
  );

  return Array.from(new Set(repoData.filter(Boolean).flatMap(Object.keys)));
}

export async function getUserRepos(username: string) {
  // Fetch user repositories
  const reposResponse = await fetch(
    `${ENDPOINT}/users/${username}/repos?per_page=10&sort=pushed`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  const repos = await reposResponse.json();

  if (!Array.isArray(repos)) {
    console.error("Error fetching repos:", repos);
    return;
  }

  // Fetch commit count for each repository
  const repoData = await Promise.all(
    repos.map(async (repo) => {
      if (!repo.fork) {
        const commitsResponse = await fetch(
          repo.commits_url.replace("{/sha}", ""),
          {
            headers: {
              Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
            },
          }
        );

        const commits = await commitsResponse.json();

        return {
          name: repo.name,
          url: repo.html_url,
          language: repo.language,
          createdAt: repo.created_at,
          stars: repo.stargazers_count,
          commits: Array.isArray(commits) ? commits.length : 0,
        };
      }
    })
  );

  // Sort repositories by stars and commits
  const sortedRepos = repoData.sort((a, b) => {
    // Sort primarily by stars, secondarily by commits
    if (b?.stars !== a?.stars) return b?.stars - a?.stars;
    return b?.commits! - a?.commits!;
  });

  return sortedRepos.slice(0, 4).filter(Boolean);
}

export async function getUserCommits(username: string) {
  const request = await fetch(
    `${ENDPOINT}/search/commits?q=author:${username}`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  const data = await request.json();

  return data.total_count || 0;
}

export async function getUserPullRequests(username: string) {
  const request = await fetch(
    `${ENDPOINT}/search/issues?q=type:pr+author:${username}`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  const response = await request.json();

  return response.total_count || 0;
}

export async function getUserIssues(username: string) {
  const request = await fetch(
    `${ENDPOINT}/search/issues?q=author:${username}+is:issue`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  const response = await request.json();

  return response.total_count || 0;
}

export async function getUserCoreReview(username: string) {
  const request = await fetch(
    `${ENDPOINT}/search/issues?q=is:pr+reviewed-by:${username}`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  const response = await request.json();

  return response.total_count || 0;
}

export async function signOut() {
  await signOutFn({ redirectTo: "/" });
}

export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/" });
}
