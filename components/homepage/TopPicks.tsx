import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { topPicksArticles } from "@/lib/data";

export default function TopPicks() {
  const [featured, ...rest] = topPicksArticles;

  return (
    <section className="top-picks section" aria-label="Top picks">
      <div className="container">
        <div className="section-header">
          <span className="section-header-accent" aria-hidden="true" />
          <h2 className="section-header-title">Top Picks</h2>
          <Link href="/top-picks" className="section-header-link">
            All Stories <ArrowRight size={12} />
          </Link>
        </div>

        <div className="top-picks-grid">
          {/* ─── LEFT COLUMN: 2 STORIES ─── */}
          <div className="top-picks-left">
            {rest.slice(0, 2).map((article) => (
              <article key={article.id} className="top-picks-side-card">
                <div className="top-picks-side-img img-hover">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="tp-img"
                  />
                </div>
                <div className="top-picks-side-body">
                  <Link href={`/article/${article.slug}`} className="badge">
                    {article.category}
                  </Link>
                  <h3 className="tp-side-title">
                    <Link href={`/article/${article.slug}`} className="link-headline">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="tp-excerpt">{article.excerpt}</p>
                  <div className="article-meta" style={{ marginTop: 10 }}>
                    <span className="meta-text">{article.author}</span>
                    <span className="meta-dot" aria-hidden="true" />
                    <span className="meta-text">{article.publishedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ─── CENTER: LARGE FEATURE ─── */}
          <article className="top-picks-center">
            <Link href={`/article/${featured.slug}`} className="tp-center-link">
              <div className="tp-center-img img-hover">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="tp-center-img-inner"
                />
              </div>
              <div className="tp-center-body">
                <Link href={`/article/${featured.slug}`} className="badge">
                  {featured.category}
                </Link>
                <h2 className="tp-center-title">{featured.title}</h2>
                <p className="tp-center-excerpt">{featured.excerpt}</p>
                <div className="article-meta" style={{ marginTop: 14 }}>
                  <Image
                    src={featured.authorAvatar}
                    alt={featured.author}
                    width={28}
                    height={28}
                    className="tp-avatar"
                  />
                  <span className="meta-text">{featured.author}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{featured.publishedAt}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{featured.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </article>

          {/* ─── RIGHT COLUMN: 2 STORIES ─── */}
          <div className="top-picks-right">
            {rest.slice(2, 4).map((article) => (
              <article key={article.id} className="top-picks-side-card">
                <div className="top-picks-side-img img-hover">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="tp-img"
                  />
                </div>
                <div className="top-picks-side-body">
                  <Link href={`/article/${article.slug}`} className="badge">
                    {article.category}
                  </Link>
                  <h3 className="tp-side-title">
                    <Link href={`/article/${article.slug}`} className="link-headline">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="tp-excerpt">{article.excerpt}</p>
                  <div className="article-meta" style={{ marginTop: 10 }}>
                    <span className="meta-text">{article.author}</span>
                    <span className="meta-dot" aria-hidden="true" />
                    <span className="meta-text">{article.publishedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .top-picks-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .top-picks-left,
        .top-picks-right {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .top-picks-side-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--color-border);
        }
        .top-picks-side-card:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .top-picks-side-img {
          position: relative;
          width: 100%;
          height: 160px;
        }
        .tp-img {
          object-fit: cover;
        }
        .top-picks-side-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .tp-side-title {
          font-family: var(--font-headline);
          font-size: 17px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 600;
        }
        .tp-excerpt {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ─── CENTER ─── */
        .top-picks-center {
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          padding: 0 32px;
        }
        .tp-center-link {
          display: block;
          text-decoration: none;
        }
        .tp-center-img {
          position: relative;
          width: 100%;
          height: 320px;
          margin-bottom: 20px;
        }
        .tp-center-img-inner {
          object-fit: cover;
        }
        .tp-center-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tp-center-title {
          font-family: var(--font-headline);
          font-size: clamp(22px, 2vw, 30px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 600;
          color: var(--color-text);
        }
        .tp-center-excerpt {
          font-family: var(--font-ui);
          font-size: 15px;
          color: var(--color-secondary);
          line-height: 1.6;
        }
        .tp-avatar {
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .top-picks-grid {
            grid-template-columns: 1fr 1.4fr;
            grid-template-rows: auto auto;
          }
          .top-picks-left {
            grid-column: 1;
          }
          .top-picks-center {
            grid-column: 2;
            border-right: none;
          }
          .top-picks-right {
            grid-column: 1 / -1;
            flex-direction: row;
            gap: 32px;
          }
          .top-picks-right .top-picks-side-card {
            flex: 1;
          }
        }
        @media (max-width: 768px) {
          .top-picks-grid {
            grid-template-columns: 1fr;
          }
          .top-picks-center {
            border-left: none;
            border-right: none;
            border-top: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
            padding: 24px 0;
          }
          .top-picks-right {
            grid-column: 1;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
