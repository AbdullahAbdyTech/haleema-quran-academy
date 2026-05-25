const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const root = document.documentElement;
const year = document.querySelector("#year");
const form = document.querySelector("#enroll-form");
const emailButton = document.querySelector("#email-submit");
const themeToggle = document.querySelector("#theme-toggle");
const languageToggle = document.querySelector("#language-toggle");
const statusMessage = document.querySelector("#form-status");
const contactEmail = document.body.dataset.contactEmail || "haleemaquranacademy@gmail.com";
const themeMeta = document.querySelector('meta[name="theme-color"]');
const storedTextNodes = new Map();
const storedAttributes = new Map();
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return undefined;
    }
  },
};

const translations = {
  "Skip to content": "مواد پر جائیں",
  WhatsApp: "واٹس ایپ",
  Courses: "کورسز",
  Method: "طریقہ کار",
  Countries: "ممالک",
  Plans: "پلانز",
  FAQ: "سوالات",
  Contact: "رابطہ",
  "Free Trial": "مفت ٹرائل",
  "Free trial class available worldwide": "دنیا بھر کے لیے مفت ٹرائل کلاس دستیاب ہے",
  "WhatsApp and email enrollment open now": "واٹس ایپ اور ای میل کے ذریعے داخلہ جاری ہے",
  "Flexible timings for USA, UK, Canada, Pakistan, Middle East, Europe, and Australia":
    "امریکہ، برطانیہ، کینیڈا، پاکستان، مشرق وسطی، یورپ اور آسٹریلیا کے لیے مناسب اوقات",
  "One-to-one Quran classes for kids and adults": "بچوں اور بڑوں کے لیے ون ٹو ون قرآن کلاسز",
  "Worldwide online Quran classes for kids and adults": "بچوں اور بڑوں کے لیے دنیا بھر میں آن لائن قرآن کلاسز",
  "Learn Quran with calm, qualified teachers from anywhere.": "کہیں سے بھی پرسکون اور اہل اساتذہ کے ساتھ قرآن سیکھیں۔",
  "One-to-one Quran learning with Tajweed, Nazra, memorization support, and parent-friendly progress updates. Built for Muslim families across Pakistan, USA, UK, Canada, Europe, the Middle East, and Australia.":
    "تجوید، ناظرہ، حفظ سپورٹ اور والدین کے لیے آسان پیش رفت اپ ڈیٹس کے ساتھ ون ٹو ون قرآن لرننگ۔ پاکستان، امریکہ، برطانیہ، کینیڈا، یورپ، مشرق وسطی اور آسٹریلیا کی مسلم فیملیز کے لیے تیار۔",
  "Book Free Trial": "مفت ٹرائل بک کریں",
  "View Courses": "کورسز دیکھیں",
  "Live classes": "لائیو کلاسز",
  Global: "عالمی",
  "Time zones": "ٹائم زونز",
  Kids: "بچے",
  "Parent updates": "والدین کو اپ ڈیٹس",
  "Verified teaching process": "منظم تدریسی عمل",
  "Tajweed-first curriculum": "تجوید پر مبنی نصاب",
  "Weekly parent feedback": "ہفتہ وار والدین فیڈبیک",
  "Structured paths for every learner.": "ہر طالب علم کے لیے منظم لرننگ راستہ۔",
  "Start from Qaida, improve fluent recitation, or build a long-term memorization routine with a teacher who keeps the pace realistic.":
    "قاعدہ سے شروع کریں، روانی بہتر بنائیں، یا ایسے استاد کے ساتھ حفظ کا مستقل معمول بنائیں جو رفتار کو حقیقت پسندانہ رکھے۔",
  "Noorani Qaida": "نورانی قاعدہ",
  "Arabic letters, Makharij, joining rules, and correct pronunciation for beginners.":
    "ابتدائی طلبہ کے لیے عربی حروف، مخارج، جوڑنے کے اصول اور درست تلفظ۔",
  "Best for children and new learners": "بچوں اور نئے سیکھنے والوں کے لیے بہترین",
  "Quran with Tajweed": "تجوید کے ساتھ قرآن",
  "Fluency, rules of recitation, correction, and confidence with daily reading.":
    "روانی، تلاوت کے قواعد، اصلاح اور روزانہ پڑھنے کا اعتماد۔",
  "Best for students who can read": "ان طلبہ کے لیے بہترین جو پڑھ سکتے ہیں",
  "Hifz Support": "حفظ سپورٹ",
  "Memorization, revision tracking, lesson targets, and consistency coaching.":
    "حفظ، دہرائی کی نگرانی، سبق کے اہداف اور مستقل مزاجی کی رہنمائی۔",
  "Best for dedicated memorization": "حفظ کے سنجیدہ طلبہ کے لیے بہترین",
  "Islamic Studies": "اسلامی تعلیمات",
  "Duas, basic beliefs, manners, short surahs, and age-appropriate Islamic learning.":
    "دعائیں، بنیادی عقائد، آداب، مختصر سورتیں اور عمر کے مطابق اسلامی تعلیم۔",
  "Best as an add-on course": "اضافی کورس کے طور پر بہترین",
  "A calm routine parents can trust.": "ایک پرسکون معمول جس پر والدین اعتماد کر سکیں۔",
  "The academy experience is designed around consistency: clear goals, live correction, short practice, and simple follow-up after every week.":
    "اکیڈمی کا طریقہ مستقل مزاجی پر مبنی ہے: واضح اہداف، لائیو اصلاح، مختصر پریکٹس اور ہر ہفتے آسان فالو اپ۔",
  "Start with a trial assessment": "ٹرائل اسیسمنٹ سے شروع کریں",
  "Short assessment": "مختصر جائزہ",
  "We check reading level, Tajweed gaps, age, and comfortable class timing.":
    "ہم پڑھنے کی سطح، تجوید کی کمزوریاں، عمر اور مناسب کلاس ٹائمنگ دیکھتے ہیں۔",
  "Personal plan": "ذاتی پلان",
  "The teacher sets lesson length, weekly frequency, and a clear first-month target.":
    "استاد سبق کا دورانیہ، ہفتہ وار کلاسز اور پہلے مہینے کا واضح ہدف مقرر کرتا ہے۔",
  "Live correction": "لائیو اصلاح",
  "Every class focuses on listening, correction, repetition, and confidence.":
    "ہر کلاس سننے، اصلاح، دہرائی اور اعتماد پر توجہ دیتی ہے۔",
  "Progress updates": "پیش رفت اپ ڈیٹس",
  "Parents receive practical feedback so home practice stays simple and consistent.":
    "والدین کو عملی فیڈبیک ملتا ہے تاکہ گھر کی پریکٹس آسان اور مستقل رہے۔",
  "For families": "فیملیز کے لیے",
  "Premium learning for families across the world.": "دنیا بھر کی فیملیز کے لیے پریمیم قرآن لرننگ۔",
  "Flexible timings for Pakistan, India, Bangladesh, UK, USA, Canada, Middle East, Europe, and Australia.":
    "پاکستان، بھارت، بنگلہ دیش، برطانیہ، امریکہ، کینیڈا، مشرق وسطی، یورپ اور آسٹریلیا کے لیے مناسب اوقات۔",
  "Separate learning paths for children, adults, beginners, and advanced readers.":
    "بچوں، بڑوں، ابتدائی طلبہ اور بہتر پڑھنے والوں کے لیے الگ لرننگ راستے۔",
  "Simple WhatsApp enrollment now, with payment integration possible later.":
    "ابھی آسان واٹس ایپ داخلہ، بعد میں پیمنٹ انٹیگریشن بھی ممکن ہے۔",
  "Worldwide classes": "دنیا بھر کی کلاسز",
  "Online Quran learning for major countries and time zones.": "بڑے ممالک اور ٹائم زونز کے لیے آن لائن قرآن لرننگ۔",
  "Haleema Quran Academy is ready for international families. Classes can be scheduled around school, work, and prayer routines in different regions.":
    "حلیمہ قرآن اکیڈمی بین الاقوامی فیملیز کے لیے تیار ہے۔ کلاسز مختلف علاقوں میں اسکول، کام اور نماز کے معمول کے مطابق رکھی جا سکتی ہیں۔",
  Pakistan: "پاکستان",
  India: "بھارت",
  Bangladesh: "بنگلہ دیش",
  "United States": "امریکہ",
  "United Kingdom": "برطانیہ",
  Canada: "کینیڈا",
  Australia: "آسٹریلیا",
  "United Arab Emirates": "متحدہ عرب امارات",
  "Saudi Arabia": "سعودی عرب",
  Qatar: "قطر",
  Kuwait: "کویت",
  Oman: "عمان",
  Germany: "جرمنی",
  France: "فرانس",
  Netherlands: "نیدرلینڈز",
  Asia: "ایشیا",
  "Morning, afternoon, and evening slots for South Asia and Gulf families.":
    "جنوبی ایشیا اور گلف فیملیز کے لیے صبح، دوپہر اور شام کے اوقات۔",
  Europe: "یورپ",
  "After-school and evening class options for UK and European students.":
    "برطانیہ اور یورپی طلبہ کے لیے اسکول کے بعد اور شام کی کلاسز۔",
  "North America": "شمالی امریکہ",
  "Flexible scheduling for USA and Canada across major time zones.":
    "امریکہ اور کینیڈا کے بڑے ٹائم زونز کے لیے مناسب شیڈولنگ۔",
  "Choose the rhythm that fits your home.": "وہ معمول منتخب کریں جو آپ کے گھر کے لیے مناسب ہو۔",
  "Fees can be finalized after your trial class. These packages are ready for your real pricing whenever you want to add it.":
    "فیس ٹرائل کلاس کے بعد فائنل ہو سکتی ہے۔ جب آپ چاہیں تو یہاں اصل قیمتیں شامل کی جا سکتی ہیں۔",
  Starter: "اسٹارٹر",
  "2 days per week": "ہفتے میں 2 دن",
  "For beginners who need a gentle start with reading basics and steady practice.":
    "ان ابتدائی طلبہ کے لیے جو پڑھنے کی بنیاد اور مستقل پریکٹس کے ساتھ آرام سے شروع کرنا چاہتے ہیں۔",
  "One-to-one live class": "ون ٹو ون لائیو کلاس",
  "Qaida or Nazra focus": "قاعدہ یا ناظرہ پر توجہ",
  "Monthly progress check": "ماہانہ پیش رفت چیک",
  "Ask for fee": "فیس معلوم کریں",
  "Most popular": "سب سے مقبول",
  "3 days per week": "ہفتے میں 3 دن",
  "For families who want visible progress with a balanced class routine.":
    "ان فیملیز کے لیے جو متوازن کلاس معمول کے ساتھ واضح پیش رفت چاہتی ہیں۔",
  "Tajweed correction": "تجوید کی اصلاح",
  "Homework and revision": "ہوم ورک اور دہرائی",
  "Weekly parent feedback": "ہفتہ وار والدین فیڈبیک",
  "Book trial": "ٹرائل بک کریں",
  Intensive: "انٹینسو",
  "5 days per week": "ہفتے میں 5 دن",
  "For Hifz support, fast improvement, or students who need disciplined revision.":
    "حفظ سپورٹ، تیز بہتری یا منظم دہرائی کی ضرورت رکھنے والے طلبہ کے لیے۔",
  "Memorization tracking": "حفظ کی نگرانی",
  "Daily revision targets": "روزانہ دہرائی کے اہداف",
  "Teacher-led correction": "استاد کی رہنمائی میں اصلاح",
  "Parent confidence": "والدین کا اعتماد",
  "Designed to feel organized from the first call.": "پہلی کال سے ہی منظم محسوس ہونے کے لیے بنایا گیا۔",
  "The lessons are calm and punctual. My child now reads with better pronunciation and waits for class.":
    "اسباق پرسکون اور وقت پر ہوتے ہیں۔ میرا بچہ اب بہتر تلفظ سے پڑھتا ہے اور کلاس کا انتظار کرتا ہے۔",
  "Parent of beginner student": "ابتدائی طالب علم کے والدین",
  "The teacher identified my Tajweed mistakes quickly and gave me practice that was easy to follow.":
    "استاد نے میری تجوید کی غلطیاں جلد پہچان لیں اور آسان پریکٹس دی۔",
  "Adult recitation student": "بالغ تلاوت طالب علم",
  "Questions before joining.": "داخلے سے پہلے سوالات۔",
  "These answers are written for the first public version. You can edit them as your academy policy grows.":
    "یہ جوابات پہلے پبلک ورژن کے لیے لکھے گئے ہیں۔ اکیڈمی پالیسی بڑھنے کے ساتھ آپ انہیں بدل سکتے ہیں۔",
  "Do you offer a free trial class?": "کیا آپ مفت ٹرائل کلاس دیتے ہیں؟",
  "Yes. The first trial helps assess the student's reading level, class timing, and course fit.":
    "جی ہاں۔ پہلا ٹرائل طالب علم کی پڑھنے کی سطح، کلاس ٹائمنگ اور کورس فٹ سمجھنے میں مدد دیتا ہے۔",
  "Are classes one-to-one?": "کیا کلاسز ون ٹو ون ہیں؟",
  "Yes. The current website is written for private one-to-one online classes.":
    "جی ہاں۔ یہ ویب سائٹ پرائیویٹ ون ٹو ون آن لائن کلاسز کے لیے لکھی گئی ہے۔",
  "Can children and adults both join?": "کیا بچے اور بڑے دونوں شامل ہو سکتے ہیں؟",
  "Yes. Courses are available for children, adults, beginners, and students who already read Quran.":
    "جی ہاں۔ کورسز بچوں، بڑوں، ابتدائی طلبہ اور پہلے سے قرآن پڑھنے والے طلبہ کے لیے دستیاب ہیں۔",
  "How do parents receive progress updates?": "والدین کو پیش رفت کیسے بتائی جاتی ہے؟",
  "Progress can be shared through WhatsApp after weekly lessons or as agreed with the teacher.":
    "پیش رفت ہفتہ وار اسباق کے بعد واٹس ایپ پر یا استاد کے ساتھ طے شدہ طریقے سے شیئر کی جا سکتی ہے۔",
  Enroll: "داخلہ",
  "Book a free trial class.": "مفت ٹرائل کلاس بک کریں۔",
  "Choose WhatsApp for the fastest reply, or send the same trial request by email if you prefer.":
    "فوری جواب کے لیے واٹس ایپ منتخب کریں، یا چاہیں تو وہی ٹرائل درخواست ای میل سے بھیجیں۔",
  Email: "ای میل",
  "Student name": "طالب علم کا نام",
  "Age group": "عمر کا گروپ",
  "Select age group": "عمر کا گروپ منتخب کریں",
  "Child under 7": "7 سال سے کم بچہ",
  "Child 7-12": "7 سے 12 سال کا بچہ",
  Teenager: "ٹین ایجر",
  Adult: "بالغ",
  Course: "کورس",
  "Select course": "کورس منتخب کریں",
  "Preferred timing": "پسندیدہ وقت",
  "WhatsApp number": "واٹس ایپ نمبر",
  Message: "پیغام",
  "Send on WhatsApp": "واٹس ایپ پر بھیجیں",
  "Send by Email": "ای میل سے بھیجیں",
  "Premium online Quran learning with a simple, respectful, family-first experience.":
    "سادہ، باوقار اور فیملی فرسٹ تجربے کے ساتھ پریمیم آن لائن قرآن لرننگ۔",
  Phone: "فون",
  "Haleema Quran Academy": "حلیمہ قرآن اکیڈمی",
  Haleema: "حلیمہ",
  "Quran Academy": "قرآن اکیڈمی",
  "Hero photo from Pexels, replaceable with your own academy image.":
    "ہیرو تصویر Pexels سے ہے، اسے اپنی اکیڈمی کی تصویر سے بدلا جا سکتا ہے۔",
};

