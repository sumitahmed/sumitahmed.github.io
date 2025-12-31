import { Button } from "./ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { DraggableWindow } from "./DraggableWindow";

export function Hero() {

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 md:py-20 overflow-hidden">
      
      {/* 🎥 CYBERCORE VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-[#020205]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
        >
          <source src="/cyber-background.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Grid & Vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(165,180,252,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(165,180,252,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-[#020205]" />
      </div>

      <div className="container px-4 md:px-6 relative z-40 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 text-center lg:text-left pt-8 lg:pt-0"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-hl-cyan/5 border border-hl-cyan/20 text-hl-cyan text-[10px] md:text-xs font-mono tracking-widest uppercase backdrop-blur-md rounded-full"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hl-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-hl-cyan"></span>
            </span>
            Open to Work
          </motion.div>

          <div className="space-y-1 md:space-y-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-hl-cyan font-mono text-sm md:text-lg tracking-widest"
            >
              Hello, I'm
            </motion.h2>
            
            {/* NAME HEADER - Scaled down slightly for '100% view' feel */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold font-display leading-tight tracking-tighter text-white"
            >
              SUMIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hl-cyan via-white to-hl-cyan animate-pulse">
                AHMED
              </span>
            </motion.h1>
          </div>

          {/* BIO - UPDATED TEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed mx-auto lg:mx-0 font-mono"
          >
            Full Stack Developer & Student. I build web apps that actually ship and obsess over clean backend architecture & aesthetically pleasing UI. Currently exploring <span className="text-white">DevOps pipelines</span> and <span className="text-white">scalable cloud architectures</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start"
          >
            <Button
              onClick={scrollToProjects}
              className="h-10 md:h-11 px-6 bg-hl-cyan text-black hover:bg-white hover:shadow-[0_0_20px_rgba(165,180,252,0.4)] transition-all font-bold tracking-wide font-display hover:scale-105"
            >
              View Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <a href="/resume.pdf" download="Sumit_Ahmed_CV.pdf">
              <Button
                variant="outline"
                className="h-10 md:h-11 px-6 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-hl-cyan/50 transition-all font-mono hover:scale-105"
              >
                Download CV <Download className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-5 pt-2 text-gray-500 justify-center lg:justify-start"
          >
            {[
              { icon: Github, link: "https://github.com/sumitahmed" },
              { icon: Linkedin, link: "https://www.linkedin.com/in/sk-sumit-ahmed-67a30227b/" },
              { icon: Mail, onClick: scrollToContact }
            ].map((social, idx) => (
              social.link ? (
                <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className="hover:text-hl-cyan hover:drop-shadow-[0_0_8px_rgba(165,180,252,0.8)] transition-all hover:scale-110">
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ) : (
                <button key={idx} onClick={social.onClick} className="hover:text-hl-cyan hover:drop-shadow-[0_0_8px_rgba(165,180,252,0.8)] transition-all cursor-pointer focus:outline-none hover:scale-110">
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile Window */}
        <div className="flex items-center justify-center h-full relative z-10 w-full mt-6 lg:mt-0">
          <div className="w-full max-w-md md:max-w-lg relative">
            
            {/* Holographic Blue Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-hl-cyan/10 blur-[80px] -z-10 rounded-full pointer-events-none animate-pulse"></div>

            <DraggableWindow
              title="user_profile.sh"
              className="w-full border-hl-cyan/30 bg-[#050505]/40 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(165,180,252,0.15)]"
            >
              <div className="flex flex-col items-center gap-5 text-center p-5 md:p-6">
                
                {/* Profile Pic Container */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 group z-10">
                  {/* Rotating Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-hl-cyan/50 shadow-[0_0_20px_rgba(165,180,252,0.4)] animate-[spin_10s_linear_infinite]" />
                  
                  <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white/10">
                    <img
                      src="/profile.jpeg" 
                      alt="Sumit Ahmed"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 contrast-110 brightness-110" 
                      onError={(e) => { 
                        console.error("Image failed to load:", e.currentTarget.src);
                      }}
                    />
                    {/* Subtle Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay" />
                  </div>
                </div>

                <div className="space-y-2 w-full px-2">
                  <div className="flex justify-between text-xs font-mono text-gray-500 border-b border-white/5 pb-2">
                    <span>ROLE</span><span className="text-hl-cyan font-bold tracking-wider">Full Stack Dev</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-gray-500 border-b border-white/5 pb-2">
                    <span>LEVEL</span><span className="text-white font-bold tracking-wider">Shipping Code</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-gray-500 border-b border-white/5 pb-2">
                    <span>LOCATION</span><span className="text-gray-300 font-bold tracking-wider">Remote / On-site</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-gray-500 pt-1">
                    <span>STATUS</span><span className="text-hl-cyan font-bold animate-pulse">Building / Debugging</span>
                  </div>
                </div>

                {/* Terminal Footer */}
                <div className="w-full bg-black/60 rounded p-3 text-left font-mono text-xs space-y-2 border border-white/10 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 animate-[loading_2s_linear_infinite]" />
                  <p className="text-hl-cyan font-bold flex gap-2">
                    $ cat summary.txt
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    I make software come alive. Specializing in transforming raw ideas into live, interactive products.
                  </p>
                  <p className="text-hl-cyan animate-pulse">_</p>
                </div>
              </div>
            </DraggableWindow>
          </div>
        </div>
      </div>
    </section>
  );
}