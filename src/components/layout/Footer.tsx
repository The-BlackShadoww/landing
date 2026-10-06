import Logo from "./Logo";

const COLUMNS = [
  { title: "Platform", links: ["Production", "Inventory", "Purchasing", "Quality", "Orders", "Ledger Sync"] },
  { title: "Industries", links: ["Industrial equipment", "Furniture & home", "Food & beverage", "Electronics"] },
  { title: "Company", links: ["About", "Careers", "Customers", "Security", "Contact"] },
  { title: "Resources", links: ["Guides", "Changelog", "Developers", "Status", "Help centre"] },
];

export default function Footer() {
  return (
    <footer className="theme-ink">
      <div className="frame">
        <div className="pad-x grid gap-14 pb-16 pt-20 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-between gap-10">
            <Logo />
            <div>
              <p className="text-[15px] text-white">Get the monthly operations brief</p>
              <p className="mt-1 text-[13px] text-ink-muted">One email. Real playbooks from real plants.</p>
              <div className="mt-4 flex max-w-[340px] items-center border-b border-white/20 focus-within:border-white">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input id="footer-email" type="email" placeholder="you@company.com" className="h-11 min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/35" />
                <button className="text-[14px] text-white/80 transition-colors hover:text-white" aria-label="Subscribe">&rarr;</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <p className="mb-4 text-[14px] text-white">{c.title}</p>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="link-underline text-[13.5px] text-ink-muted transition-colors hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule pad-x flex flex-col gap-4 py-6 text-[12.5px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Plinth Systems, Inc.</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-white">Privacy</a>
            <a href="#top" className="hover:text-white">Terms</a>
            <a href="#top" className="hover:text-white">SOC 2 Type II</a>
          </div>
        </div>

        <div className="overflow-hidden border-t border-[var(--line)]" aria-hidden>
          <p className="translate-y-[18%] select-none text-center text-[clamp(6rem,24vw,19rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-white/[0.06]">
            plinth
          </p>
        </div>
      </div>
    </footer>
  );
}
