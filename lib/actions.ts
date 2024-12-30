"use server";

// @utils
import { fetchGraphQL } from "@/lib/graphql-client";
import { createClient } from "@/lib/supabase/server";
import { signIn, signOut as signOutFn } from "@/auth";

// @queries
import { getUserLanguagesQuery, getUserPinnedReposQuery } from "@/lib/queries";

// @schemas
import { profile as profileSchema } from "@/lib/schema";

// @types
import type { InferInsertModel } from "drizzle-orm";

const endpoint = "https://api.github.com";
const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

export async function deleteProfile(username: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("username", username);

  if (error) {
    throw new Error(error.message);
  }

  await signOut();
}

export async function getProfileBasicInfo(username: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("avatar,name")
    .eq("username", username)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProfile(username: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function storeProfile(
  profile: InferInsertModel<typeof profileSchema> & {
    repositories: number;
  }
) {
  const supabase = await createClient();

  const x = profile.x;
  const name = profile.name;
  const bio = profile.bio;
  const email = profile.email;
  const avatar = profile.avatar;
  const username = profile.username;
  const location = profile.location;
  const portfolio = profile.portfolio;
  const createdAt = profile.createdAt;
  const updatedAt = profile.updatedAt;
  const followers = profile.followers;
  const following = profile.following;

  const isAuthorized = await isProfileExists(username!);

  if (isAuthorized) {
    return;
  }

  const promises = await Promise.all([
    await getUserCommits(username!),
    await getUserPullRequests(username!),
    await getUserIssues(username!),
    await getUserCodeReview(username!),
    await getUserPinnedRepos(username!),
    await getUserLanguages(username!),
  ]);

  const ghOverview = JSON.stringify({
    commits: promises[0],
    pullRequests: promises[1],
    issues: promises[2],
    codeReviews: promises[3],
    repositories: profile.repositories,
  });

  const projects = JSON.stringify(
    promises[4].map((project) => ({
      name: project.name,
      url: project.url,
      stars: project.stargazerCount,
      languages: project.languages,
    }))
  );

  try {
    await supabase
      .from("profiles")
      .upsert({
        x,
        name,
        bio,
        avatar,
        email,
        username,
        location,
        portfolio,
        createdAt,
        updatedAt,
        followers,
        following,
        ghOverview,
        projects,
        languages: JSON.stringify(promises[5]),
      })
      .eq("username", username);
  } catch (error: any) {
    throw new Error(error?.message || "An error occurred!");
  }
}

export async function isProfileExists(username: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username);

  if (error) {
    throw new Error(error.message);
  }

  return data.length > 0 ? true : false;
}

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

export async function getUserCodeReview(username: string) {
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
