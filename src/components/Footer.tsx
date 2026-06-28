"use client";

import { motion } from "framer-motion";
import { Brain, Github, Linkedin, Mail, Download } from "lucide-react";
import { navItems, siteConfig } from "@/data/site";
import { publicUrl } from "@/lib/assets";
import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                Samruddhi<span className="text-primary">.</span>
              </span>
            </motion.div>
            <p className="text-muted text-sm font-body leading-relaxed mb-6">
              AI Developer & Machine Learning Engineer building intelligent systems for the future.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: siteConfig.github, label: "GitHub" },
                { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-btn !w-10 !h-10"
                  whileHover={{ y: -4 }}
                  data-cursor="pointer"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href.replace("#", ""))}
                    className="text-muted text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                    data-cursor="pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-sm hover:text-primary transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"
                  data-cursor="pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-sm hover:text-primary transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"
                  data-cursor="pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={publicUrl(siteConfig.resumePath)}
                  download
                  className="text-muted text-sm hover:text-primary transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"
                  data-cursor="pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Resume
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-primary transition-colors"
                  data-cursor="pointer"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-primary transition-colors"
                  data-cursor="pointer"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-muted/70 text-xs font-mono">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
