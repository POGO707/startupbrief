"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tickerItems = [
  { id: "t1", title: "OpenAI Launches GPT-5 with advanced reasoning capabilities", slug: "openai-gpt5-changes-everything" },
  { id: "t2", title: "Byju's founder files $533 million fraud case against founder", slug: "byjus-fraud-case" },
  { id: "t3", title: "India's EV startup Euler Motors raises $100M in Series C", slug: "euler-motors-series-c" },
  { id: "t4", title: "Anthropic Launches New Claude 4 AI Models for Enterprise", slug: "anthropic-claude-4-enterprise" },
  { id: "t5", title: "Google DeepMind Unveils Genie 3 World Model", slug: "google-deepmind-genie-3" },
];

export default function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tickerItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tickerItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="newspaper-ticker-bar" aria-label="Breaking news ticker">
      <div className="ticker-label">
        <span className="flash-icon">&⚡</span> BREAKING
      </div>

      <div className="ticker-viewport">
        <div className="ticker-track">
          {tickerItems.map((item, index) => (
            <div
              key={item.id}
              className={`ticker-item ${index === currentIndex ? "active" : ""}`}
            >
              <Link href={`/article/${item.slug}`} className="ticker-link">
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="ticker-controls">
        <button onClick={handlePrev} className="ticker-arrow-btn" aria-label="Previous headline">
          <ChevronLeft size={14} />
        </button>
        <button onClick={handleNext} className="ticker-arrow-btn" aria-label="Next headline">
          <ChevronRight size={14} />
        </button>
      </div>

      <style>{`
        .newspaper-ticker-bar {
          display: flex;
          align-items: center;
          background: #000;
          color: #fff;
          height: 38px;
          border-bottom: 1px solid var(--color-border-dark);
          overflow: hidden;
        }
        .ticker-label {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #000;
          color: #fff;
          padding: 0 16px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-right: 1px solid rgba(255,255,255,0.2);
          flex-shrink: 0;
          height: 100%;
        }
        .flash-icon {
          color: var(--color-primary);
          font-size: 14px;
        }
        .ticker-viewport {
          flex: 1;
          overflow: hidden;
          padding: 0 16px;
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .ticker-track {
          display: flex;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .ticker-item {
          position: absolute;
          left: 0;
          right: 0;
          opacity: 0;
          transform: translateY(10px);
          transition: all 300ms ease;
          pointer-events: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ticker-item.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .ticker-link {
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .ticker-link:hover {
          color: var(--color-primary);
        }
        .ticker-controls {
          display: flex;
          align-items: center;
          border-left: 1px solid rgba(255,255,255,0.2);
          height: 100%;
          flex-shrink: 0;
        }
        .ticker-arrow-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          width: 32px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 150ms ease;
        }
        .ticker-arrow-btn:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
