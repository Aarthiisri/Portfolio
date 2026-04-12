import { useState, useEffect, useRef } from "react";
import proj1 from "./assets/project1.png";
import proj2 from "./assets/project2.png";
import proj3 from "./assets/projects3.png";
import proj4 from "./assets/projects4.png";
import proj5 from "./assets/projects5.png";
import profile from "./assets/profile.jpeg"; 
import resume from "./assets/AARTHI RP-RESUME.pdf";

// ═══════════════════════════════════════════════════════
// 👉 UPDATE YOUR INFO HERE — only change this section
// ═══════════════════════════════════════════════════════
const INFO = {
  name: "Aarthi Rajendiran",
  email: "rpaarthi25@gmail.com",
  linkedin: "https://www.linkedin.com/in/aarthi-rajendiran",
  github: "https://github.com/aarthiisri",
  figma: "https://figma.com/@aarthi",
  cv:  resume,
  photo: profile,
  // 👆 Replace with your real photo URL
};

// ═══════════════════════════════════════════════════════
// 👉 UPDATE PROJECT IMAGES & LINKS HERE
// Replace image URLs with your actual project screenshots
// ═══════════════════════════════════════════════════════
const PROJECTS = [
  {
    title: "Plants Website",
    desc: "Creative, responsive plant-themed website with immersive nature-inspired UI and smooth animations.",
    tags: ["HTML", "CSS", "JS"],
    image: proj1,
    // 👆 Replace with your project screenshot URL
    accent: "#10b981",
    link: "https://aarthiisri.github.io/Buy-Green-Harvest-products/",
  },
  {
    title: "PLANTO App",
    desc: "Modern web app with seamless navigation and clean minimal interface for effortless user experience.",
    tags: ["Figma", "UI/UX","Prototyping"],
    image: proj2,
    accent: "#94b39f",
    link: "https://www.behance.net/gallery/237893109/Planta-Plant-Lovers-App",
  },
  
  {
    title: "Coffee Shop Website",
    desc: "Responsive coffee website with menu, gallery, testimonials and smooth scroll navigation.",
    tags: ["HTML", "CSS", "JS", "Swiper.js"],
    image: proj3,
    accent: "#f59e0b",
    link: "https://aarthiisri.github.io/Coffee-website/",
  },
  {
    title: "Women's Gym Website",
    desc: "Empowering women through fitness with a modern, responsive gym website featuring workout programs, clean UI, and smooth user experience.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    image: proj4,
    accent: "#e9039c",
    link: "https://aarthiisri.github.io/Gym-Femforce/",
  },
  {
    title: "Electronics Shop",
    desc: "A modern e-commerce web application built using React and Tailwind CSS, featuring product listings, category filtering, and a responsive shopping interface.",
    tags: ["React.js","Tailwind CSS", "React Router", "Context API","Clerk Authentication"],
    image: proj5,
    accent: "#0041f3",
    link: "https://electronics-shop-cyan-pi.vercel.app/",
  },
  
];

const NAV = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "HTML5",        level: 85, icon: "🌐", label: "Advanced" },
  { name: "CSS3",         level: 85, icon: "🎨", label: "Advanced" },
  { name: "JavaScript",  level: 75, icon: "⚡", label: "Intermediate" },
  { name: "React JS",    level: 75, icon: "⚛️",  label: "Intermediate" },
  { name: "Figma",       level: 80, icon: "✏️",  label: "Advanced" },
  { name: "Framer",      level: 65, icon: "🔲", label: "Intermediate" },
  { name: "Python",      level: 60, icon: "🐍", label: "Beginner+" },
  { name: "Tailwind CSS",level: 72, icon: "💨", label: "Intermediate" },
];

// ── Hooks ──────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [cur, setCur] = useState(true);
  const ri = useRef(0), ci = useRef(0), del = useRef(false);
  useEffect(() => {
    const t = setInterval(() => {
      const w = words[ri.current];
      if (!del.current) {
        if (ci.current <= w.length) { setText(w.slice(0, ci.current)); ci.current++; }
        else setTimeout(() => { del.current = true; }, 1400);
      } else {
        if (ci.current > 0) { ci.current--; setText(w.slice(0, ci.current)); }
        else { del.current = false; ri.current = (ri.current + 1) % words.length; }
      }
    }, del.current ? 38 : 65);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const b = setInterval(() => setCur(v => !v), 500);
    return () => clearInterval(b);
  }, []);
  return { text, cur };
}

