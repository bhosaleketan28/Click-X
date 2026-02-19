export const TOTAL_FRAMES = 120;
export const FRAME_BG = "#f5f5f5";
export const SCROLL_HEIGHT = 400;

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBasePath = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

export const frameSrc = (index: number) =>
  withBasePath(`/sequence-webp-120/WB${index.toString().padStart(3, "0")}.webp`);

export interface Panel {
  id: string;
  align: "left" | "right" | "center";
  in: readonly [number, number];
  out: readonly [number, number];
  y: string;
  title: string;
  body?: string;
  bullets?: readonly string[];
  cta?: boolean;
}

export const PANELS: readonly Panel[] = [
  {
    id: "engineering",
    align: "left",
    in: [0.12, 0.16],
    out: [0.28, 0.32],
    y: "22%",
    title: "Turn every lesson into active dialogues",
    body: ""
  },
  {
    id: "ai-desk",
    align: "right",
    in: [0.32, 0.36],
    out: [0.5, 0.54],
    y: "26%",
    title: "Bring AI to Every Desk for Active Learning",
    bullets: []
  },
  {
    id: "engagement",
    align: "left",
    in: [0.54, 0.58],
    out: [0.7, 0.74],
    y: "30%",
    title: "Transforming Classroom Engagement with Click X",
    body: "From distraction to focused engagement. Built for smart, AI-powered classrooms with studio-level presence."
  },
  {
    id: "cta",
    align: "center",
    in: [0.76, 0.82],
    out: [0.98, 1.0],
    y: "52%",
    title: "",
    body: "",
    cta: true
  }
] as const;

export const FEATURES = [
  {
    title: "Two-Way Interactive Learning.",
    icon: "/branding/cards/two-way.svg"
  },
  {
    title: "100% Focused Participation.",
    icon: "/branding/cards/student.svg"
  },
  {
    title: "AI Interaction for Every Student.",
    icon: "/branding/cards/focus-target.svg"
  },
  {
    title: "From Distraction to Focused Engagement.",
    icon: "/branding/cards/focused-engagement.svg"
  },
  {
    title: "Built for Smart, AI-Powered Classrooms.",
    icon: "/branding/cards/ai-classroom.svg"
  }
] as const;

export const SLIDES = [
  { title: "Two-Way Interactive Learning.", src: "/branding/slider/slide-01.png" },
  { title: "Built for Smart, AI-Powered Classrooms.", src: "/branding/slider/slide-02.jpeg" },
  { title: "100% Focused Participation.", src: "/branding/slider/slide-03.jpeg" },
  { title: "AI Interaction for Every Student.", src: "/branding/slider/slide-04.jpeg" },
  { title: "From Distraction to Focused Engagement.", src: "/branding/slider/slide-05.png" },
  { title: "Real-Time Understanding.", src: "/branding/slider/slide-06.jpeg" },
  { title: "Instant Class Momentum.", src: "/branding/slider/slide-07.jpeg" },
  { title: "Designed for Every Desk.", src: "/branding/slider/slide-08.jpeg" }
] as const;

export const FAQ_ITEMS = [
  {
    q: "What is Click X?",
    a: "Click X is a student response clicker that allows every student to interact with lessons in real time, ensuring full participation and instant performance insights."
  },
  {
    q: "Does Click X need internet?",
    a: "No, internet is not required. Click X connects seamlessly with the base station integrated with Teachmint X."
  },
  {
    q: "How does Click X help teachers?",
    a: "Teachers can launch quizzes, polls, and assessments, and get student-wise, real-time insights to track understanding and improve lessons."
  },
  {
    q: "Can Click X be used for all types of lessons?",
    a: "Yes! It works for live quizzes, concept checks, exit tickets, polls, revision sessions, and exam preparation."
  },
  {
    q: "Do teachers get instant reports?",
    a: "Yes, all student responses are captured instantly and displayed on the Teachmint X panel for real-time performance tracking."
  },
  {
    q: "Does Click X work with personal devices?",
    a: "No, Click X is a dedicated device that works seamlessly with Teachmint X, keeping students focused and distraction-free."
  }
] as const;

export const FOOTER_SECTIONS = [
  {
    title: "Company",
    links: ["About Us", "Events", "Careers", "Privacy policy"]
  },
  {
    title: "Resources",
    links: ["Blog", "Product Policy", "Brochure", "Warranty Policy"]
  }
] as const;

export const SOCIAL_LINKS = [
  { name: "LinkedIn", src: "/branding/social/linkedin.svg" },
  { name: "Facebook", src: "/branding/social/facebook.svg" },
  { name: "Instagram", src: "/branding/social/instagram.svg" },
  { name: "Twitter", src: "/branding/social/twitter.svg" }
] as const;
