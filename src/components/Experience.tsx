import { motion } from "framer-motion";
import { Instagram, Youtube, Smartphone, Monitor, Zap, Layers, Briefcase } from "lucide-react";
import { Button } from "./ui/button";

export function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      
      {/* 1. Main Section Header */}
      <div className="mb-12 relative z-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
          <span className="text-hl-cyan">~/</span> experience
        </h2>
      </div>

      <div className="relative max-w-3xl mx-auto">
        
        {/* 2. Sub-heading: Made brighter (gray-400) so it's readable but still 'comment style' */}
        <div className="relative z-10 mb-8 text-center md:text-left">
            <span className="text-gray-400 font-mono text-sm tracking-wide">
                {"// Before dev, I used to do this..."}
            </span>
        </div>

        {/* 🧵 THE STRING (Neon Line Behind) */}
        <div className="absolute left-1/2 top-10 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-hl-cyan/30 to-transparent z-0" />

        <div className="space-y-16 relative z-10">
          
          {/* WINDOW 1: MOBILE ERA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5 } 
            }}
            className="flex flex-col items-center"
          >
            {/* The Window Card */}
            <div className="w-full max-w-xl relative rounded-lg border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Window Title Bar */}
              <div className="h-9 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 select-none">
                <span className="text-[10px] font-mono text-hl-muted flex items-center gap-2">
                  <Smartphone className="w-3 h-3 text-blue-400" />
                  ~/creative/mobile
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Mobile Video Editor</h3>
                    <p className="text-xs font-mono text-blue-400/80 mt-1">2018 - 2022</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 border-l-2 border-blue-500/20 pl-3 leading-relaxed font-mono">
                  I used to edit and post edits on Insta and YouTube. Purely for fun and learning the basics of composition.
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Alight Motion", "PicsArt", "KineMaster", "InShot", "VideoStar", "CapCut"].map(t => (
                    <span key={t} className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* WINDOW 2: FREELANCE ERA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            animate={{ y: [0, -5, 0] }}
            className="flex flex-col items-center"
          >
             {/* Connector Dot */}
            <div className="w-4 h-4 bg-[#0a0a0a] rounded-full border-[3px] border-hl-cyan mb-6 shadow-[0_0_15px_rgba(6,182,212,0.6)] z-20 relative" />

            {/* The Window Card */}
            <div className="w-full max-w-xl relative rounded-lg border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Window Title Bar */}
              <div className="h-9 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 select-none">
                <span className="text-[10px] font-mono text-hl-muted flex items-center gap-2">
                  <Monitor className="w-3 h-3 text-pink-500" />
                  ~/creative/pro
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-pink-500 transition-colors">
                      Freelance Video Editor & Content Creator
                    </h3>
                    <p className="text-xs font-mono text-pink-500/80 mt-1 flex items-center gap-2">
                      <Briefcase className="w-3 h-3" /> Self-Employed | 2020 – 2024
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <div className="text-sm text-gray-400 border-l-2 border-pink-500/20 pl-3 space-y-3 font-mono">
                    <div>
                      <span className="text-pink-400 opacity-80">Freelance Services:</span> Managed a freelance video editing operation, delivering high-quality commissions for clients and meeting strict project deadlines.
                    </div>
                    <div>
                      <span className="text-pink-400 opacity-80">Brand & Portfolio:</span> Founded and grew a personal brand (@emmort4l), leveraging advanced editing skills to build an engaged audience.
                    </div>
                </div>

                {/* Stack */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-hl-muted uppercase">
                    <Layers className="w-3 h-3" /> Software
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["After Effects", "Photoshop", "Premiere Pro", "Blender"].map(t => (
                      <span key={t} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-gray-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Plugins */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-pink-400/80 uppercase">
                    <Zap className="w-3 h-3" /> Plugins
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Twixtor", "Twitch", "Sapphire", "RSMB", "Glitchify", "Omnio", "BCC", "Saber"].map(p => (
                      <span key={p} className="px-1.5 py-0.5 rounded-sm bg-pink-500/10 border border-pink-500/20 text-[10px] text-pink-300 font-mono">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LINKS SECTION */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/10 hover:bg-pink-500/10 hover:text-pink-400 hover:border-pink-500/50 h-8 text-xs font-mono"
                    onClick={() => window.open("https://www.instagram.com/emmort4l/", "_blank")}
                  >
                    <Instagram className="w-3.5 h-3.5 mr-2" /> Instagram (11k+)
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 h-8 text-xs font-mono"
                    onClick={() => window.open("https://www.youtube.com/@emm0rt4l04", "_blank")}
                  >
                    <Youtube className="w-3.5 h-3.5 mr-2" /> YouTube (500+)
                  </Button>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}