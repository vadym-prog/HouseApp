import React from "react";

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
    <div className="w-full">
      <div className="relative flex items-center">
        <span className="absolute inset-y-0 left-4 flex items-center font-mono text-xs text-neutral-500 font-semibold select-none">
          +380
        </span>
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="(00) 000-00-00"
          className={`w-full pl-16 pr-4 py-3 rounded-full bg-white border text-sm font-semibold text-black placeholder-neutral-400 focus:outline-none transition-all ${
            error
              ? "border-danger-rose focus:ring-1 focus:ring-danger-rose"
              : "border-neutral-300 focus:border-black focus:ring-1 focus:ring-black"
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="block mt-1 text-xs text-danger-rose font-medium pl-4">{error}</span>
      )}
    </div>
  );
};
