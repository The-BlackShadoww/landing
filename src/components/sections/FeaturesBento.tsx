"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function FeaturesBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-card", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.1,
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
          <p className="section-label">Features</p>
          <h2 className="font-serif text-[clamp(34px,5vw,52px)] leading-[1.1] tracking-[-0.025em] text-[#f0ede8] max-w-lg">
            Built for how teams actually work
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1 — Large (col-span-2) */}
          <div className="bento-card md:col-span-2 bg-[#111111] border border-white/[0.08] rounded-[10px] p-7 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#f0ede8]">
                <IconUsers />
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-[#f0ede8]">
                  Real-time collaboration
                </h3>
                <p className="text-[13px] text-[#78736e] mt-0.5">
                  Work together, synchronously — no refresh needed.
                </p>
              </div>
            </div>
            {/* Metric display */}
            <div className="grid grid-cols-3 gap-3 mt-auto">
              {[
                { val: "124", label: "Active users" },
                { val: "38", label: "Live workflows" },
                { val: "0ms", label: "Sync delay" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-[#161616] rounded-lg p-3 border border-white/[0.06]"
                >
                  <p className="text-[20px] font-medium text-[#f0ede8]">{m.val}</p>
                  <p className="text-[11px] text-[#78736e] mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Small */}
          <div className="bento-card bg-[#111111] border border-white/[0.08] rounded-[10px] p-7 flex flex-col gap-4">
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#f0ede8]">
              <IconZap />
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-[#f0ede8] mb-2">
                Automated workflows
              </h3>
              <p className="text-[13px] text-[#78736e] leading-relaxed">
                Define triggers, conditions, and actions. Let Nexus handle the
                repetitive work so your team can focus on what matters.
              </p>
            </div>
          </div>

          {/* Card 3 — Small */}
          <div className="bento-card bg-[#111111] border border-white/[0.08] rounded-[10px] p-7 flex flex-col gap-4">
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#f0ede8]">
              <IconChart />
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-[#f0ede8] mb-2">
                Smart analytics
              </h3>
              <p className="text-[13px] text-[#78736e] leading-relaxed">
                Surface patterns and bottlenecks before they become problems.
                Real-time dashboards built for operators, not analysts.
              </p>
            </div>
          </div>

          {/* Card 4 — Large (col-span-2) */}
          <div className="bento-card md:col-span-2 bg-[#111111] border border-white/[0.08] rounded-[10px] p-7 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#f0ede8]">
                <IconShield />
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-[#f0ede8]">
                  Enterprise security
                </h3>
                <p className="text-[13px] text-[#78736e] mt-0.5">
                  Bank-grade encryption, audit logs, and role-based access.
                </p>
              </div>
            </div>
            {/* Security badges */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {["SOC 2 Type II", "GDPR", "ISO 27001", "HIPAA Ready", "SSO / SAML"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium border border-white/[0.08] text-[#78736e]"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Card 5 — Small (API code snippet) */}
          <div className="bento-card bg-[#111111] border border-white/[0.08] rounded-[10px] p-7 flex flex-col gap-4">
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#f0ede8]">
              <IconCode />
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-[#f0ede8] mb-3">
                API-first
              </h3>
              <pre className="text-[11px] font-mono text-[#78736e] leading-relaxed bg-[#0d0d0d] rounded-lg p-3 border border-white/[0.06] overflow-hidden">
                <span className="text-[#f0ede8]">POST</span>{" "}
                /v1/workflows
                {"\n"}
                <span className="text-emerald-500">Authorization:</span>{" "}
                Bearer &lt;key&gt;
                {"\n\n"}
                {"{"}
                {"\n"}
                {"  "}
                <span className="text-blue-400">&quot;trigger&quot;</span>:{" "}
                <span className="text-amber-400">&quot;on_submit&quot;</span>
                {"\n"}
                {"}"}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
