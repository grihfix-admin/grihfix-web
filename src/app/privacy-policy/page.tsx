import { Container } from "@/components/ui/Container";

const paragraphs = [
  "We collect only the information necessary to schedule and deliver your home services—name, phone, address, and service preferences. This data helps our Darbhanga operations team coordinate punctual visits and share updates over WhatsApp, SMS, or calls.",
  "Your personal information is never sold or shared with third parties for marketing. We only share details with assigned technicians who are verified and trained to follow safety protocols.",
  "All booking data is stored in secure systems with restricted access. When you request deletion of your information, we remove active records while retaining legally required service logs.",
  "If you have questions about how your information is used, email grihfix.service@gmail.com or call +91 97098 70726. We aim to respond to all privacy requests within two business days.",
];

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-12 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-slate-700 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </Container>
  );
}

