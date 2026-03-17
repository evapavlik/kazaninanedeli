"use client";

import { useState } from "react";

interface ToolWrapperProps {
  title: string;
  subtitle?: string;
  icon: string;
  variant?: "brick" | "sage";
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function ToolWrapper({
  title,
  subtitle,
  icon,
  variant = "brick",
  defaultOpen = false,
  children,
}: ToolWrapperProps) {
  const [open, setOpen] = useState(defaultOpen);

  const borderColor = variant === "brick" ? "border-brick/20" : "border-sage/20";
  const bgColor = variant === "brick" ? "bg-brick-pale" : "bg-sage-pale";
  const accentColor = variant === "brick" ? "text-brick" : "text-sage";
  const hoverBorder = variant === "brick" ? "hover:border-brick/40" : "hover:border-sage/40";

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl border ${borderColor} ${bgColor} p-4 text-left transition-all ${hoverBorder}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <div>
            <p className="font-lora text-sm font-bold text-text">{title}</p>
            {subtitle && (
              <p className="text-xs text-text-muted">{subtitle}</p>
            )}
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 ${accentColor} transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div className={`mt-2 rounded-xl border ${borderColor} ${bgColor} p-6`}>
          {children}
        </div>
      )}
    </section>
  );
}
