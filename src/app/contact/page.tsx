import type { Metadata } from "next";

import { ContactForm } from "./Form";

export const metadata: Metadata = {
  title: "Book a service • GrihFix Darbhanga",
  description:
    "Schedule deep cleaning, plumbing, electrical, car wash or tank cleaning with Darbhanga’s GrihFix team. Choose your slot, add service-specific details, and confirm via WhatsApp.",
};

export default function ContactPage() {
  return <ContactForm />;
}
