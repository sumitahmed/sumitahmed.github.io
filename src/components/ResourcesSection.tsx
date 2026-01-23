import { motion } from "framer-motion";
import { Book, Cpu, Monitor, Keyboard, Mouse, Laptop, Terminal, Database, Code2, Server, Cloud, Table, ArrowRight } from "lucide-react";

export function ResourcesSection() {
  
  // 1. HERO RESOURCE (DSA)
  const dsaResource = {
    title: "The Ultimate DSA & CP Protocol",
    description: "My personalized Data Structures & Algorithms roadmap. A curated mix of LeetCode, Striver's SDE Sheet, and fundamental elementary problems. Built for clarity and pattern recognition.",
    link: "https://chatter-tail-e98.notion.site/DSA-CP-Lists-2f135b99f24c8027af89df4ea636f825",
    tags: ["Notion", "Algorithms", "Interview Prep"]
  };

  // 2. OTHER NOTION RESOURCES
  const otherResources = [
    { 
      name: "Placement Prep Hub", 
      desc: "Complete guide for campus placements", 
      icon: <Book className="w-4 h-4 text-pink-400" />,
      link: "https://chatter-tail-e98.notion.site/PLACEMENT-PREPARATION-HUB-2d335b99f24c80b6925aee4badeace63?pvs=74"
    },
    { 
      name: "Java Mastery Notes", 
      desc: "GFG & Deep Dive Java concepts", 
      icon: <Code2 className="w-4 h-4 text-orange-400" />,
      link: "https://chatter-tail-e98.notion.site/GFG-and-other-JAVA-NOTES-21e35b99f24c804b9744d22e240db5f5?pvs=73"
    },
  ];

  // 3. TOOLS (Software)
  const devTools = [
    { name: "VS Code", desc: "My Editor (Extensions & Snippets)", icon: <Terminal className="w-4 h-4 text-blue-400" /> },
    { name: "Postman", desc: "API Testing & Documentation", icon: <Server className="w-4 h-4 text-orange-500" /> },
    { name: "Cloudinary / Cloudflare", desc: "CDN & Media Management", icon: <Cloud className="w-4 h-4 text-sky-400" /> },
    { name: "MySQL / PostgreSQL", desc: "Relational Databases", icon: <Table className="w-4 h-4 text-indigo-400" /> },
  ];

  // 4. HARDWARE / GEAR
  const gear = [
    { name: "Asus Vivobook 16X", desc: "Ryzen 5 5600H, Vega 7", icon: <Laptop className="w-5 h-5" /> },
    { name: "EvoFox Ronin", desc: "Wired Mechanical ❤️", icon: <Keyboard className="w-5 h-5" /> },
    { name: "Logitech M90", desc: "Wired Optical Mouse", icon: <Mouse className="w-5 h-5" /> },
    { name: "Foldable Desk", desc: "Minimalist Setup", icon: <Monitor className="w-5 h-5" /> },
  ];

  return (
    <section className="py-20 relative">
      <div className="mb-10 flex items-end gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-hl-text">
          <span className="text-hl-rose">./</span>Resources
        </h2>
        <div className="h-px bg-hl-border flex-1 mb-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: RESOURCES */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* HERO CARD */}
           <motion.a 
             href={dsaResource.link}
             target="_blank"
             rel="noopener noreferrer"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="group relative block rounded-2xl border border-hl-border bg-hl-panel p-8 overflow-hidden transition-all hover:border-hl-cyan/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
           >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Book className="w-32 h-32 text-hl-cyan rotate-12" />
              </div>
              
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hl-cyan/10 text-hl-cyan text-xs font-mono mb-4 border border-hl-cyan/20">
                     <Database className="w-3 h-3" /> FLAGSHIP RESOURCE
                  </div>
                  <h3 className="text-2xl font-bold text-hl-text mb-3 group-hover:text-hl-cyan transition-colors">
                    {dsaResource.title}
                  </h3>
                  <p className="text-hl-muted leading-relaxed max-w-lg">
                    {dsaResource.description}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-mono text-hl-cyan">
                   <span>Open Notion List</span>
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
           </motion.a>

           {/* SECONDARY RESOURCES GRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherResources.map((res, i) => (
                <motion.a
                  key={i}
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col p-5 rounded-xl border border-hl-border bg-hl-card hover:bg-hl-panel hover:border-hl-cyan/30 transition-all group"
                >
                   <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-hl-bg border border-hl-border group-hover:border-hl-cyan/20 transition-colors">
                        {res.icon}
                      </div>
                      <ArrowRight className="w-3 h-3 text-hl-muted group-hover:text-hl-cyan -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                   </div>
                   <h4 className="font-bold text-hl-text group-hover:text-hl-cyan transition-colors">{res.name}</h4>
                   <p className="text-xs text-hl-muted mt-1">{res.desc}</p>
                </motion.a>
              ))}
           </div>
        </div>

        {/* RIGHT COLUMN: STACK & GEAR */}
        <div className="space-y-6">
            
            {/* Dev Tools */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-hl-border bg-hl-card p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-mono text-hl-muted uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Tools & Stack
                    </h4>
                    <a href="#skills" className="text-[10px] text-hl-cyan hover:underline cursor-pointer">
                      View Full Stack {'->'}
                    </a>
                </div>
                
                <div className="space-y-3">
                    {devTools.map((tool, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                {tool.icon}
                                <span className="text-hl-text font-medium text-sm">{tool.name}</span>
                            </div>
                            <span className="text-xs text-hl-muted/60 font-mono hidden sm:block">{tool.desc}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Hardware */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-hl-border bg-hl-card p-6"
            >
                <h4 className="text-sm font-mono text-hl-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Cpu className="w-4 h-4" /> Hardware / Gear
                </h4>
                <div className="space-y-3">
                    {gear.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                             <div className="flex items-center gap-3 text-hl-muted">
                                {item.icon}
                                <span className="text-hl-text font-medium text-sm">{item.name}</span>
                            </div>
                            <span className="text-xs text-hl-muted/60 font-mono">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}