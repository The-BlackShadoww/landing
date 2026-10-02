"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 24,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-2xl border border-white/[0.08] bg-[#111111] overflow-hidden px-8 py-20 flex flex-col items-center text-center gap-8"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 80% at 50% 120%, rgba(240,237,232,0.03) 0%, transparent 100%)",
          }}
        >
          {/* Noise overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="cta-content flex flex-col items-center gap-8 relative z-10">
            <p className="section-label">Get started</p>

            <h2 className="font-serif text-[clamp(36px,5.5vw,64px)] leading-[1.08] tracking-[-0.03em] text-[#f0ede8] max-w-2xl">
              Ready to transform your operations?
            </h2>

            <p className="text-[15px] text-[#78736e] max-w-md leading-relaxed">
              Join 10,000+ teams already using Nexus to run their business.
              Start free — no credit card, no setup fees.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="primary" size="lg" href="#">
                Start for free
              </Button>
              <Button variant="secondary" size="lg" href="#">
                Schedule a demo →
              </Button>
            </div>

            <p className="text-[12px] text-[#3a3530]">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
