import type { Metadata } from "next";

import { PricingEstimator } from "./PricingEstimator";

export const metadata: Metadata = {
  title: "Pricing & estimates • GrihFix Darbhanga",
  description:
    "Calculate your home cleaning, tank cleaning, plumbing and electrical service costs with GrihFix Darbhanga’s transparent price estimator and FAQ.",
};

export default function PricingPage() {
  return <PricingEstimator />;
}
