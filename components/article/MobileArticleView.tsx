"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Menu,
  X,
  Twitter,
  Linkedin,
  Link2,
  Bookmark,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Share2,
} from "lucide-react";
import type { FormattedArticle } from "@/lib/articles";
import AdPlaceholder from "@/components/common/AdPlaceholder";
import Logo from "@/components/ui/Logo";
import Wordmark from "@/components/ui/Wordmark";

export interface TocItem {
  id: string;
  text: string;
}

export interface TagItem {
  id: string;
  name: string;
  slug: string;
}

interface MobileArticleViewProps {
  article: {
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    content?: string | null;
    publishedAt?: Date | string | null;
    readingTime?: number | null;
    featuredImage?: string | null;
    image?: string | null;
    category?: { name: string; slug: string } | null;
    author?: { name?: string | null; image?: string | null } | null;
  };
  relatedArticles: FormattedArticle[];
  trendingArticles: FormattedArticle[];
  latestArticles: FormattedArticle[];
  prevArticle?: { slug: string; title: string } | null;
  nextArticle?: { slug: string; title: string } | null;
  tocItems: TocItem[];
  tags: TagItem[];
}

export default function MobileArticleView({
  article,
  relatedArticles,
  trendingArticles,
  latestArticles,
  prevArticle,
  nextArticle,
  tocItems,
  tags,
}: MobileArticleViewProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const categoryName = article.category?.name || "General";
  const categorySlug = article.category?.slug || "general";
  const authorName = article.author?.name || "Startup Brief Admin";
  const heroImg =
    article.featuredImage ||
    article.image ||
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop&auto=format";

  const publishedDateStr = article.publishedAt
    ? new Date(article.publishedAt)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    : "AUG 1, 2026";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(article.title);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );
    }
  };

  const shareToLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank"
      );
    }
  };

  const categories = [
    { name: "HOME", href: "/" },
    { name: "AI", href: "/ai" },
    { name: "STARTUPS", href: "/startups" },
    { name: "FOUNDERS", href: "/founders" },
    { name: "FUNDING", href: "/funding" },
    { name: "AI TOOLS", href: "/tools" },
    { name: "BUSINESS", href: "/business" },
    { name: "TECHNOLOGY", href: "/technology" },
  ];

  return (
    <div className="mobile-article-root">
      {/* ─── 1. STICKY MOBILE HEADER ─── */}
      <header className="mobile-sticky-header">
        <div className="mobile-header-inner">
          <Link href="/" className="mobile-logo-link" aria-label="Startup Brief Home">
            <Wordmark variant="light" size="mobile" />
          </Link>

          <div className="mobile-header-actions">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="mobile-header-icon-btn"
              aria-label="Search articles"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              className="mobile-header-icon-btn"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* EXPANDABLE MOBILE SEARCH INPUT */}
        {searchOpen && (
          <div className="mobile-search-expand">
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <Search size={16} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search news & analysis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="mobile-search-close-btn"
              >
                <X size={16} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ─── HAMBURGER DRAWER MENU ─── */}
      {drawerOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="mobile-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <Wordmark variant="light" size="mobile" />
              <button
                onClick={() => setDrawerOpen(false)}
                className="drawer-close-btn"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="drawer-nav">
              <span className="drawer-nav-label">CATEGORIES</span>
              <ul className="drawer-menu-list">
                {categories.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="drawer-menu-link"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="drawer-footer">
              <Link
                href="/newsletter"
                className="drawer-subscribe-btn"
                onClick={() => setDrawerOpen(false)}
              >
                SUBSCRIBE TO NEWSLETTER
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="mobile-content-wrap">
        {/* ─── 2. BREADCRUMB ─── */}
        <nav className="mobile-breadcrumb-nav" aria-label="Breadcrumb">
          <Link href="/" className="mobile-crumb-link">
            Home
          </Link>
          <span className="mobile-crumb-sep">/</span>
          <Link
            href={`/${categorySlug}`}
            className="mobile-crumb-link"
          >
            {categoryName}
          </Link>
          <span className="mobile-crumb-sep">/</span>
          <span className="mobile-crumb-current" aria-current="page">
            {article.title}
          </span>
        </nav>

        {/* ─── 3. CATEGORY ─── */}
        <div className="mobile-category-wrap">
          <Link href={`/${categorySlug}`} className="mobile-category-badge">
            {categoryName.toUpperCase()}
          </Link>
        </div>

        {/* ─── 4. LARGE HEADLINE ─── */}
        <h1 className="mobile-article-headline">{article.title}</h1>

        {/* ─── 5. SUBTITLE ─── */}
        {article.excerpt && (
          <p className="mobile-article-subtitle">{article.excerpt}</p>
        )}

        {/* ─── 6. AUTHOR, DATE, READING TIME ─── */}
        <div className="mobile-author-block">
          <div className="mobile-author-avatar">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div className="mobile-author-details">
            <span className="mobile-author-name">By {authorName}</span>
            <div className="mobile-author-submeta">
              <span>{publishedDateStr}</span>
              <span className="meta-dot">•</span>
              <span>{article.readingTime || 5} MIN READ</span>
            </div>
          </div>
        </div>

        {/* ─── 7. SHARE BUTTONS ─── */}
        <div className="mobile-share-row" aria-label="Share options">
          <button
            onClick={shareToTwitter}
            className="mobile-share-btn twitter"
            title="Share on Twitter"
          >
            <Twitter size={15} />
            <span>Tweet</span>
          </button>

          <button
            onClick={shareToLinkedIn}
            className="mobile-share-btn linkedin"
            title="Share on LinkedIn"
          >
            <Linkedin size={15} />
            <span>Share</span>
          </button>

          <button
            onClick={copyToClipboard}
            className="mobile-share-btn copy"
            title="Copy link"
          >
            {copied ? <Check size={15} /> : <Link2 size={15} />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`mobile-share-btn bookmark ${bookmarked ? "active" : ""}`}
            title="Save article"
          >
            <Bookmark size={15} fill={bookmarked ? "#ff6a00" : "none"} />
            <span>{bookmarked ? "Saved" : "Save"}</span>
          </button>
        </div>

        {/* ─── 8. FEATURED IMAGE ─── */}
        <div className="mobile-featured-img-wrap">
          <Image
            src={heroImg}
            alt={article.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 768px"
            className="mobile-featured-img"
          />
        </div>

        {/* ─── TOC ACCORDION (HIDE BY DEFAULT) ─── */}
        {tocItems && tocItems.length > 0 && (
          <div className="mobile-toc-accordion-box">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="mobile-toc-toggle-btn"
              aria-expanded={tocOpen}
            >
              <div className="toc-title-left">
                <span className="toc-main-label">Table of Contents</span>
                <span className="toc-count">({tocItems.length} Sections)</span>
              </div>
              <ChevronDown
                size={18}
                className={`toc-chevron ${tocOpen ? "open" : ""}`}
              />
            </button>

            {tocOpen && (
              <div className="mobile-toc-content-list">
                <ol className="mobile-toc-ol">
                  {tocItems.map((item, idx) => (
                    <li key={item.id || idx} className="mobile-toc-li">
                      <a
                        href={`#${item.id}`}
                        onClick={() => setTocOpen(false)}
                        className="mobile-toc-anchor"
                      >
                        <span className="toc-idx">{idx + 1}.</span>
                        <span className="toc-txt">{item.text.replace(/^\d+\.\s*/, "")}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* ─── 9. ARTICLE CONTENT ─── */}
        <div className="mobile-prose-body">
          {/* SECTION 1 */}
          <div id="section-1" className="mobile-section-anchor">
            <h2 className="mobile-prose-h2">1. Executive Summary &amp; Overview</h2>
            <p className="mobile-prose-p drop-cap">
              {article.excerpt ||
                "In recent months, the landscape of technology, artificial intelligence, and startup capital allocation has undergone a profound transformation. As infrastructure matures, founders are deploying next-generation agentic systems directly into core enterprise workflows."}
            </p>
            <p className="mobile-prose-p">
              Built on high-density silicon and distributed models, this milestone represents a fundamental shift in how applications are architected, delivered, and scaled across global markets.
            </p>
          </div>

          {/* ─── 10. ADVERTISEMENT 1 ─── */}
          <AdPlaceholder format="responsive" />

          {/* SECTION 2 */}
          <div id="section-2" className="mobile-section-anchor">
            <h2 className="mobile-prose-h2">2. Key Market Takeaways</h2>
            <ul className="mobile-bullet-list">
              <li>Crosses major milestone in active enterprise adoption and global throughput.</li>
              <li>Capital efficiency remains top priority as VCs prioritize positive unit economics.</li>
              <li>Specialized domain models outperform generic LLMs across specialized vertical workflows.</li>
              <li>Regulatory and data compliance requirements continue to shape international expansion.</li>
            </ul>
          </div>

          {/* EDITORIAL BLOCKQUOTE */}
          <blockquote className="mobile-blockquote">
            <p>&ldquo;Building model-native applications requires a fundamental shift in how we architect data, identity, and customer trust.&rdquo;</p>
            <cite>— {authorName}, Startup Brief Editorial</cite>
          </blockquote>

          {/* ─── 11. CONTINUE READING DIVIDER ─── */}
          <div className="mobile-continue-reading-divider">
            <span className="continue-reading-line"></span>
            <span className="continue-reading-text">CONTINUE READING</span>
            <span className="continue-reading-line"></span>
          </div>

          {/* SECTION 3 */}
          <div id="section-3" className="mobile-section-anchor">
            <h2 className="mobile-prose-h2">3. Technical Architecture &amp; Analysis</h2>
            <p className="mobile-prose-p">
              To maintain low latency and high availability under heavy multi-tenant load, engineering teams are adopting asynchronous stream processing combined with edge-cached inference engines.
            </p>

            {/* RESPONSIVE DATA TABLE */}
            <div className="mobile-table-scroll-wrapper">
              <table className="mobile-editorial-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Legacy</th>
                    <th>2026 Target</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Latency (p99)</td>
                    <td>450ms</td>
                    <td>42ms</td>
                    <td className="hl-orange">-90.6%</td>
                  </tr>
                  <tr>
                    <td>Token Cost</td>
                    <td>$0.03 / 1k</td>
                    <td>$0.0008 / 1k</td>
                    <td className="hl-orange">-97.3%</td>
                  </tr>
                  <tr>
                    <td>SLA Uptime</td>
                    <td>99.9%</td>
                    <td>99.995%</td>
                    <td className="hl-orange">+0.095%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── 12. ADVERTISEMENT 2 ─── */}
          <AdPlaceholder format="responsive" />

          {/* SECTION 4 & 5 */}
          <div id="section-4" className="mobile-section-anchor">
            <h2 className="mobile-prose-h2">4. Industry Benchmarks &amp; Data</h2>
            <p className="mobile-prose-p">
              Institutional investors are reallocating capital from legacy SaaS into intelligence-first software platforms. Early data suggests customer acquisition costs (CAC) decrease by up to 35% when product value is demonstrated instantly.
            </p>
          </div>

          <div id="section-5" className="mobile-section-anchor">
            <h2 className="mobile-prose-h2">5. Strategic Implications &amp; FAQ</h2>
            <div className="mobile-faq-list">
              <div className="mobile-faq-item">
                <h4 className="mobile-faq-q">
                  <HelpCircle size={16} color="#ff6a00" /> What does this mean for early-stage founders?
                </h4>
                <p className="mobile-faq-a">
                  Founders can build multi-million dollar ARR businesses with lean teams of 3–5 engineers by outsourcing non-core infrastructure to AI-native cloud tools.
                </p>
              </div>
              <div className="mobile-faq-item">
                <h4 className="mobile-faq-q">
                  <HelpCircle size={16} color="#ff6a00" /> How will venture capital allocation shift in late 2026?
                </h4>
                <p className="mobile-faq-a">
                  VC firms will prioritize companies demonstrating net dollar retention above 120% and clear proprietary data moats.
                </p>
              </div>
            </div>

            {/* SOURCES */}
            <div className="mobile-sources-card">
              <span className="sources-head">PRIMARY SOURCES &amp; ATTRIBUTION:</span>
              <ul className="sources-links">
                <li>
                  <a href="https://openai.com" target="_blank" rel="noreferrer">
                    OpenAI Benchmark Documentation <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  <a href="https://sequoiacap.com" target="_blank" rel="noreferrer">
                    Sequoia Capital Market Analysis <ExternalLink size={10} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── 13. RELATED STORIES (HORIZONTAL CARDS) ─── */}
        {relatedArticles.length > 0 && (
          <section className="mobile-stories-section">
            <div className="mobile-section-header">
              <h3 className="mobile-section-title">RELATED STORIES</h3>
            </div>
            <div className="mobile-horizontal-cards-list">
              {relatedArticles.map((rel) => (
                <article key={rel.id} className="mobile-horizontal-card">
                  <Link href={`/article/${rel.slug}`} className="card-thumb-link">
                    <div className="horizontal-card-thumb">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="90px"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="horizontal-card-info">
                    <span className="card-cat-tag">{rel.category}</span>
                    <h4 className="horizontal-card-headline">
                      <Link href={`/article/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <span className="horizontal-card-meta">{rel.publishedAt}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ─── 14. TRENDING (HORIZONTAL CARDS) ─── */}
        {trendingArticles.length > 0 && (
          <section className="mobile-stories-section">
            <div className="mobile-section-header">
              <h3 className="mobile-section-title">TRENDING NOW</h3>
            </div>
            <div className="mobile-horizontal-cards-list">
              {trendingArticles.slice(0, 4).map((trend, idx) => (
                <article key={trend.id} className="mobile-horizontal-card">
                  <Link href={`/article/${trend.slug}`} className="card-thumb-link">
                    <div className="horizontal-card-thumb">
                      <Image
                        src={trend.image}
                        alt={trend.title}
                        fill
                        sizes="90px"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                      <span className="trend-num-badge">#{idx + 1}</span>
                    </div>
                  </Link>
                  <div className="horizontal-card-info">
                    <span className="card-cat-tag">{trend.category}</span>
                    <h4 className="horizontal-card-headline">
                      <Link href={`/article/${trend.slug}`}>{trend.title}</Link>
                    </h4>
                    <span className="horizontal-card-meta">{trend.publishedAt}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ─── 15. LATEST STORIES (HORIZONTAL CARDS) ─── */}
        {latestArticles.length > 0 && (
          <section className="mobile-stories-section">
            <div className="mobile-section-header">
              <h3 className="mobile-section-title">LATEST STORIES</h3>
            </div>
            <div className="mobile-horizontal-cards-list">
              {latestArticles.slice(0, 4).map((lat) => (
                <article key={lat.id} className="mobile-horizontal-card">
                  <Link href={`/article/${lat.slug}`} className="card-thumb-link">
                    <div className="horizontal-card-thumb">
                      <Image
                        src={lat.image}
                        alt={lat.title}
                        fill
                        sizes="90px"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="horizontal-card-info">
                    <span className="card-cat-tag">{lat.category}</span>
                    <h4 className="horizontal-card-headline">
                      <Link href={`/article/${lat.slug}`}>{lat.title}</Link>
                    </h4>
                    <span className="horizontal-card-meta">{lat.publishedAt}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ─── 16. ADVERTISEMENT 3 ─── */}
        <AdPlaceholder format="responsive" />

        {/* ─── 17. PREVIOUS / NEXT ARTICLE ─── */}
        <div className="mobile-prev-next-container">
          <div className="mobile-nav-card">
            {prevArticle ? (
              <Link href={`/article/${prevArticle.slug}`} className="mobile-nav-link">
                <span className="nav-dir-tag">
                  <ArrowLeft size={12} /> PREVIOUS STORY
                </span>
                <span className="nav-card-title">{prevArticle.title}</span>
              </Link>
            ) : (
              <Link href="/" className="mobile-nav-link">
                <span className="nav-dir-tag">
                  <ArrowLeft size={12} /> PREVIOUS STORY
                </span>
                <span className="nav-card-title">OpenAI Launches GPT-5</span>
              </Link>
            )}
          </div>

          <div className="mobile-nav-card">
            {nextArticle ? (
              <Link href={`/article/${nextArticle.slug}`} className="mobile-nav-link right">
                <span className="nav-dir-tag right">
                  NEXT STORY <ArrowRight size={12} />
                </span>
                <span className="nav-card-title">{nextArticle.title}</span>
              </Link>
            ) : (
              <Link href="/" className="mobile-nav-link right">
                <span className="nav-dir-tag right">
                  NEXT STORY <ArrowRight size={12} />
                </span>
                <span className="nav-card-title">Stripe Hits $100B Valuation</span>
              </Link>
            )}
          </div>
        </div>

        {/* ─── 18. TAGS ─── */}
        {tags && tags.length > 0 && (
          <div className="mobile-tags-section">
            <span className="mobile-tags-label">TAGS:</span>
            <div className="mobile-tags-chips">
              {tags.map((t) => (
                <Link key={t.id} href={`/tag/${t.slug}`} className="mobile-tag-chip">
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── 19. NEWSLETTER ─── */}
        <div className="mobile-newsletter-card">
          <span className="mobile-nl-badge">DAILY BRIEFING</span>
          <h3 className="mobile-nl-title">Stay Ahead in Tech &amp; AI</h3>
          <p className="mobile-nl-desc">
            Get the daily startup brief trusted by 50,000+ founders &amp; investors directly in your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully!");
            }}
            className="mobile-nl-form"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="mobile-nl-input"
            />
            <button type="submit" className="mobile-nl-submit">
              SUBSCRIBE NOW
            </button>
          </form>
        </div>

        {/* ─── 20. FOOTER ─── */}
        <footer className="mobile-article-footer">
          <div className="mobile-footer-top">
            <Link href="/" className="mobile-footer-logo">
              Startup Brief<span className="mobile-logo-dot">.</span>
            </Link>
            <p className="mobile-footer-tagline">
              The daily intelligence dispatch for startup founders, investors, and engineers.
            </p>
          </div>
          <div className="mobile-footer-links">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
          <div className="mobile-footer-bottom">
            <span>&copy; 2026 Startup Brief. All rights reserved.</span>
          </div>
        </footer>
      </div>

      {/* ─── PREMIUM MOBILE CSS STYLES ─── */}
      <style>{`
        .mobile-article-root {
          background-color: #ffffff;
          color: #0f172a;
          font-family: var(--font-ui), system-ui, -apple-system, sans-serif;
          width: 100%;
          overflow-x: hidden;
        }

        /* STICKY MOBILE HEADER */
        .mobile-sticky-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #0f172a;
          color: #ffffff;
          border-bottom: 3px solid #ff6a00;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }
        .mobile-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 54px;
          padding: 0 16px;
        }
        .mobile-logo-link {
          display: inline-flex;
          align-items: baseline;
          text-decoration: none;
        }
        .mobile-logo-text {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
        }
        .mobile-logo-dot {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 24px;
          font-weight: 900;
          color: #ff6a00;
        }
        .mobile-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mobile-header-icon-btn {
          background: transparent;
          border: none;
          color: #ffffff;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 4px;
        }
        .mobile-header-icon-btn:active {
          background: rgba(255,255,255,0.15);
        }

        /* SEARCH OVERLAY */
        .mobile-search-expand {
          background: #1e293b;
          padding: 10px 16px;
          border-top: 1px solid #334155;
        }
        .mobile-search-form {
          display: flex;
          align-items: center;
          background: #ffffff;
          border-radius: 6px;
          padding: 0 10px;
        }
        .search-icon-inside {
          color: #64748b;
          flex-shrink: 0;
        }
        .mobile-search-input {
          width: 100%;
          border: none;
          outline: none;
          padding: 10px;
          font-size: 14px;
          font-family: var(--font-ui), sans-serif;
          color: #0f172a;
          background: transparent;
        }
        .mobile-search-close-btn {
          background: none;
          border: none;
          color: #64748b;
          padding: 6px;
          cursor: pointer;
        }

        /* DRAWER MENU */
        .mobile-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          z-index: 999;
          display: flex;
          justify-content: flex-end;
        }
        .mobile-drawer-panel {
          width: 82%;
          max-width: 320px;
          height: 100%;
          background: #0f172a;
          color: #ffffff;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: -4px 0 24px rgba(0,0,0,0.4);
        }
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #334155;
        }
        .drawer-logo {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
        }
        .drawer-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }
        .drawer-nav {
          margin-top: 24px;
          flex: 1;
          overflow-y: auto;
        }
        .drawer-nav-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          display: block;
          margin-bottom: 12px;
        }
        .drawer-menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .drawer-menu-link {
          font-size: 15px;
          font-weight: 700;
          color: #f8fafc;
          text-decoration: none;
          letter-spacing: 0.05em;
          display: block;
        }
        .drawer-footer {
          padding-top: 20px;
          border-top: 1px solid #334155;
        }
        .drawer-subscribe-btn {
          display: block;
          text-align: center;
          background: #ff6a00;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          padding: 12px 16px;
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.08em;
        }

        /* MAIN CONTENT WRAPPER */
        .mobile-content-wrap {
          padding: 16px 16px 40px 16px;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* BREADCRUMB */
        .mobile-breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #64748b;
          margin-bottom: 14px;
          overflow: hidden;
          white-space: nowrap;
        }
        .mobile-crumb-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 600;
        }
        .mobile-crumb-sep { color: #cbd5e1; font-size: 10px; }
        .mobile-crumb-current {
          color: #0f172a;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* CATEGORY BADGE */
        .mobile-category-wrap { margin-bottom: 8px; }
        .mobile-category-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #ff6a00;
          text-transform: uppercase;
          text-decoration: none;
        }

        /* LARGE HEADLINE */
        .mobile-article-headline {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(34px, 8.5vw, 40px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #0f172a;
          margin-bottom: 12px;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        /* SUBTITLE */
        .mobile-article-subtitle {
          font-family: var(--font-ui), sans-serif;
          font-size: 20px;
          line-height: 1.42;
          color: #475569;
          margin-bottom: 18px;
          font-weight: 400;
        }

        /* AUTHOR METADATA */
        .mobile-author-block {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 16px;
        }
        .mobile-author-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #0f172a;
          color: #ffffff;
          font-weight: 800;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mobile-author-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mobile-author-name {
          font-size: 13px;
          font-weight: 800;
          color: #0f172a;
        }
        .mobile-author-submeta {
          font-size: 11px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        /* SHARE BUTTONS ROW */
        .mobile-share-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }
        .mobile-share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 4px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          font-size: 11px;
          font-weight: 700;
          border-radius: 6px;
          cursor: pointer;
          transition: background 150ms ease, color 150ms ease;
        }
        .mobile-share-btn:active {
          background: #f1f5f9;
        }
        .mobile-share-btn.bookmark.active {
          border-color: #ff6a00;
          color: #ff6a00;
          background: #fff7ed;
        }

        /* FEATURED IMAGE */
        .mobile-featured-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
          background: #0f172a;
          margin-bottom: 20px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .mobile-featured-img {
          object-fit: cover;
        }

        /* TOC ACCORDION (HIDE BY DEFAULT) */
        .mobile-toc-accordion-box {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          margin-bottom: 24px;
          overflow: hidden;
        }
        .mobile-toc-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: #f8fafc;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .toc-title-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .toc-main-label {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.02em;
        }
        .toc-count {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }
        .toc-chevron {
          color: #0f172a;
          transition: transform 200ms ease;
        }
        .toc-chevron.open {
          transform: rotate(180deg);
        }
        .mobile-toc-content-list {
          padding: 0 16px 16px 16px;
          border-top: 1px solid #e2e8f0;
          background: #ffffff;
        }
        .mobile-toc-ol {
          list-style: none;
          padding: 0;
          margin: 12px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mobile-toc-anchor {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          text-decoration: none;
          line-height: 1.4;
        }
        .mobile-toc-anchor:hover {
          color: #ff6a00;
        }
        .toc-idx {
          font-weight: 800;
          color: #ff6a00;
          font-size: 12px;
          flex-shrink: 0;
        }

        /* ARTICLE PROSE BODY */
        .mobile-prose-body {
          font-size: 18px;
          line-height: 1.75;
          color: #1e293b;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }
        .mobile-prose-h2 {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 20px 0 10px 0;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }
        .mobile-prose-p {
          margin: 0;
          word-break: break-word;
        }
        .mobile-prose-p.drop-cap::first-letter {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 52px;
          font-weight: 900;
          float: left;
          line-height: 0.8;
          margin-right: 8px;
          color: #ff6a00;
        }
        .mobile-bullet-list {
          padding-left: 20px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 17px;
        }

        /* BLOCKQUOTE */
        .mobile-blockquote {
          border-left: 4px solid #ff6a00;
          background: #fff7ed;
          padding: 16px;
          border-radius: 0 8px 8px 0;
          margin: 12px 0;
        }
        .mobile-blockquote p {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 19px;
          font-style: italic;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.35;
        }
        .mobile-blockquote cite {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          font-style: normal;
        }

        /* CONTINUE READING DIVIDER */
        .mobile-continue-reading-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }
        .continue-reading-line {
          flex: 1;
          height: 1px;
          background: #cbd5e1;
        }
        .continue-reading-text {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
          color: #ff6a00;
        }

        /* RESPONSIVE DATA TABLE */
        .mobile-table-scroll-wrapper {
          overflow-x: auto;
          margin: 12px 0;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
        }
        .mobile-editorial-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          text-align: left;
          min-width: 320px;
        }
        .mobile-editorial-table th,
        .mobile-editorial-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
        }
        .mobile-editorial-table th {
          background: #0f172a;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
        }
        .hl-orange {
          color: #ff6a00;
          font-weight: 800;
        }

        /* ADS CARDS */
        .mobile-ad-card {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-left: 4px solid #ff6a00;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
        }
        .mobile-ad-card.dark-vercel {
          background: #0f172a;
          color: #ffffff;
          border: 1px solid #334155;
          border-left: 4px solid #ff6a00;
        }
        .ad-badge {
          font-size: 9px;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 8px;
        }
        .ad-badge.dark { color: #94a3b8; }
        .mobile-ad-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .vercel-logo-tag {
          font-size: 12px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .mobile-ad-headline {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 17px;
          font-weight: 800;
          margin: 0;
          color: #0f172a;
        }
        .mobile-ad-headline.white { color: #ffffff; }
        .mobile-ad-text {
          font-size: 12px;
          color: #475569;
          margin: 0 0 8px 0;
          line-height: 1.4;
        }
        .mobile-ad-text.light { color: #cbd5e1; }
        .mobile-ad-button {
          display: inline-block;
          align-self: flex-start;
          font-size: 11px;
          font-weight: 800;
          padding: 8px 14px;
          background: #0f172a;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
        }
        .mobile-ad-button.orange { background: #ff6a00; }

        /* FAQ LIST */
        .mobile-faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 12px;
        }
        .mobile-faq-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 14px;
        }
        .mobile-faq-q {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }
        .mobile-faq-a {
          font-size: 13px;
          color: #475569;
          margin: 0;
          line-height: 1.45;
        }

        /* SOURCES BOX */
        .mobile-sources-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 12px 14px;
          margin-top: 16px;
        }
        .sources-head {
          font-size: 10px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 6px;
        }
        .sources-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
        }
        .sources-links a {
          color: #ff6a00;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* STORIES SECTIONS & HORIZONTAL MOBILE CARDS */
        .mobile-stories-section {
          margin-top: 32px;
          padding-top: 20px;
          border-top: 2px solid #0f172a;
        }
        .mobile-section-header {
          margin-bottom: 14px;
        }
        .mobile-section-title {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: #0f172a;
          margin: 0;
          text-transform: uppercase;
        }
        .mobile-horizontal-cards-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mobile-horizontal-card {
          display: grid;
          grid-template-columns: 84px 1fr;
          gap: 12px;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .card-thumb-link { display: block; }
        .horizontal-card-thumb {
          position: relative;
          width: 84px;
          height: 84px;
          border-radius: 6px;
          overflow: hidden;
          background: #f1f5f9;
          flex-shrink: 0;
        }
        .trend-num-badge {
          position: absolute;
          top: 4px;
          left: 4px;
          background: #0f172a;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 3px;
        }
        .horizontal-card-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          overflow: hidden;
        }
        .card-cat-tag {
          font-size: 9px;
          font-weight: 800;
          color: #ff6a00;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .horizontal-card-headline {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.28;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .horizontal-card-headline a {
          color: #0f172a;
          text-decoration: none;
        }
        .horizontal-card-meta {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
        }

        /* PREV / NEXT NAV CARDS */
        .mobile-prev-next-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 2px solid #0f172a;
        }
        .mobile-nav-card {
          width: 100%;
        }
        .mobile-nav-link {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #f8fafc;
          text-decoration: none;
        }
        .mobile-nav-link.right { text-align: right; }
        .nav-dir-tag {
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .nav-dir-tag.right { justify-content: flex-end; }
        .nav-card-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.3;
        }

        /* TAGS SECTION */
        .mobile-tags-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }
        .mobile-tags-label {
          font-size: 10px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.1em;
        }
        .mobile-tags-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .mobile-tag-chip {
          font-size: 11px;
          font-weight: 700;
          background: #f1f5f9;
          color: #0f172a;
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid #cbd5e1;
          text-decoration: none;
        }

        /* NEWSLETTER CARD */
        .mobile-newsletter-card {
          background: #0f172a;
          color: #ffffff;
          border-radius: 12px;
          padding: 20px;
          margin-top: 32px;
          border-top: 4px solid #ff6a00;
        }
        .mobile-nl-badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          display: block;
          margin-bottom: 6px;
        }
        .mobile-nl-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 6px 0;
        }
        .mobile-nl-desc {
          font-size: 12px;
          color: #94a3b8;
          margin: 0 0 16px 0;
          line-height: 1.45;
        }
        .mobile-nl-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mobile-nl-input {
          width: 100%;
          padding: 12px;
          font-size: 13px;
          border: 1px solid #334155;
          border-radius: 6px;
          outline: none;
          background: #1e293b;
          color: #ffffff;
        }
        .mobile-nl-submit {
          width: 100%;
          padding: 12px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: #ff6a00;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        /* FOOTER */
        .mobile-article-footer {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .mobile-footer-top { display: flex; flex-direction: column; gap: 6px; }
        .mobile-footer-logo {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          text-decoration: none;
        }
        .mobile-footer-tagline {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }
        .mobile-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .mobile-footer-links a {
          color: #475569;
          text-decoration: none;
        }
        .mobile-footer-bottom {
          font-size: 10px;
          color: #94a3b8;
        }

        /* EXTRA BREAKPOINT ADJUSTMENTS */
        @media (max-width: 360px) {
          .mobile-article-headline { font-size: 30px; }
          .mobile-article-subtitle { font-size: 18px; }
          .mobile-share-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
