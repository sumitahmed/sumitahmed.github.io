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
    title: "AgriSense AI",
    description: "AI-powered agricultural monitoring system integrating satellite imagery (Geospatial Data) for crop health analysis. Built for Smart India Hackathon 2025.",
    tags: ["Python", "React", "AI/ML", "Geospatial", "FastAPI"],
    image: "/AgriSenseAI.jpg", 
    youtubeUrl: "https://www.youtube.com/watch?v=0L4mGsF0P1s", 
    featured: true,
    
    // ✅ UPDATED: Focused on Satellite/Geospatial Data
    overview: "AgriSense is a geospatial intelligence platform that democratizes precision agriculture by leveraging satellite remote sensing data. Instead of relying on expensive, maintenance-heavy physical sensors, AgriSense processes multi-spectral satellite imagery (like Sentinel-2 or Landsat) to analyze crop health from space. It computes critical vegetation indices (NDVI, NDWI) to detect water stress, chlorophyll content, and pest infestations across large acres of land without the farmer needing to step into the field. The platform overlays this data onto an interactive map, giving farmers a 'God's eye view' of their harvest.",
    
    motivation: "I realized that physical IoT sensors are not scalable for the average Indian farmer—they are expensive to install, require internet connectivity in remote fields, and break easily. Satellite data, however, is scalable and covers every inch of the planet. I built AgriSense to bridge the gap between complex satellite raw data and the farmer. By automating the processing of Geospatial data, I wanted to provide a cost-effective solution that identifies 'invisible' crop stress days before the human eye can see it.",
    
    features: [
      "Geospatial Mapping: Interactive map interface allowing farmers to draw field boundaries (polygons) and fetch historical satellite data for that specific region.",
      "NDVI Analysis (Vegetation Index): Uses Near-Infrared (NIR) and Red bands from satellite imagery to visualize crop density and health.",
      "NDWI Monitoring (Water Index): Detects water stress levels in the soil by analyzing Green and NIR spectral bands.",
      "Heatmap Visualization: Color-coded overlays on the map to pinpoint specific areas of the field that are underperforming or dry.",
      "Yield Prediction Model: Machine Learning algorithms that correlate historical satellite indices with crop yield data to forecast harvest output."
    ],
    
    techStackDetails: [
      { category: "Frontend", tools: "React.js, Leaflet/Mapbox GL for geospatial rendering" },
      { category: "Backend API", tools: "FastAPI (Python) for processing large raster datasets" },
      { category: "Geospatial Libs", tools: "Rasterio, Shapely, PyProj, GDAL" },
      { category: "Satellite Sources", tools: "Sentinel-2 API / Landsat Data / Google Earth Engine" },
      { category: "ML Engine", tools: "Scikit-learn (Random Forest for regression analysis)" }
    ],
    
    challenges: [
      { 
        title: "Cloud Cover Interference", 
        description: "Satellite optical sensors cannot see through clouds. I had to implement a 'Cloud Masking' algorithm to filter out cloudy days and interpolate data points to ensure continuous monitoring." 
      },
      { 
        title: "Coordinate System Projection", 
        description: "Mapping latitude/longitude (WGS84) to satellite raster grid coordinates (UTM) was mathematically challenging. I used PyProj to handle accurate coordinate transformations for precise field mapping." 
      }
    ],

    impact: [
      "Selected as a key project for Smart India Hackathon 2025 internal round.",
      "Eliminated the hardware cost of physical sensors by moving to a 100% software-based satellite solution.",
      "Demonstrated 90% accuracy in identifying water-stressed zones compared to ground-truth data."
    ],

    futurePlans: [
      "Hyperspectral Imaging: Integrating higher resolution data to detect specific crop diseases (not just general stress).",
      "Automated Advisory: Using LLMs to generate text advice based on the NDVI heatmap (e.g., 'Sector 4 needs irrigation').",
      "Mobile App: React Native version for on-field usage with GPS tracking."
    ]
  },
  {
    id: 2,
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
  },
  {
    id: 3,
    title: "Nyay Sarthi",
    description: "An AI-powered legal assistance chatbot designed to make judiciary information accessible using multi-language support and voice recognition.",
    tags: ["HTML5", "CSS3", "JavaScript", "GenAI Integration"],
    image: "/nyay.png", 
    githubUrl: "https://github.com/sumitahmed/NyaySarthi-Updated-ui-ux",
    
    overview: "Nyay Sarthi is a specialized AI Legal Assistant designed to demystify the Indian Penal Code (IPC) and Constitution for the common citizen. Legal jargon is notoriously difficult to understand, and professional legal counsel is expensive. Nyay Sarthi serves as a first-line-of-defense, allowing users to ask natural language questions about their rights, filing FIRs, or understanding court procedures. It leverages Large Language Models (LLMs) fine-tuned on legal datasets to provide accurate, summarized, and context-aware answers.",
    
    motivation: "The motivation came from witnessing how inaccessible the Indian legal system is for non-English speakers and those with limited literacy. I wanted to build a 'Pocket Lawyer'—a tool that empowers people by giving them instant knowledge of their rights. The core philosophy was: 'Justice delayed is justice denied, but justice unknown is even worse.' I wanted to use technology to bridge this information asymmetry.",
    
    features: [
      "Voice-First Interface: Users can speak their queries in Hindi or English instead of typing, making it accessible to the elderly and illiterate.",
      "Multilingual Processing: The AI understands queries in regional languages and responds accordingly.",
      "Legal Text Simplification: Converts complex Sections and Acts into simple, layman terms.",
      "Document Analysis: (Beta) Ability to scan a legal notice and explain what it means.",
      "Contextual Conversation: Remembers previous questions to hold a coherent conversation about a legal case."
    ],
    
    techStackDetails: [
      { category: "Frontend", tools: "Vanilla JavaScript (ES6+), CSS3 for lightweight performance" },
      { category: "AI Model", tools: "Integration with OpenAI API / Custom Prompt Engineering" },
      { category: "Voice APIs", tools: "Web Speech API (Speech-to-Text & Text-to-Speech)" },
      { category: "Deployment", tools: "Vercel / Netlify" }
    ],
    
    challenges: [
      { 
        title: "Hallucination Control", 
        description: "Legal advice must be accurate. Early versions of the bot would invent fake laws. I had to implement strict System Prompts and 'Retrieval Augmented Generation' (RAG) principles to restrict the AI to only verified legal texts." 
      },
      { 
        title: "Voice Recognition Accents", 
        description: "The Web Speech API struggled with heavy Indian accents. I had to implement fallback text input methods and optimize the UI for mixed-input interactions." 
      }
    ],

    impact: [
      "Created a working prototype that simplifies Article 21 and FIR filing procedures.",
      "Demonstrated the potential of AI in civic tech.",
      "Highlighted the need for vernacular datasets in AI training."
    ],

    futurePlans: [
      "RAG Implementation: Connecting the bot to a vector database of actual Supreme Court Judgments.",
      "Lawyer Marketplace: A feature to connect users with real lawyers if the AI cannot solve their query.",
      "WhatsApp Integration: To make it accessible to millions of users without installing an app."
    ]
  },
  {
    id: 4,
    title: "Hyperland Portfolio",
    description: "A highly interactive developer portfolio inspired by Hyperland Linux rices. Features a custom draggable window interface and real-time state management.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/portfolio-showcase.png", 
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