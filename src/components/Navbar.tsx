"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Brain } from "lucide-react";
import { navItems } from "@/data/site";
import { cn, scrollToSection } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    scrollToSection(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass-nav" : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.button
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <motion.div
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
              >
                <Brain className="w-5 h-5 text-white" />
              </motion.div>
              <span className="font-heading font-bold text-lg text-foreground hidden sm:block group-hover:text-primary transition-colors">
                Samruddhi<span className="text-primary">.</span>
              </span>
            </motion.button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ y: -2 }}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive ? "text-primary" : "text-muted hover:text-primary"
                    )}
                    data-cursor="pointer"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl shadow-glow"
              whileHover={{ scale: 1.08, boxShadow: "0 12px 40px rgba(37, 99, 235, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              Let&apos;s Talk
            </motion.button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-foreground rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              data-cursor="pointer"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <motion.div
        initial={false}
        animate={{ opacity: isMobileOpen ? 1 : 0, pointerEvents: isMobileOpen ? "auto" : "none" }}
        className="fixed inset-0 z-40 lg:hidden"
      >
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMobileOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute right-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-2xl border-l border-border shadow-2xl p-6 pt-24"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item, i) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isMobileOpen ? 1 : 0, x: isMobileOpen ? 0 : 20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "text-left px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted hover:text-primary hover:bg-surface"
                  )}
                  data-cursor="pointer"
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
