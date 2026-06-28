"use client";

import { useEffect, useState } from "react";
import { motion, type MotionValue, useMotionValue, useSpring } from "framer-motion";

const trailSettings = [
  { size: 18, opacity: 0.22, stiffness: 260, damping: 22, mass: 0.35 },
  { size: 15, opacity: 0.18, stiffness: 210, damping: 26, mass: 0.45 },
  { size: 12, opacity: 0.14, stiffness: 170, damping: 30, mass: 0.55 },
  { size: 9, opacity: 0.1, stiffness: 135, damping: 34, mass: 0.65 },
];

interface TrailPointProps {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  isVisible: boolean;
  isClicking: boolean;
  settings: (typeof trailSettings)[number];
}

function TrailPoint({ cursorX, cursorY, isVisible, isClicking, settings }: TrailPointProps) {
  const x = useSpring(cursorX, {
    damping: settings.damping,
    stiffness: settings.stiffness,
    mass: settings.mass,
  });
  const y = useSpring(cursorY, {
    damping: settings.damping,
    stiffness: settings.stiffness,
    mass: settings.mass,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9998] pointer-events-none"
      style={{ x, y }}
      animate={{
        opacity: isVisible ? settings.opacity : 0,
        scale: isClicking ? 0.55 : 1,
      }}
      transition={{ duration: 0.16 }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px]"
        style={{
          width: settings.size,
          height: settings.size,
          background: "linear-gradient(135deg, rgba(6,182,212,0.9), rgba(124,58,237,0.55))",
        }}
      />
    </motion.div>
  );
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const leadX = useSpring(cursorX, { damping: 22, stiffness: 700, mass: 0.18 });
  const leadY = useSpring(cursorY, { damping: 22, stiffness: 700, mass: 0.18 });
  const focusX = useSpring(cursorX, { damping: 20, stiffness: 180, mass: 0.55 });
  const focusY = useSpring(cursorY, { damping: 20, stiffness: 180, mass: 0.55 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="pointer"], input, textarea, select, label, [tabindex="0"]'
      );
      setIsHovering(!!interactive);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {trailSettings.map((settings) => (
        <TrailPoint
          key={settings.size}
          cursorX={cursorX}
          cursorY={cursorY}
          isVisible={isVisible}
          isClicking={isClicking}
          settings={settings}
        />
      ))}

      <motion.div
        className="fixed left-0 top-0 z-[9999] pointer-events-none"
        style={{ x: leadX, y: leadY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.72 : isHovering ? 1.18 : 1,
          rotate: isClicking ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 24 }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-[45%]"
          style={{
            width: 10,
            height: 10,
            background: isHovering
              ? "linear-gradient(135deg, #06B6D4, #7C3AED)"
              : "linear-gradient(135deg, #2563EB, #06B6D4)",
            boxShadow: isHovering
              ? "0 0 18px rgba(6, 182, 212, 0.6), 0 0 34px rgba(124, 58, 237, 0.28)"
              : "0 0 12px rgba(37, 99, 235, 0.45)",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 z-[9998] pointer-events-none"
        style={{ x: focusX, y: focusY }}
        animate={{
          opacity: isVisible && isHovering ? 1 : 0,
          scale: isClicking ? 0.78 : isHovering ? 1 : 0.72,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: 34,
            height: 34,
            borderColor: "rgba(6, 182, 212, 0.55)",
            background: "rgba(6, 182, 212, 0.08)",
            boxShadow: "0 0 0 6px rgba(124, 58, 237, 0.08)",
          }}
        >
          <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-accent/70" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 bg-accent/70" />
          <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-accent/70" />
          <span className="absolute right-0 top-1/2 h-px w-1.5 -translate-y-1/2 bg-accent/70" />
        </div>
      </motion.div>
    </>
  );
}
