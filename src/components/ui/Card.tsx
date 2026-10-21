import React from "react";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  elevated?: boolean;
  subtle?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  padding = "md",
  interactive = false,
  elevated = false,
  subtle = false,
  children,
  className = "",
  ...props
}) => {
  const paddingClass =
    padding === "none"
      ? styles.paddingNone
      : padding === "sm"
        ? styles.paddingSm
        : padding === "lg"
          ? styles.paddingLg
          : styles.paddingMd;

  return (
    <div
      className={`${styles.card} ${paddingClass} ${interactive ? styles.interactive : ""} ${
        elevated ? styles.elevated : ""
      } ${subtle ? styles.subtle : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
