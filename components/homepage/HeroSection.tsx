import Link from "next/link";
import Image from "next/image";
import { featuredArticle, heroSideArticles } from "@/lib/data";

export default function HeroSection() {
  const side = heroSideArticles;

  return (
    <section className="hero-section section editorial-border-top" aria-label="Featured stories">
      <div className="container">
        <div className="hero-grid">
          {/* ─── LEFT: MAIN FEATURE STORY ─── */}
          <article className="hero-main">
            <Link href={`/article/${featuredArticle.slug}`} className="hero-main-link">
              <div className="hero-main-image img-hover">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="hero-main-img"
                  priority
                />
              </div>
              <div className="hero-main-content">
                <span className="badge">{featuredArticle.category}</span>
                <h1 className="hero-main-title link-headline">{featuredArticle.title}</h1>
                <p className="hero-main-excerpt">{featuredArticle.excerpt}</p>
                <div className="article-meta" style={{ marginTop: 12 }}>
                  <span className="meta-text" style={{ color: "var(--color-text)" }}>
                    By {featuredArticle.author}
                  </span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">
                    {featuredArticle.publishedAt}
                  </span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">
                    {featuredArticle.readingTime} min read
                  </span>
                </div>
              </div>
            </Link>
          </article>

          {/* ─── RIGHT: LATEST NEWS SIDEBAR ─── */}
          <aside className="hero-sidebar" aria-label="Latest news">
            <div className="sidebar-header">
              <span className="sidebar-header-title">Latest News</span>
            </div>
            <div className="hero-sidebar-list">
              {side.map((article, i) => (
                <article key={article.id} className="hero-sidebar-item">
                  <div className="hero-sidebar-number" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="hero-sidebar-content">
                    <Link href={`/article/${article.slug}`} className="badge" style={{ marginBottom: 6 }}>
                      {article.category}
                    </Link>
                    <h2 className="hero-sidebar-title">
                      <Link href={`/article/${article.slug}`} className="link-headline">
                        {article.title}
                      </Link>
                    </h2>
                    <div className="article-meta" style={{ marginTop: 6 }}>
                      <span className="meta-text">{article.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .hero-section {
          background: var(--color-bg);
          padding-top: 32px;
          padding-bottom: 32px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ─── MAIN ─── */
        .hero-main {
          border-right: 1px solid var(--color-border-dark);
          padding-right: 40px;
        }
        .hero-main-link {
          display: flex;
          flex-direction: column;
          gap: 24px;
          text-decoration: none;
        }
        .hero-main-image {
          position: relative;
          aspect-ratio: 16/9;
          width: 100%;
          border: 1px solid var(--color-border);
        }
        .hero-main-img {
          object-fit: cover;
          object-position: center;
        }
        .hero-main-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-main-content .badge {
          margin-bottom: 12px;
        }
        .hero-main-title {
          font-family: var(--font-headline);
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--color-text);
          font-weight: 500;
          margin-bottom: 16px;
        }
        .hero-main-excerpt {
          font-family: var(--font-headline);
          font-size: 19px;
          color: var(--color-secondary);
          line-height: 1.6;
          max-width: 640px;
        }

        /* ─── SIDEBAR ─── */
        .hero-sidebar {
          display: flex;
          flex-direction: column;
        }
        .sidebar-header {
          border-bottom: 2px solid var(--color-text);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .sidebar-header-title {
          font-family: var(--font-ui);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .hero-sidebar-list {
          display: flex;
          flex-direction: column;
        }
        .hero-sidebar-item {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 16px;
          align-items: start;
          padding: 16px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .hero-sidebar-item:last-child {
          border-bottom: none;
        }
        .hero-sidebar-number {
          font-family: var(--font-headline);
          font-size: 24px;
          font-weight: 400;
          color: var(--color-text);
          line-height: 1;
          padding-top: 4px;
        }
        .hero-sidebar-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .hero-sidebar-title {
          font-family: var(--font-headline);
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -0.01em;
          font-weight: 500;
          overflow-wrap: anywhere;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-main {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border-dark);
            padding-bottom: 40px;
          }
        }
        @media (max-width: 640px) {
          .hero-main-title {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}
