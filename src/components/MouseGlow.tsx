import { useEffect, useRef, useState } from "react";

// --- PHYSICS CONFIG ---
const GRAVITY = 0.6;
const DAGGER_GRAVITY = 0.05; 
const FRICTION = 0.8;       
const ROTATION_DRAG = 0.96; 
const SWING_FORCE = 0.8;    

// CHAIN 1 (Main Tether - REDUCED SIZE)
const CHAIN1_LINKS = 18;    // ⬇️ Reduced from 20
const CHAIN1_SIZE = 9;      // ⬇️ Reduced from 10

// CHAIN 2 (Accessory Chain)
const CHAIN2_LINKS = 12;    
const CHAIN2_SIZE = 7;      

export function MouseGlow() {
  const svgRef = useRef<SVGSVGElement>(null);

  // --- PHYSICS STATE ---
  const mouse = useRef({ x: -100, y: -100, prevX: -100, prevY: -100 });
  const dagger = useRef({ angle: Math.PI / 2, angularVel: 0 }); 
  
  const chain1 = useRef(
    Array.from({ length: CHAIN1_LINKS }).map(() => ({ x: 0, y: 0, oldX: 0, oldY: 0 }))
  );
  
  const chain2 = useRef(
    Array.from({ length: CHAIN2_LINKS }).map(() => ({ x: 0, y: 0, oldX: 0, oldY: 0 }))
  );

  const [isCharged, setIsCharged] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(0);

  useEffect(() => {
    // 1. TRACKING
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // 2. INTERACTION (Spin)
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      setIsCharged(true);
      setTimeout(() => setIsCharged(false), 400); 
      dagger.current.angularVel += 0.8; 
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("contextmenu", handleRightClick);

    // 3. PHYSICS LOOP
    const updatePhysics = () => {
      // Calculate Smooth Velocity
      const vx = mouse.current.x - mouse.current.prevX;
      const vy = mouse.current.y - mouse.current.prevY;
      
      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;

      // Dagger Physics
      const restingAngle = Math.PI / 2;
      const force = Math.sin(restingAngle - dagger.current.angle) * DAGGER_GRAVITY;
      dagger.current.angularVel += force;

      // Apply Mouse Swing
      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
         dagger.current.angularVel -= (vx * 0.003) * SWING_FORCE;
      }

      dagger.current.angle += dagger.current.angularVel;
      dagger.current.angularVel *= ROTATION_DRAG; 

      // Chain Physics
      updateChain(chain1.current, CHAIN1_LINKS, CHAIN1_SIZE, 0.9, mouse.current.x, mouse.current.y);
      
      const daggerLen = 14; 
      const pommelX = mouse.current.x + Math.cos(dagger.current.angle) * daggerLen;
      const pommelY = mouse.current.y + Math.sin(dagger.current.angle) * daggerLen;
      updateChain(chain2.current, CHAIN2_LINKS, CHAIN2_SIZE, 0.85, pommelX, pommelY);

      setRenderTrigger(prev => prev + 1);
      requestAnimationFrame(updatePhysics);
    };

    const updateChain = (links: any[], count: number, size: number, drag: number, anchorX: number, anchorY: number) => {
      links[0].x = anchorX;
      links[0].y = anchorY;

      // Verlet Integration
      for (let i = 1; i < count; i++) {
        const link = links[i];
        const vx = (link.x - link.oldX) * drag;
        const vy = (link.y - link.oldY) * drag;

        link.oldX = link.x;
        link.oldY = link.y;

        link.x += vx;
        link.y += vy + GRAVITY;
      }

      // Constraints
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

    const animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

      elements.push(
        <rect
          key={i}
          x={-length / 2}
          y={-width / 2}
          width={length + 1} 
          height={isEven ? width : width * 0.6}
          rx={width / 2}
          transform={`translate(${midX}, ${midY}) rotate(${angle})`}
          fill="url(#silver-link-grad)"
          stroke="#0f172a"
          strokeWidth="0.2"
        />
      );
    }
    return elements;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
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

          <filter id="crisp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="scale(0.9)"> 
            
            {/* --- CHAIN 2 (Accessory Chain) --- */}
            <g filter="url(#crisp-glow)">
               {renderChainLinks(chain2.current, 1.5)}
            </g>

            {/* --- CHAIN 1 (Main Chain) --- */}
            <g filter="url(#crisp-glow)">
               {/* ⬇️ Reduced width to 2 (was 2.5) */}
               {renderChainLinks(chain1.current, 2)}
            </g>
            
            {/* --- THE DAGGER --- */}
            <g 
              transform={`translate(${mouse.current.x}, ${mouse.current.y}) rotate(${daggerDeg - 90}) scale(0.8)`}
              filter="url(#crisp-glow)"
            >
                {/* 1. Hilt Ring */}
                <circle cx="0" cy="0" r="5" stroke="#ffffff" strokeWidth="2.5" fill="transparent" />
                
                {/* 2. Handle & Guard */}
                <path d="M 0 5 L 0 18" stroke="#cbd5e1" strokeWidth="3.5" />
                <path d="M -8 18 L 8 18" stroke="#ffffff" strokeWidth="2.5" />

                {/* 3. Main Blade Body */}
                <path 
                    d="M -6 18 L -7 25 L 0 85 L 7 25 L 6 18 Z" 
                    fill="url(#platinum-grad)" 
                    stroke="none"
                />
                
                {/* 4. Blade Edge */}
                <path 
                    d="M -6 18 L -7 25 L 0 85 L 7 25 L 6 18 Z" 
                    fill="none" 
                    stroke="#ffffff"
                    strokeWidth="1.5"
                />
                
                {/* 5. Center Fuller */}
                <path 
                    d="M 0 22 L 0 65" 
                    stroke="#94a3b8" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                />

                {/* 6. Tech Lines */}
                <path d="M -3 30 L 0 32 L 3 30" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.8"/>
                <path d="M -3 40 L 0 42 L 3 40" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.8"/>
                <path d="M -3 50 L 0 52 L 3 50" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.8"/>

                {/* 7. Spin Energy */}
                <path 
                    d="M 0 18 L 0 85" 
                    stroke="#ffffff" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    opacity={isCharged ? "1" : "0"}
                    className={isCharged ? "animate-pulse" : ""}
                />
            </g>
            
            {/* Anchor Spark */}
            <circle 
              cx={mouse.current.x} 
              cy={mouse.current.y} 
              r="2.5" 
              fill="#ffffff" 
              filter="url(#crisp-glow)" 
            />
        </g>

      </svg>
    </div>
  );
}