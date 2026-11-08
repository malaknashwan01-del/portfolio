// ============================================================
//  كل محتوى الموقع هون — عدّلي هالملف بس
// ============================================================

export const profile = {
  name: "Malak Nashwan",
  initial: "M",
  role: "Frontend Web Developer",
  subtitle: "I build fast, responsive websites and web apps with React and TypeScript.",
  available: true, // false لإخفاء "Available for work"
  email: "malaknashwan01@gmail.com",
  cvUrl: "/cv.pdf", // ملف الـ CV موجود بـ public/cv.pdf — استبدليه بنفس الاسم لما تحدّثيه
  location: "Gaza, Palestine",
};

// السطرين المتحركين
export const marquee = {
  ghost: "Design Code Launch",
  solid: "React TypeScript Web",
};

export const tag = "Web Developer · 2026";

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export const about = {
  title: "Hi, I'm Malak.",
  paragraphs: [
    "I'm a frontend web developer and a Computer & Intelligent Systems Engineering student at Al-Aqsa University. I build responsive websites and web apps with React and TypeScript, and I care about the small details — layout, spacing, motion and how things feel on every screen.",
    "I take on freelance and remote projects: landing pages, online stores, dashboards and full websites, from Figma design to a live link. I also work with AI, from machine-learning projects in Python to chatbots like the one on this site.",
  ],
  facts: [
    { label: "Studying", value: "Computer & Intelligent Systems Eng." },
    { label: "GPA", value: "91.31% · graduating 2027" },
    { label: "University", value: "Al-Aqsa University" },
    { label: "Based in", value: "Gaza, Palestine" },
    { label: "Languages", value: "Arabic · English" },
  ],
};

// عنوان قسم الأعمال
export const workIntro = {
  title: ["Projects I've designed,", "built and shipped"],
  lead: "Websites and web apps I've designed, built and deployed — from dashboards to online stores.",
  button: "Let's work together",
  moreUrl: "", // مثلاً رابط GitHub تبعك، أو فاضي يوديهم على التواصل
};

// ← مشاريعك (الأفضل ٣ أو ٦ عشان الشبكة تطلع مرتبة)
//   icon: "web" | "mobile" | "ai" | "security" | "data"
//   image: سكرين شوت بـ public/work/ (نسبة 16:10، يعني مثلاً 1600×1000)
//   stats: كلمتين قصار (٦ أحرف تقريباً) عشان يطلعوا حلوين بالخط الكبير
export const projects = [
  {
    title: "Pearl Dental",
    type: "Full website · Booking system",
    summary: "Bilingual Arabic/English clinic website with 4-step online booking, a 3D scroll-animated tooth and a staff dashboard.",
    tags: ["Next.js 16", "TypeScript", "Tailwind", "three.js", "PostgreSQL"],
    outcome: "Dental clinic website & booking system",
    icon: "web",
    stats: [],
    image: "/work/pearl.jpg",
    live: "https://pearl-dental-clinic-gray.vercel.app",
    code: "https://github.com/malaknashwan01-del/pearl-dental",
  },
  {
    title: "Ridgeline",
    type: "Web app",
    summary: "8-page hiking dashboard with live weather APIs, interactive maps and full Arabic/English support.",
    tags: ["React", "TypeScript", "Recharts", "Leaflet", "RTL"],
    outcome: "Hiking dashboard · React + TypeScript",
    icon: "map",
    stats: [
      { value: "8", label: "responsive pages" },
      { value: "AR/EN", label: "RTL · dark mode" },
    ],
    image: "/work/ridgeline.jpg",
    live: "https://ridgeline-malak.vercel.app",
    code: "https://github.com/malaknashwan01-del/ridgeline",
  },
  {
    title: "AngelStore",
    type: "E-commerce",
    summary: "Beauty store frontend with a skin-type quiz, virtual shade try-on, wishlist and cart.",
    tags: ["React 19", "TypeScript", "Tailwind", "TanStack Query", "Zustand"],
    outcome: "Beauty e-commerce · React 19 + TypeScript",
    icon: "shop",
    stats: [
      { value: "Quiz", label: "skin-type finder" },
      { value: "Try-on", label: "virtual shades" },
    ],
    image: "/work/angelstore.jpg",
    live: "https://angelstore-malak.netlify.app",
    code: "",
  },
  {
    title: "Playvo",
    type: "Mobile app · Team",
    summary: "Pitch-booking app for football players in Gaza, built in an 8-person team during CodeMap 2026.",
    tags: ["Flutter", "Figma", "Team of 8"],
    outcome: "Pitch booking app · CodeMap 2026, TAQAT",
    icon: "mobile",
    stats: [
      { value: "Flutter", label: "my role · mobile app" },
      { value: "8", label: "person team" },
    ],
    image: "/work/playvo.jpg",
    live: "",
    code: "",
  },
  {
    title: "AI Intrusion Detection",
    type: "Machine learning",
    summary: "CNN that detects network attacks: 83% accuracy and 89% precision on attacks.",
    tags: ["Python", "TensorFlow", "CNN"],
    outcome: "CNN model for network attack detection",
    icon: "security",
    stats: [
      { value: "83%", label: "test accuracy" },
      { value: "89%", label: "attack precision" },
    ],
    image: "/work/ids.jpg",
    live: "",
    code: "https://github.com/malaknashwan01-del",
  },
];

