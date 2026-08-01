import Link from "next/link";
import { Zap } from "lucide-react";

const marketData = [
  { text: "NVDA ▲ +2.31%", type: "positive" },
  { text: "AAPL ▼ -0.42%", type: "negative" },
  { text: "MSFT ▲ +1.18%", type: "positive" },
  { text: "GOOGL ▲ +0.71%", type: "positive" },
  { text: "META ▼ -0.29%", type: "negative" },
  { text: "OpenAI raises $XXB", type: "neutral" },
  { text: "Anthropic launches new model", type: "neutral" },
  { text: "Perplexity AI expands globally", type: "neutral" },
  { text: "Stripe acquires ...", type: "neutral" },
  { text: "Figma IPO ...", type: "neutral" },
  { text: "Cursor AI ...", type: "neutral" },
  { text: "Lovable ...", type: "neutral" },
  { text: "Windsurf ...", type: "neutral" },
];

export default function BreakingNewsTicker() {
  return (
    <div className="ticker-wrapper" aria-label="Live Market News Ticker">
      <div className="ticker-label">
        <Zap size={14} className="ticker-icon" />
        <span>MARKET LIVE</span>
      </div>
      <div className="ticker-content">
        <div className="ticker-track">
          {/* Double the array for seamless infinite scroll */}
          {[...marketData, ...marketData].map((item, i) => (
            <div key={i} className="ticker-item">
              <span className={`ticker-text ${item.type}`}>
                {item.text}
              </span>
              <span className="ticker-separator" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-wrapper {
          display: flex;
          align-items: stretch;
          background: var(--color-bg);
          border-bottom: 2px solid var(--color-text);
          height: 40px;
          overflow: hidden;
        }
        .ticker-label {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--color-text);
          color: var(--color-bg);
          padding: 0 16px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          flex-shrink: 0;
          z-index: 10;
        }
        .ticker-icon {
          color: var(--color-primary);
        }
        .ticker-content {
          flex: 1;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
        }
        .ticker-content::before,
        .ticker-content::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 32px;
          z-index: 2;
          pointer-events: none;
        }
        .ticker-content::before {
          left: 0;
          background: linear-gradient(to right, var(--color-bg), transparent);
        }
        .ticker-content::after {
          right: 0;
          background: linear-gradient(to left, var(--color-bg), transparent);
        }
        .ticker-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: ticker-scroll 35s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          padding: 0 16px;
        }
        .ticker-text {
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
        }
        .ticker-text.positive {
          color: #10b981; /* Green */
        }
        .ticker-text.negative {
          color: #ef4444; /* Red */
        }
        .ticker-text.neutral {
          color: var(--color-text);
        }
        .ticker-separator {
          display: inline-block;
          width: 4px;
          height: 4px;
          background: var(--color-border-dark);
          margin-left: 32px;
        }
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 640px) {
          .ticker-label span {
            display: none;
          }
          .ticker-label {
            padding: 0 12px;
          }
          .ticker-item {
            padding: 0 12px;
          }
        }
      `}</style>
    </div>
  );
}
