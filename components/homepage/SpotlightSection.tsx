import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";

export default async function SpotlightSection() {
  const articles = await getPublishedArticles({ take: 4, skip: 2 });
  const spotlightArticles = articles.length >= 4 ? articles : (await getPublishedArticles({ take: 4 }));
  return (
    <section className="spotlight-section section editorial-border-top" aria-label="Editorial Spotlight">
      <div className="container">
        <div className="spotlight-layout">
          {/* ─── LEFT: ROTATED VERTICAL TITLE WITH ACCENT ─── */}
          <div className="spotlight-left">
            <div className="spotlight-title-sticky">
              <span className="spotlight-badge-label">
                Magazine Edition
              </span>
              <h2 className="spotlight-vertical-title">
                SPOT<span className="text-orange">L</span>IGHT
              </h2>
            </div>
          </div>

          {/* ─── RIGHT: 4 EDITORIAL MAGAZINE CARDS IN A GRID ─── */}
          <div className="spotlight-right-grid">
            {spotlightArticles.map((article, index) => (
              <article key={article.id} className="spotlight-card">
                <div className="spotlight-card-header">
                  <span className="spotlight-num">0{index + 1}</span>
                  <span className="badge">{article.category}</span>
                </div>
                <Link href={`/article/${article.slug}`} className="spotlight-img-link">
                  <div className="spotlight-img-wrapper img-hover">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="spotlight-img"
                    />
                  </div>
                </Link>
                <div className="spotlight-card-body">
                  <h3 className="spotlight-title link-headline">
                    <Link href={`/article/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="spotlight-excerpt">{article.excerpt}</p>
                  <div className="spotlight-card-footer">
                    <div className="article-meta">
                      <span className="meta-text" style={{ color: "var(--color-text)" }}>
                        {article.author}
                      </span>
                      <span className="meta-dot" aria-hidden="true" />
                      <span className="meta-text">{article.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .spotlight-section {
          background: var(--color-bg);
          padding-block: clamp(48px, 6vw, 80px);
        }
        .spotlight-layout {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ─── LEFT VERTICAL TITLE ─── */
        .spotlight-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          border-right: 1px solid var(--color-border-dark);
          padding-right: 32px;
        }
        .spotlight-title-sticky {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .spotlight-badge-label {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
          white-space: nowrap;
          transform: rotate(180deg);
          writing-mode: vertical-lr;
        }
        .spotlight-vertical-title {
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          font-family: var(--font-headline);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text);
          line-height: 1;
          margin: 0;
          user-select: none;
        }
        .text-orange {
          color: var(--color-primary);
        }

        /* ─── RIGHT EDITORIAL GRID (4-COLUMN) ─── */
        .spotlight-right-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .spotlight-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-right: 1px solid var(--color-border);
          padding-right: 24px;
        }
        .spotlight-card:last-child {
          border-right: none;
          padding-right: 0;
        }
        .spotlight-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .spotlight-num {
          font-family: var(--font-headline);
          font-size: 20px;
          font-weight: 500;
          color: var(--color-text);
        }
        .spotlight-img-link {
          display: block;
        }
        .spotlight-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .spotlight-img {
          object-fit: cover;
        }
        .spotlight-card-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .spotlight-title {
          font-family: var(--font-headline);
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 500;
          /* Max 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .spotlight-title a {
          text-decoration: none;
        }
        .spotlight-excerpt {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          line-height: 1.5;
          /* Max 2 lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .spotlight-card-footer {
          margin-top: auto;
          padding-top: 8px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1280px) {
          .spotlight-right-grid {
            gap: 24px;
          }
          .spotlight-card {
            padding-right: 16px;
          }
        }
        @media (max-width: 1024px) {
          .spotlight-layout {
            grid-template-columns: 60px 1fr;
            gap: 32px;
          }
          .spotlight-right-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .spotlight-card {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 24px;
          }
        }
        @media (max-width: 768px) {
          .spotlight-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .spotlight-left {
            border-right: none;
            border-bottom: 2px solid var(--color-text);
            padding-right: 0;
            padding-bottom: 16px;
            align-items: flex-start;
          }
          .spotlight-title-sticky {
            position: relative;
            top: 0;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          .spotlight-badge-label {
            transform: none;
            writing-mode: horizontal-tb;
          }
          .spotlight-vertical-title {
            writing-mode: horizontal-tb;
            transform: none;
            font-size: 32px;
          }
          .spotlight-right-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
