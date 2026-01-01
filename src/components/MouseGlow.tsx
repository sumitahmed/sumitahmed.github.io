import { useEffect, useRef, useState } from "react";

// --- PHYSICS CONFIG ---
const GRAVITY = 0.6;
const DAGGER_GRAVITY = 0.05; 
const FRICTION = 0.8;       
const ROTATION_DRAG = 0.96; 
const SWING_FORCE = 0.8;    

// CHAIN CONFIG
const CHAIN1_LINKS = 18;    
const CHAIN1_SIZE = 9;      
const CHAIN2_LINKS = 12;    
const CHAIN2_SIZE = 7;      

export function MouseGlow() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // --- PHYSICS STATE ---
  // Start in center of screen to avoid corner glitching
  const mouse = useRef({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0, 
    prevX: 0, 
    prevY: 0 
  });
  
  const dagger = useRef({ angle: Math.PI / 2, angularVel: 0 }); 
  
  const chain1 = useRef(
    Array.from({ length: CHAIN1_LINKS }).map(() => ({ x: 0, y: 0, oldX: 0, oldY: 0 }))
  );
  
  const chain2 = useRef(
    Array.from({ length: CHAIN2_LINKS }).map(() => ({ x: 0, y: 0, oldX: 0, oldY: 0 }))
  );

  const [isCharged, setIsCharged] = useState(false);
  const [, setTick] = useState(0); // Force re-render

  // 1. THEME OBSERVER
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' || 'dark';
      setTheme(currentTheme);
    };
    
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    updateTheme(); 

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 2. INPUT TRACKING (MOUSE & TOUCH)
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // 📱 MOBILE FIX: Touch Listeners
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent scrolling if you want full dagger control, or remove preventDefault to allow scroll
      // e.preventDefault(); 
      const touch = e.touches[0];
      mouse.current.x = touch.clientX;
      mouse.current.y = touch.clientY;
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      setIsCharged(true);
      setTimeout(() => setIsCharged(false), 400); 
      dagger.current.angularVel += 0.8; 
    };

    // Add both Mouse and Touch listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("contextmenu", handleRightClick);

    // 3. PHYSICS LOOP
    const loop = () => {
      const vx = mouse.current.x - mouse.current.prevX;
      const vy = mouse.current.y - mouse.current.prevY;
      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;

      const restingAngle = Math.PI / 2;
      const force = Math.sin(restingAngle - dagger.current.angle) * DAGGER_GRAVITY;
      dagger.current.angularVel += force;

      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
         dagger.current.angularVel -= (vx * 0.003) * SWING_FORCE;
      }

      dagger.current.angle += dagger.current.angularVel;
      dagger.current.angularVel *= ROTATION_DRAG; 

      updateChain(chain1.current, CHAIN1_LINKS, CHAIN1_SIZE, 0.9, mouse.current.x, mouse.current.y);
      
      const daggerLen = 14; 
      const pommelX = mouse.current.x + Math.cos(dagger.current.angle) * daggerLen;
      const pommelY = mouse.current.y + Math.sin(dagger.current.angle) * daggerLen;
      updateChain(chain2.current, CHAIN2_LINKS, CHAIN2_SIZE, 0.85, pommelX, pommelY);

      setTick(t => t + 1); // Render SVG
      requestAnimationFrame(loop);
    };

    // Physics Helpers
    const updateChain = (links: any[], count: number, size: number, drag: number, anchorX: number, anchorY: number) => {
      links[0].x = anchorX;
      links[0].y = anchorY;

      for (let i = 1; i < count; i++) {
        const link = links[i];
        const linkVx = (link.x - link.oldX) * drag;
        const linkVy = (link.y - link.oldY) * drag;
        link.oldX = link.x;
        link.oldY = link.y;
        link.x += linkVx;
        link.y += linkVy + GRAVITY;
      }

      for (let iter = 0; iter < 3; iter++) {
        for (let i = 1; i < count; i++) {
          const prev = links[i - 1];
          const curr = links[i];
          const dx = curr.x - prev.x;
          const dy = curr.y - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            const ratio = (dist - size) / dist;
            curr.x -= dx * ratio;
            curr.y -= dy * ratio;
          }
        }
      }
    };

    const animId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("contextmenu", handleRightClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  const daggerDeg = (dagger.current.angle * 180) / Math.PI;

  const renderChainLinks = (chain: any[], width: number) => {
    const elements = [];
    for (let i = 0; i < chain.length - 1; i++) {
      const p1 = chain[i];
      const p2 = chain[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const length = Math.sqrt(dx * dx + dy * dy);
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const isEven = i % 2 === 0;

      const fill = theme === 'light' ? "url(#obsidian-link-grad)" : "url(#silver-link-grad)";
      const stroke = theme === 'light' ? "#334155" : "#475569";

      elements.push(
        <rect
          key={i}
          x={-length / 2}
          y={-width / 2}
          width={length + 1} 
          height={isEven ? width : width * 0.6}
          rx={width / 2}
          transform={`translate(${midX}, ${midY}) rotate(${angle})`}
          fill={fill}
          stroke={stroke}
          strokeWidth="0.2"
        />
      );
    }
    return elements;
  };

  return (
    // ✅ FIXED: Changed Z-Index from 9999 to 40
    // This puts the dagger BEHIND the header (z-50) so buttons work.
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ overflow: "visible", position: "relative" }}
      >
        <defs>
          {/* --- METALLIC GRADIENTS --- */}
          <linearGradient id="silver-link-grad" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#e2e8f0" />    
             <stop offset="50%" stopColor="#ffffff" />    
             <stop offset="100%" stopColor="#64748b" />   
          </linearGradient>
          <linearGradient id="platinum-grad" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#f8fafc" />   
             <stop offset="50%" stopColor="#cbd5e1" />   
             <stop offset="100%" stopColor="#94a3b8" />  
          </linearGradient>

          <linearGradient id="obsidian-link-grad" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#475569" />
             <stop offset="50%" stopColor="#1e293b" />
             <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="obsidian-blade-grad" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#64748b" />   
             <stop offset="50%" stopColor="#1e293b" />   
             <stop offset="100%" stopColor="#0f172a" />  
          </linearGradient>

          {/* --- FILTERS --- */}
          <filter id="metal-shine" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="scale(0.9)"> 
            {/* CHAINS */}
            <g filter="url(#metal-shine)">
                {renderChainLinks(chain2.current, 1.5)}
            </g>
            <g filter="url(#metal-shine)">
                {renderChainLinks(chain1.current, 2)}
            </g>
            
            {/* DAGGER GROUP */}
            <g transform={`translate(${mouse.current.x}, ${mouse.current.y}) rotate(${daggerDeg - 90}) scale(0.8)`}>
                
                {/* ACTUAL DAGGER */}
                <g filter="url(#metal-shine)">
                  {/* Hilt Ring */}
                  <circle cx="0" cy="0" r="5" 
                    stroke={theme === 'light' ? "#1e293b" : "#475569"} 
                    strokeWidth="2.5" fill="transparent" 
                  />
                  
                  {/* Handle */}
                  <path d="M 0 5 L 0 18" stroke={theme === 'light' ? "#475569" : "#94a3b8"} strokeWidth="3.5" />
                  <path d="M -8 18 L 8 18" stroke={theme === 'light' ? "#1e293b" : "#475569"} strokeWidth="2.5" />

                  {/* Blade Body */}
                  <path 
                      d="M -6 18 L -7 25 L 0 85 L 7 25 L 6 18 Z" 
                      fill={theme === 'light' ? "url(#obsidian-blade-grad)" : "url(#platinum-grad)"} 
                      stroke="none"
                  />
                  
                  {/* Blade Edge Outline */}
                  <path 
                      d="M -6 18 L -7 25 L 0 85 L 7 25 L 6 18 Z" 
                      fill="none" 
                      stroke={theme === 'light' ? "#0f172a" : "#475569"} 
                      strokeWidth="1.5"
                  />
                  
                  {/* Tech Lines */}
                  <path 
                      d="M 0 22 L 0 65" 
                      stroke={theme === 'light' ? "#334155" : "#475569"} 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                  />
                  {[-3, -3, -3].map((x, i) => (
                    <path key={i} d={`M ${x} ${30 + i*10} L 0 ${32 + i*10} L ${-x} ${30 + i*10}`} 
                        stroke={theme === 'light' ? "#94a3b8" : "#475569"} 
                        strokeWidth="1" fill="none" opacity="0.8" 
                    />
                  ))}

                  {/* ⚡ ENERGY TIP */}
                  <path 
                      d="M 0 18 L 0 85" 
                      stroke={theme === 'light' ? "#38bdf8" : "#ffffff"} 
                      strokeWidth="3" 
                      strokeLinecap="round"
                      opacity={isCharged ? "1" : "0.8"}
                      className={isCharged ? "animate-pulse" : ""}
                      filter={theme === 'light' ? "drop-shadow(0 0 5px #38bdf8)" : "drop-shadow(0 0 5px white)"}
                  />
              </g>
            </g>
            
            {/* Anchor Spark */}
            <circle 
                cx={mouse.current.x} 
                cy={mouse.current.y} 
                r="3" 
                fill={theme === 'light' ? "#38bdf8" : "#ffffff"} 
                filter="url(#metal-shine)" 
            />
        </g>
      </svg>
    </div>
  );
}