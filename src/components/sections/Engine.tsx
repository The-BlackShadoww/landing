"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function CostTile() {
  const rows = [
    { sku: "PRT-1042", v: "+18%", tone: "bg-[#e3efe1] text-[#2f6a34]" },
    { sku: "PRT-2190", v: "+6%", tone: "bg-[#e3efe1] text-[#2f6a34]" },
    { sku: "PRT-0081", v: "-12%", tone: "bg-[#f8e3e1] text-[#9f2f2d]" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-2.5">
      {rows.map((r) => (
        <div key={r.sku} className="cost-row flex items-center justify-between whitespace-nowrap rounded-full bg-paper px-2 py-1 font-mono text-[8.5px] shadow-[0_1px_0_rgba(0,0,0,0.05)]">
          <span className="text-ink/70">{r.sku}</span>
          <span className={`rounded-full px-1.5 ${r.tone}`}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

function ScheduleTile() {
  const bars = [
    { l: "8%", w: "46%", c: "bg-ink" },
    { l: "30%", w: "38%", c: "bg-[#5470f2]" },
    { l: "52%", w: "40%", c: "bg-ink/40" },
    { l: "18%", w: "30%", c: "bg-[#f3b63f]" },
  ];
  return (
    <div className="relative flex h-full flex-col justify-center gap-2 px-4">
      <div className="sched-now absolute bottom-3 top-3 left-[40%] w-px bg-[#ee5a48]" />
      {bars.map((b, i) => (
        <div key={i} className="relative h-2.5 rounded-sm bg-black/[0.05]">
          <div className={`sched-bar absolute inset-y-0 rounded-sm ${b.c}`} style={{ left: b.l, width: b.w }} />
        </div>
      ))}
    </div>
  );
}

function ReorderTile() {
  return (
    <div className="relative h-full px-3 py-3">
      <svg viewBox="0 0 100 70" className="h-full w-full" aria-hidden>
        <line x1="0" y1="48" x2="100" y2="48" stroke="#ee5a48" strokeDasharray="2 2" strokeWidth="0.8" />
        <path className="stock-line" d="M2 12 L22 20 L38 28 L52 40 L60 48 L62 14 L80 22 L98 30" fill="none" stroke="#161616" strokeWidth="1.4" strokeLinejoin="round" />
        <g className="po-badge">
          <rect x="54" y="52" width="30" height="12" rx="6" fill="#161616" />
          <text x="69" y="60" textAnchor="middle" fontSize="6" fill="#fff" fontFamily="var(--font-geist-mono)">PO auto</text>
        </g>
      </svg>
    </div>
  );
}

const ROWS = [
  {
    tile: <CostTile />,
    title: "Know your true cost per part",
    lead: "Live contribution margin by part, customer and channel.",
    body: "Material, labour, overhead, freight and scrap rolled into every unit and tied back to the transaction that caused it.",
  },
  {
    tile: <ScheduleTile />,
    title: "Schedule around reality",
    lead: "A production plan that updates when the floor does.",
    body: "Capacity, material availability and due dates reconciled every few minutes, so planners fix exceptions instead of rebuilding spreadsheets.",
  },
  {
    tile: <ReorderTile />,
    title: "Buy before you run out",
    lead: "Purchase orders drafted from real demand, not gut feel.",
    body: "Lead times, MOQs and open work orders feed reorder points per site. Approve in one click, with three-way match on receipt.",
  },
];

export default function Engine() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const st = { trigger: root.current, start: "top 70%", toggleActions: "play pause resume pause" };

      gsap.timeline({ repeat: -1, repeatDelay: 1.2, scrollTrigger: st })
        .from(".cost-row", { x: -14, opacity: 0, stagger: 0.12, duration: 0.6, ease: "expo.out" })
        .to(".cost-row", { opacity: 0, x: 14, stagger: 0.08, duration: 0.4, ease: "power2.in" }, "+=2.4");

      gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.6, scrollTrigger: st })
        .from(".sched-bar", { scaleX: 0, transformOrigin: "0 50%", stagger: 0.12, duration: 0.9, ease: "expo.out" })
        .fromTo(".sched-now", { xPercent: 0, x: -30 }, { x: 30, duration: 2.2, ease: "sine.inOut" }, 0);

      const line = root.current?.querySelector<SVGPathElement>(".stock-line");
      const len = line?.getTotalLength() ?? 200;
      gsap.timeline({ repeat: -1, repeatDelay: 1.4, scrollTrigger: st })
        .fromTo(".stock-line", { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.2, ease: "power1.inOut" })
        .from(".po-badge", { opacity: 0, y: 6, duration: 0.5, ease: "back.out(2)" }, 1.05)
        .to([".stock-line", ".po-badge"], { opacity: 0, duration: 0.4 }, "+=1.6")
        .set([".stock-line", ".po-badge"], { opacity: 1 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="platform" className="theme-bone">
      <div className="frame">
        <div className="pad-x pb-14 pt-24 md:pt-32">
          <p className="eyebrow mb-5" data-reveal>Why Plinth</p>
          <h2 className="h2 max-w-[620px]" data-split>
            Operations is where margin is made
          </h2>
        </div>

        <div className="rule">
          {ROWS.map((r, i) => (
            <div key={r.title} className={`grid md:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] ${i ? "border-t border-[var(--line)]" : ""}`}>
              <div className="pad-x flex gap-6 py-9 md:border-r md:border-[var(--line)]" data-reveal>
                <div className="h-[104px] w-[128px] shrink-0 overflow-hidden rounded-[3px] bg-bone-tile">{r.tile}</div>
                <h3 className="h3 max-w-[220px] pt-1">{r.title}</h3>
              </div>
              <div className="pad-x pb-9 md:py-9" data-reveal>
                <p className="max-w-[440px] text-[17px] leading-snug tracking-[-0.01em]">{r.lead}</p>
                <p className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-bone-muted">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-20 border-t border-[var(--line)] md:h-28" />
      </div>
    </section>
  );
}
