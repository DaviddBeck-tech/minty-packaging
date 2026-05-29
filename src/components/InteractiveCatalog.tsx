"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, GlassWater, Soup, Sparkles, CheckCircle2, Info } from "lucide-react";

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
}

const CATALOG_DATA: Record<
  string,
  { icon: React.ComponentType<any>; label: string; items: ProductItem[] }
> = {
  paper_cups: {
    icon: Coffee,
    label: "Ly Giấy",
    items: [
      {
        id: "pc-1",
        name: "Ly giấy Sampling 4.5oz",
        capacity: "135ml",
        moq: "2.000 cái",
        usage: "Thử sản phẩm mới, uống nước văn phòng, nha khoa.",
        materials: "Giấy PO tinh khiết 190gsm + 1 lớp PE chống thấm",
        specs: "Miệng: 60mm · Đáy: 45mm · Cao: 62mm",
        bestFor: "Sampling nước, cafe dùng thử",
        has3D: true,
      },
      {
        id: "pc-2",
        name: "Ly giấy Văn Phòng 7oz",
        capacity: "210ml",
        moq: "1.000 cái",
        usage: "Sử dụng tại văn phòng, ngân hàng, sự kiện, trường học.",
        materials: "Giấy PO tinh khiết 210gsm + 1 lớp PE chống thấm",
        specs: "Miệng: 70mm · Đáy: 52mm · Cao: 78mm",
        bestFor: "Nước nóng/lạnh uống nhanh",
        has3D: true,
      },
      {
        id: "pc-3",
        name: "Ly giấy Cafe/Trà 9oz",
        capacity: "270ml",
        moq: "1.000 cái",
        usage: "Đựng cafe nóng, trà nóng, cacao nóng, cappuccino.",
        materials: "Giấy PO 230gsm + 1 lớp PE (Có tùy chọn Kraft 2 lớp cách nhiệt)",
        specs: "Miệng: 75mm · Đáy: 53mm · Cao: 90mm",
        bestFor: "Espresso, Americano, Cafe Nóng",
        has3D: true,
      },
      {
        id: "pc-4",
        name: "Ly giấy Medium 12oz",
        capacity: "360ml",
        moq: "1.000 cái",
        usage: "Đựng sinh tố cỡ vừa, cafe sữa đá, trà trái cây.",
        materials: "Giấy PO tinh khiết 280gsm + 2 lớp PE (in lạnh không bị nhũn)",
        specs: "Miệng: 80mm · Đáy: 53mm · Cao: 115mm",
        bestFor: "Cafe đá, nước ép, Matcha",
        has3D: true,
      },
      {
        id: "pc-5",
        name: "Ly giấy Large 16oz",
        capacity: "480ml",
        moq: "1.000 cái",
        usage: "Phục vụ trà sữa cỡ tiêu chuẩn, nước ép đá, sinh tố.",
        materials: "Giấy PO tinh khiết 290gsm + 2 lớp PE (chống ngưng tụ nước)",
        specs: "Miệng: 90mm · Đáy: 60mm · Cao: 127mm",
        bestFor: "Trà sữa, Hồng trà, Sinh tố lớn",
        has3D: true,
      },
      {
        id: "pc-6",
        name: "Ly giấy King Size 22oz",
        capacity: "700ml",
        moq: "1.000 cái",
        usage: "Ly size khổng lồ cho các quán trà tắc, trà trái cây cỡ lớn.",
        materials: "Giấy PO tinh khiết 300gsm + 2 lớp PE dày dặn",
        specs: "Miệng: 90mm · Đáy: 62mm · Cao: 155mm",
        bestFor: "Trà tắc khổng lồ, Trà dâu, Trà vải",
        has3D: true,
      },
    ],
  },
  plastic_cups: {
    icon: GlassWater,
    label: "Ly Nhựa",
    items: [
      {
        id: "pl-1",
        name: "Ly nhựa PET 360ml",
        capacity: "360ml",
        moq: "1.000 cái",
        usage: "Đựng cafe đá, nước trái cây có màu sắc đẹp mắt. Dùng nắp cầu hoặc nắp bằng.",
        materials: "Nhựa PET nguyên sinh, siêu trong suốt, cứng cáp (Không ép màng được)",
        specs: "Miệng: 93mm · Đáy: 55mm · Cao: 108mm",
        bestFor: "Cafe phin đá, Cafe Highland style",
        has3D: false,
      },
      {
        id: "pl-2",
        name: "Ly nhựa PET 500ml",
        capacity: "500ml",
        moq: "1.000 cái",
        usage: "Thích hợp cho các món đá xay nghệ thuật, trà trái cây cao cấp.",
        materials: "Nhựa PET nguyên sinh dày dặn, chịu lực tốt",
        specs: "Miệng: 98mm · Đáy: 58mm · Cao: 122mm",
        bestFor: "Matcha đá xay, Sinh tố hoa quả",
        has3D: true,
      },
      {
        id: "pl-3",
        name: "Ly nhựa PP 500ml",
        capacity: "500ml",
        moq: "1.000 cái",
        usage: "Ly trà sữa phổ thông, có thể ép màng nhựa nắp kín để ship đi xa.",
        materials: "Nhựa PP dẻo, hơi mờ đục, chịu nhiệt ấm tốt (Ép màng nắp thoải mái)",
        specs: "Miệng: 95mm · Đáy: 56mm · Cao: 128mm",
        bestFor: "Trà sữa truyền thống ép màng nắp",
        has3D: false,
      },
      {
        id: "pl-4",
        name: "Ly nhựa Đáy Bầu 500ml",
        capacity: "500ml",
        moq: "1.000 cái",
        usage: "Tạo hình mập tròn cực kỳ đáng yêu, rất thu hút các bạn trẻ.",
        materials: "Nhựa PP dẻo chất lượng cao, nắp cầu hoặc nắp tim",
        specs: "Miệng: 95mm · Đáy: Cầu vồng · Cao: 110mm",
        bestFor: "Sữa tươi trân châu đường đen",
        has3D: true,
      },
    ],
  },
  paper_bowls: {
    icon: Soup,
    label: "Tô Giấy",
    items: [
      {
        id: "pb-1",
        name: "Tô giấy ăn kem 6oz",
        capacity: "180ml",
        moq: "1.000 cái",
        usage: "Đựng kem viên, sữa chua dẻo, trái cây tô mini.",
        materials: "Giấy PO tinh khiết 240gsm + 1 lớp PE chống thấm",
        specs: "Miệng: 85mm · Đáy: 70mm · Cao: 48mm",
        bestFor: "Ice Cream, Yogurt",
        has3D: true,
      },
      {
        id: "pb-2",
        name: "Tô giấy nhỏ 12oz",
        capacity: "360ml",
        moq: "1.000 cái",
        usage: "Đựng soup cua, cháo dinh dưỡng cho bé mang đi.",
        materials: "Giấy PO tinh khiết 280gsm + 2 lớp PE chịu nhiệt nóng",
        specs: "Miệng: 100mm · Đáy: 80mm · Cao: 75mm",
        bestFor: "Soup cua, cháo nóng, bánh bông lan",
        has3D: false,
      },
      {
        id: "pb-3",
        name: "Tô giấy phở/soup 25oz",
        capacity: "750ml",
        moq: "1.000 cái",
        usage: "Đựng phở, bún bò, hủ tiếu mang về. Có nắp đậy khít chống tràn dầu.",
        materials: "Giấy PO cao cấp 320gsm + 2 lớp PE siêu dày cách nhiệt",
        specs: "Miệng: 142mm · Đáy: 112mm · Cao: 78mm",
        bestFor: "Bún bò, Hủ tiếu mang đi",
        has3D: true,
      },
    ],
  },
};

