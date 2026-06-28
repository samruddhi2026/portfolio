export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  category: "ai" | "ml" | "web" | "cloud";
}

export const projects: Project[] = [
  {
    id: "jobguard-ai",
    title: "JobGuard AI",
    description:
      "An all-in-one AI platform that secures career searches by detecting fake job postings with 99.9% accuracy, optimizing resumes for ATS systems, and matching professionals with verified opportunities from official corporate portals.",
    features: [
      "Deep-packet analysis for fraud detection",
      "ATS resume optimization",
      "Live verified job aggregation",
      "AI-powered semantic skill matching",
      "Career insights dashboard",
      "AI Coach for career guidance",
    ],
    technologies: ["Python", "Flask", "Machine Learning", "NLP", "React", "SQL"],
    image: "/images/projects/Job-Guard%20project/Screenshot%202026-06-10%20111206.png",
    github: "https://github.com/samruddhi2026",
    live: "https://jobguard-ai-1-5nsm.onrender.com/",
    category: "ai",
  },
  {
    id: "fetalai",
    title: "FetalAI",
    description:
      "A healthcare AI application designed for fetal health prediction and risk assessment using machine learning models.",
    features: [
      "Fetal health prediction",
      "Risk assessment models",
      "Healthcare data analysis",
      "Clinical decision support",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Machine Learning"],
    image: "/images/projects/FetalAI/Screenshot%202026-06-10%20111527.png",
    github: "https://github.com/samruddhi2026",
    category: "ml",
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    description:
      "A recommendation engine that provides personalized suggestions using collaborative filtering and machine learning algorithms.",
    features: [
      "Collaborative filtering",
      "Personalized suggestions",
      "User preference learning",
      "Scalable recommendation pipeline",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas"],
    image: "/images/projects/Recommendation%20system%20project/Screenshot%202026-06-06%20154145.png",
    github: "https://github.com/samruddhi2026",
    category: "ml",
  },
  {
    id: "aws-virtual-classroom",
    title: "AWS Hosted Virtual Classroom",
    description:
      "A cloud-based learning platform hosted on AWS providing virtual classroom functionality and educational resource management.",
    features: [
      "Virtual classroom sessions",
      "Resource management",
      "AWS cloud infrastructure",
      "Scalable deployment",
    ],
    technologies: ["AWS", "EC2", "S3", "IAM"],
    image: "/images/projects/AWS%20Class%20room%20project/Screenshot%202026-06-06%20150149.png",
    github: "https://github.com/samruddhi2026",
    category: "cloud",
  },
  {
    id: "clause-sight",
    title: "Clause Sight",
    description:
      "An NLP-powered document analysis system that extracts important clauses and generates insights from legal documents.",
    features: [
      "Legal document parsing",
      "Clause extraction",
      "NLP-powered insights",
      "Transformer-based analysis",
    ],
    technologies: ["Python", "NLP", "Transformers"],
    image: "/images/projects/ClauseSight/Screenshot%202026-06-06%20155111.png",
    github: "https://github.com/samruddhi2026",
    category: "ai",
  },
  {
    id: "pumpkin-seed-classification",
    title: "Pumpkin Seed Classification",
    description:
      "A machine learning classification system for identifying pumpkin seed varieties using statistical and predictive models.",
    features: [
      "Multi-class classification",
      "Statistical analysis",
      "Predictive modeling",
      "Image-based seed identification",
    ],
    technologies: ["Python", "Machine Learning", "Scikit-Learn"],
    image: "/images/projects/Harvesting%20Brilliance%20with%20Machine%20Learning%20%E2%80%93%20Pumpkin%20Seed%20Analysis%20System/Screenshot%202026-06-06%20154715.png",
    github: "https://github.com/samruddhi2026",
    category: "ml",
  },
  {
    id: "stress-detection-system",
    title: "Stress Detection System",
    description:
      "A real-time stress detection platform combining backend analytics and frontend insights to monitor stress levels and daily statistics.",
    features: [
      "Stress data collection API",
      "Daily statistics insights dashboard",
      "Containerized backend and frontend",
      "Docker Compose orchestration",
    ],
    technologies: ["Python", "FastAPI", "React", "Docker", "Machine Learning"],
    image: "/images/projects/Stress Detection System/placeholder.svg",
    github: "https://github.com/samruddhi2026/Daily_Task",
    category: "ai",
  },
];

export const projectFilters = [
  { label: "All", value: "all" },
  { label: "AI", value: "ai" },
  { label: "ML", value: "ml" },
  { label: "Web", value: "web" },
  { label: "Cloud", value: "cloud" },
] as const;
