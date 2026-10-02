"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", style }: CardProps) {
  return (
    <div
      className={`bg-[#111111] border border-white/[0.08] rounded-[10px] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