export function InteractiveCatalog() {
  const [activeTab, setActiveTab] = useState<keyof typeof CATALOG_DATA>("paper_cups");
  const [selectedItem, setSelectedItem] = useState<ProductItem>(CATALOG_DATA.paper_cups.items[2]); // Default 9oz

  const handleTabChange = (tab: keyof typeof CATALOG_DATA) => {
    setActiveTab(tab);
    setSelectedItem(CATALOG_DATA[tab].items[0]);
  };

  return (
    <section
      id="catalog"
      className="py-24 px-5 sm:px-8 md:px-10 max-w-7xl mx-auto flex flex-col justify-start relative select-none text-left"
    >
      <div className="mb-12 md:mb-16">
        <div className="text-[11px] font-semibold tracking-[0.2em] dark:text-[#9CE3C6] text-[#1F6E4E] uppercase mb-3 flex items-center gap-2">
          <Sparkles size={14} className="animate-pulse" />
          DANH MỤC KHÁCH HÀNG THƯỜNG DÙNG
        </div>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Sản Phẩm & Quy Cách
        </h2>
        <p className="text-foreground/70 transition-colors duration-300 max-w-2xl text-sm sm:text-base leading-relaxed">
          Tra cứu nhanh dung tích (oz / ml), thông số kỹ thuật chuẩn của xưởng in và các chất liệu
          sinh học cao cấp giúp nâng tầm thương hiệu F&B của bạn.
        </p>
      </div>

      {/* Tab bar switcher */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {(Object.keys(CATALOG_DATA) as Array<keyof typeof CATALOG_DATA>).map((key) => {
          const TabIcon = CATALOG_DATA[key].icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer border ${
                isActive
                  ? "dark:bg-[#9CE3C6] dark:text-[#0B100D] dark:border-[#9CE3C6] bg-gradient-to-br from-[#EAF7F2] to-[#D2E4DC]/70 border-[#1F6E4E]/30 text-[#1F6E4E] shadow-[0px_4px_12px_rgba(31,110,78,0.08),_inset_0px_1px_2px_rgba(255,255,255,0.8)]"
                  : "dark:bg-[#0B100D]/40 dark:text-[#D2E4DC]/60 dark:border-[#D2E4DC]/15 bg-white/40 border-white/60 text-foreground/60 hover:border-[#1F6E4E]/30 dark:hover:border-[#9CE3C6]/40 hover:text-[#1F6E4E] dark:hover:text-[#D2E4DC] shadow-sm dark:shadow-none backdrop-blur-md"
              }`}
            >
              <TabIcon size={16} />
              <span>{CATALOG_DATA[key].label}</span>
            </button>
          );
        })}
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Cards grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATALOG_DATA[activeTab].items.map((item) => {
            const isSelected = selectedItem.id === item.id;
            return (
              <motion.div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative ${
                  isSelected
                    ? "dark:border-[#9CE3C6] border-[#1F6E4E] dark:bg-gradient-to-br dark:from-[#0D221A] dark:to-[#0B100D] bg-gradient-to-br from-[#EAF7F2]/90 to-white/95 shadow-[0_12px_30px_rgba(31,110,78,0.08),_inset_0_1px_3px_white] dark:shadow-[0px_8px_32px_rgba(156,227,198,0.06)]"
                    : "dark:border-[#D2E4DC]/10 border-white/60 dark:bg-[#0B100D]/40 bg-white/40 backdrop-blur-md hover:border-[#1F6E4E]/30 dark:hover:border-[#9CE3C6]/30 shadow-[0_4px_16px_rgba(31,110,78,0.03),_inset_0_1px_2px_white] hover:bg-white/65 hover:shadow-[0_8px_20px_rgba(31,110,78,0.06)] dark:shadow-none"
                }`}
              >
                {item.has3D && (
                  <span className="absolute top-4 right-4 dark:bg-[#9CE3C6]/10 bg-[#1F6E4E]/10 dark:text-[#9CE3C6] text-[#1F6E4E] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={8} /> 3D Mockup
                  </span>
                )}
                <span className="text-xs dark:text-[#9CE3C6] text-[#1F6E4E] font-bold uppercase tracking-widest block mb-1">
                  {item.capacity}
                </span>
                <h3 className="text-base font-bold text-foreground tracking-wide mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed">
                  {item.usage}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Detailed glassmorphism panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-[32px] border dark:border-[#D2E4DC]/15 border-white/80 dark:bg-gradient-to-br dark:from-[#0B100D] dark:via-[#0E1511] dark:to-[#0B100D] bg-white/60 relative overflow-hidden backdrop-blur-lg shadow-[0_20px_50px_rgba(31,110,78,0.06),_inset_0_1px_3px_white]"
            >
              {/* Decorative gradient blur inside card */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#9CE3C6] dark:opacity-[0.03] opacity-[0.05] blur-3xl pointer-events-none" />

              <h4 className="text-xs uppercase tracking-widest dark:text-[#9CE3C6] text-[#1F6E4E] font-bold mb-1">
                Chi Tiết Quy Cách
              </h4>
              <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-wide">
                {selectedItem.name}
              </h3>

              <div className="space-y-4 text-sm mb-6 border-b dark:border-[#D2E4DC]/10 border-foreground/10 pb-6">
                <div>
                  <span className="text-xs text-foreground/40 uppercase tracking-wider block mb-1">
                    Dung tích khả dụng
                  </span>
                  <p className="font-bold dark:text-[#9CE3C6] text-[#1F6E4E] text-lg flex items-center gap-2">
                    {selectedItem.capacity}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-foreground/40 uppercase tracking-wider block mb-1">
                    Kích thước chuẩn (Miệng x Đáy x Cao)
                  </span>
                  <p className="text-foreground font-medium">{selectedItem.specs}</p>
                </div>

                <div>
                  <span className="text-xs text-foreground/40 uppercase tracking-wider block mb-1">
                    Vật liệu và định lượng
                  </span>
                  <p className="text-foreground/80 font-light leading-relaxed">
                    {selectedItem.materials}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-foreground/40 uppercase tracking-wider block mb-1">
                    Dành cho đồ uống / Phù hợp nhất
                  </span>
                  <p className="text-foreground/80 font-light leading-relaxed">
                    {selectedItem.bestFor}
                  </p>
                </div>

                <div className="flex justify-between items-center gap-4 dark:bg-[#0A2218]/40 bg-[#EAF7F2]/60 border dark:border-[#9CE3C6]/15 border-[#1F6E4E]/15 rounded-xl p-3 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="dark:text-[#9CE3C6] text-[#1F6E4E]" />
                    <span className="text-xs text-foreground/80 font-medium">
                      Đặt in tối thiểu (MOQ)
                    </span>
                  </div>
                  <span className="text-sm font-bold dark:text-[#9CE3C6] text-[#1F6E4E]">
                    {selectedItem.moq}
                  </span>
                </div>
              </div>

              {/* 3D customize promise */}
              <div className="flex gap-3 items-start dark:bg-[#0A1713] bg-[#EAF7F2]/30 rounded-2xl p-4 border dark:border-[#9CE3C6]/10 border-[#1F6E4E]/10">
                <Info size={18} className="dark:text-[#9CE3C6] text-[#1F6E4E] shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/75 leading-relaxed font-light">
                  <strong>Xem trước thiết kế 3D:</strong> Xưởng cung cấp mockup 3D xoay 360 độ hoàn
                  toàn miễn phí khi khách hàng gửi file logo thiết kế.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
