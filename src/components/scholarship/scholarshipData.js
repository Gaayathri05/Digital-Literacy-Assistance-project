/* ═══════════════════════════════════════════════════════
   scholarshipData.js
   All static data: steps, documents, eligibility, FAQ,
   offline chatbot responses — all in one place.
   No external API needed for offline fallback.
═══════════════════════════════════════════════════════ */

/* ── GUIDE STEPS (from NSP portal reference) ── */
export const SCHOLARSHIP_STEPS = [
  {
    id: 1,
    phase: "Registration",
    icon: "📋",
    title: "Read OTR Guidelines",
    subtitle: "One Time Registration",
    color: "#1565C0",
    bg: "#EEF4FF",
    border: "#BFDBFE",
    description: "Before starting, read all guidelines carefully. OTR (One Time Registration) is mandatory and gives you a unique 14-digit number used for life.",
    details: [
      "OTR is mandatory for all scholarship applications on NSP",
      "Active mobile number is required for OTR registration",
      "OTR registration is completely FREE — do not pay anyone",
      "Once registered, you can apply for scholarship when portal opens",
      "A reference number will be sent to your registered mobile number",
    ],
    warning: "⚠️ Editing is NOT allowed after final submission. Read everything carefully.",
    highlight: null,
  },
  {
    id: 2,
    phase: "Registration",
    icon: "📱",
    title: "Register Your Mobile Number",
    subtitle: "Step 2 of OTR Registration",
    color: "#1565C0",
    bg: "#EEF4FF",
    border: "#BFDBFE",
    description: "Enter your active mobile number to get an OTP. This mobile number will be used for all future communications.",
    details: [
      "Go to scholarships.gov.in → Click Register",
      "Enter your active 10-digit mobile number",
      "Click 'Get OTP' — an OTP will be sent to your mobile",
      "Enter the OTP in the 6 boxes shown on screen",
      "Complete the Image Captcha (type the letters/numbers shown)",
      "Click 'Verify' to proceed",
    ],
    warning: "⚠️ Use your own active mobile number. All communications will go to this number only.",
    highlight: "mobile",
    formFields: [
      { label: "Mobile Number", placeholder: "Enter 10-digit mobile number", type: "tel", highlight: true },
      { label: "OTP", placeholder: "Enter 6-digit OTP", type: "text", highlight: false },
      { label: "Captcha Code", placeholder: "Type the code shown in image", type: "text", highlight: false },
    ],
  },
  {
    id: 3,
    phase: "eKYC",
    icon: "🪪",
    title: "eKYC Verification via Aadhaar",
    subtitle: "Identity Verification",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    description: "After mobile verification, you need to verify your identity using Aadhaar. Your details will be auto-filled from Aadhaar records.",
    details: [
      "Download NSP OTR App from Google Play Store",
      "Install Aadhaar Face RD Services on your Android phone",
      "Open the app and enter the reference number sent to your mobile",
      "Complete Face Authentication using your phone's camera",
      "Your Aadhaar details (Name, DOB, Gender, Address) will be fetched automatically",
      "Verify all details are correct — they CANNOT be edited later",
    ],
    warning: "⚠️ If a minor has no Aadhaar, registration can be done using parent's/guardian's Aadhaar or Enrollment ID (EID).",
    highlight: "aadhaar",
    formFields: [
      { label: "Applicant Name", placeholder: "Auto-filled from Aadhaar", type: "text", highlight: false, readonly: true },
      { label: "Aadhaar Number", placeholder: "Auto-filled", type: "text", highlight: true, readonly: true },
      { label: "Gender", placeholder: "Auto-filled from Aadhaar", type: "text", highlight: false, readonly: true },
      { label: "Date of Birth", placeholder: "Auto-filled from Aadhaar", type: "text", highlight: false, readonly: true },
      { label: "Address", placeholder: "Auto-filled from Aadhaar", type: "text", highlight: false, readonly: true },
    ],
  },
  {
    id: 4,
    phase: "Application",
    icon: "📝",
    title: "Fill Scholarship Application Form",
    subtitle: "Academic & Personal Details",
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    description: "Login with your OTR number and password to fill the scholarship application form. Fill all details carefully.",
    details: [
      "Login to NSP using your OTR number and password",
      "Select 'Fresh Application' or 'Renewal' based on your case",
      "Fill personal details: name, address, category (SC/ST/OBC/General)",
      "Fill academic details: school/college name, class/course, marks",
      "Enter bank account details for receiving scholarship money",
      "Upload all required documents (see Documents section below)",
    ],
    warning: "⚠️ Bank account must be in the student's name. Joint accounts are not accepted.",
    highlight: "form",
  },
  {
    id: 5,
    phase: "Submission",
    icon: "✅",
    title: "Final Submit & Get Application ID",
    subtitle: "Almost Done!",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    description: "Review all details carefully before final submission. Once submitted, editing is NOT allowed.",
    details: [
      "Review every field one more time carefully",
      "Check all uploaded documents are clear and correct",
      "Click 'Final Submit' button",
      "Note your Application ID — save it safely",
      "A confirmation SMS will be sent to your registered mobile",
      "Inform your school/college to approve your application online",
    ],
    warning: "📌 IMPORTANT: Ask your school or college to approve your application online before the deadline. Without institute approval, your application will be rejected.",
    highlight: null,
  },
];

