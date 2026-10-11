import React from "react";
import styles from "./PhoneInput.module.css";

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  error,
  className = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.prefix}>+380</span>
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="(00) 000-00-00"
          className={`${styles.input} ${error ? styles.errorInput : ""} ${className}`.trim()}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default PhoneInput;
