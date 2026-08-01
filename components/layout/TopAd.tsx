import Link from "next/link";

export default function TopAd() {
  return (
    <div className="top-ad-wrapper">
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <div className="top-ad-container">
          <span className="ad-label">Advertisement</span>
          <Link href="/newsletter" className="top-ad-banner img-hover">
            <div className="top-ad-content">
              <h2 className="top-ad-title">STARTUP BRIEF</h2>
              <div className="top-ad-bullets">
                <span>LEARN AI</span>
                <span className="ad-dot" />
                <span>BUILD STARTUPS</span>
                <span className="ad-dot" />
                <span>READ DAILY</span>
              </div>
              <div className="top-ad-cta">JOIN NEWSLETTER</div>
            </div>
          </Link>
        </div>
      </div>
      <style>{`
        .top-ad-wrapper {
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          padding: 16px 0 24px;
          text-align: center;
        }
        .top-ad-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          width: 100%;
          max-width: 970px;
        }
        .ad-label {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-muted);
          align-self: flex-start;
          margin-left: 2px;
        }
        .top-ad-banner {
          display: flex;
          width: 100%;
          max-width: 970px;
          height: 250px;
          background: var(--color-text);
          color: var(--color-bg);
          text-decoration: none;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid var(--color-border-dark);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .top-ad-banner:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .top-ad-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .top-ad-title {
          font-family: var(--font-headline);
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .top-ad-bullets {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-ui);
          font-size: clamp(12px, 2vw, 16px);
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--color-primary);
        }
        .ad-dot {
          width: 4px;
          height: 4px;
          background: var(--color-bg);
          border-radius: 50%;
        }
        .top-ad-cta {
          margin-top: 8px;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 24px;
          transition: background 150ms ease, color 150ms ease;
        }
        .top-ad-banner:hover .top-ad-cta {
          background: var(--color-primary);
          color: var(--color-bg);
        }
        @media (max-width: 768px) {
          .top-ad-banner {
            height: auto;
            padding: 32px 16px;
          }
          .top-ad-bullets {
            flex-direction: column;
            gap: 8px;
          }
          .ad-dot {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
