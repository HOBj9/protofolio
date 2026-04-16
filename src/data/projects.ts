export type Project = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  description: string;
  stack: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl: string;
  role: string;
  problem: string;
  goal: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  result: string;
};

const projectsSource = [
  {
    title: "Craftores",
    type: "Platform + SaaS",
    description:
      "A production-ready SaaS platform that unifies services, products, projects, and portfolio management into a single scalable system.",
    featured: true,
    github: "https://github.com/HOBj9/craftores.git",
    tech: ["React", "Vite", "Tailwind", "NestJS", "Prisma", "MySQL", "Turbo", "Docker"],
  },
  {
    title: "QueueBee",
    type: "SaaS Platform",
    description:
      "A queue and appointment management system with real-time operational visibility and a modern dashboard.",
    featured: false,
    github: "https://github.com/HOBj9/queuebee.git",
    tech: ["React", "TypeScript", "Tailwind", "Zustand", "TanStack Query", "Express", "PostgreSQL", "Prisma"],
  },
  {
    title: "Athar IoT",
    type: "SaaS + Event Platform",
    description:
      "A full platform for managing digital and physical events, including subscriptions, payments, QR access, and voting systems.",
    featured: false,
    github: "https://github.com/HOBj9/athar_iot.git",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Redis", "AWS S3"],
  },
  {
    title: "Real Estate Platform",
    type: "Full Stack Platform",
    description:
      "A real estate system with public listings, advanced filtering, and an admin dashboard for managing properties.",
    featured: false,
    github: "https://github.com/HOBj9/Real-Estate.git",
    tech: ["React", "Tailwind", "Express", "MySQL", "i18n", "Framer Motion"],
  },
];

const slugByTitle: Record<string, string> = {
  Craftores: "craftores",
  QueueBee: "queuebee",
  "Athar IoT": "athar-iot",
  "Real Estate Platform": "real-estate-platform",
};

export const projects: Project[] = projectsSource.map((project) => ({
  slug: slugByTitle[project.title],
  title: project.title,
  type: project.type,
  summary: project.description,
  description: project.description,
  stack: project.tech,
  featured: project.featured,
  githubUrl: project.github,
  role: "Full Stack Product Engineer responsible for architecture, implementation, and delivery.",
  problem: "Teams needed a production-grade platform with reliable workflows and clear user experience.",
  goal: "Ship a scalable SaaS product that balances performance, maintainability, and business impact.",
  features: [
    "Production-ready architecture and modular services",
    "Clear product workflows with dashboard-driven UX",
    "Scalable data layer and maintainable code organization",
  ],
  challenges: [
    "Maintaining performance while shipping features quickly",
    "Keeping frontend and backend boundaries clean as scope expands",
  ],
  solutions: [
    "Applied modular patterns and strict service boundaries",
    "Optimized rendering and query paths for predictable responsiveness",
  ],
  result: "Delivered a robust platform experience aligned with SaaS-quality expectations.",
}));

export const featuredProjectSlug = "craftores";
