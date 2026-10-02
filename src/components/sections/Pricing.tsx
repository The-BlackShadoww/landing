"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="text-[#f0ede8] flex-shrink-0"
    >
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For small teams getting started with operations.",
    cta: "Get started free",
    ctaVariant: "secondary" as const,
    highlighted: false,
    features: [
      "Up to 5 team members",
      "10 active workflows",
      "Basic automations",
      "Community support",
      "Standard integrations (20+)",
    ],
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    description: "For growing teams that need more power and flexibility.",
    cta: "Start free trial",
    ctaVariant: "primary" as const,
    highlighted: true,
    features: [
      "Unlimited team members",
      "Unlimited workflows",
      "Advanced automations",
      "Priority support",
      "All integrations (150+)",
      "Analytics & reporting",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations that need control, compliance, and scale.",
    cta: "Contact sales",
    ctaVariant: "secondary" as const,
    highlighted: false,
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "SSO / SAML",
      "Custom SLA",
      "Audit logs & compliance",
      "On-premise deployment",
      "Custom contracts",
    ],
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".pricing-card", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.12,
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
    <section
      ref={containerRef}
      id="pricing"
      className="py-28 px-6 bg-[#0d0d0d] border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <p className="section-label">Pricing</p>
          <h2 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.1] tracking-[-0.025em] text-[#f0ede8] max-w-md">
            Simple, transparent pricing
          </h2>
          <p className="text-[15px] text-[#78736e] max-w-sm">
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card flex flex-col gap-6 p-7 rounded-[10px] ${
                tier.highlighted
                  ? "border border-white/30 bg-[#111111]"
                  : "border border-white/[0.08] bg-[#111111]"
              }`}
            >
              {/* Tier header */}
              <div>
                {tier.highlighted && (
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#f0ede8] text-[#0a0a0a] mb-3">
                    Most popular
                  </span>
                )}
                <h3 className="text-[15px] font-medium text-[#f0ede8]">{tier.name}</h3>
                <div className="flex items-baseline gap-0.5 mt-3">
                  <span className="font-serif text-[42px] leading-none text-[#f0ede8] tracking-tight">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-[14px] text-[#78736e]">{tier.period}</span>
                  )}
                </div>
                <p className="text-[13px] text-[#78736e] mt-2">{tier.description}</p>
              </div>

              {/* CTA */}
              <Button variant={tier.ctaVariant} size="md" href="#" className="w-full justify-center">
                {tier.cta}
              </Button>

              {/* Divider */}
              <div className="border-t border-white/[0.06]" />

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-[13px] text-[#78736e]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[12px] text-[#3a3530] mt-10">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
