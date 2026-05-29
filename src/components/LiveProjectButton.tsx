import React from "react";

interface LiveProjectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function LiveProjectButton({ className = "", ...props }: LiveProjectButtonProps) {
  return (
    <button
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5 transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95 cursor-pointer select-none ${className}`}
      {...props}
    >
      Live Project
    </button>
  );
}
