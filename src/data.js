// ============================================================
//  كل محتوى الموقع هون — عدّلي هالملف بس
// ============================================================

export const profile = {
  name: "Malak Nashwan",
  initial: "M",
  role: "Frontend & Mobile Developer",
  subtitle: "I build fast, responsive React apps, Flutter mobile apps and AI-powered tools.",
  available: true, // false لإخفاء "Available for work"
  email: "malaknashwan01@gmail.com",
  cvUrl: "", // ← لما يجهز الـ CV: حطيه بـ public/cv.pdf واكتبي هون "/cv.pdf"
  location: "Gaza, Palestine",
};

// السطرين المتحركين
export const marquee = {
  ghost: "Code Create Launch",
  solid: "Frontend Mobile AI",
};

export const tag = "Frontend Developer · 2026";

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export const about = {
  title: "Hi, I'm Malak.",
  paragraphs: [
    "I'm a Computer & Intelligent Systems Engineering student at Al-Aqsa University and a frontend developer. I build responsive, clean websites and enjoy getting the small details right — layout, spacing and how things feel on every screen.",
    "Alongside the web, I work on mobile interfaces and AI: from data analysis and machine-learning projects in Python to chatbots that help users get answers faster.",
  ],
  facts: [
    { label: "Studying", value: "Computer & Intelligent Systems Eng." },
    { label: "GPA", value: "91.03% · graduating 2027" },
    { label: "University", value: "Al-Aqsa University" },
    { label: "Based in", value: "Gaza, Palestine" },
    { label: "Languages", value: "Arabic · English" },
  ],
};

// عنوان قسم الأعمال
export const workIntro = {
  title: ["Projects I've designed,", "built and shipped"],
  lead: "From responsive websites to mobile apps and AI chatbots — here are a few things I've worked on recently.",
  button: "Let's work together",
  moreUrl: "", // مثلاً رابط GitHub تبعك، أو فاضي يوديهم على التواصل
};

// ← مشاريعك (الأفضل ٣ أو ٦ عشان الشبكة تطلع مرتبة)
//   icon: "web" | "mobile" | "ai" | "security" | "data"
//   image: حطي سكرين شوت بـ public/work/ واكتبي "/work/name.png" (نسبة 3:2)
//   stats: كلمتين قصار (٦ أحرف تقريباً) عشان يطلعوا حلوين بالخط الكبير
export const projects = [
  {
    title: "Playvo",
    outcome: "Football-pitch booking app for Gaza",
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
    title: "Ridgeline",
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
    outcome: "Full-stack beauty store · React + Express",
    icon: "shop",
    stats: [
      { value: "Full", label: "stack · React + Node" },
      { value: "JWT", label: "secure auth" },
    ],
    image: "/work/angelstore.jpg",
    live: "https://angelstore-malak.netlify.app",
    code: "",
  },
  {
    title: "AI Intrusion Detection",
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
    title: "Backend",
    text: "Secure REST APIs with validation and authentication.",
    tools: ["Node.js", "Express", "REST APIs", "Zod", "JWT auth", "bcrypt", "Helmet"],
  },
  {
    title: "Mobile & UI",
    text: "Cross-platform mobile apps in Flutter, built from Figma designs.",
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
  availability: "Open to full-time & freelance",
  reply: "usually replies within 24h",
};

// ← روابطك. اللي بتضل فاضية ما بتبين
export const socials = [
  { label: "GitHub", url: "https://github.com/malaknashwan01-del" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/malak-nashwan-29596a343" },
  { label: "Behance", url: "" },
  { label: "Instagram", url: "" },
];
