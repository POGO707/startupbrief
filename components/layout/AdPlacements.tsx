import Link from "next/link";

export function MiddleAd() {
  return (
    <div className="section" style={{ paddingBlock: "32px", display: "flex", justifyContent: "center" }}>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 728 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-muted)", alignSelf: "flex-start", marginLeft: 2 }}>Advertisement</span>
          <Link href="/newsletter" className="middle-ad-banner img-hover">
            <div className="middle-ad-content">
              <span className="middle-ad-title">STARTUP BRIEF PRO</span>
              <span className="middle-ad-divider" />
              <span className="middle-ad-subtitle">The daily intelligence briefing for founders.</span>
            </div>
          </Link>
        </div>
      </div>
      <style>{`
        .middle-ad-banner {
          display: flex;
          width: 100%;
          max-width: 728px;
          height: 90px;
          background: var(--color-bg);
          color: var(--color-text);
          text-decoration: none;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid var(--color-border-dark);
          transition: background 150ms ease, color 150ms ease;
        }
        .middle-ad-banner:hover {
          background: var(--color-text);
          color: var(--color-bg);
        }
        .middle-ad-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .middle-ad-title {
          font-family: var(--font-headline);
          font-size: 16px;
          font-weight: 600;
        }
        .middle-ad-subtitle {
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 500;
        }
        .middle-ad-divider {
          width: 4px;
          height: 4px;
          background: var(--color-primary);
        }
        @media (max-width: 640px) {
          .middle-ad-banner {
            height: auto;
            padding: 16px;
          }
          .middle-ad-content {
            flex-direction: column;
            gap: 4px;
            text-align: center;
          }
          .middle-ad-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export function BottomAd() {
  return (
    <div className="section" style={{ paddingBlock: "48px", display: "flex", justifyContent: "center" }}>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 1024 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-muted)", alignSelf: "flex-start", marginLeft: 2 }}>Advertisement</span>
          <Link href="/newsletter" className="bottom-ad-banner img-hover">
            <div className="bottom-ad-content">
              <div className="bottom-ad-left">
                <h2 className="bottom-ad-title">Upgrade Your Inbox</h2>
                <p className="bottom-ad-desc">Join 100,000+ founders getting the latest on AI, startups, and tech.</p>
              </div>
              <div className="bottom-ad-right">
                <div className="bottom-ad-cta">SUBSCRIBE NOW</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <style>{`
        .bottom-ad-banner {
          display: flex;
          width: 100%;
          background: var(--color-text);
          color: var(--color-bg);
          text-decoration: none;
          align-items: center;
          justify-content: space-between;
          padding: 32px 48px;
          position: relative;
          border: 1px solid var(--color-border-dark);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .bottom-ad-banner:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .bottom-ad-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .bottom-ad-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bottom-ad-title {
          font-family: var(--font-headline);
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .bottom-ad-desc {
          font-family: var(--font-ui);
          font-size: clamp(14px, 2vw, 16px);
          color: var(--color-bg);
          opacity: 0.8;
        }
        .bottom-ad-cta {
          background: var(--color-primary);
          color: var(--color-bg);
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 24px;
          transition: filter 150ms ease;
        }
        .bottom-ad-banner:hover .bottom-ad-cta {
          filter: brightness(1.1);
        }
        @media (max-width: 768px) {
          .bottom-ad-banner {
            flex-direction: column;
            padding: 32px 24px;
          }
          .bottom-ad-content {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }
          .bottom-ad-left {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
