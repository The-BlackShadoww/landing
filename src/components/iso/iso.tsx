import type { SVGProps } from "react";

/* Isometric projection: +x runs right-down, +y runs left-down, +z is up. */
export const C = Math.cos(Math.PI / 6);
export const S = 0.5;

export type Pt = [number, number];

export function p(x: number, y: number, z = 0): Pt {
  return [(x - y) * C, (x + y) * S - z];
}

export function pts(...list: Pt[]) {
  return list.map(([a, b]) => `${a.toFixed(2)},${b.toFixed(2)}`).join(" ");
}

/** Polyline through iso points (flat on the ground unless z given). */
export function isoPath(points: [number, number, number?][]) {
  return points
    .map(([x, y, z], i) => {
      const [a, b] = p(x, y, z ?? 0);
      return `${i ? "L" : "M"}${a.toFixed(2)} ${b.toFixed(2)}`;
    })
    .join(" ");
}

/** SVG transform that lays text onto a face. */
export const onTop = (x: number, y: number, z: number) => {
  const [a, b] = p(x, y, z);
  return `matrix(${C} ${S} ${-C} ${S} ${a} ${b})`;
};
export const onLeft = (x: number, y: number, z: number) => {
  const [a, b] = p(x, y, z);
  return `matrix(${C} ${S} 0 1 ${a} ${b})`;
};
export const onRight = (x: number, y: number, z: number) => {
  const [a, b] = p(x, y, z);
  return `matrix(${C} ${-S} 0 1 ${a} ${b})`;
};

type BoxProps = {
  x?: number;
  y?: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  /** Solid fill for the top; side faces are shaded from it unless given. */
  top?: string;
  left?: string;
  right?: string;
  stroke?: string;
  strokeWidth?: number;
  hatch?: string;
} & Omit<SVGProps<SVGGElement>, "x" | "y" | "z" | "d" | "h" | "w">;

export function Box({
  x = 0,
  y = 0,
  z = 0,
  w,
  d,
  h,
  top = "none",
  left,
  right,
  stroke = "currentColor",
  strokeWidth = 1,
  hatch,
  ...rest
}: BoxProps) {
  const t = pts(p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h));
  const l = pts(p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h));
  const r = pts(p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h));
  const common = { stroke, strokeWidth, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const };
  return (
    <g {...rest}>
      <polygon points={l} fill={left ?? top} {...common} />
      <polygon points={r} fill={right ?? top} {...common} />
      {top !== "none" && left === undefined && <polygon points={l} fill="rgba(0,0,0,0.12)" stroke="none" />}
      {top !== "none" && right === undefined && <polygon points={r} fill="rgba(0,0,0,0.24)" stroke="none" />}
      {hatch && <polygon points={r} fill={`url(#${hatch})`} stroke="none" />}
      <polygon points={t} fill={top} {...common} />
    </g>
  );
}

/** Diagonal hatch pattern used on shaded faces. */
export function Hatch({ id, color = "currentColor", opacity = 0.35, gap = 5 }: { id: string; color?: string; opacity?: number; gap?: number }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
      <line x1="0" y1="0" x2="0" y2={gap} stroke={color} strokeWidth="1" opacity={opacity} />
    </pattern>
  );
}
