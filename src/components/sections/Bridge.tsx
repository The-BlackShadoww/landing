"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Box } from "@/components/iso/iso";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const T = Math.tan(Math.PI / 6); // iso slope

function Node({ x, y }: { x: number; y: number }) {
  return (
    <g className="bridge-node" transform={`translate(${x} ${y})`}>
      <line x1="0" y1="0" x2="0" y2="-16" stroke="currentColor" strokeWidth="1" />
      <circle r="2.2" fill="currentColor" />
      <g transform="translate(0 -26) scale(0.62)">
        <Box x={-6} y={-6} z={0} w={12} d={12} h={12} stroke="currentColor" strokeWidth={1} />
      </g>
    </g>
  );
}

export default function Bridge({
  title,
  cta = "Book a demo",
  id,
}: {
  title: React.ReactNode;
  cta?: string;
  id?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      root.current?.querySelectorAll<SVGPathElement>(".bridge-path").forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 45%", scrub: 0.6 } }
        );
      });
      gsap.from(".bridge-node", {
        opacity: 0,
        y: 10,
        stagger: 0.2,
        scrollTrigger: { trigger: root.current, start: "top 40%", end: "center 35%", scrub: 0.6 },
      });
    },
    { scope: root }
  );

  // Left trace: runs in from the edge, turns up along the iso axis.
  const left = `M -20 300 L 70 300 Q 92 300 110 ${300 - 20 * T * 1.5} L ${110 + 70} ${300 - 20 * T * 1.5 - 70 * T}`;
  const lx = 180, ly = 300 - 20 * T * 1.5 - 70 * T;
  const right = `M 1220 110 L ${1220 - 140} ${110 + 140 * T} Q ${1060} ${110 + 160 * T + 6} ${1040} ${110 + 160 * T - 4} L ${990} ${110 + 160 * T - 4 - 50 * T}`;
  const rx = 990, ry = 110 + 160 * T - 4 - 50 * T;

  return (
    <section ref={root} id={id} className="theme-ink">
      <div className="frame iso-grid relative overflow-hidden">
        <svg viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full text-white/45" aria-hidden>
          <path className="bridge-path" d={left} fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path className="bridge-path" d={right} fill="none" stroke="currentColor" strokeWidth="1.2" />
          <Node x={lx} y={ly} />
          <Node x={rx} y={ry} />
        </svg>
        <div className="pad-x relative flex flex-col items-center py-28 text-center md:py-36">
          <h2 className="h2 max-w-[560px]" data-split>
            {title}
          </h2>
          <a href="#cta" className="btn btn-light mt-10 h-11 px-6" data-reveal>
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}
