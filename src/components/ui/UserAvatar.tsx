import React, { useState } from "react";

export interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  showOnline?: boolean;
  className?: string;
  shape?: "circle" | "rounded";
}

const SIZE_MAP = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 96,
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = "Користувач",
  size = "md",
  showOnline = false,
  className = "",
  shape = "circle",
}) => {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size];
  const borderRadius = shape === "circle" ? "50%" : "16px";
  const [imageError, setImageError] = useState(false);

  const hasValidImage = Boolean(src && !imageError && src.trim().length > 0);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: pixelSize,
        height: pixelSize,
        flexShrink: 0,
        display: "inline-block",
      }}
    >
      {hasValidImage ? (
        <img
          src={src!}
          alt={alt}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "100%",
            borderRadius,
            objectFit: "cover",
            display: "block",
            boxShadow: "var(--shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05))",
            border: "2px solid var(--border-default, #E4E4E7)",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius,
            backgroundColor: "var(--color-neutral-100, #F4F4F5)",
            border: "2px solid var(--border-default, #E4E4E7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-neutral-500, #71717A)",
            boxShadow: "var(--shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05))",
            overflow: "hidden",
          }}
          aria-label={alt}
        >
          {/* High-quality vector silhouette */}
          <svg
            width={pixelSize * 0.65}
            height={pixelSize * 0.65}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 19C4 15.6863 7.58172 13 12 13C16.4183 13 20 15.6863 20 19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19ZM12 15C8.80385 15 6.22328 16.8402 6.01452 18H17.9855C17.7767 16.8402 15.1962 15 12 15Z"
            />
          </svg>
        </div>
      )}

      {showOnline && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: Math.max(8, pixelSize * 0.22),
            height: Math.max(8, pixelSize * 0.22),
            borderRadius: "50%",
            backgroundColor: "var(--color-accent-emerald, #059669)",
            border: "2px solid #FFFFFF",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
          }}
          title="В мережі"
        />
      )}
    </div>
  );
};

export default UserAvatar;
