import React from "react";

interface AdPlaceholderProps {
  format?: "728x90" | "300x250" | "responsive";
  className?: string;
}

export default function AdPlaceholder({
  format = "728x90",
  className = "",
}: AdPlaceholderProps) {
  const isSidebar = format === "300x250";

  return (
    <div
      className={`ad-placeholder-box ${format} ${className}`}
      aria-label="Google AdSense Placeholder"
    >
      <div className="ad-placeholder-content">
        <span className="ad-label">ADVERTISEMENT</span>
        <h4 className="ad-title">Google AdSense Placeholder</h4>
        <span className="ad-dimension">
          {format === "728x90" ? "728 × 90" : format === "300x250" ? "300 × 250" : "Responsive Ad Unit"}
        </span>
        <p className="ad-subtext">
          This space is reserved for Google AdSense. Ads will appear after approval.
        </p>
      </div>

      <style>{`
        .ad-placeholder-box {
          width: 100%;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 20px;
          margin-block: 24px;
          text-align: center;
          font-family: var(--font-ui), system-ui, sans-serif;
          border-radius: 2px;
        }
        .ad-placeholder-box.728x90 {
          min-height: 110px;
        }
        .ad-placeholder-box.300x250 {
          min-height: 250px;
        }
        .ad-placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          max-width: 500px;
        }
        .ad-label {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #94a3b8;
          text-transform: uppercase;
        }
        .ad-title {
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .ad-dimension {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #ff6a00;
          background: rgba(255, 106, 0, 0.08);
          padding: 2px 8px;
          border-radius: 2px;
        }
        .ad-subtext {
          font-size: 11px;
          color: #64748b;
          margin: 0;
          line-height: 1.35;
        }
      `}</style>
    </div>
  );
}
