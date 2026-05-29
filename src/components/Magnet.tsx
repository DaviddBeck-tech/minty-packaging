import React, { useRef, useState, useEffect } from "react";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clientX = e.clientX;
      const clientY = e.clientY;

      // Expanded boundaries by padding
      const minX = rect.left - padding;
      const maxX = rect.right + padding;
      const minY = rect.top - padding;
      const maxY = rect.bottom + padding;

      const isInside =
        clientX >= minX &&
        clientX <= maxX &&
        clientY >= minY &&
        clientY <= maxY;

      if (isInside) {
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        const tx = distanceX / strength;
        const ty = distanceY / strength;

        setTransition(activeTransition);
        setTransform(`translate3d(${tx}px, ${ty}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform("translate3d(0px, 0px, 0px)");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      style={{
        transform,
        transition,
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
