import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    src: "https://drive.google.com/uc?export=view&id=1W6FCKNy2lvdqIwmUV9m-rJbZleaBgjZ0",
    bg: "#0D9488",
    label: "Ly Giấy",
    sub: "In logo theo yêu cầu",
    emoji: "🥤",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1jNjU0E30sicClmPCjJf0OUrX6-ClJ7gz",
    bg: "#0F766E",
    label: "Tô Giấy",
    sub: "Đựng phở, bún, mì",
    emoji: "🍜",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1V5opotJH8N7hwlgDcQTlWtEzEqIG27LW",
    bg: "#115E59",
    label: "Ly Nhựa PET",
    sub: "Trà sữa, nước uống",
    emoji: "🧋",
  },
  {
    src: "https://drive.google.com/uc?export=view&id=1OjMVUNw8gZprM_xiTzmaiji1Ol-OPwLD",
    bg: "#134E4A",
    label: "Hộp Giấy",
    sub: "Đóng gói thực phẩm",
    emoji: "📦",
  },
];

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

  useEffect(() => {
    PRODUCTS.forEach((p, i) => {
      const img = new Image();
      img.src = p.src;
      img.onerror = () => setImgError((e) => ({ ...e, [i]: true }));
    });
  }, []);

  const navigate = useCallback((dir: "next" | "prev") => {
    if (animLock.current) return;
    animLock.current = true;
    setActiveIndex((i) => (dir === "next" ? (i + 1) % 4 : (i + 3) % 4));
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
  const left = (activeIndex + 3) % 4;
  const right = (activeIndex + 1) % 4;
  const back = (activeIndex + 2) % 4;

  const getRole = (i: number) => {
    if (i === activeIndex) return "center";
    if (i === left) return "left";
    if (i === right) return "right";
    return "back";
  };

  const styleFor = (role: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      aspectRatio: "0.55 / 1",
      transition:
        "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms, opacity 650ms, left 650ms, height 650ms, bottom 650ms",
      willChange: "transform, filter, opacity",
    };
    if (role === "center")
      return {
        ...base,
        left: "50%",
        bottom: isMobile ? "20%" : 0,
        height: isMobile ? "58%" : "90%",
        transform: `translateX(-50%) scale(${isMobile ? 1.2 : 1.6})`,
        filter: "blur(0)",
        opacity: 1,
        zIndex: 20,
      };
    if (role === "left")
      return {
        ...base,
        left: isMobile ? "18%" : "28%",
        bottom: isMobile ? "30%" : "10%",
        height: isMobile ? "15%" : "26%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.75,
        zIndex: 10,
      };
    if (role === "right")
      return {
        ...base,
        left: isMobile ? "82%" : "72%",
        bottom: isMobile ? "30%" : "10%",
        height: isMobile ? "15%" : "26%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.75,
        zIndex: 10,
      };
    return {
      ...base,
      left: "50%",
      bottom: isMobile ? "32%" : "12%",
      height: isMobile ? "12%" : "20%",
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 0.5,
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
        fontFamily: "Be Vietnam Pro, sans-serif",
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
          BAO BÌ
        </span>
      </div>

      {/* navbar */}
      <nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between"
        style={{ zIndex: 60, padding: "20px 32px" }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>LY GIẤY</div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Tô Giấy
          </div>
        </div>
        <div className="hidden md:flex" style={{ gap: 32 }}>
          {["Sản Phẩm", "Báo Giá", "Video", "Tin Tức", "Liên Hệ"].map((l) => (
            <a
              key={l}
              href="#"
              style={{ color: "#fff", opacity: 0.85, fontSize: 13 }}
              className="hover:opacity-100 transition"
            >
              {l}
            </a>
          ))}
        </div>
        <button
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
          Báo Giá Ngay
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
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
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
          Sản xuất tại xưởng · Giao hàng tận nơi · In logo theo yêu cầu · Giá xưởng tốt nhất.
        </p>
        <div className="flex gap-3">
          <button
            aria-label="Trước"
            onClick={() => navigate("prev")}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:scale-110 transition"
            style={{ border: "1.5px solid #fff", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ArrowLeft color="#fff" size={22} strokeWidth={2} />
          </button>
          <button
            aria-label="Sau"
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
        href="#products"
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
        XEM NGAY
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
