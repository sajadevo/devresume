// @types
import type { MetadataRoute } from "next";

const isProd = process.env.NODE_ENV === "production";
const domain = isProd
  ? process.env.NEXT_PUBLIC_PROD_URL!
  : process.env.NEXT_PUBLIC_DEV_URL!;

const routes = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${domain}/${route}`,
    lastModified: new Date(),
  }));
}
