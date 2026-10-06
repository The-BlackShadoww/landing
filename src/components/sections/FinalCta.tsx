"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Box, Hatch } from "@/components/iso/iso";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const W = { top: "#e4e1dc", left: "#dcd8d2", right: "#d2cdc5", stroke: "#161616", strokeWidth: 0.6, hatch: "cta-hatch" };

function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="cta-pin">
      <line y2="-12" stroke="#161616" strokeWidth="0.6" />
      <circle r="1.2" fill="#161616" />
      <g transform="translate(0 -18) scale(0.45)">
        <Box x={-6} y={-6} w={12} d={12} h={12} top="#fff" left="#fff" right="#eee" stroke="#161616" strokeWidth={0.6} />
      </g>
    </g>
  );
}

function Stack({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="-70 -70 140 130" className="h-full w-full" aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <defs>
        <Hatch id="cta-hatch" color="#161616" opacity={0.18} gap={2.5} />
      </defs>
      <g opacity="0.85">
        <Box {...W} x={-30} y={-10} w={26} d={26} h={30} />
        <Box {...W} x={0} y={-10} w={26} d={26} h={16} />
        <Box {...W} x={-30} y={20} w={26} d={26} h={10} />
        <Box {...W} x={0} y={20} w={26} d={26} h={22} />
      </g>
      <Pin x={-12} y={-46} />
      <Pin x={20} y={-10} />
      <Pin x={-30} y={8} />
    </svg>
  );
}

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".cta-stack-l", { y: 60 }, { y: -20, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".cta-stack-r", { y: 100 }, { y: -40, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".cta-pin", { y: -3, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.3, from: "random" } });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="cta" className="theme-bone !bg-bone-2">
      <div className="frame overflow-hidden">
        <div className="cta-stack-l pointer-events-none absolute -left-10 bottom-0 hidden h-[340px] w-[340px] md:block lg:left-0">
          <Stack />
        </div>
        <div className="cta-stack-r pointer-events-none absolute -right-10 bottom-10 hidden h-[300px] w-[300px] md:block lg:right-0">
          <Stack flip />
        </div>

        <div className="pad-x relative flex flex-col items-center py-28 text-center md:py-40">
          <h2 className="h2 max-w-[560px]" data-split>
            Trust your numbers across production, inventory and orders
          </h2>

          <svg width="10" height="64" viewBox="0 0 10 64" className="my-8 text-bone-muted" aria-hidden data-reveal>
            <path d="M5 2v60M1.5 6 5 2l3.5 4M1.5 58 5 62l3.5-4" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          <form
            className="flex w-full max-w-[420px] items-center gap-1 rounded-full border border-black/10 bg-paper p-1 pl-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            data-reveal
          >
            {sent ? (
              <p className="flex h-10 flex-1 items-center text-left text-[14px] text-ink" role="status">
                Thanks. We will be in touch within one business day.
              </p>
            ) : (
              <>
                <label htmlFor="cta-email" className="sr-only">Work email</label>
                <input
                  id="cta-email"
                  type="email"
                  required
                  placeholder="Work email"
                  className="h-10 min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-bone-muted"
                />
                <button type="submit" className="btn btn-dark h-10 shrink-0">
                  Book a demo
                </button>
              </>
            )}
          </form>
          <p className="mt-4 text-[12.5px] text-bone-muted" data-reveal>
            30-minute walkthrough with a manufacturing specialist. Live in weeks, not quarters.
          </p>
        </div>
      </div>
    </section>
  );
}
