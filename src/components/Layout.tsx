import { Terminal, Clock, Home, User, Code, Mail, Folder, Wifi, Zap, Activity, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { CyberBackground } from "./CyberBackground";
import { LiveActivity } from "./LiveActivity";
import { EngagementPopup } from "./EngagementPopup";
import { MouseGlow } from "./MouseGlow";

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  spotify?: {
    song: string;
    artist: string;
  } | null;
  listening_to_spotify: boolean;
}

declare global {
  interface Navigator {
    getBattery?: () => Promise<any>;
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState(new Date());
  const [uptime, setUptime] = useState(0); 
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(true);
  const [activeSection, setActiveSection] = useState("#");
  
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });
  
  // ⚡ BLOOM STATE
  const [isBlooming, setIsBlooming] = useState(false);

  const [sumitStatus, setSumitStatus] = useState<'online' | 'idle' | 'dnd' | 'offline'>('offline');
  const [ping, setPing] = useState<number | null>(null);

  const DISCORD_ID = '608572578231091240';

  // 1. Theme Toggle with BLOOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    // 1. Trigger Flash
    setIsBlooming(true);
    
    // 2. Wait 100ms (mid-flash), then swap theme
    setTimeout(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      
      // 3. Fade out flash
      setTimeout(() => {
        setIsBlooming(false);
      }, 300);
    }, 100);
  };

  // 2. Ping
  useEffect(() => {
    const measurePing = async () => {
      if (!navigator.onLine) { setPing(null); return; }
      const start = performance.now();
      try {
        await fetch(window.location.href.split('?')[0] + '?t=' + new Date().getTime(), { 
          method: 'HEAD', cache: 'no-store', mode: 'no-cors' 
        });
        const end = performance.now();
        setPing(Math.round(end - start));
      } catch (e) { setPing(null); }
    };
    measurePing();
    const timer = setInterval(measurePing, 2000); 
    return () => clearInterval(timer);
  }, []);

  // 3. Discord
  useEffect(() => {
    const fetchSumitStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await res.json();
        if (json.success && json.data) {
          setSumitStatus(json.data.discord_status);
        }
      } catch (error) { setSumitStatus('offline'); }
    };
    fetchSumitStatus();
    const interval = setInterval(fetchSumitStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // 4. Clock & Uptime
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setUptime(p => p + 1), 1000); return () => clearInterval(t); }, []);

  // 5. Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#", "#about", "#skills", "#experience", "#projects", "#contact"];
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = section === "#" ? document.body : document.querySelector(section);
        if (element && scrollPosition >= (section === "#" ? 0 : (element as HTMLElement).offsetTop)) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 6. Battery
  useEffect(() => {
    const updateBattery = async () => {
      try {
        if (navigator.getBattery) {
          const battery = await navigator.getBattery();
          if (battery) {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
            battery.addEventListener('levelchange', () => setBatteryLevel(Math.round(battery.level * 100)));
            battery.addEventListener('chargingchange', () => setIsCharging(battery.charging));
          }
        }
      } catch (err) { /* ignore */ }
    };
    updateBattery();
  }, []);

  const navItems = [
    { icon: Home, label: "~", path: "#" },
    { icon: User, label: "~/about", path: "#about" },
    { icon: Code, label: "~/skills", path: "#skills" },
    { icon: Folder, label: "~/experience", path: "#experience" },
    { icon: Folder, label: "~/projects", path: "#projects" },
    { icon: Mail, label: "~/contact", path: "#contact" },
  ];

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-hl-bg text-hl-text relative overflow-hidden selection:bg-hl-cyan/30 selection:text-white font-sans transition-colors duration-500">
      
      {/* ⚡ THE BLOOM OVERLAY */}
      <div 
        className="fixed inset-0 z-[10000] pointer-events-none bg-hl-cyan mix-blend-overlay transition-opacity duration-300 ease-out"
        style={{ opacity: isBlooming ? 0.6 : 0 }}
      />
      <div 
        className="fixed inset-0 z-[10000] pointer-events-none bg-white mix-blend-soft-light transition-opacity duration-300 ease-out"
        style={{ opacity: isBlooming ? 0.8 : 0 }}
      />

      <div className="scanlines opacity-10 pointer-events-none" />
      <div className="noise-overlay opacity-10 pointer-events-none" />
      
      <CyberBackground />
      <MouseGlow /> 

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-9 md:h-10 bg-hl-bg/90 backdrop-blur-md border-b border-hl-border flex items-center px-2 md:px-4 z-50 text-[10px] md:text-xs font-mono select-none transition-colors duration-500">
        
        {/* Left: Identity */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 mr-auto">
          <a href="mailto:sksumitahmed007@gmail.com" className="flex items-center gap-2 hover:text-hl-cyan transition-colors cursor-pointer group">
            <div className="p-1 rounded bg-hl-border group-hover:bg-hl-cyan/20 transition-colors">
              <Terminal className="w-3 h-3 group-hover:text-hl-cyan text-hl-muted" />
            </div>
            <span className="hidden md:block font-bold tracking-tight text-hl-muted group-hover:text-hl-text truncate">
              sksumitahmed007@gmail.com
            </span>
          </a>
        </div>

        {/* Center: Status */}
        <div className="flex justify-center items-center mx-2 flex-1 overflow-hidden min-w-0">
          {sumitStatus !== 'offline' ? (
            <LiveActivity /> 
          ) : (
            <div className="px-2 py-0.5 rounded-full bg-hl-panel border border-hl-border text-hl-muted flex items-center gap-1.5 whitespace-nowrap">
               <Moon className="w-3 h-3" />
               <span className="hidden sm:inline">Sumit is Offline</span>
            </div>
          )}
        </div>

        {/* Right: Modules */}
        <div className="flex items-center gap-1.5 md:gap-3 shrink-0 ml-auto">
          
          {/* ✅ FIXED: BUTTON IS NOW VISIBLE ON MOBILE (Removed 'hidden lg:flex') */}
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-hl-panel border border-hl-border text-hl-muted hover:text-hl-cyan hover:border-hl-cyan/30 transition-all cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
          </button>

          {/* Ping */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-0.5 rounded-full bg-hl-panel border border-hl-border text-hl-muted hover:text-hl-text transition-colors cursor-default" title="Latency">
            <Activity className={`w-3 h-3 ${ping && ping < 100 ? 'text-hl-cyan' : 'text-hl-rose'}`} />
            <span className="tabular-nums">{ping !== null ? `${ping}ms` : '--'}</span>
          </div>

          {/* Uptime */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-0.5 rounded-full bg-hl-panel border border-hl-border text-hl-muted hover:text-hl-text transition-colors cursor-default" title="Uptime">
            <Wifi className="w-3 h-3 text-hl-muted" />
            <span className="tabular-nums">{formatUptime(uptime)}</span>
          </div>

          {/* Battery */}
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-hl-panel border border-hl-border transition-colors cursor-default ${batteryLevel > 80 ? 'text-hl-cyan' : 'text-hl-text'}`} title={`Battery: ${batteryLevel}%`}>
            <Zap className={`w-3 h-3 ${isCharging ? 'fill-current' : ''}`} />
            <span className="tabular-nums">{batteryLevel}%</span>
          </div>
          
          {/* Clock */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-hl-cyan/10 border border-hl-cyan/20 text-hl-cyan cursor-default">
            <Clock className="w-3 h-3" />
            <span className="tabular-nums font-bold">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
          </div>
        </div>
      </header>

      {/* Desktop Vertical Nav */}
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-40">
        {navItems.map((item) => {
          const isActive = activeSection === item.path;
          return (
            <a key={item.label} href={item.path} className={`group relative p-2 rounded-lg transition-all duration-300 hover:bg-hl-panel ${isActive ? 'bg-hl-panel' : ''}`}>
              <item.icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isActive ? 'text-hl-cyan drop-shadow-[0_0_8px_rgba(165,180,252,0.6)]' : 'text-hl-muted group-hover:text-hl-cyan'}`} />
              <span className="absolute left-full ml-4 px-2 py-1 bg-hl-panel border border-hl-border rounded-sm text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-hl-cyan shadow-xl">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      <main className="pt-14 px-4 md:px-8 max-w-7xl mx-auto relative z-10">{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-hl-panel/90 backdrop-blur-xl border border-hl-border rounded-full px-5 py-2.5 flex items-center gap-5 z-50 shadow-2xl xl:hidden">
        {navItems.map((item) => (
          <a key={item.label} href={item.path} className={`p-1.5 rounded-lg transition-all ${activeSection === item.path ? 'text-hl-cyan scale-110 drop-shadow-[0_0_8px_rgba(165,180,252,0.6)]' : 'text-hl-muted hover:text-hl-cyan'}`}>
            <item.icon className="w-4 h-4" />
          </a>
        ))}
      </nav>

      <EngagementPopup />
    </div>
  );
}