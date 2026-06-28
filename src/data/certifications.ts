export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: string;
  date: string;
  file: string;
  type: "pdf" | "image";
}

export const certifications: Certification[] = [
  {
    id: "deep-learning-specialization",
    title: "Deep Learning Specialization",
    issuer: "Coursera",
    category: "Deep Learning",
    date: "2025",
    file: "/images/certificates/Deep learning specialization.pdf",
    type: "pdf",
  },
  {
    id: "ai-essentials",
    title: "AI Essentials: Introduction to AI",
    issuer: "IBM / Coursera",
    category: "Generative AI",
    date: "2025",
    file: "/images/certificates/AI Essentials intro to AI.pdf",
    type: "pdf",
  },
  {
    id: "ai-beginner-to-pro",
    title: "AI Beginner to Pro",
    issuer: "Professional Certificate",
    category: "Generative AI",
    date: "2025",
    file: "/images/certificates/AI begginer to pro.pdf",
    type: "pdf",
  },
  {
    id: "devops-to-mlops",
    title: "DevOps to MLOps",
    issuer: "Professional Certificate",
    category: "Machine Learning",
    date: "2025",
    file: "/images/certificates/Devops to MLOPS.pdf",
    type: "pdf",
  },
];

export const certCategories = [
  "All",
  "Machine Learning",
  "Deep Learning",
  "Generative AI",
] as const;
