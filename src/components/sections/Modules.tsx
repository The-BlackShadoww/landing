import type { ReactNode } from "react";
import { Box, onTop } from "@/components/iso/iso";

const F = { top: "#f1efeb", left: "#e3dfd9", right: "#cfcac2", stroke: "#161616", strokeWidth: 1 };

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="-26 -30 52 52" className="h-16 w-16 overflow-visible" aria-hidden>
      {children}
    </svg>
  );
}

const ICONS: Record<string, ReactNode> = {
  production: (
    <Icon>
      <Box {...F} x={-10} y={-10} w={20} d={20} h={9} />
      <g className="mod-lift">
        <Box {...F} x={-6} y={-6} w={10} d={10} h={8} z={9} />
        <Box {...F} x={6} y={-8} w={4} d={4} h={14} z={9} />
      </g>
    </Icon>
  ),
  inventory: (
    <Icon>
      <Box {...F} x={-11} y={-11} w={10} d={10} h={9} />
      <Box {...F} x={1} y={-11} w={10} d={10} h={9} />
      <Box {...F} x={-11} y={1} w={10} d={10} h={9} />
      <Box {...F} x={1} y={1} w={10} d={10} h={9} />
      <g className="mod-lift">
        <Box {...F} x={-11} y={-11} w={10} d={10} h={9} z={9} />
      </g>
    </Icon>
  ),
  purchasing: (
    <Icon>
      <Box {...F} x={-10} y={-10} w={20} d={20} h={10} />
      <g className="mod-lift">
        <Box {...F} x={-6} y={-4} w={12} d={1.5} h={16} z={6} top="#fff" left="#fff" right="#e9e6e1" />
        <path d="M-4.6 2.2 l7 4 M-4.6 5.6 l5 2.9" stroke="#161616" strokeWidth="0.9" transform="translate(1 -4)" />
      </g>
    </Icon>
  ),
  quality: (
    <Icon>
      <Box {...F} x={-10} y={-10} w={20} d={20} h={12} />
      <g className="mod-lift">
        <g transform={onTop(-10, -10, 12)}>
          <path d="M5 11 l4 4 l7 -9" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </Icon>
  ),
  orders: (
    <Icon>
      <Box {...F} x={-16} y={-4} w={32} d={8} h={3} />
      <g className="mod-lift">
        <Box {...F} x={-14} y={-3} w={7} d={6} h={6} z={3} />
        <Box {...F} x={-3} y={-3} w={7} d={6} h={6} z={3} />
        <Box {...F} x={8} y={-3} w={7} d={6} h={6} z={3} />
      </g>
    </Icon>
  ),
  warehouse: (
    <Icon>
      {[0, 8, 16].map((z) => (
        <Box key={z} {...F} x={-12} y={-6} w={24} d={10} h={1.6} z={z} />
      ))}
      <g className="mod-lift">
        <Box {...F} x={-9} y={-4} w={7} d={6} h={6} z={1.6} />
        <Box {...F} x={2} y={-4} w={7} d={6} h={6} z={9.6} />
      </g>
    </Icon>
  ),
  planning: (
    <Icon>
      <Box {...F} x={-14} y={-6} w={28} d={12} h={2} />
      <g className="mod-lift">
        <Box {...F} x={-11} y={-2} w={6} d={6} h={6} z={2} />
        <Box {...F} x={-3} y={-2} w={6} d={6} h={11} z={2} />
        <Box {...F} x={5} y={-2} w={6} d={6} h={17} z={2} top="#2c3bf5" />
      </g>
    </Icon>
  ),
  ledger: (
    <Icon>
      {[0, 3, 6].map((z) => (
        <Box key={z} {...F} x={-11} y={-8} w={14} d={14} h={2.4} z={z} top="#fff" />
      ))}
      <g className="mod-lift">
        <Box {...F} x={4} y={2} w={8} d={8} h={8} />
      </g>
    </Icon>
  ),
  more: (
    <Icon>
      <Box {...F} x={-7} y={-7} w={14} d={14} h={14} top="none" left="none" right="none" strokeWidth={1} />
    </Icon>
  ),
};

const MODULES = [
  { key: "production", title: "Production Planning", note: "Routings, capacity, MRP" },
  { key: "inventory", title: "Inventory Management", note: "Lots, serials, multi-site" },
  { key: "purchasing", title: "Procurement", note: "Auto-drafted POs" },
  { key: "quality", title: "Quality & Traceability", note: "NCRs, CoAs, recalls" },
  { key: "orders", title: "Order Management", note: "EDI, B2B portal, DTC" },
  { key: "warehouse", title: "Warehouse", note: "Pick, pack, cycle counts" },
  { key: "planning", title: "Demand Planning", note: "Forecasts that learn" },
  { key: "ledger", title: "Finance Bridge", note: "Landed cost, GL sync" },
];

export default function Modules() {
  return (
    <section id="modules" className="theme-bone">
      <div className="frame">
        <div className="pad-x grid gap-6 pb-14 pt-24 md:grid-cols-2 md:items-end md:pt-32">
          <h2 className="h2 max-w-[440px]" data-split>
            Modules for every part of the operation
          </h2>
          <p className="max-w-[400px] text-[16px] leading-relaxed text-bone-muted md:justify-self-end" data-reveal>
            Start with the module that hurts most today. Add the rest when you are ready, with no
            re-implementation and no data migration.
          </p>
        </div>

        <div className="rule pad-x py-10 md:py-14">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {MODULES.map((m) => (
              <li key={m.key} data-reveal>
                <a
                  href="#cta"
                  className="group relative flex aspect-[1.2/1] flex-col justify-between overflow-hidden rounded-[3px] bg-bone-2 p-4 transition-colors duration-500 hover:bg-[#f1efeb] md:p-5"
                >
                  <span className="block w-fit [&_.mod-lift]:transition-transform [&_.mod-lift]:duration-500 [&_.mod-lift]:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[&_.mod-lift]:-translate-y-[3px]">
                    {ICONS[m.key]}
                  </span>
                  <span>
                    <span className="block text-[15px] leading-tight tracking-[-0.015em] md:text-[17px]">{m.title}</span>
                    <span className="mt-1 block text-[12.5px] text-bone-muted transition-[opacity,transform] duration-500 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      {m.note}
                    </span>
                  </span>
                  <span className="absolute right-4 top-4 text-bone-muted opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:opacity-100 md:right-5 md:top-5" aria-hidden>
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
            <li className="col-span-2" data-reveal>
              <div className="flex h-full min-h-[160px] flex-col justify-between rounded-[3px] bg-bone-2 p-5">
                <div className="flex items-start justify-between">
                  <span className="text-[17px] tracking-[-0.015em]">Looking for something else?</span>
                  {ICONS.more}
                </div>
                <div className="flex items-end justify-between gap-4">
                  <span className="max-w-[220px] text-[13px] text-bone-muted">
                    Tell us how your shop runs. Custom objects and workflows ship in days, not quarters.
                  </span>
                  <a href="#cta" className="btn btn-ghost h-9 shrink-0 text-[13px]">Talk to us</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
