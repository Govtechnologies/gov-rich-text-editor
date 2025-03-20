"use client"
import { useState } from "react";

type TooltipProps = {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
};

export default function Tooltip({ text, position = "top", children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className={`absolute z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md ${positionClasses[position]}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
