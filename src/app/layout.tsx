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
  title: "Jack -- 3D Creator",
  description:
    "Jack's portfolio landing page - 3D Creator driven by crafting striking and unforgettable projects",
  openGraph: {
    title: "Jack -- 3D Creator",
    description: "Jack's portfolio landing page - 3D Creator",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${beVietnamPro.variable} dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
