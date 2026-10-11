import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  children,
  className = "",
  disabled,
  ...props
}) => {
  const sizeClass = size === "sm" ? styles.sizeSm : size === "lg" ? styles.sizeLg : styles.sizeMd;

  const variantClass =
    variant === "secondary"
      ? styles.secondary
      : variant === "outline"
        ? styles.outline
        : variant === "ghost"
          ? styles.ghost
          : styles.primary;

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variantClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
