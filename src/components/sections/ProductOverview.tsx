"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".po-header", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(mockupRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <p className="po-header section-label">Platform</p>
          <h2 className="po-header font-serif text-[clamp(36px,5vw,56px)] leading-[1.1] tracking-[-0.025em] text-[#f0ede8] max-w-lg">
            One platform. Every workflow.
          </h2>
          <p className="po-header max-w-md text-[15px] text-[#78736e] leading-relaxed">
            From intake to output, Nexus gives your team a single place to manage
            requests, automate processes, and track everything that matters.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div
          ref={mockupRef}
          className="rounded-xl border border-white/[0.08] overflow-hidden"
          style={{
            background: "#0f0f0f",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px -20px rgba(0,0,0,0.8)",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#111111]">
            <span className="w-3 h-3 rounded-full bg-[#2a2a2a]" />
            <span className="w-3 h-3 rounded-full bg-[#2a2a2a]" />
            <span className="w-3 h-3 rounded-full bg-[#2a2a2a]" />
            <div className="flex-1 flex justify-center">
              <div className="px-24 py-1 rounded bg-[#161616] border border-white/[0.06]">
                <span className="text-[11px] text-[#3a3530]">app.nexus.io / dashboard</span>
              </div>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="flex h-[420px] md:h-[520px]">
            {/* Sidebar */}
            <div className="hidden sm:flex w-52 flex-col border-r border-white/[0.06] bg-[#0d0d0d] p-4 gap-1">
              {/* Sidebar logo */}
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-5 h-5 rounded bg-[#f0ede8]" />
                <span className="text-[12px] font-mono font-bold text-[#f0ede8] tracking-widest">NEXUS</span>
              </div>
              {["Overview", "Workflows", "Automations", "Analytics", "Integrations", "Settings"].map(
                (item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md ${
                      i === 0
                        ? "bg-white/[0.06] text-[#f0ede8]"
                        : "text-[#3a3530] hover:text-[#78736e]"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm ${i === 0 ? "bg-[#f0ede8]" : "bg-[#2a2a2a]"}`} />
                    <span className="text-[12px]">{item}</span>
                  </div>
                )
              )}
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 flex flex-col gap-5 overflow-hidden">
              {/* Top row stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Active workflows", val: "248", up: true },
                  { label: "Tasks completed", val: "1,847", up: true },
                  { label: "Avg. cycle time", val: "1.4d", up: false },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#111111] border border-white/[0.06] rounded-lg p-3"
                  >
                    <p className="text-[10px] text-[#3a3530] mb-1">{s.label}</p>
                    <p className="text-[18px] font-medium text-[#f0ede8]">{s.val}</p>
                    <p className={`text-[10px] mt-0.5 ${s.up ? "text-emerald-500" : "text-amber-500"}`}>
                      {s.up ? "↑ 12% this week" : "↓ 8% this week"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="flex-1 bg-[#111111] border border-white/[0.06] rounded-lg p-4 relative overflow-hidden">
                <p className="text-[11px] text-[#78736e] mb-4">Workflow throughput — last 30 days</p>
                {/* Fake bar chart */}
                <div className="absolute bottom-6 left-4 right-4 flex items-end gap-1.5 h-28">
                  {[30, 55, 40, 70, 45, 80, 60, 90, 65, 75, 50, 85, 70, 95, 80, 65, 88, 72, 60, 78, 82, 68, 90, 77, 65, 84, 71, 93, 80, 88].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background:
                            i >= 27
                              ? "rgba(240,237,232,0.5)"
                              : "rgba(255,255,255,0.06)",
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Recent activity list */}
              <div className="bg-[#111111] border border-white/[0.06] rounded-lg p-4">
                <p className="text-[11px] text-[#78736e] mb-3">Recent activity</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Onboarding workflow triggered", time: "2m ago", dot: "bg-emerald-500" },
                    { label: "Invoice automation completed", time: "18m ago", dot: "bg-blue-500" },
                    { label: "Analytics report generated", time: "1h ago", dot: "bg-purple-500" },
                  ].map((a) => (
                    <div key={a.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                        <span className="text-[12px] text-[#78736e]">{a.label}</span>
                      </div>
                      <span className="text-[11px] text-[#3a3530]">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
