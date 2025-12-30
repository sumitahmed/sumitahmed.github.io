import { Terminal, Clock, Home, User, Code, Mail, Folder, Music, Wifi, Zap, Activity, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { CyberBackground } from "./CyberBackground";
import { LiveActivity } from "./LiveActivity";
import { EngagementPopup } from "./EngagementPopup";
import { MouseGlow } from "./MouseGlow"; // 👈 NEW IMPORT

// Define Interface for Lanyard (Discord Status)
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
  
  const [sumitStatus, setSumitStatus] = useState<'online' | 'idle' | 'dnd' | 'offline'>('offline');
  const [ping, setPing] = useState<number | null>(null);
  const [lastPlayed, setLastPlayed] = useState<{song: string, artist: string} | null>(null);
  const [isListeningNow, setIsListeningNow] = useState(false);

  const DISCORD_ID = '608572578231091240';

  // --- EFFECT: Strict Network Ping (Latency) ---
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

  // --- EFFECT: Fetch Sumit's Discord Status ---
  useEffect(() => {
    const cached = localStorage.getItem('last_played_song');
    if (cached) setLastPlayed(JSON.parse(cached));

    const fetchSumitStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await res.json();
        if (json.success && json.data) {
          const data: LanyardData = json.data;
          setSumitStatus(data.discord_status);
          setIsListeningNow(data.listening_to_spotify);
          if (data.spotify) {
            const songData = { song: data.spotify.song, artist: data.spotify.artist };
            setLastPlayed(songData);
            localStorage.setItem('last_played_song', JSON.stringify(songData));
          }
        }
      } catch (error) { setSumitStatus('offline'); }
    };
    fetchSumitStatus();
    const interval = setInterval(fetchSumitStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Clock Timer
  useEffect(() => { 
    const t = setInterval(() => setTime(new Date()), 1000); 
    return () => clearInterval(t); 
  }, []);
  
  // Uptime Timer
  useEffect(() => { 
    const t = setInterval(() => setUptime(p => p + 1), 1000); 
    return () => clearInterval(t); 
  }, []);

  // Scroll Spy
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

  // Battery API
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

  const getBatteryColor = () => {
    if (batteryLevel > 80) return "text-hl-cyan";
    if (batteryLevel > 20) return "text-white";   
    return "text-hl-rose";
  };

  return (
    <div className="min-h-screen bg-hl-bg text-gray-100 relative overflow-hidden selection:bg-hl-cyan/30 selection:text-white">
      
      {/* 🔮 VISUAL LAYERS */}
      <div className="scanlines opacity-20 pointer-events-none" />
      <div className="noise-overlay opacity-20 pointer-events-none" />
      
      <CyberBackground />
      <MouseGlow /> {/* 👈 Added the glowing light tracker */}

      {/* Header / System Bar */}
      <header className="fixed top-0 left-0 right-0 h-10 bg-[#020205]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50 text-xs font-mono select-none">
        
        {/* Left: Identity */}
        <div className="flex items-center gap-4">
          <a href="mailto:sksumitahmed007@gmail.com" className="flex items-center gap-2 hover:text-hl-cyan transition-colors cursor-pointer group">
            <div className="p-1 rounded bg-white/5 group-hover:bg-hl-cyan/20 transition-colors">
              <Terminal className="w-3.5 h-3.5 group-hover:text-hl-cyan" />
            </div>
            <span className="font-bold tracking-tight text-hl-muted group-hover:text-white">sksumitahmed007@gmail.com</span>
          </a>
        </div>

        {/* Center: System Status */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {sumitStatus !== 'offline' ? (
            <LiveActivity /> 
          ) : (
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-hl-muted flex items-center gap-2">
               <Moon className="w-3 h-3" />
               <span>System Offline</span>
            </div>
          )}
        </div>

        {/* Right: Modules */}
        <div className="flex items-center gap-3">
          
          {!isListeningNow && lastPlayed && (
            <div 
              className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-hl-cyan/30 transition-colors group cursor-default"
            >
              <Music className="w-3 h-3 text-hl-muted group-hover:text-hl-cyan" />
              <span className="text-gray-500 max-w-[150px] truncate group-hover:text-white transition-colors">
                {lastPlayed.song}
              </span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-hl-muted hover:text-white transition-colors cursor-default" title="Latency">
            <Activity className={`w-3 h-3 ${ping && ping < 100 ? 'text-hl-cyan' : 'text-hl-rose'}`} />
            <span className="tabular-nums">{ping !== null ? `${ping}ms` : '--'}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-hl-muted hover:text-white transition-colors cursor-default" title="Uptime">
            <Wifi className="w-3 h-3 text-hl-muted" />
            <span className="tabular-nums">{formatUptime(uptime)}</span>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 transition-colors cursor-default ${getBatteryColor()}`} title={`Battery: ${batteryLevel}%`}>
            <Zap className={`w-3 h-3 ${isCharging ? 'fill-current' : ''}`} />
            <span className="tabular-nums">{batteryLevel}%</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-hl-cyan/10 border border-hl-cyan/20 text-hl-cyan cursor-default">
            <Clock className="w-3 h-3" />
            <span className="tabular-nums font-bold">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
          </div>
        </div>
      </header>

      {/* Desktop Vertical Nav */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-40">
        {navItems.map((item) => {
          const isActive = activeSection === item.path;
          return (
            <a key={item.label} href={item.path} className={`group relative p-2 rounded-lg transition-all duration-300 hover:bg-white/5 ${isActive ? 'bg-white/5' : ''}`}>
              <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-hl-cyan drop-shadow-[0_0_8px_rgba(165,180,252,0.6)]' : 'text-hl-muted group-hover:text-hl-cyan'}`} />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-2 py-1 bg-hl-panel border border-white/10 rounded-sm text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-hl-cyan shadow-xl">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      <main className="pt-16 px-4 md:px-8 max-w-7xl mx-auto relative z-10">{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-hl-panel/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 z-50 shadow-2xl xl:hidden">
        {navItems.map((item) => (
          <a key={item.label} href={item.path} className={`p-2 rounded-lg transition-all ${activeSection === item.path ? 'text-hl-cyan scale-110 drop-shadow-[0_0_8px_rgba(165,180,252,0.6)]' : 'text-hl-muted hover:text-hl-cyan'}`}>
            <item.icon className="w-5 h-5" />
          </a>
        ))}
      </nav>

      <EngagementPopup />
    </div>
  );
}