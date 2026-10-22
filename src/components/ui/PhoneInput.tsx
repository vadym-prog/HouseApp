import React from "react";

export type PhoneInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const PhoneInput: React.FC<PhoneInputProps> = (props) => <input type="tel" {...props} />;
