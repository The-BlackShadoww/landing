import HeroScene from "./HeroScene";
import { BrandMarquee } from "./Brands";

export default function Hero() {
  return (
    <section id="top" className="theme-ink">
      <div className="frame">
        <div className="pad-x grid items-center gap-16 pb-20 pt-[160px] lg:min-h-[min(860px,100svh)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24 lg:pt-[150px]">
          <div className="max-w-[560px]">
            <p className="eyebrow mb-7" data-reveal>
              Operations cloud for manufacturers
            </p>
            <h1 className="display text-[clamp(2.6rem,5.2vw,4.25rem)]" data-split>
              The AI-native operating system for manufacturers
            </h1>
            <p className="mt-7 max-w-[440px] text-[17px] leading-relaxed text-ink-muted" data-reveal>
              One source of truth across inventory, production, purchasing and orders, from the
              first raw material to the last shipment.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
              <a href="#cta" className="btn btn-light h-11 px-6">
                Book a demo
              </a>
              <a href="#platform" className="btn h-11 px-5 text-white/80 hover:text-white">
                See the platform <span className="arrow" aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[460px] lg:mr-6 lg:ml-auto">
            <HeroScene />
          </div>
        </div>

        <div className="rule">
          <BrandMarquee className="py-4 text-ink-text" />
        </div>
      </div>
    </section>
  );
}
