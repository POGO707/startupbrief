"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { topTools } from "@/lib/data";

export default function TopAITools() {
  return (
    <section className="tools-section section" aria-label="Top AI Tools">
      <div className="container">
        <div className="section-header">
          <span className="section-header-accent" aria-hidden="true" />
          <h2 className="section-header-title">Top AI Tools</h2>
          <Link href="/tools" className="section-header-link">
            View All Tools <ArrowRight size={12} />
          </Link>
        </div>

        <div className="tools-carousel" role="list">
          {topTools.map((tool) => (
            <article key={tool.id} className="tool-card" role="listitem">
              <div className="tool-card-top">
                <div className="tool-logo-wrap">
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={48}
                    height={48}
                    className="tool-logo"
                  />
                </div>
                <span
                  className={`tool-pricing-badge tool-pricing-${tool.pricingType}`}
                >
                  {tool.pricing}
                </span>
              </div>

              <div className="tool-card-body">
                <span className="tool-category">{tool.category}</span>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-tagline">{tool.tagline}</p>
                <p className="tool-desc">{tool.description}</p>
              </div>

              <Link href={`/tools/${tool.slug}`} className="tool-view-btn">
                View Tool <ExternalLink size={11} />
              </Link>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .tools-section {
          background: var(--color-text);
          border-top: none;
        }
        .tools-section .section-header {
          border-bottom-color: rgba(255,255,255,0.15);
        }
        .tools-section .section-header-title {
          color: #fff;
        }
        .tools-section .section-header-link {
          color: rgba(255,255,255,0.5);
        }
        .tools-section .section-header-link:hover {
          color: var(--color-primary);
        }
        .tools-carousel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
          overflow-x: auto;
        }
        .tool-card {
          background: #181818;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: background 200ms ease;
          cursor: pointer;
        }
        .tool-card:hover {
          background: #1f1f1f;
        }
        .tool-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .tool-logo-wrap {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .tool-logo {
          width: 48px;
          height: 48px;
          object-fit: cover;
        }
        .tool-pricing-badge {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 2px;
        }
        .tool-pricing-free {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }
        .tool-pricing-freemium {
          background: rgba(251, 146, 60, 0.15);
          color: #fb923c;
        }
        .tool-pricing-paid {
          background: rgba(167, 139, 250, 0.15);
          color: #a78bfa;
        }
        .tool-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .tool-category {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 4px;
        }
        .tool-name {
          font-family: var(--font-headline);
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.2;
        }
        .tool-tagline {
          font-family: var(--font-ui);
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          font-weight: 400;
          margin-bottom: 8px;
          font-style: italic;
        }
        .tool-desc {
          font-family: var(--font-ui);
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .tool-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 14px;
          margin-top: 16px;
          transition: color 150ms ease;
        }
        .tool-view-btn:hover {
          color: var(--color-primary);
        }

        @media (max-width: 1100px) {
          .tools-carousel {
            grid-template-columns: repeat(4, minmax(220px, 1fr));
          }
        }
        @media (max-width: 768px) {
          .tools-carousel {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .tools-carousel {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