const placeholderTranslations = {
  "Student name": "طالب علم کا نام",
  "Example: after Maghrib, UK evening": "مثال: مغرب کے بعد، UK شام",
  "+92...": "+92...",
  "Tell us the student's current level": "طالب علم کی موجودہ سطح بتائیں",
};

const attributeTranslations = {
  "Open menu": "مینو کھولیں",
  "Close menu": "مینو بند کریں",
  "Primary navigation": "بنیادی نیویگیشن",
  "Display settings": "ڈسپلے سیٹنگز",
  "Read website in Urdu": "ویب سائٹ اردو میں پڑھیں",
  "Read website in English": "ویب سائٹ انگریزی میں پڑھیں",
  "Switch to dark theme": "ڈارک تھیم کریں",
  "Switch to light theme": "لائٹ تھیم کریں",
  "Chat with Haleema Quran Academy on WhatsApp": "حلیمہ قرآن اکیڈمی سے واٹس ایپ پر رابطہ کریں",
  "Special announcement": "خاص اعلان",
  "Haleema Quran Academy": "حلیمہ قرآن اکیڈمی",
  "Haleema Quran Academy home": "حلیمہ قرآن اکیڈمی ہوم",
  "Academy highlights": "اکیڈمی ہائی لائٹس",
  "Primary actions": "بنیادی ایکشنز",
  "Teaching commitments": "تدریسی وعدے",
  "Countries served": "سروس والے ممالک",
};

