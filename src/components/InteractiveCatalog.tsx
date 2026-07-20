"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  GlassWater,
  Soup,
  Sparkles,
  CheckCircle2,
  Ruler,
  Layers,
  Droplets,
} from "lucide-react";
import { FadeIn } from "./FadeIn";

// Premium champagne-gold accent paired with the minty green palette
const GOLD = "#C9A961";

interface ProductItem {
  id: string;
  name: string;
  capacity: string;
  moq: string;
  usage: string;
  materials: string;
  specs: string;
  bestFor: string;
  has3D: boolean;
  image?: string; // transparent-bg product render shown in the spotlight
}

const CATALOG_DATA: Record<
  string,
  { icon: React.ComponentType<any>; label: string; items: ProductItem[] }
> = {
  paper_cups: {
    icon: Coffee,
    label: "Paper Cups",
    items: [
      {
        id: "pc-1",
        name: "Paper Cup Sampling 4.5oz",
        capacity: "135ml",
        moq: "2,000 pcs",
        usage: "Product sampling, office drinking water, dental clinics.",
        materials: "Pure PO paper 190gsm + 1 PE waterproof layer",
        specs: "Rim: 60mm · Base: 45mm · Height: 62mm",
        bestFor: "Water sampling, coffee tasting",
        has3D: true,
        image: "/cups/miaoi.png",
      },
      {
        id: "pc-2",
        name: "Paper Cup Office 7oz",
        capacity: "210ml",
        moq: "1,000 pcs",
        usage: "For offices, banks, events and schools.",
        materials: "Pure PO paper 210gsm + 1 PE waterproof layer",
        specs: "Rim: 70mm · Base: 52mm · Height: 78mm",
        bestFor: "Quick hot/cold drinks",
        has3D: true,
        image: "/cups/mio.png",
      },
      {
        id: "pc-3",
        name: "Paper Cup Coffee/Tea 9oz",
        capacity: "270ml",
        moq: "1,000 pcs",
        usage: "Hot coffee, hot tea, hot cocoa, cappuccino.",
        materials: "PO paper 230gsm + 1 PE layer (optional 2-layer Kraft insulation)",
        specs: "Rim: 75mm · Base: 53mm · Height: 90mm",
        bestFor: "Espresso, Americano, hot coffee",
        has3D: true,
        image: "/cups/no6.png",
      },
      {
        id: "pc-4",
        name: "Paper Cup Medium 12oz",
        capacity: "360ml",
        moq: "1,000 pcs",
        usage: "Medium smoothies, iced milk coffee, fruit tea.",
        materials: "Pure PO paper 280gsm + 2 PE layers (won't soften with cold printing)",
        specs: "Rim: 80mm · Base: 53mm · Height: 115mm",
        bestFor: "Iced coffee, juice, matcha",
        has3D: true,
        image: "/cups/puy.png",
      },
      {
        id: "pc-5",
        name: "Paper Cup Large 16oz",
        capacity: "480ml",
        moq: "1,000 pcs",
        usage: "Standard-size milk tea, iced juice, smoothies.",
        materials: "Pure PO paper 290gsm + 2 PE layers (anti-condensation)",
        specs: "Rim: 90mm · Base: 60mm · Height: 127mm",
        bestFor: "Milk tea, black tea, large smoothies",
        has3D: true,
        image: "/cups/ohlala.png",
      },
      {
        id: "pc-6",
        name: "Paper Cup King Size 22oz",
        capacity: "700ml",
        moq: "1,000 pcs",
        usage: "Giant-size cup for large kumquat tea and fruit tea shops.",
        materials: "Pure PO paper 300gsm + 2 thick PE layers",
        specs: "Rim: 90mm · Base: 62mm · Height: 155mm",
        bestFor: "Giant kumquat tea, strawberry tea, lychee tea",
        has3D: true,
        image: "/cups/goodtea.png",
      },
    ],
  },
  plastic_cups: {
    icon: GlassWater,
    label: "Plastic Cups",
    items: [
      {
        id: "pl-1",
        name: "PET Plastic Cup 360ml",
        capacity: "360ml",
        moq: "1,000 pcs",
        usage: "For iced coffee and colorful fruit juices. Use dome or flat lids.",
        materials: "Virgin PET plastic, ultra-clear and rigid (cannot be film-sealed)",
        specs: "Rim: 93mm · Base: 55mm · Height: 108mm",
        bestFor: "Iced phin coffee, Highland-style coffee",
        has3D: false,
      },
      {
        id: "pl-2",
        name: "PET Plastic Cup 500ml",
        capacity: "500ml",
        moq: "1,000 pcs",
        usage: "Great for artistic blended-ice drinks and premium fruit teas.",
        materials: "Thick virgin PET plastic, strong and durable",
        specs: "Rim: 98mm · Base: 58mm · Height: 122mm",
        bestFor: "Blended matcha, fruit smoothies",
        has3D: true,
      },
      {
        id: "pl-3",
        name: "PP Plastic Cup 500ml",
        capacity: "500ml",
        moq: "1,000 pcs",
        usage: "Standard milk tea cup; can be film-sealed for long-distance shipping.",
        materials: "Flexible PP plastic, slightly opaque, warm-heat resistant (easy to film-seal)",
        specs: "Rim: 95mm · Base: 56mm · Height: 128mm",
        bestFor: "Traditional film-sealed milk tea",
        has3D: false,
      },
      {
        id: "pl-4",
        name: "Round-Bottom Plastic Cup 500ml",
        capacity: "500ml",
        moq: "1,000 pcs",
        usage: "Adorable chubby round shape, very appealing to young customers.",
        materials: "High-quality flexible PP plastic, dome or heart lid",
        specs: "Rim: 95mm · Base: Rounded · Height: 110mm",
        bestFor: "Fresh milk with brown sugar boba",
        has3D: true,
      },
    ],
  },
  paper_bowls: {
    icon: Soup,
    label: "Paper Bowls",
    items: [
      {
        id: "pb-1",
        name: "Ice Cream Paper Bowl 6oz",
        capacity: "180ml",
        moq: "1,000 pcs",
        usage: "For ice cream scoops, soft yogurt, mini fruit bowls.",
        materials: "Pure PO paper 240gsm + 1 PE waterproof layer",
        specs: "Rim: 85mm · Base: 70mm · Height: 48mm",
        bestFor: "Ice cream, yogurt",
        has3D: true,
      },
      {
        id: "pb-2",
        name: "Small Paper Bowl 12oz",
        capacity: "360ml",
        moq: "1,000 pcs",
        usage: "For crab soup and nutritious porridge to-go for kids.",
        materials: "Pure PO paper 280gsm + 2 heat-resistant PE layers",
        specs: "Rim: 100mm · Base: 80mm · Height: 75mm",
        bestFor: "Crab soup, hot porridge, sponge cake",
        has3D: false,
      },
      {
        id: "pb-3",
        name: "Pho/Soup Paper Bowl 25oz",
        capacity: "750ml",
        moq: "1,000 pcs",
        usage: "For pho, beef noodle soup and hu tieu to-go. Tight lid prevents oil spills.",
        materials: "Premium PO paper 320gsm + 2 extra-thick insulating PE layers",
        specs: "Rim: 142mm · Base: 112mm · Height: 78mm",
        bestFor: "Beef noodle soup, hu tieu to-go",
        has3D: true,
      },
    ],
  },
};

