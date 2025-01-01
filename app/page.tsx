// @components
import { ProfileContent } from "@/components/profile-content";

// @icons
import { RiArticleFill } from "@remixicon/react";

// @utils
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return (
      <div className="h-full grid place-items-center">
        <div className="opacity-50">
          <RiArticleFill className="size-24 text-black mx-auto" />
          <p className="text-foreground text-base md:text-lg max-w-md mx-auto text-center mt-8 text-balance">
            You need to sign in with your GitHub & LinkedIn accounts to see your
            DevResume.
          </p>
        </div>
      </div>
    );
  }

  const username = session.user.login;

  return <ProfileContent username={username} />;
}
