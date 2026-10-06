"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Box, Hatch, isoPath, onLeft } from "@/components/iso/iso";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLORS = ["#f3b63f", "#5470f2", "#ee5a48"];
const DWELL = 6;

const INDUSTRIES = [
  {
    name: "Industrial equipment",
    input: "SUPPLIERS",
    modules: ["PRODUCTION", "INVENTORY", "ORDERS"],
    tags: ["SERIAL TRACKING", "CONFIG TO ORDER"],
    outputs: ["DEALERS", "SERVICE", "DIRECT"],
    copy: "Deep multi-level BOMs, configure-to-order quoting and serial genealogy for every machine that leaves the floor.",
  },
  {
    name: "Furniture & home",
    input: "MILLS",
    modules: ["PURCHASING", "PRODUCTION", "ORDERS"],
    tags: ["VARIANTS", "RETAIL EDI"],
    outputs: ["RETAILERS", "WHOLESALE", "DTC"],
    copy: "Thousands of finish and fabric variants on one item master, with retailer-compliant EDI and ASNs from day one.",
  },
  {
    name: "Food & beverage",
    input: "GROWERS",
    modules: ["BATCHING", "QUALITY", "ORDERS"],
    tags: ["LOT + EXPIRY", "RECALL READY"],
    outputs: ["GROCERY", "FOODSERVICE", "DTC"],
    copy: "Batch recipes with yield variance, FEFO picking and a two-minute mock recall that auditors actually enjoy.",
  },
  {
    name: "Electronics",
    input: "COMPONENTS",
    modules: ["SOURCING", "ASSEMBLY", "FULFILMENT"],
    tags: ["SERIAL GENEALOGY", "SUPPLIER SCORES"],
    outputs: ["DISTRIBUTORS", "MARKETPLACE", "DIRECT"],
    copy: "Component-level traceability, alternate parts and supplier scorecards that flag a late reel before it stops the line.",
  },
];

const label = { fontFamily: "var(--font-geist-mono)", fontSize: 2.8, letterSpacing: 0.2 };

