// @types
import type { MetadataRoute } from "next";

const isProd = process.env.NODE_ENV === "production";
const domain = isProd
  ? process.env.NEXT_PUBLIC_PROD_URL!
  : process.env.NEXT_PUBLIC_DEV_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    host: domain,
    sitemap: `${domain}/sitemap.xml`,
  };
}