/* ── REQUIRED DOCUMENTS ── */
export const REQUIRED_DOCUMENTS = [
  {
    category: "Identity Documents",
    icon: "🪪",
    color: "#1565C0",
    bg: "#EEF4FF",
    docs: [
      { name: "Aadhaar Card", required: true, note: "Original 12-digit Aadhaar number required" },
      { name: "Aadhaar Enrollment ID", required: false, note: "Only if Aadhaar not yet assigned (for minors)" },
    ],
  },
  {
    category: "Academic Documents",
    icon: "🎓",
    color: "#059669",
    bg: "#ECFDF5",
    docs: [
      { name: "Previous Year Marksheet", required: true, note: "Class 10 or last passed exam marksheet" },
      { name: "Bonafide Certificate", required: true, note: "From current school/college" },
      { name: "Fee Receipt", required: true, note: "Current year admission/fee receipt" },
    ],
  },
  {
    category: "Income & Category",
    icon: "📄",
    color: "#D97706",
    bg: "#FFFBEB",
    docs: [
      { name: "Income Certificate", required: true, note: "From Tehsildar/Revenue officer" },
      { name: "Caste Certificate", required: false, note: "Required for SC/ST/OBC category students" },
      { name: "Domicile Certificate", required: false, note: "Required for some state scholarships" },
    ],
  },
  {
    category: "Bank Details",
    icon: "🏦",
    color: "#7C3AED",
    bg: "#F5F3FF",
    docs: [
      { name: "Bank Passbook (First Page)", required: true, note: "Must show account number and IFSC code" },
      { name: "Bank Account (Student's Name)", required: true, note: "Account must be in student's own name" },
    ],
  },
  {
    category: "Photograph",
    icon: "📷",
    color: "#DC2626",
    bg: "#FEF2F2",
    docs: [
      { name: "Passport Size Photo", required: true, note: "Recent photo, white background, JPG format" },
    ],
  },
];

/* ── ELIGIBILITY CRITERIA ── */
export const ELIGIBILITY = [
  {
    icon: "🎓",
    title: "Student Status",
    color: "#1565C0",
    bg: "#EEF4FF",
    points: [
      "Must be a regular full-time student",
      "Studying in a recognized school, college, or university",
      "Not studying through distance/correspondence (for most schemes)",
    ],
  },
  {
    icon: "💰",
    title: "Family Income",
    color: "#059669",
    bg: "#ECFDF5",
    points: [
      "Annual family income must be below the scheme limit",
      "Most central schemes: below ₹2.5 lakh per year",
      "Some state schemes: below ₹1 lakh or ₹6 lakh per year",
      "Income certificate from government authority required",
    ],
  },
  {
    icon: "📊",
    title: "Academic Performance",
    color: "#D97706",
    bg: "#FFFBEB",
    points: [
      "Minimum 50% marks in previous year (varies by scheme)",
      "No detention/failure in last academic year",
      "Must be in qualifying year for that scheme",
    ],
  },
  {
    icon: "🏷️",
    title: "Category / Community",
    color: "#7C3AED",
    bg: "#F5F3FF",
    points: [
      "SC/ST students: special schemes with relaxed criteria",
      "OBC students: separate scheme with income limit",
      "Minority students: Pre-Matric and Post-Matric schemes",
      "General category: merit-cum-means scholarship",
    ],
  },
];

