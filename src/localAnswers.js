// ============================================================
//  Backup answers — used when the AI isn't available
//  (no key yet, daily free limit reached, or no internet).
//  Free, instant, built only from src/data.js.
// ============================================================
import { profile, projects, skills, services, certifications, contact } from "./data.js";

const isArabic = (t) => /[؀-ۿ]/.test(t);

const projectList = () =>
  projects
    .filter((p) => p.live || p.code)
    .map((p) => `• **${p.title}**: ${p.outcome}${p.live ? ` (${p.live})` : ""}`)
    .join("\n");

const INTENTS = [
  {
    keys: ["strong", "best", "project", "portfolio", "work", "built", "مشروع", "مشاريع", "أعمال", "اعمال", "شغلها", "أقوى", "اقوى"],
    en: () => `Her strongest web project is **Ridgeline**, an 8-page React + TypeScript dashboard with live APIs, maps and Arabic/English support. Some of her work:\n${projectList()}`,
    ar: () => `أقوى مشروع ويب عندها **Ridgeline**: داشبورد من ٨ صفحات بـ React وTypeScript، فيه APIs حقيقية وخرايط ودعم عربي وإنجليزي. من أعمالها:\n${projectList()}`,
  },
  {
    keys: ["available", "freelance", "hire", "remote", "job", "متاح", "فريلانس", "توظيف", "توظف", "شغل", "تشتغل", "عن بعد"],
    en: () => `Yes, she's ${contact.availability.toLowerCase()} and ${contact.reply}. Use the contact form on this page or email ${profile.email}.`,
    ar: () => `أيوا، ملك متاحة لشغل الفريلانس والعمل عن بعد، وبترد عادة خلال ٢٤ ساعة. تواصل معها من الفورم بهالصفحة أو على ${profile.email}`,
  },
  {
    keys: ["price", "cost", "rate", "budget", "how much", "سعر", "أسعار", "اسعار", "تكلفة", "بكم", "قديش"],
    en: () => `Prices depend on the project. Email ${profile.email} with what you need and she'll reply with a quote.`,
    ar: () => `السعر بيعتمد على المشروع. ابعتلها على ${profile.email} شو بدك، وبترد عليك بعرض سعر.`,
  },
  {
    keys: ["service", "build", "make", "website", "landing", "store", "shop", "dashboard", "خدمات", "موقع", "مواقع", "تعملي", "تعمل", "متجر", "صفحة", "داشبورد"],
    en: () => `She builds:\n${services.map((s) => `• ${s}`).join("\n")}\nEmail ${profile.email} to start.`,
    ar: () => `ملك بتعمل:\n• صفحات هبوط ومواقع شركات\n• متاجر أونلاين\n• داشبوردات وتطبيقات ويب بـ React وTypeScript\n• تحويل تصاميم Figma لمواقع متجاوبة\n• مواقع بالعربي والإنجليزي\n• إضافة شات بوت ذكي للمواقع\nللبدء: ${profile.email}`,
  },
  {
    keys: ["tech", "stack", "skill", "react", "typescript", "language", "tools", "تقنيات", "مهارات", "بتعرف", "لغات", "ادوات", "أدوات"],
    en: () => `Her main stack: ${skills[0].tools.slice(0, 8).join(", ")}. She also works with ${skills[1].tools.slice(0, 2).join(" and ")}, and Python for AI.`,
    ar: () => `أدواتها الأساسية: ${skills[0].tools.slice(0, 8).join("، ")}. وكمان Flutter للموبايل، وPython للذكاء الاصطناعي.`,
  },
  {
    keys: ["contact", "email", "reach", "message", "تواصل", "ايميل", "إيميل", "رقم", "أكلمها", "اكلمها", "احكي"],
    en: () => `Email her at ${profile.email} or use the contact form at the bottom of this page.`,
    ar: () => `تقدر تتواصل معها على ${profile.email} أو من فورم التواصل تحت بالصفحة.`,
  },
  {
    keys: ["certif", "course", "شهاد", "كورس", "دورة", "دورات"],
    en: () => `Certifications:\n${certifications.map((c) => `• ${c}`).join("\n")}`,
    ar: () => `شهاداتها:\n${certifications.map((c) => `• ${c}`).join("\n")}`,
  },
  {
    keys: ["experience", "flutter", "playvo", "team", "codemap", "خبرة", "خبرات", "فريق", "تدريب"],
    en: () => "She was a Flutter developer in the CodeMap 2026 program by TAQAT (144 hours), building Playvo, a pitch-booking app, in an 8-person team.",
    ar: () => "اشتغلت Flutter Developer ببرنامج CodeMap 2026 مع TAQAT (١٤٤ ساعة)، وبنت مع فريق من ٨ أشخاص تطبيق Playvo لحجز الملاعب.",
  },
  {
    keys: ["study", "education", "university", "gpa", "degree", "جامعة", "تدرس", "دراسة", "معدل", "تخرج"],
    en: () => "She studies Computer & Intelligent Systems Engineering at Al-Aqsa University (GPA 91.31%), graduating in 2027.",
    ar: () => "بتدرس هندسة الحاسوب والأنظمة الذكية بجامعة الأقصى، معدلها 91.31%، وبتتخرج سنة 2027.",
  },
  {
    keys: ["ai", "machine learning", "chatbot", "ذكاء", "شات بوت", "تعلم الآلة"],
    en: () => "She built a CNN for network intrusion detection (83% accuracy, 89% attack precision) and can add AI chatbots like this one to websites.",
    ar: () => "عملت موديل CNN لكشف الهجمات على الشبكات بدقة 83%، وبتقدر تضيف شات بوت ذكي للمواقع زي هاد.",
  },
  {
    keys: ["hi", "hello", "hey", "مرحب", "اهلا", "أهلا", "السلام", "هاي"],
    en: () => "Hi! Ask me about Malak's projects, skills, or how to work with her.",
    ar: () => "أهلاً! اسألني عن مشاريع ملك أو مهاراتها أو كيف تشتغل معها.",
  },
];

// short Latin keys ("hi", "ai") must be whole words, so "this" or "email" don't match
const hit = (q, k) => (/^[a-z ]{1,3}$/.test(k) ? new RegExp(`\\b${k}\\b`).test(q) : q.includes(k));

export function localAnswer(question) {
  const q = question.toLowerCase();
  const ar = isArabic(question);
  let best = null, bestScore = 0;
  for (const intent of INTENTS) {
    const score = intent.keys.reduce((n, k) => n + (hit(q, k) ? k.length : 0), 0);
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  if (best) return ar ? best.ar() : best.en();
  return ar
    ? `بقدر أجاوبك عن مشاريع ملك، ومهاراتها، والخدمات اللي بتقدمها، وكيف تتواصل معها. ولأي سؤال تاني ابعتلها على ${profile.email}`
    : `I can tell you about Malak's projects, skills, services and availability. For anything else, email ${profile.email}.`;
}
