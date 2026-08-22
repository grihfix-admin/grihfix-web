export type PricingTier = {
  id: string;
  service: string;
  serviceHi: string;
  startingAt: string;
  items: string[];
  itemsHi: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    id: "cleaning",
    service: "Home Deep Cleaning",
    serviceHi: "होम डीप क्लीनिंग",
    startingAt: "₹999",
    items: [
      "1 BHK, 2 BHK, 3 BHK deep cleaning",
      "Includes rooms, hall, basic dusting for furniture",
      "Bathroom and kitchen cleaning can be added",
      "Final price depends on BHK & area (calculator based)",
    ],
    itemsHi: [
      "1 BHK, 2 BHK, 3 BHK की गहरी सफाई",
      "कमरे, हॉल और फर्नीचर की बुनियादी सफाई शामिल",
      "बाथरूम और किचन क्लीनिंग जोड़ी जा सकती है",
      "अंतिम कीमत BHK और क्षेत्रफल पर निर्भर (कैलकुलेटर आधारित)",
    ],
  },
  {
    id: "furniture",
    service: "Sofa, Mattress & Chair Cleaning",
    serviceHi: "सोफा, गद्दा व कुर्सी की सफाई",
    startingAt: "₹99",
    items: [
      "Sofa shampoo wash from ₹599 (5-seater set)",
      "Mattress deep clean from ₹299 per mattress",
      "Chair cleaning from ₹99 per chair (min. 4)",
      "Combine with home cleaning for extra savings",
    ],
    itemsHi: [
      "सोफा शैम्पू वॉश ₹599 से (5-सीटर सेट)",
      "गद्दे की गहरी सफाई ₹299 प्रति गद्दा से",
      "कुर्सी की सफाई ₹99 प्रति कुर्सी से (न्यूनतम 4)",
      "होम क्लीनिंग के साथ जोड़ें और अधिक बचत करें",
    ],
  },
  {
    id: "kitchen-tiles",
    service: "Kitchen, Tiles & Chimney",
    serviceHi: "किचन, टाइल्स व चिमनी",
    startingAt: "₹499",
    items: [
      "Kitchen deep cleaning from ₹499",
      "Tiles & floor scrubbing from ₹799",
      "Chimney filter cleaning from ₹499",
      "Bundle all three for a full kitchen refresh",
    ],
    itemsHi: [
      "किचन डीप क्लीनिंग ₹499 से",
      "टाइल्स व फर्श की स्क्रबिंग ₹799 से",
      "चिमनी फ़िल्टर की सफाई ₹499 से",
      "तीनों साथ बुक करें और पूरी रसोई नई जैसी पाएं",
    ],
  },
  {
    id: "water",
    service: "Water Tank & Septic Tank",
    serviceHi: "पानी की टंकी व सेप्टिक टैंक",
    startingAt: "₹699",
    items: [
      "500 L, 700 L, 1000 L tank cleaning options",
      "Interior scrubbing and sludge removal",
      "Safe chemical usage where required",
      "Pricing per tank based on capacity",
    ],
    itemsHi: [
      "500 L, 700 L, 1000 L टंकी के विकल्प",
      "अंदरूनी सफाई और गाद निकालना",
      "ज़रूरत पड़ने पर सुरक्षित केमिकल का उपयोग",
      "टंकी की क्षमता अनुसार कीमत",
    ],
  },
  {
    id: "vehicle",
    service: "Car Cleaning",
    serviceHi: "कार क्लीनिंग",
    startingAt: "₹399",
    items: [
      "Exterior foam wash from ₹399",
      "Interior + exterior package from ₹599",
      "Doorstep service — no queue at a wash centre",
      "Car-safe shampoos and microfiber cloths",
    ],
    itemsHi: [
      "बाहरी फोम वॉश ₹399 से",
      "अंदर व बाहर दोनों पैकेज ₹599 से",
      "घर बैठे सर्विस — वॉश सेंटर की लाइन नहीं",
      "कार के लिए सुरक्षित शैम्पू और माइक्रोफाइबर कपड़ा",
    ],
  },
  {
    id: "plumbing-electrical",
    service: "Plumbing & Electrical",
    serviceHi: "प्लंबिंग व इलेक्ट्रिकल",
    startingAt: "₹349",
    items: [
      "Plumber / electrician visit + diagnosis",
      "Minor fixes covered in visit charge",
      "Part replacement extra at MRP",
      "Emergency same-day slots available",
    ],
    itemsHi: [
      "प्लंबर / इलेक्ट्रीशियन विज़िट + जांच",
      "छोटी मरम्मत विज़िट शुल्क में शामिल",
      "पार्ट बदलने पर अतिरिक्त शुल्क (MRP पर)",
      "इमरजेंसी में उसी दिन स्लॉट उपलब्ध",
    ],
  },
  {
    id: "others",
    service: "Other Home Maintenance",
    serviceHi: "अन्य घरेलू रखरखाव",
    startingAt: "Custom Quote",
    items: [
      "Ceiling fan & exhaust cleaning",
      "RO / water purifier basic service",
      "Appliance minor installation & small jobs",
      "Custom work based on photos / videos",
    ],
    itemsHi: [
      "सीलिंग फैन और एग्ज़ॉस्ट की सफाई",
      "RO / वाटर प्यूरीफायर की बेसिक सर्विस",
      "उपकरण की छोटी इंस्टॉलेशन और अन्य काम",
      "फ़ोटो/वीडियो के आधार पर कस्टम काम",
    ],
  },
];
