// @utils
import { pgTable, serial, text, date, json } from "drizzle-orm/pg-core";

// profile schema
export const profile = pgTable("profiles", {
  id: serial("id").primaryKey(),
  createdAt: date("createdAt").notNull().defaultNow(),
  updatedAt: date("updatedAt").notNull().defaultNow(),
  username: text("username").unique(),
  name: text("name"),
  avatar: text("avatar"),
  bio: text("bio"),
  location: text("location"),
  email: text("email").unique(),
  x: text("x"),
  portfolio: text("portfolio"),
  followers: text("followers"),
  following: text("following"),
  ghOverview: json("ghOverview").default({
    commits: 0,
    pullRequests: 0,
    issues: 0,
    repositories: 0,
    codeReviews: 0,
  }),
  projects:
    json("projects").$type<
      { name: string; url: string; stars: string; languages: string[] }[]
    >(),
  languages: json("languages").default([]),
});
