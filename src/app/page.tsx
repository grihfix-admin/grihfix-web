import type { Metadata } from "next";

import { HomeContent } from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "GrihFix — Local home services for Darbhanga",
  description:
    "Book deep cleaning, tank cleaning, plumbing, electrical repairs and car cleaning by verified Darbhanga professionals. Instant WhatsApp support and transparent pricing.",
};

export default function HomePage() {
  return <HomeContent />;
}
