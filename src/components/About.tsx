"use client";

import { motion } from "framer-motion";
import { GraduationCap, Target, Lightbulb } from "lucide-react";
import SectionHeading, { SectionWrapper } from "@/components/ui/SectionHeading";
import { aboutIntro, aboutTimeline } from "@/data/about";

const icons = [GraduationCap, Lightbulb, Target];

export default function About() {
  return (
    <SectionWrapper id="about" className="section-alt">
      <SectionHeading
        title="About Me"
        subtitle="Passionate about building intelligent systems that solve real-world problems"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-slate-700 text-lg text-center max-w-3xl mx-auto mb-16 font-body leading-relaxed"
      >
        {aboutIntro}
      </motion.p>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden md:block -translate-x-1/2" />

        <div className="space-y-12">
          {aboutTimeline.map((item, index) => {
            const Icon = icons[index];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} text-center`}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="inline-block p-6 rounded-2xl card card-shine hover:shadow-card-hover group"
                    data-cursor="pointer"
                  >
                    <span className="text-accent font-mono text-sm font-semibold">{item.year}</span>
                    <h3 className="font-heading text-xl font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted font-body leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>

                <motion.div
                  className="relative z-10 flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