// ── Skill Card ─────────────────────────────────────────
function SkillCard({ skill, delay, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20, padding: 20,
        border: `1px solid ${hov ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.07)"}`,
        background: "rgba(255,255,255,0.025)",
        opacity: visible ? 1 : 0,
        transform: visible ? (hov ? "translateY(-5px)" : "translateY(0)") : "translateY(26px)",
        transition: "all 0.5s",
        transitionDelay: `${delay}ms`,
        boxShadow: hov ? "0 16px 40px rgba(34,211,238,0.07)" : "none",
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(34,211,238,0.04),rgba(139,92,246,0.04))", opacity: hov ? 1 : 0, transition: "opacity 0.4s", pointerEvents: "none", borderRadius: 20 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 26, filter: "drop-shadow(0 0 7px rgba(139,92,246,0.4))" }}>{skill.icon}</span>
        <span style={{ fontSize: 19, fontWeight: 900, background: "linear-gradient(90deg,#22d3ee,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{skill.level}%</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 3 }}>{skill.name}</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 9 }}>{skill.label}</div>
      <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#22d3ee,#8b5cf6)", width: visible ? `${skill.level}%` : "0%", transition: `width 1.4s cubic-bezier(0.16,1,0.3,1) ${delay + 200}ms`, position: "relative" }}>
          <span style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: "0 0 7px #22d3ee", display: "block" }} />
        </div>
      </div>
    </div>
  );
}