const metaTranslations = {
  title: {
    en: "Online Quran Classes Worldwide | Haleema Quran Academy",
    ur: "دنیا بھر میں آن لائن قرآن کلاسز | حلیمہ قرآن اکیڈمی",
  },
  description: {
    en: "Join Haleema Quran Academy for worldwide online Quran classes for kids and adults. Learn Quran with Tajweed, Noorani Qaida, Hifz support, Islamic studies, flexible timings, WhatsApp enrollment, and email support.",
    ur: "حلیمہ قرآن اکیڈمی کے ساتھ بچوں اور بڑوں کے لیے دنیا بھر میں آن لائن قرآن کلاسز جوائن کریں۔ تجوید، نورانی قاعدہ، حفظ سپورٹ، اسلامی تعلیمات، مناسب اوقات، واٹس ایپ داخلہ اور ای میل سپورٹ دستیاب ہے۔",
  },
};

const getNormalizedText = (value) => value.replace(/\s+/g, " ").trim();

const getSavedLanguage = () => (storage.get("hqa-language") === "ur" ? "ur" : "en");
const getSavedTheme = () => (storage.get("hqa-theme") === "dark" ? "dark" : "light");

const getTextNodes = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      if (node.parentElement?.closest("script, style")) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  let node = walker.nextNode();

  while (node) {
    nodes.push(node);
    node = walker.nextNode();
  }

  return nodes;
};

