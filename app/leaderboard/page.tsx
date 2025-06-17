// @components
import Link from "next/link";
import Image from "next/image";
import { LeaderboardBadge } from "@/components/leaderboard-badge";
import { LeaderboardHeader } from "@/components/leaderboard-header";

// @actions
import { getAllUsers } from "@/lib/actions";

// @utils
import { generateMetadata } from "@/lib/utils";

const validFilters = {
  commits: "commits",
  stars: "stars",
  prs: "pullRequests",
  issues: "issues",
  reviews: "codeReviews",
};

export const metadata = generateMetadata({
  title: "Leaderboard - DevResume",
  description: "Check out the top performers on DevResume.",
});

export default async function Rankings({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const query = await searchParams;
  const sort = query.sort as keyof typeof validFilters;

  const users = await getAllUsers();

  const sortedData = users.sort((a, b) => {
    const aCommits =
      JSON.parse(a.ghOverview)[validFilters[sort] || "commits"] || 0;
    const bCommits =
      JSON.parse(b.ghOverview)[validFilters[sort] || "commits"] || 0;

    return bCommits - aCommits;
  });

  return (
    <div className="md:py-2 group">
      <LeaderboardHeader sort={sort || ""} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedData.map(({ username, name, avatar, ghOverview }) => {
          const { commits, pullRequests, issues, codeReviews, stars } =
            JSON.parse(ghOverview);

          return (
            <Link
              key={username}
              href={`/${username}`}
              className="border border-secondary hover:bg-secondary p-4 rounded-2xl transition-colors duration-300 group-has-[[data-pending]]:animate-pulse"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={avatar}
                  alt={`${name || username}'s avatar`}
                  width={256}
                  height={256}
                  className="size-8 rounded-full"
                />
                <div className="font-semibold text-black leading-none">
                  {name || username}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <LeaderboardBadge
                  type="commit"
                  value={commits}
                  label="Commit"
                  emoji="📝"
                  isActive={sort === "commits"}
                />
                <LeaderboardBadge
                  type="pr"
                  value={pullRequests}
                  label="PR"
                  emoji="🚀"
                  isActive={sort === "prs"}
                />
                <LeaderboardBadge
                  type="issue"
                  value={issues}
                  label="Issue"
                  emoji="⚠️"
                  isActive={sort === "issues"}
                />
                <LeaderboardBadge
                  type="review"
                  value={codeReviews}
                  label="Review"
                  emoji="✅"
                  isActive={sort === "reviews"}
                />
                <LeaderboardBadge
                  type="star"
                  value={stars || 0}
                  label="Star"
                  emoji="⭐"
                  isActive={sort === "stars"}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
