import { Be_Vietnam_Pro } from "next/font/google";
import "../styles.css";
import Providers from "./providers";
import type { Metadata } from "next";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paper Cups & Bowls — Custom F&B Packaging Factory",
  description:
    "Factory-direct paper cups, plastic cups and paper bowls with custom logo printing for F&B brands. Free 3D mockups, fast 3–5 day turnaround, nationwide delivery.",
  openGraph: {
    title: "Paper Cups & Bowls — Custom F&B Packaging Factory",
    description:
      "Factory-direct custom-printed paper cups, plastic cups and paper bowls for F&B brands.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={beVietnamPro.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
