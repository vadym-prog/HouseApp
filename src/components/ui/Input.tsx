import React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = "",
  id,
  ...props
}) => {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={generatedId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {leftIcon && (
          <span className={`material-symbols-outlined ${styles.iconLeft}`}>{leftIcon}</span>
        )}
        <input
          id={generatedId}
          className={`${styles.input} ${leftIcon ? styles.hasLeftIcon : ""} ${
            rightIcon ? styles.hasRightIcon : ""
          } ${error ? styles.errorInput : ""} ${className}`.trim()}
          {...props}
        />
        {rightIcon && (
          <span className={`material-symbols-outlined ${styles.iconRight}`}>{rightIcon}</span>
        )}
      </div>
      {error ? (
        <span className={styles.errorText}>{error}</span>
      ) : helperText ? (
        <span className={styles.helperText}>{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
