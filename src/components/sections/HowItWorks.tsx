"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Connect your stack",
    description:
      "Integrate Nexus with the tools your team already uses — Slack, Jira, Salesforce, Notion, and 150+ more. Setup takes minutes, not months.",
  },
  {
    number: "02",
    title: "Map your workflows",
    description:
      "Use our visual builder to model any process: from customer onboarding to internal approvals. No code required, but full API access when you need it.",
  },
  {
    number: "03",
    title: "Scale with confidence",
    description:
      "As your team grows, Nexus grows with you. Add automations, adjust permissions, and track everything through a single control plane.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".step-item", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.18,
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
    <section ref={containerRef} className="py-28 px-6 bg-[#0d0d0d] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <p className="section-label">How it works</p>
          <h2 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.1] tracking-[-0.025em] text-[#f0ede8] max-w-md">
            Up and running in three steps
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px border-t border-dashed border-white/[0.1]" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="step-item relative flex flex-col gap-4 md:px-10"
            >
              {/* Number circle */}
              <div className="w-10 h-10 rounded-full border border-white/[0.15] bg-[#111111] flex items-center justify-center flex-shrink-0 relative z-10">
                <span className="font-mono text-[11px] font-medium text-[#78736e]">
                  {step.number}
                </span>
              </div>

              {/* Vertical connector (mobile) */}
              {i < steps.length - 1 && (
                <div className="md:hidden w-px h-8 border-l border-dashed border-white/[0.1] ml-5" />
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-[15px] font-medium text-[#f0ede8]">{step.title}</h3>
                <p className="text-[13px] text-[#78736e] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
