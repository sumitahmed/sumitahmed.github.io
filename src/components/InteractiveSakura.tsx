import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export function InteractiveSakura() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Smooth mouse tracking
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 100 });

  // Initialize petals on mount
  useEffect(() => {
    const petalColors = [
      '#ffc0cb', // Light pink
      '#ffb6c1', // Pink
      '#ff69b4', // Hot pink
      '#ffa6c9', // Soft pink
      '#ffaec9', // Rose pink
    ];

    const initialPetals: Petal[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 10 + 8, // 8-18px (smaller petals)
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.4, // 0.4-0.9
      vx: (Math.random() - 0.5) * 0.4,
      vy: Math.random() * 0.4 + 0.2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    setPetals(initialPetals);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animation loop - petals drift and react to mouse
  useEffect(() => {
    const animate = () => {
      setPetals((prevPetals) =>
        prevPetals.map((petal) => {
          let newX = petal.x + petal.vx;
          let newY = petal.y + petal.vy;

          // Mouse interaction - repel petals from cursor
          const dx = newX - smoothMouseX.get();
          const dy = newY - smoothMouseY.get();
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = 120; // Interaction radius

          if (distance < minDistance) {
            const force = (minDistance - distance) / minDistance;
            const angle = Math.atan2(dy, dx);
            newX += Math.cos(angle) * force * 4;
            newY += Math.sin(angle) * force * 4;
          }

          // Wrap around screen edges
          if (newY > window.innerHeight + 50) {
            newY = -50;
            newX = Math.random() * window.innerWidth;
          }
          if (newX > window.innerWidth + 50) newX = -50;
          if (newX < -50) newX = window.innerWidth + 50;

          return {
            ...petal,
            x: newX,
            y: newY,
            rotation: petal.rotation + 0.8,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [smoothMouseX, smoothMouseY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ isolation: 'isolate' }}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.x,
            top: petal.y,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
          }}
          animate={{
            rotate: petal.rotation,
          }}
          transition={{
            duration: 0,
          }}
        >
          {/* REALISTIC Cherry Blossom Petal SVG */}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 0 2px ${petal.color}60)`,
            }}
          >
            {/* Single realistic petal shape - like in your image */}
            <path
              d="M10 2 C8 3, 6 4, 5 6 C4 8, 4 10, 5 12 C6 14, 8 16, 10 18 C11 17, 12 16, 13 14 C14 12, 15 10, 15 8 C15 6, 13 4, 11 3 C10.5 2.5, 10 2, 10 2 Z"
              fill={petal.color}
              fillOpacity="0.85"
              stroke={petal.color}
              strokeWidth="0.3"
              strokeOpacity="0.4"
            />
            {/* Inner highlight */}
            <path
              d="M10 4 C9 5, 8 6, 7 8 C7 9, 7 10, 8 11 C9 12, 10 13, 10 14 C11 13, 12 12, 12 11 C13 10, 13 9, 13 8 C13 6, 11 5, 10 4 Z"
              fill="#ffffff"
              fillOpacity="0.35"
            />
            {/* Subtle vein detail */}
            <line
              x1="10"
              y1="4"
              x2="10"
              y2="16"
              stroke="#ffffff"
              strokeWidth="0.3"
              strokeOpacity="0.2"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
