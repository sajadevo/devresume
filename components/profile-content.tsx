// @components
import Link from "next/link";
import { AnalyticsChart } from "@/components/analytics-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileImprovementDialog } from "@/components/profile-improvement-dialog";

// @icons
import {
  RiImageFill,
  RiArrowRightUpFill,
  RiFolderReduceFill,
} from "@remixicon/react";

// @actions
import { getProfile } from "@/lib/actions";

// @types
import { Profile } from "@/types";

export async function ProfileContent({
  username,
  isAuthenticated,
}: {
  username: string;
  isAuthenticated?: boolean;
}) {
  const profile: Profile = await getProfile(username);

  const createdAt = new Date(profile.createdAt as string);
  const updatedAt = new Date(profile.updatedAt as string);

  const dateRange = `${createdAt?.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
  })} - ${updatedAt?.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
  })}`;

  const ghOverview = JSON.parse(profile.ghOverview as string);

  const data = [
    {
      name: "commit",
      fill: "var(--color-commit)",
      value: Number(ghOverview.commits),
    },
    {
      name: "pr",
      fill: "var(--color-pr)",
      value: Number(ghOverview.pullRequests),
    },
    {
      name: "issue",
      fill: "var(--color-issue)",
      value: Number(ghOverview.issues),
    },
    {
      name: "code-review",
      fill: "var(--color-code-review)",
      value: Number(ghOverview.codeReviews),
    },
    {
      name: "repo",
      fill: "var(--color-repo)",
      value: Number(ghOverview.repositories),
    },
    {
      name: "star",
      fill: "var(--color-star)",
      value: Number(ghOverview.stars),
    },
  ].filter((item) => item.value !== 0);

  const projects = JSON.parse(profile.projects as unknown as string);
  const languages = JSON.parse(profile.languages as string);

  return (
    <>
      <div className="flex items-center justify-between gap-4 md:gap-6 flex-wrap">
        <Avatar className="size-12">
          <AvatarImage src={profile.avatar!} />
          <AvatarFallback>{profile.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex items-start flex-wrap gap-y-4 gap-x-12">
          <div className="text-foreground">
            {profile.location && <p>{profile.location}</p>}
            {profile.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="hover:text-primary transition-colors duration-300"
              >
                {profile.email}
              </Link>
            )}
          </div>
          <div className="text-foreground">
            {profile.portfolio && (
              <Link
                target="_blank"
                href={
                  profile.portfolio.startsWith("https://")
                    ? profile.portfolio
                    : `https://${profile.portfolio}`
                }
                className="block hover:text-primary transition-colors duration-300"
              >
                {profile.portfolio}
              </Link>
            )}
            {profile.x && (
              <Link
                target="_blank"
                href={`https://x.com/${profile.x}`}
                className="block hover:text-primary transition-colors duration-300"
              >
                https://x.com/{profile.x}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            {profile.name || profile.username}
          </h1>
          <ProfileImprovementDialog profile={profile} />
        </div>
        <p className="text-foreground text-base md:text-lg max-w-xl text-balance">
          {profile.bio}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-foreground">
            Followed by{" "}
            <span className="text-black font-medium">{profile.followers}</span>{" "}
            devs
          </p>
          <span>⋅</span>
          <p className="text-foreground">
            Following{" "}
            <span className="text-black font-medium">{profile.following}</span>{" "}
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
          {projects.length > 0 ? (
            projects.map(
              (
                {
                  url,
                  name,
                  stars,
                  languages,
                }: {
                  url: string;
                  name: string;
                  stars: number;
                  languages: string[];
                },
                key: number
              ) => (
                <div
                  key={key}
                  className="border border-border rounded-2xl py-5 px-6 capitalize"
                >
                  <Link
                    href={url}
                    target="_blank"
                    className="text-lg flex items-center gap-2 font-semibold text-black hover:text-primary transition-colors duration-300 mb-2"
                  >
                    <span className="block truncate">
                      {name.replaceAll("-", " ").replaceAll("_", " ")}
                    </span>
                    <RiArrowRightUpFill className="size-6" />
                  </Link>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-foreground text-sm">
                      {new Intl.NumberFormat("en-US").format(stars)} Stars
                    </span>
                    {languages.length > 0 && (
                      <>
                        <span>⋅</span>
                        <span className="text-foreground text-sm">
                          {languages.join(", ")}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <div className="border border-border p-6 grid place-items-center rounded-2xl col-span-full">
              <div className="text-center">
                <RiFolderReduceFill className="size-12 text-black/50 mx-auto" />
                <p className="text-foreground/50 text-base max-w-lg mx-auto text-center mt-4 text-balance">
                  {isAuthenticated
                    ? `You don't have any projects yet. To add your projects, please pin your top repositories on your GitHub profile. If you already have pinned repositories, please click the "Sync with GitHub" button on the sidebar.`
                    : "This user doesn't have any projects yet. Either user haven't pinned any repositories on their GitHub profile or their repositories are private."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-semibold tracking-tight text-black mb-6">
          Languages of Choice
        </h3>
        <div className="flex items-center gap-4 flex-wrap">
          {languages?.map((language: string, key: number) => {
            const filteredLanguages = ["Vue", "SCSS", "HTML"];
            const filteredLanguagesReplace: { [key: string]: string } = {
              Vue: "vuedotjs",
              SCSS: "sass",
              HTML: "html5",
            };
            const languageName = filteredLanguages.includes(language)
              ? filteredLanguagesReplace[
                  language as keyof typeof filteredLanguagesReplace
                ]
              : language.toLowerCase();

            return (
              <div key={key} className="flex items-center gap-2">
                <Avatar className="size-5 rounded-xs border-none">
                  <AvatarImage
                    alt={language}
                    width={20}
                    height={20}
                    src={`https://cdn.jsdelivr.net/npm/simple-icons/icons/${languageName}.svg`}
                  />
                  <AvatarFallback className="border border-secondary rounded-xs bg-background">
                    <RiImageFill className="size-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-foreground text-sm mr-2">{language}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
