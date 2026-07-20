import React from "react";

interface ContactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function ContactButton({ className = "", ...props }: ContactButtonProps) {
  return (
    <button
      className={`rounded-full uppercase tracking-widest text-white font-medium text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${className}`}
      style={{
        background: "linear-gradient(123deg, #0A2218 7%, #1F6E4E 37%, #38B27E 72%, #9ACA3C 100%)",
        boxShadow: "0px 4px 12px rgba(156, 227, 198, 0.25), 4px 4px 12px #1F6E4E inset",
        outline: "2px solid #D2E4DC",
        outlineOffset: "-3px",
      }}
      {...props}
    >
      Contact Me
    </button>
  );
}
