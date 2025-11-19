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
    id: "home-deep-clean",
    title: "Home Deep Cleaning",
    description: "Full home deep cleaning by trained team",
    icon: "/icons/cleaning.png",
    startingPrice: "₹699",
    bullets: [
      "For 1 BHK, 2 BHK, 3 BHK homes",
      "Dusting, sweeping, mopping & basic wipe-down",
      "Ideal before festivals or moving",
    ],
    href: "/contact?service=cleaning",
    category: "Cleaning",
  },
  {
    id: "bathroom-deep-clean",
    title: "Bathroom Deep Cleaning",
    description: "Bathroom deep cleaning with hard water stain removal",
    icon: "/icons/services/bathroom-cleaning.png",
    startingPrice: "₹499",
    bullets: [
      "Hard water stains and tile cleaning",
      "Deep clean faucets, taps, shower and WC",
      "Deodorising and disinfection",
    ],
    href: "/contact?service=bathroom",
    category: "Cleaning",
  },
  {
    id: "kitchen-deep-clean",
    title: "Kitchen Deep Cleaning",
    description: "Degreasing and scrub-down for kitchens",
    icon: "/icons/services/kitchen-clean.png",
    startingPrice: "₹499",
    bullets: [
      "Countertop and tile degreasing",
      "Stove, chimney exterior and cabinet fronts",
      "Oil and grease stain removal where possible",
    ],
    href: "/contact?service=kitchen",
    category: "Cleaning",
  },
  {
    id: "terrace-clean",
    title: "Terrace / Roof Cleaning",
    description: "Terrace sweeping, washing and prep",
    icon: "/icons/services/roof-cleaning.png",
    startingPrice: "₹699",
    bullets: [
      "Terrace sweeping and washing",
      "Algae, mud and light moss removal",
      "Best done before monsoon season",
    ],
    href: "/contact?service=terrace",
    category: "Cleaning",
  },
  {
    id: "water-tank",
    title: "Water Tank Cleaning",
    description: "Overhead and underground water tank cleaning",
    icon: "/icons/water-tank.png",
    startingPrice: "₹699",
    bullets: [
      "Overhead and underground tanks",
      "Sludge removal and inner wall cleaning",
      "Rates vary by 500 L / 700 L / 1000 L tank",
    ],
    href: "/contact?service=water-tank",
    category: "Water & Septic",
  },
  {
    id: "car-wash",
    title: "Car Wash",
    description: "Exterior and interior car wash handled at your doorstep",
    icon: "/icons/services/service.png",
    startingPrice: "₹500",
    bullets: [
      "Exterior rinse to remove dust, mud and stains",
      "Interior vacuum and dashboard wipe for inside packages",
      "Car-safe shampoos and microfiber cloths",
      "Ideal before long drives or special occasions",
    ],
    href: "/contact?service=car-wash",
    category: "Other",
  },
  {
    id: "plumbing-visit",
    title: "Plumbing Visit",
    description: "Expert plumber visit for diagnostics & fixes",
    icon: "/icons/plumbing.png",
    startingPrice: "₹349",
    bullets: [
      "Leakage, low pressure, tap / mixer issues",
      "Bathroom and kitchen plumbing checks",
      "Visit charge adjusted in final bill",
    ],
    href: "/contact?service=plumbing",
    category: "Plumbing",
  },
  {
    id: "electrician-visit",
    title: "Electrician Visit",
    description: "Electrician visit for quick repairs",
    icon: "/icons/appliance.png",
    startingPrice: "₹349",
    bullets: [
      "Fan, light, switchboard issues",
      "New point wiring / minor installation",
      "Visit charge adjusted in final bill",
    ],
    href: "/contact?service=electrical",
    category: "Electrical",
  },
  {
    id: "other-maintenance",
    title: "Other Home Maintenance",
    description: "Custom maintenance work based on photos/videos",
    icon: "/icons/services/service.png",
    startingPrice: "Custom Quote",
    bullets: [
      "Ceiling fan & exhaust cleaning",
      "RO / water purifier basic service",
      "Appliance minor installation & small jobs",
      "Custom work based on photos / videos",
    ],
    href: "/contact",
    category: "Other",
  },
];