const parseMl = (capacity: string) => parseInt(capacity.replace(/[^0-9]/g, ""), 10) || 0;

export function InteractiveCatalog() {
  const [activeTab, setActiveTab] = useState<keyof typeof CATALOG_DATA>("paper_cups");
  const [selectedId, setSelectedId] = useState<string>(CATALOG_DATA.paper_cups.items[2].id);

  const items = CATALOG_DATA[activeTab].items;
  const selectedItem = items.find((i) => i.id === selectedId) ?? items[0];
  const ActiveIcon = CATALOG_DATA[activeTab].icon;

  const maxCap = Math.max(...items.map((i) => parseMl(i.capacity)));
  const fillPct = Math.round((parseMl(selectedItem.capacity) / maxCap) * 100);

  const handleTabChange = (tab: keyof typeof CATALOG_DATA) => {
    setActiveTab(tab);
    setSelectedId(CATALOG_DATA[tab].items[0].id);
  };

  return (
    <section
      id="catalog"
      className="py-24 px-5 sm:px-8 md:px-10 max-w-7xl mx-auto flex flex-col justify-start relative select-none text-left"
    >
      {/* Section heading */}
      <FadeIn delay={0} y={30}>
        <div className="mb-10 md:mb-14">
          <div className="text-[11px] font-semibold tracking-[0.2em] text-[#1F6E4E] uppercase mb-3 flex items-center gap-2">
            <Sparkles size={14} className="animate-pulse" />
            POPULAR CUSTOMER CATEGORIES
          </div>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Products & Specifications
          </h2>
          <p className="text-foreground/70 transition-colors duration-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            Quickly look up capacity (oz / ml), our factory&apos;s standard technical specs, and the
            premium bio-based materials that elevate your F&B brand.
          </p>
        </div>
      </FadeIn>

      {/* Tab switcher */}
      <FadeIn delay={0.1} y={20}>
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {(Object.keys(CATALOG_DATA) as Array<keyof typeof CATALOG_DATA>).map((key) => {
            const TabIcon = CATALOG_DATA[key].icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleTabChange(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer border ${
                  isActive
                    ? " bg-gradient-to-br from-[#EAF7F2] to-[#D2E4DC]/70 border-[#1F6E4E]/30 text-[#1F6E4E] shadow-[0px_4px_12px_rgba(31,110,78,0.08),_inset_0px_1px_2px_rgba(255,255,255,0.8)]"
                    : " bg-white/40 border-white/60 text-foreground/60 hover:border-[#1F6E4E]/30 hover:text-[#1F6E4E] shadow-sm backdrop-blur-md"
                }`}
              >
                <TabIcon size={16} />
                <span>{CATALOG_DATA[key].label}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Configurator: rail · specs · spotlight */}
      <FadeIn delay={0.2} y={30}>
        <div className="relative rounded-[36px] border border-white/80 bg-white/55 backdrop-blur-xl shadow-[0_30px_70px_rgba(31,110,78,0.10),_inset_0_1px_4px_white] overflow-hidden">
          {/* Grain texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay">
            <svg className="w-full h-full">
              <filter id="catalog-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
              </filter>
              <rect width="100%" height="100%" filter="url(#catalog-grain)" />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* ── LEFT: Size rail ── */}
            <div className="lg:col-span-3 order-2 lg:order-1 p-5 sm:p-6 lg:border-r border-foreground/[0.06]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold block mb-4 px-1">
                Select capacity
              </span>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-none pb-1 lg:pb-0">
                {items.map((item) => {
                  const isSel = item.id === selectedItem.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`group shrink-0 lg:w-full text-left rounded-2xl pl-3 pr-4 py-3 flex items-center gap-3 border transition-all duration-300 cursor-pointer ${
                        isSel
                          ? " border-[#1F6E4E]/25 bg-gradient-to-br from-[#EAF7F2]/90 to-white/80 shadow-[0_8px_24px_rgba(31,110,78,0.08),_inset_0_1px_2px_white]"
                          : "border-transparent hover: hover:bg-[#1F6E4E]/[0.04]"
                      }`}
                    >
                      {/* accent bar */}
                      <span
                        className="w-[3px] h-9 rounded-full transition-all duration-300 shrink-0"
                        style={{
                          background: isSel ? `linear-gradient(#9ACA3C, #1F6E4E)` : "transparent",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-lg font-black leading-none ${
                              isSel ? " text-[#1F6E4E]" : "text-foreground/75"
                            }`}
                          >
                            {parseMl(item.capacity)}
                          </span>
                          <span className="text-[10px] font-bold text-foreground/40">ml</span>
                        </div>
                        <div className="text-[11px] text-foreground/55 truncate mt-0.5 hidden lg:block">
                          {item.name}
                        </div>
                      </div>
                      {item.has3D && (
                        <Sparkles
                          size={12}
                          className={`shrink-0 transition-opacity ${isSel ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                          style={{ color: GOLD }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── MIDDLE: Specs ── */}
            <div className="lg:col-span-4 order-3 lg:order-2 p-6 sm:p-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] uppercase tracking-[0.2em] font-bold"
                      style={{ color: GOLD }}
                    >
                      Specifications
                    </span>
                    {selectedItem.has3D && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={{ color: GOLD, background: `${GOLD}1A` }}
                      >
                        <Sparkles size={8} /> 3D Mockup
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight leading-tight mb-5">
                    {selectedItem.name}
                  </h3>

                  {/* Capacity hero + visualizer */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-black leading-none bg-clip-text text-transparent"
                        style={{
                          fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
                          backgroundImage: `linear-gradient(120deg, #1F6E4E, ${GOLD})`,
                        }}
                      >
                        {parseMl(selectedItem.capacity)}
                      </span>
                      <span className="text-sm font-bold text-foreground/45 uppercase">ml</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/[0.07] overflow-hidden">
                      <motion.div
                        key={`bar-${selectedItem.id}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPct}%` }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, #1F6E4E, #9ACA3C)` }}
                      />
                    </div>
                    <span className="text-[10px] text-foreground/35 mt-1.5 block">
                      Capacity vs. the largest size ({maxCap}ml)
                    </span>
                  </div>

                  {/* Spec rows */}
                  <div className="space-y-4 border-t border-foreground/[0.07] pt-5">
                    <SpecRow
                      icon={Ruler}
                      label="Dimensions (Rim × Base × Height)"
                      value={selectedItem.specs}
                    />
                    <SpecRow
                      icon={Layers}
                      label="Material & weight"
                      value={selectedItem.materials}
                    />
                    <SpecRow icon={Droplets} label="Best suited for" value={selectedItem.bestFor} />
                  </div>

                  {/* MOQ */}
                  <div className="flex justify-between items-center gap-4 bg-[#EAF7F2]/60 border border-[#1F6E4E]/15 rounded-2xl px-4 py-3 mt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className=" text-[#1F6E4E]" />
                      <span className="text-xs text-foreground/80 font-medium">
                        Minimum order (MOQ)
                      </span>
                    </div>
                    <span className="text-sm font-black text-[#1F6E4E]">{selectedItem.moq}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Spotlight product ── */}
            <div className="lg:col-span-5 order-1 lg:order-3 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[560px] flex items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-[#F4FAF7] to-[#EAF3EE]/40">
              {/* radial glows */}
              <div
                className="absolute w-[60%] h-[60%] rounded-full blur-[90px] opacity-60"
                style={{ background: `radial-gradient(circle, #1F6E4E55, transparent 70%)` }}
              />
              <div
                className="absolute bottom-[14%] w-[45%] h-[35%] rounded-full blur-[70px] opacity-40"
                style={{ background: `radial-gradient(circle, ${GOLD}55, transparent 70%)` }}
              />

              {/* giant ghost capacity number */}
              <span
                className="absolute font-black pointer-events-none select-none leading-none text-[#1F6E4E]/[0.05]"
                style={{ fontSize: "clamp(140px, 22vw, 300px)", top: "6%" }}
              >
                {parseMl(selectedItem.capacity)}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, scale: 0.9, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative z-10 h-[260px] sm:h-[340px] lg:h-[440px] flex items-end justify-center"
                >
                  {selectedItem.image ? (
                    <motion.img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      draggable={false}
                      animate={{ y: [0, -14, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full w-auto object-contain"
                      style={{ filter: "drop-shadow(0 30px 35px rgba(0,0,0,0.28))" }}
                    />
                  ) : (
                    // Graceful fallback when a product render isn't available yet
                    <motion.div
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-center justify-center gap-4"
                    >
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center bg-[#1F6E4E]/[0.06] border border-[#1F6E4E]/15 backdrop-blur-sm">
                        <ActiveIcon className=" text-[#1F6E4E]" size={64} strokeWidth={1.25} />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-foreground/35 font-bold">
                        3D render coming soon
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* reflection floor */}
              <div className="absolute bottom-[10%] w-[55%] h-3 rounded-[100%] blur-md bg-black/15" />
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// Compact spec row with leading icon
function SpecRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[#1F6E4E]/[0.06] mt-0.5">
        <Icon size={15} className=" text-[#1F6E4E]" />
      </div>
      <div className="min-w-0">
        <span className="text-[10px] text-foreground/40 uppercase tracking-wider block mb-0.5">
          {label}
        </span>
        <p className="text-sm text-foreground/85 font-light leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
