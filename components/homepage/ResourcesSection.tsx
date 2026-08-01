import Link from "next/link";
import { ArrowRight, FileText, BarChart2, Map, CheckSquare, Zap, TrendingUp, Download } from "lucide-react";
import { resources } from "@/lib/data";

const typeLabels: Record<string, string> = {
  template: "Template",
  guide: "Guide",
  checklist: "Checklist",
  tool: "Directory",
  download: "Download",
};

export default function ResourcesSection() {
  return (
    <section className="resources-section section editorial-border-top" aria-label="Resources">
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-title">Free Resources</h2>
        </div>

        <div className="resources-intro">
          <p>
            Free templates, guides, checklists, and tools built for founders, operators, and builders.
            Download instantly — no email required.
          </p>
        </div>

        <div className="resources-grid">
          {resources.map((resource) => (
            <article key={resource.id} className="resource-card">
              <div className="resource-type">
                <span className="badge">
                  {typeLabels[resource.type] ?? resource.type}
                </span>
                {resource.free && (
                  <span className="resource-free-badge">Free</span>
                )}
              </div>
              <h3 className="resource-title link-headline">
                <Link href={`/resources/${resource.slug}`}>
                  {resource.title}
                </Link>
              </h3>
              <p className="resource-desc">{resource.description}</p>
              <a
                href={resource.downloadUrl}
                className="resource-download-btn"
                aria-label={`Download ${resource.title}`}
              >
                Download Free <Download size={13} style={{ marginLeft: 4 }} />
              </a>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .resources-section {
          background: var(--color-bg);
        }
        .resources-intro {
          margin-bottom: 32px;
        }
        .resources-intro p {
          font-family: var(--font-ui);
          font-size: 15px;
          color: var(--color-secondary);
          line-height: 1.6;
          max-width: 600px;
        }
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .resource-card {
          border: 1px solid var(--color-border);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .resource-type {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .resource-free-badge {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid var(--color-text);
          color: var(--color-text);
          padding: 2px 7px;
        }
        .resource-title {
          font-family: var(--font-headline);
          font-size: 22px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 500;
        }
        .resource-title a {
          text-decoration: none;
        }
        .resource-desc {
          font-family: var(--font-ui);
          font-size: 14px;
          color: var(--color-secondary);
          line-height: 1.6;
          flex: 1;
        }
        .resource-download-btn {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          border-top: 1px solid var(--color-border);
          padding-top: 16px;
          margin-top: 16px;
          transition: color 150ms ease;
        }
        .resource-download-btn:hover {
          color: var(--color-primary);
        }

        @media (max-width: 900px) {
          .resources-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .resources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
