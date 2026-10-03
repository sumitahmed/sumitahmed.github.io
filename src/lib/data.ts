import { Code2, Trophy, ShieldCheck } from "lucide-react";

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
  
  // Extended Details for Modal
  overview: string;        
  motivation: string;      
  features: string[];      
  techStackDetails: {
    category: string;
    tools: string;
  }[];
  challenges: {
    title: string;
    description: string;
  }[];
  impact?: string[];       
  futurePlans: string[];   
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Panvas",
    description: "A visual thinking workspace for engineers, researchers, and technical students. Think. Sketch. Write. Build.",
    tags: ["React", "TypeScript", "Vite", "Excalidraw"],
    image: "/panvas.webp",
    githubUrl: "https://github.com/sumitahmed/Panvas",
    demoUrl: "https://panvas.vercel.app",
    featured: true,
    overview: "Panvas is an infinite visual workspace built for engineers, researchers, and creators. By integrating the Excalidraw engine within a modern React and TypeScript architecture, it provides a seamless whiteboard experience optimized for technical sketching, wireframing, and drafting ideas.",
    motivation: "Technical brainstorming requires more than just text—it demands a fluid visual canvas. I built Panvas to create a dedicated space where complex ideas can be mapped out without friction.",
    features: [
      "Infinite Canvas: Freely draw, type, and connect diagrams on a boundless workspace.",
      "Technical Sketching: Optimized tools for wireframing and architectural diagrams.",
      "High Performance: Leveraging Vite and modern React for lightning-fast rendering."
    ],
    techStackDetails: [
      { category: "Frontend", tools: "React, TypeScript" },
      { category: "Build Tool", tools: "Vite" },
      { category: "Canvas Engine", tools: "Excalidraw API" }
    ],
    challenges: [
      {
        title: "Canvas Engine Integration",
        description: "Integrating and optimizing a heavy canvas engine while maintaining a smooth 60fps interaction frame rate."
      }
    ],
    impact: [
      "Created a robust tool for fast visual ideation.",
      "Mastered complex canvas-based state handling."
    ],
    futurePlans: [
      "Collaborative multiplayer sessions.",
      "Cloud syncing for workspaces."
    ]
  },
  {
    id: 2,
    title: "FreeCompute",
    description: "Run open-source LLMs and image models on free cloud GPUs while controlling them from your local terminal.",
    tags: ["Python", "LLM", "Kaggle", "llama.cpp", "Cloudflare"],
    image: "/freecompute.webp",
    githubUrl: "https://github.com/sumitahmed/FreeCompute",
    featured: true,
    overview: "FreeCompute bridges free cloud GPU environments (such as Kaggle dual Tesla T4 instances with 30 GB total VRAM) to a local developer terminal. It enables running open-source large language models (Qwen, DeepSeek, Mistral) and image generation pipelines (ComfyUI) remotely while keeping code, file edits, bash commands, and git history strictly on the local machine. The remote GPU host acts purely as an untrusted inference box connected through a secure Cloudflare tunnel.",
    motivation: "Running modern 27B-32B parameter open-source models locally requires expensive discrete GPUs with massive VRAM. Meanwhile, cloud services like Kaggle provide 30 hours per week of free dual Tesla T4 GPUs that largely go underutilized. FreeCompute was built to harness this free cloud compute for pair programming without giving cloud servers access to private local files or repositories.",
    features: [
      "Remote Dual-GPU Inference: Offloads inference across Kaggle dual Tesla T4 GPUs (30 GB VRAM) using llama.cpp server with 50/50 layer splitting.",
      "Strict Local Privacy: File modifications, terminal commands, and workspace state remain strictly on the local machine; the remote server only receives inference prompts.",
      "Approval-Aware Coding Agent: Interactive pair-programming harness that inspects files, drafts diffs, requests explicit approval before changes, and supports instant /undo rollback.",
      "Session & Quota Management: Tracks Kaggle 12-hour session age, remaining runtime, dual-GPU VRAM usage, and weekly GPU quota directly from the CLI.",
      "Custom Skills & ComfyUI: Modular skill system powered by SKILL.md definitions with slash commands, plus optional remote image generation through ComfyUI."
    ],
    techStackDetails: [
      { category: "CLI & Harness", tools: "Python, Prompt Toolkit, Rich" },
      { category: "Remote Inference", tools: "llama.cpp server (GGUF), Kaggle Dual Tesla T4 GPUs" },
      { category: "Networking", tools: "Cloudflare Tunnel (trycloudflare), Bearer Token Auth" },
      { category: "Agent Architecture", tools: "Tool Registry, File Sandbox, Diff Engine, Undo Journaling" },
      { category: "Optional Extensions", tools: "ComfyUI, Modular SKILL.md Architecture" }
    ],
    challenges: [
      {
        title: "Dual-GPU Layer Balancing",
        description: "Splitting large 27B-32B Q4_K_M model layers evenly 50/50 across dual Tesla T4 GPUs to support extended contexts (up to 48K-65K tokens) without triggering CUDA out-of-memory errors."
      },
      {
        title: "Local/Remote Security Boundary",
        description: "Architecting a strict security boundary ensuring the remote cloud GPU operates purely as an untrusted inference backend, keeping all file system I/O, tool execution, and diff approval on the local workstation."
      }
    ],
    impact: [
      "Unlocked up to 30 hours/week of free 30 GB dual-T4 GPU inference for daily terminal development.",
      "42/42 passing unit tests covering CLI tools, client networking, journal undo, and providers.",
      "Runs 27B-32B coding models with zero hardware upgrades or paid API subscriptions."
    ],
    futurePlans: [
      "Multi-agent task orchestration with specialized reviewer and researcher subagents.",
      "Automatic provider failover across Kaggle, Colab, and local fallback instances.",
      "Interactive terminal diff reviewer and visual syntax inspector."
    ]
  },
  {
    id: 3,
    title: "TabBridge",
    description: "Cross-browser tab group transfer extension for Chromium browsers like Chrome, Brave, and Edge.",
    tags: ["JavaScript", "Browser Extension", "Manifest V3"],
    image: "https://raw.githubusercontent.com/sumitahmed/TabBridge/main/screenshots/export.png",
    githubUrl: "https://github.com/sumitahmed/TabBridge",
    demoUrl: "",
    featured: false,
    overview: "TabBridge is a Manifest V3 browser extension that solves the problem of migrating organized tab groups across different Chromium browsers. It acts as a lightweight bridge, allowing users to export all their tab groups—including names, colors, and URLs—into a single JSON file, and seamlessly import them anywhere else.",
    motivation: "Browsers like Chrome, Brave, and Edge don't natively support transferring tab groups. Moving 40+ organized tabs meant copying URLs one by one. I built TabBridge to automate this tedious process securely and locally.",
    features: [
      "Export/Import: Captures and recreates all tab groups with correct titles, colors, and URLs.",
      "Cross-Browser: Works flawlessly across Chrome, Brave, Edge, and any Chromium derivative.",
      "100% Local & Secure: No accounts, no cloud, no backend. Everything runs completely offline.",
      "Lightweight: Built without heavy frameworks, keeping the total size under 30KB."
    ],
    techStackDetails: [
      { category: "Extension Architecture", tools: "Manifest V3" },
      { category: "Languages", tools: "Vanilla JavaScript, HTML, CSS" },
      { category: "APIs Used", tools: "Chrome Tabs API, Chrome TabGroups API" }
    ],
    challenges: [
      {
        title: "Browser API Quirks",
        description: "Different Chromium browsers handle TabGroup IDs and creation slightly differently. I had to ensure the parsing logic correctly restores the exact state without breaking the browser's native indexing."
      }
    ],
    impact: [
      "Streamlined workflow for users switching between browsers.",
      "Delivered a zero-dependency, ultra-fast utility tool."
    ],
    futurePlans: [
      "Auto-sync features via secure local network transfer.",
      "Firefox compatibility (Manifest V2/V3 alignment)."
    ]
  },
  {
    id: 4,
    title: "AgriSense AI",
    description: "AI-powered agricultural monitoring system integrating satellite imagery (Geospatial Data) for crop health analysis. Built for Smart India Hackathon 2025.",
    tags: ["Python", "React", "AI/ML", "Geospatial", "FastAPI"],
    image: "/AgriSenseAI.webp", 
    youtubeUrl: "https://www.youtube.com/watch?v=0L4mGsF0P1s", 
    featured: true,
    overview: "AgriSense is a geospatial intelligence platform that democratizes precision agriculture. While the core engine analyzes multi-spectral satellite imagery (Sentinel-2/Landsat) to compute vegetation indices (NDVI, NDWI), my role was to architect the full-stack infrastructure that delivers this complex data to farmers. The platform visualizes crop health and water stress on an interactive map, translating heavy backend calculations into a seamless, responsive user experience.",
    motivation: "My team built powerful ML models to analyze satellite data, but raw data is useless to a farmer without a clear interface. As the Lead Full Stack Developer, my goal was to bridge the gap between the Data Science team and the end-user. I wanted to build a robust system that could ingest the heavy data payloads from our ML pipeline and render them instantly on a frontend that feels intuitive, ensuring that 'invisible' crop stress is visualized clearly days before the human eye can see it.",
    features: [
      "Geospatial Mapping: Interactive map interface allowing farmers to draw field boundaries (polygons) which I process to fetch specific regional data.",
      "Data Visualization: rendering complex NDVI/NDWI layers from the backend onto the map with custom color-coded overlays.",
      "Real-time Dashboard: A responsive UI that displays crop density, water stress levels, and pest alerts fetched from our analysis engine.",
      "Field Management: specialized forms and state management to help farmers categorize and track different acres of land.",
      "Yield Forecast UI: Visual charts and graphs displaying the yield predictions generated by the ML algorithms."
    ],
    techStackDetails: [
      { category: "Frontend Architecture", tools: "React.js, Tailwind CSS, Leaflet/Mapbox GL" },
      { category: "Backend API", tools: "FastAPI (Python), Uvicorn" },
      { category: "Data Integration", tools: "REST APIs, JSON Serialization" },
      { category: "Powered By", tools: "Team's ML Engine (Scikit-learn, Rasterio, Sentinel-2)" }
    ],
    impact: [
      "Selected as a key project for Smart India Hackathon 2025 internal round.",
      "Architected a scalable Full Stack system that successfully integrated the team's Python-based ML models with a React frontend.",
      "Optimized data rendering to handle complex geospatial overlays without lagging the user interface."
    ],
    challenges: [
      {
        title: "Backend-ML Integration",
        description: "The ML team's models produced massive raster datasets. My challenge was designing a FastAPI backend that could receive this heavy data, process it efficiently, and send lightweight JSON responses to the frontend to ensure the app remained fast."
      },
      {
        title: "Complex UI State Management",
        description: "Translating the UI/UX designs into code was difficult because the map state had to sync with the data sidebar. I implemented complex state management to ensure that when a user drew a polygon on the map, the dashboard immediately updated with the correct context for that specific region."
      }
    ],
    futurePlans: [
      "Mobile App: Porting the React frontend to React Native for on-field usage.",
      "Real-time Notifications: Implementing WebSockets to push alerts to the farmer immediately when the backend detects stress.",
      "Offline Mode: Caching map data so farmers can view their field analysis even with poor connectivity."
    ]
  },
  {
    id: 5,
    title: "Hyperland Portfolio",
    description: "A highly interactive developer portfolio inspired by Hyperland Linux rices. Features a custom draggable window interface and real-time state management.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/portfolio-showcase.webp", 
    githubUrl: "https://github.com/sumitahmed/sumitahmed.github.io", 
    demoUrl: "https://sumitahmed.github.io", 
    featured: true,
    overview: "Hyperland Portfolio is not just a website; it is a simulation of a specialized Linux Desktop Environment (Wayland/Hyprland) running inside a browser. It reimagines the personal portfolio by abandoning the traditional 'scroll-down' structure in favor of an 'Operating System' metaphor. Users interact with draggable windows, execute terminal commands, and manage workspace states. It serves as the ultimate demonstration of my Frontend Engineering capabilities, showcasing mastery over complex state management, z-index stacking contexts, and performant animations.",
    motivation: "I was tired of seeing the same generic 'Hero Section -> About -> Projects' portfolios. They look good but lack soul. As a Linux enthusiast who loves 'ricing' (customizing) my desktop, I wanted my portfolio to reflect that identity. I wanted to build something that makes other developers say, 'Wait, is this a website or a remote desktop?'. It was a challenge to myself: Can I rebuild a Window Manager using only React and CSS?",
    features: [
      "Custom Window Manager: Built a hook-based engine (`useDraggable`) to handle window coordinates, minimizing, maximizing, and focus states.",
      "Terminal Emulation: The 'Contact' and 'About' sections are designed as CLI tools with typing effects and command execution logs.",
      "Global State Management: A central store tracks which window is active, the system time, battery status, and network simulation.",
      "Physics-based Animations: Uses Framer Motion for spring-loaded window opening/closing and layout transitions.",
      "Mobile Responsive Adaptation: Automatically detects mobile devices and switches from 'Floating Window' mode to a 'Vertical Stack' layout for better usability."
    ],
    techStackDetails: [
      { category: "Framework", tools: "React 19, TypeScript" },
      { category: "Styling Engine", tools: "Tailwind CSS (extensive use of arbitrary values)" },
      { category: "Animation Library", tools: "Framer Motion (AnimatePresence, LayoutGroup)" },
      { category: "Icons", tools: "Lucide React, DevIcons, SimpleIcons" },
      { category: "Hosting", tools: "GitHub Pages" }
    ],
    challenges: [
      { 
        title: "Z-Index War", 
        description: "Managing which window is on top was a nightmare. I had to implement a 'Focus Manager' that dynamically updates the z-index of the clicked window to ensure it overlays others correctly." 
      },
      { 
        title: "Glassmorphism Performance", 
        description: "Heavy use of `backdrop-filter: blur()` caused lag on low-end laptops. I optimized this by disabling the blur effect during the 'dragging' state to maintain 60FPS." 
      }
    ],
    impact: [
      "Achieved a unique personal brand identity.",
      "Received compliments on the 'Sakura' theme and 'Dark Zen' aesthetic.",
      "Proven ability to build complex, interactive UI systems beyond standard web layouts."
    ],
    futurePlans: [
      "File System: Implementing a virtual file system where users can create folders and text files.",
      "Theme Switcher: Allowing users to toggle between 'Cyberpunk', 'Nord', and 'Gruvbox' themes.",
      "Music Player: A working widget playing lofi beats."
    ]
  },
  {
    id: 6,
    title: "VidTube Platform",
    description: "A secure, full-stack video streaming platform featuring JWT authentication, MongoDB aggregation pipelines for video discovery, and cloud-based media storage.",
    tags: ["Node.js", "Express.js", "MongoDB", "Cloudinary", "Multer"],
    image: "https://raw.githubusercontent.com/sumitahmed/vidtube/main/vidtube-showcase.png.png", 
    githubUrl: "https://github.com/sumitahmed/vidtube", 
    featured: true,
    overview: "VidTube is a monolithic full-stack video hosting service engineered to replicate the core backend architecture of platforms like YouTube. Unlike simple CRUD apps, VidTube focuses on complex relationship management between Users, Videos, Comments, Likes, and Playlists. It features a professional-grade backend structure with separated controllers, services, and middlewares, ensuring scalability and maintainability. The frontend consumes these APIs to provide a seamless, single-page-application (SPA) feel where users can upload content, subscribe to channels, and track their watch history in real-time.",
    motivation: "I built VidTube because I wanted to move beyond simple 'To-Do List' tutorials and understand true Backend System Design. I wanted to answer questions like: How do you handle large file uploads securely? How do you count millions of views without crashing the database? How do subscription feeds actually work? This project was my playground to master MongoDB Aggregation Pipelines (lookup, unwind, project) and secure Authentication flows involving Access and Refresh token rotation.",
    features: [
      "Secure Authentication: implemented a dual-token system (Access + Refresh Tokens) with HttpOnly cookies to prevent XSS attacks.",
      "Video Upload Pipeline: Uses Multer middleware to handle local buffering and Cloudinary SDK for cloud storage and CDN delivery.",
      "Advanced Video Querying: Search, filter, and paginate videos using complex MongoDB aggregation queries.",
      "Engagement System: Full support for Toggling Likes, nested Comments, and Subscription management.",
      "Dashboard Analytics: A creator studio view showing Total Views, Subscriber Count, and Video Performance metrics.",
      "Watch History: Automatically tracks user activity and allows clearing/managing history."
    ],
    techStackDetails: [
      { category: "Backend Runtime", tools: "Node.js (v18+)" },
      { category: "Framework", tools: "Express.js (REST API Architecture)" },
      { category: "Database", tools: "MongoDB (Mongoose ODM) with heavy use of Aggregations" },
      { category: "Cloud Storage", tools: "Cloudinary (Video/Image hosting)" },
      { category: "Authentication", tools: "JSON Web Tokens (JWT), Bcrypt for hashing" }
    ],
    challenges: [
      { 
        title: "Complex Aggregation Pipelines", 
        description: "Writing the query for the 'User Dashboard' was the hardest part. It required joining the Videos collection with Likes and Subscriptions in a single query to return the total stats efficiently. I spent days debugging $lookup and $addFields stages." 
      },
      { 
        title: "Token Expiry & Rotation", 
        description: "Handling the 401 Unauthorized error seamlessly on the frontend when the Access Token expired. I had to write an Axios interceptor to auto-call the refresh endpoint and retry the original request without logging the user out." 
      }
    ],
    impact: [
      "Successfully handled uploads of video files >100MB during testing.",
      "Learned the importance of Database Indexing for faster search queries.",
      "Created a reusable 'ApiResponse' and 'ApiError' class structure that I now use in all my backend projects."
    ],
    futurePlans: [
      "Transcoding Pipeline: Implement FFmpeg to generate multiple quality resolutions (360p, 720p, 1080p).",
      "Live Streaming: Integration of RTMP server for live broadcasts.",
      "Recommendation Algorithm: A basic content-based filtering system to suggest next videos."
    ]
  }
];

export const TECH_STACK_DATA = [];

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
  }
];