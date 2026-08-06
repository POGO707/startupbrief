import { ReactNode } from "react";

interface ThreeColumnLayoutProps {
  leftColumn?: ReactNode;
  mainContent: ReactNode;
  rightColumn?: ReactNode;
}

export default function ThreeColumnLayout({
  leftColumn,
  mainContent,
  rightColumn,
}: ThreeColumnLayoutProps) {
  return (
    <div className="newspaper-3col-container">
      {leftColumn && <div className="newspaper-left-col">{leftColumn}</div>}
      <div className={`newspaper-center-col ${!leftColumn ? "no-left" : ""}`}>
        {mainContent}
      </div>
      {rightColumn && <div className="newspaper-right-col">{rightColumn}</div>}

      <style>{`
        .newspaper-3col-container {
          max-width: 1380px;
          margin-inline: auto;
          padding-inline: clamp(16px, 3vw, 32px);
          display: grid;
          grid-template-columns: 240px 1fr 300px;
          gap: 36px;
          align-items: start;
          padding-block: 32px 64px;
        }
        @media (max-width: 1200px) {
          .newspaper-3col-container {
            grid-template-columns: 200px 1fr 280px;
            gap: 24px;
          }
        }
        @media (max-width: 992px) {
          .newspaper-3col-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .newspaper-left-col, .newspaper-right-col {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
