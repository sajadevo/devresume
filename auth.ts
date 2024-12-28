// @utils
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// @actions
import { storeProfile } from "@/lib/actions";

// @types
import { GitHubProfile } from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, profile }: any) {
      const githubProfile = profile as GitHubProfile;

      if (profile) {
        token.login = githubProfile.login;

        await storeProfile({
          name: githubProfile.name,
          bio: githubProfile.bio,
          avatar: githubProfile.avatar_url,
          email: githubProfile.email,
          username: githubProfile.login,
          portfolio: githubProfile.blog,
          location: githubProfile.location,
          x: githubProfile.twitter_username,
          following: githubProfile.following,
          followers: githubProfile.followers,
          createdAt: githubProfile.created_at,
          updatedAt: githubProfile.updated_at,
          repositories:
            githubProfile.public_repos +
            (githubProfile.total_private_repos || 0),
        });
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          login: token.login,
        },
      };
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/",
  },
});
