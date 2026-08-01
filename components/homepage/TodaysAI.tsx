import Link from "next/link";
import Image from "next/image";
import { aiArticles } from "@/lib/data";

export default function TodaysAI() {
  const [featured, ...rest] = aiArticles;

  return (
    <section className="todays-ai section editorial-border-top" aria-label="Today's AI news">
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-title">Today&rsquo;s AI</h2>
        </div>

        <div className="ai-editorial-layout">
          {/* ─── LEFT: FEATURED ─── */}
          <article className="ai-featured">
            <Link href={`/article/${featured.slug}`} className="ai-featured-link">
              <div className="ai-featured-img img-hover">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="ai-img"
                />
              </div>
              <div className="ai-featured-body">
                <span className="badge">{featured.category}</span>
                <h3 className="headline-hero link-headline">{featured.title}</h3>
                <p className="body-lg">{featured.excerpt}</p>
                <div className="article-meta" style={{ marginTop: 12 }}>
                  <span className="meta-text" style={{ color: "var(--color-text)" }}>
                    By {featured.author}
                  </span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{featured.publishedAt}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{featured.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </article>

          {/* ─── RIGHT: EDITORIAL UPDATES ─── */}
          <div className="ai-updates">
            {rest.map((article, i) => (
              <article key={article.id} className="ai-card">
                <Link href={`/article/${article.slug}`} className="ai-card-link">
                  <div className="ai-card-body">
                    <span className="badge">{article.category}</span>
                    <h4 className="headline-card link-headline">{article.title}</h4>
                    <p className="body-sm" style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {article.excerpt}
                    </p>
                    <div className="article-meta">
                      <span className="meta-text">{article.author}</span>
                      <span className="meta-dot" aria-hidden="true" />
                      <span className="meta-text">{article.readingTime} min</span>
                    </div>
                  </div>
                  {i === 0 && (
                    <div className="ai-card-img img-hover">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 20vw"
                        className="ai-img"
                      />
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .todays-ai {
          background: var(--color-bg);
        }
        .ai-editorial-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ─── FEATURED ─── */
        .ai-featured {
          border-right: 1px solid var(--color-border-dark);
          padding-right: 40px;
        }
        .ai-featured-link {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .ai-featured-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border: 1px solid var(--color-border);
        }
        .ai-img {
          object-fit: cover;
        }
        .ai-featured-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        /* ─── RIGHT UPDATES ─── */
        .ai-updates {
          display: flex;
          flex-direction: column;
        }
        .ai-card {
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .ai-card:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }
        .ai-card-link {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .ai-card:first-child .ai-card-link {
          grid-template-columns: 1fr 100px;
        }
        .ai-card-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
        .ai-card-img {
          position: relative;
          width: 100px;
          aspect-ratio: 1/1;
          border: 1px solid var(--color-border);
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .ai-editorial-layout {
            grid-template-columns: 1fr;
          }
          .ai-featured {
            border-right: none;
            padding-right: 0;
            border-bottom: 2px solid var(--color-border-dark);
            padding-bottom: 32px;
          }
        }
        @media (max-width: 640px) {
          .ai-card:first-child .ai-card-link {
            grid-template-columns: 1fr;
          }
          .ai-card-img {
            width: 100%;
            aspect-ratio: 16/9;
          }
        }
      `}</style>
    </section>
  );
}
