import React, { Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Section from "./components/Section";
import heroImage from "./assets/aadipic.jpeg";
import {
  profile,
  skills,
  projects,
  experience,
  background,
  certifications
} from "./data/portfolio";
import "./styles.css";

const ProjectCarousel = React.lazy(() => import("./components/ProjectCarousel"));

const sectionIds = [
  "about",
  "skills",
  "projects",
  "experience",
  "background",
  "certifications",
  "contact"
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const navItems = useMemo(
    () => [
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "background", label: "Background" },
      { id: "contact", label: "Contact" }
    ],
    []
  );

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="hero">
        <nav className="nav" aria-label="Primary">
          <span className="logo">AG</span>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="eyebrow" variants={fadeUp}>
              {profile.title}
            </motion.p>
            <motion.h1 variants={fadeUp}>{profile.name}</motion.h1>
            <motion.p className="lead" variants={fadeUp}>
              {profile.intro}
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              {/* <a className="btn primary" href="#projects">
                View Projects
              </a> */}
              <a className="btn ghost" href="#contact">
                Let's Connect
              </a>
            </motion.div>
            <motion.div className="meta" variants={fadeUp}>
              <span>{profile.email}</span>
              <span>{profile.linkedin}</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-image-wrap">
              <img src={heroImage} alt="Aadi Amritraj Gupta portrait" />
            </div>
          </motion.div>
        </div>
      </header>

      <main id="main">
        <Section id="about" kicker="Profile" title="About" variant="left">
          <p className="section-text">
            Python-focused developer building financial risk applications in
            technology consulting. I shipped an RBI-compliant credit-risk
            platform to production for a banking client, with hands-on
            experience across Python, SQL, Flask REST APIs, and Docker-based
            on-premises deployment. I'm keen to build modular, efficient
            applications at the intersection of technology, financial data,
            and portfolio analytics.
          </p>
        </Section>

        <Section id="skills" kicker="Skillset" title="Skills" variant="right">
          <div className="grid-2-3">
            {skills.map((group) => (
              <div className="card" key={group.label}>
                <h3>{group.label}</h3>
                <div className="skill-grid">
                  {group.items.map((item) => (
                    <div className="skill-row" key={item}>
                      <span>{item}</span>
                      <span className="skill-dots">
                        <span />
                        <span />
                        <span />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" kicker="Selected" title="Projects" variant="scale">
          <div className="project-carousel-wrap">
            <Suspense fallback={<div className="card">Loading projects...</div>}>
              <ProjectCarousel projects={projects} />
            </Suspense>
          </div>
        </Section>

        <Section id="experience" kicker="Industry" title="Experience" variant="left">
          <div className="stack">
            {experience.map((role) => (
              <div className="card" key={`${role.company}-${role.role}`}>
                <div className="card-row">
                  <div>
                    <h3>{role.role}</h3>
                    <p className="muted">{role.company}</p>
                  </div>
                  <span className="pill">{role.period}</span>
                </div>
                <ul>
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="background"
          kicker="Background"
          title="Education & Extras"
          variant="right"
        >
          <div className="grid-2">
            {background.map((group) => (
              <div className="card" key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="certifications"
          kicker="Proof"
          title="Certifications & Interests"
          variant="scale"
        >
          <div className="card">
            <ul className="two-col">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="contact" kicker="Contact" title="Let's Build Something">
          <div className="contact-card">
            <p className="section-text">
              Open to collaborations and projects in risk analytics, financial
              technology, and data-driven consulting solutions.
            </p>
            <div className="contact-links">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                Email Me
              </a>
              <a className="btn ghost" href={`https://${profile.linkedin}`}>
                LinkedIn
              </a>
            </div>
            <div className="meta">
              <span>{profile.phone}</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
      </footer>
    </div>
  );
}
