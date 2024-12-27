// @utils
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// @types
import type { Metadata } from "next";

const isProd = process.env.NODE_ENV === "production";

export function generateMetadata(args?: Metadata): Metadata {
  const title = args?.title || "DevResume";
  const description =
    args?.description ||
    "Generate a beautiful resume based on your GitHub profile data.";
  const domain = new URL(
    isProd
      ? process.env.NEXT_PUBLIC_PROD_URL!
      : process.env.NEXT_PUBLIC_DEV_URL!
  );
  const productDemoImg = "/demo.png";

  return {
    // general
    metadataBase: domain,
    title,
    description,
    alternates: { canonical: domain, ...args?.alternates },

    // open-graph
    openGraph: {
      type: "website",
      url: domain,
      title,
      description,
      images: [
        {
          url: productDemoImg,
        },
      ],
      ...args?.openGraph,
    },

    // twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: productDemoImg,
      ...args?.twitter,
    },
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}