"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Code2,
  Eye,
  Network,
  Sparkles,
  Wrench,
} from "lucide-react";
import SectionHeading, { SectionWrapper } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Brain,
  Network,
  Eye,
  Sparkles,
  Cloud,
  Wrench,
};

function SkillBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  return (
    <div className="group/bar">
      <div className="flex justify-between mb-2">
        <span className="text-slate-700 text-sm font-medium group-hover/bar:text-primary transition-colors">
          {name}
        </span>
        <span className="text-accent text-sm font-mono font-semibold">{percentage}%</span>
      </div>
      <div className="h-2.5 bg-surface-alt rounded-full overflow-hidden border border-border">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent relative group-hover/bar:shadow-glow transition-shadow"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer bg-[length:200%_100%]" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        title="Skills & Expertise"
        subtitle="Technologies and tools I use to build intelligent solutions"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skillCategories.map((category, catIndex) => {
          const Icon = iconMap[category.icon] || Code2;

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              whileHover={{ y: -10, transition: { duration: 0.25 } }}
              className="group p-6 rounded-2xl card card-shine hover:shadow-card-hover hover:border-primary/30"
              data-cursor="pointer"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="font-heading font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    delay={catIndex * 0.08 + skillIndex * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
