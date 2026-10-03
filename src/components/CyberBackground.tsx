import { useEffect, useRef } from 'react';

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const themeRef = useRef<'dark' | 'light'>('dark');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    // 1. THEME DETECTION
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' || 'dark';
      themeRef.current = currentTheme;
    };
    
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    updateTheme();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    handleResize();

    // 2. PARTICLE SYSTEM
    const blobs: any[] = [];
    // ⚡ Increased count to 35 (since individual clouds are smaller, we need more to cover the screen)
    const blobCount = 35; 

    // 🎨 DYNAMIC COLOR PALETTE
    const getTargetColor = (isDark: boolean) => {
      if (isDark) {
        // DARK MODE: Original Deep Cyber Void (Blue/Purple)
        return `hsla(${Math.random() * 50 + 210}, 30%, 50%, 0.2)`; 
      } else {
        // ☀️ LIGHT MODE: High Contrast "Storm & Sea"
        const hue = Math.random() * 40 + 190; 
        const lightness = Math.random() * 20 + 30; 
        return `hsla(${hue}, 60%, ${lightness}%, 0.6)`; 
      }
    };

    // Initialize Blobs
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // ⚡ FASTER MOVEMENT: Increased speed multiplier from 1.5 to 3.5
        driftX: (Math.random() - 0.5) * 3.5, 
        driftY: (Math.random() - 0.5) * 3.5,
        pushX: 0,
        pushY: 0,
        // ⚡ SMALLER SIZE: Reduced from (250-550) to (120-320)
        radius: Math.random() * 200 + 120, 
        baseRadius: Math.random() * 200 + 120,
        angle: Math.random() * Math.PI * 2,
        currentColor: getTargetColor(true), 
        targetColor: getTargetColor(true),
        colorStep: 0
      });
    }

    // 3. RENDER LOOP
    const render = () => {
      const isDark = themeRef.current === 'dark';
      ctx.clearRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = isDark ? 'screen' : 'source-over';
      ctx.filter = isDark ? 'blur(60px)' : 'blur(50px)';

      if (Math.random() < 0.01) {
        blobs.forEach(b => {
          b.targetColor = getTargetColor(isDark);
          b.colorStep = 0;
        });
      }

      // --- DRAW BLOBS (CLOUDS) ---
      blobs.forEach((blob) => {
        // Physics: Mouse Pushes Clouds
        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 500; // Slightly smaller interaction radius for tighter control

        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          // Push darker clouds harder
          const pushStrength = isDark ? 0.8 : 2.0; 
          
          blob.pushX -= Math.cos(angle) * force * pushStrength;
          blob.pushY -= Math.sin(angle) * force * pushStrength;
          blob.radius = blob.baseRadius * 0.95;
        } else {
          blob.radius += (blob.baseRadius - blob.radius) * 0.01;
        }

        blob.x += blob.driftX + blob.pushX;
        blob.y += blob.driftY + blob.pushY;
        blob.pushX *= 0.92;
        blob.pushY *= 0.92;

        const buffer = blob.radius * 2;
        if (blob.x < -buffer) blob.x = width + buffer;
        if (blob.x > width + buffer) blob.x = -buffer;
        if (blob.y < -buffer) blob.y = height + buffer;
        if (blob.y > height + buffer) blob.y = -buffer;

        // Draw
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        
        gradient.addColorStop(0, blob.targetColor);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ☀️ CORNER SUN (Light Mode Only)
      if (!isDark) {
        // Reset filter for sharp sun rays
        ctx.filter = 'blur(60px)';
        ctx.globalCompositeOperation = 'screen'; 

        // Position: Top Right Corner
        const sunX = width; 
        const sunY = 0;
        const sunRadius = 800; // Massive glow

        const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
        
        // Shiny White -> Golden -> Fade
        sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); 
        sunGrad.addColorStop(0.2, 'rgba(253, 224, 71, 0.4)'); // Yellow-300
        sunGrad.addColorStop(0.5, 'rgba(234, 88, 12, 0.1)');  // Orange-600
        sunGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.filter = 'none';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: 1, 
        background: 'transparent' 
      }}
    />
  );
}