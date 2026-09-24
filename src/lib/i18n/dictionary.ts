// src/lib/i18n/dictionary.ts
// Central translation dictionary for GrihFix v2.
// Add new keys here and they become available everywhere via useLanguage().t("key")

export type Lang = "en" | "hi";

export const dictionary = {
  // ---------- Navbar ----------
  "nav.home": { en: "Home", hi: "होम" },
  "nav.services": { en: "Services", hi: "सर्विसेज़" },
  "nav.pricing": { en: "Pricing", hi: "कीमत" },
  "nav.about": { en: "About", hi: "हमारे बारे में" },
  "nav.contact": { en: "Contact", hi: "संपर्क करें" },
  "nav.callNow": { en: "Call Now", hi: "कॉल करें" },
  "nav.bookService": { en: "Book Service", hi: "बुक करें" },
  "nav.menu": { en: "Menu", hi: "मेनू" },

  // ---------- Common / shared ----------
  "common.startingAt": { en: "Starting at", hi: "शुरुआती कीमत" },
  "common.getEstimate": { en: "Get Estimate", hi: "कीमत जानें" },
  "common.bookNow": { en: "Book Now", hi: "अभी बुक करें" },
  "common.learnMore": { en: "Learn more", hi: "और जानें" },
  "common.viewAllServices": { en: "View all services", hi: "सभी सर्विसेज़ देखें" },
  "common.callUs": { en: "Call +91 97098 70726", hi: "कॉल करें +91 97098 70726" },
  "common.chatWhatsapp": { en: "Chat on WhatsApp", hi: "व्हाट्सएप पर बात करें" },
  "common.verified": { en: "Verified Professionals", hi: "सत्यापित कर्मचारी" },
  "common.cashUpi": { en: "Cash & UPI accepted", hi: "कैश और UPI स्वीकार" },
  "common.rated": { en: "4.8/5 rated by locals", hi: "4.8/5 स्थानीय रेटिंग" },

  // ---------- Hero (Home page) ----------
  "hero.eyebrow": { en: "Darbhanga • Bihar", hi: "दरभंगा • बिहार" },
  "hero.title": {
    en: "Trusted home services, ab aapke ghar ke darwaze par.",
    hi: "भरोसेमंद होम सर्विस, अब आपके घर के दरवाज़े पर।",
  },
  "hero.subtitle": {
    en: "Cleaning, water tank, plumbing, electrical and more — sab kuch ek hi jagah. Verified staff, fair pricing, WhatsApp par updates.",
    hi: "सफाई, पानी की टंकी, प्लंबिंग, इलेक्ट्रिकल और बहुत कुछ — सब कुछ एक ही जगह। सत्यापित स्टाफ, उचित दाम, व्हाट्सएप पर अपडेट्स।",
  },
  "hero.ctaPrimary": { en: "Call Now", hi: "अभी कॉल करें" },
  "hero.ctaSecondary": { en: "Get Free Estimate", hi: "मुफ़्त अनुमान पाएं" },
  "hero.serviceArea": { en: "Currently serving Darbhanga city & nearby areas.", hi: "फ़िलहाल दरभंगा शहर और आस-पास के इलाकों में सेवा उपलब्ध है।" },
  "hero.badge.rating": { en: "4.8 rating by Darbhanga customers", hi: "दरभंगा ग्राहकों की 4.8 रेटिंग" },
  "hero.badge.homes": { en: "400+ homes served", hi: "400+ घरों में सेवा" },
  "hero.badge.verified": { en: "Verified & background-checked staff", hi: "सत्यापित और बैकग्राउंड-चेक्ड स्टाफ" },
  "hero.trustedBy": { en: "Trusted by 2,000+ Darbhanga homes", hi: "2,000+ दरभंगा परिवारों का भरोसा" },

  // ---------- Trust strip ----------
  "trust.onTime": { en: "On-time guarantee", hi: "समय पर पहुंचने की गारंटी" },
  "trust.verifiedStaff": { en: "ID-verified staff", hi: "पहचान-सत्यापित स्टाफ" },
  "trust.transparentPricing": { en: "No hidden charges", hi: "कोई छिपा हुआ शुल्क नहीं" },
  "trust.securePayments": { en: "Cash / UPI / Card", hi: "कैश / UPI / कार्ड" },
  "trust.support": { en: "WhatsApp support", hi: "व्हाट्सएप सहायता" },

  // ---------- Why GrihFix ----------
  "why.eyebrow": { en: "Why GrihFix", hi: "GrihFix क्यों चुनें" },
  "why.title": { en: "One partner for all ghar ke kaam", hi: "घर के हर काम के लिए एक भरोसेमंद साथी" },
  "why.subtitle": {
    en: "We blend professionalism with the warmth of a neighbourhood service partner.",
    hi: "पेशेवर सेवा और अपने मोहल्ले जैसे अपनेपन का संगम।",
  },
  "why.local.title": { en: "Darbhanga-first team", hi: "दरभंगा की अपनी टीम" },
  "why.local.desc": { en: "Local pros who know your mohalla, traffic windows, and water timings.", hi: "स्थानीय एक्सपर्ट्स जो आपके मोहल्ले, रास्तों और पानी के समय को अच्छे से जानते हैं।" },
  "why.punctual.title": { en: "Assured punctuality", hi: "समय की पाबंदी की गारंटी" },
  "why.punctual.desc": { en: "We confirm slots, share technician details, and reach on time.", hi: "हम स्लॉट कन्फर्म करते हैं, टेक्नीशियन की जानकारी देते हैं और समय पर पहुंचते हैं।" },
  "why.hygiene.title": { en: "Hygienic service kits", hi: "स्वच्छ सर्विस किट" },
  "why.hygiene.desc": { en: "Gloves, shoe covers, eco-friendly chemicals — ghar ki safety pehle.", hi: "दस्ताने, शू-कवर, इको-फ्रेंडली केमिकल — आपके घर की सुरक्षा सबसे पहले।" },
  "why.support.title": { en: "Easy support", hi: "आसान सहायता" },
  "why.support.desc": { en: "Track on WhatsApp, get photos, and request quick follow-ups for free.", hi: "व्हाट्सएप पर ट्रैक करें, फोटो पाएं और मुफ़्त फॉलो-अप का अनुरोध करें।" },

  // ---------- Services section ----------
  "services.eyebrow": { en: "Our Services", hi: "हमारी सर्विसेज़" },
  "services.homeTitle": { en: "Everything your home needs under one roof", hi: "आपके घर की हर ज़रूरत, एक ही छत के नीचे" },
  "services.homeSubtitle": {
    en: "Pick a service to see details and get a quote. We customise pricing after a quick assessment.",
    hi: "किसी सर्विस को चुनें, विवरण देखें और कीमत जानें। सही जांच के बाद हम अंतिम कीमत बताते हैं।",
  },
  "services.pageTitle": { en: "One platform for every ghar ka kaam", hi: "घर के हर काम के लिए एक ही मंच" },
  "services.pageSubtitle": {
    en: "Deep cleaning, tank flushing, electrical fixes, car cleaning and more — mix and match services and we'll dispatch a verified crew with the right tools.",
    hi: "गहरी सफाई, टंकी की सफाई, इलेक्ट्रिकल काम, कार क्लीनिंग और भी बहुत कुछ — कोई भी सर्विस चुनें, हम सही टीम भेजेंगे।",
  },
  "services.buildPlan": { en: "Build my service plan", hi: "अपना प्लान बनाएं" },
  "services.browseCategory": { en: "Browse by category", hi: "श्रेणी अनुसार देखें" },
  "services.pickCategory": {
    en: "Tap a category to jump directly to the relevant offerings.",
    hi: "सीधे संबंधित सर्विस पर जाने के लिए कोई श्रेणी चुनें।",
  },
  "services.needMultiple": { en: "Need multiple services together?", hi: "एक साथ कई सर्विस चाहिए?" },
  "services.bundleDesc": {
    en: "Bundle cleaning, plumbing, electrical or tank work to unlock combo discounts.",
    hi: "सफाई, प्लंबिंग, इलेक्ट्रिकल या टंकी का काम एक साथ बुक करें और कॉम्बो छूट पाएं।",
  },
  "services.planVisit": { en: "Plan a visit", hi: "विज़िट प्लान करें" },

  // categories
  "category.Cleaning": { en: "Cleaning", hi: "सफाई" },
  "category.Water & Septic": { en: "Water & Septic", hi: "पानी व सेप्टिक टैंक" },
  "category.Plumbing": { en: "Plumbing", hi: "प्लंबिंग" },
  "category.Electrical": { en: "Electrical", hi: "इलेक्ट्रिकल" },
  "category.Vehicle Care": { en: "Vehicle Care", hi: "गाड़ी की सफाई" },
  "category.Other": { en: "Other", hi: "अन्य" },

  // ---------- Steps / how it works ----------
  "steps.eyebrow": { en: "How it works", hi: "कैसे काम करता है" },
  "steps.title": { en: "Book today, relax tomorrow", hi: "आज बुक करें, कल आराम करें" },
  "steps.subtitle": { en: "Simple, transparent steps from your phone to doorstep.", hi: "आपके फ़ोन से लेकर घर के दरवाज़े तक, आसान और साफ़ प्रक्रिया।" },

  // ---------- Testimonials ----------
  "testimonials.eyebrow": { en: "Neighbours love us", hi: "पड़ोसी भी हमें पसंद करते हैं" },
  "testimonials.title": { en: "Hear from Darbhanga families", hi: "दरभंगा के परिवारों की राय" },
  "testimonials.subtitle": {
    en: "Real stories from local households who trust GrihFix with their space.",
    hi: "स्थानीय परिवारों की सच्ची कहानियां जो GrihFix पर भरोसा करते हैं।",
  },

  // ---------- Bottom CTA ----------
  "cta.title": { en: "Ready to fix your home problems?", hi: "अपने घर की समस्या दूर करने के लिए तैयार हैं?" },
  "cta.subtitle": {
    en: "Ping us on WhatsApp or drop a quick form. Team reaches out within 10 minutes during working hours.",
    hi: "व्हाट्सएप पर संदेश भेजें या फॉर्म भरें। हमारी टीम काम के घंटों में 10 मिनट में जवाब देगी।",
  },
  "cta.bookVisit": { en: "Book a visit", hi: "विज़िट बुक करें" },

  // ---------- Footer ----------
  "footer.partnerEyebrow": { en: "Partner programme", hi: "पार्टनर प्रोग्राम" },
  "footer.partnerTitle": {
    en: "Want steady jobs every week? Join the GrihFix partner network.",
    hi: "हर हफ़्ते नियमित काम चाहिए? GrihFix पार्टनर नेटवर्क से जुड़ें।",
  },
  "footer.partnerDesc": {
    en: "For local plumbers, electricians, cleaners and tank specialists across Darbhanga.",
    hi: "दरभंगा के स्थानीय प्लंबर, इलेक्ट्रीशियन, सफाईकर्मी और टैंक विशेषज्ञों के लिए।",
  },
  "footer.joinPartner": { en: "Join as GrihFix partner →", hi: "GrihFix पार्टनर बनें →" },
  "footer.whatsappOps": { en: "WhatsApp the ops team", hi: "टीम को व्हाट्सएप करें" },
  "footer.about": { en: "About GrihFix", hi: "GrihFix के बारे में" },
  "footer.aboutDesc": {
    en: "Local Darbhanga team delivering deep cleaning, tank flushing, plumbing, electrical repairs and car cleaning with digital tracking and transparent pricing.",
    hi: "दरभंगा की स्थानीय टीम — गहरी सफाई, टंकी सफाई, प्लंबिंग, इलेक्ट्रिकल मरम्मत और कार क्लीनिंग, पूरी पारदर्शिता के साथ।",
  },
  "footer.contactUs": { en: "Contact us", hi: "संपर्क करें" },
  "footer.quickLinks": { en: "Quick links", hi: "ज़रूरी लिंक" },
  "footer.stayInTouch": { en: "Stay in touch", hi: "जुड़े रहें" },
  "footer.responseTime": { en: "We respond on WhatsApp within 10 minutes (9am–8pm).", hi: "हम व्हाट्सएप पर 10 मिनट में जवाब देते हैं (सुबह 9 से रात 8 बजे तक)।" },
  "footer.privacy": { en: "Privacy Policy", hi: "गोपनीयता नीति" },
  "footer.terms": { en: "Terms", hi: "नियम व शर्तें" },
  "footer.refunds": { en: "Refunds", hi: "रिफंड" },
  "footer.rights": { en: "All rights reserved. Built for Darbhanga households.", hi: "सर्वाधिकार सुरक्षित। दरभंगा के परिवारों के लिए बनाया गया।" },
  "footer.serviceRadius": { en: "Service radius: within 20 km of Darbhanga town", hi: "सेवा क्षेत्र: दरभंगा शहर के 20 किमी के दायरे में" },

  // ---------- Language toggle ----------
  "lang.toggleLabel": { en: "भाषा", hi: "Language" },

  // ---------- About page ----------
  "about.eyebrow": { en: "About GrihFix", hi: "GrihFix के बारे में" },
  "about.title": { en: "Born in Darbhanga, for Darbhanga homes.", hi: "दरभंगा में जन्मा, दरभंगा के घरों के लिए।" },
  "about.subtitle": {
    en: "We started GrihFix after struggling to find reliable, hygienic service partners for our own families. Today we're a small-but-mighty crew serving cleaning, tank, plumbing and repair needs across the city — with a smile.",
    hi: "अपने ही परिवार के लिए भरोसेमंद सेवा साथी न मिलने की परेशानी से GrihFix की शुरुआत हुई। आज हम एक छोटी मगर मज़बूत टीम हैं जो पूरे शहर में सफाई, टंकी, प्लंबिंग और मरम्मत सेवाएं मुस्कुराते हुए देती है।",
  },
  "about.ctaTalk": { en: "Talk to our team", hi: "हमारी टीम से बात करें" },
  "about.ctaCall": { en: "Call us directly", hi: "सीधे कॉल करें" },
  "about.statJobs": { en: "2,500+ jobs completed", hi: "2,500+ सेवाएं पूरी" },
  "about.statWards": { en: "Across 40+ wards of Darbhanga", hi: "दरभंगा के 40+ वार्डों में" },
  "about.storyEyebrow": { en: "Our story", hi: "हमारी कहानी" },
  "about.storyTitle": { en: "Neighbourhood trust meets pro-grade systems", hi: "मोहल्ले का भरोसा, पेशेवर तरीके के साथ" },
  "about.storyDesc": {
    en: "We blend modern scheduling tools with the warmth of local technicians who understand how Darbhanga households operate.",
    hi: "आधुनिक शेड्यूलिंग टूल्स को स्थानीय तकनीशियनों की आत्मीयता के साथ जोड़ते हैं, जो दरभंगा के घरों को अच्छे से समझते हैं।",
  },
  "about.card1Title": { en: "Darbhanga roots", hi: "दरभंगा की जड़ें" },
  "about.card1Desc": {
    en: "Started by siblings who grew up near Tower Chowk, GrihFix focuses only on Darbhanga so we can guarantee punctuality, quality and consistency.",
    hi: "टावर चौक के पास पले-बढ़े भाई-बहनों ने शुरू किया — GrihFix सिर्फ़ दरभंगा पर फोकस करता है ताकि समय, गुणवत्ता और निरंतरता की गारंटी दे सकें।",
  },
  "about.card2Title": { en: "Process-driven delivery", hi: "व्यवस्थित तरीके से सेवा" },
  "about.card2Desc": {
    en: "Every job has a digital checklist, before/after photos and customer feedback. That's how we maintain a 4.9/5 satisfaction score.",
    hi: "हर काम की डिजिटल चेकलिस्ट, पहले/बाद की फ़ोटो और ग्राहक फीडबैक होता है। इसी से हम 4.9/5 संतुष्टि स्कोर बनाए रखते हैं।",
  },
  "about.promisesEyebrow": { en: "Our promises", hi: "हमारे वादे" },
  "about.promisesTitle": { en: "What you can expect every single time", hi: "हर बार आप क्या उम्मीद कर सकते हैं" },
  "about.promisesDesc": { en: "Yahi toh farq hai — reliability that feels personal.", hi: "यही तो फ़र्क़ है — भरोसा जो अपनापन लिए हो।" },
  "about.hiringEyebrow": { en: "Careers", hi: "करियर" },
  "about.hiringTitle": { en: "Work with GrihFix", hi: "GrihFix के साथ काम करें" },
  "about.hiringDesc": {
    en: "If you're a skilled cleaner, plumber, electrician or handyman from Darbhanga and nearby areas, join our verified partner network.",
    hi: "अगर आप दरभंगा या आस-पास के कुशल सफाईकर्मी, प्लंबर, इलेक्ट्रीशियन या हैंडीमैन हैं, तो हमारे सत्यापित पार्टनर नेटवर्क से जुड़ें।",
  },
  "about.hiringHeadline": { en: "We're hiring service partners", hi: "हम सेवा पार्टनर की तलाश में हैं" },
  "about.hiringSub": {
    en: "Training + uniforms provided. Weekly payouts. Insurance coverage on the way!",
    hi: "प्रशिक्षण और यूनिफ़ॉर्म दी जाती है। साप्ताहिक भुगतान। बीमा कवरेज जल्द आ रहा है!",
  },
  "about.hiringCta": { en: "Apply via WhatsApp", hi: "व्हाट्सएप पर आवेदन करें" },

  // ---------- Contact page ----------
  "contact.eyebrow": { en: "Get in touch", hi: "संपर्क करें" },
  "contact.title": { en: "Let's fix it — tell us what's up", hi: "चलिए ठीक करते हैं — अपनी ज़रूरत बताएं" },
  "contact.subtitle": {
    en: "Share your service, address and a good time to visit. Our team confirms on call or WhatsApp within 10 minutes during working hours.",
    hi: "अपनी सर्विस, पता और सही समय बताएं। हमारी टीम काम के घंटों में 10 मिनट में कॉल या व्हाट्सएप पर कन्फर्म करेगी।",
  },
  "contact.formTitle": { en: "Tell us about your requirement", hi: "अपनी ज़रूरत हमें बताएं" },

  // ---------- Pricing page ----------
  "pricingpage.eyebrow": { en: "Transparent pricing", hi: "पारदर्शी कीमत" },
  "pricingpage.title": { en: "Fair prices, no surprise bills", hi: "उचित कीमत, कोई छिपा बिल नहीं" },
  "pricingpage.subtitle": {
    en: "Use the calculator below for an instant estimate, or browse our starting packages by service.",
    hi: "तुरंत अनुमान के लिए नीचे कैलकुलेटर उपयोग करें, या सर्विस अनुसार शुरुआती पैकेज देखें।",
  },
} as const;

export type DictionaryKey = keyof typeof dictionary;