const cacheOriginalText = () => {
  getTextNodes().forEach((node) => {
    if (!storedTextNodes.has(node)) {
      storedTextNodes.set(node, node.nodeValue);
    }
  });
};

const setNodeText = (node, value) => {
  const original = storedTextNodes.get(node) || node.nodeValue;
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  node.nodeValue = `${leading}${value}${trailing}`;
};

const setTranslatedText = (language) => {
  storedTextNodes.forEach((original, node) => {
    const normalized = getNormalizedText(original);
    const translated = translations[normalized];

    setNodeText(node, language === "ur" && translated ? translated : normalized);
  });
};

const setTranslatedAttributes = (language) => {
  document.querySelectorAll("[aria-label], [title], [alt], [placeholder]").forEach((element) => {
    ["aria-label", "title", "alt", "placeholder"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;

      if (!storedAttributes.has(element)) {
        storedAttributes.set(element, {});
      }

      const elementAttributes = storedAttributes.get(element);

      if (!elementAttributes[attribute]) {
        elementAttributes[attribute] = element.getAttribute(attribute);
      }

      const original = elementAttributes[attribute];
      const normalized = getNormalizedText(original);
      const translated = attribute === "placeholder" ? placeholderTranslations[normalized] : attributeTranslations[normalized];
      element.setAttribute(attribute, language === "ur" && translated ? translated : original);
    });
  });
};

