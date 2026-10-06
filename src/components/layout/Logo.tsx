import { C, p, pts } from "@/components/iso/iso";

function slab(x: number, y: number, z: number, w: number, d: number, h: number) {
  return {
    top: pts(p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)),
    left: pts(p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)),
    right: pts(p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)),
  };
}

const base = slab(0, 0, 0, 14, 14, 4);
const cap = slab(3, 3, 5.5, 8, 8, 4);
const vb = `${(-14 * C - 0.5).toFixed(2)} -7 ${(28 * C + 1).toFixed(2)} 22`;

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={vb} className={className} aria-hidden="true" fill="currentColor">
      {[base, cap].map((s, i) => (
        <g key={i}>
          <polygon points={s.left} opacity={0.62} />
          <polygon points={s.right} opacity={0.36} />
          <polygon points={s.top} />
        </g>
      ))}
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-[22px] w-auto" />
      <span className="text-[19px] font-semibold tracking-[-0.04em] leading-none">plinth</span>
    </span>
  );
}
