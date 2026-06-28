"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import SectionHeading, { SectionWrapper } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { publicUrl } from "@/lib/assets";

export default function Resume() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <SectionWrapper id="resume">
      <SectionHeading
        title="Resume"
        subtitle="Download or preview my professional resume"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.005 }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-2xl card overflow-hidden hover:shadow-card-hover transition-shadow duration-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow"
              >
                <FileText className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-lg">
                  {siteConfig.resumeFileName}
                </h3>
                <p className="text-muted text-sm">AI Developer · Machine Learning Engineer</p>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={() => setIsFullscreen(true)}
                className="btn-outline flex items-center gap-2 !px-4 !py-2.5 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="pointer"
              >
                <ExternalLink className="w-4 h-4" />
                View Fullscreen
              </motion.button>
              <motion.a
                href={publicUrl(siteConfig.resumePath)}
                download
                className="btn-primary flex items-center gap-2 !px-4 !py-2.5 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="pointer"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.a>
            </div>
          </div>

          <div className="relative h-[500px] sm:h-[600px] bg-surface">
            <iframe
              src={`${publicUrl(siteConfig.resumePath)}#toolbar=0`}
              title="Resume Preview"
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>

      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-white flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-border shadow-sm">
            <h3 className="font-heading font-bold text-foreground">Resume Preview</h3>
            <div className="flex gap-3">
              <a
                href={publicUrl(siteConfig.resumePath)}
                download
                className="btn-primary flex items-center gap-2 !px-4 !py-2 text-sm"
                data-cursor="pointer"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="Close fullscreen"
                data-cursor="pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <iframe
            src={publicUrl(siteConfig.resumePath)}
            title="Resume Fullscreen"
            className="flex-1 w-full"
          />
        </motion.div>
      )}
    </SectionWrapper>
  );
}
