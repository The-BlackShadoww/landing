"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

type MenuItem = { title: string; desc: string };
type NavEntry = { label: string; href: string; menu?: { heading: string; items: MenuItem[]; aside: { kicker: string; title: string } } };

const NAV: NavEntry[] = [
  {
    label: "Platform",
    href: "#platform",
    menu: {
      heading: "Platform",
      items: [
        { title: "Production", desc: "Work orders, routings and live shop-floor status" },
        { title: "Inventory", desc: "Lot-tracked stock across every site and bin" },
        { title: "Purchasing", desc: "Auto-generated POs with three-way match" },
        { title: "Quality", desc: "Inspections, NCRs and full genealogy" },
        { title: "Orders", desc: "One queue for wholesale, retail and direct" },
        { title: "Ledger Sync", desc: "Clean journal entries into your GL" },
      ],
      aside: { kicker: "New", title: "Autumn release: AI scheduling and lot genealogy" },
    },
  },
  {
    label: "Solutions",
    href: "#industries",
    menu: {
      heading: "By industry",
      items: [
        { title: "Industrial equipment", desc: "Configure-to-order with deep BOMs" },
        { title: "Furniture & home", desc: "Variants, finishes and retail EDI" },
        { title: "Food & beverage", desc: "Batch, expiry and recall readiness" },
        { title: "Electronics", desc: "Serial tracking and supplier scorecards" },
      ],
      aside: { kicker: "Customer story", title: "How Halden Cycles cut late work orders from 41% to 3%" },
    },
  },
  {
    label: "Resources",
    href: "#customers",
    menu: {
      heading: "Learn",
      items: [
        { title: "Customer stories", desc: "Results from teams running on Plinth" },
        { title: "Guides", desc: "Practical playbooks for operations leads" },
        { title: "Changelog", desc: "Everything we shipped this month" },
        { title: "Developers", desc: "REST and webhook reference" },
      ],
      aside: { kicker: "Guide", title: "The landed-cost checklist for growing manufacturers" },
    },
  },
  { label: "Integrations", href: "#modules" },
  { label: "Pricing", href: "#cta" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const enter = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  const active = NAV.find((n) => n.label === open)?.menu;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ transform: scrolled ? "translateY(-36px)" : "none" }}
    >
      {/* Announcement */}
      <a
        href="#platform"
        className="group flex h-9 items-center justify-center gap-2 bg-accent px-4 text-[13px] font-medium text-white"
      >
        <span className="truncate">Autumn release: AI scheduling, lot genealogy and 40 new connectors</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
          &rarr;
        </span>
      </a>

      {/* Bar */}
      <div
        className={`theme-ink relative transition-[border-color] duration-300 ${
          scrolled ? "border-b border-white/10" : "border-b border-transparent"
        }`}
        onMouseLeave={leave}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-10" aria-label="Main">
          <a href="#top" aria-label="Plinth home" className="text-ink-text">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.label} onMouseEnter={() => (item.menu ? enter(item.label) : setOpen(null))}>
                <a
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                    open === item.label ? "bg-white/[0.07] text-white" : "text-white/80 hover:text-white"
                  }`}
                  aria-expanded={item.menu ? open === item.label : undefined}
                >
                  {item.label}
                  {item.menu && (
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      className={`transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      <path d="M1 2.5 4 5.5 7 2.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a href="#cta" className="text-sm text-white/80 transition-colors hover:text-white">
              Sign in
            </a>
            <a href="#cta" className="btn btn-light h-9">
              Book a demo
            </a>
          </div>

          <button
            className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
          >
            <span
              className={`absolute h-px w-5 bg-white transition-transform duration-300 ${mobile ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              className={`absolute h-px w-5 bg-white transition-transform duration-300 ${mobile ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </nav>

        {/* Mega menu */}
        <div
          className={`absolute inset-x-0 top-full hidden border-b border-white/10 bg-ink lg:block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          onMouseEnter={() => window.clearTimeout(closeTimer.current)}
        >
          {active && (
            <div className="mx-auto grid max-w-[1200px] grid-cols-[1fr_320px] gap-10 px-10 pb-10 pt-8">
              <div>
                <p className="eyebrow mb-5">{active.heading}</p>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
                  {active.items.map((m) => (
                    <li key={m.title}>
                      <a href="#platform" className="group block rounded-lg px-3 py-3 -mx-3 transition-colors hover:bg-white/[0.05]">
                        <span className="block text-[15px] text-white">{m.title}</span>
                        <span className="block text-[13px] text-ink-muted">{m.desc}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#customers" className="group flex flex-col justify-between rounded-xl bg-white/[0.05] p-6 transition-colors hover:bg-white/[0.08]">
                <span className="eyebrow">{active.aside.kicker}</span>
                <span className="mt-10 text-lg leading-snug tracking-tight text-white">{active.aside.title}</span>
                <span className="mt-4 text-sm text-ink-muted transition-colors group-hover:text-white">Read more &rarr;</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`theme-ink absolute inset-x-0 top-full h-[calc(100dvh-64px)] overflow-y-auto transition-[opacity,visibility] duration-300 lg:hidden ${
          mobile ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="px-5 pt-4">
          {NAV.map((item, i) => (
            <li
              key={item.label}
              className="border-b border-white/10 transition-[opacity,transform] duration-500"
              style={{ transitionDelay: mobile ? `${i * 50}ms` : "0ms", opacity: mobile ? 1 : 0, transform: mobile ? "none" : "translateY(12px)" }}
            >
              <a href={item.href} onClick={() => setMobile(false)} className="flex items-center justify-between py-5 text-2xl tracking-tight">
                {item.label}
                <span className="text-ink-muted" aria-hidden>&rarr;</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 px-5 py-8">
          <a href="#cta" onClick={() => setMobile(false)} className="btn btn-light">Book a demo</a>
          <a href="#cta" onClick={() => setMobile(false)} className="btn border border-white/20 text-white">Sign in</a>
        </div>
      </div>
    </header>
  );
}
