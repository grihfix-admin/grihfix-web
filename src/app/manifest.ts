import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GrihFix — Home Services in Darbhanga",
    short_name: "GrihFix",
    description: "Book verified cleaning, plumbing, electrical and car care services in Darbhanga.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d75bd",
    icons: [
      { src: "/favicon.png", sizes: "400x400", type: "image/png", purpose: "any" },
      { src: "/favicon.png", sizes: "400x400", type: "image/png", purpose: "maskable" },
    ],
  };
}
