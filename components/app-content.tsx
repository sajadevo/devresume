// @components
import Link from "next/link";
import Image from "next/image";
import { AnalyticsChart } from "@/components/analytics-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// @icons
import { RiArrowRightUpFill, RiArticleFill } from "@remixicon/react";

// @utils
import { auth } from "@/auth";

// @actions
import {
  getUserRepos,
  getUserIssues,
  getUserCommits,
  getUserLanguages,
  getUserCoreReview,
  getUserPullRequests,
} from "@/lib/actions";

export async function AppContent() {
  const session = await auth();

  if (!session) {
    return (
      <div className="col-span-full lg:col-span-3 p-2">
        <div className="size-full bg-white border border-border text-center rounded-3xl px-6 py-6 md:px-10 md:py-8 grid place-items-center">
          <div className="max-w-lg mx-auto opacity-50">
            <RiArticleFill className="size-24 text-black mx-auto" />
            <p className="text-foreground text-base md:text-lg max-w-xl mt-8 text-balance">
              You need to sign in with your GitHub & LinkedIn accounts to see
              your DevResume.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const email = session.user.email;
  const website = session.user.blog;
  const username = session.user.login;
  const location = session.user.location;
  const twitter = session.user.twitter_username;

  // time range for the user
  const createdAt = new Date(session.user.created_at);
  const updatedAt = new Date(session.user.updated_at);

  const dateRange = `${createdAt.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
  })} - ${updatedAt.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
  })}`;

  // commits, prs, issues and code reviews data fetch in parallel
  const promises = await Promise.all([
    await getUserCommits(username),
    await getUserPullRequests(username),
    await getUserIssues(username),
    await getUserCoreReview(username),
  ]);

  const data = [
    {
      name: "commit",
      value: promises[0],
      fill: "var(--color-commit)",
    },
    {
      name: "pr",
      value: promises[1],
      fill: "var(--color-pr)",
    },
    {
      name: "issue",
      value: promises[2],
      fill: "var(--color-issue)",
    },
    {
      name: "code-review",
      value: promises[3],
      fill: "var(--color-code-review)",
    },
    {
      name: "repo",
      value:
        session.user.public_repos + (session.user.total_private_repos || 0),
      fill: "var(--color-repo)",
    },
  ];

  const projects = await getUserRepos(username);
  const languages = await getUserLanguages(username);

  return (
    <div className="col-span-full lg:col-span-3 p-2">
      <div className="size-full bg-white border border-border rounded-3xl px-6 py-6 md:px-10 md:py-8">
        <div className="flex items-center justify-between gap-4 md:gap-6 flex-wrap">
          <Avatar className="size-12">
            <AvatarImage src={session.user.avatar_url} />
            <AvatarFallback>{session.user.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex items-start flex-wrap gap-y-4 gap-x-12">
            <div className="text-foreground">
              {location && <p>{location}</p>}
              {email && (
                <Link
                  href={`mailto:${email}`}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {email}
                </Link>
              )}
            </div>
            <div className="text-foreground">
              {website && (
                <Link
                  target="_blank"
                  href={website as string}
                  className="block hover:text-primary transition-colors duration-300"
                >
                  {website}
                </Link>
              )}
              {twitter && (
                <Link
                  target="_blank"
                  href={`https://x.com/${twitter}`}
                  className="block hover:text-primary transition-colors duration-300"
                >
                  https://x.com/{twitter}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="my-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-black mb-2">
            {session.user.name}
          </h1>
          <p className="text-foreground text-base md:text-lg max-w-xl text-balance">
            {session.user.bio}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <p className="text-foreground">
              Followed by{" "}
              <span className="text-black font-medium">
                {session.user.followers}
              </span>{" "}
              devs
            </p>
            <span>⋅</span>
            <p className="text-foreground">
              Following{" "}
              <span className="text-black font-medium">
                {session.user.following}
              </span>{" "}
              devs
            </p>
          </div>
        </div>
        <AnalyticsChart data={data} dateRange={dateRange} />
        <div className="mt-12">
          <h3 className="text-xl font-semibold tracking-tight text-black mb-6">
            My Top Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((project, key) => (
              <div
                key={key}
                className="border border-border rounded-2xl py-5 px-6 capitalize"
              >
                <Link
                  href={project?.url}
                  target="_blank"
                  className="text-lg flex items-center gap-2 font-semibold text-black hover:text-primary transition-colors duration-300 mb-2"
                >
                  <span className="block truncate">
                    {project?.name.replaceAll("-", " ").replaceAll("_", " ")}
                  </span>
                  <RiArrowRightUpFill className="size-6" />
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-foreground text-sm">
                    {new Intl.NumberFormat("en-US").format(project?.stars)}{" "}
                    Stars
                  </span>
                  <span>⋅</span>
                  <span className="text-foreground text-sm">
                    {new Intl.NumberFormat("en-US").format(
                      project?.commits || 0
                    )}{" "}
                    Commits
                  </span>
                  <span>⋅</span>
                  <span className="text-foreground text-sm">
                    {project?.language}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-semibold tracking-tight text-black mb-6">
            Languages of Choice
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            {languages?.map((language, key) => (
              <div key={key} className="flex items-center gap-2">
                <Image
                  alt={language}
                  width={20}
                  height={20}
                  className="rounded-xs"
                  src={`https://cdn.jsdelivr.net/npm/programming-languages-logos/src/${language.toLowerCase()}/${language.toLowerCase()}.png`}
                />
                <span className="text-foreground text-sm mr-2">{language}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
