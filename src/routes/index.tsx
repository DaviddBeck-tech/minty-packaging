import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Categories, Pricing, USP, Videos, News, CTABanner, Footer } from "@/components/Sections";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ly Giấy Tô Giấy — Xưởng in bao bì giấy & nhựa" },
      { name: "description", content: "Xưởng sản xuất ly giấy, tô giấy, ly nhựa PET, hộp giấy. In logo theo yêu cầu, giao hàng toàn quốc." },
      { property: "og:title", content: "Ly Giấy Tô Giấy — Xưởng in bao bì" },
      { property: "og:description", content: "Sản xuất tại xưởng, giá tốt, in logo theo yêu cầu." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main>
      <Hero />
      <Categories />
      <Pricing />
      <USP />
      <Videos />
      <News />
      <CTABanner />
      <Footer />
    </main>
  );
}
