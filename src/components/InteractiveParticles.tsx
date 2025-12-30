import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: number;
}

export function InteractiveParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking for interaction
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 100 });

  useEffect(() => {
    // Generate "Digital Snow" (White/Silver squares or pixels)
    const initialParticles: Particle[] = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1, // Tiny pixels (1-3px)
      opacity: Math.random() * 0.5 + 0.1, // Faint
      velocity: Math.random() * 0.4 + 0.1, // Very slow upward drift
    }));

    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let newY = p.y - p.velocity; // Move UP (Anti-gravity)
          let newX = p.x;

          // Mouse Repulsion (Digital Distortion Field)
          const dx = newX - smoothMouseX.get();
          const dy = newY - smoothMouseY.get();
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (distance < maxDist) {
            const force = (maxDist - distance) / maxDist;
            // Push away gently
            newX += (dx / distance) * force * 2; 
            newY += (dy / distance) * force * 2;
          }

          // Wrap around screen (Infinite Loop)
          if (newY < -10) {
            newY = window.innerHeight + 10;
            newX = Math.random() * window.innerWidth;
          }

          return { ...p, x: newX, y: newY };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothMouseX, smoothMouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          // White/Silver Particles with a tiny glow
          className="absolute bg-white rounded-sm shadow-[0_0_4px_rgba(255,255,255,0.6)]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}