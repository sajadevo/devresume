// @types
import type { InferSelectModel } from "drizzle-orm";
import type { GitHubProfile } from "next-auth/providers/github";

// @schemas
import { profile as profileSchema } from "@/lib/schema";

type Profile = InferSelectModel<typeof profileSchema>;

declare module "next-auth" {
  export interface Session {
    user: GitHubProfile;
  }
}
