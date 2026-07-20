"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    src: "/cups/no6.png",
    bg: "#0D3A2B", // Deep Forest Green to match the Nº6 Drink & Gelato green cup
    label: "Paper Cup Nº6",
    sub: "Logo printing for milk tea, ice cream, gelato",
    emoji: "🥤",
  },
  {
    src: "/cups/ohlala.png",
    bg: "#9B63A5", // Soft Lavender/Purple to match Ohlala bear cup
    label: "Paper Cup Ohlala",
    sub: "Cute Bear milk tea cup",
    emoji: "🧋",
  },
  {
    src: "/cups/mio.png",
    bg: "#8A6D56", // Warm Kraft Brown to match Mio Homestay cup
    label: "Paper Cup Mio",
    sub: "Eco-friendly material",
    emoji: "🥤",
  },
  {
    src: "/cups/puy.png",
    bg: "#486B2A", // Fresh Leaf Green to match Puy Lime green cup
    label: "Paper Cup Puy",
    sub: "PUY - Eat clean, live pretty",
    emoji: "🥤",
  },
  {
    src: "/cups/miaoi.png",
    bg: "#756C5F", // Dark Warm Clay (supports white text contrast) for Mia Oi cup
    label: "Paper Cup Mia Oi",
    sub: "Mia Oi - Sweee ttt",
    emoji: "🥤",
  },
  {
    src: "/cups/goodtea.png",
    bg: "#C08A1D", // Festive Gold/Mustard Yellow for Good Tea cup
    label: "Paper Cup Good Tea",
    sub: "Home for a cozy Tet reunion",
    emoji: "🥤",
  },
];

