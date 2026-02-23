import { Button } from "./ui/button";
import { ArrowRight, Download, Github, Linkedin, Youtube, Instagram, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DraggableWindow } from "./DraggableWindow";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

// ==========================================
// CUSTOM ICONS
// ==========================================
const IconX = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const IconDiscord = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.676 4.37a.07.07 0 0 0-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.908 19.908 0 0 0 5.993 3.029.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>;
const IconSpotify = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
const IconSoundCloud = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M11.17 11.3v5.26c0 .17.13.3.3.3h9.87c1.47 0 2.66-1.2 2.66-2.67 0-1.46-1.18-2.65-2.64-2.65h-.54c-.23-2.18-2.07-3.87-4.32-3.87-1.72 0-3.2 1-3.9 2.45-.16.34-.63.51-1.03.35v.83zm-1.8.84v4.71h.9v-5.2c0-.1.08-.18.18-.18s.18.08.18.18v5.2h.9v-4.71c0-.1.08-.18.18-.18s.18.08.18.18v4.71h.9v-5.46c0-.1.08-.18.18-.18s.18.08.18.18v5.46h.9v-4.63c0-.1.08-.18.18-.18s.18.08.18.18v4.63h.9v-4c0-.1.08-.18.18-.18s.18.08.18.18v4h.9v-2.88c0-.1.08-.18.18-.18s.18.08.18.18v2.88h.9v-1.74c0-.1.08-.18.18-.18s.18.08.18.18v1.74h.9v-.7c0-.1.08-.18.18-.18s.18.08.18.18v.7h.9v.08z"/></svg>;
const IconLeetCode = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.386-.552-1.902-.038l-10.1 10.101c-.981.982-1.594 2.384-1.594 3.863s.613 2.881 1.594 3.863l4.332 4.363c1.026 1.026 2.41 1.564 3.847 1.564 1.437 0 2.836-.554 3.847-1.564l2.697-2.606c.514-.515.496-1.367-.038-1.901-.535-.536-1.387-.554-1.901-.039z"/></svg>;

// ==========================================
// LIVE SOCIAL APPS DATA (Authentic Content)
// ==========================================
const SOCIAL_APPS = [
  // 1. PERFECT GITHUB REPLICA (Uses your real GitHub Avatar dynamically)
  { id: 'github', name: 'GitHub', icon: Github, link: 'https://github.com/sumitahmed', brand: 'var(--text-primary)', type: 'github', 
    site: 'GitHub', title: 'sumitahmed - Overview', desc: 'Full-stack dev & OSS enthusiast. sumitahmed has multiple repositories available. Follow their code on GitHub.' },
  
  // 2. REALISTIC URL PREVIEWS (Exactly like Otoneko screenshots)
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/sk-sumit-ahmed-67a30227b/', brand: '#0077b5', type: 'standard', 
    site: 'LinkedIn', title: 'Sumit Ahmed | LinkedIn', desc: 'View Sumit Ahmed’s professional profile on LinkedIn. LinkedIn is the world’s largest business network.' },
  
  { id: 'email', name: 'Email', icon: Mail, link: 'mailto:sksumitahmed007@gmail.com', brand: 'var(--accent-cyan)', type: 'standard', 
    site: 'Mail', title: 'sksumitahmed007@gmail.com', desc: 'Send an email to discuss software engineering opportunities or technical projects.' },
  
  { id: 'twitter', name: 'X', icon: IconX, link: 'https://x.com/sumitkun_', brand: 'var(--text-primary)', type: 'standard', 
    site: 'X (formerly Twitter)', title: 'sumitkun_ (@sumitkun_) / X', desc: 'Full Stack Developer. Building web apps and obsessing over clean backend architecture. Read my latest updates.' },
  
  { id: 'youtube', name: 'YouTube', icon: Youtube, link: 'https://www.youtube.com/@emm0rt4l04', brand: '#FF0000', type: 'standard', 
    site: 'YouTube', title: 'emm0rt4l04 - YouTube', desc: 'Share your videos with friends, family, and the world. Subscribe to emm0rt4l04 for tech and development content.' },
  
  { id: 'instagram', name: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/incel.sumit', brand: '#E1306C', type: 'standard', 
    site: 'Instagram', title: 'Sumit (@incel.sumit) • Instagram', desc: 'Photos, life updates, and behind-the-scenes. See Instagram photos and videos from Sumit.' },
  
  // 3. LIVE LEETCODE API 
  { id: 'leetcode', name: 'LeetCode', icon: IconLeetCode, link: 'https://leetcode.com/u/sumitkun', brand: '#FFA116', type: 'leetcode', 
    site: 'LeetCode', title: 'sumitkun - LeetCode Profile', desc: 'https://leetcode.com/u/sumitkun' },
  
  { id: 'spotify', name: 'Spotify', icon: IconSpotify, link: 'https://open.spotify.com/user/lj0rk6u5zqsepb3yb49j0rnc5?si=91a86da576964592', brand: '#1DB954', type: 'standard', 
    site: 'Spotify', title: 'Spotify – Web Player', desc: 'Listen to my late-night coding playlists and favorite tracks on Spotify. Discover new music.' },
  
  // 4. LIVE DISCORD API
  { id: 'discord', name: 'Discord', icon: IconDiscord, link: 'https://discord.com/users/608572578231091240', brand: '#5865F2', type: 'discord', 
    site: 'Discord', title: 'discord.com', desc: 'https://discord.com/users/608572578231091240' },
  
  { id: 'soundcloud', name: 'SoundCloud', icon: IconSoundCloud, link: 'https://soundcloud.com/immortal_shii', brand: '#ff5500', type: 'standard', 
    site: 'on.soundcloud.com', title: 'immortal_shii | SoundCloud', desc: 'Play immortal_shii on SoundCloud and discover followers on SoundCloud | Stream tracks.' },
];

