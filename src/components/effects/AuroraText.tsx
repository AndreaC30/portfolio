"use client";

import type { ReactNode } from "react";

type AuroraTextProps = {
  children: ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
};

const SPEED_MAP = { slow: "10s", normal: "6s", fast: "3s" } as const;

export function AuroraText({ children, className = "", speed = "normal" }: AuroraTextProps) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #2563EB, #7C3AED, #2563EB, #3B82F6, #7C3AED)",
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `aurora-flow ${SPEED_MAP[speed]} ease-in-out infinite alternate`,
      }}
    >
      {children}
      <style>{`
        @keyframes aurora-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}