const NAV_LINKS = [
  { label: "Products", target: "catalog" },
  { label: "Pricing", target: "calculator" },
  { label: "Video", target: "videos" },
  { label: "Projects", target: "projects" },
  { label: "Contact", target: "contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const animLock = useRef(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigate = useCallback((dir: "next" | "prev") => {
    if (animLock.current) return;
    animLock.current = true;
    const len = PRODUCTS.length;
    setActiveIndex((i) => (dir === "next" ? (i + 1) % len : (i + len - 1) % len));
    setTimeout(() => {
      animLock.current = false;
    }, 650);
  }, []);

  useEffect(() => {
    if (hovering) return;
    const t = setInterval(() => navigate("next"), 4000);
    return () => clearInterval(t);
  }, [hovering, navigate]);

  const active = PRODUCTS[activeIndex];
  const len = PRODUCTS.length;
  const left = (activeIndex + len - 1) % len;
  const right = (activeIndex + 1) % len;

  const getRole = (i: number) => {
    if (i === activeIndex) return "center";
    if (i === left) return "left";
    if (i === right) return "right";
    return "back";
  };

  const styleFor = (role: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      aspectRatio: "1 / 1",
      transition:
        "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms, opacity 650ms, left 650ms, height 650ms, bottom 650ms",
      willChange: "transform, filter, opacity",
    };
    if (role === "center")
      return {
        ...base,
        left: "50%",
        bottom: isMobile ? "24%" : "12%",
        height: isMobile ? "45%" : "60%",
        transform: `translateX(-50%) scale(${isMobile ? 1.15 : 1.35})`,
        filter: "blur(0)",
        opacity: 1,
        zIndex: 20,
      };
    if (role === "left")
      return {
        ...base,
        left: isMobile ? "15%" : "24%",
        bottom: isMobile ? "28%" : "18%",
        height: isMobile ? "25%" : "38%",
        transform: "translateX(-50%) scale(0.85)",
        filter: "blur(2px)",
        opacity: 0.65,
        zIndex: 10,
      };
    if (role === "right")
      return {
        ...base,
        left: isMobile ? "85%" : "76%",
        bottom: isMobile ? "28%" : "18%",
        height: isMobile ? "25%" : "38%",
        transform: "translateX(-50%) scale(0.85)",
        filter: "blur(2px)",
        opacity: 0.65,
        zIndex: 10,
      };
    return {
      ...base,
      left: "50%",
      bottom: isMobile ? "32%" : "22%",
      height: isMobile ? "18%" : "28%",
      transform: "translateX(-50%) scale(0.65)",
      filter: "blur(4px)",
      opacity: 0.35,
      zIndex: 5,
    };
  };

  return (
    <section
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) navigate(dx < 0 ? "next" : "prev");
        touchX.current = null;
      }}
      style={{
        backgroundColor: active.bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "var(--font-display), sans-serif",
      }}
      className="relative w-full overflow-hidden h-screen"
    >
      {/* grain */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50, opacity: 0.35 }}>
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>
      </div>

      {/* ghost text */}
      <div
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 2, top: "20%" }}
      >
        <span
          className="font-display"
          style={{
            fontSize: "clamp(80px, 25vw, 340px)",
            color: "#fff",
            opacity: 0.07,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          PACKAGING
        </span>
      </div>

      {/* navbar */}
      <nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between"
        style={{ zIndex: 60, padding: "20px 32px" }}
      >
        <a href="#" aria-label="Ly Giấy Tô Giấy">
          <img
            src="/logo-lygiay-white.svg"
            alt="Ly Giấy Tô Giấy"
            className="h-9 sm:h-10 w-auto"
            draggable={false}
          />
        </a>
        <div className="hidden md:flex" style={{ gap: 32 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={`#${l.target}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.target);
              }}
              style={{ color: "#fff", opacity: 0.85, fontSize: 13 }}
              className="hover:opacity-100 transition"
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollToId("calculator")}
          className="rounded-full hover:scale-105 transition-transform"
          style={{
            background: "#fff",
            color: active.bg,
            fontWeight: 600,
            fontSize: 13,
            padding: "10px 20px",
            transition: "all 150ms, color 650ms",
          }}
        >
          Get a Quote
        </button>
      </nav>

      {/* carousel */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {PRODUCTS.map((p, i) => {
          const role = getRole(i);
          return (
            <div key={i} style={styleFor(role)}>
              {imgError[i] ? (
                <div
                  className="w-full h-full flex items-center justify-center rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                    fontSize: role === "center" ? 120 : 60,
                  }}
                >
                  <span>{p.emoji}</span>
                </div>
              ) : (
                <img
                  src={p.src}
                  alt={p.label}
                  draggable={false}
                  onError={() => setImgError((e) => ({ ...e, [i]: true }))}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    userSelect: "none",
                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.25))",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* bottom-left */}
      <div
        className="absolute"
        style={{
          bottom: isMobile ? 24 : 80,
          left: isMobile ? 16 : 96,
          zIndex: 60,
          maxWidth: 340,
        }}
      >
        <div
          className="font-display"
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            color: "#fff",
            opacity: 0.98,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: 4,
          }}
        >
          {active.label}
        </div>
        <div
          className="hidden sm:block"
          style={{
            fontSize: 13,
            color: "#fff",
            opacity: 0.75,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {active.sub}
        </div>
        <p
          className="hidden sm:block"
          style={{ fontSize: 12, color: "#fff", opacity: 0.8, lineHeight: 1.7, marginBottom: 20 }}
        >
          Factory-direct production · Nationwide delivery · Custom logo printing · Best factory
          price.
        </p>
        <div className="flex gap-3">
          <button
            aria-label="Previous"
            onClick={() => navigate("prev")}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:scale-110 transition"
            style={{ border: "1.5px solid #fff", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ArrowLeft color="#fff" size={22} strokeWidth={2} />
          </button>
          <button
            aria-label="Next"
            onClick={() => navigate("next")}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:scale-110 transition"
            style={{ border: "1.5px solid #fff", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ArrowRight color="#fff" size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* bottom-right */}
      <a
        href="#catalog"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("catalog");
        }}
        className="absolute flex items-center gap-2 font-display hover:opacity-100"
        style={{
          bottom: isMobile ? 24 : 80,
          right: isMobile ? 16 : 40,
          zIndex: 60,
          fontSize: "clamp(18px, 3.5vw, 48px)",
          color: "#fff",
          opacity: 0.92,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "opacity 200ms",
        }}
      >
        VIEW NOW
        <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2} />
      </a>

      {/* dots */}
      <div
        className="absolute hidden sm:flex gap-2"
        style={{ bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 60 }}
      >
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => !animLock.current && setActiveIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === activeIndex ? 24 : 8,
              background: i === activeIndex ? "#fff" : "rgba(255,255,255,0.4)",
              transitionDuration: "300ms",
            }}
          />
        ))}
      </div>
    </section>
  );
}
