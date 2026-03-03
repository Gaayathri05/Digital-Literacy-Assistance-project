import ScholarshipService from './components/scholarship/ScholarshipService';
import { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   LANGUAGE SYSTEM — English | Tamil | Hindi
═══════════════════════════════════════════════════════════ */
const LANGS = {
  en: {
    code: "en", label: "English", flag: "🇬🇧", speechLang: "en-IN",
    fontClass: "font-en",
    ui: {
      navSub: "Gov services made simple for everyone",
      navHome: "Home", navServices: "Services",
      heroBadge: "Official Government Service Guide",
      heroTitle: "Confused using", heroTitleHighlight: "Government Websites?",
      heroSub: "Ask anything — our AI answers your questions in simple language.\nNo confusion. No mistakes. Just clear help.",
      heroCta: "Start Assistance →",
      quickLabel: "Get Help with Government Services",
      disclaimer: "⚠️ We guide you through the process, but we are not official government websites.",
      welcomeTitle: "Welcome! What can we help you with?",
      welcomeSub: "Select the service you'd like step-by-step guidance on",
      servicesDisclaimer: "⚠️ We guide you through the process. Always verify on the official .gov.in website.",
      chatStatus: "Online & Ready to Help",
      inputPlaceholder: "Type your question here… (Ask anything!)",
      voiceListening: "Listening…",
      footerText: "This is a guidance assistant, not an official government website. | Hackwell 2K26",
      bcSelectService: "Select Service",
      optYes: "✅ Yes, I'm ready!", optMore: "ℹ️ Tell me more first",
      optNext: "➡️ Next Step", optConfused: "🤔 Explain more",
      optDone: "✅ Done! That helped", optRestart: "🔁 Start Over", optOther: "🏠 Choose Another Service",
      tipLabel: "Tip",
      aiThinking: "Thinking…",
      aiError: "Sorry, I could not connect. Please check your internet and try again.",
      langLabel: "Language",
    }
  },
  ta: {
    code: "ta", label: "தமிழ்", flag: "🇮🇳", speechLang: "ta-IN",
    fontClass: "font-ta",
    ui: {
      navSub: "அரசு சேவைகளை எளிதாக்குகிறோம்",
      navHome: "முகப்பு", navServices: "சேவைகள்",
      heroBadge: "அரசு சேவை வழிகாட்டி",
      heroTitle: "அரசு இணையதளங்களில்", heroTitleHighlight: "குழப்பமா?",
      heroSub: "எந்த கேள்வியும் கேளுங்கள் — நம் AI எளிய மொழியில் விளக்கும்.\nகுழப்பம் இல்லை. தவறு இல்லை. தெளிவான உதவி மட்டுமே.",
      heroCta: "உதவி தொடங்கு →",
      quickLabel: "அரசு சேவைகளில் உதவி பெறுங்கள்",
      disclaimer: "⚠️ நாங்கள் வழிகாட்டுவோம், ஆனால் நாங்கள் அதிகாரப்பூர்வ அரசு இணையதளம் அல்ல.",
      welcomeTitle: "வணக்கம்! நாங்கள் உங்களுக்கு எப்படி உதவலாம்?",
      welcomeSub: "படிப்படியான வழிகாட்டுதல் வேண்டும் என்ற சேவையை தேர்ந்தெடுங்கள்",
      servicesDisclaimer: "⚠️ நாங்கள் வழிகாட்டுவோம். எப்போதும் .gov.in இணையதளத்தில் சரிபார்க்கவும்.",
      chatStatus: "இயங்குகிறது & உதவ தயாராக உள்ளது",
      inputPlaceholder: "உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யுங்கள்… (எதுவும் கேளுங்கள்!)",
      voiceListening: "கேட்கிறோம்…",
      footerText: "இது ஒரு வழிகாட்டி உதவியாளர், அதிகாரப்பூர்வ அரசு இணையதளம் அல்ல. | Hackwell 2K26",
      bcSelectService: "சேவை தேர்வு",
      optYes: "✅ ஆம், தயாராக இருக்கிறேன்!", optMore: "ℹ️ மேலும் சொல்லுங்கள்",
      optNext: "➡️ அடுத்த படி", optConfused: "🤔 மேலும் விளக்கவும்",
      optDone: "✅ புரிந்தது, நன்றி!", optRestart: "🔁 மீண்டும் தொடங்கு", optOther: "🏠 வேறு சேவை தேர்வு",
      tipLabel: "குறிப்பு",
      aiThinking: "யோசிக்கிறேன்…",
      aiError: "மன்னிக்கவும், இணைப்பு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",
      langLabel: "மொழி",
    }
  },
  hi: {
    code: "hi", label: "हिंदी", flag: "🇮🇳", speechLang: "hi-IN",
    fontClass: "font-hi",
    ui: {
      navSub: "सरकारी सेवाएं सभी के लिए आसान",
      navHome: "होम", navServices: "सेवाएं",
      heroBadge: "सरकारी सेवा मार्गदर्शक",
      heroTitle: "सरकारी वेबसाइट में", heroTitleHighlight: "परेशानी हो रही है?",
      heroSub: "कुछ भी पूछें — हमारा AI सरल भाषा में जवाब देगा।\nकोई भ्रम नहीं। कोई गलती नहीं। बस सही मदद।",
      heroCta: "सहायता शुरू करें →",
      quickLabel: "सरकारी सेवाओं में मदद पाएं",
      disclaimer: "⚠️ हम प्रक्रिया में मार्गदर्शन करते हैं, लेकिन हम आधिकारिक सरकारी वेबसाइट नहीं हैं।",
      welcomeTitle: "स्वागत! हम आपकी कैसे मदद करें?",
      welcomeSub: "वह सेवा चुनें जिसमें आप चरण-दर-चरण मार्गदर्शन चाहते हैं",
      servicesDisclaimer: "⚠️ हम मार्गदर्शन करते हैं। हमेशा .gov.in वेबसाइट पर सत्यापित करें।",
      chatStatus: "ऑनलाइन & मदद के लिए तैयार",
      inputPlaceholder: "यहाँ अपना सवाल लिखें… (कुछ भी पूछें!)",
      voiceListening: "सुन रहे हैं…",
      footerText: "यह एक मार्गदर्शन सहायक है, आधिकारिक सरकारी वेबसाइट नहीं। | Hackwell 2K26",
      bcSelectService: "सेवा चुनें",
      optYes: "✅ हाँ, तैयार हूँ!", optMore: "ℹ️ पहले और बताएं",
      optNext: "➡️ अगला कदम", optConfused: "🤔 और समझाएं",
      optDone: "✅ समझ गया, धन्यवाद!", optRestart: "🔁 फिर से शुरू", optOther: "🏠 दूसरी सेवा चुनें",
      tipLabel: "सुझाव",
      aiThinking: "सोच रहे हैं…",
      aiError: "क्षमा करें, कनेक्शन विफल। कृपया फिर से प्रयास करें।",
      langLabel: "भाषा",
    }
  }
};

/* ═══════════════════════════════════════════════════════════
   SERVICES DATA
═══════════════════════════════════════════════════════════ */
const SERVICES_DATA = {
  en: [
    { id:"aadhaar",     label:"Aadhar Update",         emoji:"🪪", bg:"#E3F2FD", accent:"#1565C0", tag:"UIDAI", hint:"Address change & more" },
    { id:"scholarship", label:"Apply Scholarship",      emoji:"🎓", bg:"#E8F5E9", accent:"#2E7D32", tag:"NSP",   hint:"Government scholarships" },
    { id:"bank",        label:"Open Bank Account",      emoji:"🏦", bg:"#FFF3E0", accent:"#E65100", tag:"RBI",   hint:"Jan Dhan & savings accounts" },
    { id:"pan",         label:"PAN Card Application",   emoji:"💳", bg:"#FCE4EC", accent:"#880E4F", tag:"ITD",   hint:"Apply or link PAN card" },
  ],
  ta: [
    { id:"aadhaar",     label:"ஆதார் புதுப்பிப்பு",   emoji:"🪪", bg:"#E3F2FD", accent:"#1565C0", tag:"UIDAI", hint:"முகவரி மாற்றம் & மேலும்" },
    { id:"scholarship", label:"உதவித்தொகை விண்ணப்பம்", emoji:"🎓", bg:"#E8F5E9", accent:"#2E7D32", tag:"NSP",   hint:"அரசு உதவித்தொகைகள்" },
    { id:"bank",        label:"வங்கி கணக்கு திறக்கவும்",emoji:"🏦", bg:"#FFF3E0", accent:"#E65100", tag:"RBI",   hint:"ஜன் தன் & சேமிப்பு கணக்கு" },
    { id:"pan",         label:"PAN அட்டை விண்ணப்பம்", emoji:"💳", bg:"#FCE4EC", accent:"#880E4F", tag:"ITD",   hint:"PAN அட்டை பெறவும் இணைக்கவும்" },
  ],
  hi: [
    { id:"aadhaar",     label:"आधार अपडेट",            emoji:"🪪", bg:"#E3F2FD", accent:"#1565C0", tag:"UIDAI", hint:"पता बदलें & अधिक" },
    { id:"scholarship", label:"छात्रवृत्ति आवेदन",      emoji:"🎓", bg:"#E8F5E9", accent:"#2E7D32", tag:"NSP",   hint:"सरकारी छात्रवृत्ति" },
    { id:"bank",        label:"बैंक खाता खोलें",        emoji:"🏦", bg:"#FFF3E0", accent:"#E65100", tag:"RBI",   hint:"जन धन & बचत खाता" },
    { id:"pan",         label:"PAN कार्ड आवेदन",        emoji:"💳", bg:"#FCE4EC", accent:"#880E4F", tag:"ITD",   hint:"PAN कार्ड बनाएं या जोड़ें" },
  ],
};

/* ═══════════════════════════════════════════════════════════
   STEP DATA — translated per language
═══════════════════════════════════════════════════════════ */
const STEPS_DATA = {
  en: {
    aadhaar: {
      steps: ["Open uidai.gov.in","Click 'Update Aadhaar'","Enter 12-digit Aadhaar","Verify with OTP","Submit changes"],
      tip: "Official site: uidai.gov.in — Always check the URL ends in .gov.in",
      welcome: "Vanakkam! 👋 I'm your Digital Literacy Assistant.\n\nI will help you update your Aadhaar address — and you can ask me **anything** about the process!\n\nWhat would you like to do?",
      opts: ["✅ Start Step-by-Step Guide","❓ I have a question"],
    },
    scholarship: {
      steps: ["Open scholarships.gov.in","Click 'New Registration'","Enter Aadhaar details","Fill student info","Upload & submit"],
      tip: "Official site: scholarships.gov.in — Last date: usually October 31",
      welcome: "Vanakkam! 👋 I'm your Digital Literacy Assistant.\n\nI will guide you to apply for a Government Scholarship — and you can ask me **anything** about it!\n\nWhat would you like to do?",
      opts: ["✅ Start Step-by-Step Guide","❓ I have a question"],
    },
    bank: {
      steps: ["Visit bank / website","Fill account opening form","Submit Aadhaar & PAN","Photo required","Receive passbook"],
      tip: "Jan Dhan = Zero balance, free debit card & insurance coverage",
      welcome: "Vanakkam! 👋 I'm your Digital Literacy Assistant.\n\nI will guide you to open a bank account — and you can ask me **anything** about the process!\n\nWhat would you like to do?",
      opts: ["✅ Start Step-by-Step Guide","❓ I have a question"],
    },
    pan: {
      steps: ["Open incometax.gov.in","Click 'Instant e-PAN'","Enter Aadhaar number","Verify with OTP","Download e-PAN PDF"],
      tip: "Instant e-PAN is 100% FREE and ready in just 10 minutes!",
      welcome: "Vanakkam! 👋 I'm your Digital Literacy Assistant.\n\nI will guide you to get your PAN Card FREE — and you can ask me **anything** about it!\n\nWhat would you like to do?",
      opts: ["✅ Start Step-by-Step Guide","❓ I have a question"],
    },
  },
  ta: {
    aadhaar: {
      steps: ["uidai.gov.in திறக்கவும்","'ஆதார் புதுப்பி' கிளிக்","12 இலக்க ஆதார் உள்ளிடவும்","OTP வழி சரிபார்க்கவும்","மாற்றங்கள் சமர்ப்பிக்கவும்"],
      tip: "அதிகாரப்பூர்வ தளம்: uidai.gov.in — URL .gov.in என முடிகிறதா என சரிபார்க்கவும்",
      welcome: "வணக்கம்! 👋 நான் உங்கள் டிஜிட்டல் சாட்போட்.\n\nஆதார் முகவரி மாற்றத்திற்கு உதவுவேன் — மேலும் இதுபற்றி **எதுவும் கேளுங்கள்**!\n\nஎன்ன செய்ய விரும்புகிறீர்கள்?",
      opts: ["✅ படிப்படியான வழிகாட்டி தொடங்கு","❓ என்னிடம் கேள்வி உள்ளது"],
    },
    scholarship: {
      steps: ["scholarships.gov.in திறக்கவும்","'புதிய பதிவு' கிளிக்","ஆதார் விவரங்கள் உள்ளிடவும்","மாணவர் தகவல் நிரப்பவும்","ஆவணங்கள் பதிவேற்றி சமர்ப்பிக்கவும்"],
      tip: "அதிகாரப்பூர்வ தளம்: scholarships.gov.in — கடைசி தேதி: பொதுவாக அக்டோபர் 31",
      welcome: "வணக்கம்! 👋 நான் உங்கள் டிஜிட்டல் சாட்போட்.\n\nஅரசு உதவித்தொகை விண்ணப்பத்திற்கு வழிகாட்டுவேன் — **எதுவும் கேளுங்கள்**!\n\nஎன்ன செய்ய விரும்புகிறீர்கள்?",
      opts: ["✅ படிப்படியான வழிகாட்டி தொடங்கு","❓ என்னிடம் கேள்வி உள்ளது"],
    },
    bank: {
      steps: ["வங்கி / இணையதளம் செல்லவும்","கணக்கு திறக்கும் படிவம் நிரப்பவும்","ஆதார் & PAN சமர்ப்பிக்கவும்","புகைப்படம் தேவை","பாஸ்புக் பெறுவீர்கள்"],
      tip: "ஜன் தன் = பூஜ்ய இருப்பு, இலவச டெபிட் கார்டு & காப்பீடு",
      welcome: "வணக்கம்! 👋 நான் உங்கள் டிஜிட்டல் சாட்போட்.\n\nவங்கி கணக்கு திறக்க வழிகாட்டுவேன் — **எதுவும் கேளுங்கள்**!\n\nஎன்ன செய்ய விரும்புகிறீர்கள்?",
      opts: ["✅ படிப்படியான வழிகாட்டி தொடங்கு","❓ என்னிடம் கேள்வி உள்ளது"],
    },
    pan: {
      steps: ["incometax.gov.in திறக்கவும்","'உடனடி e-PAN' கிளிக்","ஆதார் எண் உள்ளிடவும்","OTP வழி சரிபார்க்கவும்","e-PAN PDF பதிவிறக்கம்"],
      tip: "உடனடி e-PAN முற்றிலும் இலவசம் — வெறும் 10 நிமிடங்களில் தயார்!",
      welcome: "வணக்கம்! 👋 நான் உங்கள் டிஜிட்டல் சாட்போட்.\n\nஇலவசமாக PAN கார்டு பெற வழிகாட்டுவேன் — **எதுவும் கேளுங்கள்**!\n\nஎன்ன செய்ய விரும்புகிறீர்கள்?",
      opts: ["✅ படிப்படியான வழிகாட்டி தொடங்கு","❓ என்னிடம் கேள்வி உள்ளது"],
    },
  },
  hi: {
    aadhaar: {
      steps: ["uidai.gov.in खोलें","'आधार अपडेट' पर क्लिक करें","12 अंकों का आधार दर्ज करें","OTP से सत्यापित करें","परिवर्तन जमा करें"],
      tip: "आधिकारिक साइट: uidai.gov.in — URL .gov.in पर समाप्त होना चाहिए",
      welcome: "नमस्ते! 👋 मैं आपका डिजिटल सहायक हूँ।\n\nमैं आपके आधार पता अपडेट में मदद करूँगा — और आप **कुछ भी पूछ सकते हैं**!\n\nआप क्या करना चाहते हैं?",
      opts: ["✅ चरण-दर-चरण गाइड शुरू करें","❓ मेरा एक सवाल है"],
    },
    scholarship: {
      steps: ["scholarships.gov.in खोलें","'नया पंजीकरण' पर क्लिक करें","आधार विवरण दर्ज करें","छात्र जानकारी भरें","दस्तावेज़ अपलोड और जमा करें"],
      tip: "आधिकारिक साइट: scholarships.gov.in — अंतिम तिथि: आमतौर पर 31 अक्टूबर",
      welcome: "नमस्ते! 👋 मैं आपका डिजिटल सहायक हूँ।\n\nमैं सरकारी छात्रवृत्ति आवेदन में मदद करूँगा — **कुछ भी पूछें**!\n\nआप क्या करना चाहते हैं?",
      opts: ["✅ चरण-दर-चरण गाइड शुरू करें","❓ मेरा एक सवाल है"],
    },
    bank: {
      steps: ["बैंक / वेबसाइट जाएं","खाता खोलने का फॉर्म भरें","आधार & PAN जमा करें","फोटो आवश्यक है","पासबुक प्राप्त करें"],
      tip: "जन धन = शून्य बैलेंस, मुफ्त डेबिट कार्ड और बीमा कवरेज",
      welcome: "नमस्ते! 👋 मैं आपका डिजिटल सहायक हूँ।\n\nमैं बैंक खाता खोलने में मदद करूँगा — **कुछ भी पूछें**!\n\nआप क्या करना चाहते हैं?",
      opts: ["✅ चरण-दर-चरण गाइड शुरू करें","❓ मेरा एक सवाल है"],
    },
    pan: {
      steps: ["incometax.gov.in खोलें","'तुरंत e-PAN' पर क्लिक करें","आधार नंबर दर्ज करें","OTP से सत्यापित करें","e-PAN PDF डाउनलोड करें"],
      tip: "तुरंत e-PAN बिल्कुल मुफ्त है — केवल 10 मिनट में तैयार!",
      welcome: "नमस्ते! 👋 मैं आपका डिजिटल सहायक हूँ।\n\nमैं मुफ्त PAN कार्ड पाने में मदद करूँगा — **कुछ भी पूछें**!\n\nआप क्या करना चाहते हैं?",
      opts: ["✅ चरण-दर-चरण गाइड शुरू करें","❓ मेरा एक सवाल है"],
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   AI CHAT — calls Claude API directly
═══════════════════════════════════════════════════════════ */
async function askAI(userMessage, serviceId, langCode, chatHistory) {
  const langNames = { en: "English", ta: "Tamil", hi: "Hindi" };
  const serviceNames = {
    aadhaar:     "Aadhaar Card address update (UIDAI - uidai.gov.in)",
    scholarship: "Government Scholarship application (NSP - scholarships.gov.in)",
    bank:        "Bank Account opening (Jan Dhan / Savings)",
    pan:         "PAN Card application (Income Tax - incometax.gov.in)",
  };

  const systemPrompt = `You are a friendly Digital Literacy Assistant helping rural and elderly Indian citizens navigate Indian government services websites.

Current service: ${serviceNames[serviceId] || "General Indian government services"}
Reply ONLY in ${langNames[langCode]} language.

Rules:
- Keep answers SHORT (under 120 words), clear, and simple
- Use bullet points for steps
- Use emojis to make it friendly and easy to read
- Mention official .gov.in website URLs when relevant
- NEVER ask for or store personal details like Aadhaar number, OTP, or bank details
- Warn users to NEVER share OTP with anyone
- Be warm, patient, and encouraging — users may be elderly or first-time internet users
- Always end with an encouraging note or offer further help`;

  // Filter out any messages that have empty content
  const historyMessages = chatHistory
    .slice(-6)
    .filter(m => m.text && m.text.trim().length > 0)
    .map(m => ({
      role: m.from === "bot" ? "assistant" : "user",
      content: m.text.trim(),
    }));

  // Ensure messages alternate correctly — claude needs user/assistant alternation
  const builtMessages = [...historyMessages, { role: "user", content: userMessage }];

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: builtMessages,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    console.error("Anthropic API error:", response.status, errData);
    throw new Error(`API ${response.status}: ${errData?.error?.message || "Unknown error"}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error("Empty response from API");
  return text;
}

/* ═══════════════════════════════════════════════════════════
   STEP-BY-STEP GUIDE MESSAGES
═══════════════════════════════════════════════════════════ */
const GUIDE_FLOWS = {
  en: {
    aadhaar: [
      { text:"Great! Let's start.\n\n**Step 1** — Open your browser and go to:\n🌐 **https://uidai.gov.in**\n\n✅ Make sure the URL ends with **.gov.in** — this confirms it is official.\n\nHave you opened the website?", opts:["✅ Yes, I opened it","❓ I need help opening it"] },
      { text:"**Step 2** — On the UIDAI website:\n\n• Look for the menu at the top\n• Click **'Update Your Aadhaar'**\n• Then select **'Update Address Online'**\n\nDid you find the 'Update Your Aadhaar' option?", opts:["✅ Yes, I found it","❓ I can't find it"] },
      { text:"**Step 3** — Now enter your details:\n\n• Type your **12-digit Aadhaar number**\n• Enter the **captcha** (the letters/numbers shown)\n• Click **'Send OTP'**\n• An OTP will come to your registered mobile\n\n⚠️ **NEVER share your OTP with anyone!**", opts:["✅ OTP received","❓ OTP not received"] },
      { text:"**Step 4** — Enter the OTP & Submit:\n\n• Type the OTP from your mobile\n• Update your new address\n• Upload an address proof document (electricity bill, ration card, etc.)\n• Click **Submit**\n\nYour address update request is submitted! ✅", opts:["✅ Done! Submitted","🔁 Start Over","🏠 Choose Another Service"] },
    ],
    scholarship: [
      { text:"Let's start your scholarship application!\n\n**Step 1** — Open your browser and go to:\n🌐 **https://scholarships.gov.in**\n\n✅ Check the URL ends with **.gov.in**\n\nHave you opened the website?", opts:["✅ Yes, opened it","❓ Need help"] },
      { text:"**Step 2** — Register on the portal:\n\n• Click **'New Registration'** on the homepage\n• Select your state and scholarship type\n• As a new user, do NOT share your OTP with anyone\n• Click **'Register'** to create your account\n\nHave you clicked 'New Registration'?", opts:["✅ Yes, done","❓ Can't find it"] },
      { text:"**Step 3** — Fill your details:\n\n• Enter personal information (name, DOB, address)\n• Enter academic information (school/college, marks)\n• Enter your bank account details for receiving money\n\n📋 Keep ready: Aadhaar, marksheet, income certificate, bank passbook\n\nAre you filling the form?", opts:["✅ Yes, filling it","❓ Need help with a field"] },
      { text:"**Step 4** — Upload documents & Submit:\n\n• Upload: Aadhaar copy, marksheet, income certificate, bank passbook, passport photo\n• Review all details carefully\n• Click **Submit**\n• Note your **Application ID** — save it!\n\n📌 **Important**: Ask your school/college to approve online!\n\nApplication submitted! 🎉", opts:["✅ Done! Submitted","🔁 Start Over","🏠 Choose Another Service"] },
    ],
    bank: [
      { text:"Let's open your bank account!\n\n**Step 1** — Choose your bank:\n\n🏦 For **zero balance** account → **Jan Dhan Yojana** (any government bank)\n🏦 For **online** account → Visit **onlinesbi.sbi** or **bankofbaroda.in**\n🏦 For **branch** → Visit nearest SBI, Canara, or UCO Bank\n\nWhich do you prefer?", opts:["🏦 Visit Bank Branch","💻 Open Online","❓ Not sure, help me decide"] },
      { text:"**Step 2** — Prepare your documents:\n\n✅ Aadhaar Card (original + photocopy)\n✅ PAN Card (or Form 60 if no PAN)\n✅ 2 Passport-size photographs\n✅ Mobile number\n\nFor **Jan Dhan**: No minimum balance needed — it is FREE!\n\nDo you have all documents ready?", opts:["✅ Yes, I have all documents","❓ I don't have PAN card"] },
      { text:"**Step 3** — Fill the form:\n\n• Go to the bank and ask for **Account Opening Form**\n• Fill: Name, Father's name, Date of birth, Address, Mobile number\n• Attach all document copies + paste photo\n• Sign where required\n\nAre you filling the form?", opts:["✅ Yes, filling it","❓ Need help"] },
      { text:"**Step 4** — Submit & Get Account:\n\n• Submit the form at the bank counter\n• Bank staff verifies your documents\n• You get your **account number immediately**\n• Passbook and debit card in **1–2 days** 🎉\n\nWelcome to banking! Your account is ready!", opts:["✅ Done! Account opened","🔁 Start Over","🏠 Choose Another Service"] },
    ],
    pan: [
      { text:"Let's get your PAN Card — it's FREE!\n\n**Step 1** — Open your browser and go to:\n🌐 **https://incometax.gov.in**\n\n✅ Check the URL ends with **.gov.in**\n\nHave you opened the website?", opts:["✅ Yes, opened it","❓ Need help"] },
      { text:"**Step 2** — Find Instant PAN:\n\n• Look for **'Quick Links'** section on the homepage\n• Click **'Instant e-PAN'**\n• Click **'Get New e-PAN'**\n\nHave you found 'Instant e-PAN'?", opts:["✅ Yes, found it","❓ Can't find it"] },
      { text:"**Step 3** — Enter your Aadhaar:\n\n• Type your **12-digit Aadhaar number**\n• Tick the checkbox to confirm\n• Click **Continue**\n• An OTP will come to your Aadhaar-linked mobile\n\n⚠️ **NEVER share your OTP with anyone!**", opts:["✅ OTP received","❓ OTP not received"] },
      { text:"**Step 4** — Validate & Download:\n\n• Enter the OTP from your mobile\n• Your PAN details will show on screen\n• Click **Download e-PAN**\n• Save the PDF file\n\n🔑 **PDF Password = your Date of Birth** (DDMMYYYY format, e.g. 15081990)\n\nYour e-PAN is ready! It is valid everywhere! 🎉", opts:["✅ Downloaded! Done","🔁 Start Over","🏠 Choose Another Service"] },
    ],
  },
  ta: {
    aadhaar: [
      { text:"சரி! தொடங்குவோம்.\n\n**படி 1** — உங்கள் browser திறந்து:\n🌐 **https://uidai.gov.in**\n\n✅ URL **.gov.in** என முடிவதை உறுதி செய்யுங்கள்.\n\nவெப்சைட் திறந்தீர்களா?", opts:["✅ ஆம், திறந்தேன்","❓ திறக்க உதவி தேவை"] },
      { text:"**படி 2** — UIDAI இணையதளத்தில்:\n\n• மேலே உள்ள மெனுவில் தேடுங்கள்\n• **'Update Your Aadhaar'** கிளிக் செய்யுங்கள்\n• **'Update Address Online'** தேர்வு செய்யுங்கள்\n\n'Update Your Aadhaar' கண்டீர்களா?", opts:["✅ ஆம், கண்டேன்","❓ காணவில்லை"] },
      { text:"**படி 3** — விவரங்கள் உள்ளிடவும்:\n\n• **12 இலக்க ஆதார் எண்** தட்டச்சு செய்யுங்கள்\n• Captcha உள்ளிடவும்\n• **'Send OTP'** கிளிக் செய்யுங்கள்\n• உங்கள் mobile-க்கு OTP வரும்\n\n⚠️ **OTP யாரிடமும் சொல்லாதீர்கள்!**", opts:["✅ OTP வந்தது","❓ OTP வரவில்லை"] },
      { text:"**படி 4** — OTP & சமர்ப்பிக்கவும்:\n\n• OTP தட்டச்சு செய்யுங்கள்\n• புதிய முகவரி உள்ளிடவும்\n• முகவரி ஆதாரம் பதிவேற்றவும் (மின் கட்டணம், ரேஷன் அட்டை)\n• **Submit** கிளிக் செய்யுங்கள் ✅", opts:["✅ சமர்ப்பித்தேன்","🔁 மீண்டும் தொடங்கு","🏠 வேறு சேவை"] },
    ],
    scholarship: [
      { text:"உதவித்தொகை விண்ணப்பம் தொடங்குவோம்!\n\n**படி 1** — Browser திறந்து:\n🌐 **https://scholarships.gov.in**\n\n✅ URL **.gov.in** என முடிவதை சரிபார்க்கவும்\n\nவெப்சைட் திறந்தீர்களா?", opts:["✅ ஆம், திறந்தேன்","❓ உதவி தேவை"] },
      { text:"**படி 2** — பதிவு செய்யவும்:\n\n• **'New Registration'** கிளிக் செய்யுங்கள்\n• உங்கள் மாநிலம் & உதவித்தொகை வகை தேர்வு செய்யுங்கள்\n• OTP யாரிடமும் பகிர வேண்டாம்\n• **'Register'** கிளிக் செய்யுங்கள்\n\n'New Registration' கிளிக் செய்தீர்களா?", opts:["✅ ஆம்","❓ காணவில்லை"] },
      { text:"**படி 3** — விவரங்கள் நிரப்பவும்:\n\n• தனிப்பட்ட தகவல் (பெயர், பிறந்த தேதி, முகவரி)\n• கல்வி தகவல் (பள்ளி/கல்லூரி, மதிப்பெண்கள்)\n• வங்கி கணக்கு விவரங்கள்\n\n📋 தயார் வைக்கவும்: ஆதார், மதிப்பெண் பட்டியல், வருமான சான்று, பாஸ்புக்", opts:["✅ நிரப்புகிறேன்","❓ உதவி தேவை"] },
      { text:"**படி 4** — ஆவணங்கள் பதிவேற்றி சமர்ப்பிக்கவும்:\n\n• ஆதார், மதிப்பெண் பட்டியல், வருமான சான்று, பாஸ்புக், புகைப்படம் பதிவேற்றவும்\n• அனைத்தையும் சரிபார்க்கவும்\n• **Submit** கிளிக் செய்யுங்கள்\n• **Application ID** குறித்து வைக்கவும்!\n\n📌 பள்ளி/கல்லூரியிடம் online அனுமதி கேளுங்கள்! 🎉", opts:["✅ சமர்ப்பித்தேன்","🔁 மீண்டும் தொடங்கு","🏠 வேறு சேவை"] },
    ],
    bank: [
      { text:"வங்கி கணக்கு திறப்போம்!\n\n**படி 1** — உங்கள் வங்கியை தேர்வு செய்யுங்கள்:\n\n🏦 **பூஜ்ய இருப்பு** கணக்கு → **ஜன் தன் யோஜனா**\n🏦 **ஆன்லைன்** → **onlinesbi.sbi** அல்லது **bankofbaroda.in**\n🏦 **கிளையில்** → SBI, Canara, UCO Bank\n\nஎதை விரும்புகிறீர்கள்?", opts:["🏦 வங்கி கிளை","💻 ஆன்லைனில்","❓ முடிவில்லை, உதவுங்கள்"] },
      { text:"**படி 2** — ஆவணங்கள் தயார் செய்யுங்கள்:\n\n✅ ஆதார் கார்டு (அசல் + நகல்)\n✅ PAN கார்டு (இல்லாவிட்டால் Form 60)\n✅ 2 பாஸ்போர்ட் சைஸ் புகைப்படங்கள்\n✅ Mobile எண்\n\n**ஜன் தன்**: குறைந்தபட்ச இருப்பு தேவையில்லை — இலவசம்!\n\nஆவணங்கள் தயாரா?", opts:["✅ ஆம், தயார்","❓ PAN இல்லை"] },
      { text:"**படி 3** — படிவம் நிரப்பவும்:\n\n• வங்கிக்கு சென்று **Account Opening Form** கேளுங்கள்\n• பெயர், தந்தை பெயர், பிறந்த தேதி, முகவரி, Mobile எண் நிரப்பவும்\n• ஆவண நகல்கள் இணைத்து புகைப்படம் ஒட்டவும்\n• தேவையான இடங்களில் கையெழுத்து\n\nபடிவம் நிரப்புகிறீர்களா?", opts:["✅ நிரப்புகிறேன்","❓ உதவி தேவை"] },
      { text:"**படி 4** — சமர்ப்பித்து கணக்கு பெறுங்கள்:\n\n• வங்கி counter-ல் சமர்ப்பிக்கவும்\n• உடனே **கணக்கு எண்** கிடைக்கும்\n• **1–2 நாளில்** பாஸ்புக் & டெபிட் கார்டு 🎉\n\nவங்கி கணக்கு தயார்!", opts:["✅ கணக்கு திறந்தது","🔁 மீண்டும் தொடங்கு","🏠 வேறு சேவை"] },
    ],
    pan: [
      { text:"இலவசமாக PAN கார்டு பெறுவோம்!\n\n**படி 1** — Browser திறந்து:\n🌐 **https://incometax.gov.in**\n\n✅ URL **.gov.in** என முடிவதை சரிபார்க்கவும்\n\nவெப்சைட் திறந்தீர்களா?", opts:["✅ ஆம், திறந்தேன்","❓ உதவி தேவை"] },
      { text:"**படி 2** — Instant PAN கண்டுபிடிக்கவும்:\n\n• முகப்பில் **'Quick Links'** பிரிவு தேடவும்\n• **'Instant e-PAN'** கிளிக் செய்யுங்கள்\n• **'Get New e-PAN'** கிளிக் செய்யுங்கள்\n\n'Instant e-PAN' கண்டீர்களா?", opts:["✅ கண்டேன்","❓ காணவில்லை"] },
      { text:"**படி 3** — ஆதார் உள்ளிடவும்:\n\n• **12 இலக்க ஆதார் எண்** தட்டச்சு செய்யுங்கள்\n• Checkbox கிளிக் செய்யுங்கள்\n• **Continue** கிளிக் செய்யுங்கள்\n• உங்கள் mobile-க்கு OTP வரும்\n\n⚠️ **OTP யாரிடமும் சொல்லாதீர்கள்!**", opts:["✅ OTP வந்தது","❓ OTP வரவில்லை"] },
      { text:"**படி 4** — OTP & Download:\n\n• OTP தட்டச்சு செய்யுங்கள்\n• உங்கள் PAN விவரங்கள் திரையில் காண்பிக்கும்\n• **Download e-PAN** கிளிக் செய்யுங்கள்\n• PDF சேமிக்கவும்\n\n🔑 **PDF Password = பிறந்த தேதி** (DDMMYYYY, எ.கா. 15081990)\n\nஉங்கள் e-PAN தயார்! 🎉", opts:["✅ Download ஆனது","🔁 மீண்டும் தொடங்கு","🏠 வேறு சேவை"] },
    ],
  },
  hi: {
    aadhaar: [
      { text:"चलिए शुरू करते हैं!\n\n**चरण 1** — अपना browser खोलें और जाएं:\n🌐 **https://uidai.gov.in**\n\n✅ सुनिश्चित करें URL **.gov.in** पर समाप्त हो।\n\nवेबसाइट खोली?", opts:["✅ हाँ, खोल ली","❓ खोलने में मदद चाहिए"] },
      { text:"**चरण 2** — UIDAI वेबसाइट पर:\n\n• ऊपर मेनू में देखें\n• **'Update Your Aadhaar'** पर क्लिक करें\n• **'Update Address Online'** चुनें\n\n'Update Your Aadhaar' मिला?", opts:["✅ हाँ, मिला","❓ नहीं मिला"] },
      { text:"**चरण 3** — विवरण दर्ज करें:\n\n• अपना **12 अंकों का आधार नंबर** टाइप करें\n• Captcha भरें\n• **'Send OTP'** क्लिक करें\n• आपके mobile पर OTP आएगा\n\n⚠️ **OTP कभी किसी को न बताएं!**", opts:["✅ OTP आ गया","❓ OTP नहीं आया"] },
      { text:"**चरण 4** — OTP & जमा करें:\n\n• OTP टाइप करें\n• नया पता दर्ज करें\n• पते का प्रमाण अपलोड करें (बिजली बिल, राशन कार्ड)\n• **Submit** क्लिक करें ✅\n\nपता अपडेट अनुरोध जमा हो गया!", opts:["✅ जमा हो गया","🔁 फिर से शुरू","🏠 दूसरी सेवा"] },
    ],
    scholarship: [
      { text:"छात्रवृत्ति आवेदन शुरू करते हैं!\n\n**चरण 1** — Browser खोलें:\n🌐 **https://scholarships.gov.in**\n\n✅ URL **.gov.in** पर समाप्त होना चाहिए\n\nवेबसाइट खोली?", opts:["✅ हाँ, खोल ली","❓ मदद चाहिए"] },
      { text:"**चरण 2** — पोर्टल पर पंजीकरण:\n\n• **'New Registration'** पर क्लिक करें\n• अपना राज्य और छात्रवृत्ति प्रकार चुनें\n• OTP किसी से साझा न करें\n• **'Register'** पर क्लिक करें\n\n'New Registration' पर क्लिक किया?", opts:["✅ हाँ, हो गया","❓ नहीं मिला"] },
      { text:"**चरण 3** — विवरण भरें:\n\n• व्यक्तिगत जानकारी (नाम, जन्मतिथि, पता)\n• शैक्षिक जानकारी (स्कूल/कॉलेज, अंक)\n• बैंक खाते का विवरण\n\n📋 तैयार रखें: आधार, अंकपत्र, आय प्रमाण, बैंक पासबुक", opts:["✅ भर रहा/रही हूँ","❓ मदद चाहिए"] },
      { text:"**चरण 4** — दस्तावेज़ अपलोड & जमा करें:\n\n• आधार, अंकपत्र, आय प्रमाण, पासबुक, फोटो अपलोड करें\n• सब कुछ जाँचें\n• **Submit** क्लिक करें\n• **Application ID** नोट करें!\n\n📌 स्कूल/कॉलेज से ऑनलाइन अनुमोदन लें! 🎉", opts:["✅ जमा हो गया","🔁 फिर से शुरू","🏠 दूसरी सेवा"] },
    ],
    bank: [
      { text:"बैंक खाता खोलते हैं!\n\n**चरण 1** — अपना बैंक चुनें:\n\n🏦 **शून्य बैलेंस** खाता → **जन धन योजना**\n🏦 **ऑनलाइन** → **onlinesbi.sbi** या **bankofbaroda.in**\n🏦 **शाखा में** → SBI, Canara, UCO Bank\n\nआप क्या पसंद करेंगे?", opts:["🏦 बैंक शाखा जाएंगे","💻 ऑनलाइन खोलेंगे","❓ तय नहीं, मदद करें"] },
      { text:"**चरण 2** — दस्तावेज़ तैयार करें:\n\n✅ आधार कार्ड (मूल + फोटोकॉपी)\n✅ PAN कार्ड (या Form 60 अगर PAN नहीं)\n✅ 2 पासपोर्ट साइज़ फोटो\n✅ Mobile नंबर\n\n**जन धन**: न्यूनतम बैलेंस नहीं — बिल्कुल मुफ्त!\n\nसभी दस्तावेज़ तैयार?", opts:["✅ हाँ, सब तैयार","❓ PAN कार्ड नहीं है"] },
      { text:"**चरण 3** — फॉर्म भरें:\n\n• बैंक जाएं और **Account Opening Form** माँगें\n• नाम, पिता का नाम, जन्मतिथि, पता, Mobile नंबर भरें\n• दस्तावेज़ों की कॉपी लगाएं और फोटो चिपकाएं\n• जहाँ ज़रूरी हो हस्ताक्षर करें\n\nफॉर्म भर रहे हैं?", opts:["✅ हाँ, भर रहा/रही हूँ","❓ मदद चाहिए"] },
      { text:"**चरण 4** — जमा करें & खाता पाएं:\n\n• बैंक काउंटर पर फॉर्म जमा करें\n• तुरंत **खाता नंबर** मिलेगा\n• **1–2 दिन में** पासबुक & डेबिट कार्ड 🎉\n\nबैंक खाता खुल गया!", opts:["✅ खाता खुल गया","🔁 फिर से शुरू","🏠 दूसरी सेवा"] },
    ],
    pan: [
      { text:"मुफ्त PAN कार्ड पाते हैं!\n\n**चरण 1** — Browser खोलें:\n🌐 **https://incometax.gov.in**\n\n✅ URL **.gov.in** पर समाप्त होना चाहिए\n\nवेबसाइट खोली?", opts:["✅ हाँ, खोल ली","❓ मदद चाहिए"] },
      { text:"**चरण 2** — Instant PAN खोजें:\n\n• Homepage पर **'Quick Links'** देखें\n• **'Instant e-PAN'** पर क्लिक करें\n• **'Get New e-PAN'** पर क्लिक करें\n\n'Instant e-PAN' मिला?", opts:["✅ हाँ, मिला","❓ नहीं मिला"] },
      { text:"**चरण 3** — आधार दर्ज करें:\n\n• **12 अंकों का आधार नंबर** टाइप करें\n• Checkbox पर क्लिक करें\n• **Continue** क्लिक करें\n• आपके mobile पर OTP आएगा\n\n⚠️ **OTP कभी किसी को न बताएं!**", opts:["✅ OTP आ गया","❓ OTP नहीं आया"] },
      { text:"**चरण 4** — OTP & Download:\n\n• OTP टाइप करें\n• आपकी PAN जानकारी स्क्रीन पर दिखेगी\n• **Download e-PAN** पर क्लिक करें\n• PDF सेव करें\n\n🔑 **PDF Password = जन्मतिथि** (DDMMYYYY, उदा. 15081990)\n\nआपका e-PAN तैयार! 🎉", opts:["✅ Download हो गया","🔁 फिर से शुरू","🏠 दूसरी सेवा"] },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════
   TYPING DOTS COMPONENT
═══════════════════════════════════════════════════════════ */
function TypingDots({ label }) {
  return (
    <div className="typing-wrap">
      <div className="bot-av-sm">🤖</div>
      <div className="typing-dots">
        <span/><span/><span/>
        {label && <span style={{fontSize:11,color:"#64748B",fontWeight:600,marginLeft:6}}>{label}</span>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEPS SIDEBAR
═══════════════════════════════════════════════════════════ */
function StepsPanel({ service, lang, guideStep, mode }) {
  const sdata = STEPS_DATA[lang.code][service.id];
  const total = GUIDE_FLOWS[lang.code][service.id].length;
  const progress = mode === "guide" ? ((guideStep+1)/total)*100 : 15;

  return (
    <aside className="steps-panel">
      <div className="steps-panel-header">
        <span className="steps-service-emoji">{service.emoji}</span>
        <div>
          <div className="steps-service-name">{service.label}</div>
          <div className="steps-progress-label">
            {mode === "guide" ? `Step ${guideStep+1} of ${total}` : lang.ui.chatStatus}
          </div>
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{width:`${progress}%`}}/>
      </div>
      <div className="steps-list">
        {sdata.steps.map((s,i) => {
          const done   = mode==="guide" && i < guideStep;
          const active = mode==="guide" && i === guideStep;
          return (
            <div key={i} className={`step-row ${done?"done":""} ${active?"active":""}`}>
              <div className="step-circle">{done?"✓":i+1}</div>
              <span className="step-text">{s}</span>
            </div>
          );
        })}
      </div>
      {sdata.tip && (
        <div className="tip-box">
          <span className="tip-icon">💡</span>
          <span>{sdata.tip}</span>
        </div>
      )}
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════
   WEB PREVIEW PANEL
═══════════════════════════════════════════════════════════ */
function WebPreview({ service, guideStep, lang }) {
  const urls = { aadhaar:"uidai.gov.in", scholarship:"scholarships.gov.in", bank:"sbi.co.in", pan:"incometax.gov.in" };
  const url = urls[service.id];
  const totalSteps = GUIDE_FLOWS[lang.code][service.id].length;

  return (
    <div className="web-preview">
      <div className="browser-bar">
        <div className="browser-dots">
          <span style={{background:"#ff5f57"}}/><span style={{background:"#febc2e"}}/><span style={{background:"#28c840"}}/>
        </div>
        <div className="browser-url">
          <span>🔒</span>
          <span style={{fontSize:11,color:"#475569",fontWeight:600}}>https://www.{url}</span>
        </div>
      </div>
      <div className="verified-badge">
        <span>✅</span>
        <span>Official Government Website — Verified</span>
      </div>
      <div className="mock-page">
        <div className="mock-header">
          <span style={{fontSize:22}}>🇮🇳</span>
          <div>
            <div className="mock-gov">GOVERNMENT OF INDIA</div>
            <div className="mock-portal" style={{color:service.accent}}>{service.label}</div>
          </div>
        </div>
        <div className="mock-steps-row">
          {Array.from({length:totalSteps}).map((_,i) => (
            <div key={i} className={`mock-step-dot ${i<=guideStep?"active":""}`}>
              <div className="dot-circle" style={i<=guideStep?{background:service.accent,color:"#fff"}:{}}>
                {i<guideStep?"✓":i+1}
              </div>
              <div style={{fontSize:9,marginTop:3,color:i<=guideStep?service.accent:"#aaa",fontWeight:600}}>
                {["Start","Process","Verify","Done"][i]||`Step ${i+1}`}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:16}}>
          <div style={{
            display:"inline-block",
            background:guideStep===totalSteps-1?"#4CAF50":"#FFC107",
            color:guideStep===totalSteps-1?"#fff":"#1A237E",
            borderRadius:24,padding:"10px 28px",fontWeight:700,fontSize:14,
            fontFamily:"'Poppins',sans-serif",
            boxShadow:guideStep===totalSteps-1?"0 4px 12px rgba(76,175,80,0.4)":"0 4px 12px rgba(255,193,7,0.4)",
          }}>
            {guideStep===0?"▶ Begin":guideStep===totalSteps-1?"✓ Complete":"📋 Continue"}
          </div>
        </div>
      </div>
      <div className="preview-disclaimer">
        Visual guide only. Visit the actual website to complete your application.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LANGUAGE PICKER
═══════════════════════════════════════════════════════════ */
function LangPicker({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:"relative"}}>
      <button
        onClick={()=>setOpen(o=>!o)}
        style={{
          background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.3)",
          color:"#fff",borderRadius:22,padding:"6px 14px",fontSize:13,fontWeight:700,
          cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Hind',sans-serif",
        }}
      >
        {lang.flag} {lang.label} ▾
      </button>
      {open && (
        <div style={{
          position:"absolute",top:"calc(100% + 8px)",right:0,
          background:"#fff",borderRadius:12,boxShadow:"0 8px 32px rgba(0,0,0,0.15)",
          overflow:"hidden",zIndex:500,minWidth:140,border:"1px solid #E2EAF4",
        }}>
          {Object.values(LANGS).map(l=>(
            <div
              key={l.code}
              onClick={()=>{setLang(l);setOpen(false)}}
              style={{
                padding:"11px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,
                fontSize:14,fontWeight:600,color:"#1A237E",
                background:l.code===lang.code?"#EEF4FF":"#fff",
                borderBottom:"1px solid #F0F4FF",transition:"background 0.15s",
              }}
              onMouseEnter={e=>e.target.style.background="#F0F4FF"}
              onMouseLeave={e=>e.target.style.background=l.code===lang.code?"#EEF4FF":"#fff"}
            >
              <span>{l.flag}</span><span>{l.label}</span>
              {l.code===lang.code&&<span style={{marginLeft:"auto",color:"#1565C0"}}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [lang,      setLang]      = useState(LANGS.en);
  const [screen,    setScreen]    = useState("landing");
  const [service,   setService]   = useState(null);
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState("");
  const [typing,    setTyping]    = useState(false);
  const [listening, setListening] = useState(false);
  const [mode,      setMode]      = useState("welcome"); // welcome | guide | freeai
  const [guideStep, setGuideStep] = useState(0);
  const bottomRef = useRef(null);
  const recogRef  = useRef(null);

  const t = lang.ui;
  const services = SERVICES_DATA[lang.code];

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, typing]);

  const startService = useCallback((svc) => {
    setService(svc); setMessages([]); setMode("welcome"); setGuideStep(0); setScreen("chat");
    setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      const wd = STEPS_DATA[lang.code][svc.id];
      setMessages([{ from:"bot", text:wd.welcome, opts:wd.opts }]);
    }, 700);
  }, [lang]);

  /* handle option or typed text */
  const handleInput = useCallback(async (text) => {
    if (!text.trim()) return;

    // navigation options
    if (text.includes("Choose Another Service") || text.includes("வேறு சேவை") || text.includes("दूसरी सेवा")) {
      setScreen("services"); return;
    }
    if (text.includes("Start Over") || text.includes("மீண்டும்") || text.includes("फिर से शुरू")) {
      startService(service); return;
    }

    // welcome: choose guide vs free question
    if (mode === "welcome") {
      setMessages(p=>[...p, { from:"user", text }]);
      if (text.includes("Step-by-Step") || text.includes("படிப்படியான") || text.includes("चरण-दर-चरण")) {
        setMode("guide"); setGuideStep(0);
        setTyping(true);
        setTimeout(()=>{
          setTyping(false);
          const gf = GUIDE_FLOWS[lang.code][service.id][0];
          setMessages(p=>[...p, { from:"bot", text:gf.text, opts:gf.opts }]);
        }, 800);
      } else {
        // free AI question
        setMode("freeai");
        setTyping(true);
        try {
          const allMsgs = [...messages, {from:"user",text}];
          const reply = await askAI(text, service.id, lang.code, allMsgs);
          setTyping(false);
          setMessages(p=>[...p, { from:"bot", text:reply, opts:null }]);
        } catch(err) {
          setTyping(false);
          console.error("AI error:", err);
          setMessages(p=>[...p, { from:"bot", text:t.aiError, opts:["🔁 Start Over","🏠 Choose Another Service"] }]);
        }
      }
      return;
    }

    // guide mode
    if (mode === "guide") {
      setMessages(p=>[...p, { from:"user", text }]);
      const flow = GUIDE_FLOWS[lang.code][service.id];
      const next = Math.min(guideStep+1, flow.length-1);
      if (guideStep < flow.length-1) {
        setTyping(true);
        setTimeout(()=>{
          setTyping(false);
          setGuideStep(next);
          setMessages(p=>[...p, { from:"bot", text:flow[next].text, opts:flow[next].opts }]);
        }, 900);
      } else {
        // guide done, switch to free AI
        setMode("freeai");
        setMessages(p=>[...p, { from:"bot", text: lang.code==="ta"?"மேலும் ஏதாவது கேள்விகள் இருந்தால் கேளுங்கள்! 😊": lang.code==="hi"?"कोई और सवाल हो तो पूछें! 😊":"Any more questions? Feel free to ask! 😊", opts:["🔁 Start Over","🏠 Choose Another Service"] }]);
      }
      return;
    }

    // freeai mode — send to AI
    if (mode === "freeai") {
      setMessages(p=>[...p, { from:"user", text }]);
      setTyping(true);
      try {
        const allMsgs = [...messages, {from:"user",text}];
        const reply = await askAI(text, service.id, lang.code, allMsgs);
        setTyping(false);
        setMessages(p=>[...p, { from:"bot", text:reply, opts:null }]);
      } catch(err) {
        setTyping(false);
        console.error("AI error:", err);
        setMessages(p=>[...p, { from:"bot", text:t.aiError, opts:["🔁 Start Over","🏠 Choose Another Service"] }]);
      }
    }
  }, [mode, guideStep, service, lang, messages, t]);

  const handleSend = () => { if (!input.trim()) return; handleInput(input); setInput(""); };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Please use Chrome browser for voice input."); return;
    }
    if (listening) { recogRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); r.lang = lang.speechLang;
    r.onresult = e => { const txt=e.results[0][0].transcript; setInput(txt); setListening(false); };
    r.onerror = r.onend = () => setListening(false);
    recogRef.current=r; r.start(); setListening(true);
  };

  const lastMsg = messages[messages.length-1];

  return (
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Hind:wght@400;500;600&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans:wght@400;500;600&display=swap');

      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html,body,#root{width:100%;min-height:100%;overflow-x:hidden;background:#F0F4FF}
      body{font-family:'Hind',sans-serif}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px}

      /* ── NAVBAR ── */
      .navbar{
        position:sticky;top:0;z-index:300;
        background:linear-gradient(95deg,#0A3880 0%,#1565C0 55%,#1E88E5 100%);
        height:60px;padding:0 28px;
        display:flex;align-items:center;justify-content:space-between;
        box-shadow:0 3px 18px rgba(13,71,161,0.38);
      }
      .nav-brand{display:flex;align-items:center;gap:12px;cursor:pointer}
      .nav-brand-icon{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,0.18);border:1.5px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:20px}
      .nav-brand-text{font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;color:#fff;line-height:1.15}
      .nav-brand-sub{font-size:10px;font-weight:400;color:rgba(255,255,255,0.75)}
      .nav-links{display:flex;align-items:center;gap:8px}
      .nav-btn{background:rgba(255,255,255,0.13);border:1.5px solid rgba(255,255,255,0.25);color:#fff;border-radius:22px;padding:6px 18px;font-size:13px;font-family:'Hind',sans-serif;font-weight:600;cursor:pointer;transition:all 0.2s}
      .nav-btn:hover,.nav-btn.active{background:rgba(255,255,255,0.26)}

      /* ── BREADCRUMB ── */
      .breadcrumb{background:#fff;border-bottom:1px solid #E2EAF4;padding:10px 28px;font-size:13px;font-weight:600;color:#1565C0;display:flex;align-items:center;gap:6px}
      .bc-link{cursor:pointer;opacity:0.65;transition:opacity 0.15s}
      .bc-link:hover{opacity:1;text-decoration:underline}
      .bc-sep{color:#94A3B8}
      .bc-cur{opacity:1;color:#0D47A1}

      /* ── HERO ── */
      .hero{
        background:linear-gradient(130deg,#0A3880 0%,#1565C0 45%,#1E88E5 75%,#64B5F6 100%);
        padding:60px 80px 52px;display:flex;align-items:center;justify-content:space-between;
        gap:40px;position:relative;overflow:hidden;min-height:290px;
      }
      .hero::before{content:'';position:absolute;right:-120px;top:-120px;width:500px;height:500px;background:radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 68%);border-radius:50%}
      .hero-content{position:relative;z-index:1;max-width:560px}
      .hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.28);color:#fff;border-radius:20px;padding:5px 14px;font-size:12px;font-weight:600;margin-bottom:16px;backdrop-filter:blur(6px)}
      .hero-title{font-family:'Poppins',sans-serif;font-size:clamp(24px,3.5vw,42px);font-weight:800;color:#fff;line-height:1.2;margin-bottom:12px}
      .hero-title span{color:#FFC107}
      .hero-sub{font-size:16px;color:rgba(255,255,255,0.82);margin-bottom:30px;font-weight:500;line-height:1.6;white-space:pre-line}
      .hero-cta{background:#FFC107;color:#1A237E;border:none;border-radius:32px;padding:14px 38px;font-size:17px;font-weight:800;font-family:'Poppins',sans-serif;cursor:pointer;box-shadow:0 6px 20px rgba(255,193,7,0.45);transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1)}
      .hero-cta:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 10px 28px rgba(255,193,7,0.55)}
      .hero-illustration{position:relative;z-index:1;font-size:108px;filter:drop-shadow(0 12px 32px rgba(0,0,0,0.22));animation:heroFloat 4s ease-in-out infinite;flex-shrink:0}
      @keyframes heroFloat{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-14px) rotate(2deg)}}

      /* ── QUICK SERVICES (landing) ── */
      .quick-services{background:#fff;padding:32px 80px;border-bottom:1px solid #E2EAF4}
      .qs-label{font-family:'Poppins',sans-serif;font-size:12px;font-weight:700;color:#64748B;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:18px}
      .qs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:780px}
      .qs-card{display:flex;flex-direction:column;align-items:center;gap:8px;padding:20px 12px;border-radius:16px;cursor:pointer;border:2px solid #EEF2FF;background:#FAFBFF;transition:all 0.22s cubic-bezier(0.34,1.56,0.64,1)}
      .qs-card:hover{border-color:#1565C0;background:#EEF4FF;transform:translateY(-4px);box-shadow:0 8px 24px rgba(21,101,192,0.14)}
      .qs-emoji{font-size:32px;line-height:1}
      .qs-name{font-size:12px;font-weight:700;color:#1A237E;text-align:center;line-height:1.35}
      .qs-tag{font-size:10px;font-weight:700;color:#fff;border-radius:8px;padding:2px 8px}
      .qs-disclaimer{font-size:11px;color:#94A3B8;margin-top:16px;line-height:1.6}

      /* ── AI BADGE ── */
      .ai-powered-badge{
        display:inline-flex;align-items:center;gap:8px;
        background:linear-gradient(135deg,#667eea,#764ba2);
        color:#fff;border-radius:24px;padding:8px 20px;
        font-size:13px;font-weight:700;margin:20px 0 0;
        box-shadow:0 4px 14px rgba(102,126,234,0.35);
      }
      .ai-dot{width:8px;height:8px;background:#A7F3D0;border-radius:50%;animation:aiPulse 1.5s ease-in-out infinite}
      @keyframes aiPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}

      /* ── SERVICES SELECT ── */
      .services-screen{flex:1;padding:40px 80px;background:#F0F4FF}
      .services-heading{font-family:'Poppins',sans-serif;font-size:clamp(20px,3vw,34px);font-weight:800;color:#0D47A1;margin-bottom:8px}
      .services-sub{font-size:15px;color:#4A6FA5;margin-bottom:32px;font-weight:500}
      .services-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:840px}
      .svc-card{background:#fff;border-radius:20px;padding:24px 20px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;border:2.5px solid transparent;box-shadow:0 2px 16px rgba(13,71,161,0.07);transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1)}
      .svc-card:hover{border-color:#1565C0;transform:translateY(-5px);box-shadow:0 12px 32px rgba(13,71,161,0.16)}
      .svc-card-inner{display:flex;align-items:center;gap:16px}
      .svc-icon-wrap{width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0}
      .svc-card-tag{font-size:10px;font-weight:700;color:#fff;border-radius:6px;padding:2px 8px;display:inline-block;margin-bottom:5px}
      .svc-card-name{font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;color:#1A237E;line-height:1.3}
      .svc-card-hint{font-size:12px;color:#7C8DB5;margin-top:3px}
      .svc-arrow{width:38px;height:38px;background:#1565C0;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;flex-shrink:0;transition:transform 0.2s}
      .svc-card:hover .svc-arrow{transform:translateX(3px)}
      .services-disclaimer{margin-top:24px;font-size:12px;color:#94A3B8;max-width:840px;text-align:center;line-height:1.6}

      /* ── CHAT SCREEN ── */
      .chat-screen{flex:1;display:flex;flex-direction:column;min-height:0;background:#F0F4FF}
      .chat-body{flex:1;display:flex;gap:18px;padding:18px 24px;min-height:0;overflow:hidden}

      /* LEFT sidebar */
      .steps-panel{width:260px;flex-shrink:0;align-self:flex-start;background:#fff;border-radius:20px;padding:20px 16px;box-shadow:0 2px 16px rgba(13,71,161,0.08);border:1px solid #E2EAF4}
      .steps-panel-header{display:flex;align-items:center;gap:12px;margin-bottom:14px}
      .steps-service-emoji{font-size:30px;line-height:1}
      .steps-service-name{font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;color:#0D47A1;line-height:1.3}
      .steps-progress-label{font-size:11px;color:#7C8DB5;font-weight:600;margin-top:2px}
      .progress-track{height:6px;background:#E2EAF4;border-radius:10px;margin-bottom:18px;overflow:hidden}
      .progress-fill{height:100%;background:linear-gradient(90deg,#1565C0,#42A5F5);border-radius:10px;transition:width 0.5s ease}
      .steps-list{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}
      .step-row{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:10px;border:1.5px solid transparent;transition:all 0.2s}
      .step-row.active{background:#EEF4FF;border-color:#90CAF9}
      .step-row.done{opacity:0.5}
      .step-circle{width:24px;height:24px;border-radius:50%;flex-shrink:0;background:#E2EAF4;color:#1565C0;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}
      .step-row.active .step-circle{background:#1565C0;color:#fff}
      .step-row.done .step-circle{background:#4CAF50;color:#fff}
      .step-text{font-size:12px;font-weight:600;color:#334155;line-height:1.4}
      .step-row.active .step-text{color:#0D47A1}
      .tip-box{background:#FFFBEB;border:1.5px solid #FEF08A;border-radius:10px;padding:10px 12px;display:flex;gap:8px;align-items:flex-start;font-size:11.5px;color:#78350F;line-height:1.55;font-weight:500}
      .tip-icon{font-size:15px;flex-shrink:0}

      /* MIDDLE chat panel */
      .chat-panel{flex:1;display:flex;flex-direction:column;background:#fff;border-radius:20px;box-shadow:0 2px 16px rgba(13,71,161,0.08);border:1px solid #E2EAF4;min-height:0;overflow:hidden}
      .chat-panel-header{padding:14px 18px;border-bottom:1px solid #EEF2FF;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;background:#FAFBFF;border-radius:20px 20px 0 0}
      .chat-header-left{display:flex;align-items:center;gap:10px}
      .chat-header-av{width:38px;height:38px;background:linear-gradient(135deg,#1565C0,#42A5F5);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 8px rgba(21,101,192,0.3)}
      .chat-header-name{font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;color:#0D47A1}
      .chat-header-status{font-size:11px;color:#22C55E;font-weight:600;display:flex;align-items:center;gap:4px}
      .g-dot{width:6px;height:6px;background:#22C55E;border-radius:50%;display:inline-block;animation:gpulse 2s ease-in-out infinite}
      @keyframes gpulse{0%,100%{opacity:1}50%{opacity:0.4}}
      .mode-badge{background:#EEF4FF;color:#1565C0;border-radius:18px;padding:4px 12px;font-size:11px;font-weight:700;border:1px solid #BFDBFE}
      .ai-badge-sm{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:18px;padding:4px 12px;font-size:11px;font-weight:700}

      .chat-messages{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:14px}
      .msg{display:flex;align-items:flex-end;gap:10px;animation:msgIn 0.3s ease}
      @keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      .msg.user{flex-direction:row-reverse}
      .msg-av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
      .bot-av{background:linear-gradient(135deg,#1565C0,#42A5F5);box-shadow:0 2px 8px rgba(21,101,192,0.25)}
      .user-av{background:linear-gradient(135deg,#FF8F00,#FFC107);box-shadow:0 2px 8px rgba(255,143,0,0.25)}
      .msg-bubble{max-width:75%;padding:12px 16px;border-radius:18px;font-size:14px;line-height:1.7}
      .msg.bot .msg-bubble{background:#F0F7FF;border-bottom-left-radius:4px;color:#1E293B;border:1px solid #DBEAFE}
      .msg.user .msg-bubble{background:linear-gradient(135deg,#1565C0,#1976D2);border-bottom-right-radius:4px;color:#fff}
      .msg-bubble p{margin:2px 0}
      .msg-bubble strong{font-weight:700}

      /* typing */
      .typing-wrap{display:flex;align-items:flex-end;gap:10px;animation:msgIn 0.3s ease}
      .bot-av-sm{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#1565C0,#42A5F5);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 2px 8px rgba(21,101,192,0.25)}
      .typing-dots{background:#F0F7FF;border:1px solid #DBEAFE;border-radius:18px;border-bottom-left-radius:4px;padding:13px 18px;display:flex;gap:5px;align-items:center}
      .typing-dots span{width:8px;height:8px;background:#93C5FD;border-radius:50%;animation:bounce 1.1s ease-in-out infinite}
      .typing-dots span:nth-child(2){animation-delay:0.18s}
      .typing-dots span:nth-child(3){animation-delay:0.36s}
      @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}

      /* options */
      .opts-row{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 14px 60px;animation:msgIn 0.35s ease 0.12s both}
      .opt-btn{padding:9px 18px;border-radius:24px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Hind',sans-serif;transition:all 0.2s;border:2px solid #1565C0;background:#fff;color:#1565C0}
      .opt-btn:hover{background:#1565C0;color:#fff;transform:translateY(-2px);box-shadow:0 4px 12px rgba(21,101,192,0.22)}
      .opt-btn.primary{background:#FFC107;border-color:#FFC107;color:#1A237E}
      .opt-btn.primary:hover{background:#FFB300;border-color:#FFB300;box-shadow:0 4px 12px rgba(255,193,7,0.32)}

      /* input bar */
      .input-bar{border-top:1px solid #EEF2FF;padding:11px 14px;display:flex;gap:9px;align-items:center;flex-shrink:0;background:#FAFBFF;border-radius:0 0 20px 20px}
      .chat-input{flex:1;border:1.5px solid #CBD5E1;border-radius:26px;padding:11px 20px;font-size:14px;font-family:'Hind',sans-serif;outline:none;background:#F8FAFC;transition:all 0.2s;color:#1E293B}
      .chat-input:focus{border-color:#1565C0;background:#fff;box-shadow:0 0 0 3px rgba(21,101,192,0.1)}
      .chat-input::placeholder{color:#94A3B8}
      .icon-btn{width:42px;height:42px;border-radius:50%;border:none;display:flex;align-items:center;justify-content:center;font-size:17px;cursor:pointer;flex-shrink:0;transition:all 0.2s}
      .mic-btn{background:#EEF4FF;color:#1565C0}
      .mic-btn:hover{background:#DBEAFE}
      .mic-btn.on{background:#EF4444;color:#fff;animation:micPulse 1s ease-in-out infinite}
      @keyframes micPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}
      .send-btn{background:linear-gradient(135deg,#1565C0,#1E88E5);color:#fff;box-shadow:0 3px 10px rgba(21,101,192,0.3)}
      .send-btn:hover{transform:scale(1.08);box-shadow:0 5px 16px rgba(21,101,192,0.4)}

      /* RIGHT preview */
      .web-preview{width:310px;flex-shrink:0;align-self:flex-start;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 2px 16px rgba(13,71,161,0.08);border:1px solid #E2EAF4}
      .browser-bar{background:#F1F5F9;padding:10px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #E2EAF4}
      .browser-dots{display:flex;gap:5px}
      .browser-dots span{width:11px;height:11px;border-radius:50%;display:block}
      .browser-url{flex:1;background:#fff;border-radius:20px;padding:5px 12px;display:flex;align-items:center;gap:5px;border:1px solid #E2EAF4}
      .verified-badge{background:#F0FDF4;border-bottom:1px solid #BBF7D0;padding:8px 14px;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:#15803D}
      .mock-page{padding:16px}
      .mock-header{display:flex;align-items:center;gap:10px;margin-bottom:14px}
      .mock-gov{font-size:10px;font-weight:700;color:#475569;letter-spacing:0.5px;text-transform:uppercase}
      .mock-portal{font-size:12px;font-weight:700}
      .mock-steps-row{display:flex;align-items:flex-start;gap:0;margin-bottom:16px}
      .mock-step-dot{display:flex;flex-direction:column;align-items:center;flex:1;position:relative}
      .mock-step-dot:not(:last-child)::after{content:'';position:absolute;top:11px;left:50%;width:100%;height:2px;background:#E2EAF4;z-index:0}
      .mock-step-dot.active:not(:last-child)::after{background:#BFDBFE}
      .dot-circle{width:22px;height:22px;border-radius:50%;background:#E2EAF4;color:#94A3B8;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;border:2px solid #fff;transition:all 0.3s}
      .preview-disclaimer{padding:10px 14px;background:#FFFBEB;border-top:1px solid #FEF3C7;font-size:10px;color:#92400E;text-align:center;font-weight:500;line-height:1.5}

      /* ── FOOTER ── */
      .footer-bar{text-align:center;padding:8px;font-size:11px;color:#94A3B8;background:#fff;border-top:1px solid #E2EAF4;flex-shrink:0}

      /* ── RESPONSIVE ── */
      @media(max-width:1200px){
        .hero,.quick-services,.services-screen{padding-left:40px;padding-right:40px}
        .chat-body{padding:14px 18px}
        .web-preview{width:265px}
        .steps-panel{width:230px}
      }
      @media(max-width:900px){
        .hero{flex-direction:column;padding:32px 20px;text-align:center;min-height:auto}
        .hero-illustration{font-size:72px}
        .quick-services,.services-screen{padding:20px}
        .qs-grid{grid-template-columns:repeat(2,1fr)}
        .services-grid{grid-template-columns:1fr}
        .chat-body{flex-direction:column;padding:10px;overflow:auto}
        .chat-screen{min-height:auto}
        .steps-panel,.web-preview{width:100%}
        .chat-panel{min-height:420px}
        .navbar{padding:0 14px}
        .breadcrumb{padding:8px 14px}
      }
      @media(max-width:480px){
        .hero-title{font-size:22px}
        .qs-grid{grid-template-columns:repeat(2,1fr)}
        .nav-brand-text{font-size:13px}
      }
    `}</style>

    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand" onClick={()=>setScreen("landing")}>
          <div className="nav-brand-icon">🇮🇳</div>
          <div>
            <div className="nav-brand-text">Digital Literacy Assistant</div>
            <div className="nav-brand-sub">{t.navSub}</div>
          </div>
        </div>
        <div className="nav-links">
          <button className={`nav-btn ${screen==="landing"?"active":""}`} onClick={()=>setScreen("landing")}>{t.navHome}</button>
          <button className={`nav-btn ${screen==="services"?"active":""}`} onClick={()=>setScreen("services")}>{t.navServices}</button>
          <LangPicker lang={lang} setLang={setLang}/>
        </div>
      </nav>

      {/* ── BREADCRUMB ── */}
      {screen!=="landing"&&(
        <div className="breadcrumb">
          <span className="bc-link" onClick={()=>setScreen("landing")}>{t.navHome}</span>
          {screen==="services"&&<><span className="bc-sep">›</span><span className="bc-cur">{t.bcSelectService}</span></>}
          {screen==="chat"&&service&&<>
            <span className="bc-sep">›</span>
            <span className="bc-link" onClick={()=>setScreen("services")}>{t.bcSelectService}</span>
            <span className="bc-sep">›</span>
            <span className="bc-cur">{service.label}</span>
          </>}
        </div>
      )}

      {/* ════════ LANDING ════════ */}
      {screen==="landing"&&(
        <>
          <div className="hero">
            <div className="hero-content">
              <div className="hero-badge">🏛️ &nbsp;{t.heroBadge}</div>
              <h1 className="hero-title">{t.heroTitle}<br/><span>{t.heroTitleHighlight}</span></h1>
              <p className="hero-sub">{t.heroSub}</p>
              <button className="hero-cta" onClick={()=>setScreen("services")}>{t.heroCta}</button>
              <div className="ai-powered-badge" style={{marginLeft:0}}>
                <div className="ai-dot"/>
                🤖 AI-Powered • Answers any question • 3 languages
              </div>
            </div>
            <div className="hero-illustration">🧑‍💻</div>
          </div>
          <div className="quick-services">
            <div className="qs-label">{t.quickLabel}</div>
            <div className="qs-grid">
              {services.map(s=>(
                <div key={s.id} className="qs-card" onClick={()=>startService(s)}>
                  <div className="qs-emoji">{s.emoji}</div>
                  <div className="qs-name">{s.label}</div>
                  <div className="qs-tag" style={{background:s.accent}}>{s.tag}</div>
                </div>
              ))}
            </div>
            <div className="qs-disclaimer">{t.disclaimer}</div>
          </div>
        </>
      )}

      {/* ════════ SELECT SERVICE ════════ */}
      {screen==="services"&&(
        <div className="services-screen">
          <h2 className="services-heading">{t.welcomeTitle}</h2>
          <p className="services-sub">{t.welcomeSub}</p>
          <div className="services-grid">
            {services.map(s=>(
              <div key={s.id} className="svc-card" onClick={()=>startService(s)}>
                <div className="svc-card-inner">
                  <div className="svc-icon-wrap" style={{background:s.bg}}>
                    <span style={{fontSize:32}}>{s.emoji}</span>
                  </div>
                  <div>
                    <span className="svc-card-tag" style={{background:s.accent}}>{s.tag}</span>
                    <div className="svc-card-name">{s.label}</div>
                    <div className="svc-card-hint">{s.hint}</div>
                  </div>
                </div>
                <div className="svc-arrow">›</div>
              </div>
            ))}
          </div>
          <div className="services-disclaimer">{t.servicesDisclaimer}</div>
        </div>
      )}

      {/* ════════ CHAT ════════ */}
      {screen==="chat"&&service&&service.id==="scholarship"&&(
        <ScholarshipService onBack={()=>setScreen("services")}/>
      )}

      {screen==="chat"&&service&&service.id!=="scholarship"&&(
        <div className="chat-screen">
          <div className="chat-body">

            {/* LEFT */}
            <StepsPanel service={service} lang={lang} guideStep={guideStep} mode={mode}/>

            {/* MIDDLE */}
            <div className="chat-panel">
              <div className="chat-panel-header">
                <div className="chat-header-left">
                  <div className="chat-header-av">🤖</div>
                  <div>
                    <div className="chat-header-name">Digital Literacy Assistant</div>
                    <div className="chat-header-status"><span className="g-dot"/>&nbsp;{t.chatStatus}</div>
                  </div>
                </div>
                {mode==="freeai"
                  ? <div className="ai-badge-sm">🤖 AI Mode — Ask anything!</div>
                  : <div className="mode-badge">{mode==="guide"?`Step ${guideStep+1}`:"Getting started"}</div>
                }
              </div>

              <div className="chat-messages">
                {messages.map((m,i)=>(
                  <div key={i} className={`msg ${m.from}`}>
                    <div className={`msg-av ${m.from==="bot"?"bot-av":"user-av"}`}>
                      {m.from==="bot"?"🤖":"👤"}
                    </div>
                    <div className="msg-bubble">
                      {m.text.split("\n").map((l,j)=>(
                        <p key={j} dangerouslySetInnerHTML={{__html:l.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}}/>
                      ))}
                    </div>
                  </div>
                ))}
                {typing&&<TypingDots label={t.aiThinking}/>}
                <div ref={bottomRef}/>
              </div>

              {!typing&&lastMsg?.opts&&(
                <div className="opts-row">
                  {lastMsg.opts.map((o,i)=>(
                    <button
                      key={i}
                      className={`opt-btn ${(o.startsWith("✅")||o.startsWith("➡️")||o.includes("Start"))?"primary":""}`}
                      onClick={()=>handleInput(o)}
                    >{o}</button>
                  ))}
                </div>
              )}

              <div className="input-bar">
                <button className={`icon-btn mic-btn ${listening?"on":""}`} onClick={toggleVoice} title="Voice">
                  {listening?"🔴":"🎤"}
                </button>
                {listening&&<span style={{fontSize:11,color:"#EF4444",fontWeight:700,whiteSpace:"nowrap"}}>{t.voiceListening}</span>}
                <input
                  className="chat-input"
                  placeholder={t.inputPlaceholder}
                  value={input}
                  onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleSend()}
                />
                <button className="icon-btn send-btn" onClick={handleSend} title="Send">➤</button>
              </div>
            </div>

            {/* RIGHT */}
            <WebPreview service={service} guideStep={guideStep} lang={lang}/>

          </div>
          <div className="footer-bar">{t.footerText}</div>
        </div>
      )}

    </div>
    </>
  );
}