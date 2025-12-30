import { useEffect, useRef } from 'react';

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

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

    // Initial Setup
    handleResize();

    // CLOUD PARTICLES
    const blobs: any[] = [];
    const blobCount = 12;

    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // ⚡ INCREASED SPEED: Multiplier increased from 1.5 to 3.5
        driftX: (Math.random() - 0.5) * 3.5, 
        driftY: (Math.random() - 0.5) * 3.5,
        // Mouse push force
        pushX: 0,
        pushY: 0,
        radius: Math.random() * 250 + 200, 
        // Hazy Fog Colors
        color: `hsla(${Math.random() * 40 + 210}, 25%, 60%, 0.25)`, 
        baseRadius: Math.random() * 250 + 200,
        angle: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Use 'screen' blend for glowing fog
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(50px)'; 

      blobs.forEach((blob) => {
        // 1. MOUSE INTERACTION
        const dx = mouseRef.current.x - blob.x;
        const dy = mouseRef.current.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 450;

        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          
          blob.pushX -= Math.cos(angle) * force * 0.8;
          blob.pushY -= Math.sin(angle) * force * 0.8;
          
          blob.radius = blob.baseRadius * 0.9;
        } else {
          blob.radius += (blob.baseRadius - blob.radius) * 0.02;
        }

        // 2. APPLY MOVEMENT (Ambient + Push)
        blob.x += blob.driftX + blob.pushX;
        blob.y += blob.driftY + blob.pushY;

        // Friction for push force
        blob.pushX *= 0.92;
        blob.pushY *= 0.92;

        // 3. BOUNDARY WRAPPING
        const buffer = blob.radius * 2;
        if (blob.x < -buffer) blob.x = width + buffer;
        if (blob.x > width + buffer) blob.x = -buffer;
        if (blob.y < -buffer) blob.y = height + buffer;
        if (blob.y > height + buffer) blob.y = -buffer;

        // 4. DRAW
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.filter = 'none';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
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