// ==========================================
// BULLETPROOF PORTAL HOVER CARD 
// ==========================================
const SocialApp = ({ app }: { app: typeof SOCIAL_APPS[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const CARD_WIDTH = 300; 

  const updateCardPosition = useCallback(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const viewportWidth = window.innerWidth;

    // Clamp horizontally so the card never goes off-screen
    let left = iconCenterX - CARD_WIDTH / 2;
    left = Math.max(8, Math.min(left, viewportWidth - CARD_WIDTH - 8));

    setCoords({
      top: rect.top - 12,
      left,
    });
  }, []);

  const handleMouseEnter = () => {
    updateCardPosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverCard = (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed pointer-events-none text-left drop-shadow-2xl"
          style={{
            zIndex: 99999, 
            width: `${CARD_WIDTH}px`,
            top: coords.top,
            left: coords.left,
            transform: 'translateY(-100%)',
          }}
        >
           {/* 1. GITHUB CARD (Perfect Otoneko visual replica using your REAL Avatar) */}
           {app.type === 'github' && (
              <div className="flex flex-col bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden shadow-2xl">
                {/* Dynamically uses your real avatar as the banner so it's not the generic white logo */}
                <div className="w-full h-[120px] bg-[#0d1117] border-b border-[#30363d] relative overflow-hidden">
                   <img src="https://github.com/sumitahmed.png" className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50 scale-110" alt="GitHub Banner Background" />
                   <img src="https://github.com/sumitahmed.png" className="absolute inset-0 w-full h-full object-contain" alt="GitHub Banner" />
                </div>
                <div className="p-4 bg-[#161b22]">
                  <div className="flex items-center gap-1.5 text-[#8b949e] text-xs font-semibold mb-1.5">
                    <app.icon className="w-4 h-4 text-[#c9d1d9]" />
                    {app.site}
                  </div>
                  <h4 className="font-bold text-[#58a6ff] text-[15px] truncate leading-tight mt-1">
                    {app.title}
                  </h4>
                  <p className="text-[#8b949e] text-[13px] leading-snug line-clamp-2 mt-1.5">
                    {app.desc}
                  </p>
                  <p className="text-[#8b949e] text-[12px] mt-2 font-mono truncate opacity-60">
                    {app.link}
                  </p>
                </div>
              </div>
           )}

           {/* 2. LEETCODE CARD (LIVE LEETCARD API) */}
           {app.type === 'leetcode' && (
              <div className="flex flex-col bg-[#282828] rounded-xl border border-[#444] overflow-hidden shadow-2xl">
                <div className="bg-[#1a1a1a] p-2 border-b border-[#444]">
                   <img src="https://leetcard.jacoblin.cool/sumitkun?theme=dark&font=JetBrains%20Mono&ext=heatmap" alt="LeetCode Stats" className="w-full h-auto rounded" />
                </div>
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 text-[#ffa116] text-[11px] font-medium mb-1">
                    <app.icon className="w-3.5 h-3.5" style={{ color: app.brand }} />
                    {app.site}
                  </div>
                  <h4 className="font-bold text-white text-[13px] truncate leading-tight mt-1.5">
                    {app.title}
                  </h4>
                  <p className="text-[#888] text-[11px] font-mono truncate mt-1">
                    {app.desc}
                  </p>
                </div>
              </div>
           )}

           {/* 3. DISCORD CARD (LIVE LANYARD STATUS WIDGET) */}
           {app.type === 'discord' && (
              <div className="flex flex-col bg-[#1e2124] rounded-xl border border-[#36393e] overflow-hidden shadow-2xl">
                <div className="bg-[#282b30] border-b border-[#36393e] p-4 flex justify-center">
                   <img src="https://lanyard.cnrad.dev/api/608572578231091240?theme=dark&bg=transparent&animated=true" alt="Live Discord Status" className="w-full h-auto" />
                </div>
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 text-[#7289da] text-[11px] font-medium mb-1">
                    <app.icon className="w-3.5 h-3.5" style={{ color: app.brand }} />
                    {app.site}
                  </div>
                  <h4 className="font-bold text-white text-[13px] truncate leading-tight mt-1.5">
                    {app.title}
                  </h4>
                  <p className="text-[#8e9297] text-[11px] font-mono truncate mt-1">
                    {app.desc}
                  </p>
                </div>
              </div>
           )}

           {/* 4. STANDARD CARD (AUTHENTIC RAW URL PREVIEW - Matches Otoneko screenshots perfectly) */}
           {app.type === 'standard' && (
              <div className="p-4 flex flex-col bg-[#1e1e2e] dark:bg-[#18181b] rounded-xl border border-[#27272a] shadow-2xl">
                <div className="flex items-center gap-1.5 text-[#a1a1aa] text-[12px] font-medium mb-1.5">
                  <app.icon className="w-3.5 h-3.5" style={{ color: app.brand !== 'var(--text-primary)' ? app.brand : '#fff' }} />
                  {app.site}
                </div>
                <h4 className="font-bold text-white text-[15px] truncate leading-tight hover:underline">
                  {app.title}
                </h4>
                <p className="text-[#a1a1aa] text-[13px] line-clamp-2 mt-1 leading-snug">
                  {app.desc}
                </p>
                <p className="text-[#71717a] text-[12px] font-mono truncate mt-2">
                  {app.link}
                </p>
              </div>
           )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative flex flex-col items-center group cursor-pointer shrink-0">
      
      {createPortal(hoverCard, document.body)}

      <a 
         ref={iconRef}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         href={app.link} 
         target="_blank" 
         rel="noopener noreferrer" 
         className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-hl-border bg-hl-panel flex shrink-0 items-center justify-center transition-all duration-300 hover:-translate-y-2 shadow-lg"
         style={{
            boxShadow: isHovered ? `0 10px 20px -10px ${app.brand}` : undefined,
            borderColor: isHovered ? app.brand : 'var(--border-dim)',
         }}
      >
         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-20 rounded-2xl" />
         <app.icon 
            className="w-5 h-5 md:w-6 md:h-6 transition-colors z-10" 
            style={{ color: isHovered ? app.brand : 'var(--text-muted)' }} 
         />
      </a>
      
      <span className="text-[10px] mt-2 font-mono text-hl-muted opacity-0 group-hover:opacity-100 transition-opacity absolute top-[110%] pointer-events-none whitespace-nowrap">
        {app.name}
      </span>
    </div>
  );
};

// ==========================================
// MAIN HERO COMPONENT
// ==========================================
export function Hero() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' || 'dark';
      setCurrentTheme(theme);
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    updateTheme();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentTheme]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // FULL HEIGHT FLEX-COL SECTION (Pushes Dock to Bottom)
    <section className="relative min-h-[85vh] flex flex-col pt-12 md:pt-20">
      
      {/* 🎥 DYNAMIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-hl-bg transition-colors duration-500 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500"
        >
          <source src={currentTheme === 'dark' ? "/cyber-dark.mp4" : "/cyber-light.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 pointer-events-none opacity-10 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:4px_4px] text-hl-text" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg-primary)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-hl-bg via-transparent to-transparent z-20" />
        <div className={`absolute inset-0 z-0 transition-colors duration-500 ${currentTheme === 'light' ? 'bg-white/5' : 'bg-black/10'}`} />
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col justify-center w-full z-40">
        <div className="container px-4 md:px-6 relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-hl-cyan/5 border border-hl-cyan/20 text-hl-cyan text-[10px] md:text-xs font-mono tracking-widest uppercase backdrop-blur-md rounded-full shadow-lg"
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-bold font-display leading-tight tracking-tighter text-hl-text drop-shadow-lg"
              >
                SUMIT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hl-cyan via-hl-text to-hl-cyan animate-pulse">
                  AHMED
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-lg text-hl-muted max-w-lg leading-relaxed mx-auto lg:mx-0 font-mono drop-shadow-md"
            >
              Full Stack Developer & Student. I build web apps that actually ship and obsess over clean backend architecture & aesthetically pleasing UI. Currently exploring <span className="text-hl-text font-bold">DevOps pipelines</span> and <span className="text-hl-text font-bold">scalable cloud architectures</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start"
            >
              <Button
                onClick={scrollToProjects}
                className="h-10 md:h-11 px-6 bg-hl-cyan text-hl-bg hover:bg-hl-text hover:text-hl-bg hover:shadow-[0_0_20px_rgba(165,180,252,0.4)] transition-all font-bold tracking-wide font-display hover:scale-105"
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="h-10 md:h-11 px-6 border-hl-border text-hl-muted hover:bg-hl-panel hover:text-hl-text hover:border-hl-cyan/50 transition-all font-mono hover:scale-105 backdrop-blur-sm"
                >
                  View Resume <Download className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Profile Window */}
          <div className="flex items-center justify-center relative w-full mt-10 lg:mt-0">
            <div className="w-full max-w-md md:max-w-lg relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-hl-cyan/10 blur-[80px] -z-10 rounded-full pointer-events-none animate-pulse"></div>

              <DraggableWindow
                title="user_profile.sh"
                className="w-full border-hl-cyan/30 bg-hl-panel/60 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(165,180,252,0.25)]"
              >
                <div className="flex flex-col items-center gap-5 text-center p-5 md:p-6">
                  <div className="relative w-28 h-28 md:w-32 md:h-32 group z-10">
                    <div className="absolute inset-0 rounded-full border-2 border-hl-cyan/50 shadow-[0_0_20px_rgba(165,180,252,0.4)] animate-[spin_10s_linear_infinite]" />
                    <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-hl-border">
                      <img
                        src="/profile.jpeg" 
                        alt="Sumit Ahmed"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 contrast-110 brightness-110" 
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_3px] pointer-events-none mix-blend-overlay" />
                    </div>
                  </div>

                  <div className="space-y-2 w-full px-2">
                    <div className="flex justify-between text-xs font-mono text-hl-muted border-b border-hl-border pb-2">
                      <span>ROLE</span><span className="text-hl-cyan font-bold tracking-wider">Full Stack Dev</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-hl-muted border-b border-hl-border pb-2">
                      <span>LEVEL</span><span className="text-hl-text font-bold tracking-wider">Shipping Code</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-hl-muted border-b border-hl-border pb-2">
                      <span>LOCATION</span><span className="text-hl-text/80 font-bold tracking-wider">Remote / On-site</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-hl-muted pt-1">
                      <span>STATUS</span><span className="text-hl-cyan font-bold animate-pulse">Building / Debugging</span>
                    </div>
                  </div>

                  <div className="w-full bg-hl-card/80 rounded p-3 text-left font-mono text-xs space-y-2 border border-hl-border shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-hl-text/20 animate-[loading_2s_linear_infinite]" />
                    <p className="text-hl-cyan font-bold flex gap-2">
                      $ cat summary.txt
                    </p>
                    <p className="text-hl-muted leading-relaxed">
                      I make software come alive. Specializing in transforming raw ideas into live, interactive products.
                    </p>
                    <p className="text-hl-cyan animate-pulse">_</p>
                  </div>
                </div>
              </DraggableWindow>
            </div>
          </div>

        </div>
      </div>

      {/* 3. DOCK ROW (100% Width at the Absolute Bottom Footer) */}
      <div className="w-full relative z-50 mt-16 pb-8 border-t border-hl-border/30 bg-gradient-to-t from-hl-bg to-transparent pt-4">
        <div className="container px-4 md:px-6 flex justify-center lg:justify-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-full" 
          >
            {/* 100% width ensures all apps fit horizontally. Padding prevents any bottom slicing */}
            <div 
              className="flex flex-nowrap items-center gap-3 md:gap-4 overflow-x-auto w-full pt-4 pb-12 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
              
              {SOCIAL_APPS.map((app) => (
                <SocialApp key={app.id} app={app} />
              ))}
              
              {/* Invisible spacer prevents the final icon from hitting screen edges on small devices */}
              <div className="w-4 shrink-0" />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}