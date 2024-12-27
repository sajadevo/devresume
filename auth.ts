// @utils
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user, profile }: any) {
      if (user) token.user = user;
      if (profile) token.profile = profile;

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user = token.profile;
      }

      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/",
  },
});
