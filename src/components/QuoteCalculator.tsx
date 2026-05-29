"use client";

import React, { useState, useEffect } from "react";
import { Calculator, Phone, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";

const PRODUCTS = [
  { id: "paper_1", name: "Ly Giấy 1 Lớp (Đựng lạnh/nóng vừa)", minPrice: 900, maxPrice: 1500 },
  {
    id: "paper_2",
    name: "Ly Giấy 2 Lớp Kraft (Cách nhiệt cao cấp)",
    minPrice: 1800,
    maxPrice: 2800,
  },
  { id: "plastic", name: "Ly Nhựa PET / PP Cao Cấp", minPrice: 650, maxPrice: 1200 },
  { id: "bowl", name: "Tô Giấy Thực Phẩm (Kèm nắp đậy khít)", minPrice: 1600, maxPrice: 2900 },
];

export function QuoteCalculator() {
  const [productType, setProductType] = useState("paper_1");
  const [quantity, setQuantity] = useState(10000);
  const [colors, setColors] = useState(1); // 1 = 1 màu, 2 = 2 màu, 3 = In full màu (lưới)
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let basePrice = 0;
    if (productType === "paper_1") {
      if (quantity < 5000) basePrice = 1500;
      else if (quantity < 10000) basePrice = 1300;
      else if (quantity < 20000) basePrice = 1150;
      else if (quantity < 50000) basePrice = 1000;
      else basePrice = 900;
    } else if (productType === "paper_2") {
      if (quantity < 5000) basePrice = 2800;
      else if (quantity < 10000) basePrice = 2500;
      else if (quantity < 20000) basePrice = 2200;
      else if (quantity < 50000) basePrice = 1950;
      else basePrice = 1800;
    } else if (productType === "plastic") {
      if (quantity < 5000) basePrice = 1200;
      else if (quantity < 10000) basePrice = 1000;
      else if (quantity < 20000) basePrice = 850;
      else if (quantity < 50000) basePrice = 720;
      else basePrice = 650;
    } else {
      // bowl
      if (quantity < 5000) basePrice = 2900;
      else if (quantity < 10000) basePrice = 2600;
      else if (quantity < 20000) basePrice = 2300;
      else if (quantity < 50000) basePrice = 1850;
      else basePrice = 1600;
    }

    // Color extra markup
    let colorMarkup = 0;
    if (colors === 2) colorMarkup = 100;
    else if (colors === 3) colorMarkup = 250;

    const computedUnit = basePrice + colorMarkup;
    setUnitPrice(computedUnit);
    setTotalPrice(computedUnit * quantity);
  }, [productType, quantity, colors]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductType(e.target.value);
  };

  const handleContactClick = () => {
    window.open("https://zalo.me/0902618079", "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:0902618079";
  };

  return (
    <section
      id="calculator"
      className="py-24 px-5 sm:px-8 md:px-10 max-w-7xl mx-auto flex flex-col justify-start relative text-left"
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-[40%] right-[10%] w-72 h-72 rounded-full bg-[#9CE3C6] opacity-[0.02] blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Text and trust factors */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="text-[11px] font-semibold tracking-[0.2em] dark:text-[#9CE3C6] text-[#1F6E4E] uppercase mb-3 flex items-center gap-2">
            <Calculator size={14} />
            DỰ TOÁN CHI PHÍ TỨC THÌ
          </div>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Tính Giá In Xưởng
          </h2>
          <p className="text-foreground/75 text-sm sm:text-base leading-relaxed mb-8 transition-colors duration-300">
            Hệ thống báo giá tự động dựa trên quy mô số lượng của xưởng in. Số lượng đặt càng lớn,
            đơn giá càng giảm sâu nhờ tối ưu hóa chi phí bản in và vận hành trục quay.
          </p>

          {/* Key trust bullets */}
          <div className="space-y-4">
            {[
              "Không qua trung gian · Giá gốc trực tiếp từ nhà máy Thủ Đức",
              "Miễn phí thiết kế logo & làm mockup 3D xoay 360 độ",
              "Thời gian hoàn thiện nhanh chóng từ 3 – 5 ngày",
              "Giao hàng tận nơi toàn quốc · Hỗ trợ vận chuyển chành xe",
            ].map((bullet, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <CheckCircle
                  size={16}
                  className="dark:text-[#9CE3C6] text-[#1F6E4E] shrink-0 mt-0.5"
                />
                <span className="text-sm text-foreground/80 font-light transition-colors duration-300">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: The Interactive Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-[40px] border dark:border-[#D2E4DC]/15 border-white/80 dark:bg-gradient-to-br dark:from-[#0B100D] dark:via-[#0D1612] dark:to-[#0B100D] bg-white/60 backdrop-blur-xl shadow-[0_30px_60px_rgba(31,110,78,0.08),_inset_0_1px_4px_white]">
          <div className="space-y-6">
            {/* 1. Product Type */}
            <div>
              <label className="text-xs uppercase tracking-wider text-foreground/45 font-bold block mb-2 transition-colors duration-300">
                Loại sản phẩm cần in
              </label>
              <select
                value={productType}
                onChange={handleProductChange}
                className="w-full bg-white/40 dark:bg-background border dark:border-[#D2E4DC]/15 border-white/60 text-foreground rounded-xl px-4 py-3 text-sm focus:border-[#1F6E4E]/50 dark:focus:border-[#9CE3C6] focus:outline-none focus:bg-white/80 transition backdrop-blur-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id} className="bg-background text-foreground">
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Quantity Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-foreground/45 font-bold transition-colors duration-300">
                  Số lượng ly đặt in
                </label>
                <span className="text-sm font-bold dark:text-[#9CE3C6] text-[#1F6E4E]">
                  {quantity.toLocaleString("vi-VN")} cái
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-1.5 dark:bg-[#D2E4DC]/10 bg-foreground/10 rounded-lg appearance-none cursor-pointer dark:accent-[#9CE3C6] accent-[#1F6E4E]"
              />
              <div className="flex justify-between text-[10px] text-foreground/30 mt-1 transition-colors duration-300">
                <span>1.000 cái (MOQ)</span>
                <span>10.000</span>
                <span>25.000</span>
                <span>50.000+ cái</span>
              </div>
            </div>

            {/* 3. Number of Colors */}
            <div>
              <label className="text-xs uppercase tracking-wider text-foreground/45 font-bold block mb-3 transition-colors duration-300">
                Độ phức tạp của bản thiết kế logo
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 1, label: "In 1 Màu", desc: "Tối giản, tinh tế" },
                  { value: 2, label: "In 2 Màu", desc: "Nổi bật hơn" },
                  { value: 3, label: "In Full/Lưới", desc: "Nhiều màu rực rỡ" },
                ].map((colOpt) => (
                  <button
                    key={colOpt.value}
                    onClick={() => setColors(colOpt.value)}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      colors === colOpt.value
                        ? "dark:border-[#9CE3C6] border-[#1F6E4E]/30 bg-gradient-to-br from-[#EAF7F2] to-[#D2E4DC]/60 text-[#1F6E4E] dark:text-[#9CE3C6] shadow-[0_4px_12px_rgba(31,110,78,0.08),_inset_0_1px_2px_white]"
                        : "dark:border-[#D2E4DC]/10 border-white/60 dark:bg-[#0B100D]/40 bg-white/40 text-foreground/70 dark:hover:border-[#D2E4DC]/20 hover:border-[#1F6E4E]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-sm"
                    }`}
                  >
                    <span className="text-xs font-bold block uppercase">{colOpt.label}</span>
                    <span className="text-[10px] text-foreground/40 mt-0.5 block transition-colors duration-300">
                      {colOpt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Output Display */}
            <div className="grid grid-cols-2 gap-4 dark:bg-[#0A2218]/30 bg-[#EAF7F2]/40 border dark:border-[#9CE3C6]/15 border-[#1F6E4E]/15 rounded-2xl p-4 sm:p-5 mt-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-foreground/50 block transition-colors duration-300">
                  Đơn giá ước tính
                </span>
                <span className="text-lg sm:text-2xl font-black dark:text-[#9CE3C6] text-[#1F6E4E]">
                  {unitPrice.toLocaleString("vi-VN")} đ
                  <span className="text-[11px] font-normal text-foreground/50"> / cái</span>
                </span>
              </div>
              <div className="border-l dark:border-[#D2E4DC]/10 border-foreground/10 pl-4 sm:pl-5">
                <span className="text-[10px] uppercase tracking-wider text-foreground/50 block transition-colors duration-300">
                  Tổng chi phí dự kiến
                </span>
                <span className="text-lg sm:text-2xl font-black text-foreground">
                  {totalPrice.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleContactClick}
                className="flex-1 dark:bg-[#9CE3C6] bg-[#1F6E4E] dark:text-[#0B100D] text-white hover:scale-[1.02] active:scale-[0.98] font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-[0px_4px_16px_rgba(31,110,78,0.15)] dark:shadow-[0px_4px_16px_rgba(156,227,198,0.2)]"
              >
                <MessageSquare size={16} />
                Nhận Báo Giá Zalo
                <ArrowRight size={14} />
              </button>
              <button
                onClick={handleCallClick}
                className="border dark:border-[#D2E4DC]/20 border-foreground/20 hover:border-[#1F6E4E] dark:hover:border-[#9CE3C6] hover:text-[#1F6E4E] dark:hover:text-[#9CE3C6] dark:hover:bg-[#9CE3C6]/5 hover:bg-[#1F6E4E]/5 py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-foreground flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Phone size={14} />
                Gọi Hotline: 0902 618 079
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
