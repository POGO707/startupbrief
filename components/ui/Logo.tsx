import React from "react";

interface LogoProps {
  variant?: "dark" | "light"; // "dark" = dark text on light bg; "light" = light text on dark bg
  height?: number;
  size?: "masthead" | "header" | "footer" | "mobile";
  className?: string;
  showText?: boolean;
}

export default function Logo({
  variant = "dark",
  height,
  size,
  className = "",
  showText = true,
}: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  let computedHeight = height || 42;
  if (size === "masthead") computedHeight = 84;
  else if (size === "header") computedHeight = 44;
  else if (size === "footer") computedHeight = 38;
  else if (size === "mobile") computedHeight = 36;

  // Aspect ratio: viewBox 0 0 420 120 -> width / height = 3.5
  const computedWidth = showText ? computedHeight * 3.5 : computedHeight;

  return (
    <svg
      width={computedWidth}
      height={computedHeight}
      viewBox={showText ? "0 0 420 120" : "0 0 120 120"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`startup-brief-logo ${className}`}
      aria-label="Startup Brief"
    >
      {/* Outer Circle Ring */}
      {/* Black / White Arc (Left/Bottom) */}
      <path
        d="M 60 6 A 54 54 0 1 0 114 60"
        stroke={variant === "light" ? "#ffffff" : "#0f172a"}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Orange Arc (Top/Right) */}
      <path
        d="M 114 60 A 54 54 0 0 0 60 6"
        stroke="#ff6a00"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Document Icon (Black body with top-right fold) */}
      <g transform="translate(32, 28)">
        {/* Main Document Body */}
        <path
          d="M 6 4 C 3.79 4 2 5.79 2 8 L 2 52 C 2 54.21 3.79 56 6 56 L 38 56 C 40.21 56 42 54.21 42 52 L 42 16 L 30 4 Z"
          fill={variant === "light" ? "#ffffff" : "#0f172a"}
        />
        {/* Folded Corner */}
        <path d="M 30 4 L 42 16 L 30 16 Z" fill={variant === "light" ? "#cbd5e1" : "#334155"} />
        {/* Orange horizontal lines on document */}
        <rect x="10" y="16" width="14" height="3" rx="1.5" fill="#ff6a00" />
        <rect x="10" y="24" width="18" height="3" rx="1.5" fill="#ff6a00" />
        <rect x="10" y="32" width="12" height="3" rx="1.5" fill="#ff6a00" />

        {/* Orange Folder / Speech Badge Overlay */}
        <path
          d="M 12 28 L 38 28 C 41.31 28 44 30.69 44 34 L 44 48 C 44 51.31 41.31 54 38 54 L 18 54 L 10 62 L 12 50 C 9.79 50 8 48.21 8 46 L 8 32 C 8 29.79 9.79 28 12 28 Z"
          fill="#ff6a00"
        />
      </g>

      {/* Text Logo: Startup Brief (Perfectly Aligned) */}
      {showText && (
        <g transform="translate(132, 74)">
          <text
            x="0"
            y="0"
            fontFamily="Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="44"
            fill={textColor}
            letterSpacing="-0.035em"
          >
            Startup
          </text>
          <text
            x="164"
            y="0"
            fontFamily="Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="44"
            fill="#ff6a00"
            letterSpacing="-0.035em"
          >
            Brief
          </text>
        </g>
      )}
    </svg>
  );
}
