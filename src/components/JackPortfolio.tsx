import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ContactButton } from "./ContactButton";
import { LiveProjectButton } from "./LiveProjectButton";
import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { AnimatedText } from "./AnimatedText";
import { Mail, ArrowUpRight } from "lucide-react";
import { Hero } from "./Hero";

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
    <div className="main-wrapper w-full bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip min-h-screen relative font-sans">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <section id="about" className="min-h-screen w-full relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden select-none">
        {/* Corner 3D icons */}
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
            alt="Moon Icon"
          />
        </FadeIn>
        
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain"
            alt="3D Shape"
          />
        </FadeIn>

        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
            alt="Lego Icon"
          />
        </FadeIn>

        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain"
            alt="3D Group"
          />
        </FadeIn>

        {/* Content wrapper */}
        <div className="flex flex-col items-center z-20 text-center max-w-4xl mx-auto">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-16" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
              About me
            </h2>
          </FadeIn>

          <div className="mb-16 sm:mb-20 md:mb-24 px-4">
            <AnimatedText text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
          </div>

          <FadeIn delay={0.1} y={20}>
            <ContactButton onClick={handleContactClick} />
          </FadeIn>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="price" className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0">
        <h2 className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          Services
        </h2>

        <div className="w-full max-w-5xl mx-auto flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {servicesData.map((svc, i) => (
            <FadeIn key={svc.num} delay={i * 0.1} y={30} className="border-b border-[rgba(12,12,12,0.15)]">
              <div className="flex flex-row items-center gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12 text-left">
                <span
                  className="font-black leading-none text-[#0C0C0C] shrink-0 min-w-[70px] sm:min-w-[120px] md:min-w-[160px]"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {svc.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] leading-tight"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C]/60 leading-relaxed max-w-2xl"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 pb-24">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
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

      {/* Optional Contact Anchor & Minimal Footer */}
      <footer id="contact" className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 py-12 px-6 text-center text-[#D7E2EA]/50 text-sm tracking-wider uppercase">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} JACK — 3D CREATOR. ALL RIGHTS RESERVED.</div>
          <button
            onClick={handleContactClick}
            className="flex items-center gap-2 text-[#D7E2EA] hover:text-[#BBCCD7] transition-colors"
          >
            <Mail size={16} />
            <span>jack@example.com</span>
            <ArrowUpRight size={16} />
          </button>
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
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3"
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

// Sub-component: Stacking Project Card
interface ProjectCardProps {
  project: typeof projectsData[number];
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
      className="h-auto md:h-[85vh] w-full flex flex-col justify-start relative"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale: isMobile ? 1 : scale,
          top: isMobile ? "auto" : `calc(6rem + ${index * 28}px)`,
        }}
        className="relative md:sticky w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7E2EA]/15 pb-6 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[#D7E2EA] leading-none shrink-0" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              {project.num}
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#D7E2EA] tracking-tight">
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
              style={{ height: "clamp(130px, 16vw, 230px)" }}
              loading="lazy"
            />
            <img
              src={project.img2}
              alt={`${project.name} B`}
              className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
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