/* ── FAQ DATA ── */
export const SCHOLARSHIP_FAQ = [
  {
    q: "What is OTR and why is it needed?",
    a: "OTR stands for One Time Registration. It is a unique 14-digit number issued based on your Aadhaar. It is mandatory for applying for any scholarship on the National Scholarship Portal. You only register once — the same OTR is used throughout your academic career.",
    tag: "Registration",
  },
  {
    q: "Is OTR registration free?",
    a: "Yes! OTR registration is completely FREE. Do not pay any agent or person claiming to register you for a fee. The entire process is done online at scholarships.gov.in at no cost.",
    tag: "Registration",
  },
  {
    q: "What is the NSP OTR App and where to download it?",
    a: "The NSP OTR App is an official Android app used for Face Authentication during OTR registration. Download it from Google Play Store by searching 'NSP OTR'. You also need to install 'Aadhaar Face RD' app from Play Store for face authentication to work.",
    tag: "Registration",
  },
  {
    q: "What documents are needed to apply?",
    a: "You need: Aadhaar Card, previous year marksheet, bonafide certificate from school/college, income certificate, bank passbook (in student's name), passport-size photo, caste certificate (if SC/ST/OBC), and current year fee receipt.",
    tag: "Documents",
  },
  {
    q: "Can I apply without an Aadhaar card?",
    a: "If you don't have an Aadhaar card yet, you can use your Aadhaar Enrollment ID (EID). For minor students without Aadhaar, registration can be done using the Aadhaar of a parent or legal guardian.",
    tag: "Documents",
  },
  {
    q: "What is the last date to apply?",
    a: "The portal is currently open for Academic Year 2025-26. Typically the last date for fresh applications is October 31 every year and for renewal it is November 30. Always check the official website scholarships.gov.in for the exact current deadline.",
    tag: "Deadlines",
  },
  {
    q: "My institute is not approving my application. What to do?",
    a: "Personally visit your school or college office and tell them to login to the NSP portal and approve your application online. Without institute approval before the deadline, your scholarship will NOT be processed. Keep your Application ID ready when you visit.",
    tag: "Institute",
  },
  {
    q: "Can I edit my application after final submission?",
    a: "No. Editing is NOT allowed after final submission. This is clearly stated on the NSP portal. That is why it is very important to double-check every detail — especially your name, Aadhaar number, bank account number, and marks — before clicking Final Submit.",
    tag: "Application",
  },
  {
    q: "When will I receive the scholarship money?",
    a: "After your institute approves and the application is verified by the government department, money is transferred directly to your bank account via DBT (Direct Benefit Transfer). This usually takes 3-6 months after the application deadline. Check status on the NSP portal.",
    tag: "Payment",
  },
  {
    q: "I forgot my OTR number. How to recover it?",
    a: "Go to scholarships.gov.in → Click 'Know Your OTR' → Enter your Aadhaar number or registered mobile number. Your OTR number will be sent to your registered mobile number via SMS.",
    tag: "Registration",
  },
  {
    q: "What if my mobile number changed after OTR registration?",
    a: "Go to scholarships.gov.in → Click 'Change Mobile No.' option in the registration menu. You will need to verify with your Aadhaar OTP to update the mobile number.",
    tag: "Registration",
  },
  {
    q: "Can I apply for multiple scholarships?",
    a: "You can apply on NSP, but typically you cannot receive more than one scholarship at the same time. If found receiving duplicate scholarships, it may be cancelled. Apply for the scheme most suitable to your category and income level.",
    tag: "Application",
  },
];

