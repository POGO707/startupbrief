import Link from "next/link";
import Image from "next/image";
import AdPlaceholder from "@/components/common/AdPlaceholder";

export interface TocItem {
  id: string;
  text: string;
}

export interface TagItem {
  id: string;
  name: string;
  slug: string;
}

interface LeftSidebarProps {
  toc?: TocItem[];
  tags?: TagItem[];
  showToc?: boolean;
}

export default function LeftSidebar({ toc = [], tags = [], showToc = false }: LeftSidebarProps) {
  return (
    <aside className="newspaper-left-sidebar" aria-label="Article Navigation and Ads">
      {/* ─── IN THIS ARTICLE (TOC) ─── */}
      {showToc && toc.length > 0 && (
        <div className="sidebar-block toc-block">
          <h2 className="sidebar-section-title">IN THIS ARTICLE</h2>
          <nav aria-label="Table of contents">
            <ol className="toc-list" role="list">
              {toc.map((item, index) => (
                <li key={item.id || index} className="toc-item">
                  <a href={`#${item.id}`} className="toc-link">
                    <span className="toc-num">{index + 1}.</span>
                    <span className="toc-text">{item.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}

      {/* ─── LEFT ADVERTISEMENT PLACEHOLDER ─── */}
      <AdPlaceholder format="300x250" />

      {/* ─── TAGS SECTION ─── */}
      {tags.length > 0 && (
        <div className="sidebar-block tags-block">
          <h2 className="sidebar-section-title">TAGS:</h2>
          <div className="tags-chips">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`} className="tag-chip">
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .newspaper-left-sidebar {
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: sticky;
          top: 80px;
        }
        .sidebar-block {
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .sidebar-block:last-child {
          border-bottom: none;
        }
        .sidebar-section-title {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
          margin-bottom: 14px;
          padding-bottom: 6px;
          border-bottom: 2px solid var(--color-text);
        }
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .toc-link {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-secondary);
          text-decoration: none;
          padding: 6px 0;
          transition: color 150ms ease;
          line-height: 1.35;
        }
        .toc-link:hover {
          color: var(--color-primary);
        }
        .toc-num {
          font-size: 12px;
          color: var(--color-muted);
          flex-shrink: 0;
        }
        .ad-header {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-muted);
          text-align: center;
          margin-bottom: 8px;
        }
        .ad-card {
          background: #000;
          color: #fff;
          padding: 24px 20px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .ad-brand-logo {
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.05em;
        }
        .ad-title {
          font-family: var(--font-headline);
          font-size: 18px;
          font-weight: 600;
          line-height: 1.25;
        }
        .ad-desc {
          font-family: var(--font-ui);
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          line-height: 1.45;
        }
        .ad-btn {
          display: inline-block;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 6px 14px;
          background: #fff;
          color: #000;
          text-decoration: none;
          border-radius: 2px;
          margin-top: 4px;
          transition: opacity 150ms ease;
        }
        .ad-btn:hover {
          opacity: 0.9;
        }
        .tags-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tag-chip {
          font-family: var(--font-ui);
          font-size: 11px;
          color: var(--color-text);
          background: #f4f4f5;
          border: 1px solid var(--color-border);
          padding: 4px 10px;
          border-radius: 2px;
          text-decoration: none;
          transition: all 150ms ease;
        }
        .tag-chip:hover {
          background: var(--color-text);
          color: #fff;
        }
      `}</style>
    </aside>
  );
}
