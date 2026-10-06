import type { ReactNode } from "react";

/* Customer wordmarks, each drawn with its own typographic personality. */
export const BRANDS: { name: string; node: ReactNode }[] = [
  {
    name: "Halden Cycles",
    node: <span className="font-mono text-[15px] font-semibold uppercase tracking-[0.32em]">Halden</span>,
  },
  {
    name: "Morrow Ceramics",
    node: <span className="font-[Georgia,serif] text-[21px] italic tracking-tight">Morrow</span>,
  },
  {
    name: "Tallis Audio",
    node: (
      <span className="flex items-center gap-1.5 text-[18px] font-semibold tracking-[-0.05em]">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8" cy="8" r="2.6" fill="currentColor" />
        </svg>
        tallis
      </span>
    ),
  },
  {
    name: "Corvid Outdoor",
    node: <span className="text-[16px] font-semibold uppercase tracking-[0.18em] [font-stretch:condensed]">Corvid&nbsp;/&nbsp;OD</span>,
  },
  {
    name: "Fenwick Foundry",
    node: (
      <span className="flex flex-col items-center leading-none">
        <span className="font-[Georgia,serif] text-[17px] uppercase tracking-[0.2em]">Fenwick</span>
        <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.5em]">Foundry · 1921</span>
      </span>
    ),
  },
  {
    name: "Oaro Furniture",
    node: <span className="text-[24px] font-light lowercase tracking-[-0.06em]">oaro</span>,
  },
  {
    name: "Brightwater Pumps",
    node: (
      <span className="flex items-center gap-1.5 text-[15px] font-medium tracking-tight">
        <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden>
          <path d="M7 1C4 5 2 7.5 2 10a5 5 0 0 0 10 0c0-2.5-2-5-5-9Z" fill="currentColor" />
        </svg>
        Brightwater
      </span>
    ),
  },
  {
    name: "Kiln & Co",
    node: <span className="font-[Georgia,serif] text-[20px] tracking-tight">Kiln&nbsp;<em>&amp;</em>&nbsp;Co.</span>,
  },
  {
    name: "Arkwright Tools",
    node: <span className="border-2 border-current px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-[0.12em]">Arkwright</span>,
  },
];

export function BrandMarquee({ className = "" }: { className?: string }) {
  const row = [...BRANDS, ...BRANDS];
  return (
    <div
      className={`group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] ${className}`}
    >
      <ul className="flex w-max animate-[marquee_45s_linear_infinite] items-center group-hover:[animation-play-state:paused]">
        {row.map((b, i) => (
          <li
            key={i}
            aria-hidden={i >= BRANDS.length}
            className="flex h-16 w-[180px] shrink-0 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100"
          >
            <span className="sr-only">{b.name}</span>
            <span aria-hidden>{b.node}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
