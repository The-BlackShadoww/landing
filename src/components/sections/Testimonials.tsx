"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Nexus didn't just fix our ops — it gave us a foundation to actually scale. We went from 8-hour onboarding cycles to under 45 minutes. That alone paid for years of subscription.",
    name: "Sarah Chen",
    role: "CTO at Meridian Labs",
    initial: "SC",
  },
  {
    quote:
      "I've tried every tool on the market. Nexus is the first one that actually fits how our ops team thinks. The automation builder is deceptively powerful — you don't realize how much you can do until you're doing it.",
    name: "Marcus Webb",
    role: "Head of Operations at Volta",
    initial: "MW",
  },
  {
    quote:
      "As a co-founder, I need visibility without micromanaging. Nexus gives me a real-time pulse on the entire company in one view. Our investors were impressed by the operational maturity we showed at Series A.",
    name: "Priya Nair",
    role: "Co-founder of Stackform",
    initial: "PN",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <p className="section-label">What teams say</p>
          <h2 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.1] tracking-[-0.025em] text-[#f0ede8] max-w-md">
            The teams who ship faster
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card bg-[#111111] border border-white/[0.08] rounded-[10px] p-7 flex flex-col gap-6"
            >
              {/* Quote mark */}
              <svg
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                className="text-[#3a3530]"
              >
                <path
                  d="M0 16V9.6C0 4.267 3.2 1.067 9.6 0L10.56 1.92C7.68 2.667 6.133 4.267 5.92 6.72H9.6V16H0ZM12.4 16V9.6C12.4 4.267 15.6 1.067 22 0L22.96 1.92C20.08 2.667 18.533 4.267 18.32 6.72H22V16H12.4Z"
                  fill="currentColor"
                />
              </svg>

              <p className="text-[14px] text-[#78736e] leading-relaxed flex-1">{t.quote}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#1e1e1e] border border-white/[0.1] flex items-center justify-center">
                  <span className="text-[10px] font-medium text-[#78736e]">{t.initial}</span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#f0ede8]">{t.name}</p>
                  <p className="text-[11px] text-[#78736e]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
