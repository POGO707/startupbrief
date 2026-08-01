import Link from "next/link";
import Image from "next/image";
import { topPicksArticles } from "@/lib/data";

export default function TopStories() {
  const [lead, card2, card3, card4] = topPicksArticles;

  return (
    <section className="top-stories-section section editorial-border-top" aria-label="Top Stories">
      <div className="container">
        {/* NEWSPAPER SECTION HEADER */}
        <div className="section-header">
          <h2 className="section-header-title">TOP STORIES</h2>
        </div>

        <div className="ts-newspaper-grid">
          {/* ─── LEFT: LEAD STORY (SPAN 2 COLUMNS) ─── */}
          <article className="ts-lead-article">
            <Link href={`/article/${lead.slug}`} className="ts-lead-link">
              <div className="ts-lead-img img-hover">
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="ts-img"
                  priority
                />
              </div>
              <div className="ts-lead-body">
                <span className="badge">{lead.category}</span>
                <h3 className="headline-hero link-headline">{lead.title}</h3>
                <p className="body-lg">{lead.excerpt}</p>
                <div className="article-meta">
                  <span className="meta-text" style={{ color: "var(--color-text)" }}>{lead.author}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{lead.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </article>

          {/* ─── RIGHT: 3 SECONDARY STORIES (1 COLUMN STACKED) ─── */}
          <div className="ts-secondary-column">
            {[card2, card3, card4].map((article) => (
              <article key={article.id} className="ts-sub-article">
                <Link href={`/article/${article.slug}`} className="ts-sub-link">
                  <div className="ts-sub-body">
                    <span className="badge">{article.category}</span>
                    <h4 className="headline-card link-headline">{article.title}</h4>
                    <p className="body-sm" style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {article.excerpt}
                    </p>
                    <div className="article-meta">
                      <span className="meta-text">{article.author}</span>
                    </div>
                  </div>
                  <div className="ts-sub-img img-hover">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="ts-img"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .top-stories-section {
          background: var(--color-bg);
        }
        
        .ts-newspaper-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
        }

        /* LEAD STORY */
        .ts-lead-article {
          padding-right: 32px;
          border-right: 1px solid var(--color-border-dark);
        }
        .ts-lead-link {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .ts-lead-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border: 1px solid var(--color-border);
        }
        .ts-img {
          object-fit: cover;
        }
        .ts-lead-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        
        /* SECONDARY COLUMN */
        .ts-secondary-column {
          display: flex;
          flex-direction: column;
        }
        .ts-sub-article {
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .ts-sub-article:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }
        .ts-sub-link {
          display: grid;
          grid-template-columns: 1fr 100px;
          gap: 16px;
          align-items: start;
        }
        .ts-sub-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
        .ts-sub-img {
          position: relative;
          width: 100px;
          aspect-ratio: 1/1;
          border: 1px solid var(--color-border);
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .ts-newspaper-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .ts-lead-article {
            padding-right: 0;
            border-right: none;
            padding-bottom: 40px;
            border-bottom: 2px solid var(--color-border-dark);
          }
          .ts-sub-link {
            grid-template-columns: 1fr 120px;
          }
          .ts-sub-img {
            width: 120px;
          }
        }
        @media (max-width: 640px) {
          .ts-sub-link {
            grid-template-columns: 1fr;
          }
          .ts-sub-img {
            width: 100%;
            aspect-ratio: 16/9;
          }
        }
      `}</style>
    </section>
  );
}
