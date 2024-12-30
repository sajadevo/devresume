// @components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubAuth } from "@/components/github-auth";
import { DeleteButton } from "@/components/delete-button";
import { CopyLinkButton } from "@/components/copy-link-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// @icons
import { RiUserSmileFill } from "@remixicon/react";

// @utils
import { auth } from "@/auth";

// @actions
import { getProfileBasicInfo } from "@/lib/actions";

export async function AppSidenav() {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);

  const profile = isAuthenticated
    ? await getProfileBasicInfo(session?.user.login!)
    : null;

  return (
    <div className="p-6 h-max lg:h-screen sticky top-0 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <Button size="icon" className="size-8 grid place-items-center" asChild>
          <Link href="/">
            <RiUserSmileFill className="size-5" />
          </Link>
        </Button>
        <div className="translate-y-px">
          <Link
            href="/"
            className="text-sm block mb-0.5 font-semibold text-black leading-none"
          >
            DevResume
          </Link>
          <p className="text-sm text-foreground">
            By{" "}
            <Link
              target="_blank"
              href="https://x.com/sajadevo_"
              className="hover:text-primary leading-none transition-colors duration-300"
            >
              Sajad
            </Link>
          </p>
        </div>
      </div>
      <div className="py-12 lg:py-6 max-w-sm">
        {isAuthenticated ? (
          <div className="mb-8">
            <Avatar className="size-12 mb-3">
              <AvatarImage src={profile?.avatar} />
              <AvatarFallback>{profile?.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="text-black text-3xl font-semibold tracking-tight mb-2">
              Welcome 👋🏻
            </div>
            <p className="text-foreground">
              Thanks for using DevResume, you can see your generated resume on
              the right side.
              <br />
              <br />
              Currently we are using only your github profile public info to
              generate your resume, everything that is private will not be used.
            </p>
          </div>
        ) : (
          <h2 className="text-black text-3xl font-semibold tracking-tight mb-8">
            Generate resume based on your Github profile 🚀
          </h2>
        )}
        <GithubAuth isAuthenticated={isAuthenticated} />
        {isAuthenticated && (
          <>
            <div className="mt-4">
              <CopyLinkButton username={session?.user.login!} />
            </div>
            <div className="flex items-center justify-center text-foreground/50 pointer-events-none select-none gap-2 my-4">
              <span>⋅</span>
              <span>⋅</span>
              <span>⋅</span>
            </div>
            <DeleteButton username={session?.user.login!} />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-foreground">&copy; 2024</p>
        <span className="text-foreground leading-none">⋅</span>
        <Link
          href="/privacy-policy"
          className="text-sm text-foreground hover:text-primary transition-colors duration-300"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
