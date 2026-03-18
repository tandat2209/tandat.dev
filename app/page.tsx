"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Network, FileJson, BookOpen, Github, Linkedin, Mail, MapPin, ExternalLink, ChevronDown, Award } from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/tandat2209" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/tandat2209" },
  { icon: Mail, label: "Email", href: "mailto:tandat2209@gmail.com" },
]

const experiences = [
  {
    employer: "CoderPush",
    employerNote: "Software outsourcing",
    role: "Team Lead / Senior Fullstack Developer",
    period: "Jun 2021 – Present",
    color: "#4FACFE",
    clients: [
      {
        name: "Sleek",
        description: "All-in-one digital platform for SMEs (company registration, governance, accounting & tax compliance).",
        highlights: [
          "Led the technical team end-to-end, from ideation through production deployment.",
          "Spearheaded the Sleek Business Account — a payment service enabling local & international transfers and virtual card services.",
          "Integrated with three major financial vendors, growing Assets Under Management (AUM) to SGD 20M.",
          "Collaborated with cross-functional teams to deliver scalable, production-grade solutions.",
          "🏆 Won 2 consecutive internal Hackathons (2023 & 2024): built an AI-assisted chatbot for customer support queries (2023), and a compliance portal streamlining KYC/CDD processes (2024).",
        ],
      },
    ],
  },
  {
    employer: "Saigon Technology",
    employerNote: "Top software outsourcing company in Vietnam",
    role: "Fullstack Developer",
    period: "Jan 2019 – Jun 2021",
    color: "#2BFF88",
    clients: [
      {
        name: "Recruiting.com",
        description: "Talent acquisition software for personalised, engaging candidate experiences.",
        highlights: [
          "Developed and maintained career sites for high-profile clients including McDonald's and Pilot Flying J.",
          "Continuously shipped new features and enhancements to meet evolving client needs.",
        ],
      },
      {
        name: "Periplus AG",
        description: "Swiss client — frontend development engagement.",
        highlights: [
          "Built high-quality UI components and responsive web interfaces as Frontend Developer.",
        ],
      },
    ],
  },
  {
    employer: "ThankTriips",
    employerNote: "Travel-tech startup",
    role: "ReactJS / React Native Developer",
    period: "Jan 2018 – Dec 2018",
    color: "#FFB344",
    clients: [
      {
        name: "",
        description: "",
        highlights: [
          "Built mobile and web interfaces using ReactJS and React Native.",
        ],
      },
    ],
  },
  {
    employer: "mgm technology partners Vietnam",
    employerNote: "German software engineering firm",
    role: "Web Developer",
    period: "Jan 2017 – Jan 2018",
    color: "#c084fc",
    clients: [
      {
        name: "",
        description: "",
        highlights: [
          "Developed and maintained web applications for the Vietnam office of mgm technology partners.",
        ],
      },
    ],
  },
]

const projects = [
  {
    num: "01",
    icon: Network,
    title: "HAR Viewer",
    description:
      "Analyze HTTP Archive (HAR) files in the browser. Filter requests by URL pattern or method, generate Mermaid sequence diagrams, and inspect request/response details — all client-side.",
    tech: ["Next.js", "TypeScript", "Mermaid.js", "Tailwind CSS"],
    href: "/har-viewer",
    color: "#4FACFE",
  },
  {
    num: "02",
    icon: FileJson,
    title: "JSON Viewer",
    description:
      "Interactive JSON explorer with collapsible tree view, table conversion, and visual diagram generation. Useful for debugging API responses and understanding complex nested structures.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    href: "/json-viewer",
    color: "#2BFF88",
  },
  {
    num: "03",
    icon: BookOpen,
    title: "Python Learning",
    description:
      "Interactive Python learning platform with coding challenges and Vietnamese-language tutorials. Designed for Vietnamese developers taking their first steps into Python.",
    tech: ["Next.js", "Python", "TypeScript", "Tailwind CSS"],
    href: "https://code.tandat.dev",
    color: "#FFB344",
    external: true,
  },
]

