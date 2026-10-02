"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const trustedCompanies = ["Meridian", "Volta", "Stackform", "Arcana", "Pulse.io"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.7,
      })
        .from(
          headingRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          subRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          logosRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.7,
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-24 px-6 overflow-hidden"
    >
      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Radial fade from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, #0a0a0a 80%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Badge */}
        <div ref={badgeRef}>
          <Badge>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            New: Nexus AI Assistant
            <span className="text-[#78736e]">→</span>
          </Badge>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-serif text-[clamp(52px,8vw,92px)] leading-[1.04] tracking-[-0.03em] text-[#f0ede8]"
        >
          The operating layer
          <br />
          <span className="text-[#78736e]">your business runs on</span>
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          className="max-w-[520px] text-[16px] md:text-[17px] text-[#78736e] leading-relaxed"
        >
          Nexus unifies your workflows, automations, and analytics into a single
          operations layer — so your team can move faster without the chaos.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-3">
          <Button variant="primary" size="lg" href="#">
            Start for free
          </Button>
          <Button variant="secondary" size="lg" href="#">
            See how it works →
          </Button>
        </div>

        {/* Trusted by */}
        <div ref={logosRef} className="flex flex-col items-center gap-5 mt-4">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#78736e]">
            Trusted by teams at
          </p>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {trustedCompanies.map((name) => (
              <span
                key={name}
                className="text-[13px] font-medium tracking-wide text-[#3a3530]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
