export type ServiceDefinition = {
  id: string;
  title: string;
  description: string;
  icon: string;
  startingPrice: string;
  bullets: string[];
  href: string;
  highlight?: string;
  category: "Cleaning" | "Water & Septic" | "Plumbing" | "Electrical" | "Other";
};

export const services: ServiceDefinition[] = [
  {
    id: "home-cleaning",
    title: "Home Deep Cleaning",
    description: "Full-home cleaning packages for flats and independent houses.",
    icon: "/icons/cleaning.png",
    startingPrice: "₹1,499",
    bullets: ["Kitchen & bathroom sanitisation", "Floor scrubbing & dusting", "Sofa & mattress vacuuming", "Friendly, verified staff"],
    href: "/contact?service=cleaning",
    highlight: "Popular for monthly maintenance",
    category: "Cleaning",
  },
  {
    id: "water-tank",
    title: "Water Tank Cleaning",
    description: "Mechanised brushing and disinfection for plastic & cement tanks.",
    icon: "/icons/water-tank.png",
    startingPrice: "₹999",
    bullets: ["Sludge removal", "Anti-bacterial spray", "Tank refill coordination", "Same-day service"],
    href: "/contact?service=water-tank",
    category: "Water & Septic",
  },
  {
    id: "septic-tank",
    title: "Septic Tank Cleaning",
    description: "Hygienic septic-tank suction with safety-first protocols.",
    icon: "/icons/services/toilet.png",
    startingPrice: "₹2,999",
    bullets: ["Powerful vacuum suction", "No mess left behind", "Experienced technicians", "Quick turnaround"],
    href: "/contact?service=septic-tank",
    category: "Water & Septic",
  },
  {
    id: "plumbing",
    title: "Plumbing Repairs",
    description: "From leaky taps to full bathroom fittings, we’ve got you.",
    icon: "/icons/plumbing.png",
    startingPrice: "₹399",
    bullets: ["Tap & shower fixes", "Blockage clearing", "Fixture installations", "Emergency visits"],
    href: "/contact?service=plumbing",
    category: "Plumbing",
  },
  {
    id: "electrical",
    title: "Electrical Appliance Repair",
    description: "Fast fixes for fans, geysers, RO, mixers and more.",
    icon: "/icons/appliance.png",
    startingPrice: "₹499",
    bullets: ["Fault finding & repair", "Spare-part guidance", "Warranty support", "On-site testing"],
    href: "/contact?service=electrical",
    category: "Electrical",
  },
  {
    id: "other-maintenance",
    title: "Other Home Maintenance",
    description: "Carpentry, painting touch-ups, handyman work—sab ho jayega.",
    icon: "/icons/services/service.png",
    startingPrice: "Custom Quote",
    bullets: ["Custom scope & timelines", "Bundled service discounts", "Materials sourcing help", "Post-service check-in"],
    href: "/contact",
    category: "Other",
  },
];