const skillGroups = [
  {
    label: "Frontend",
    color: "#4FACFE",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "React Native", "HTML/CSS"],
  },
  {
    label: "Backend",
    color: "#2BFF88",
    skills: ["Node.js", "NestJS", "Express", "PostgreSQL", "MongoDB", "Redis", "REST API", "GraphQL"],
  },
  {
    label: "Cloud / DevOps",
    color: "#FFB344",
    skills: ["AWS (Certified)", "Docker", "GitHub Actions", "CI/CD", "Nginx", "Linux"],
  },
  {
    label: "Soft Skills",
    color: "#c084fc",
    skills: ["Tech Lead", "Agile / Scrum", "Sprint Planning", "Code Review", "Mentoring", "Client Communication"],
  },
  {
    label: "AI Tools",
    color: "#a78bfa",
    skills: ["Claude Code", "Cursor", "GitHub Copilot", "ChatGPT", "OpenSpec", "Prompt Engineering", "Spec-Driven Development"],
  },
  {
    label: "Languages",
    color: "#f472b6",
    skills: ["Vietnamese (Native)", "English (Professional Working)"],
  },
]

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    href: "https://www.credly.com/badges/cbba044f-bc25-4a5e-9fc6-0d45b9a35d0b/linked_in?t=rwtb9i",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    href: "https://verify.skilljar.com/c/7ov7jdyvxzme",
  },
  {
    name: "M201: MongoDB Performance",
    issuer: "MongoDB",
    href: null,
  },
  {
    name: "M112: Diagnostic Thinking",
    issuer: "MongoDB",
    href: null,
  },
  {
    name: "M220JS: MongoDB for JavaScript Developers",
    issuer: "MongoDB",
    href: null,
  },
  {
    name: "M320: Data Modeling",
    issuer: "MongoDB",
    href: null,
  },
  {
    name: "M121: The MongoDB Aggregation Framework",
    issuer: "MongoDB",
    href: null,
  },
]

const education = {
  degree: "Information Technology",
  institution: "Danang University of Science and Technology",
  location: "Da Nang, Vietnam",
  year: "2012 – 2017",
}

