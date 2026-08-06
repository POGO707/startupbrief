import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";
import { prisma } from "@/lib/prisma";
import { formatArticle } from "@/lib/articles";

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findFirst({
    where: { OR: [{ slug: slug.toLowerCase() }, { name: slug }] },
  });

  if (!category) return { title: "Category — Startup Brief" };

  return {
    title: `${category.name} News & Analysis — Startup Brief`,
    description: category.description || `The latest editorial stories and market intelligence on ${category.name}.`,
  };
}

export default async function DynamicCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = await prisma.category.findFirst({
    where: { OR: [{ slug: slug.toLowerCase() }, { name: slug }] },
  });

  const articlesRaw = await prisma.article.findMany({
    where: category
      ? { categoryId: category.id, status: "published" }
      : { category: { slug: slug.toLowerCase() }, status: "published" },
    include: { author: true, category: true, tags: true },
    orderBy: { createdAt: "desc" },
  });

  const articles = articlesRaw.map(formatArticle);

  const rawTrending = await prisma.article.findMany({
    where: { status: "published" },
    take: 5,
    orderBy: { views: "desc" },
    include: { author: true, category: true },
  });

  const rawLatest = await prisma.article.findMany({
    where: { status: "published" },
    take: 5,
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true },
  });

  const trendingArticles = rawTrending.map(formatArticle);
  const latestArticles = rawLatest.map(formatArticle);

  const categoryTitle = category ? category.name.toUpperCase() : slug.toUpperCase();
  const categoryDesc = category?.description || `In-depth editorial coverage, analysis, and breaking stories in ${categoryTitle}.`;
  
  const featured = articles[0] || null;
  const listArticles = articles.slice(1);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* BREADCRUMB BAR */}
        <div className="article-breadcrumb-bar">
          <div className="newspaper-container">
            <nav className="article-breadcrumb" aria-label="Breadcrumb">
              <Link href="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current" aria-current="page">{categoryTitle}</span>
            </nav>
          </div>
        </div>

        {/* CATEGORY HEADER BANNER */}
        <div className="cat-page-header-banner">
          <div className="newspaper-container">
            <span className="cat-header-tag">EDITORIAL DESK</span>
            <h1 className="cat-header-title">{categoryTitle}</h1>
            <p className="cat-header-desc">{categoryDesc}</p>
          </div>
        </div>

        {/* PAGE CONTENT CONTAINER WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 32 }}>
          <div className="cat-page-layout">
            {/* MAIN CATEGORY LEFT AREA */}
            <div className="cat-main-content">
              {featured ? (
                <div className="category-featured-block">
                  {/* FEATURED STORY */}
                  <article className="category-featured-card">
                    <Link href={`/article/${featured.slug}`}>
                      <div className="featured-img-wrap">
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          priority
                          sizes="(max-width: 900px) 100vw, 800px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </Link>
                    <div className="featured-card-body">
                      <span className="card-orange-badge">{featured.category}</span>
                      <h2 className="featured-title">
                        <Link href={`/article/${featured.slug}`}>{featured.title}</Link>
                      </h2>
                      <p className="featured-excerpt">{featured.excerpt}</p>
                      <div className="article-meta">
                        <span className="meta-text">By {featured.author}</span>
                        <span className="meta-dot">•</span>
                        <span className="meta-text">{featured.publishedAt}</span>
                        <span className="meta-dot">•</span>
                        <span className="meta-text">{featured.readingTime} MIN READ</span>
                      </div>
                    </div>
                  </article>

                  {/* ARTICLE LIST GRID */}
                  <div className="category-list-grid">
                    {listArticles.map((item) => (
                      <article key={item.id} className="category-item-card">
                        <Link href={`/article/${item.slug}`} className="item-thumb-link">
                          <div className="item-thumb-wrap">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="240px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </Link>
                        <div className="item-content">
                          <span className="card-orange-badge">{item.category}</span>
                          <h3 className="item-title">
                            <Link href={`/article/${item.slug}`}>{item.title}</Link>
                          </h3>
                          <p className="item-excerpt">{item.excerpt}</p>
                          <div className="article-meta">
                            <span className="meta-text">{item.author}</span>
                            <span className="meta-dot">•</span>
                            <span className="meta-text">{item.publishedAt}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* PAGINATION */}
                  <div className="newspaper-pagination">
                    <button className="page-num active">1</button>
                    <button className="page-num">2</button>
                    <button className="page-num">3</button>
                    <button className="page-next">NEXT &rarr;</button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: "40px 0" }}>
                  <p style={{ fontFamily: "var(--font-ui)", color: "#64748b" }}>
                    No articles found in this category yet.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="cat-sidebar-col">
              <RightSidebar
                trendingArticles={trendingArticles}
                latestArticles={latestArticles}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .article-breadcrumb-bar {
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 0;
          background: #ffffff;
        }
        .article-breadcrumb { display: flex; align-items: center; gap: 8px; }
        .breadcrumb-link { font-family: var(--font-ui), sans-serif; font-size: 11px; color: #64748b; text-decoration: none; }
        .breadcrumb-link:hover { color: #ff6a00; }
        .breadcrumb-sep { font-size: 11px; color: #cbd5e1; }
        .breadcrumb-current { font-family: var(--font-ui), sans-serif; font-size: 11px; color: #0f172a; font-weight: 700; }

        .cat-page-header-banner {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .cat-header-tag {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .cat-header-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 800;
          line-height: 1.05;
          color: #ffffff;
          margin: 6px 0 10px;
        }
        .cat-header-desc {
          font-family: var(--font-ui), sans-serif;
          font-size: 15px;
          color: #94a3b8;
          max-width: 700px;
          line-height: 1.5;
        }

        .cat-page-layout {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 36px;
          align-items: start;
        }

        .category-featured-block {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .category-featured-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 28px;
        }
        .featured-img-wrap {
          position: relative;
          width: 100%;
          height: 360px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }
        .featured-card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .card-orange-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          color: #ff6a00;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .featured-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          line-height: 1.15;
          margin: 0;
        }
        .featured-title a { color: #0f172a; text-decoration: none; }
        .featured-title a:hover { color: #ff6a00; }
        .featured-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 15px;
          color: #475569;
          line-height: 1.5;
        }

        .category-list-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .category-item-card {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
          align-items: start;
        }
        .item-thumb-link { display: block; }
        .item-thumb-wrap {
          position: relative;
          width: 220px;
          height: 140px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }
        .item-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .item-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .item-title a { color: #0f172a; text-decoration: none; }
        .item-title a:hover { color: #ff6a00; }
        .item-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #475569;
          line-height: 1.45;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 4px;
        }
        .meta-dot { color: #cbd5e1; }

        .newspaper-pagination {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 16px;
        }
        .page-num {
          width: 36px;
          height: 36px;
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid #0f172a;
          background: #ffffff;
          color: #0f172a;
          cursor: pointer;
        }
        .page-num.active {
          background: #ff6a00;
          color: #ffffff;
          border-color: #ff6a00;
        }
        .page-next {
          padding: 0 16px;
          height: 36px;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          border: 1px solid #0f172a;
          background: #ffffff;
          color: #0f172a;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .cat-page-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .category-item-card { grid-template-columns: 1fr; }
          .item-thumb-wrap { width: 100%; height: 180px; }
        }
      `}</style>
    </>
  );
}
