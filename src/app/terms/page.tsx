import { Container } from "@/components/ui/Container";

const sections = [
  {
    title: "Service commitments",
    body:
      "GrihFix offers home cleaning, plumbing, electrical and maintenance services within Darbhanga. Once you book, our coordinator confirms scope, pricing, and visit timing. Bookings may be rescheduled because of weather, access issues, or safety concerns—we’ll keep you informed at every step.",
  },
  {
    title: "Customer responsibilities",
    body:
      "Please provide accurate contact details, building access information, and disclose any known hazards (loose wiring, pets, etc.). A responsible adult must be present during the service visit. Final inspection should happen immediately so we can fix anything on the spot.",
  },
  {
    title: "Payments & cancellations",
    body:
      "Pricing shared in advance is an estimate; final charges depend on onsite findings. Payments can be made via UPI, card, or cash after the job. If you need to cancel or reschedule, please give us at least 6 hours’ notice so we can re-assign the crew.",
  },
  {
    title: "Liability",
    body:
      "While we take great care of your property, GrihFix is not liable for pre-existing damage or issues caused by faulty infrastructure. In rare cases of accidental damage attributable to our team, please report it within 24 hours so we can investigate and resolve it fairly.",
  },
];

export default function TermsPage() {
  return (
    <Container className="py-12 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xl font-semibold text-slate-800">{section.title}</h2>
          <p className="mt-2 text-slate-700 leading-relaxed">{section.body}</p>
        </div>
      ))}
    </Container>
  );
}

