import { Container } from "@/components/ui/Container";

const points = [
  "If a service is cancelled at least 6 hours before the scheduled slot, any advance payment is fully refundable. Same-day cancellations attract a nominal ₹199 scheduling fee to cover technician dispatch costs.",
  "In the unlikely event a job cannot be completed because of our team (equipment failure, technician unavailability, etc.), we either reschedule at no extra cost or issue a full refund within 3–5 business days.",
  "Refunds are processed via the original payment method—UPI, card, or bank transfer. Once we initiate the refund, bank processing timelines apply; we’ll share transaction details for your records.",
  "If you are unhappy with the service quality, please let us know within 24 hours. We’ll offer a complimentary touch-up visit or partial refund depending on the situation, after reviewing photos and technician notes.",
];

export default function RefundPolicyPage() {
  return (
    <Container className="py-12 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Refund Policy</h1>
      {points.map((text) => (
        <p key={text} className="text-slate-700 leading-relaxed">
          {text}
        </p>
      ))}
      <p className="text-slate-600">
        For any refund-related questions, call +91 97098 70726 or email grihfix.service@gmail.com with your booking ID.
      </p>
    </Container>
  );
}

