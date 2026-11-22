import React from "react";

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

const SIZE_MAP = {
  sm: 28,
  md: 36,
  lg: 44,
};

export const Logo: React.FC<LogoProps> = ({ size = "md", className = "", showText = false }) => {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        userSelect: "none",
      }}
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="mdLogoGradient"
            x1="4"
            y1="4"
            x2="44"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#18181B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient
            id="mdAccentGradient"
            x1="16"
            y1="12"
            x2="36"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Squircle base */}
        <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#mdLogoGradient)" />
        <rect
          x="3.5"
          y="3.5"
          width="41"
          height="41"
          rx="11.5"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />

        {/* Roof / House top */}
        <path
          d="M12 24L24 13L36 24"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* House body */}
        <path
          d="M15 23V34C15 35.1046 15.8954 36 17 36H31C32.1046 36 33 35.1046 33 34V23"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stylized wrench / master tool */}
        <path
          d="M27 21L21 27M21 27L19 32L24 30L27 21ZM27 21C27.5 20 29.5 19.5 30.5 20.5C31.5 21.5 31 23.5 30 24L27 21Z"
          fill="url(#mdAccentGradient)"
          stroke="url(#mdAccentGradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pulse dot indicating master is active */}
        <circle cx="35" cy="13" r="3" fill="#34D399" />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'var(--font-family-base, "Plus Jakarta Sans", sans-serif)',
            fontWeight: 800,
            fontSize: pixelSize * 0.55,
            color: "var(--color-neutral-900, #18181B)",
            letterSpacing: "-0.02em",
          }}
        >
          МайстерДім
        </span>
      )}
    </div>
  );
};

export default Logo;
