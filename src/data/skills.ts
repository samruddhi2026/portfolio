export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: "Code2",
    skills: [
      { name: "Python", percentage: 92 },
      { name: "Java", percentage: 78 },
      { name: "C++", percentage: 70 },
      { name: "SQL", percentage: 85 },
    ],
  },
  {
    title: "Machine Learning",
    icon: "Brain",
    skills: [
      { name: "Scikit-Learn", percentage: 88 },
      { name: "Pandas", percentage: 90 },
      { name: "NumPy", percentage: 88 },
    ],
  },
  {
    title: "Deep Learning",
    icon: "Network",
    skills: [
      { name: "TensorFlow", percentage: 82 },
      { name: "PyTorch", percentage: 80 },
    ],
  },
  {
    title: "Computer Vision",
    icon: "Eye",
    skills: [
      { name: "OpenCV", percentage: 85 },
      { name: "YOLO", percentage: 78 },
    ],
  },
  {
    title: "Generative AI",
    icon: "Sparkles",
    skills: [
      { name: "LLMs", percentage: 85 },
      { name: "LangChain", percentage: 80 },
      { name: "RAG", percentage: 82 },
    ],
  },
  {
    title: "Cloud",
    icon: "Cloud",
    skills: [
      { name: "AWS", percentage: 75 },
      { name: "Azure", percentage: 70 },
    ],
  },
  {
    title: "Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", percentage: 88 },
      { name: "GitHub", percentage: 90 },
      { name: "VS Code", percentage: 92 },
      { name: "Jupyter Notebook", percentage: 90 },
    ],
  },
];