/* ── OFFLINE CHATBOT RESPONSES ── */
/* Used when API fails — keyword matching */
export const OFFLINE_RESPONSES = [
  {
    keywords: ["otr", "one time registration", "what is otr"],
    answer: "OTR (One Time Registration) is a unique 14-digit number you get after registering on NSP. 📋\n\n• It is mandatory for all scholarship applications\n• It is FREE — no payment needed\n• You register only ONCE — used throughout your studies\n\n➡️ Get it at: scholarships.gov.in → Register",
  },
  {
    keywords: ["documents", "document", "what documents", "papers needed", "which documents"],
    answer: "Here are the documents you need: 📄\n\n• 🪪 Aadhaar Card\n• 🎓 Previous year marksheet\n• 📋 Bonafide certificate from school/college\n• 💰 Income certificate\n• 🏦 Bank passbook (in student's name)\n• 📷 Passport-size photo\n• (If SC/ST/OBC) Caste certificate\n\nAll documents should be clear scans/photos.",
  },
  {
    keywords: ["eligibility", "eligible", "who can apply", "qualify", "criteria"],
    answer: "Eligibility for NSP Scholarship: 🎓\n\n• Must be a regular full-time student\n• Family income below ₹2.5 lakh/year (varies by scheme)\n• Minimum 50% marks in previous exam\n• Valid Aadhaar card required\n• Active bank account in student's name\n\nCheck specific schemes at scholarships.gov.in for exact criteria.",
  },
  {
    keywords: ["last date", "deadline", "when", "date", "apply date", "closing date"],
    answer: "📅 Important Dates for AY 2025-26:\n\n• Fresh Applications: Usually by October 31\n• Renewal Applications: Usually by November 30\n• Institute Approval deadline: Usually December\n\n⚠️ Always check scholarships.gov.in for exact current dates as they may change.",
  },
  {
    keywords: ["register", "registration", "how to register", "sign up", "new user"],
    answer: "How to Register on NSP: 📋\n\n1. Go to scholarships.gov.in\n2. Click 'Register' button\n3. Enter your mobile number → Get OTP\n4. Complete Captcha verification\n5. Download NSP OTR App from Play Store\n6. Do Face Authentication\n7. Your OTR number will be generated! ✅\n\nIt is completely FREE!",
  },
  {
    keywords: ["login", "how to login", "sign in", "cannot login", "forgot"],
    answer: "How to Login to NSP: 🔑\n\n• Option 1 — Login with OTR:\n  Enter OTR number + Password\n\n• Option 2 — Login with Aadhaar:\n  Enter Aadhaar number → Get OTP → Enter OTP\n\n• Forgot Password?\n  Click 'Forgot Password' → Enter OTR + mobile number → Reset\n\n• Forgot OTR number?\n  Click 'Know Your OTR' on the homepage",
  },
  {
    keywords: ["money", "amount", "how much", "scholarship amount", "payment", "when get money"],
    answer: "About Scholarship Payment: 💰\n\n• Money is transferred directly to your bank account\n• It uses DBT (Direct Benefit Transfer)\n• Usually takes 3-6 months after deadline\n• Track status at scholarships.gov.in → Track Application\n\n⚠️ Make sure your bank account is in YOUR name and linked to Aadhaar.",
  },
  {
    keywords: ["institute", "school", "college", "approval", "not approving", "principal"],
    answer: "About Institute Approval: 🏫\n\n• After you submit, your school/college MUST approve your application online\n• Without institute approval = application REJECTED\n\nWhat to do:\n1. Visit your school/college office personally\n2. Tell them to login to NSP portal\n3. Ask them to approve your application before the deadline\n4. Give them your Application ID\n\n⏰ Do this IMMEDIATELY after submitting!",
  },
  {
    keywords: ["bank", "account", "bank account", "passbook", "ifsc"],
    answer: "Bank Account Requirements: 🏦\n\n• Account must be in the STUDENT's name (not parent's)\n• Must be a nationalized/government bank preferably\n• Account must be linked to Aadhaar\n• Keep passbook first page ready (shows account number + IFSC)\n\n⚠️ Joint accounts are NOT accepted for scholarship credit.",
  },
  {
    keywords: ["aadhaar", "aadhar", "no aadhaar", "without aadhaar", "enrollment id"],
    answer: "About Aadhaar for NSP: 🪪\n\n• Aadhaar is required for OTR registration\n• If you don't have Aadhaar: use your Enrollment ID (EID)\n• For minor students without Aadhaar: parent/guardian's Aadhaar can be used\n\nTo get Aadhaar:\n1. Visit nearest Aadhaar Seva Kendra\n2. It is FREE for first-time enrollment",
  },
  {
    keywords: ["status", "check status", "application status", "where is my"],
    answer: "How to Check Application Status: 🔍\n\n1. Go to scholarships.gov.in\n2. Click 'Track Application'\n3. Enter your Application ID\n4. You can see the current status\n\nStatus meanings:\n• Pending at Institute = Wait for school/college approval\n• Verified = ✅ Approved by department\n• Payment Initiated = 💰 Money is on the way!",
  },
  {
    keywords: ["edit", "change", "modify", "mistake", "wrong"],
    answer: "About Editing Application: ✏️\n\n⚠️ IMPORTANT: Final submission CANNOT be edited.\n\nBefore submitting:\n• Check name spelling exactly as in Aadhaar\n• Check bank account number carefully\n• Check marks and percentage\n\nIf you made a mistake before submitting:\n• Use the 'Save as Draft' option to review first\n• Do not click 'Final Submit' until everything is correct",
  },
  {
    keywords: ["app", "mobile app", "nsp app", "download app", "play store"],
    answer: "NSP OTR Mobile App: 📱\n\n• App name: 'NSP OTR'\n• Download from: Google Play Store\n• Also install: 'Aadhaar Face RD' from Play Store\n• Works on Android phones only\n\nUse case:\n• Needed for Face Authentication during OTR registration\n• After face authentication, your OTR number is generated",
  },
  // Default fallback
  {
    keywords: ["__default__"],
    answer: "I can help you with NSP Scholarship questions! 😊\n\nYou can ask me about:\n• 📋 OTR Registration process\n• 📄 Required documents\n• ✅ Eligibility criteria\n• 📅 Application deadlines\n• 🔑 Login problems\n• 💰 Payment & scholarship amount\n• 🏫 Institute approval\n• 📱 NSP OTR App\n\nWhat would you like to know?",
  },
];

/* ── OFFLINE CHAT FUNCTION ── */
export function getOfflineResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  for (const item of OFFLINE_RESPONSES) {
    if (item.keywords[0] === "__default__") continue;
    if (item.keywords.some(kw => msg.includes(kw))) {
      return item.answer;
    }
  }
  // return default
  return OFFLINE_RESPONSES[OFFLINE_RESPONSES.length - 1].answer;
}