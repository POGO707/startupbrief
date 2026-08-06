import Link from "next/link";
import Image from "next/image";
import { Grid, List } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import AdPlaceholder from "@/components/common/AdPlaceholder";

export default async function CategorySectionOne() {
  const articles = await getPublishedArticles({ categorySlug: "business", take: 6 });
  const allArticles = articles.length >= 6 ? articles : await getPublishedArticles({ take: 6 });

  const heroCard = allArticles[0] || {
    slug: "global-macro-economy-and-venture-funding-trends",
    title: "Global Macro Economy and Venture Capital Trends in 2026",
    excerpt: "Institutional investors reallocate capital to high-margin software platforms as interest rate policy stabilizes globally.",
    publishedAt: "AUG 1, 2026",
    author: "Startup Brief Admin",
    category: "BUSINESS & MARKETS",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop&auto=format",
    tags: ["business", "venture capital"],
  };

  const secondaryCard = allArticles[1] || {
    slug: "enterprise-saas-consolidation-heats-up",
    title: "Enterprise SaaS Consolidation Heats Up Among Top-Tier Players",
    excerpt: "Consolidation strategy gathers pace as enterprise buyers seek unified artificial intelligence ecosystems.",
    publishedAt: "AUG 1, 2026",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500&h=300&fit=crop&auto=format",
    tags: ["saas", "enterprise", "mergers"],
  };

  const bottomRowCards = allArticles.slice(2, 5).length > 0 ? allArticles.slice(2, 5) : [
    {
      slug: "tech-ipo-pipeline-expands-for-h2-2026",
      title: "Tech IPO Pipeline Expands with Strong Wall Street Interest",
      publishedAt: "AUG 1, 2026",
      author: "Startup Brief Admin",
      excerpt: "Growth companies prepare S-1 filings following robust revenue expansion.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop&auto=format",
    },
    {
      slug: "our-company-overview-scaling-global-infrastructure",
      title: "Scaling Global Cloud Infrastructure for AI Workloads",
      publishedAt: "AUG 1, 2026",
      author: "Startup Brief Admin",
      excerpt: "Hyperscalers invest heavily in high-bandwidth datacenters to meet inference demand.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop&auto=format",
    },
    {
      slug: "central-banks-evaluate-digital-currency-pilots",
      title: "Central Banks Evaluate Next-Gen Financial Clearing Protocols",
      publishedAt: "AUG 1, 2026",
      author: "Startup Brief Admin",
      excerpt: "Pilots demonstrate settlement speed improvements across international trade corridors.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop&auto=format",
    },
  ];

  const sidebarPopular = allArticles.slice(1, 6);

  return (
    <section className="category-section-wrapper" aria-label="Business Articles Section">
      {/* SECTION BANNER */}
      <div className="category-section-banner">
        <span className="banner-title-text">BUSINESS ARTICLES</span>
        <div className="banner-view-toggle">
          <button aria-label="Grid view" className="view-btn active"><Grid size={13} /></button>
          <button aria-label="List view" className="view-btn"><List size={13} /></button>
        </div>
      </div>

      {/* SECTION CONTENT GRID */}
      <div className="category-section-grid">
        {/* MAIN CONTENT LEFT */}
        <div className="section-main-left">
          {/* TOP 2-COLUMN FEATURED ROW */}
          <div className="featured-top-row">
            {/* HERO OVERLAY CARD */}
            <article className="cat-hero-card">
              <div className="cat-hero-img-wrap">
                <Image
                  src={heroCard.image}
                  alt={heroCard.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: "cover" }}
                />
                <div className="cat-hero-overlay" />
                <div className="cat-hero-content">
                  <h2 className="cat-hero-title">
                    <Link href={`/article/${heroCard.slug}`}>{heroCard.title}</Link>
                  </h2>
                  <span className="cat-hero-meta">{heroCard.publishedAt} - {heroCard.category} / By {heroCard.author}</span>
                </div>
              </div>
              <div className="cat-hero-subtext">
                <p>{heroCard.excerpt}</p>
                <div className="cat-tags-row">
                  <span>Tags:</span>
                  {heroCard.tags?.map((t: string) => (
                    <span key={t} className="tag-link">{t}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* SECONDARY FEATURED CARD */}
            <article className="cat-secondary-card">
              <div className="cat-sec-img-wrap">
                <Image
                  src={secondaryCard.image}
                  alt={secondaryCard.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 className="cat-sec-title">
                <Link href={`/article/${secondaryCard.slug}`}>{secondaryCard.title}</Link>
              </h3>
              <span className="cat-sec-date">{secondaryCard.publishedAt} - Business Market</span>
              <p className="cat-sec-excerpt">{secondaryCard.excerpt}</p>
              <div className="cat-tags-row">
                <span>Tags:</span>
                {secondaryCard.tags?.map((t: string) => (
                  <span key={t} className="tag-link">{t}</span>
                ))}
              </div>
            </article>
          </div>

          {/* BOTTOM ROW (3 CARDS) */}
          <div className="featured-bottom-row">
            {bottomRowCards.map((card, idx) => (
              <article key={card.slug || idx} className="bottom-col-card">
                <div className="bottom-card-img-wrap">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="260px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h4 className="bottom-card-title">
                  <Link href={`/article/${card.slug}`}>{card.title}</Link>
                </h4>
                <span className="bottom-card-date">{card.publishedAt} - By {card.author}</span>
                <p className="bottom-card-excerpt">{card.excerpt}</p>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR INSIDE SECTION */}
        <aside className="section-sidebar-right">
          <div className="sidebar-popular-header">
            <span>POPULAR ON THIS CATEGORY</span>
          </div>

          <div className="sidebar-popular-body">
            {sidebarPopular[0] && (
              <div className="popular-top-item">
                <div className="popular-thumb-wrap">
                  <Image
                    src={sidebarPopular[0].image}
                    alt={sidebarPopular[0].title}
                    fill
                    sizes="280px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h4 className="popular-top-title">
                  <Link href={`/article/${sidebarPopular[0].slug}`}>{sidebarPopular[0].title}</Link>
                </h4>
              </div>
            )}

            <ul className="popular-list-headlines" role="list">
              {sidebarPopular.slice(1).map((item, idx) => (
                <li key={item.slug || idx} className="popular-headline-item">
                  <Link href={`/article/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>

            {/* GOOGLE ADSENSE PLACEHOLDER */}
            <AdPlaceholder format="300x250" />
          </div>
        </aside>
      </div>

      <style>{`
        .category-section-wrapper {
          width: 100%;
          margin-bottom: 32px;
        }

        /* BANNER */
        .category-section-banner {
          background: #0f172a;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          margin-bottom: 16px;
        }
        .banner-title-text {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .banner-view-toggle {
          display: flex;
          gap: 4px;
        }
        .view-btn {
          background: #1e293b;
          border: none;
          color: #94a3b8;
          padding: 4px 6px;
          cursor: pointer;
        }
        .view-btn.active {
          background: #ff6a00;
          color: #ffffff;
        }

        /* GRID */
        .category-section-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          align-items: start;
        }

        /* MAIN LEFT */
        .section-main-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .featured-top-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* CAT HERO CARD */
        .cat-hero-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cat-hero-img-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          background: #000;
          display: flex;
          align-items: flex-end;
          padding: 14px;
        }
        .cat-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%);
        }
        .cat-hero-content {
          position: relative;
          z-index: 2;
          color: #ffffff;
        }
        .cat-hero-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 4px;
        }
        .cat-hero-title a { color: #ffffff; text-decoration: none; }
        .cat-hero-meta {
          font-family: var(--font-ui), sans-serif;
          font-size: 9px;
          color: #cbd5e1;
        }
        .cat-hero-subtext p {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          color: #475569;
          line-height: 1.4;
          margin: 0 0 6px;
        }
        .cat-tags-row {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #64748b;
          display: flex;
          gap: 6px;
        }
        .tag-link { color: #0f172a; font-weight: 600; }

        /* CAT SECONDARY CARD */
        .cat-secondary-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cat-sec-img-wrap {
          position: relative;
          width: 100%;
          height: 140px;
          background: #cbd5e1;
        }
        .cat-sec-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .cat-sec-title a { color: #0f172a; text-decoration: none; }
        .cat-sec-title a:hover { color: #ff6a00; }
        .cat-sec-date {
          font-family: var(--font-ui), sans-serif;
          font-size: 9px;
          color: #94a3b8;
        }
        .cat-sec-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          color: #475569;
          line-height: 1.4;
          margin: 0;
        }

        /* BOTTOM ROW */
        .featured-bottom-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
        }
        .bottom-col-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .bottom-card-img-wrap {
          position: relative;
          width: 100%;
          height: 110px;
          background: #cbd5e1;
        }
        .bottom-card-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .bottom-card-title a { color: #0f172a; text-decoration: none; }
        .bottom-card-title a:hover { color: #ff6a00; }
        .bottom-card-date {
          font-family: var(--font-ui), sans-serif;
          font-size: 9px;
          color: #94a3b8;
        }
        .bottom-card-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #64748b;
          margin: 0;
        }

        /* RIGHT SIDEBAR INSIDE SECTION */
        .section-sidebar-right {
          background: #ffffff;
          border: 1px solid #cbd5e1;
        }
        .sidebar-popular-header {
          background: #0f172a;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 10px 14px;
          text-align: center;
          text-transform: uppercase;
        }
        .sidebar-popular-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .popular-top-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 10px;
        }
        .popular-thumb-wrap {
          position: relative;
          width: 100%;
          height: 130px;
          background: #cbd5e1;
        }
        .popular-top-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          margin: 0;
        }
        .popular-top-title a { color: #0f172a; text-decoration: none; }
        .popular-top-title a:hover { color: #ff6a00; }

        .popular-list-headlines {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .popular-headline-item {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.25;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 6px;
        }
        .popular-headline-item a { color: #0f172a; text-decoration: none; }
        .popular-headline-item a:hover { color: #ff6a00; }

        @media (max-width: 900px) {
          .category-section-grid { grid-template-columns: 1fr; }
          .featured-top-row { grid-template-columns: 1fr; }
          .featured-bottom-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
