import { Button } from "./ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
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
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        >
          <source src="/sakura-petals.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container px-4 md:px-6 relative z-40 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center lg:text-left pt-10 lg:pt-0"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hl-cyan/10 border border-hl-cyan/20 text-hl-cyan text-xs font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hl-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-hl-cyan"></span>
            </span>
            Open to Work
          </motion.div>

          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-hl-cyan font-mono text-lg"
            >
              Hello, I'm
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
            >
              SUMIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hl-rose to-hl-cyan">
                AHMED
              </span>
            </motion.h1>
          </div>

          {/* 👇 UPDATED BIO */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-hl-muted max-w-lg leading-relaxed mx-auto lg:mx-0"
          >
            Full Stack Developer & Student. I build web apps that actually ship, fix the bugs I create, and obsess over clean backend architecture & aesthetically pleasing UI. Currently exploring agentic AI workflows and scalable cloud architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start"
          >
            <Button
              onClick={scrollToProjects}
              className="h-12 px-6 hover:scale-105 transition-transform"
            >
              View Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <a href="/resume.pdf" download="Sumit_Ahmed_CV.pdf">
              <Button
                variant="outline"
                className="h-12 px-6 hover:scale-105 transition-transform"
              >
                Download CV <Download className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 pt-4 text-hl-muted justify-center lg:justify-start"
          >
            <a href="https://github.com/sumitahmed" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/sk-sumit-ahmed-67a30227b/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
            <button onClick={scrollToContact} className="hover:text-white hover:scale-110 transition-all cursor-pointer focus:outline-none">
              <Mail className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right: Profile Window */}
        <div className="flex items-center justify-center h-full relative z-10 w-full mt-8 lg:mt-0">
          <div className="w-full max-w-lg relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] bg-gradient-to-br from-hl-cyan/30 via-transparent to-hl-rose/30 blur-[50px] -z-10 rounded-xl opacity-50 pointer-events-none"></div>

            <DraggableWindow
              title="user_profile.sh"
              className="[&>div]:!shadow-[0_0_80px_-15px_rgba(6,182,212,0.15),0_0_80px_-15px_rgba(244,63,94,0.15)] w-full"
            >
              <div className="flex flex-col items-center gap-6 text-center p-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(244,114,182,0.45)] group z-10">
                  <img
                    src="/profile.jpg"
                    alt="Sumit Ahmed"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.src = "https://github.com/sumitahmed.png"; }}
                  />
                </div>

                <div className="space-y-2 w-full px-2">
                  <div className="flex justify-between text-xs font-mono text-hl-muted border-b border-white/5 pb-2">
                    <span>ROLE</span><span className="text-hl-cyan font-bold">Full Stack Dev</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-hl-muted border-b border-white/5 pb-2">
                    <span>LEVEL</span><span className="text-hl-rose font-bold">Shipping Code</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-hl-muted border-b border-white/5 pb-2">
                    <span>LOCATION</span><span className="text-hl-moss font-bold">Remote / On-site / Freelance</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-hl-muted pt-1">
                    <span>STATUS</span><span className="text-green-400 font-bold animate-pulse">Building / Debugging</span>
                  </div>
                </div>

                <div className="w-full bg-black/40 rounded p-3 text-left font-mono text-xs space-y-1 border border-white/5">
                  <p className="text-green-400 font-bold">$ cat summary.txt</p>
                  <p className="text-hl-muted">
                    I make software come alive. Specializing in transforming raw ideas into live, interactive products.
                  </p>
                  <p className="text-green-400 animate-pulse">_</p>
                </div>
              </div>
            </DraggableWindow>
          </div>
        </div>
      </div>
    </section>
  );
}