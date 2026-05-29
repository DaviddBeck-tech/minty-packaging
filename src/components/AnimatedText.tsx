"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
}

export function AnimatedText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Track the scroll progress of this paragraph element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Split by character
  const characters = text.split("");
  const totalLength = characters.length;

  return (
    <p
      ref={containerRef}
      className="text-foreground font-medium text-center leading-relaxed max-w-[560px] mx-auto select-none"
      style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
    >
      {characters.map((char, index) => {
        // Calculate dynamic range for this character's scroll progress window
        const start = index / totalLength;
        const end = (index + 1) / totalLength;

        // Map scroll progress to opacity 0.35 -> 1
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1]);

        return (
          <span key={index} className="relative inline-block whitespace-pre-wrap">
            {/* Invisible placeholder to reserve standard spacing */}
            <span className="opacity-0">{char}</span>
            {/* Absolute animated span overlay */}
            <motion.span style={{ opacity }} className="absolute inset-0">
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
