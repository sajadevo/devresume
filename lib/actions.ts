"use server";

// @utils
import { fetchGraphQL } from "@/lib/graphql-client";
import { signIn, signOut as signOutFn } from "@/auth";

// @queries
import { getUserLanguagesQuery, getUserPinnedReposQuery } from "@/lib/queries";

const endpoint = "https://api.github.com";
const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

export async function getUserCommits(username: string) {
  const request = await fetch(
    `${endpoint}/search/commits?q=author:${username}`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${githubAccessToken}`,
      },
    }
  );

  const data = await request.json();

  return data.total_count || 0;
}

export async function getUserPullRequests(username: string) {
  const request = await fetch(
    `${endpoint}/search/issues?q=type:pr+author:${username}`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${githubAccessToken}`,
      },
    }
  );

  const response = await request.json();

  return response.total_count || 0;
}

export async function getUserIssues(username: string) {
  const request = await fetch(
    `${endpoint}/search/issues?q=author:${username}+is:issue`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${githubAccessToken}`,
      },
    }
  );

  const response = await request.json();

  return response.total_count || 0;
}

export async function getUserCoreReview(username: string) {
  const request = await fetch(
    `${endpoint}/search/issues?q=is:pr+reviewed-by:${username}`,
    {
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: `Bearer ${githubAccessToken}`,
      },
    }
  );

  const response = await request.json();

  return response.total_count || 0;
}

export async function getUserLanguages(username: string) {
  const response = (await fetchGraphQL(getUserLanguagesQuery, {
    username,
  })) as UserLanguages;

  const data = response.user.repositories.nodes.map((repo) =>
    repo.languages.edges.map((lang) => lang.node.name)
  );

  return Array.from(new Set(data.flat()));
}

export async function getUserPinnedRepos(username: string) {
  const response = (await fetchGraphQL(getUserPinnedReposQuery, {
    username,
  })) as UserPinnedRepo;

  const data = response.user.pinnedItems.edges.map(({ node }) => ({
    name: node.name,
    url: node.url,
    stargazerCount: node.stargazerCount,
    languages: node.languages.edges.map((lang) => lang.node.name),
  }));

  return data;
}

export async function signOut() {
  await signOutFn({ redirectTo: "/" });
}

export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/" });
}
