import { Layout } from "../components/Layout";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { Experience } from "../components/Experience";
import { ProjectCard } from "../components/ProjectCard";
import { ContactForm } from "../components/ContactForm";
import { AchievementsSection } from "../components/AchievementsSection";
import { PROJECTS_DATA } from "../lib/data";
import { motion } from "framer-motion";
import { MapPin, Mail, Github, Linkedin, Twitter, Instagram, Youtube, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const updateCount = async () => {
      const WORKER_URL = "https://visitor-counter.sksumitahmed007.workers.dev/";
      const CACHE_KEY = "portfolio_visitor_count";
      const SESSION_KEY = "portfolio_session_counted";

      if (sessionStorage.getItem(SESSION_KEY)) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          setVisitorCount(parseInt(cached, 10));
          return;
        }
      }

      try {
        const res = await fetch(WORKER_URL);
        if (res.ok) {
          const data = await res.json();
          if (data.count) {
            setVisitorCount(data.count);
            localStorage.setItem(CACHE_KEY, data.count.toString());
            sessionStorage.setItem(SESSION_KEY, "true");
            return;
          }
        }
      } catch {
        // Fail silently
      }

      const cached = localStorage.getItem(CACHE_KEY);
      setVisitorCount(cached ? parseInt(cached, 10) : 500);
    };

    updateCount();
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      // ⚡ FIX: Uses dynamic panel color on hover instead of white/5
      className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative z-20 hover:bg-hl-panel border border-transparent hover:border-hl-border"
    >
      {/* ⚡ FIX: Uses dynamic text color (Dark Navy in Light Mode, White in Dark Mode) */}
      <div className="text-hl-muted group-hover:text-hl-text transition-colors">{icon}</div>
      <span className="text-[10px] text-hl-muted font-mono group-hover:text-hl-cyan uppercase tracking-wider">{label}</span>
    </a>
  );

  return (
    <Layout>
      <Hero />
      <div id="about"><AboutSection /></div>
      <SkillsSection />

      <Experience />

      <section id="projects" className="py-20">
        <div className="mb-10 flex items-end gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-hl-text"><span className="text-hl-rose">./</span>Projects</h2>
          <div className="h-px bg-hl-border flex-1 mb-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.5 }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      <AchievementsSection />

      <section id="contact" className="py-20 pb-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-hl-text text-center mb-6">Let's Make Something <span className="text-hl-cyan">Awesome</span> Together!</h2>
          <p className="text-hl-muted text-center max-w-xl mx-auto mb-12 text-lg leading-relaxed">
            Have a crazy idea, a project that needs a spark, or just want to chat about anime & code? <br/><span className="text-hl-rose">Open to freelance work!</span> My inbox is always open. Drop a message and let's create some magic! ✨
          </p>
          <ContactForm />
        </motion.div>
      </section>

      <footer className="py-12 pb-32 xl:pb-12 relative z-30 bg-transparent border-t border-transparent">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 w-full max-w-4xl">
              
              <SocialLink href="https://github.com/sumitahmed" icon={<Github className="w-5 h-5" />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/sk-sumit-ahmed-67a30227b/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
              <SocialLink href="https://x.com/sumitkun_" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
              <SocialLink href="https://www.instagram.com/incel.sumit" icon={<Instagram className="w-5 h-5" />} label="Insta" />
              <SocialLink href="https://www.youtube.com/@emm0rt4l04" icon={<Youtube className="w-5 h-5" />} label="YouTube" />
              
              {/* ✅ FIXED: Converted LeetCode Image to SVG so it colors correctly */}
              <SocialLink 
                href="https://leetcode.com/sumitahmed" 
                icon={
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-1.083-1.65-4.248-2.328-5.752-.605L7.26 7.424l-3.81 4.079c-.742.793-.787 1.958-.166 2.578.583.582 1.636.562 2.41-.167l3.81-4.08 4.27-4.57c.539-.54.539-1.414.003-1.955A1.378 1.378 0 0 0 13.483 0m-2.814 18.57c-2.45.247-4.43-1.326-4.907-3.327-.478-2.001.696-3.921 2.766-4.526 2.07-.605 4.316.634 5.252 2.659.544 1.176.4 2.535-.386 3.588-.787 1.053-2.013 1.606-2.725 1.606" />
                  </svg>
                } 
                label="LeetCode" 
              />

              {/* ✅ FIXED: Converted GFG Image to SVG */}
              <SocialLink 
                href="https://auth.geeksforgeeks.org/user/sumitahmed" 
                icon={
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12.934 1.577C19.333.197 23.63 7.64 22.25 12.87c-1.399 5.289-9.15 7.957-13.784 5.922-3.41-1.498-4.557-6.273-3.21-9.255.97-2.152 3.123-3.398 5.67-3.41-2.923-.046-5.635 2.046-6.096 5.163-.464 3.13 1.353 5.955 4.276 7.027 4.265 1.564 9.172-.64 9.923-4.532.73-3.79-1.983-8.077-6.79-8.775-3.337-.487-7.462.83-9.13 4.116-.583 1.15-.722 2.634.337 3.655 1.29 1.248 3.5.733 3.613-1.127.05-1.22-.72-1.92-1.57-2.223-.7-.25-.89-.09-1.02.13-.19.34.02.82.25 1.05.2.19.64.28.85-.09.13-.23-.07-.49-.17-.55-.13-.08-.34-.05-.44.05-.13.14-.07.35.09.43.14.07.36 0 .39-.17.03-.13-.16-.2-.25-.13-.05.04-.03.14 0 .18.06.05.15 0 .16-.08.01-.06-.08-.1-.13-.05-.02.02-.01.07 0 .09.04.03.09 0 .09-.05 0-.02-.03-.03-.05-.01l-.01.03.03.01.01-.03c-.66.27-.6.98.02 1.3.69.36 1.37-.1 1.41-.83.05-.72-.4-1.29-1.05-1.42-2.31-.46-3.8 2.02-3.03 3.96 1.27 3.23 5.48 4.25 8.71 2.87 4.67-1.98 5.2-7.1 2.94-10.37C19.9 2.11 14.15-.3 10.35 1.43c-3.79 1.73-5.22 6.57-3.9 10.23 1.05 2.92 4.43 4.75 7.6 3.73 3.22-1.03 4.77-4.13 4.19-7.22-.64-3.4-4.2-5.78-7.85-4.82-2.31.6-4 2.5-4.2 4.97-.2 2.47 1.13 4.7 3.28 5.6 2.27.95 5.2.2 6.37-2.07.82-1.57.43-3.23-.73-4.43-.8-.83-1.95-1.2-3.14-1.2-2.3.01-4.22 1.57-4.63 3.7-.35 1.78.6 3.7 2.43 4.47 1.9.8 4.3.1 5.3-1.8.63-1.23.4-2.63-.43-3.66-1.12-1.4-3.32-1.7-4.9-.76-1.5.9-2.22 2.84-1.58 4.5.64 1.66 2.65 2.52 4.3 1.9 1.5-.56 2.2-2.16 1.65-3.6-.4-1.07-1.5-1.7-2.6-1.53-1.08.16-1.8 1.12-1.6 2.18.2 1.07 1.22 1.78 2.3 1.58 1.07-.2 1.7-1.3 1.42-2.33-.26-.95-1.28-1.45-2.2-1.1-.9.35-1.33 1.36-1 2.25.33.88 1.35 1.3 2.2 1 .86-.33 1.27-1.33.92-2.18-.34-.84-1.33-1.23-2.16-.88-.83.35-1.22 1.34-.86 2.17.35.83 1.34 1.2 2.17.85.83-.35 1.2-1.35.85-2.18-.35-.83-1.35-1.2-2.18-.85-.83.35-1.2 1.35-.85 2.18.35.83 1.35 1.2 2.18.85z" />
                  </svg>
                }
                label="GFG" 
              />

              <a href="https://codolio.com/profile/SumitKun" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative z-20 hover:bg-hl-panel border border-transparent hover:border-hl-border">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-hl-muted group-hover:text-hl-text transition-colors"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span className="text-[10px] text-hl-muted font-mono group-hover:text-hl-cyan uppercase tracking-wider">Codolio</span>
              </a>
            </div>

            {/* ✅ FIXED: Footer Borders and Text Colors */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-mono text-hl-muted border-t border-hl-border pt-8 w-full max-w-4xl justify-center relative z-20">
              {/* hover:text-hl-text makes it dark in light mode, white in dark mode */}
              <a href="#contact" onClick={scrollToContact} className="flex items-center gap-2 hover:text-hl-text hover:text-hl-cyan transition-colors cursor-pointer p-2">
                <Mail className="w-4 h-4 text-hl-cyan" /><span>sksumitahmed007@gmail.com</span>
              </a>
              <div className="hidden md:block w-1 h-1 bg-hl-muted/20 rounded-full" />
              <div className="flex items-center gap-2 hover:text-hl-text transition-colors cursor-default">
                <MapPin className="w-4 h-4 text-hl-rose" /><span>Kolkata, India</span>
              </div>
            </div>

            {/* Global Counter */}
            <div className="flex items-center gap-2 text-xs font-mono text-hl-muted mt-4 px-4 py-2">
              <Users className="w-3 h-3 text-hl-cyan" />
              <span>
                VISITORS <span className="text-hl-cyan font-bold tracking-widest">
                  {visitorCount !== null ? `#${visitorCount.toLocaleString()}` : "Loading..."}
                </span>
              </span>
            </div>

            <div className="text-center"><p className="text-xs text-hl-muted/50 font-mono">© 2025 Sumit Ahmed. All rights reserved.</p></div>
        </div>
      </footer>
    </Layout>
  );
}