const setMetaLanguage = (language) => {
  document.title = metaTranslations.title[language];
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');

  description?.setAttribute("content", metaTranslations.description[language]);
  ogTitle?.setAttribute("content", metaTranslations.title[language]);
  ogDescription?.setAttribute("content", metaTranslations.description[language]);
  twitterTitle?.setAttribute("content", metaTranslations.title[language]);
  twitterDescription?.setAttribute("content", metaTranslations.description[language]);
};

const setTheme = (theme) => {
  const isDark = theme === "dark";
  root.dataset.theme = isDark ? "dark" : "light";
  storage.set("hqa-theme", isDark ? "dark" : "light");
  themeMeta?.setAttribute("content", isDark ? "#0d1512" : "#0d4f3c");

  if (themeToggle) {
    const nextLabel = isDark ? "Light" : "Dark";
    const nextLabelUrdu = isDark ? "لائٹ" : "ڈارک";
    const language = getSavedLanguage();
    themeToggle.querySelector(".control-label").textContent = language === "ur" ? nextLabelUrdu : nextLabel;
    themeToggle.setAttribute(
      "aria-label",
      language === "ur"
        ? isDark
          ? "لائٹ تھیم کریں"
          : "ڈارک تھیم کریں"
        : isDark
          ? "Switch to light theme"
          : "Switch to dark theme",
    );
  }
};

