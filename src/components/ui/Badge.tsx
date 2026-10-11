import React from "react";
import styles from "./Badge.module.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "emerald" | "violet" | "amber" | "pro" | "primary";
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
  const variantClass =
    variant === "emerald"
      ? styles.emerald
      : variant === "violet"
        ? styles.violet
        : variant === "amber"
          ? styles.amber
          : variant === "pro"
            ? styles.pro
            : variant === "primary"
              ? styles.primary
              : styles.neutral;

  const dotClass =
    variant === "emerald"
      ? styles.dotEmerald
      : variant === "violet"
        ? styles.dotViolet
        : variant === "amber"
          ? styles.dotAmber
          : variant === "pro"
            ? styles.dotPro
            : variant === "primary"
              ? styles.dotPrimary
              : styles.dotNeutral;

  return (
    <span className={`${styles.badge} ${variantClass} ${className}`.trim()} {...props}>
      {dot && <span className={`${styles.dot} ${dotClass} ${pulse ? styles.pulse : ""}`} />}
      {children}
    </span>
  );
};

export default Badge;
