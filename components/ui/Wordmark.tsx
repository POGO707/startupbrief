import React from "react";

interface WordmarkProps {
  variant?: "dark" | "light"; // "dark" = dark ink text for white bg; "light" = white text for dark bg
  size?: "masthead" | "header" | "footer" | "mobile";
  className?: string;
}

export default function Wordmark({
  variant = "dark",
  size = "masthead",
  className = "",
}: WordmarkProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";

  return (
    <div className={`startup-brief-wordmark size-${size} ${className}`}>
      <span className="wordmark-text" style={{ color: textColor }}>
        Startup Brief
      </span>
      <span className="wordmark-dot">.</span>

      <style>{`
        .startup-brief-wordmark {
          display: inline-flex;
          align-items: baseline;
          font-family: var(--font-headline), "Newsreader", "Playfair Display", Georgia, serif;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          user-select: none;
        }

        .wordmark-dot {
          color: #ff6a00 !important;
          margin-left: 1px;
        }

        /* SIZE PRESETS */
        .startup-brief-wordmark.size-masthead {
          font-size: clamp(38px, 5.5vw, 68px);
        }

        .startup-brief-wordmark.size-header {
          font-size: 26px;
        }

        .startup-brief-wordmark.size-footer {
          font-size: 24px;
        }

        .startup-brief-wordmark.size-mobile {
          font-size: 22px;
        }
      `}</style>
    </div>
  );
}