function Diagram({ ind }: { ind: (typeof INDUSTRIES)[number] }) {
  const PZ = 8;
  const mods = [8, 34, 60];
  const outs = [-16, 6, 28];
  return (
    <svg viewBox="-84 -50 236 150" className="h-auto w-full" role="img" aria-label={`${ind.name} flow on Plinth`}>
      <defs>
        <Hatch id="ind-hatch" color="#161616" opacity={0.22} gap={2.5} />
      </defs>

      {/* Ground guides */}
      <path d={isoPath([[-70, 60], [150, 60]])} stroke="#161616" strokeOpacity="0.18" strokeDasharray="1.5 2" strokeWidth="0.4" fill="none" />
      <path d={isoPath([[-70, -30], [150, -30]])} stroke="#161616" strokeOpacity="0.18" strokeDasharray="1.5 2" strokeWidth="0.4" fill="none" />

      {/* Input */}
      <g className="ind-in">
        <Box x={-58} y={10} w={24} d={18} h={14} top="#f4f2ee" left="#ebe8e3" right="#dcd8d1" stroke="#161616" strokeWidth={0.5} hatch="ind-hatch" />
        <text transform={onLeft(-56, 28, 8.5)} {...label} fill="#161616">{ind.input}</text>
      </g>
      <path className="ind-flow" d={isoPath([[-34, 19, 5], [0, 19, 5]])} stroke="#fff" strokeWidth="1.6" fill="none" />
      <path className="ind-flow" d={isoPath([[-34, 19, 5], [0, 19, 5]])} stroke="#161616" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />

      {/* Platform */}
      <Box x={0} y={0} w={92} d={40} h={PZ} top="#f4f2ee" left="#ebe8e3" right="#dcd8d1" stroke="#161616" strokeWidth={0.5} hatch="ind-hatch" />
      <text transform={onLeft(5, 40, 2.4)} fontSize="4.2" fontWeight="600" fill="#161616" fontFamily="var(--font-host-grotesk)" letterSpacing="-0.2">
        plinth
      </text>

      {/* Modules */}
      {mods.map((x, i) => (
        <g key={i} className="ind-mod">
          <Box x={x} y={10} z={PZ} w={22} d={20} h={18} top={COLORS[i]} stroke="#161616" strokeWidth={0.5} hatch="ind-hatch" />
          <text transform={onLeft(x + 2, 30, PZ + 4)} {...label} fontSize={2.9} fill="#161616">{ind.modules[i]}</text>
        </g>
      ))}

      {/* Capability tags */}
      {ind.tags.map((t, i) => {
        const x = mods[i] + 20;
        return (
          <g key={t} className="ind-tag">
            <path d={isoPath([[x, 20, PZ + 18], [x, 20, PZ + 26]])} stroke="#161616" strokeWidth="0.5" />
            <g transform={onLeft(x - 10, 20, PZ + 36)}>
              <rect width="26" height="9" fill="#2a2a28" stroke="#161616" strokeWidth="0.4" />
              <text x="2" y="5.6" {...label} fontSize={2.5} fill="#f6f5f3">{t}</text>
            </g>
          </g>
        );
      })}

      {/* Outputs */}
      {outs.map((y, i) => (
        <path
          key={`l${i}`}
          className="ind-flow"
          d={isoPath([[92, 20, 4], [104, 20, 4], [104, y + 8, 4], [120, y + 8, 4]])}
          stroke="#161616"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          fill="none"
        />
      ))}
      {outs.map((y, i) => (
        <g key={`o${i}`} className="ind-out">
          <Box x={120} y={y} w={24} d={16} h={13} top="#f4f2ee" left="#ebe8e3" right="#dcd8d1" stroke="#161616" strokeWidth={0.5} hatch="ind-hatch" />
          <text transform={onLeft(122, y + 16, 7.5)} {...label} fontSize={2.5} fill="#161616">{ind.outputs[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Industries() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef<gsap.core.Tween | null>(null);
  const inView = useRef(false);
  const [index, setIndex] = useState(0);
  const ind = INDUSTRIES[index];

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        end: "bottom 30%",
        onToggle: (self) => {
          inView.current = self.isActive;
          if (self.isActive) progress.current?.play();
          else progress.current?.pause();
        },
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(".ind-mod", { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "back.out(1.5)" })
          .fromTo(".ind-tag", { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 0.35)
          .fromTo(".ind-out", { x: 8, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.07 }, 0.2)
          .fromTo(".ind-copy", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.1);
        gsap.to(".ind-flow", { strokeDashoffset: -8, duration: 0.8, ease: "none", repeat: -1 });
      }
      progress.current = gsap.fromTo(
        `[data-ind-progress="${index}"]`,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: DWELL,
          ease: "none",
          paused: !inView.current || reduce,
          onComplete: () => setIndex((i) => (i + 1) % INDUSTRIES.length),
        }
      );
    },
    { dependencies: [index], scope: root, revertOnUpdate: true }
  );

  return (
    <section ref={root} id="industries" className="theme-bone">
      <div className="frame">
        <div className="rule pad-x pb-12 pt-24 text-center md:pt-32">
          <p className="eyebrow mb-5" data-reveal>Industries</p>
          <h2 className="h2" data-split>Built for how you make things</h2>
        </div>

        <div className="pad-x">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4" role="tablist" data-reveal>
            {INDUSTRIES.map((it, i) => (
              <button
                key={it.name}
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`relative pb-3 pt-2 text-left text-[14px] transition-colors duration-300 ${
                  i === index ? "text-ink" : "text-bone-muted hover:text-ink"
                }`}
              >
                {it.name}
                <span className="absolute inset-x-0 bottom-0 h-px bg-black/15" />
                {i === index && <span data-ind-progress={i} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ink" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-[var(--line)] bg-bone-2" role="tabpanel" data-reveal>
          <div className="mx-auto max-w-[980px] px-2 py-6 md:px-8 md:py-10">
            <Diagram ind={ind} />
          </div>
          <div className="pad-x flex flex-col gap-4 border-t border-[var(--line)] py-7 md:flex-row md:items-center md:justify-between">
            <p className="ind-copy max-w-[560px] text-[16px] leading-relaxed text-ink">{ind.copy}</p>
            <a href="#cta" className="btn btn-dark h-10 w-fit shrink-0 text-[13px]">
              Explore {ind.name.toLowerCase()} <span className="arrow" aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