// ─── Animations ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── Fixed Nav ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
          }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-bold text-lg bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] bg-clip-text text-transparent">
            tandat.dev
          </a>
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm font-medium transition-colors ${activeSection === l.href.slice(1)
                    ? "text-[#4FACFE]"
                    : "text-gray-600 hover:text-[#4FACFE]"
                    }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex md:hidden items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-gray-500 hover:text-[#4FACFE] transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#4FACFE]/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#2BFF88]/10 blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center gap-5"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <MapPin size={14} />
            Da Nang City, Vietnam
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] bg-clip-text text-transparent">
              Dat Nguyen
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-500 font-medium">
            Fullstack JS Developer &amp; AWS Certified
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-xl text-gray-500 text-base leading-relaxed">
            I work closely with product owners, designers, and fellow developers to build and deliver high-quality fullstack applications. Strong proficiency in ReactJS and NodeJS, with a commitment to clean, maintainable code.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-4 mt-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-gray-600 hover:text-[#4FACFE] hover:shadow-lg transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4 mt-2">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="About Me" accent="#4FACFE" />
          <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-4 text-gray-600 leading-relaxed"
            >
              <motion.p variants={fadeUp}>
                I&apos;m a Fullstack JS Developer and AWS Certified engineer based in Da Nang, Vietnam with 10+ years of experience across the full stack — from internships at FPT Software and Sioux to leading the technical team at CoderPush.
              </motion.p>
              <motion.p variants={fadeUp}>
                Today I serve as Tech Lead for the Sleek project at CoderPush, an all-in-one digital platform for SMEs. I spearheaded the Sleek Business Account — a payment service enabling money transfers and virtual cards — and integrated three financial vendors to grow AUM to SGD 20M.
              </motion.p>
              <motion.p variants={fadeUp}>
                I contribute across the stack with strong proficiency in ReactJS and NodeJS, actively participating in sprint planning, code reviews, and retrospectives. Outside work I build developer tools and explore Da Nang on my motorcycle.
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-2 pt-1">
                <Award size={15} className="text-[#FFB344] flex-shrink-0" />
                <span className="text-sm text-gray-500">2× Hackathon Winner at Sleek (2023 &amp; 2024)</span>
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 gap-3"
            >
              {[
                ["10+", "Years experience"],
                ["SGD 20M", "AUM grown"],
                ["5+", "Companies"],
                ["AWS", "Certified"],
              ].map(([num, label]) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="rounded-2xl bg-gray-50 p-6 text-center"
                >
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] bg-clip-text text-transparent">
                    {num}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Experience" accent="#4FACFE" />
          <div className="mt-12 space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: exp.color }} />
                {/* Employer header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
                    <p className="font-semibold text-sm" style={{ color: exp.color }}>{exp.employer}</p>
                    <p className="text-xs text-gray-400">{exp.employerNote}</p>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {exp.period}
                    </span>
                  </div>
                </div>
                {/* Client projects */}
                <div className="space-y-5">
                  {exp.clients.map((client, j) => (
                    <div key={j}>
                      {client.name && (
                        <div className="mb-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Client: </span>
                          <span className="text-sm font-bold text-gray-700">{client.name}</span>
                          {client.description && (
                            <p className="text-xs text-gray-400 mt-0.5">{client.description}</p>
                          )}
                        </div>
                      )}
                      <ul className="space-y-2">
                        {client.highlights.map((h, k) => (
                          <li key={k} className="flex gap-3 text-sm text-gray-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: exp.color }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Side Projects ── */}
      <section id="projects" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Side Projects</h3>
          </motion.div>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="divide-y divide-gray-100"
          >
            {projects.map((p) => {
              const Icon = p.icon
              return (
                <motion.li key={p.num} variants={fadeUp} className="py-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={p.href}
                      target={p.external ? "_blank" : undefined}
                      rel={p.external ? "noopener noreferrer" : undefined}
                      className="text-sm font-semibold text-gray-800 hover:text-[#4FACFE] inline-flex items-center gap-1 transition-colors"
                    >
                      {p.title}
                      <ExternalLink size={11} className="opacity-50" />
                    </Link>
                    <p className="text-xs text-gray-400 truncate">{p.description}</p>
                  </div>
                  <div className="hidden sm:flex flex-wrap gap-1.5 flex-shrink-0">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs text-gray-500 bg-gray-100">{t}</span>
                    ))}
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Education" accent="#FFB344" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#FFB344]/10 text-[#FFB344]">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{education.degree}</h3>
              <p className="text-[#FFB344] font-semibold mt-0.5">{education.institution}</p>
              <p className="text-sm text-gray-400 mt-1">{education.location} · {education.year}</p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-[#FFB344]" />
              Certifications
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FFB344] flex-shrink-0" />
                  <div>
                    {cert.href ? (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-800 hover:text-[#4FACFE] inline-flex items-center gap-1 transition-colors"
                      >
                        {cert.name}
                        <ExternalLink size={11} className="opacity-60" />
                      </a>
                    ) : (
                      <span className="text-sm text-gray-600">{cert.name}</span>
                    )}
                    <p className="text-xs text-gray-400">{cert.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Skills" accent="#4FACFE" />
          <div className="mt-12 space-y-8">
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.h3 variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: group.color }}>
                  {group.label}
                </motion.h3>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-medium border"
                      style={{ borderColor: `${group.color}40`, backgroundColor: `${group.color}10`, color: group.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading title="Get in Touch" accent="#2BFF88" centered />
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 text-gray-500 leading-relaxed"
          >
            Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              variants={fadeUp}
              href="mailto:tandat2209@gmail.com"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Say Hello
            </motion.a>
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-gray-500 hover:text-[#4FACFE] hover:shadow-lg transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">
          <span className="font-semibold text-white">Dat Nguyen</span> · Fullstack JS Developer &amp; AWS Certified
        </p>
        <p className="text-gray-600 text-xs mt-1">© {new Date().getFullYear()} · tandat.dev</p>
      </footer>
    </>
  )
}

// ─── Section Heading ───────────────────────────────────────────────────────────

function SectionHeading({ title, accent, centered }: { title: string; accent: string; centered?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className={centered ? "text-center" : ""}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{title}</h2>
      <div
        className="mt-3 h-1 w-12 rounded-full"
        style={{
          backgroundColor: accent,
          marginLeft: centered ? "auto" : undefined,
          marginRight: centered ? "auto" : undefined,
        }}
      />
    </motion.div>
  )
}
