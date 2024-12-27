// @types
import type { GitHubProfile } from "next-auth/providers/github";

declare module "next-auth" {
  export interface Session {
    user: GitHubProfile;
  }
}
