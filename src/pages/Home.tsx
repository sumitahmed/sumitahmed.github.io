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
  // Start with a fallback number so it doesn't look empty while loading
  const [visitorCount, setVisitorCount] = useState(355);

  // ⚡ GLOBAL VISITOR COUNTER LOGIC (FIXED)
  useEffect(() => {
    const updateCount = async () => {
      const namespace = "sumitahmed.github.io";
      const key = "visits";
      const timestamp = new Date().getTime(); // 👈 Cache Buster

      try {
        // 1. Try to INCREMENT with Anti-Cache Timestamp
        const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up?t=${timestamp}`, {
          cache: "no-store", 
          headers: { "Content-Type": "application/json" }
        });
        
        if (response.ok) {
          const data = await response.json();
          setVisitorCount(data.count);
        } else {
          // 2. If blocked (Rate Limit/Same IP), just READ the value (also with timestamp)
          console.warn("Counter increment blocked (Rate Limit), fetching current count...");
          const getRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}?t=${timestamp}`, {
            cache: "no-store"
          });
          
          if (getRes.ok) {
            const data = await getRes.json();
            setVisitorCount(data.count);
          }
        }
      } catch (error) {
        console.error("Counter Error:", error);
      }
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
      className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative z-20 hover:bg-white/5"
    >
      <div className="text-hl-muted group-hover:text-white transition-colors">{icon}</div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white"><span className="text-hl-rose">./</span>Projects</h2>
          <div className="h-px bg-white/10 flex-1 mb-4" />
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
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">Let's Make Something <span className="text-hl-cyan">Awesome</span> Together!</h2>
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
              <SocialLink href="https://leetcode.com/sumitahmed" icon={<img src="https://cdn.simpleicons.org/leetcode/ffffff" alt="LeetCode" className="w-5 h-5 opacity-80" />} label="LeetCode" />
              <SocialLink href="https://auth.geeksforgeeks.org/user/sumitahmed" icon={<img src="https://cdn.simpleicons.org/geeksforgeeks/ffffff" alt="GFG" className="w-5 h-5 opacity-80" />} label="GFG" />
              <a href="https://codolio.com/profile/SumitKun" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative z-20 hover:bg-white/5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-hl-muted group-hover:text-white transition-colors"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span className="text-[10px] text-hl-muted font-mono group-hover:text-hl-cyan uppercase tracking-wider">Codolio</span>
              </a>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-sm font-mono text-hl-muted border-t border-white/5 pt-8 w-full max-w-4xl justify-center relative z-20">
              <a href="#contact" onClick={scrollToContact} className="flex items-center gap-2 hover:text-white hover:text-hl-cyan transition-colors cursor-pointer p-2">
                <Mail className="w-4 h-4 text-hl-cyan" /><span>sksumitahmed007@gmail.com</span>
              </a>
              <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <MapPin className="w-4 h-4 text-hl-rose" /><span>Kolkata, India</span>
              </div>
            </div>

            {/* ✅ FIXED GLOBAL COUNTER */}
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-4 px-4 py-2">
              <Users className="w-3 h-3 text-hl-cyan" />
              <span>VISITORS <span className="text-hl-cyan font-bold tracking-widest">#{visitorCount.toLocaleString()}</span></span>
            </div>

            <div className="text-center"><p className="text-xs text-hl-muted/50 font-mono">© 2025 Sumit Ahmed. All rights reserved.</p></div>
        </div>
      </footer>
    </Layout>
  );
}