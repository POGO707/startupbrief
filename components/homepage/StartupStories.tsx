import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { startupArticles } from "@/lib/data";

export default function StartupStories() {
  const [a, b, c, d, e] = startupArticles;

  return (
    <section className="startup-section section" aria-label="Startup stories">
      <div className="container">
        <div className="section-header">
          <span className="section-header-accent" aria-hidden="true" />
          <h2 className="section-header-title">Startup Stories</h2>
          <Link href="/startups" className="section-header-link">
            All Startups <ArrowRight size={12} />
          </Link>
        </div>

        {/* ─── MASONRY-STYLE EDITORIAL GRID ─── */}
        <div className="startup-masonry">
          {/* Row 1: large + two medium */}
          <div className="startup-row-1">
            <article className="startup-card-xl">
              <div className="startup-card-xl-img img-hover">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="su-img"
                />
              </div>
              <div className="startup-card-xl-body">
                <Link href={`/article/${a.slug}`} className="badge">
                  {a.category}
                </Link>
                <h3 className="su-xl-title">
                  <Link href={`/article/${a.slug}`} className="link-headline">
                    {a.title}
                  </Link>
                </h3>
                <p className="su-xl-excerpt">{a.excerpt}</p>
                <div className="article-meta" style={{ marginTop: 12 }}>
                  <span className="meta-text">{a.author}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{a.publishedAt}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{a.readingTime} min read</span>
                </div>
              </div>
            </article>

            <div className="startup-col-right">
              {[b, c].map((article) => (
                <article key={article.id} className="startup-card-md">
                  <div className="startup-card-md-img img-hover">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="su-img"
                    />
                  </div>
                  <div className="startup-card-md-body">
                    <Link href={`/article/${article.slug}`} className="badge">
                      {article.category}
                    </Link>
                    <h3 className="su-md-title">
                      <Link href={`/article/${article.slug}`} className="link-headline">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="su-md-excerpt">{article.excerpt}</p>
                    <div className="article-meta" style={{ marginTop: 8 }}>
                      <span className="meta-text">{article.author}</span>
                      <span className="meta-dot" aria-hidden="true" />
                      <span className="meta-text">{article.readingTime} min</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Horizontal divider */}
          <div className="su-divider" aria-hidden="true" />

          {/* Row 2: 3 horizontal compact cards */}
          <div className="startup-row-2">
            {[d, e, ...startupArticles.slice(0, 1)].map((article) => (
              <article key={article.id + "r2"} className="startup-card-sm">
                <div className="startup-card-sm-img img-hover">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="su-img"
                  />
                </div>
                <div className="startup-card-sm-body">
                  <Link href={`/article/${article.slug}`} className="badge">
                    {article.category}
                  </Link>
                  <h3 className="su-sm-title">
                    <Link href={`/article/${article.slug}`} className="link-headline">
                      {article.title}
                    </Link>
                  </h3>
                  <div className="article-meta" style={{ marginTop: 8 }}>
                    <span className="meta-text">{article.author}</span>
                    <span className="meta-dot" aria-hidden="true" />
                    <span className="meta-text">{article.readingTime} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ─── ROW 1 ─── */
        .startup-row-1 {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .startup-card-xl {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .startup-card-xl-img {
          position: relative;
          width: 100%;
          height: 360px;
          margin-bottom: 20px;
        }
        .su-img {
          object-fit: cover;
        }
        .startup-card-xl-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .su-xl-title {
          font-family: var(--font-headline);
          font-size: clamp(20px, 2vw, 28px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 600;
        }
        .su-xl-excerpt {
          font-family: var(--font-ui);
          font-size: 14px;
          color: var(--color-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .startup-col-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-left: 1px solid var(--color-border);
          padding-left: 32px;
        }
        .startup-card-md {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .startup-card-md:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .startup-card-md-img {
          position: relative;
          width: 100%;
          height: 150px;
        }
        .startup-card-md-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .su-md-title {
          font-family: var(--font-headline);
          font-size: 17px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 600;
        }
        .su-md-excerpt {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ─── DIVIDER ─── */
        .su-divider {
          height: 1px;
          background: var(--color-border);
          margin: 32px 0;
        }

        /* ─── ROW 2 ─── */
        .startup-row-2 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .startup-card-sm {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .startup-card-sm-img {
          position: relative;
          width: 100%;
          height: 180px;
        }
        .startup-card-sm-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .su-sm-title {
          font-family: var(--font-headline);
          font-size: 16px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .startup-row-1 {
            grid-template-columns: 1fr;
          }
          .startup-col-right {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--color-border);
            padding-top: 24px;
            flex-direction: row;
            gap: 24px;
          }
          .startup-card-md {
            flex: 1;
          }
          .startup-row-2 {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .startup-col-right {
            flex-direction: column;
          }
          .startup-row-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