const setLanguage = (language) => {
  const isUrdu = language === "ur";
  root.lang = isUrdu ? "ur" : "en";
  root.dir = isUrdu ? "rtl" : "ltr";
  storage.set("hqa-language", isUrdu ? "ur" : "en");
  setTranslatedText(isUrdu ? "ur" : "en");
  setTranslatedAttributes(isUrdu ? "ur" : "en");
  setMetaLanguage(isUrdu ? "ur" : "en");
  setTheme(getSavedTheme());

  if (languageToggle) {
    languageToggle.querySelector("span").textContent = isUrdu ? "EN" : "اردو";
    languageToggle.setAttribute("aria-label", isUrdu ? "Read website in English" : "Read website in Urdu");
  }
};

if (year) {
  year.textContent = new Date().getFullYear();
}

cacheOriginalText();
setTheme(getSavedTheme());
setLanguage(getSavedLanguage());

const setMenuState = (isOpen) => {
  if (!header || !menuToggle) return;

  header.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("no-scroll", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

themeToggle?.addEventListener("click", () => {
  setTheme(getSavedTheme() === "dark" ? "light" : "dark");
});

languageToggle?.addEventListener("click", () => {
  setLanguage(getSavedLanguage() === "ur" ? "en" : "ur");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll(".faq-list details").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});

const buildTrialMessage = () => {
  const data = new FormData(form);

  if (getSavedLanguage() === "ur") {
    return [
      "السلام علیکم، میں مفت ٹرائل کلاس بک کرنا چاہتا/چاہتی ہوں۔",
      "",
      `طالب علم کا نام: ${data.get("name")}`,
      `عمر کا گروپ: ${data.get("age")}`,
      `کورس: ${data.get("course")}`,
      `پسندیدہ وقت: ${data.get("time")}`,
      `واٹس ایپ نمبر: ${data.get("phone")}`,
      `پیغام: ${data.get("message") || "اضافی پیغام نہیں"}`,
    ].join("\n");
  }

  return [
    "Assalamu Alaikum, I want to book a free trial class.",
    "",
    `Student name: ${data.get("name")}`,
    `Age group: ${data.get("age")}`,
    `Course: ${data.get("course")}`,
    `Preferred timing: ${data.get("time")}`,
    `WhatsApp number: ${data.get("phone")}`,
    `Message: ${data.get("message") || "No extra message"}`,
  ].join("\n");
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const whatsappNumber = document.body.dataset.whatsappNumber || "923028033582";
  const message = buildTrialMessage();
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  statusMessage.textContent =
    getSavedLanguage() === "ur" ? "آپ کی ٹرائل درخواست کے ساتھ واٹس ایپ کھل رہا ہے..." : "Opening WhatsApp with your trial request...";
  window.open(url, "_blank", "noopener,noreferrer");
});

emailButton?.addEventListener("click", () => {
  if (!form?.reportValidity()) {
    return;
  }

  const subject = getSavedLanguage() === "ur" ? "مفت ٹرائل کلاس کی درخواست" : "Free trial class request";
  const message = buildTrialMessage();
  const url = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  statusMessage.textContent =
    getSavedLanguage() === "ur" ? "آپ کی ای میل ایپ ٹرائل درخواست کے ساتھ کھل رہی ہے..." : "Opening your email app with the trial request...";
  window.location.href = url;
});
