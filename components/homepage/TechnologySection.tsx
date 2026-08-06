import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/articles";

export default async function TechnologySection() {
  const techArticles = await getPublishedArticles({ categorySlug: "technology", take: 5 });
  const fallback = {
    id: "t-def",
    slug: "",
    title: "Technology Innovations",
    excerpt: "Insights into quantum, robotics, and hardware.",
    category: "Technology",
    author: "Editorial Team",
    publishedAt: "July 31, 2026",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&h=450&fit=crop&auto=format",
  };
  const featured = techArticles[0] || fallback;
  const rest = techArticles.slice(1);

  return (
    <section className="tech-section section editorial-border-top" aria-label="Technology news">
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-title">Technology</h2>
        </div>
        <div className="tech-layout">
          {/* ─── LEFT SIDEBAR (SECONDARY) ─── */}
          <div className="tech-sidebar">
            {rest.map((article, i) => (
              <article key={article.id} className="tech-sidebar-item">
                <Link href={`/article/${article.slug}`} className="tech-sidebar-link">
                  <span className="badge" style={{ marginBottom: 12 }}>
                    {article.category}
                  </span>
                  <h3 className="tech-sidebar-title link-headline">
                    {article.title}
                  </h3>
                  <p className="tech-sidebar-excerpt">{article.excerpt}</p>
                  <div className="article-meta" style={{ marginTop: 12 }}>
                    <span className="meta-text">{article.author}</span>
                  </div>
                </Link>
                {i < rest.length - 1 && (
                  <div className="tech-sidebar-divider" aria-hidden="true" />
                )}
              </article>
            ))}
          </div>

          {/* ─── RIGHT LARGE FEATURE ─── */}
          <article className="tech-feature">
            <Link href={`/article/${featured.slug}`} className="tech-feature-link">
              <div className="tech-feature-img img-hover">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="tech-img"
                />
              </div>
              <div className="tech-feature-body">
                <span className="badge">{featured.category}</span>
                <h2 className="tech-feature-title link-headline">{featured.title}</h2>
                <p className="tech-feature-excerpt">{featured.excerpt}</p>
                <div className="article-meta" style={{ marginTop: 16 }}>
                  <span className="meta-text" style={{ color: "var(--color-text)" }}>
                    {featured.author}
                  </span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">
                    {featured.readingTime} min read
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </div>

      <style>{`
        .tech-section {
          background: var(--color-bg);
        }
        .tech-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 40px;
          align-items: start;
        }
        
        /* ─── LEFT SIDEBAR ─── */
        .tech-sidebar {
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--color-border-dark);
          padding-right: 40px;
        }
        .tech-sidebar-item {
          display: flex;
          flex-direction: column;
        }
        .tech-sidebar-link {
          display: flex;
          flex-direction: column;
          padding: 24px 0;
          text-decoration: none;
          align-items: flex-start;
        }
        .tech-sidebar-item:first-child .tech-sidebar-link {
          padding-top: 0;
        }
        .tech-sidebar-title {
          font-family: var(--font-headline);
          font-size: 20px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .tech-sidebar-excerpt {
          font-family: var(--font-ui);
          font-size: 14px;
          color: var(--color-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tech-sidebar-divider {
          height: 1px;
          background: var(--color-border);
        }

        /* ─── RIGHT FEATURE ─── */
        .tech-feature-link {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          gap: 24px;
        }
        .tech-feature-img {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border: 1px solid var(--color-border);
        }
        .tech-img {
          object-fit: cover;
        }
        .tech-feature-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .tech-feature-body .badge {
          margin-bottom: 12px;
        }
        .tech-feature-title {
          font-family: var(--font-headline);
          font-size: clamp(28px, 3.5vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-weight: 500;
          color: var(--color-text);
          margin-bottom: 16px;
        }
        .tech-feature-excerpt {
          font-family: var(--font-headline);
          font-size: 19px;
          color: var(--color-secondary);
          line-height: 1.6;
          max-width: 600px;
        }

        @media (max-width: 900px) {
          .tech-layout {
            grid-template-columns: 1fr;
          }
          .tech-sidebar {
            order: 2;
            border-right: none;
            padding-right: 0;
            border-top: 1px solid var(--color-border-dark);
            padding-top: 24px;
            margin-top: 32px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 32px;
          }
          .tech-sidebar-divider {
            display: none;
          }
          .tech-sidebar-link {
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 32px;
          }
          .tech-sidebar-item:first-child .tech-sidebar-link {
            padding-top: 24px;
          }
          .tech-feature-img {
            aspect-ratio: 16/9;
          }
        }
        @media (max-width: 640px) {
          .tech-sidebar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
