import { TerminalWidget } from "./TerminalWidget";
import { motion } from "framer-motion";
import { 
  Code2, 
  LayoutTemplate, 
  Database, 
  Palette 
} from "lucide-react";

export function SkillsSection() {
  
  // Helper to get SimpleIcons URL
  const simpleIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;
  
  // Helper to get DevIcon URL (for colorful originals like Photoshop/CSS)
  const devIcon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;

  const skills = [
    {
      category: "Languages",
      icon: Code2,
      color: "text-hl-rose",
      items: [
        { name: "C", url: simpleIcon("c") },
        { name: "C++", url: simpleIcon("cplusplus") },
        { name: "Java", url: devIcon("java/java-original") },
        { name: "Python", url: devIcon("python/python-original") },
        { name: "JavaScript", url: simpleIcon("javascript") },
        { name: "TypeScript", url: simpleIcon("typescript") },
      ]
    },
    {
      category: "Frontend",
      icon: LayoutTemplate,
      color: "text-hl-cyan",
      items: [
        { name: "React.js", url: simpleIcon("react") },
        { name: "Next.js", url: simpleIcon("nextdotjs") },
        { name: "HTML5", url: simpleIcon("html5") },
        // ✅ Switched to DevIcon for guaranteed colorful CSS3
        { name: "CSS3", url: devIcon("css3/css3-original") },
        { name: "Tailwind", url: simpleIcon("tailwindcss") },
        { name: "Framer Motion", url: simpleIcon("framer") },
      ]
    },
    {
      category: "Backend & Database",
      icon: Database,
      color: "text-hl-moss",
      items: [
        { name: "Node.js", url: simpleIcon("nodedotjs") },
        { name: "Express.js", url: simpleIcon("express") },
        { name: "Flask", url: simpleIcon("flask") },
        { name: "FastAPI", url: simpleIcon("fastapi") },
        { name: "MongoDB", url: simpleIcon("mongodb") },
        { name: "MySQL", url: simpleIcon("mysql") },
        { name: "PostgreSQL", url: simpleIcon("postgresql") },
        { name: "JWT", url: simpleIcon("jsonwebtokens") },
      ]
    },
    {
      category: "Tools, Cloud & Design",
      icon: Palette,
      color: "text-purple-400",
      items: [
        { name: "Linux", url: simpleIcon("linux") },
        { name: "Git", url: simpleIcon("git") },
        { name: "VS Code", url: devIcon("vscode/vscode-original") },
        { name: "NeoVim", url: simpleIcon("neovim") },
        { name: "Postman", url: simpleIcon("postman") },
        { name: "Cloudinary", url: simpleIcon("cloudinary") },
        { name: "Vercel", url: simpleIcon("vercel") },
        { name: "Figma", url: simpleIcon("figma") },
        // ✅ Switched to DevIcon to fix "Adobe" blocking issues
        { name: "After Effects", url: devIcon("aftereffects/aftereffects-original") },
        { name: "Photoshop", url: devIcon("photoshop/photoshop-original") },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="mb-12 flex items-end gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          <span className="text-hl-cyan">./</span>Skills
        </h2>
        <div className="h-px bg-white/10 flex-1 mb-4" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((stack, i) => (
          <motion.div
            key={stack.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="h-full"
          >
            <TerminalWidget 
              title={stack.category.toLowerCase().replace(/[, &]+/g, "_")} 
              className="h-full min-h-[240px] hover:border-hl-cyan/30 transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                {/* Header with Icon */}
                <div className={`flex items-center gap-3 mb-6 ${stack.color}`}>
                  <div className="p-2 rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                    <stack.icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-lg tracking-wide">{stack.category}</span>
                </div>

                {/* Skill Tags with MIXED CDNs for Reliability */}
                <div className="flex flex-wrap gap-2.5">
                  {stack.items.map((item) => (
                    <span 
                      key={item.name} 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 text-hl-muted text-sm font-mono rounded-md hover:bg-white/10 hover:text-white hover:border-hl-cyan/30 transition-all cursor-default group/tag"
                    >
                      {/* Logo Image */}
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-3.5 h-3.5 transition-all group-hover/tag:brightness-125 object-contain" 
                        loading="lazy"
                      />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </TerminalWidget>
          </motion.div>
        ))}
      </div>
    </section>
  );
}