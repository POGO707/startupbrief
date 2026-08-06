import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { prisma } from "@/lib/prisma";
import { formatArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Search News & Analysis — Startup Brief",
  description: "Search across all articles, tools, books, videos, founders, and startups on Startup Brief.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; cat?: string }>;
}) {
  const params = await searchParams;
  const query = (params?.q || "").trim();
  const catFilter = (params?.cat || "").trim();

  let dbArticles: any[] = [];
  try {
    const whereClause: any = { status: "published" };
    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { excerpt: { contains: query } },
        { content: { contains: query } },
      ];
    }
    if (catFilter && catFilter.toLowerCase() !== "all") {
      whereClause.category = {
        name: catFilter,
      };
    }

    const fetched = await prisma.article.findMany({
      where: whereClause,
      include: { author: true, category: true, tags: true },
      orderBy: { createdAt: "desc" },
    });

    dbArticles = fetched.map(formatArticle);
  } catch (err) {
    console.error("Search DB error:", err);
  }

  const allArticles = dbArticles;

  const dbCategories = await prisma.category.findMany({
    include: { _count: { select: { articles: true } } },
  });

  const categoriesList = [
    { label: "All", count: allArticles.length, cat: "" },
    ...dbCategories.map((c) => ({
      label: c.name,
      count: c._count.articles,
      cat: c.name,
    })),
  ];

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

  return (
    <>
      <Header />
      <main id="main-content">
        {/* SEARCH HERO BANNER */}
        <div className="search-hero-banner">
          <div className="newspaper-container">
            <span className="search-tag-label">EDITORIAL ARCHIVE SEARCH</span>
            <h1 className="search-headline-title">Search Startup Brief</h1>
            <p className="search-sub-desc">
              Explore breaking news, deep-tech research, founder interviews, funding announcements, and market intelligence.
            </p>

            {/* SEARCH INPUT FORM */}
            <form action="/search" method="GET" className="search-main-form">
              <div className="input-field-wrap">
                <Search size={18} className="search-field-icon" />
                <input
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Search articles, topics, AI tools, or founders..."
                  className="search-main-input"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="search-orange-btn">
                SEARCH
              </button>
            </form>

            {/* CATEGORY FILTER PILLS */}
            <div className="search-filter-pills-row" role="list">
              <span className="filter-lbl"><Filter size={12} /> FILTERS:</span>
              {categoriesList.map((cat) => {
                const isActive = (catFilter.toLowerCase() === cat.label.toLowerCase()) || (!catFilter && cat.label === "All");
                return (
                  <Link
                    key={cat.label}
                    href={cat.cat ? `/search?cat=${encodeURIComponent(cat.cat)}${query ? `&q=${encodeURIComponent(query)}` : ""}` : "/search"}
                    className={`search-pill-btn ${isActive ? "active" : ""}`}
                    role="listitem"
                  >
                    {cat.label}
                    <span className="pill-count">{cat.count}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* SEARCH RESULTS LAYOUT */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="search-page-layout">
            {/* RESULTS LEFT */}
            <div className="search-results-left">
              <div className="results-meta-header">
                <h2 className="results-meta-title">
                  {query ? `Search Results for "${query}"` : catFilter ? `Category Filter: ${catFilter}` : "Latest Newspaper Archive Stories"}
                </h2>
                <span className="results-count-badge">{allArticles.length} Stories Found</span>
              </div>

              {allArticles.length === 0 ? (
                <div className="no-results-card">
                  <h3>No matching articles found</h3>
                  <p>Try searching for broader keywords such as &ldquo;AI&rdquo;, &ldquo;funding&rdquo;, &ldquo;OpenAI&rdquo;, or &ldquo;startups&rdquo;.</p>
                </div>
              ) : (
                <div className="search-articles-list">
                  {allArticles.map((article) => (
                    <article key={article.id} className="search-item-card">
                      <Link href={`/article/${article.slug}`} className="search-thumb-link">
                        <div className="search-thumb-wrap">
                          <Image src={article.image} alt={article.title} fill sizes="200px" style={{ objectFit: "cover" }} />
                        </div>
                      </Link>
                      <div className="search-item-body">
                        <span className="card-orange-badge">{article.category}</span>
                        <h3 className="search-item-title">
                          <Link href={`/article/${article.slug}`}>{article.title}</Link>
                        </h3>
                        <p className="search-item-excerpt">{article.excerpt}</p>
                        <div className="article-meta">
                          <span className="meta-text">By {article.author}</span>
                          <span className="meta-dot">•</span>
                          <span className="meta-text">{article.publishedAt}</span>
                          <span className="meta-dot">•</span>
                          <span className="meta-text">{article.readingTime} MIN READ</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              <div className="newspaper-pagination" style={{ marginTop: 24 }}>
                <button className="page-num active">1</button>
                <button className="page-num">2</button>
                <button className="page-num">3</button>
                <button className="page-next">NEXT &rarr;</button>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="search-sidebar-col">
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
        .search-hero-banner {
          background: #0f172a;
          color: #ffffff;
          padding-block: 44px;
          border-bottom: 4px solid #ff6a00;
        }
        .search-tag-label {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .search-headline-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 800;
          color: #ffffff;
          margin: 6px 0 10px;
        }
        .search-sub-desc {
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          color: #94a3b8;
          max-width: 680px;
          margin-bottom: 24px;
        }

        .search-main-form {
          display: flex;
          gap: 10px;
          max-width: 720px;
          margin-bottom: 24px;
        }
        .input-field-wrap {
          position: relative;
          flex: 1;
        }
        .search-field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }
        .search-main-input {
          width: 100%;
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          padding: 12px 14px 12px 42px;
          background: #1e293b;
          border: 1px solid #334155;
          color: #ffffff;
          outline: none;
        }
        .search-main-input:focus { border-color: #ff6a00; }
        .search-orange-btn {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 0 24px;
          background: #ff6a00;
          color: #ffffff;
          border: none;
          cursor: pointer;
        }

        .search-filter-pills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-lbl {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-right: 4px;
        }
        .search-pill-btn {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 5px 12px;
          background: #1e293b;
          border: 1px solid #334155;
          color: #94a3b8;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .search-pill-btn.active, .search-pill-btn:hover {
          background: #ff6a00;
          color: #ffffff;
          border-color: #ff6a00;
        }
        .pill-count {
          font-size: 9px;
          background: rgba(0,0,0,0.3);
          padding: 1px 5px;
        }

        .search-page-layout {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 36px;
          align-items: start;
        }

        .results-meta-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 2px solid #0f172a;
          margin-bottom: 24px;
        }
        .results-meta-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .results-count-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #ff6a00;
        }

        .search-articles-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .search-item-card {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
          align-items: start;
        }
        .search-thumb-link { display: block; }
        .search-thumb-wrap {
          position: relative;
          width: 180px;
          height: 120px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }
        .search-item-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .card-orange-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          color: #ff6a00;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .search-item-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .search-item-title a { color: #0f172a; text-decoration: none; }
        .search-item-title a:hover { color: #ff6a00; }
        .search-item-excerpt {
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

        .no-results-card {
          padding: 40px 20px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          text-align: center;
        }
        .no-results-card h3 {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 20px;
          margin-bottom: 8px;
        }
        .no-results-card p {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #64748b;
        }

        @media (max-width: 900px) {
          .search-page-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .search-item-card { grid-template-columns: 1fr; }
          .search-thumb-wrap { width: 100%; height: 160px; }
          .search-main-form { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
