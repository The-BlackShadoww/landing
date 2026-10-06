"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Hatch } from "@/components/iso/iso";
import { BRANDS } from "./Brands";

gsap.registerPlugin(useGSAP);

const WORDS = ["growing", "precision", "family-owned", "outdoor", "industrial"];

type Story = {
  brand: string;
  initials: string;
  quote: string;
  name: string;
  role: string;
  stats: [string, string][];
  bg: string;
  palette: [string, string];
  stack: [number, number, number, number][]; // x, y, z, h
};

const STORIES: Story[] = [
  {
    brand: "Halden Cycles",
    initials: "HC",
    quote:
      "We stopped running the factory from a whiteboard. Plinth tells us what is late before it is late, and our planners finally go home on time.",
    name: "Imogen Halden",
    role: "COO, Halden Cycles",
    stats: [["41% → 3%", "late work orders"], ["360+", "planner hours saved a month"]],
    bg: "#cfd8df",
    palette: ["#e4cfa9", "#5b4a33"],
    stack: [[0, 0, 0, 14], [16, 0, 0, 14], [0, 16, 0, 14], [0, 0, 14, 14], [16, 16, 0, 10]],
  },
  {
    brand: "Morrow Ceramics",
    initials: "MC",
    quote:
      "Batch costs used to be a guess. Now every kiln load carries its real cost, glaze to freight, and we repriced our wholesale line in a week.",
    name: "Tomás Ferreira",
    role: "Head of Finance, Morrow Ceramics",
    stats: [["+9 pts", "gross margin on wholesale"], ["3 days", "month-end close, down from 12"]],
    bg: "#e2d5c7",
    palette: ["#f0e6da", "#6d5340"],
    stack: [[0, 0, 0, 6], [0, 0, 6, 6], [0, 0, 12, 6], [18, 0, 0, 6], [18, 0, 6, 6], [0, 18, 0, 6]],
  },
  {
    brand: "Tallis Audio",
    initials: "TA",
    quote:
      "Serial-level traceability was a three-day spreadsheet exercise. When a supplier flagged a bad capacitor batch, we had the affected units in under a minute.",
    name: "Priya Raman",
    role: "VP Operations, Tallis Audio",
    stats: [["0.4s", "to trace any serial number"], ["2x", "faster PO processing"]],
    bg: "#d6d3e6",
    palette: ["#2b2a33", "#000000"],
    stack: [[0, 0, 0, 8], [14, 0, 0, 8], [28, 0, 0, 8], [0, 14, 0, 8], [14, 14, 0, 8], [7, 7, 8, 8]],
  },
  {
    brand: "Corvid Outdoor",
    initials: "CO",
    quote:
      "We added two retail partners and a second warehouse in the same quarter without hiring another planner. That would not have happened on our old ERP.",
    name: "Dane Whitlock",
    role: "Director of Supply Chain, Corvid Outdoor",
    stats: [["12x", "faster retailer onboarding"], ["92%", "of orders routed automatically"]],
    bg: "#d3dccb",
    palette: ["#c97a4a", "#4a2a17"],
    stack: [[0, 0, 0, 20], [14, 0, 0, 12], [0, 14, 0, 12], [14, 14, 0, 6]],
  },
];

function Typewriter() {
  const [word, setWord] = useState(WORDS[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let chars = WORDS[0].length;
    let deleting = true;
    let timer: number;
    const step = () => {
      let wait: number;
      if (deleting) {
        chars--;
        setWord(WORDS[i].slice(0, chars));
        wait = 45;
        if (chars === 0) {
          deleting = false;
          i = (i + 1) % WORDS.length;
          wait = 300;
        }
      } else {
        chars++;
        setWord(WORDS[i].slice(0, chars));
        wait = 85;
        if (chars === WORDS[i].length) {
          deleting = true;
          wait = 2000;
        }
      }
      timer = window.setTimeout(step, wait);
    };
    timer = window.setTimeout(step, 2400);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <span className="relative inline-flex items-center bg-[#c7d3f3]/70 px-1">
      {word}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse bg-current" />
      <span className="sr-only">manufacturers</span>
    </span>
  );
}

function StoryArt({ story }: { story: Story }) {
  return (
    <svg viewBox="-60 -55 120 110" className="h-full w-full" aria-hidden>
      <defs>
        <Hatch id={`h-${story.initials}`} color={story.palette[1]} opacity={0.3} gap={3} />
      </defs>
      <g transform="translate(0 6) scale(1.25)">
        <Box x={-17} y={-17} z={-4} w={46} d={37} h={4} top="#ffffff" left="#ece9e4" right="#ddd9d2" stroke={story.palette[1]} strokeWidth={0.5} />
        {story.stack
          .slice()
          .sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]))
          .map(([x, y, z, h], i) => (
            <Box key={i} className="art-box" x={x - 14} y={y - 14} z={z} w={13} d={13} h={h} top={story.palette[0]} stroke={story.palette[1]} strokeWidth={0.6} hatch={`h-${story.initials}`} />
          ))}
      </g>
    </svg>
  );
}

