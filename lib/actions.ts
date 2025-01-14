"use server";

// @utils
import { cache } from "react";
import { fetchGraphQL } from "@/lib/graphql-client";
import { createClient } from "@/lib/supabase/server";
import { signIn, signOut as signOutFn } from "@/auth";

// @queries
import {
  getUserLanguagesQuery,
  getUserPinnedReposQuery,
  getUserTotalStarsQuery,
} from "@/lib/queries";

// @schemas
import { profile as profileSchema } from "@/lib/schema";

// @types
import type { InferInsertModel } from "drizzle-orm";

const endpoint = "https://api.github.com";
const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

export const getUserTotalStars = cache(async (username: string) => {
  const response = (await fetchGraphQL(getUserTotalStarsQuery, {
    username,
  })) as UserStars;

  const stars = response.user.repositories.edges.reduce(
    (acc, repo) => acc + repo.node.stargazerCount,
    0
  );

  return stars || 0;
});

export async function syncUserProfile(username: string) {
  const supabase = await createClient();

  const profileResponse = await fetch(`${endpoint}/user`, {
    headers: {
      Accept: "application/vnd.github.cloak-preview",
      Authorization: `Bearer ${githubAccessToken}`,
    },
  });

  const profile = await profileResponse.json();

  const promises = await Promise.all([
    await getUserCommits(username!),
    await getUserPullRequests(username!),
    await getUserIssues(username!),
    await getUserCodeReview(username!),
    await getUserPinnedRepos(username!),
    await getUserLanguages(username!),
    await getUserTotalStars(username!),
  ]);

  const ghOverview = JSON.stringify({
    commits: promises[0],
    pullRequests: promises[1],
    issues: promises[2],
    codeReviews: promises[3],
    repositories: profile.public_repos,
    stars: promises[6],
  });

  const projects = JSON.stringify(
    promises[4].map((project) => ({
      name: project.name,
      url: project.url,
      stars: project.stargazerCount,
      languages: project.languages,
    }))
  );

  const userData = {
    username,
    projects,
    ghOverview,
    bio: profile.bio,
    name: profile.name,
    email: profile.email,
    portfolio: profile.blog,
    avatar: profile.avatar_url,
    location: profile.location,
    x: profile.twitter_username,
    followers: profile.followers,
    following: profile.following,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
    languages: JSON.stringify(promises[5]),
  };

  try {
    await supabase.from("profiles").update(userData).eq("username", username);
  } catch (error: any) {
    throw new Error(error?.message || "An error occurred!");
  }
}

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

export const getProfileBasicInfo = cache(async (username: string) => {
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
});

export const getProfile = cache(async (username: string) => {
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
});

export async function storeProfile(
  profile: InferInsertModel<typeof profileSchema> & {
    repositories: number;
  }
) {
  const supabase = await createClient();

  const username = profile.username;

  const isAuthorized = await isProfileExists(username!);

  const promises = await Promise.all([
    await getUserCommits(username!),
    await getUserPullRequests(username!),
    await getUserIssues(username!),
    await getUserCodeReview(username!),
    await getUserPinnedRepos(username!),
    await getUserLanguages(username!),
    await getUserTotalStars(username!),
  ]);

  const ghOverview = JSON.stringify({
    commits: promises[0],
    pullRequests: promises[1],
    issues: promises[2],
    codeReviews: promises[3],
    repositories: profile.repositories,
    stars: promises[6],
  });

  const projects = JSON.stringify(
    promises[4].map((project) => ({
      name: project.name,
      url: project.url,
      stars: project.stargazerCount,
      languages: project.languages,
    }))
  );

  const userData = {
    username,
    projects,
    ghOverview,
    x: profile.x,
    name: profile.name,
    bio: profile.bio,
    email: profile.email,
    avatar: profile.avatar,
    location: profile.location,
    portfolio: profile.portfolio,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
    followers: profile.followers,
    following: profile.following,
    languages: JSON.stringify(promises[5]),
  };

  try {
    if (isAuthorized) {
      await supabase.from("profiles").update(userData).eq("username", username);
    } else {
      await supabase.from("profiles").insert(userData);
    }
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

export const getUserCommits = cache(async (username: string) => {
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
});

export const getUserPullRequests = cache(async (username: string) => {
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
});

export const getUserIssues = cache(async (username: string) => {
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
});

export const getUserCodeReview = cache(async (username: string) => {
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
});

export const getUserLanguages = cache(async (username: string) => {
  const response = (await fetchGraphQL(getUserLanguagesQuery, {
    username,
  })) as UserLanguages;

  const data = response.user.repositories.nodes.map((repo) =>
    repo.languages.edges.map((lang) => lang.node.name)
  );

  return Array.from(new Set(data.flat()));
});

export const getUserPinnedRepos = cache(async (username: string) => {
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
});

export async function signOut() {
  await signOutFn({ redirectTo: "/" });
}

export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/" });
}
