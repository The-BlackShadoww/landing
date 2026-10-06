"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Hatch, onLeft, p, pts } from "@/components/iso/iso";

gsap.registerPlugin(useGSAP);

const CRATE = 18;
const GAP = 19.5;
const PALLET_H = 5;

// Grid positions [col, row, layer]
const SLOTS: [number, number, number][] = [
  [0, 0, 0], [1, 0, 0], [2, 0, 0],
  [0, 1, 0], [1, 1, 0], [2, 1, 0],
  [0, 2, 0], [1, 2, 0],
  [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1], [2, 0, 1],
  [0, 0, 2], [1, 0, 2],
];
const crates = [...SLOTS].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]);

const FEED = [
  { id: "WO-2291", step: "Frame weld", state: "On schedule" },
  { id: "PO-8817", step: "6061 tube stock", state: "Received" },
  { id: "LOT-24-118", step: "QC inspection", state: "Passed" },
  { id: "SO-41207", step: "Allocated · 3 sites", state: "Ready to ship" },
];

export default function HeroScene() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setFeedIndex((i) => (i + 1) % FEED.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.25 });
      tl.from(".hero-card", { clipPath: "inset(12% 12% 12% 12% round 4px)", scale: 1.04, duration: 1.4 })
        .from(".pallet", { opacity: 0, y: 14, duration: 0.9 }, 0.4)
        .from(".crate", { y: -70, opacity: 0, duration: 0.9, stagger: 0.055, ease: "back.out(1.3)" }, 0.55)
        .from(".hl-top", { opacity: 0, duration: 0.5 }, ">-0.1")
        .from(".hl-callout", { opacity: 0, x: -10, duration: 0.6 }, "<0.1")
        .from(".stat-card", { opacity: 0, y: 24, duration: 1 }, 0.9)
        .from(".feed-chip", { opacity: 0, y: 16, duration: 1 }, 1.2);

      const n = { v: 41 };
      tl.to(n, {
        v: 3,
        duration: 1.8,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counter.current) counter.current.textContent = `${Math.round(n.v)}%`;
        },
      }, 1.3);

      gsap.to(".hl-ring", { scale: 1.6, opacity: 0, transformOrigin: "50% 50%", duration: 1.8, repeat: -1, ease: "power2.out", delay: 2.2 });
    },
    { scope: root }
  );

  const [hx, hy, hz] = [GAP + 1, GAP + 1, PALLET_H + CRATE * 1];
  const hlTop = pts(p(hx, hy, hz + CRATE), p(hx + CRATE, hy, hz + CRATE), p(hx + CRATE, hy + CRATE, hz + CRATE), p(hx, hy + CRATE, hz + CRATE));
  const [cx, cy] = p(hx + CRATE / 2, hy + CRATE / 2, hz + CRATE);

  return (
    <div ref={root} className="relative">
      <div className="hero-card relative aspect-[5/5.4] overflow-hidden rounded-[4px] bg-[#c9d4dc]">
        <svg viewBox="-70 -78 140 150" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <Hatch id="crate-hatch" color="#5b4a33" opacity={0.25} gap={3} />
            <pattern id="floor" width="12" height="6.93" patternUnits="userSpaceOnUse">
              <path d="M0 3.46 6 0 12 3.46 6 6.93Z" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect x="-70" y="-78" width="140" height="150" fill="url(#floor)" />
          <g transform="translate(0 6)">
            {/* Shadow */}
            <polygon points={pts(p(-4, -4), p(68, -4), p(68, 68), p(-4, 68))} fill="#000" opacity="0.07" />
            <Box className="pallet" w={59} d={59} h={PALLET_H} top="#c99c6a" left="#a77b4d" right="#8c653d" stroke="#5b4429" strokeWidth={0.6} />
            {crates.map(([c, r, l]) => {
              const key = `${c}-${r}-${l}`;
              const x = c * GAP + 1;
              const y = r * GAP + 1;
              const z = PALLET_H + l * CRATE;
              return (
                <g key={key} className="crate">
                  <Box x={x} y={y} z={z} w={CRATE} d={CRATE} h={CRATE} top="#e4cfa9" left="#d4b98c" right="#bf9f6f" stroke="#5b4a33" strokeWidth={0.6} hatch="crate-hatch" />
                  {/* Shipping label */}
                  <g transform={onLeft(x + 3, y + CRATE, z + CRATE - 4)}>
                    <rect width="9" height="5.5" fill="#f7f4ee" stroke="#5b4a33" strokeWidth="0.3" />
                    <rect x="1.2" y="1.2" width="4.5" height="0.7" fill="#5b4a33" />
                    <rect x="1.2" y="2.6" width="6" height="0.5" fill="#5b4a33" opacity=".5" />
                    <rect x="1.2" y="3.7" width="3" height="0.5" fill="#5b4a33" opacity=".5" />
                  </g>
                </g>
              );
            })}
            {/* Highlight on a tracked lot */}
            <polygon className="hl-top" points={hlTop} fill="#2c3bf5" opacity="0.9" />
            <g className="hl-callout">
              <circle className="hl-ring" cx={cx} cy={cy - 26} r="3" fill="none" stroke="#2c3bf5" strokeWidth="0.6" />
              <line x1={cx} y1={cy} x2={cx} y2={cy - 26} stroke="#2c3bf5" strokeWidth="0.5" />
              <circle cx={cx} cy={cy - 26} r="1.4" fill="#2c3bf5" />
              <g transform={`translate(${cx + 4} ${cy - 33})`}>
                <rect width="34" height="12" rx="1.5" fill="#161616" />
                <text x="3" y="5" fontSize="3.2" fill="#9a9792" fontFamily="var(--font-geist-mono)">LOT 24-118</text>
                <text x="3" y="9.5" fontSize="3.6" fill="#fff" fontFamily="var(--font-host-grotesk)">Traced · 3 sites</text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Outcome card */}
      <div className="stat-card absolute -right-3 -top-6 w-[176px] rounded-[3px] bg-paper p-3.5 sm:p-4 text-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] sm:-right-6 sm:w-[240px] lg:-right-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-muted">Halden Cycles</p>
        <div className="mt-3 h-px bg-black/10" />
        <p className="mt-3 text-[28px] font-medium leading-none tracking-[-0.04em] sm:text-[40px]">
          41% <span className="text-bone-muted">&rarr;</span> <span ref={counter}>3%</span>
        </p>
        <p className="mt-2 text-[12px] text-bone-muted sm:text-[13px]">Late work orders, first 90 days</p>
      </div>

      {/* Live feed */}
      <div className="feed-chip absolute -bottom-5 left-4 flex items-center gap-3 rounded-full bg-ink/90 py-2 pl-3 pr-4 text-[12px] text-white backdrop-blur sm:left-6">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span key={feedIndex} className="flex items-center gap-2 animate-[feedIn_.6s_var(--ease-out)]">
          <span className="font-mono text-white/50">{FEED[feedIndex].id}</span>
          <span>{FEED[feedIndex].step}</span>
          <span className="hidden text-emerald-300 sm:inline">{FEED[feedIndex].state}</span>
        </span>
      </div>
    </div>
  );
}
