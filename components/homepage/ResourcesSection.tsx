import Link from "next/link";
import { FileText, Download, Code, Layers } from "lucide-react";

const resourcesList = [
  {
    title: "Series A Fundraising Pitch Deck Template (2026 Edition)",
    desc: "The exact 12-slide narrative structure used by top tech startups to raise $10M+ from Sequoia, Accel, and Benchmark.",
    category: "FUNDRAISING",
    icon: FileText,
    link: "/resources/pitch-deck-template",
  },
  {
    title: "AI Infrastructure Unit Economics Calculator",
    desc: "Financial model spreadsheet to calculate GPU inference costs, API margins, and token cost forecasting.",
    category: "FINANCE",
    icon: Download,
    link: "/resources/unit-economics-calculator",
  },
  {
    title: "Async Engineering Operating System Framework",
    desc: "Comprehensive playbook on asynchronous pull request workflows, documentation standards, and multi-timezone design.",
    category: "PLAYBOOK",
    icon: Layers,
    link: "/resources/async-operating-system",
  },
  {
    title: "SaaS Go-to-Market Playbook for Solo Builders",
    desc: "Step-by-step launch strategy from zero to 1,000 paying users using AI content engines and community channels.",
    category: "GROWTH",
    icon: Code,
    link: "/resources/gtm-playbook",
  },
];

export default function ResourcesSection() {
  return (
    <section className="newspaper-section-block" aria-label="Resources Section">
      <div className="section-header">
        <h2 className="section-header-title">RESOURCES & FOUNDER TOOLKITS</h2>
        <Link href="/resources" className="section-view-all-link">
          VIEW ALL RESOURCES &rarr;
        </Link>
      </div>

      <div className="resources-grid">
        {resourcesList.map((res) => {
          const IconComp = res.icon;
          return (
            <div key={res.link} className="resource-card">
              <div className="resource-icon-wrap">
                <IconComp size={22} color="#ff6a00" />
              </div>
              <div className="resource-info">
                <span className="card-orange-badge">{res.category}</span>
                <h3 className="resource-title">
                  <Link href={res.link}>{res.title}</Link>
                </h3>
                <p className="resource-desc">{res.desc}</p>
                <Link href={res.link} className="resource-dl-btn">
                  Access Resource &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .newspaper-section-block {
          width: 100%;
          margin-bottom: 40px;
        }
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .resource-card {
          display: flex;
          gap: 16px;
          border: 1px solid #e2e8f0;
          padding: 20px;
          background: #ffffff;
          align-items: start;
        }
        .resource-icon-wrap {
          width: 44px;
          height: 44px;
          background: #fff7ed;
          border: 1px solid #ffedd5;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .resource-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .card-orange-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          color: #ff6a00;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .resource-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .resource-title a { color: #0f172a; text-decoration: none; }
        .resource-title a:hover { color: #ff6a00; }
        .resource-desc {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #475569;
          line-height: 1.45;
          margin: 0;
        }
        .resource-dl-btn {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #ff6a00;
          text-decoration: none;
          margin-top: 4px;
        }
        .resource-dl-btn:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .resources-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
