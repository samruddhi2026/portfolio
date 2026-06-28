"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  shine?: boolean;
  delay?: number;
}

export default function AnimatedCard({
  children,
  shine = true,
  delay = 0,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={cn(
        "card-hover card-shine",
        shine && "card-shine",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
