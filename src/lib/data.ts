import { Code2, Trophy, ShieldCheck } from "lucide-react";

// Define the Project Interface
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  youtubeUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

// ✅ YOUR UPDATED PROJECTS DATA
export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "AgriSense AI",
    description: "AI-powered agricultural monitoring system integrating satellite imagery for crop health analysis. Built for Smart India Hackathon 2025.",
    tags: ["Python", "React", "AI/ML", "Geospatial", "FastAPI"],
    image: "/AgriSenseAI.jpg", 
    youtubeUrl: "https://www.youtube.com/watch?v=0L4mGsF0P1s", 
    featured: true,
  },
  {
    id: 2,
    title: "VidTube Platform",
    description: "A secure, full-stack video streaming platform featuring JWT authentication, MongoDB aggregation pipelines for video discovery, and cloud-based media storage.",
    tags: ["Node.js", "Express.js", "MongoDB", "Cloudinary", "Multer"],
    image: "https://raw.githubusercontent.com/sumitahmed/vidtube/main/vidtube-showcase.png.png", 
    githubUrl: "https://github.com/sumitahmed/vidtube", 
    featured: true,
  },
  {
    id: 3,
    title: "Nyay Sarthi",
    description: "An AI-powered legal assistance chatbot designed to make judiciary information accessible. Focused on intuitive UI/UX design.",
    tags: ["HTML5", "CSS3", "JavaScript", "GenAI Integration"],
    image: "/nyay.png", 
    githubUrl: "https://github.com/sumitahmed/NyaySarthi-Updated-ui-ux",
  },
  // ✅ NEW: Portfolio Project with Updated Description
  {
    id: 4,
    title: "Hyperland Portfolio",
    description: "A highly interactive developer portfolio inspired by Hyperland Linux rices. Features a custom draggable window interface, complex Framer Motion animations, real-time activity status synced with Discord, and live GitHub & Codolio stat tracking.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Discord API"],
    image: "/portfolio-showcase.png", 
    githubUrl: "https://github.com/sumitahmed/portfolio", 
    demoUrl: "/", // Links to the current site
    featured: true,
  }
];

export const TECH_STACK_DATA = [];

// ✅ CERTIFICATIONS DATA
export const ACHIEVEMENTS_CERTS = [
  {
    title: "Super Contributor 2025",
    issuer: "GitHub / Holopin",
    date: "2025",
    icon: Trophy,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    border: "group-hover:border-yellow-400/50",
    link: "https://www.holopin.io/@sumitahmed#badges"
  },
  {
    title: "OCI Certified Professional",
    issuer: "Oracle Cloud",
    date: "2025",
    icon: ShieldCheck,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    border: "group-hover:border-red-400/50",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=5D23408AD89DC0DA9C8A03DD14209B7F650EDD11CAD24AF9E1E4AA65054A1DBE"
  },
  {
    title: "Java Certification",
    issuer: "GeeksforGeeks",
    date: "2024",
    icon: Code2,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    border: "group-hover:border-green-400/50",
    link: "https://www.geeksforgeeks.org/" 
  },
];