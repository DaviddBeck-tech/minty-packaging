"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ContactButton } from "./ContactButton";
import { LiveProjectButton } from "./LiveProjectButton";
import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { AnimatedText } from "./AnimatedText";
import { Mail, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { Hero } from "./Hero";
import { InteractiveCatalog } from "./InteractiveCatalog";
import { QuoteCalculator } from "./QuoteCalculator";

// Premium champagne-gold accent (shared with the catalog section)
const GOLD = "#C9A961";

// Project Data
const projectsData = [
  {
    num: "01",
    name: "Nextlevel Studio",
    category: "Client",
    link: "https://nextlevel.studio",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    num: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    link: "https://aura.brand",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    num: "03",
    name: "Solaris Digital",
    category: "Client",
    link: "https://solaris.digital",
    img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

// Service Data
const servicesData = [
  {
    num: "01",
    name: "3D Modeling",
    desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    num: "02",
    name: "Rendering",
    desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    num: "03",
    name: "Motion Design",
    desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    num: "04",
    name: "Branding",
    desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
  },
  {
    num: "05",
    name: "Web Design",
    desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

// Marquee Row 1
const originalRow1 = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];
const row1Images = [...originalRow1, ...originalRow1, ...originalRow1];

// Marquee Row 2
const originalRow2 = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];
const row2Images = [...originalRow2, ...originalRow2, ...originalRow2];

export function JackPortfolio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleContactClick = () => {
    window.location.href = "mailto:jack@example.com?subject=Inquiry from Portfolio";
  };

  return (
    <div className="main-wrapper w-full bg-background text-foreground min-h-screen relative font-sans">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <section
        id="about"
        className="min-h-screen w-full relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-background transition-colors duration-300 overflow-hidden select-none"
      >
        {/* Corner 3D icons */}
        <FadeIn
          delay={0.1}
          x={-80}
          y={0}
          duration={0.9}
          className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
            alt="Moon Icon"
          />
        </FadeIn>

        <FadeIn
          delay={0.25}
          x={-80}
          y={0}
          duration={0.9}
          className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain"
            alt="3D Shape"
          />
        </FadeIn>

        <FadeIn
          delay={0.15}
          x={80}
          y={0}
          duration={0.9}
          className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
            alt="Lego Icon"
          />
        </FadeIn>

        <FadeIn
          delay={0.3}
          x={80}
          y={0}
          duration={0.9}
          className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain"
            alt="3D Group"
          />
        </FadeIn>

        {/* Content wrapper */}
        <div className="flex flex-col items-center z-20 text-center max-w-4xl mx-auto">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-16"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              About Us
            </h2>
          </FadeIn>

          <div className="mb-12 sm:mb-14 md:mb-16 px-4">
            <AnimatedText text="With over 5 years of experience in F&B brand design and packaging printing, we are proud to partner with thousands of milk tea and coffee brands nationwide. We always put refined 3D design aesthetics and lasting quality first!" />
          </div>

          <FadeIn delay={0.1} y={20}>
            <ContactButton onClick={handleContactClick} />
          </FadeIn>
        </div>
      </section>

      {/* 4. INTERACTIVE CATALOG SECTION */}
      <InteractiveCatalog />

      {/* 5. PROJECTS SECTION */}
      <section
        id="projects"
        className="bg-background transition-colors duration-300 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 pb-20 md:pb-28"
      >
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky stacking container */}
        <div className="flex flex-col gap-10 md:gap-0 max-w-5xl mx-auto relative">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
              totalCards={3}
              isMobile={isMobile}
            />
          ))}
        </div>
      </section>

      {/* 6. QUOTE CALCULATOR SECTION */}
      <QuoteCalculator />

      {/* 7. FACTORY VIDEOS SECTION */}
      <FactoryVideos />

      {/* Optional Contact Anchor & Minimal Footer */}
      <footer
        id="contact"
        className="bg-background transition-colors duration-300 border-t border-foreground/10 py-16 px-6 text-left text-foreground/70 text-sm relative z-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column: Factory Information */}
          <FadeIn delay={0} y={25} className="space-y-4">
            <div>
              <h3 className="text-lg font-black uppercase text-[#1F6E4E] tracking-wider">
                PAPER CUP & BOWL FACTORY
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed max-w-sm font-light mt-4">
                Specializing in the design and manufacture of high-quality paper cups, plastic cups,
                paper bowls and paper packaging for F&B brands nationwide. Food safety guaranteed.
              </p>
              <div className="space-y-2 text-xs text-foreground/80 font-light mt-4">
                <p>
                  <strong>HCM Factory:</strong> No. 11, Street 6, Quarter 7, Hiep Binh Chanh Ward,
                  Thu Duc, HCMC
                </p>
                <p>
                  <strong>Dak Lak Office:</strong> P17, Ton Duc Thang Street, Eco City, Tan An Ward,
                  Buon Ma Thuot
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Contact Details */}
          <FadeIn
            delay={0.15}
            y={25}
            className="space-y-4 md:text-right flex flex-col md:items-end justify-between"
          >
            <div className="w-full">
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-foreground/40 font-bold">
                  QUICK CONSULTATION & QUOTE
                </h4>
                <p className="text-lg font-black text-[#1F6E4E]">
                  <a href="tel:0902618079" className="hover:underline">
                    0902 618 079
                  </a>
                </p>
                <p className="text-lg font-black text-[#1F6E4E]">
                  <a href="tel:0909148131" className="hover:underline">
                    0909 148 131
                  </a>
                </p>
              </div>

              <div className="flex flex-col md:items-end gap-2 text-xs text-foreground/50 mt-4 border-t border-foreground/10 pt-4 w-full">
                <div>© {new Date().getFullYear()} MINTY PACKAGING. ALL RIGHTS RESERVED.</div>
                <button
                  onClick={handleContactClick}
                  className="flex items-center gap-2 text-foreground hover:text-[#1F6E4E] transition-colors bg-transparent border-none p-0 cursor-pointer self-start md:self-end"
                >
                  <Mail size={14} />
                  <span>lygiaytogiaygiare@gmail.com</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}

