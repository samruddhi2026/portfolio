"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github, Layers3, Sparkles, X } from "lucide-react";
import SectionHeading, { SectionWrapper } from "@/components/ui/SectionHeading";
import { projects, projectFilters, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const categoryStyles: Record<Project["category"], string> = {
  ai: "from-blue-500 to-violet-500",
  ml: "from-emerald-500 to-cyan-500",
  web: "from-orange-500 to-pink-500",
  cloud: "from-sky-500 to-indigo-500",
};

const getCategoryLabel = (category: Project["category"]) =>
  projectFilters.find((filter) => filter.value === category)?.label ?? category.toUpperCase();

const getProjectInitials = (title: string) =>
  title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="relative h-48 sm:h-64 bg-gradient-to-br from-primary/10 to-secondary/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover rounded-t-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
            aria-label="Close modal"
            data-cursor="pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{project.title}</h3>
          <p className="text-muted font-body mb-6 leading-relaxed">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-foreground font-semibold mb-3">Features</h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-muted text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-foreground font-semibold mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 !px-5 !py-2.5 text-sm"
                data-cursor="pointer"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 !px-5 !py-2.5 text-sm"
                data-cursor="pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const categoryLabel = getCategoryLabel(project.category);
  const accentGradient = categoryStyles[project.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 24 }}
      transition={{ duration: 0.36, delay: index * 0.05 }}
      whileHover={{ y: -10, transition: { duration: 0.28 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/80 bg-white/95 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_26px_92px_rgba(37,99,235,0.18)]"
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-90",
          accentGradient
        )}
      />

      <div className="relative h-48 overflow-hidden bg-surface-alt">
        {!imageFailed ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className={cn(
              "flex h-full items-center justify-center bg-gradient-to-br p-6 text-white",
              accentGradient
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.18)_0_1px,transparent_1px_12px)]" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-xl border border-white/35 bg-white/18 text-3xl font-bold shadow-2xl backdrop-blur">
              {getProjectInitials(project.title)}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-95" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm ring-1 ring-white/10">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {categoryLabel}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium text-white/80">Featured project</p>
            <h3 className="line-clamp-2 font-heading text-xl font-bold leading-snug text-white">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onSelect}
            aria-label={`View details for ${project.title}`}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-primary shadow-lg transition-transform duration-300 hover:bg-primary hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            data-cursor="pointer"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-4 min-h-[44px] text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>

        <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-muted">
          <Layers3 className="h-4 w-4 text-primary" />
          <span>{project.features.length} key features</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{project.technologies.length} technologies</span>
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-primary/15 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-md border border-border bg-white px-2.5 py-1 text-xs font-medium text-muted">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2">
          <button
            type="button"
            onClick={onSelect}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            data-cursor="pointer"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            Details
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-muted transition-colors hover:border-primary/30 hover:text-primary"
              data-cursor="pointer"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-primary/20 bg-primary text-xs font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition-all hover:-translate-y-0.5 hover:bg-secondary"
              data-cursor="pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="projects" className="section-alt">
      <SectionHeading
        title="Featured Projects"
        subtitle="AI and ML projects showcasing real-world problem solving"
      />

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {projectFilters.map((filter) => (
          <motion.button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "min-w-[130px] px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm",
              activeFilter === filter.value
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow"
                : "bg-white text-muted border border-border hover:text-primary hover:border-primary/30 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
            )}
            data-cursor="pointer"
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
