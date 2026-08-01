import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  aiArticles, startupArticles, founderArticles,
  topTools, books, videos,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Search — Startup Brief",
  description: "Search across all articles, tools, books, videos, founders, and startups on Startup Brief.",
};

const categories = [
  { label: "All", count: 420 },
  { label: "Articles", count: 312 },
  { label: "AI Tools", count: 48 },
  { label: "Books", count: 32 },
  { label: "Videos", count: 28 },
  { label: "Founders", count: 84 },
  { label: "Startups", count: 156 },
];

export default function SearchPage() {
  const allArticles = [...aiArticles, ...startupArticles, ...founderArticles];

  return (
    <>
      <Header />
      <main id="main-content">
        <div className="search-page">
          {/* ─── SEARCH HERO ─── */}
          <div className="search-hero">
            <div className="container-narrow">
              <h1 className="search-headline">Search Startup Brief</h1>
              <p className="search-sub">
                420+ articles, 48 AI tools, 32 books, 28 videos, and more.
              </p>
              <div className="search-input-wrap">
                <Search size={20} className="search-icon" aria-hidden="true" />
                <input
                  id="search-input"
                  type="search"
                  placeholder="Search for anything — AI, startups, founders, tools…"
                  className="search-input"
                  aria-label="Search Startup Brief"
                  autoComplete="off"
                />
              </div>

              <div className="search-categories" role="list" aria-label="Filter by category">
                {categories.map((cat) => (
                  <button key={cat.label} className="search-cat-btn" role="listitem" aria-label={`Filter by ${cat.label}`}>
                    {cat.label}
                    <span className="search-cat-count">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RESULTS ─── */}
          <div className="container">
            <div className="search-results-layout">
              {/* Articles */}
              <section aria-labelledby="articles-heading">
                <div className="section-header">
                  <span className="section-header-accent" aria-hidden="true" />
                  <h2 className="section-header-title" id="articles-heading">Latest Articles</h2>
                </div>
                <div className="search-articles-list">
                  {allArticles.map((article) => (
                    <article key={article.id} className="search-result-item">
                      <div className="search-result-img img-hover">
                        <Image src={article.image} alt={article.title} fill sizes="140px" className="search-result-img-inner" />
                      </div>
                      <div className="search-result-body">
                        <Link href={`/article/${article.slug}`} className="badge">{article.category}</Link>
                        <h3 className="search-result-title">
                          <Link href={`/article/${article.slug}`} className="link-headline">{article.title}</Link>
                        </h3>
                        <p className="search-result-excerpt">{article.excerpt}</p>
                        <div className="article-meta" style={{ marginTop: 8 }}>
                          <span className="meta-text">{article.author}</span>
                          <span className="meta-dot" aria-hidden="true" />
                          <span className="meta-text">{article.publishedAt}</span>
                          <span className="meta-dot" aria-hidden="true" />
                          <span className="meta-text">{article.readingTime} min read</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Sidebar */}
              <aside className="search-sidebar">
                {/* AI Tools */}
                <div className="search-sidebar-block">
                  <div className="section-header" style={{ marginBottom: 0 }}>
                    <span className="section-header-accent" aria-hidden="true" />
                    <h2 className="section-header-title">AI Tools</h2>
                    <Link href="/tools" className="section-header-link"><ArrowRight size={12} /></Link>
                  </div>
                  {topTools.slice(0, 4).map((tool) => (
                    <Link key={tool.id} href={`/tools/${tool.slug}`} className="search-tool-item">
                      <Image src={tool.logo} alt={tool.name} width={36} height={36} className="search-tool-logo" />
                      <div>
                        <div className="search-tool-name">{tool.name}</div>
                        <div className="search-tool-cat">{tool.category} · {tool.pricing}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Books */}
                <div className="search-sidebar-block">
                  <div className="section-header" style={{ marginBottom: 0 }}>
                    <span className="section-header-accent" aria-hidden="true" />
                    <h2 className="section-header-title">Books</h2>
                    <Link href="/books" className="section-header-link"><ArrowRight size={12} /></Link>
                  </div>
                  {books.slice(0, 3).map((book) => (
                    <Link key={book.id} href={`/books/${book.slug}`} className="search-book-item">
                      <div className="search-book-cover">
                        <Image src={book.cover} alt={book.title} fill sizes="50px" className="search-book-cover-img" />
                      </div>
                      <div>
                        <div className="search-book-title">{book.title}</div>
                        <div className="search-book-author">by {book.author}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .search-page { background: #fff; }
        .search-hero {
          background: var(--color-text);
          padding: 60px 0;
          margin-bottom: 0;
        }
        .search-headline {
          font-family: var(--font-headline);
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 600; letter-spacing: -0.03em; color: #fff; margin-bottom: 10px;
        }
        .search-sub {
          font-family: var(--font-ui); font-size: 15px;
          color: rgba(255,255,255,0.5); margin-bottom: 28px;
        }
        .search-input-wrap {
          position: relative; margin-bottom: 20px;
        }
        .search-icon {
          position: absolute; left: 18px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.4); pointer-events: none;
        }
        .search-input {
          width: 100%; font-family: var(--font-ui); font-size: 16px;
          padding: 16px 18px 16px 52px;
          background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15);
          color: #fff; outline: none; transition: border-color 150ms ease;
        }
        .search-input:focus { border-color: var(--color-primary); }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .search-categories {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .search-cat-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-ui); font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 6px 14px; background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.6);
          cursor: pointer; transition: all 150ms ease;
        }
        .search-cat-btn:hover, .search-cat-btn:first-child {
          background: var(--color-primary); border-color: var(--color-primary); color: #fff;
        }
        .search-cat-count {
          font-size: 9px; opacity: 0.7; background: rgba(255,255,255,0.15);
          padding: 1px 5px; border-radius: 2px;
        }
        .search-results-layout {
          display: grid; grid-template-columns: 1fr 300px; gap: 48px;
          padding: 48px 0; align-items: start;
        }
        .search-articles-list { display: flex; flex-direction: column; gap: 0; }
        .search-result-item {
          display: grid; grid-template-columns: 140px 1fr; gap: 20px;
          padding: 24px 0; border-bottom: 1px solid var(--color-border);
          align-items: start;
        }
        .search-result-img {
          position: relative; width: 140px; height: 100px;
        }
        .search-result-img-inner { object-fit: cover; }
        .search-result-body { display: flex; flex-direction: column; gap: 6px; }
        .search-result-title {
          font-family: var(--font-headline); font-size: 18px;
          line-height: 1.25; letter-spacing: -0.015em; font-weight: 600;
        }
        .search-result-excerpt {
          font-family: var(--font-ui); font-size: 13px; color: var(--color-secondary);
          line-height: 1.55; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .search-sidebar { display: flex; flex-direction: column; gap: 32px; position: sticky; top: 80px; }
        .search-sidebar-block { display: flex; flex-direction: column; }
        .search-tool-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 0;
          border-bottom: 1px solid var(--color-border); text-decoration: none;
          transition: color 150ms ease;
        }
        .search-tool-item:hover .search-tool-name { color: var(--color-primary); }
        .search-tool-logo { border-radius: 6px; object-fit: cover; border: 1px solid var(--color-border); }
        .search-tool-name {
          font-family: var(--font-ui); font-size: 14px; font-weight: 600;
          color: var(--color-text); transition: color 150ms ease;
        }
        .search-tool-cat { font-family: var(--font-ui); font-size: 11px; color: var(--color-muted); }
        .search-book-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 0;
          border-bottom: 1px solid var(--color-border); text-decoration: none;
        }
        .search-book-cover { position: relative; width: 40px; height: 54px; flex-shrink: 0; }
        .search-book-cover-img { object-fit: cover; }
        .search-book-title {
          font-family: var(--font-headline); font-size: 14px; font-weight: 600;
          color: var(--color-text); transition: color 150ms ease; line-height: 1.3;
        }
        .search-book-item:hover .search-book-title { color: var(--color-primary); }
        .search-book-author { font-family: var(--font-ui); font-size: 11px; color: var(--color-muted); }
        @media (max-width: 900px) {
          .search-results-layout { grid-template-columns: 1fr; }
          .search-sidebar { position: static; }
        }
        @media (max-width: 640px) {
          .search-result-item { grid-template-columns: 100px 1fr; }
          .search-result-img { width: 100px; height: 80px; }
        }
      `}</style>
    </>
  );
}
