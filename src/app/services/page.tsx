import type { Metadata } from "next";

import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Services • GrihFix Darbhanga",
  description:
    "Browse Darbhanga's most trusted home services — deep cleaning, tank cleaning, plumbing, electrical fixes, car cleaning and more with transparent pricing.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
