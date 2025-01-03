// @components
import { ProfileContent } from "@/components/profile-content";

// @icons
import { RiUserUnfollowFill } from "@remixicon/react";

// @actions
import { isProfileExists, getProfile } from "@/lib/actions";

// @schemas
import { profile as profileSchema } from "@/lib/schema";

// @utils
import { generateMetadata as generateMetadataFn } from "@/lib/utils";

// @types
import type { Metadata } from "next";
import type { InferSelectModel } from "drizzle-orm";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;
  const profile: InferSelectModel<typeof profileSchema> = await getProfile(
    username
  );

  const title = `${profile.name} | DevResume`;
  const description = profile.bio;
  const domain = new URL(
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_PROD_URL}/${username}`
      : `${process.env.NEXT_PUBLIC_DEV_URL}/${username}`
  );
  const productDemoImg = "/demo.png";

  return generateMetadataFn({
    title,
    description,
    alternates: {
      canonical: domain,
    },
    openGraph: {
      type: "profile",
      url: domain,
      images: [
        {
          url: profile.avatar || productDemoImg,
        },
      ],
    },
    twitter: {
      card: "summary",
      images: profile.avatar || productDemoImg,
    },
  });
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