export default function Stories() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const story = STORIES[index];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".story-visual", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.inOut" });
      gsap.fromTo(".art-box", { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "back.out(1.4)", delay: 0.45 });
      gsap.fromTo(".story-fade", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, ease: "expo.out", delay: 0.15 });
    },
    { dependencies: [index], scope: root, revertOnUpdate: true }
  );

  const go = (d: number) => setIndex((i) => (i + d + STORIES.length) % STORIES.length);

  return (
    <section ref={root} id="customers" className="theme-bone">
      <div className="frame">
        <div className="pad-x pb-16 pt-24 text-center md:pt-32">
          <h2 className="h2 mx-auto max-w-[560px]" data-reveal>
            Trusted by
            <br />
            <Typewriter />
            <br />
            manufacturers
          </h2>
        </div>

        <ul className="grid grid-cols-3 border-t border-[var(--line)] sm:grid-cols-5 lg:grid-cols-9" data-reveal>
          {BRANDS.map((b) => (
            <li key={b.name} className="flex h-20 items-center justify-center text-ink opacity-55 transition-opacity duration-300 hover:opacity-100">
              <span className="sr-only">{b.name}</span>
              <span aria-hidden className="scale-[0.85]">{b.node}</span>
            </li>
          ))}
        </ul>

        <div className="relative border-t border-[var(--line)]" data-reveal>
          <article className="grid bg-paper md:grid-cols-[0.82fr_1.18fr]" aria-roledescription="carousel" aria-label="Customer stories">
            <div className="story-visual relative min-h-[300px] overflow-hidden" style={{ background: story.bg }}>
              <StoryArt story={story} />
              <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-black/50">
                {String(index + 1).padStart(2, "0")} / {String(STORIES.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col" aria-live="polite">
              <div className="flex flex-1 flex-col justify-between gap-10 p-7 md:p-10">
                <blockquote className="story-fade text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.25] tracking-[-0.025em] text-ink">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="story-fade flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[3px] bg-ink font-mono text-[11px] tracking-wider text-white">
                      {story.initials}
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium text-ink">{story.name}</span>
                      <span className="block text-[13px] text-bone-muted">{story.role}</span>
                    </span>
                  </div>
                  <a href="#cta" className="story-fade btn btn-ghost h-9 text-[13px]">
                    Read the story <span className="arrow" aria-hidden>&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 border-t border-black/[0.08]">
                {story.stats.map(([v, l], i) => (
                  <div key={l} className={`story-fade p-7 md:px-10 ${i ? "border-l border-black/[0.08]" : ""}`}>
                    <p className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-none tracking-[-0.04em] text-ink">{v}</p>
                    <p className="mt-2 text-[13px] text-bone-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Arrows live in the gutter outside the frame on wide screens */}
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => go(d)}
              aria-label={d < 0 ? "Previous story" : "Next story"}
              className={`absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-bone text-ink transition-colors hover:bg-ink hover:text-white xl:flex ${
                d < 0 ? "-left-[68px]" : "-right-[68px]"
              }`}
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-5 xl:justify-center">
          <div className="flex gap-2">
            {STORIES.map((s, i) => (
              <button
                key={s.brand}
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.brand} story`}
                className="group py-2"
              >
                <span className={`block h-[3px] rounded-full transition-all duration-500 ${i === index ? "w-8 bg-ink" : "w-4 bg-black/20 group-hover:bg-black/40"}`} />
              </button>
            ))}
          </div>
          <div className="flex gap-2 xl:hidden">
            <button onClick={() => go(-1)} aria-label="Previous story" className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15">←</button>
            <button onClick={() => go(1)} aria-label="Next story" className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15">→</button>
          </div>
        </div>
        <div className="h-16 border-t border-[var(--line)] md:h-24" />
      </div>
    </section>
  );
}
