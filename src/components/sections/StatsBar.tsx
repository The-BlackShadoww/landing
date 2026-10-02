"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10,000+", label: "Teams worldwide" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "150+", label: "Native integrations" },
];

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="border-y border-white/[0.06] bg-[#0d0d0d]"
    >
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/[0.06]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item flex flex-col items-center gap-1 text-center sm:px-10"
            >
              <span className="font-serif text-[42px] md:text-[52px] tracking-tight text-[#f0ede8] leading-none">
                {stat.value}
              </span>
              <span className="text-[13px] text-[#78736e] mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
