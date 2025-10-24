import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * AnimatedCursor Component
 * 
 * Features:
 * - Smooth cursor following with spring physics
 * - Magnetic hover effect on interactive elements
 * - Ripple effect on click
 * - Respects prefers-reduced-motion
 */
export function AnimatedCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, springConfig);
  
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      
      // Check for magnetic elements
      const target = e.target as HTMLElement;
      const magneticEl = target.closest("[data-magnetic]");
      
      if (magneticEl) {
        cursorScale.set(1.5);
      } else {
        cursorScale.set(1);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create ripple effect
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
    };
  }, [cursorX, cursorY, cursorScale]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: cursorScaleSpring,
        }}
      >
        <div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-sm" />
      </motion.div>
      
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none fixed z-50"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="h-10 w-10 rounded-full border-2 border-primary" />
        </motion.div>
      ))}
    </>
  );
}
