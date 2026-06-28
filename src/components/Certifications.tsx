"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, Download, FileText, X, ZoomIn } from "lucide-react";
import SectionHeading, { SectionWrapper } from "@/components/ui/SectionHeading";
import { certifications, certCategories, type Certification } from "@/data/certifications";
import { publicUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";

function CertPreview({
  cert,
  className = "",
}: {
  cert: Certification;
  className?: string;
}) {
  const url = publicUrl(cert.file);

  if (cert.type === "pdf") {
    return (
      <iframe
        src={`${url}#toolbar=0&navpanes=0&view=FitH`}
        title={cert.title}
        scrolling="no"
        className={`w-full h-full pointer-events-none overflow-hidden ${className}`}
        style={{ overflow: "hidden" }}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image src={url} alt={cert.title} fill className="object-cover" />
    </div>
  );
}

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const url = publicUrl(cert.file);
  const downloadName = cert.file.split("/").pop() || `${cert.title}.pdf`;

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
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="relative flex-1 min-h-[400px] sm:min-h-[500px] bg-surface">
          {cert.type === "pdf" ? (
            <iframe src={url} title={cert.title} className="w-full h-full min-h-[400px] sm:min-h-[500px]" />
          ) : (
            <div className="relative w-full h-full min-h-[400px]">
              <CertPreview cert={cert} className="h-full min-h-[400px]" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-foreground hover:bg-secondary hover:text-white transition-colors"
            aria-label="Close modal"
            data-cursor="pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border">
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">{cert.title}</h3>
            <p className="text-muted text-sm mt-1">
              {cert.issuer} · {cert.date}
            </p>
          </div>
          <a
            href={url}
            download={downloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-2 !px-4 !py-2 text-sm shrink-0"
            data-cursor="pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const filteredCerts =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        title="Certifications"
        subtitle="Professional credentials and continuous learning achievements"
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {certCategories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-glow"
                : "bg-white text-muted border border-border hover:text-primary hover:border-primary/30"
            )}
            data-cursor="pointer"
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group rounded-2xl card card-shine overflow-hidden hover:shadow-glow-purple hover:border-secondary/30 cursor-pointer"
              onClick={() => setSelectedCert(cert)}
              data-cursor="pointer"
            >
              <div className="relative h-44 bg-gradient-to-br from-secondary/5 to-primary/5 overflow-hidden">
                <CertPreview cert={cert} className="h-full" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/90 shadow-sm flex items-center gap-1">
                  <FileText className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-mono text-primary font-semibold">PDF</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Award className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  <h3 className="font-heading font-semibold text-foreground text-sm leading-tight group-hover:text-secondary transition-colors">
                    {cert.title}
                  </h3>
                </div>
                <p className="text-muted text-xs">{cert.issuer}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="px-2 py-0.5 text-xs bg-secondary/10 text-secondary rounded-full">
                    {cert.category}
                  </span>
                  <span className="text-xs text-muted font-mono">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
