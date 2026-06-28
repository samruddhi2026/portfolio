export const siteConfig = {
  name: "Samruddhi Magdum",
  title: "AI Developer | Machine Learning Engineer",
  description:
    "Portfolio of Samruddhi Magdum — AI Developer specializing in Machine Learning, Deep Learning, NLP, Computer Vision, Data Science and Generative AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://samruddhi-portfolio.vercel.app",
  profileImage: "/images/profile/IMG_20250106_204721.jpg",
  ogImage: "/images/profile/IMG_20250106_204721.jpg",
  author: "Samruddhi Magdum",
  email: "magdumsamruddhi84@gmail.com",
  phone: "+91 8010860598",
  github: "https://github.com/samruddhi2026",
  linkedin: "https://www.linkedin.com/in/samruddhi-magdum2026",
  resumePath: "/resume/Samruddhi Magdum.pdf",
  resumeFileName: "Samruddhi Magdum.pdf",
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;
