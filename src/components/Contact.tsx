"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  AlertCircle,
  Bot,
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import SectionHeading, { SectionWrapper } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { aboutIntro } from "@/data/about";
import { projects } from "@/data/projects";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() || "",
};

const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);

const buildMailtoHref = ({ name, email, subject, message }: FormData) => {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const featuredProjectNames = projects.slice(0, 4).map((project) => project.title).join(", ");

const quickQuestions = [
  "Who is Samruddhi?",
  "What are her core strengths?",
  "Tell me about her AI projects",
  "How can I reach out?",
  "What makes her different?",
];

const getChatbotReply = (message: string) => {
  const normalized = message.toLowerCase();

  if (/(hi|hello|hey|good morning|good afternoon|good evening)/.test(normalized)) {
    return "Hey there! I'm Samruddhi's portfolio assistant. I can tell you about her experience, projects, skills, and how to connect with her.";
  }

  if (normalized.includes("skill") || normalized.includes("tech") || normalized.includes("stack")) {
    return "Samruddhi brings hands-on experience in Python, Machine Learning, Deep Learning, NLP, Computer Vision, SQL, AWS, Azure, React, Docker, and production-ready MLOps practices.";
  }

  if (
    normalized.includes("project") ||
    normalized.includes("jobguard") ||
    normalized.includes("fetal") ||
    normalized.includes("stress") ||
    normalized.includes("pumpkin")
  ) {
    return `Her featured work includes ${featuredProjectNames}. JobGuard AI detects fake job postings and helps job seekers with ATS-ready resumes. FetalAI predicts fetal health risks. Stress Detection System analyzes daily stress insights. Pumpkin Seed Classification identifies seed varieties with ML.`;
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("phone") ||
    normalized.includes("hire") ||
    normalized.includes("collaborate")
  ) {
    return `You can reach Samruddhi at ${siteConfig.email} or ${siteConfig.phone}. Her LinkedIn and GitHub profiles are also linked in the portfolio, and she welcomes collaboration inquiries.`;
  }

  if (
    normalized.includes("who") ||
    normalized.includes("about") ||
    normalized.includes("intro") ||
    normalized.includes("samruddhi")
  ) {
    return `${siteConfig.name} is a passionate ${siteConfig.title} who turns data into practical AI solutions. She builds polished, user-friendly projects with a focus on real-world impact.`;
  }

  if (normalized.includes("resume") || normalized.includes("cv")) {
    return "You can download her resume from the Resume section, or ask me for a quick summary of her experience and certifications.";
  }

  if (normalized.includes("availability") || normalized.includes("open") || normalized.includes("position") || normalized.includes("role")) {
    return "She is open to AI/ML roles, consulting, and collaborative projects. Feel free to use the contact form or email to discuss opportunities.";
  }

  if (normalized.includes("cloud") || normalized.includes("aws") || normalized.includes("azure") || normalized.includes("docker")) {
    return "Her cloud experience includes AWS, Azure, Docker, and building scalable ML solutions with deployment-aware architecture and CI/CD.";
  }

  if (normalized.includes("mlops") || normalized.includes("deploy") || normalized.includes("production")) {
    return "She follows MLOps best practices with model versioning, containerization, monitoring, and end-to-end deployment workflows.";
  }

  return "I’m here to help! Ask me about Samruddhi's experience, projects, skills, resume, or how to connect with her.";
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: `Hi, I am my portfolio assistant. Ask me about her skills, projects, resume, or contact details.`,
    },
  ]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setStatusMessage("");

    try {
      if (!isEmailJsConfigured) {
        window.location.href = buildMailtoHref(formData);
        setStatus("success");
        setStatusMessage("Your email app should open with this message ready to send.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: siteConfig.email,
        },
        emailJsConfig.publicKey
      );

      setStatus("success");
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Failed to send contact message:", error);
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again or email directly.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const sendChatMessage = (message: string) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setChatMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", text: trimmedMessage },
      { role: "bot", text: getChatbotReply(trimmedMessage) },
    ]);
    setChatInput("");
  };

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChatMessage(chatInput);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: Linkedin, label: "LinkedIn", value: "samruddhi-magdum", href: siteConfig.linkedin },
    { icon: Github, label: "GitHub", value: "samruddhi2026", href: siteConfig.github },
  ];

  return (
    <SectionWrapper id="contact" className="section-alt">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? Let's connect!"
      />

      <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          <p className="text-muted font-body leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be
            part of your vision. Feel free to reach out!
          </p>

          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl card hover:shadow-card-hover hover:border-primary/30 group"
                data-cursor="pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-muted">{label}</p>
                  <p className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 space-y-5 p-6 rounded-2xl card"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm text-muted mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="input-field"
              placeholder="Project inquiry"
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-muted mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input-field resize-none"
              placeholder="Tell me about your project..."
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              {statusMessage}
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {statusMessage}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
            whileHover={{ scale: status === "loading" ? 1 : 1.05 }}
            whileTap={{ scale: status === "loading" ? 1 : 0.95 }}
            data-cursor="pointer"
          >
            {status === "loading" ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_80px_rgba(15,23,42,0.09)]"
      >
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative overflow-hidden bg-slate-950 p-6 text-white sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(6,182,212,0.35),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(124,58,237,0.28),transparent_30%)]" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-cyan-100 backdrop-blur">
                <Bot className="h-3.5 w-3.5" />
                Portfolio assistant
              </div>

              <h3 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
                Let&apos;s Talk
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
                Ask about Samruddhi&apos;s AI/ML skills, featured projects, resume, or contact
                details.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-cyan-100">Focus</p>
                  <p className="mt-1 text-sm font-semibold">AI, ML, NLP, CV, Generative AI</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-wide text-cyan-100">Projects</p>
                  <p className="mt-1 text-sm font-semibold">JobGuard AI, FetalAI, Clause Sight</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendChatMessage(question)}
                  className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-[0_10px_24px_rgba(37,99,235,0.18)]"
                  data-cursor="pointer"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="h-[340px] overflow-y-auto rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="space-y-4">
                {chatMessages.map((chatMessage, index) => {
                  const isBot = chatMessage.role === "bot";

                  return (
                    <div
                      key={`${chatMessage.role}-${index}`}
                      className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      {isBot && (
                        <div className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-border">
                          <Bot className="h-4 w-4" />
                        </div>
                      )}
                      <p
                        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          isBot
                            ? "rounded-tl-md bg-white text-slate-600 ring-1 ring-border"
                            : "rounded-tr-md bg-primary text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)]"
                        }`}
                      >
                        {chatMessage.text}
                      </p>
                      {!isBot && (
                        <div className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-secondary/10 text-secondary ring-1 ring-secondary/10">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleChatSubmit} className="mt-4 flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="input-field h-12 text-sm"
                placeholder="Ask about skills, projects, resume..."
              />
              <button
                type="submit"
                aria-label="Send chatbot message"
                className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition-all hover:-translate-y-0.5 hover:bg-secondary"
                data-cursor="pointer"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
