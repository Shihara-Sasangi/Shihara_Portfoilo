export type SocialLink = { label: string; href: string };

export type Project = {
  name: string;
  description: string;
  stack: string[];
  href?: string;
};

export type ProjectCategory = {
  title: string;
  summary: string;
  points: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export const PROFILE = {
  name: "Shihara Sasangi",
  headline: "Software Engineer",
  location: "Sri Lanka ",
  summary:
    "Dedicated and methodical Computer Science undergraduate with a passion for learning and growth. Excels in team environments and proactive problem-solving. Eager to take on responsibilities and contribute meaningfully to software development projects. Continuously seeking opportunities to grow professionally and deliver impactful results.",
  socials: [
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=shiharasasangi@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shihara-sasangi-067353270" },
    { label: "GitHub", href: "https://github.com/Shihara-Sasangi" },
  ] satisfies SocialLink[],
};

export const SKILLS = {
  primary: [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "REST APIs",
    "SQL",
    "Git",
  ],
  secondary: ["Webpack", "Three.js", "Radix UI", "Figma", "Testing (Jest/RTL)"],
};

export const EXPERIENCE: Experience[] = [];

export const PERSONAL_PROJECTS: ProjectCategory = {
  title: "Personal Projects",
  summary: "Independent work, explorations, and side projects.",
  points: [
    "Currently building exciting new things and exploring modern web development.",
    "Actively learning and improving my technical skills through hands-on practice.",
  ],
};

export const UNIVERSITY_PROJECTS: ProjectCategory = {
  title: "University Projects",
  summary: "Academic projects completed during my degree.",
  points: [
    "UniVerse 3D - 3D University Indoor Navigation Game (Second Year SDGP): Led a team in designing and developing an interactive 3D campus navigation game. Coordinated task allocation, designed detailed 3D building layouts, and implemented navigation tools for onboarding new students. Tech Stack: JavaScript, Three.js, WebGL, Blender, HTML, CSS. Link: https://www.universe3d.lk/",
    "Life on Land – Environmental Awareness Web Page: Developed a responsive and accessible web page focused on environmental sustainability themes. Applied wireframing and prototyping to design user-friendly interfaces aligned with the project's concept. Tech Stack: HTML, CSS, JavaScript, Figma.",
  ],
};

/** Modules completed as part of the degree (two columns on detail page). */
export const ACADEMIC_MODULES: string[] = [
  "Professional Development",
  "Web Development",
  "Computer System Fundamentals",
  "Trends in Computer Science",
  "Mathematics for Computing",
  "Database Systems",
  "Object-Oriented Programming",
  "Machine Learning and Data Mining",
];

export type ProfessionalDevelopmentCourse = {
  course: string;
  completed: string;
};

export const PROFESSIONAL_DEVELOPMENT_IIT: ProfessionalDevelopmentCourse[] = [
  { course: "Java Programming with OOP", completed: "2025 September" },
  { course: "Web Development", completed: "2024 September" },
];

/** Workshops and programmes (University Participants detail page). */
export const UNIVERSITY_PARTICIPANTS_ITEMS: string[] = [
  "Participant – IEEE Hackathon Extreme 19.0 (Global Hackathon Competition)",
  "Competitor – Hult Prize 2026 (University-Level Entrepreneurship Competition)",
  "Participant – CodeSprint 11 Coding Competition",
  "Active participant in innovation-focused and problem-solving competitions",
  "UI / UX Workshops",
  "Software Development Group project",
];

