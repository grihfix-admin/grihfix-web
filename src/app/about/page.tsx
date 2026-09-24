import type { Metadata } from "next";

import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us • GrihFix Darbhanga",
  description:
    "Meet the local Darbhanga team behind GrihFix — verified technicians, transparent pricing, and process-driven home services since day one.",
};

export default function AboutPage() {
  return <AboutContent />;
}
