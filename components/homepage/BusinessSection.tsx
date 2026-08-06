import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/articles";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default async function BusinessSection() {
  const businessArticles = await getPublishedArticles({ categorySlug: "business", take: 4 });
  const fallback = {
    id: "b-def",
    slug: "",
    title: "Business Strategy & Markets",
    excerpt: "Analysis on markets, growth, and strategy.",
    category: "Business",
    author: "Editorial Team",
    publishedAt: "July 31, 2026",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&auto=format",
  };
  const featured = businessArticles[0] || fallback;
  const col1 = businessArticles[1] || fallback;
  const col2 = businessArticles[2] || fallback;
  const col3 = businessArticles[3] || fallback;

  return (
    <section className="business-section section editorial-border-top" aria-label="Business news">
      <div className="container">
        <SectionHeading normalText="BUSINESS" highlightText="STORY" />

        {/* ─── NEWSPAPER LAYOUT ─── */}
        <div className="biz-layout">
          {/* Featured story - full width horizontal */}
          <article className="biz-featured">
            <Link href={`/article/${featured.slug}`} className="biz-featured-link">
              <div className="biz-featured-img img-hover">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="biz-img"
                />
              </div>
              <div className="biz-featured-body">
                <span className="badge">{featured.category}</span>
                <h3 className="biz-featured-title link-headline">
                  {featured.title}
                </h3>
                <p className="biz-featured-excerpt">{featured.excerpt}</p>
                <div className="article-meta" style={{ marginTop: 14 }}>
                  <span className="meta-text" style={{ color: "var(--color-text)" }}>{featured.author}</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{featured.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </article>

          <div className="biz-divider" aria-hidden="true" />

          {/* Newspaper columns */}
          <div className="biz-columns">
            {[col1, col2, col3].map((article, i) => (
              <article key={article.id} className="biz-col-article">
                {i > 0 && <div className="biz-col-rule" aria-hidden="true" />}
                <Link href={`/article/${article.slug}`} className="biz-col-inner">
                  <span className="badge" style={{ marginBottom: 12 }}>
                    {article.category}
                  </span>
                  <h3 className="biz-col-title link-headline">
                    {article.title}
                  </h3>
                  <p className="biz-col-excerpt">{article.excerpt}</p>
                  <div className="article-meta" style={{ marginTop: 12 }}>
                    <span className="meta-text">{article.author}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .business-section {
          background: var(--color-bg);
        }
        .biz-featured-link {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 40px;
          text-decoration: none;
        }
        .biz-featured-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border: 1px solid var(--color-border);
        }
        .biz-img {
          object-fit: cover;
        }
        .biz-featured-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }
        .biz-featured-title {
          font-family: var(--font-headline);
          font-size: clamp(26px, 3vw, 40px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-weight: 500;
        }
        .biz-featured-excerpt {
          font-family: var(--font-ui);
          font-size: 16px;
          color: var(--color-secondary);
          line-height: 1.6;
        }
        .biz-divider {
          width: 100%;
          height: 1px;
          background: var(--color-border-dark);
          margin-bottom: 40px;
          position: relative;
        }
        .biz-divider::before {
          content: 'MARKETS & STRATEGY';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
          background: var(--color-bg);
          padding: 0 16px;
        }
        .biz-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          position: relative;
        }
        .biz-col-article {
          position: relative;
          display: flex;
        }
        .biz-col-rule {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--color-border-dark);
        }
        .biz-col-inner {
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-decoration: none;
          align-items: flex-start;
        }
        .biz-col-article:first-child .biz-col-inner {
          padding-left: 0;
        }
        .biz-col-article:last-child .biz-col-inner {
          padding-right: 0;
        }
        .biz-col-title {
          font-family: var(--font-headline);
          font-size: 20px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .biz-col-excerpt {
          font-family: var(--font-ui);
          font-size: 14px;
          color: var(--color-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .biz-featured-link {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .biz-columns {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .biz-col-rule {
            display: none;
          }
          .biz-col-inner {
            padding: 0 !important;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 32px !important;
          }
          .biz-col-article:last-child .biz-col-inner {
            border-bottom: none;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
