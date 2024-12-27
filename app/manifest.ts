// @types
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevResume",
    short_name: "DevResume",
    description:
      "Generate a beautiful resume based on your GitHub profile data.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#f8fafc",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
