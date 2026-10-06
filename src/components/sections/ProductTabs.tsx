"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AppMock from "./AppMock";
import { TABS } from "./productData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DWELL = 7;

export default function ProductTabs() {
  const root = useRef<HTMLElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const progress = useRef<gsap.core.Timeline | null>(null);
  const inView = useRef(false);
  const [index, setIndex] = useState(0);

  // Pause the auto-advance whenever the section is off screen.
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 75%",
        end: "bottom 25%",
        onToggle: (self) => {
          inView.current = self.isActive;
          if (self.isActive) progress.current?.play();
          else progress.current?.pause();
        },
      });
    },
    { scope: root }
  );

  // Each tab: animate the screen in, then run its progress bar.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scope = screen.current;
      if (!scope) return;

      if (!reduce) {
        gsap.fromTo(scope.querySelectorAll(".mock-item"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.025, ease: "expo.out" });
        gsap.fromTo(scope.querySelectorAll(".mock-bar"), { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.1 });
        gsap.fromTo(scope.querySelectorAll(".mock-vbar"), { scaleY: 0 }, { scaleY: 1, duration: 1, stagger: 0.04, ease: "expo.out", delay: 0.1 });
        scope.querySelectorAll<SVGPathElement>(".mock-link").forEach((path, i) => {
          const len = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, delay: 0.2 + i * 0.08, ease: "power2.out" });
        });
      }

      const vertical = root.current?.querySelectorAll(`[data-progress-y="${index}"]`) ?? [];
      const horizontal = root.current?.querySelectorAll(`[data-progress-x="${index}"]`) ?? [];
      const tl = gsap.timeline({
        paused: !inView.current || reduce,
        onComplete: () => setIndex((i) => (i + 1) % TABS.length),
      });
      tl.fromTo(vertical, { scaleY: 0 }, { scaleY: 1, duration: DWELL, ease: "none" }, 0);
      tl.fromTo(horizontal, { scaleX: 0 }, { scaleX: 1, duration: DWELL, ease: "none" }, 0);
      progress.current = tl;
    },
    { dependencies: [index], scope: root, revertOnUpdate: true }
  );

  const tab = TABS[index];

  return (
    <section ref={root} className="theme-ink">
      <div className="frame">
        <div className="pad-x grid gap-6 pb-14 pt-24 md:grid-cols-2 md:items-end md:pt-32">
          <div>
            <p className="eyebrow mb-5" data-reveal>The platform</p>
            <h2 className="h2 max-w-[520px]" data-split>
              Run the whole operation from one system
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-relaxed text-ink-muted md:justify-self-end" data-reveal>
            Every module shares the same data model, so a change on the shop floor shows up in purchasing,
            orders and the ledger the moment it happens.
          </p>
        </div>

        <div className="rule grid lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop tab list */}
          <ul className="hidden border-r border-[var(--line)] lg:block" role="tablist" aria-label="Platform modules">
            {TABS.map((t, i) => {
              const active = i === index;
              return (
                <li key={t.key} className="relative border-b border-[var(--line)]">
                  <button
                    role="tab"
                    aria-selected={active}
                    onClick={() => setIndex(i)}
                    className="group w-full px-8 py-6 text-left"
                  >
                    <span className={`block text-[17px] tracking-tight transition-colors duration-300 ${active ? "text-white" : "text-white/45 group-hover:text-white/80"}`}>
                      {t.label}
                    </span>
                    <span
                      className={`grid text-[13px] text-ink-muted transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">{t.sub}</span>
                    </span>
                  </button>
                  <span className="absolute -left-px bottom-0 top-0 w-px bg-white/10" />
                  {active && <span data-progress-y={i} className="absolute -left-px top-0 h-full w-px origin-top bg-white" />}
                </li>
              );
            })}
          </ul>

          {/* Mobile tab strip */}
          <div className="flex gap-2 overflow-x-auto px-5 pt-6 [scrollbar-width:none] lg:hidden" role="tablist">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`relative shrink-0 overflow-hidden rounded-full px-4 py-2 text-[13px] transition-colors ${
                  i === index ? "bg-white/10 text-white" : "text-white/50"
                }`}
              >
                {t.label}
                {i === index && <span data-progress-x={i} className="absolute inset-x-3 bottom-1 h-px origin-left bg-white/70" />}
              </button>
            ))}
          </div>

          <div className="iso-grid relative overflow-hidden px-4 py-8 sm:px-8 md:px-12 md:py-14" role="tabpanel">
            <div ref={screen}>
              <AppMock tab={tab} />
            </div>
          </div>
        </div>
        <div className="h-20 border-t border-[var(--line)] md:h-28" />
      </div>
    </section>
  );
}
