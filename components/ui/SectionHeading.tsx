export function SectionHeading({ normalText, highlightText }: { normalText: string, highlightText: string }) {
  return (
    <div className="editorial-section-header">
      <h2 className="editorial-section-title">
        {normalText} <span className="story-highlight">{highlightText}</span>
      </h2>
      <style>{`
        .editorial-section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 32px;
          position: relative;
        }
        .editorial-section-title {
          font-family: var(--font-headline);
          font-size: clamp(32px, 5vw, 64px);
          line-height: 1.1;
          font-weight: 600;
          letter-spacing: -0.04em;
          color: var(--color-text);
          text-transform: uppercase;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          white-space: nowrap;
          gap: 12px;
        }
        .story-highlight {
          position: relative;
          display: inline-block;
          color: var(--color-bg);
          background: var(--color-primary);
          padding: 6px 16px;
          clip-path: polygon(2% 4%, 97% 1%, 99% 95%, 96% 99%, 3% 97%, 1% 94%);
          transform: rotate(-2deg);
        }
        @media (max-width: 414px) {
          .editorial-section-title {
            font-size: 32px;
            gap: 8px;
          }
          .story-highlight {
            padding: 4px 12px;
          }
        }
      `}</style>
    </div>
  );
}
