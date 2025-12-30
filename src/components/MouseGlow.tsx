import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseGlow() {
  // Start off-screen
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth physics for the following movement
  const springConfig = { damping: 30, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Offset by half the SVG size (20px) to center it on the tip
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <motion.svg
      className="fixed top-0 left-0 pointer-events-none z-[60] mix-blend-screen"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <defs>
        {/* Neon Glow Filter */}
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Rotating Cyber Star Shape */}
      <motion.path
        d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z" // 4-pointed star
        fill="#06b6d4" // Cyan color
        filter="url(#neon-glow)"
        opacity="0.8"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50%", originY: "50%" }} // Rotate around center
      />
      
      {/* Optional subtle center dot */}
       <motion.circle cx="20" cy="20" r="2" fill="white" filter="url(#neon-glow)" />
    </motion.svg>
  );
}