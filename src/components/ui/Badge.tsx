"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-white/10 bg-white/5 text-[#e8e4df] ${className}`}
    >
      {children}
    </span>
  );
}
