import type { ServiceIconId } from "@/lib/serviceIcons";

export type ServiceCategory =
  | "Cleaning"
  | "Water & Septic"
  | "Plumbing"
  | "Electrical"
  | "Vehicle Care"
  | "Other";

export type ServiceDefinition = {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  iconId: ServiceIconId;
  startingPrice: string;
  bullets: string[];
  bulletsHi: string[];
  href: string;
  highlight?: string;
  highlightHi?: string;
  category: ServiceCategory;
  timeRequired?: string;
  timeRequiredHi?: string;
};

export const services: ServiceDefinition[] = [
  {
    id: "home-deep-clean",
    title: "Home Deep Cleaning",
    titleHi: "होम डीप क्लीनिंग",
    description: "Full home deep cleaning by a trained team, room by room.",
    descriptionHi: "प्रशिक्षित टीम द्वारा पूरे घर की गहरी सफाई, कमरे-दर-कमरे।",
    iconId: "home-deep-clean",
    startingPrice: "₹999",
    bullets: [
      "For 1 BHK, 2 BHK, 3 BHK homes",
      "Dusting, sweeping, mopping & furniture wipe-down",
      "Ideal before festivals, guests or moving in",
    ],
    bulletsHi: [
      "1 BHK, 2 BHK, 3 BHK घरों के लिए",
      "झाड़-पोंछ, सफाई और फर्नीचर की सफाई",
      "त्योहार, मेहमान या शिफ्टिंग से पहले उपयुक्त",
    ],
    href: "/contact?service=home-cleaning",
    highlight: "Most booked",
    highlightHi: "सबसे ज़्यादा बुक",
    category: "Cleaning",
    timeRequired: "Team of 3 · 4-6 hrs",
    timeRequiredHi: "3 सदस्यों की टीम · 4-6 घंटे",
  },
  {
    id: "kitchen-deep-clean",
    title: "Kitchen Deep Cleaning",
    titleHi: "किचन डीप क्लीनिंग",
    description: "Degreasing and scrub-down for a spotless, hygienic kitchen.",
    descriptionHi: "चिकनाई हटाकर रसोई को पूरी तरह साफ़ और स्वच्छ बनाएं।",
    iconId: "kitchen-deep-clean",
    startingPrice: "₹499",
    bullets: [
      "Countertop, tile and cabinet-front degreasing",
      "Stove top and chimney exterior cleaning",
      "Oil and grease stain removal where possible",
    ],
    bulletsHi: [
      "काउंटरटॉप, टाइल्स और कैबिनेट की चिकनाई हटाना",
      "गैस चूल्हे और चिमनी के बाहरी हिस्से की सफाई",
      "जहां संभव हो, तेल व चिकनाई के दाग हटाना",
    ],
    href: "/contact?service=kitchen",
    category: "Cleaning",
    timeRequired: "2 pros · 2.5 hrs",
    timeRequiredHi: "2 विशेषज्ञ · 2.5 घंटे",
  },
  {
    id: "bathroom-deep-clean",
    title: "Bathroom Deep Cleaning",
    titleHi: "बाथरूम डीप क्लीनिंग",
    description: "Bathroom deep cleaning with hard-water stain removal.",
    descriptionHi: "बाथरूम की गहरी सफाई, कठोर पानी के दाग हटाने के साथ।",
    iconId: "bathroom-deep-clean",
    startingPrice: "₹499",
    bullets: [
      "Hard water stains and tile cleaning",
      "Deep clean faucets, taps, shower and WC",
      "Deodorising and disinfection",
    ],
    bulletsHi: [
      "कठोर पानी के दाग और टाइल्स की सफाई",
      "नल, शावर और टॉयलेट की गहरी सफाई",
      "दुर्गंध हटाना और कीटाणुशोधन",
    ],
    href: "/contact?service=bathroom",
    category: "Cleaning",
    timeRequired: "2 pros · 2 hrs",
    timeRequiredHi: "2 विशेषज्ञ · 2 घंटे",
  },
  {
    id: "sofa-cleaning",
    title: "Sofa Cleaning",
    titleHi: "सोफा क्लीनिंग",
    description: "Deep shampoo wash for sofas — dust, stains and odour gone.",
    descriptionHi: "सोफे की गहरी शैम्पू सफाई — धूल, दाग और दुर्गंध हटाएं।",
    iconId: "sofa-cleaning",
    startingPrice: "₹599",
    bullets: [
      "Vacuuming + dry & wet shampoo wash",
      "Fabric-safe solutions for all sofa types",
      "₹149 per extra seat beyond a 5-seater set",
    ],
    bulletsHi: [
      "वैक्यूम + ड्राई और वेट शैम्पू वॉश",
      "हर तरह के सोफे के लिए सुरक्षित सॉल्यूशन",
      "5-सीटर सेट के बाद हर अतिरिक्त सीट ₹149",
    ],
    href: "/contact?service=sofa-cleaning",
    highlight: "New",
    highlightHi: "नया",
    category: "Cleaning",
    timeRequired: "2 pros · 1.5 hrs",
    timeRequiredHi: "2 विशेषज्ञ · 1.5 घंटे",
  },
  {
    id: "mattress-cleaning",
    title: "Mattress Cleaning",
    titleHi: "गद्दे की सफाई",
    description: "Anti-allergen deep clean to remove dust mites and stains.",
    descriptionHi: "धूल-कण और दाग हटाने के लिए गद्दे की एंटी-एलर्जन सफाई।",
    iconId: "mattress-cleaning",
    startingPrice: "₹299",
    bullets: [
      "UV sanitisation + vacuum extraction",
      "Stain treatment for common spots",
      "Priced per mattress (single/double/queen)",
    ],
    bulletsHi: [
      "UV सैनिटाइज़ेशन + वैक्यूम सक्शन",
      "आम दागों के लिए विशेष उपचार",
      "प्रति गद्दा शुल्क (सिंगल/डबल/क्वीन)",
    ],
    href: "/contact?service=mattress-cleaning",
    highlight: "New",
    highlightHi: "नया",
    category: "Cleaning",
    timeRequired: "1 pro · 45 mins",
    timeRequiredHi: "1 विशेषज्ञ · 45 मिनट",
  },
  {
    id: "chair-cleaning",
    title: "Chair Cleaning",
    titleHi: "कुर्सी की सफाई",
    description: "Dining, office or fabric chairs — refreshed and sanitised.",
    descriptionHi: "डाइनिंग, ऑफिस या फैब्रिक कुर्सियां — तरोताज़ा और स्वच्छ।",
    iconId: "chair-cleaning",
    startingPrice: "₹99",
    bullets: [
      "Minimum order of 4 chairs",
      "Shampoo wash for fabric, wipe-down for leather",
      "Great add-on with sofa or home cleaning",
    ],
    bulletsHi: [
      "न्यूनतम 4 कुर्सियों का ऑर्डर",
      "फैब्रिक के लिए शैम्पू वॉश, लेदर के लिए वाइप-डाउन",
      "सोफा या होम क्लीनिंग के साथ बेहतरीन ऐड-ऑन",
    ],
    href: "/contact?service=chair-cleaning",
    highlight: "New",
    highlightHi: "नया",
    category: "Cleaning",
    timeRequired: "1 pro · per chair 10 mins",
    timeRequiredHi: "1 विशेषज्ञ · प्रति कुर्सी 10 मिनट",
  },
  {
    id: "tiles-cleaning",
    title: "Tiles & Floor Cleaning",
    titleHi: "टाइल्स व फर्श की सफाई",
    description: "Machine scrubbing to restore shine and remove grout grime.",
    descriptionHi: "चमक वापस लाने और जोड़ों की गंदगी हटाने के लिए मशीन स्क्रबिंग।",
    iconId: "tiles-cleaning",
    startingPrice: "₹799",
    bullets: [
      "Floor & wall tile scrubbing, grout cleaning",
      "Safe for marble, vitrified and ceramic tiles",
      "Package covers up to ~150 sq ft, extra billed per sq ft",
    ],
    bulletsHi: [
      "फ़र्श व दीवार की टाइल्स तथा जोड़ों की सफाई",
      "मार्बल, विट्रिफाइड और सिरेमिक टाइल्स के लिए सुरक्षित",
      "लगभग 150 वर्ग फ़ीट तक पैकेज, अतिरिक्त क्षेत्र के लिए प्रति वर्ग फ़ीट शुल्क",
    ],
    href: "/contact?service=tiles-cleaning",
    highlight: "New",
    highlightHi: "नया",
    category: "Cleaning",
    timeRequired: "2 pros · 2 hrs",
    timeRequiredHi: "2 विशेषज्ञ · 2 घंटे",
  },
  {
    id: "chimney-cleaning",
    title: "Chimney Cleaning",
    titleHi: "चिमनी की सफाई",
    description: "Baffle filter degreasing and motor check for better suction.",
    descriptionHi: "बेहतर सक्शन के लिए बैफल फ़िल्टर की सफाई और मोटर जांच।",
    iconId: "chimney-cleaning",
    startingPrice: "₹499",
    bullets: [
      "Filter, duct and body degreasing",
      "Suction & motor performance check",
      "Works on auto-clean and baffle-filter chimneys",
    ],
    bulletsHi: [
      "फ़िल्टर, डक्ट और बॉडी की चिकनाई हटाना",
      "सक्शन और मोटर की कार्यक्षमता की जांच",
      "ऑटो-क्लीन और बैफल-फ़िल्टर दोनों तरह की चिमनी के लिए",
    ],
    href: "/contact?service=chimney-cleaning",
    highlight: "New",
    highlightHi: "नया",
    category: "Cleaning",
    timeRequired: "1 pro · 1 hr",
    timeRequiredHi: "1 विशेषज्ञ · 1 घंटा",
  },
  {
    id: "terrace-clean",
    title: "Terrace / Roof Cleaning",
    titleHi: "छत की सफाई",
    description: "Terrace sweeping, washing and monsoon-prep cleaning.",
    descriptionHi: "छत की झाड़ू, धुलाई और मानसून-पूर्व सफाई।",
    iconId: "terrace-clean",
    startingPrice: "₹699",
    bullets: [
      "Terrace sweeping and pressure washing",
      "Algae, mud and light moss removal",
      "Best done before monsoon season",
    ],
    bulletsHi: [
      "छत की झाड़ू और प्रेशर वॉशिंग",
      "काई, मिट्टी और हल्की फफूंद हटाना",
      "मानसून से पहले करवाना सबसे अच्छा",
    ],
    href: "/contact?service=terrace",
    category: "Cleaning",
    timeRequired: "3 pros · 3 hrs",
    timeRequiredHi: "3 विशेषज्ञ · 3 घंटे",
  },
  {
    id: "water-tank",
    title: "Water Tank Cleaning",
    titleHi: "पानी की टंकी की सफाई",
    description: "Overhead and underground water tank cleaning and flushing.",
    descriptionHi: "ओवरहेड और भूमिगत पानी की टंकी की सफाई और फ्लशिंग।",
    iconId: "water-tank",
    startingPrice: "₹699",
    bullets: [
      "Overhead and underground tanks",
      "Sludge removal and inner wall scrubbing",
      "Rates vary by 500 L / 700 L / 1000 L tank",
    ],
    bulletsHi: [
      "ओवरहेड और भूमिगत दोनों टंकियां",
      "गाद निकालना और अंदरूनी दीवारों की सफाई",
      "500 L / 700 L / 1000 L टंकी के अनुसार दाम",
    ],
    href: "/contact?service=water-tank",
    category: "Water & Septic",
    timeRequired: "2 pros · 1.5 hrs",
    timeRequiredHi: "2 विशेषज्ञ · 1.5 घंटे",
  },
  {
    id: "car-wash",
    title: "Car Cleaning",
    titleHi: "कार क्लीनिंग",
    description: "Exterior and interior car cleaning handled at your doorstep.",
    descriptionHi: "आपके दरवाज़े पर कार की बाहरी और अंदरूनी सफाई।",
    iconId: "car-wash",
    startingPrice: "₹399",
    bullets: [
      "Exterior foam wash to remove dust, mud and stains",
      "Interior vacuum + dashboard wipe on inside-out package",
      "Car-safe shampoos and microfiber cloths",
    ],
    bulletsHi: [
      "धूल-मिट्टी हटाने के लिए बाहरी फोम वॉश",
      "इनसाइड-आउट पैकेज में वैक्यूम + डैशबोर्ड की सफाई",
      "कार के लिए सुरक्षित शैम्पू और माइक्रोफाइबर कपड़ा",
    ],
    href: "/contact?service=car-wash",
    category: "Vehicle Care",
    timeRequired: "2 pros · 1-1.5 hrs",
    timeRequiredHi: "2 विशेषज्ञ · 1-1.5 घंटे",
  },
  {
    id: "plumbing-visit",
    title: "Plumbing Visit",
    titleHi: "प्लंबर विज़िट",
    description: "Expert plumber visit for diagnostics and quick fixes.",
    descriptionHi: "जांच और त्वरित मरम्मत के लिए अनुभवी प्लंबर की विज़िट।",
    iconId: "plumbing-visit",
    startingPrice: "₹349",
    bullets: [
      "Leakage, low pressure, tap / mixer issues",
      "Bathroom and kitchen plumbing checks",
      "Visit charge adjusted in final bill",
    ],
    bulletsHi: [
      "लीकेज, कम प्रेशर, नल / मिक्सर की समस्याएं",
      "बाथरूम और किचन की प्लंबिंग जांच",
      "विज़िट शुल्क अंतिम बिल में समायोजित",
    ],
    href: "/contact?service=plumbing",
    category: "Plumbing",
    timeRequired: "1 expert · 45 mins",
    timeRequiredHi: "1 विशेषज्ञ · 45 मिनट",
  },
  {
    id: "electrician-visit",
    title: "Electrician Visit",
    titleHi: "इलेक्ट्रीशियन विज़िट",
    description: "Electrician visit for quick, safe repairs at home.",
    descriptionHi: "घर पर त्वरित और सुरक्षित मरम्मत के लिए इलेक्ट्रीशियन।",
    iconId: "electrician-visit",
    startingPrice: "₹349",
    bullets: [
      "Fan, light, switchboard issues",
      "New point wiring / minor installation",
      "Visit charge adjusted in final bill",
    ],
    bulletsHi: [
      "पंखा, लाइट, स्विचबोर्ड की समस्याएं",
      "नई वायरिंग / छोटी इंस्टॉलेशन",
      "विज़िट शुल्क अंतिम बिल में समायोजित",
    ],
    href: "/contact?service=electrical",
    category: "Electrical",
    timeRequired: "1 expert · 45 mins",
    timeRequiredHi: "1 विशेषज्ञ · 45 मिनट",
  },
  {
    id: "other-maintenance",
    title: "Other Home Maintenance",
    titleHi: "अन्य घरेलू रखरखाव",
    description: "Custom maintenance work based on photos or videos you share.",
    descriptionHi: "आपकी भेजी फ़ोटो या वीडियो के आधार पर कस्टम रखरखाव कार्य।",
    iconId: "other-maintenance",
    startingPrice: "Custom Quote",
    bullets: [
      "Ceiling fan & exhaust cleaning",
      "RO / water purifier basic service",
      "Appliance minor installation & small jobs",
    ],
    bulletsHi: [
      "सीलिंग फैन और एग्ज़ॉस्ट की सफाई",
      "RO / वाटर प्यूरीफायर की बेसिक सर्विस",
      "उपकरण की छोटी इंस्टॉलेशन और अन्य काम",
    ],
    href: "/contact",
    category: "Other",
    timeRequired: "Custom timing",
    timeRequiredHi: "समय आवश्यकता अनुसार",
  },
];
