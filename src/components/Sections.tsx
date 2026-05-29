import { useState } from "react";
import { Coffee, Soup, Package, Box, GlassWater, Cookie, Play, MapPin, Phone, Mail, Facebook, Youtube, MessageCircle, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { icon: Coffee, badge: "LY GIẤY", title: "Ly Giấy 1 Lớp", sub: "200ml – 500ml" },
  { icon: Coffee, badge: "LY GIẤY", title: "Ly Giấy 2 Lớp", sub: "350ml – 500ml" },
  { icon: Soup, badge: "TÔ GIẤY", title: "Tô Giấy", sub: "350ml – 750ml" },
  { icon: Box, badge: "HỘP GIẤY", title: "Hộp Giấy", sub: "Size S M L" },
  { icon: GlassWater, badge: "LY NHỰA", title: "Ly Nhựa PET", sub: "500ml – 700ml" },
  { icon: Cookie, badge: "PHỤ KIỆN", title: "Ống Hút Giấy", sub: "Nhiều kích cỡ" },
];

export function Categories() {
  return (
    <section id="products" className="py-24 px-6 max-w-7xl mx-auto bg-white">
      <div className="reveal mb-12">
        <div className="text-[11px] font-semibold tracking-[0.2em] text-teal-600 uppercase mb-3">DANH MỤC</div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Sản phẩm của chúng tôi</h2>
        <p className="text-base text-slate-500 max-w-lg leading-relaxed">
          Sản xuất tại xưởng, giao hàng toàn quốc, in logo theo yêu cầu với số lượng từ nhỏ đến lớn.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="reveal group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 hover:border-teal-600 transition-all duration-300"
              style={{ transitionProperty: "border-color, box-shadow" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(13,148,136,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
            >
              <div className="aspect-square overflow-hidden bg-teal-50 flex items-center justify-center">
                <Icon className="w-20 h-20 text-teal-600 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
              </div>
              <div className="p-5">
                <span className="inline-block text-[10px] font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                  {c.badge}
                </span>
                <h3 className="mt-2 text-base font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-1 text-[13px] text-slate-500">{c.sub}</p>
                <div className="mt-3 text-[13px] text-teal-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Xem chi tiết →
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <button className="px-8 py-3 rounded-full font-semibold text-[15px] border-[1.5px] border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-200">
          Xem tất cả sản phẩm
        </button>
      </div>
    </section>
  );
}

const PRICING = {
  "Ly Giấy": [
    { name: "Ly giấy 1 lớp 250ml", spec: "In 1-4 màu · Giao toàn quốc", price: "1.200đ", min: "/cái · từ 1.000 cái", icon: Coffee },
    { name: "Ly giấy 1 lớp 350ml", spec: "In 1-4 màu · Giao toàn quốc", price: "1.500đ", min: "/cái · từ 1.000 cái", icon: Coffee },
    { name: "Ly giấy 2 lớp 350ml", spec: "Cách nhiệt · In logo", price: "2.300đ", min: "/cái · từ 500 cái", icon: Coffee },
    { name: "Ly giấy 2 lớp 500ml", spec: "Cách nhiệt · In logo", price: "2.800đ", min: "/cái · từ 500 cái", icon: Coffee },
  ],
  "Tô Giấy": [
    { name: "Tô giấy 350ml", spec: "Chống thấm · Đựng nóng", price: "1.800đ", min: "/cái · từ 500 cái", icon: Soup },
    { name: "Tô giấy 500ml", spec: "Chống thấm · Đựng nóng", price: "2.200đ", min: "/cái · từ 500 cái", icon: Soup },
    { name: "Tô giấy 750ml", spec: "Có nắp · Đa năng", price: "2.900đ", min: "/cái · từ 500 cái", icon: Soup },
    { name: "Tô giấy có quai", spec: "Tiện lợi · An toàn", price: "3.200đ", min: "/cái · từ 500 cái", icon: Soup },
  ],
  "Ly Nhựa": [
    { name: "Ly PET 500ml", spec: "Trong suốt · Có nắp", price: "900đ", min: "/cái · từ 1.000 cái", icon: GlassWater },
    { name: "Ly PET 700ml", spec: "Trong suốt · Có nắp", price: "1.100đ", min: "/cái · từ 1.000 cái", icon: GlassWater },
    { name: "Ly PP 500ml", spec: "Đựng nóng · Dày", price: "1.300đ", min: "/cái · từ 1.000 cái", icon: GlassWater },
    { name: "Ly nhựa in logo", spec: "Tùy chỉnh thiết kế", price: "1.500đ", min: "/cái · từ 500 cái", icon: GlassWater },
  ],
};

export function Pricing() {
  const [tab, setTab] = useState<keyof typeof PRICING>("Ly Giấy");
  return (
    <section className="py-24 px-6" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-10">
          <div className="text-[11px] font-semibold tracking-[0.2em] text-teal-600 uppercase mb-3">GIÁ TỐT NHẤT</div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Bảng giá tham khảo</h2>
          <p className="text-base text-slate-500 max-w-lg leading-relaxed">
            Giá xưởng – không qua trung gian. Liên hệ để được báo giá chính xác theo số lượng.
          </p>
        </div>
        <div className="flex gap-3 mb-8 flex-wrap">
          {(Object.keys(PRICING) as Array<keyof typeof PRICING>).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                tab === t ? "bg-teal-600 text-white" : "bg-white text-slate-500 border border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING[tab].map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="reveal bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-teal-100 transition-shadow">
                <div className="aspect-square rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                  <Icon className="w-16 h-16 text-teal-600" strokeWidth={1.2} />
                </div>
                <div className="text-[15px] font-semibold text-slate-900">{p.name}</div>
                <div className="text-xs text-slate-400 mt-1">{p.spec}</div>
                <div className="font-display text-3xl text-teal-600 mt-3">{p.price}</div>
                <div className="text-[11px] text-slate-400">{p.min}</div>
                <button className="mt-4 w-full bg-teal-100 text-teal-700 rounded-xl py-2.5 font-semibold text-[13px] hover:bg-teal-600 hover:text-white transition-colors duration-200">
                  Báo giá
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function USP() {
  const stats = [
    { n: "10+", l: "Năm kinh nghiệm" },
    { n: "50M+", l: "Sản phẩm/năm" },
    { n: "1000+", l: "Khách hàng" },
    { n: "24h", l: "Phản hồi báo giá" },
  ];
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div className="text-[11px] font-semibold tracking-[0.2em] text-teal-600 uppercase mb-3">TẠI SAO CHỌN CHÚNG TÔI</div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">Xưởng sản xuất — không phải đại lý</h2>
          <p className="text-[15px] text-slate-600 leading-[1.8]">
            Chúng tôi in ấn trực tiếp tại xưởng với máy móc hiện đại, kiểm soát chất lượng từng lô hàng. Bạn đặt bao nhiêu cũng được — từ 500 đến hàng triệu cái.
          </p>
          <a href="#contact" className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-teal-600 hover:gap-2 transition-all">
            Liên hệ xưởng ngay <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="reveal p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="font-display text-5xl text-teal-600">{s.n}</div>
              <div className="text-[13px] text-slate-500 font-medium uppercase tracking-[0.08em] mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Videos() {
  const videos = [
    { title: "Quy trình in ly giấy tại xưởng", meta: "1.2K lượt xem · 2 ngày trước", time: "2:30" },
    { title: "Sản xuất tô giấy chống thấm", meta: "890 lượt xem · 1 tuần trước", time: "3:15" },
    { title: "Kiểm tra chất lượng thành phẩm", meta: "2.4K lượt xem · 3 tuần trước", time: "1:45" },
  ];
  return (
    <section className="py-24 px-6" style={{ background: "#0D9488" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mb-12">
          <div className="text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase mb-3">QUY TRÌNH</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Xem quy trình tại xưởng</h2>
          <p className="text-[15px] text-white/80">Minh bạch từ nguyên liệu đến thành phẩm</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <div key={i} className="reveal rounded-2xl overflow-hidden border border-white/10" style={{ background: "rgba(15,118,110,0.5)" }}>
              <div className="aspect-video bg-teal-700 relative flex items-center justify-center">
                <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:scale-110 transition">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </button>
                <span className="absolute bottom-2 left-2 text-[10px] text-white bg-black/40 px-2 py-0.5 rounded">{v.time}</span>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-white">{v.title}</div>
                <div className="text-[11px] text-white/60 mt-1">{v.meta}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="px-8 py-3 rounded-full border border-white text-white font-semibold text-sm hover:bg-white/10 transition">
            Xem tất cả video →
          </button>
        </div>
      </div>
    </section>
  );
}

export function News() {
  const posts = [
    { tag: "LY GIẤY", date: "28 tháng 5, 2026", title: "Cách chọn ly giấy phù hợp cho quán cafe của bạn", excerpt: "Hướng dẫn chi tiết về kích thước, độ dày và in ấn cho từng loại đồ uống." },
    { tag: "XU HƯỚNG", date: "20 tháng 5, 2026", title: "Bao bì thân thiện môi trường — xu hướng F&B 2026", excerpt: "Người tiêu dùng ngày càng quan tâm đến bao bì xanh, đây là cơ hội cho doanh nghiệp." },
    { tag: "TÔ GIẤY", date: "12 tháng 5, 2026", title: "Tô giấy đựng phở: tiêu chuẩn chống thấm cần biết", excerpt: "Tô giấy không chỉ tiện mà còn phải đảm bảo an toàn thực phẩm và giữ nhiệt." },
  ];
  return (
    <section className="py-24 px-6" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-12">
          <div className="text-[11px] font-semibold tracking-[0.2em] text-teal-600 uppercase mb-3">TIN TỨC</div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Kiến thức & cập nhật</h2>
          <p className="text-base text-slate-500 max-w-lg leading-relaxed">
            Thủ thuật chọn bao bì, xu hướng ngành F&B, và tin từ xưởng.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="reveal group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-250 cursor-pointer">
              <div className="aspect-video relative bg-gradient-to-br from-teal-50 to-teal-100">
                <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white text-teal-700 px-2 py-1 rounded">{p.tag}</span>
              </div>
              <div className="p-5">
                <div className="text-[11px] text-slate-400">{p.date}</div>
                <h3 className="mt-2 text-base font-semibold text-slate-900 leading-[1.5] line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] text-slate-500 leading-[1.6] line-clamp-2">{p.excerpt}</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[11px] font-semibold">XL</div>
                  <span className="text-xs text-slate-500">Xưởng Ly Giấy</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="text-teal-600 font-semibold text-sm hover:underline">Xem tất cả bài viết →</button>
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-teal-600 to-teal-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-white" style={{ fontSize: "clamp(40px, 7vw, 56px)" }}>
          Sẵn sàng đặt hàng?
        </h2>
        <p className="mt-3 text-base text-white/90">Nhận báo giá trong vòng 24 giờ. Giao hàng toàn quốc.</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="bg-white text-teal-600 font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">
            Báo giá ngay
          </button>
          <button className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition">
            Gọi ngay: 0xxx xxx xxx
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-6" style={{ background: "#0F172A" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-xl font-bold text-white">LY GIẤY</div>
            <div className="text-[11px] text-white/50 uppercase tracking-[0.15em]">Tô Giấy</div>
            <p className="mt-4 text-[13px] text-white/70 leading-[1.7]">
              Xưởng in ấn bao bì giấy và nhựa chuyên nghiệp. Giao hàng tận nơi trên toàn quốc.
            </p>
            <div className="flex gap-2 mt-5">
              {[Facebook, Youtube, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-teal-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-4">Sản phẩm</div>
            <ul className="space-y-2 text-[13px] text-white/70">
              {["Ly Giấy 1 lớp", "Ly Giấy 2 lớp", "Tô Giấy", "Ly Nhựa PET", "Hộp Giấy", "Ống Hút"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-4">Thông tin</div>
            <ul className="space-y-2 text-[13px] text-white/70">
              {["Về chúng tôi", "Quy trình", "Tin tức", "Báo giá", "Liên hệ"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-4">Liên hệ</div>
            <ul className="space-y-3 text-[13px] text-white/70">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" />123 Đường ABC, Quận X, TP.HCM</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" />0xxx xxx xxx</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" />info@lygiay.vn</li>
              <li className="text-white/50 text-xs">T2–T7: 7:00–18:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-5 border-t border-white/10 flex flex-wrap justify-between gap-2">
          <span className="text-xs text-white/50">© 2026 Ly Giấy Tô Giấy. Tất cả quyền được bảo lưu.</span>
          <span className="text-xs text-white/40">Thiết kế với ♥ tại Việt Nam</span>
        </div>
      </div>
    </footer>
  );
}