// ── Project Card with real IMAGE ───────────────────────
function ProjectCard({ proj }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <a
      href={proj.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        width: 300,
        flexShrink: 0,
        borderRadius: 22,
        overflow: "hidden",
        textDecoration: "none",
        border: `1px solid ${hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
        background: "rgba(255,255,255,0.02)",
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s, border-color 0.3s",
        transform: hov ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hov ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${proj.accent}30` : "none",
      }}
    >
      {/* Image area */}
      <div style={{ height: 190, position: "relative", overflow: "hidden", background: "#0a0a1a" }}>
        {/* Accent top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${proj.accent},${proj.accent}40)`, zIndex: 3 }} />

        {!imgErr ? (
          <img
            src={proj.image}
            alt={proj.title}
            onError={() => setImgErr(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hov ? "scale(1.08)" : "scale(1)",
              display: "block",
            }}
          />
        ) : (
          // Fallback if image fails
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,#0a0a1a,${proj.accent}20)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ fontSize: 48, opacity: 0.6 }}>🖼️</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "0 16px" }}>Add your project screenshot</div>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)`, opacity: hov ? 1 : 0, transition: "opacity 0.4s", zIndex: 2 }} />

        {/* View button on hover */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${hov ? 1 : 0.7})`, opacity: hov ? 1 : 0, transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", zIndex: 3, background: proj.accent, borderRadius: 50, padding: "10px 20px", fontSize: 12, fontWeight: 800, color: "#000", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
          View Project ↗
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {proj.tags.map(t => (
            <span key={t} style={{ padding: "3px 10px", borderRadius: 50, fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", border: `1px solid ${proj.accent}40`, color: proj.accent, background: `${proj.accent}10` }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6, lineHeight: 1.3 }}>{proj.title}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginBottom: 12 }}>{proj.desc}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: hov ? 9 : 5, fontSize: 11, fontWeight: 700, color: proj.accent, letterSpacing: 1, textTransform: "uppercase", transition: "gap 0.3s" }}>
          View Project <span style={{ transition: "transform 0.3s", transform: hov ? "translateX(4px)" : "none" }}>→</span>
        </div>
      </div>
    </a>
  );
}

// ── Auto-Scroll Projects ───────────────────────────────
function ProjectsScroll() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(35);
  const posRef = useRef(0);
  const lastRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;

      if (!pausedRef.current) {
        const half = track.scrollWidth / 2;
        const pxPerMs = half / (speed * 1000);
        posRef.current += pxPerMs * dt;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const doubled = [...PROJECTS, ...PROJECTS];

  return (
    <div>
      <div style={{ overflow: "hidden", position: "relative", padding: "4px 0 16px" }}>
        {/* Fade masks */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 100, background: "linear-gradient(to right,#04040f,transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 100, background: "linear-gradient(to left,#04040f,transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div
          ref={trackRef}
          style={{ display: "flex", gap: 20, width: "max-content", willChange: "transform" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 300)}
        >
          {doubled.map((proj, i) => (
            <ProjectCard key={`${proj.title}-${i}`} proj={proj} />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 8 }}>
        <button
          onClick={() => setPaused(p => !p)}
          style={{ padding: "8px 22px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", fontSize: 11, color: paused ? "#22d3ee" : "rgba(255,255,255,0.5)", cursor: "pointer", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.3s", borderColor: paused ? "#22d3ee" : "rgba(255,255,255,0.12)" }}>
          {paused ? "▶ Play" : "⏸ Pause"}
        </button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[{ label: "Slow", val: 55 }, { label: "Normal", val: 35 }, { label: "Fast", val: 16 }].map(s => (
            <button key={s.val} onClick={() => setSpeed(s.val)} title={s.label}
              style={{ width: speed === s.val ? 22 : 8, height: 8, borderRadius: 4, background: speed === s.val ? "linear-gradient(90deg,#22d3ee,#8b5cf6)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const { text: typed, cur: cursorOn } = useTypewriter(["Front-End Developer", "UI/UX Designer", "React Developer", "Creative Thinker"]);
  const [skillsRef, skillsInView] = useInView(0.08);
  const [aboutRef, aboutInView] = useInView(0.1);
  const [contactRef, contactInView] = useInView(0.1);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const S = {
    sec: { padding: "clamp(60px,10vw,120px) clamp(16px,5vw,48px)", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 },
    eye: { fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#22d3ee", fontWeight: 700, marginBottom: 8 },
    h2: { fontSize: "clamp(26px,4vw,46px)", fontWeight: 900, background: "linear-gradient(180deg,#fff 50%,rgba(255,255,255,0.28))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 40 },
  };

  return (
    <div style={{ background: "#04040f", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box} html{scroll-behavior:smooth}

        ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:linear-gradient(#22d3ee,#8b5cf6)}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes bm{0%,100%{transform:scale(1)}50%{transform:scale(1.18) translate(14px,-14px)}}
        @keyframes pdot{0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,0.4)}50%{box-shadow:0 0 0 6px rgba(34,211,238,0)}}
        @media(max-width:860px){
          .hero-grid{grid-template-columns:1fr!important}
          .hero-visual{display:none!important}
          .about-grid{grid-template-columns:1fr!important}
          .nav-desktop{display:none!important}
          .ham-btn{display:flex!important}
          .cc-grid{grid-template-columns:1fr 1fr!important}
           .hero-mobile-bg{display:block!important}
        }
        @media(max-width:560px){
          .skills-grid{grid-template-columns:1fr 1fr!important}
          .stat-row{grid-template-columns:1fr 1fr!important}
          .cta-row{flex-direction:column!important}
          .cta-row a,.cta-row button{width:100%!important;justify-content:center!important}
          .con-btns{flex-direction:column!important;align-items:center!important}
          .cc-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "rgba(139,92,246,0.18)", filter: "blur(90px)", animation: "bm 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(34,211,238,0.13)", filter: "blur(90px)", animation: "bm 10s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(4,4,15,0.97)", backdropFilter: "blur(28px)", zIndex: 250, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, fontSize: 28, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", lineHeight: 1 }}>✕</button>
          {NAV.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{ fontSize: 20, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}>
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 200, height: 64, padding: "0 clamp(16px,5vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(4,4,15,0.82)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s" }}>
        <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 3, background: "linear-gradient(90deg,#22d3ee,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", userSelect: "none" }}>AARTHI.</span>

        <ul className="nav-desktop" style={{ display: "flex", gap: 28, listStyle: "none" }}>
          {NAV.map(l => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: active === l ? "#22d3ee" : "rgba(255,255,255,0.45)", background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontFamily: "inherit", transition: "color 0.3s" }}>{l}</button>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href={`mailto:${INFO.email}`}
            style={{ padding: "8px 20px", borderRadius: 50, background: "linear-gradient(135deg,#22d3ee,#8b5cf6)", fontSize: 11, fontWeight: 800, letterSpacing: 1, color: "#fff", textDecoration: "none", textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.3s", display: "inline-block" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(139,92,246,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
            Hire Me
          </a>
          <button className="ham-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ ...S.sec, minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64 }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, alignItems: "center", width: "100%" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 50, background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.2)", fontSize: 10, color: "#22d3ee", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", display: "inline-block", animation: "pdot 1.5s ease-in-out infinite" }} />
              Available for Opportunities
            </div>
            <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 600, marginBottom: 8 }}>Hello, I'm</p>
            <h1 style={{ fontSize: "clamp(36px,6vw,70px)", fontWeight: 900, lineHeight: 0.95, marginBottom: 6 }}>
              <span style={{ display: "block", background: "linear-gradient(180deg,#fff 50%,rgba(255,255,255,0.25))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AARTHI</span>
              <span style={{ display: "block", background: "linear-gradient(90deg,#22d3ee,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RAJENDIRAN</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "clamp(14px,2.5vw,18px)", color: "rgba(255,255,255,0.5)", fontWeight: 500, margin: "14px 0 18px", minHeight: 26 }}>
              <span>{typed}</span>
              <span style={{ width: 2, height: 18, background: "#22d3ee", display: "inline-block", opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }} />
            </div>
            <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.9, maxWidth: 430, marginBottom: 26 }}>
              Passionate Front-End Developer & UI/UX Designer crafting intuitive, responsive, and visually stunning digital experiences using React, Figma & modern web technologies.
            </p>
            <div className="cta-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
              <a href={INFO.cv} target="_blank" rel="noopener noreferrer"
                style={{ padding: "13px 26px", borderRadius: 50, background: "linear-gradient(135deg,#22d3ee,#8b5cf6)", fontSize: 13, fontWeight: 800, color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(139,92,246,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                ⬇ Download CV
              </a>
              <button onClick={() => scrollTo("Projects")}
                style={{ padding: "13px 26px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>
                View Projects →
              </button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { s: "G", href: INFO.github, title: "GitHub" },
                { s: "in", href: INFO.linkedin, title: "LinkedIn" },
                { s: "@", href: `mailto:${INFO.email}`, title: "Email" },
              ].map(({ s, href, title }) => (
                <a key={title} href={href} target={title !== "Email" ? "_blank" : undefined} rel="noopener noreferrer" title={title}
                  style={{ width: 37, height: 37, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 700, transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.color = "#22d3ee"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.transform = "none"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div className="hero-visual" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: 300, height: 300, animation: "float 5s ease-in-out infinite" }}>
              <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: "linear-gradient(135deg,#22d3ee,#8b5cf6,#ec4899)", animation: "spin 6s linear infinite", padding: 3, zIndex: 1 }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#04040f" }} />
              </div>
              <div style={{ position: "absolute", inset: 8, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg,rgba(34,211,238,0.1),rgba(139,92,246,0.15))", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                {!imgErr
                  ? <img src={INFO.photo} alt={INFO.name} onError={() => setImgErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: 86 }}>👩‍💻</span>}
              </div>
              <div style={{ position: "absolute", inset: -24, borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.07)", animation: "spin 14s linear infinite", zIndex: 0 }}>
                <span style={{ position: "absolute", top: 0, left: "50%", width: 9, height: 9, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 12px #22d3ee", transform: "translate(-50%,-50%)", display: "block" }} />
              </div>
              <div style={{ position: "absolute", inset: -46, borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.05)", animation: "spin 22s linear infinite reverse", zIndex: 0 }}>
                <span style={{ position: "absolute", bottom: 5, right: 5, width: 7, height: 7, borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 10px #8b5cf6", display: "block" }} />
              </div>
              {[
                { pos: { top: 8, right: -22 }, label: "Stack", color: "#22d3ee", text: "React + Figma" },
                { pos: { bottom: 22, left: -34 }, label: "Status", color: "#8b5cf6", text: "Open to Work ✨" },
              ].map((b, i) => (
                <div key={i} style={{ position: "absolute", ...b.pos, background: "rgba(4,4,20,0.88)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "9px 14px", zIndex: 3, whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>{b.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: b.color }}>{b.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" ref={aboutRef} style={S.sec}>
        <p style={S.eye}>Who I Am</p>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "start" }}>
          <div style={{ opacity: aboutInView ? 1 : 0, transform: aboutInView ? "none" : "translateX(-24px)", transition: "all 1s ease" }}>
            <h2 style={{ ...S.h2, marginBottom: 18 }}>About Me</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.43)", lineHeight: 1.9, marginBottom: 14 }}>
              I'm an aspiring <strong style={{ color: "#22d3ee", fontWeight: 700 }}>Front-End Developer & UI/UX Designer</strong> passionate about creating meaningful digital experiences. I design in Figma and build with React, HTML & CSS.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.43)", lineHeight: 1.9 }}>
              As a fresher, I'm eager to grow with experienced teams, contribute to real projects, and evolve as a developer-designer hybrid.
            </p>
            <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
              {[["5+","Projects"],["8+","Tools"],["10+","Designs"],["∞","Passion"]].map(([n, l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 15, padding: 16, transition: "all 0.3s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{n}</div>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 700, marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ opacity: aboutInView ? 1 : 0, transform: aboutInView ? "none" : "translateX(24px)", transition: "all 1s ease 0.15s", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: 24 }}>
            {[
              ["Role","Front-End Developer & UI/UX Designer"],
              ["Tools","Figma · Framer · VS Code"],
              ["Stack","HTML · CSS · JavaScript · React"],
              ["Status","Open to Internship / Full-time 🚀"],
              ["Style","Clean · Minimal · User-first"],
              ["Location","India 🇮🇳"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "#22d3ee", width: 56, flexShrink: 0, paddingTop: 2 }}>{k}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.52)", lineHeight: 1.6 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={S.sec}>
        <p style={S.eye}>What I Know</p>
        <h2 style={S.h2}>My Skills</h2>
        <div ref={skillsRef} className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 13 }}>
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 70} visible={skillsInView} />
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ ...S.sec, paddingLeft: 0, paddingRight: 0, maxWidth: "100%" }}>
        <div style={{ padding: "0 clamp(16px,5vw,48px)", maxWidth: 1200, margin: "0 auto" }}>
          <p style={S.eye}>My Work</p>
          <h2 style={S.h2}>Featured Projects</h2>
        </div>
        <ProjectsScroll />
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" ref={contactRef} style={{ ...S.sec, maxWidth: 800, textAlign: "center" }}>
        <p style={{ ...S.eye, textAlign: "center" }}>Let's Connect</p>
        <h2 style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 900, background: "linear-gradient(135deg,#fff,#22d3ee 40%,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, marginBottom: 16, opacity: contactInView ? 1 : 0, transform: contactInView ? "none" : "translateY(18px)", transition: "all 1s ease" }}>
          Open to Work.<br />Let's Build Together.
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 32, maxWidth: 420, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
          Actively seeking internship or entry-level opportunities. Whether it's a quick hello or a full project — my inbox is always open!
        </p>
        <div className="con-btns" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
          <a href={`mailto:${INFO.email}`}
            style={{ padding: "13px 26px", borderRadius: 50, background: "linear-gradient(135deg,#22d3ee,#8b5cf6)", fontSize: 13, fontWeight: 800, color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(139,92,246,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
            📧 Send a Message
          </a>
          <a href={INFO.cv} target="_blank" rel="noopener noreferrer"
            style={{ padding: "13px 26px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>
            ⬇ Download Resume
          </a>
        </div>
        <div className="cc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { ico: "📧", label: "Email", val: "rpaarthi25@gmail.com ", href: `mailto:${INFO.email}` },
            { ico: "🔗", label: "LinkedIn", val: "https://www.linkedin.com/in/aarthi-rajendiran", href: INFO.linkedin },
            { ico: "💻", label: "GitHub", val: "https://github.com/aarthiisri", href: INFO.github },
          ].map(({ ico, label, val, href }) => (
            <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 17, padding: "20px 16px", textAlign: "left", transition: "all 0.3s", textDecoration: "none", display: "block" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
              <div style={{ fontSize: 20, marginBottom: 9 }}>{ico}</div>
              <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 700, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", wordBreak: "break-all" }}>{val}</div>
            </a>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "24px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, color: "rgba(255,255,255,0.2)", position: "relative", zIndex: 10 }}>
        Designed & Built with <span style={{ color: "#ec4899" }}>♥</span> by{" "}
        <strong style={{ color: "#22d3ee", fontWeight: 700 }}>{INFO.name}</strong> · 2026
      </footer>
    </div>
  );
}