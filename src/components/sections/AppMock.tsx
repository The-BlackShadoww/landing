import type { Kpi, Panel, Tab, Tone } from "./productData";
import { SIDEBAR } from "./productData";

const TONE: Record<Tone, string> = {
  green: "bg-[#e3efe1] text-[#2f6a34]",
  blue: "bg-[#e1e8fd] text-[#2c3bb5]",
  yellow: "bg-[#fbf0d4] text-[#8a5c00]",
  red: "bg-[#f8e3e1] text-[#9f2f2d]",
  gray: "bg-black/[0.05] text-black/55",
};

function Spark({ data, up }: { data: number[]; up: boolean }) {
  const max = 10;
  const d = data.map((v, i) => `${i ? "L" : "M"}${(i / (data.length - 1)) * 60} ${18 - (v / max) * 16}`).join(" ");
  return (
    <svg viewBox="0 0 60 20" className="h-5 w-16" aria-hidden>
      <path d={d} fill="none" stroke={up ? "#2f6a34" : "#161616"} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function KpiCard({ k }: { k: Kpi }) {
  return (
    <div className="mock-item rounded-md border border-black/[0.07] bg-white p-3">
      <p className="truncate text-[10px] text-black/50">{k.label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-2">
        <span className="text-[17px] font-medium tracking-tight text-ink">{k.value}</span>
        <Spark data={k.spark} up={k.up} />
      </div>
      <p className="mt-1 text-[9.5px] text-black/45">
        <span className={k.up ? "text-[#2f6a34]" : "text-black/70"}>{k.up ? "▲" : "▼"} {k.delta}</span> vs last month
      </p>
    </div>
  );
}

function PanelView({ panel }: { panel: Panel }) {
  if (panel.kind === "table") {
    return (
      <div className="overflow-hidden rounded-md border border-black/[0.07] bg-white">
        <div className="grid grid-cols-[1fr_1.6fr_0.8fr_0.7fr_0.8fr_0.9fr] gap-2 border-b border-black/[0.07] bg-black/[0.02] px-3 py-2 text-[9.5px] uppercase tracking-wide text-black/45 max-sm:grid-cols-[1fr_1.6fr_0.9fr]">
          {panel.columns.map((c, i) => (
            <span key={c} className={i > 1 ? "max-sm:hidden" : ""}>{c}</span>
          ))}
          <span>Status</span>
        </div>
        {panel.rows.map((r) => (
          <div key={r.cells[0]} className="mock-item grid grid-cols-[1fr_1.6fr_0.8fr_0.7fr_0.8fr_0.9fr] items-center gap-2 border-b border-black/[0.05] px-3 py-[9px] text-[11px] text-black/75 last:border-0 max-sm:grid-cols-[1fr_1.6fr_0.9fr]">
            {r.cells.map((c, i) => (
              <span key={i} className={`truncate ${i === 0 ? "font-mono text-[10px] text-black/55" : ""} ${i > 1 ? "max-sm:hidden" : ""}`}>{c}</span>
            ))}
            <span className={`w-fit rounded px-1.5 py-0.5 text-[9.5px] ${TONE[r.tag[1]]}`}>{r.tag[0]}</span>
          </div>
        ))}
      </div>
    );
  }

  if (panel.kind === "bars") {
    const colors = ["bg-ink", "bg-[#5470f2]", "bg-[#f3b63f]"];
    return (
      <div className="rounded-md border border-black/[0.07] bg-white p-4">
        <div className="mb-4 flex gap-4 text-[10px] text-black/50">
          {panel.sites.map((s, i) => (
            <span key={s} className="flex items-center gap-1.5"><i className={`h-2 w-2 rounded-sm ${colors[i]}`} />{s}</span>
          ))}
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-px bg-[#ee5a48]" />Reorder point</span>
        </div>
        <div className="space-y-3.5">
          {panel.rows.map((r) => {
            const total = r.values.reduce((a, b) => a + b, 0);
            return (
              <div key={r.part} className="mock-item grid grid-cols-[130px_1fr_34px] items-center gap-3 text-[11px] max-sm:grid-cols-[90px_1fr_30px]">
                <span className="truncate text-black/70">{r.part}</span>
                <div className="relative h-3 rounded-sm bg-black/[0.04]">
                  <div className="mock-bar flex h-full origin-left overflow-hidden rounded-sm" style={{ width: `${total}%` }}>
                    {r.values.map((v, i) => (
                      <span key={i} className={colors[i]} style={{ width: `${(v / total) * 100}%` }} />
                    ))}
                  </div>
                  <span className="absolute -bottom-1 -top-1 w-px bg-[#ee5a48]" style={{ left: `${r.reorder}%` }} />
                </div>
                <span className={`text-right font-mono text-[10px] ${total < r.reorder ? "text-[#9f2f2d]" : "text-black/50"}`}>{total}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (panel.kind === "chart") {
    return (
      <div className="rounded-md border border-black/[0.07] bg-white p-4">
        <div className="mb-3 flex gap-4 text-[10px] text-black/50">
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-black/15" />Revenue</span>
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-ink" />Contribution margin</span>
        </div>
        <div className="flex h-[176px] items-end gap-[6%] border-b border-black/10 px-2">
          {panel.bars.map((b) => (
            <div key={b.label} className="relative flex h-full flex-1 items-end">
              <div className="mock-vbar absolute bottom-0 w-full origin-bottom rounded-t-sm bg-black/[0.12]" style={{ height: `${b.revenue}%` }} />
              <div className="mock-vbar relative w-full origin-bottom rounded-t-sm bg-ink" style={{ height: `${b.margin}%` }}>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white mix-blend-difference">{Math.round((b.margin / b.revenue) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-[6%] px-2 pt-2">
          {panel.bars.map((b) => (
            <span key={b.label} className="flex-1 truncate text-center text-[10px] text-black/50">{b.label}</span>
          ))}
        </div>
      </div>
    );
  }

  // Lot genealogy tree
  const node = (x: number, y: number, label: string, sub: string, dark = false) => (
    <g className="mock-item" transform={`translate(${x} ${y})`}>
      <rect width="112" height="34" rx="5" fill={dark ? "#161616" : "#fff"} stroke="rgba(0,0,0,0.12)" />
      <text x="9" y="14" fontSize="9" fill={dark ? "#fff" : "#161616"} fontFamily="var(--font-host-grotesk)">{label}</text>
      <text x="9" y="26" fontSize="7.5" fill={dark ? "#9a9792" : "rgba(0,0,0,0.5)"} fontFamily="var(--font-geist-mono)">{sub}</text>
    </g>
  );
  const link = (x1: number, y1: number, x2: number, y2: number) => (
    <path className="mock-link" d={`M${x1} ${y1} C${x1 + 30} ${y1} ${x2 - 30} ${y2} ${x2} ${y2}`} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
  );
  return (
    <div className="rounded-md border border-black/[0.07] bg-white p-3">
      <svg viewBox="0 0 520 200" className="w-full" aria-label="Lot genealogy diagram">
        {link(124, 100, 196, 40)}
        {link(124, 100, 196, 100)}
        {link(124, 100, 196, 160)}
        {link(308, 40, 380, 60)}
        {link(308, 100, 380, 60)}
        {link(308, 160, 380, 150)}
        {node(12, 83, "6061 tube stock", "LOT 24-118 · Reynolds", true)}
        {node(196, 23, "Gravel frame 54", "WO-2291 · 120 pcs")}
        {node(196, 83, "Gravel frame 56", "WO-2293 · 80 pcs")}
        {node(196, 143, "Rear triangle", "WO-2288 · 90 pcs")}
        {node(380, 43, "Velo Dealers UK", "SO-41207 · shipped")}
        {node(380, 133, "Leeds stock", "BIN A-14 · 36 pcs")}
      </svg>
    </div>
  );
}

export default function AppMock({ tab }: { tab: Tab }) {
  return (
    <div className="overflow-hidden rounded-[6px] bg-[#f4f3f0] text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
      {/* Window chrome */}
      <div className="flex h-9 items-center gap-3 border-b border-black/[0.07] bg-white px-3">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <i className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <i className="h-2.5 w-2.5 rounded-full bg-black/10" />
        </div>
        <div className="mx-auto flex h-5 w-[46%] items-center justify-center rounded bg-black/[0.04] font-mono text-[9.5px] text-black/40">
          app.plinth.co/{tab.key}
        </div>
        <span className="h-5 w-5 rounded-full bg-[#5470f2]" />
      </div>

      <div className="flex min-h-[460px]">
        {/* Sidebar */}
        <aside className="hidden w-[150px] shrink-0 border-r border-black/[0.07] bg-[#efeeea] p-3 md:block">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-ink text-[9px] font-semibold text-white">H</span>
            <span className="text-[11px] font-medium">Halden Cycles</span>
          </div>
          <div className="mb-3 rounded bg-black/[0.04] px-2 py-1 text-[10px] text-black/40">Search  <span className="float-right font-mono">⌘K</span></div>
          <ul className="space-y-0.5">
            {SIDEBAR.map((s) => (
              <li
                key={s}
                className={`rounded px-2 py-1.5 text-[11px] transition-colors duration-300 ${
                  s === tab.nav ? "bg-white font-medium text-ink shadow-[0_1px_0_rgba(0,0,0,0.04)]" : "text-black/55"
                }`}
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-md border border-black/[0.06] bg-white p-2.5">
            <p className="text-[9.5px] font-medium">Plinth AI</p>
            <p className="mt-1 text-[9px] leading-snug text-black/50">3 work orders at risk. Reschedule to Weld B?</p>
            <span className="mt-2 inline-block rounded bg-ink px-1.5 py-0.5 text-[9px] text-white">Review</span>
          </div>
        </aside>

        {/* Main */}
        <div className="mock-main min-w-0 flex-1 p-4 sm:p-5">
          <p className="mock-item font-mono text-[9.5px] text-black/40">{tab.nav} / {tab.label}</p>
          <div className="mock-item mt-1 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="truncate text-[17px] font-medium tracking-tight">{tab.title}</h4>
              <p className="truncate text-[10.5px] text-black/50">{tab.subtitle}</p>
            </div>
            <span className="shrink-0 rounded bg-ink px-2.5 py-1.5 text-[10px] text-white">{tab.action}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {tab.kpis.map((k) => (
              <KpiCard key={k.label} k={k} />
            ))}
          </div>
          <div className="mt-3">
            <PanelView panel={tab.panel} />
          </div>
        </div>
      </div>
    </div>
  );
}