// ← عدّلي الأدوات حسب اللي بتستخدميه فعلاً
export const skills = [
  {
    title: "Frontend",
    text: "Responsive, accessible React apps with clean UI and smooth interactions.",
    tools: ["React 19", "TypeScript", "JavaScript ES6+", "Vite", "React Router", "Tailwind CSS", "TanStack Query", "Zustand", "HTML5", "CSS3", "Bootstrap", "REST APIs", "Recharts", "Leaflet", "i18n · RTL", "Git & GitHub"],
  },
  {
    title: "UI & Mobile",
    text: "Pixel-accurate interfaces from Figma, plus Flutter mobile apps.",
    tools: ["Flutter", "Dart", "Mobile-first", "UI/UX principles", "Figma", "Canva"],
  },
  {
    title: "AI & Data",
    text: "Data analysis, machine learning and AI chatbots with Python.",
    tools: ["Python", "TensorFlow · Keras", "scikit-learn", "CNNs", "Pandas", "NumPy", "Matplotlib", "Chatbots", "Jupyter · Colab"],
  },
];

// قسم التواصل
export const contact = {
  availability: "Open to freelance & remote work",
  reply: "usually replies within 24h",
};

// ← روابطك. اللي بتضل فاضية ما بتبين
export const socials = [
  { label: "GitHub", url: "https://github.com/malaknashwan01-del" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/malak-nashwan-29596a343" },
  { label: "Behance", url: "" },
  { label: "Instagram", url: "" },
];

// ============================================================
//  الشات بوت — معلومات إضافية بيستخدمها المساعد بس (ما بتطلع بالصفحة)
// ============================================================
export const assistant = {
  name: "Malak's assistant",
  greeting: "Hi! I'm Malak's AI assistant. Ask me about her projects, skills or how to hire her.",
  greetingAr: "أهلاً! أنا مساعد ملك. اسألني عن مشاريعها أو مهاراتها أو كيف تتواصل معها.",
  suggestions: [
    "What's her strongest project?",
    "Is she available for freelance?",
    "What tech does she use?",
    "شو بتقدر تعملي موقع؟",
  ],
};

export const services = [
  "Landing pages and business websites",
  "Online stores (e-commerce frontends)",
  "Dashboards and web apps in React + TypeScript",
  "Turning Figma designs into responsive, accessible websites",
  "Arabic/English (RTL) websites",
  "Adding AI chatbots to websites",
];

export const experience = [
  "Flutter Developer, CodeMap 2026 training program by TAQAT (144 hours, completed Nov 2026): built Playvo, a football-pitch booking app for Gaza, in an 8-person team; implemented sign-up/login and the booking flow from Figma designs; worked with backend, React and UX/UI teammates using Git and GitHub.",
];

export const certifications = [
  "CodeMap 2026 — TAQAT (144 hours), Nov 2026",
  "Claude with the Anthropic API — Anthropic, Aug 2026",
  "AI Fluency: Framework & Foundations — TAQAT, Aug 2026",
  "Claude Code 101 — TAQAT, Aug 2026",
  "Front-End Development Course, 2025",
];

export const projectDetails = {
  "Pearl Dental": "Portfolio project for a fictional dental clinic. Arabic-first (RTL) with English. Editorial hero, 3D pearl tooth in three.js generated in code that flies between sections on scroll, live open/closed badge in the clinic time zone, treatments with prices, doctors carousel with next free slot, 4-step booking (treatment, dentist, time, details) with reference and .ics calendar file, manage/cancel booking up to 12h before, password-protected staff schedule. Double bookings prevented at the database level; all times in Asia/Gaza. Tech: Next.js 16, React 19, TypeScript, Tailwind v4, three.js, PostgreSQL (Neon), Drizzle, Zod, Vitest, Vercel.",
  Ridgeline: "8-page hiking dashboard (auth, analytics, interactive maps, trip planner, activity log) with protected, code-split routes; live APIs (Open-Meteo weather and geocoding, OpenStreetMap) with loading/error states and map-provider fallback; full Arabic/English with RTL, dark mode, metric/imperial units, accessible components; elevation chart synced with the route map. Tech: React, TypeScript, Vite, React Router, Recharts, Leaflet.",
  AngelStore: "Beauty e-commerce frontend: product catalog, wishlist with optimistic updates, shopping bag persisted in localStorage, admin view, skin-type quiz with product recommendations, virtual shade try-on, shop filters saved in the URL. Tech: React 19, TypeScript, Tailwind CSS v4, TanStack Query, Zustand, React Router.",
  Playvo: "Football-pitch booking app for players in Gaza plus a dashboard for pitch owners, built in an 8-person team during CodeMap 2026. Malak worked on the Flutter app: sign-up/login and the booking flow (search, map, booking, payment proof, confirmation). A survey of 14 players found 93% would use it.",
  "AI Intrusion Detection": "CNN that classifies network traffic as normal or malicious; 83% accuracy on a 1,908-sample test set and 89% precision on attack predictions; training/validation curves over 10 epochs showed no overfitting. Tech: Python, TensorFlow/Keras, scikit-learn.",
};
