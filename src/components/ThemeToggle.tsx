"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check initial theme from document class
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-[100] p-4 rounded-full border border-white/80 dark:border-[#D2E4DC]/15 bg-white/70 dark:bg-[#0B100D]/80 text-[#0B100D] dark:text-[#9CE3C6] shadow-[0_12px_24px_rgba(0,0,0,0.08),_inset_0_1px_2px_white,_inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
