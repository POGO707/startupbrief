import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { fundingRounds } from "@/lib/data";

export default function FundingTracker() {
  return (
    <section className="funding-section section editorial-border-top" aria-label="Funding tracker">
      <div className="container">
        <div className="funding-inner">
          {/* ─── HEADER ─── */}
          <div className="funding-top">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <h2 className="section-header-title">Funding Tracker</h2>
            </div>
            <p className="funding-sub">Latest funding rounds across AI, startups, and technology.</p>
          </div>

          {/* ─── TOTAL STATS ─── */}
          <div className="funding-stats">
            <div className="funding-stat">
              <span className="funding-stat-value">$2.8B</span>
              <span className="funding-stat-label">Raised This Week</span>
            </div>
            <div className="funding-stat-divider" aria-hidden="true" />
            <div className="funding-stat">
              <span className="funding-stat-value">6</span>
              <span className="funding-stat-label">Major Rounds</span>
            </div>
            <div className="funding-stat-divider" aria-hidden="true" />
            <div className="funding-stat">
              <span className="funding-stat-value">4</span>
              <span className="funding-stat-label">Countries</span>
            </div>
          </div>

          {/* ─── TIMELINE ─── */}
          <div className="funding-timeline" role="list">
            {fundingRounds.map((round, i) => (
              <div key={round.id} className="funding-row" role="listitem">
                {/* Timeline indicator */}
                <div className="funding-timeline-col" aria-hidden="true">
                  <div className="funding-dot" />
                  {i < fundingRounds.length - 1 && (
                    <div className="funding-line" />
                  )}
                </div>

                {/* Content */}
                <div className="funding-content">
                  <div className="funding-date">{round.date}</div>
                  <div className="funding-card">
                    <div className="funding-card-left">
                      <div className="funding-company-info">
                        <h3 className="funding-company">{round.startup}</h3>
                        <span className="funding-country">{round.country}</span>
                      </div>
                      <div className="funding-investors">
                        <span className="funding-investors-label">Investors: </span>
                        {round.investors.join(", ")}
                      </div>
                    </div>
                    <div className="funding-card-right">
                      <div className="funding-stage-badge">
                        {round.stage}
                      </div>
                      <div className="funding-amount">
                        <TrendingUp size={16} className="funding-amount-icon" />
                        {round.amount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="funding-footer">
            <Link href="/funding" className="btn" style={{ fontSize: "11px" }}>
              See All Funding Rounds <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .funding-section {
          background: var(--color-bg);
        }
        .funding-inner {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .funding-top {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .funding-sub {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
        }
        .funding-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 24px 0;
          border-top: 1px solid var(--color-border-dark);
          border-bottom: 1px solid var(--color-border-dark);
        }
        .funding-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .funding-stat-value {
          font-family: var(--font-headline);
          font-size: 36px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--color-text);
          line-height: 1;
        }
        .funding-stat-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .funding-stat-divider {
          width: 1px;
          height: 48px;
          background: var(--color-border);
        }

        /* ─── TIMELINE ─── */
        .funding-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .funding-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0;
          align-items: start;
        }
        .funding-timeline-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 24px;
          position: relative;
          height: 100%;
        }
        .funding-dot {
          width: 8px;
          height: 8px;
          border-radius: 0;
          background: var(--color-text);
          flex-shrink: 0;
          z-index: 1;
        }
        .funding-line {
          width: 1px;
          flex: 1;
          background: var(--color-border);
          margin-top: 8px;
          min-height: 24px;
        }
        .funding-content {
          padding: 16px 0 16px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .funding-row:last-child .funding-content {
          border-bottom: none;
        }
        .funding-date {
          font-family: var(--font-ui);
          font-size: 11px;
          color: var(--color-secondary);
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .funding-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0;
          background: transparent;
        }
        .funding-card-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .funding-company-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .funding-company {
          font-family: var(--font-headline);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--color-text);
        }
        .funding-country {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .funding-investors {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          line-height: 1.4;
        }
        .funding-investors-label {
          font-weight: 700;
          color: var(--color-text);
        }
        .funding-card-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          flex-shrink: 0;
        }
        .funding-stage-badge {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
          border-bottom: 1px solid var(--color-text);
        }
        .funding-amount {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-headline);
          font-size: 28px;
          font-weight: 500;
          color: var(--color-text);
          white-space: nowrap;
        }
        .funding-amount-icon {
          color: var(--color-text);
          flex-shrink: 0;
        }
        .funding-footer {
          display: flex;
          justify-content: flex-start;
          padding-top: 16px;
        }

        @media (max-width: 768px) {
          .funding-row {
            grid-template-columns: 44px 1fr;
          }
          .funding-date {
            font-size: 10px;
          }
          .funding-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .funding-card-right {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          .funding-stats {
            flex-wrap: wrap;
            gap: 24px;
          }
          .funding-stat-divider {
            display: none;
          }
        }
        @media (max-width: 414px) {
          .funding-row {
            grid-template-columns: 28px 1fr;
          }
          .funding-company {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}
