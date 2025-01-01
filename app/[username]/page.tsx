// @components
import { ProfileContent } from "@/components/profile-content";

// @icons
import { RiUserUnfollowFill } from "@remixicon/react";

// @actions
import { isProfileExists } from "@/lib/actions";

// @types
import type { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = (await params).username;

  return {
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_PROD_URL}/${username}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const isProfileExist = await isProfileExists(username);

  if (!isProfileExist) {
    return (
      <div className="h-full grid place-items-center">
        <div className="opacity-50">
          <RiUserUnfollowFill className="size-24 text-black mx-auto" />
          <p className="text-foreground text-base md:text-lg max-w-md mx-auto text-center mt-8 text-balance">
            Sorry, it seems like this user has not created a DevResume yet.
          </p>
        </div>
      </div>
    );
  }

  return <ProfileContent username={username} />;
}
