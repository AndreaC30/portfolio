"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: "slower" | "slow" | "normal" | "fast";
  direction?: "left" | "right";
  repeat?: number;
  pauseOnHover?: boolean;
};

const SPEED_MAP = { slower: "80s", slow: "40s", normal: "20s", fast: "10s" } as const;

export function Marquee({
  children,
  className = "",
  speed = "normal",
  direction = "left",
  repeat = 4,
  pauseOnHover = true,
}: MarqueeProps) {
  const items = useMemo(() => Array.from({ length: repeat }, (_, i) => i), [repeat]);
  const animDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={`group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex shrink-0 flex-row items-center gap-6 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee-scroll ${SPEED_MAP[speed]} linear infinite`,
          animationDirection: animDirection,
        }}
      >
        {items.map((i) => (
          <div key={i} className="shrink-0">{children}</div>
        ))}
      </div>
      <div
        className={`flex shrink-0 flex-row items-center gap-6 ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        aria-hidden
        style={{
          animation: `marquee-scroll ${SPEED_MAP[speed]} linear infinite`,
          animationDirection: animDirection,
        }}
      >
        {items.map((i) => (
          <div key={i} className="shrink-0">{children}</div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