// Sub-component: Marquee Section with passive scrolling offset
function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculated = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-background transition-colors duration-300 pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3"
    >
      {/* Row 1: Moves right on scroll */}
      <div
        className="flex gap-3 whitespace-nowrap"
        style={{
          transform: `translate3d(${offset - 200}px, 0px, 0px)`,
          willChange: "transform",
        }}
      >
        {row1Images.map((src, i) => (
          <img
            key={`row1-${i}`}
            src={src}
            alt={`Tile ${i}`}
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0 select-none pointer-events-none"
            loading="lazy"
          />
        ))}
      </div>

      {/* Row 2: Moves left on scroll */}
      <div
        className="flex gap-3 whitespace-nowrap"
        style={{
          transform: `translate3d(${-(offset - 200)}px, 0px, 0px)`,
          willChange: "transform",
        }}
      >
        {row2Images.map((src, i) => (
          <img
            key={`row2-${i}`}
            src={src}
            alt={`Tile ${i}`}
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0 select-none pointer-events-none"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

// Sub-component: Factory Videos (cinematic featured + secondary list)
const FACTORY_VIDEOS = [
  {
    title: "Paper cup printing process at the factory",
    meta: "2-layer PE cold-drink cup production",
    ytId: "8Z2tkkSgoE4",
    duration: "2:30",
  },
  {
    title: "Brand logo printing on paper cups",
    meta: "Rotary press color-plate alignment",
    ytId: "dR6raK9-k0Y",
    duration: "3:15",
  },
  {
    title: "Hot-water-resistant paper bowl production",
    meta: "High-tech automatic heat-sealed base",
    ytId: "TDaCUSKEEuk",
    duration: "1:45",
  },
];

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const openVideo = (id: string) => window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");

function PlayBadge({ size }: { size: "lg" | "sm" }) {
  const dim = size === "lg" ? "w-16 h-16 sm:w-20 sm:h-20" : "w-10 h-10";
  const icon = size === "lg" ? "w-7 h-7 sm:w-8 sm:h-8" : "w-4 h-4";
  return (
    <span
      className={`absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#C9A961] group-hover:bg-[#C9A961]/30 ${dim}`}
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
    >
      <Play className={`${icon} ml-0.5 fill-white text-white`} />
    </span>
  );
}

function FactoryVideos() {
  const [featured, ...rest] = FACTORY_VIDEOS;

  return (
    <section
      id="videos"
      className="bg-background transition-colors duration-300 py-24 px-5 sm:px-8 md:px-10 border-t border-foreground/10 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <div className="text-center mb-12 md:mb-14">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#1F6E4E] uppercase mb-3 inline-flex items-center gap-3">
              <span className="h-px w-6" style={{ background: GOLD }} />
              REAL PRODUCTION PROCESS
              <span className="h-px w-6" style={{ background: GOLD }} />
            </span>
            <h2
              className="hero-heading font-black uppercase text-center mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              Factory Videos
            </h2>
            <p className="text-foreground/60 max-w-lg mx-auto text-sm leading-relaxed font-light">
              Explore our closed-loop, fully automated printing process that meets food-safety and
              hygiene standards.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Featured video */}
          <FadeIn delay={0} y={35} className="lg:col-span-7">
            <button
              type="button"
              onClick={() => openVideo(featured.ytId)}
              className="group relative block w-full overflow-hidden rounded-[28px] border border-white/70 cursor-pointer text-left h-[280px] sm:h-[380px] lg:h-[460px] shadow-[0_30px_60px_rgba(31,110,78,0.12)]"
            >
              <img
                src={ytThumb(featured.ytId)}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/5" />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span
                  className="text-[10px] font-black tracking-[0.2em] px-3 py-1.5 rounded-full"
                  style={{ color: "#0B100D", background: GOLD }}
                >
                  EP. 01
                </span>
                <span className="text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {featured.duration}
                </span>
              </div>

              <PlayBadge size="lg" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: GOLD }}
                >
                  {featured.meta}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1.5 leading-tight">
                  {featured.title}
                </h3>
              </div>
            </button>
          </FadeIn>

          {/* Secondary list */}
          <FadeIn delay={0.15} y={35} className="lg:col-span-5">
            <div className="flex flex-col gap-5 h-full lg:h-[460px]">
              {rest.map((v, i) => (
                <button
                  key={v.ytId}
                  type="button"
                  onClick={() => openVideo(v.ytId)}
                  className="group relative flex gap-4 w-full flex-1 min-h-[110px] text-left rounded-2xl overflow-hidden border border-white/70 bg-white/60 backdrop-blur-md p-2.5 hover:border-[#C9A961]/50 transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(31,110,78,0.05)]"
                >
                  <div className="relative w-32 lg:w-40 shrink-0 self-stretch rounded-xl overflow-hidden">
                    <img
                      src={ytThumb(v.ytId)}
                      alt={v.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                    <PlayBadge size="sm" />
                    <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold text-white bg-black/55 px-1.5 py-0.5 rounded">
                      {v.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center py-1 pr-1">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest"
                      style={{ color: GOLD }}
                    >
                      EP. 0{i + 2}
                    </span>
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 mt-1 leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-xs text-foreground/50 mt-1 line-clamp-1">{v.meta}</p>
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Sub-component: Stacking Project Card
interface ProjectCardProps {
  project: (typeof projectsData)[number];
  index: number;
  totalCards: number;
  isMobile: boolean;
}

function ProjectCard({ project, index, totalCards, isMobile }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className={`${
        index === totalCards - 1 ? "h-auto" : "h-auto md:h-[120vh]"
      } w-full flex flex-col justify-start md:sticky relative`}
      style={{
        zIndex: index + 1,
        top: isMobile ? "auto" : `calc(6rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale: isMobile ? 1 : scale,
        }}
        className="relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#1F6E4E]/30 bg-background text-foreground transition-colors duration-300 p-4 sm:p-6 md:p-8 flex flex-col justify-between"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-foreground/10 pb-6 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-foreground leading-none shrink-0"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {project.num}
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-widest text-foreground/60 font-medium">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-foreground tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton onClick={() => window.open(project.link, "_blank")} />
        </div>

        {/* Card Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 items-stretch">
          {/* Left: 40% width on md+ */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
            <img
              src={project.img1}
              alt={`${project.name} A`}
              className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px]"
              style={{ height: "clamp(120px, 14vw, 200px)" }}
              loading="lazy"
            />
            <img
              src={project.img2}
              alt={`${project.name} B`}
              className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px]"
              style={{ height: "clamp(150px, 18vw, 280px)" }}
              loading="lazy"
            />
          </div>

          {/* Right: 60% width on md+ */}
          <div className="md:col-span-6 flex">
            <img
              src={project.img3}
              alt={`${project.name} C`}
              className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px] min-h-[300px] md:min-h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
