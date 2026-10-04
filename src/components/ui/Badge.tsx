import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "emerald" | "violet" | "amber" | "pro";
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  dot = false,
  pulse = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider";

  const variantStyles = {
    neutral: "bg-neutral-100 text-neutral-800",
    emerald: "bg-emerald-50 text-vivid-emerald",
    violet: "bg-indigo-50 text-electric-violet",
    amber: "bg-amber-50 text-warm-amber",
    pro: "bg-secondary-container text-on-secondary-container font-mono text-[10px] px-2 py-0.5",
  };

  const dotColors = {
    neutral: "bg-neutral-500",
    emerald: "bg-vivid-emerald",
    violet: "bg-electric-violet",
    amber: "bg-warm-amber",
    pro: "bg-on-secondary-container",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {dot && (
        <span
          className={`w-2 h-2 rounded-full ${dotColors[variant]} ${pulse ? "animate-pulse" : ""}`}
        />
      )}
      {children}
    </span>
  );
};
