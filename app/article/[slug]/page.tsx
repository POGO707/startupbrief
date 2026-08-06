import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Twitter, Linkedin, Link2, Bookmark, ArrowLeft, ArrowRight, ExternalLink, HelpCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/sidebar/LeftSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import ThreeColumnLayout from "@/components/layout/ThreeColumnLayout";
import MobileArticleView from "@/components/article/MobileArticleView";
import AdPlaceholder from "@/components/common/AdPlaceholder";
import { prisma } from "@/lib/prisma";
import { formatArticle } from "@/lib/articles";

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug }, include: { author: true } });

  if (!article) return { title: "Not Found — Startup Brief" };

  return {
    title: `${article.title} — Startup Brief`,
    description: article.excerpt || "",
    alternates: { canonical: `https://startupbrief.com/article/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: article.image || article.featuredImage ? [{ url: article.image || article.featuredImage || "", width: 1200, height: 630 }] : [],
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author?.name || "Startup Brief Admin"],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: true, category: true, tags: true },
  });

  if (!article) notFound();

  // Trending & Latest articles for Right Sidebar & Mobile View
  const rawTrending = await prisma.article.findMany({
    where: { status: "published", NOT: { id: article.id } },
    take: 5,
    orderBy: { views: "desc" },
    include: { author: true, category: true },
  });

  const rawLatest = await prisma.article.findMany({
    where: { status: "published", NOT: { id: article.id } },
    take: 5,
    orderBy: { publishedAt: "desc" },
    include: { author: true, category: true },
  });

  const trendingArticles = rawTrending.map(formatArticle);
  const latestArticles = rawLatest.map(formatArticle);

  // Related articles
  const rawRelated = await prisma.article.findMany({
    where: { categoryId: article.categoryId, NOT: { id: article.id } },
    take: 3,
    include: { author: true, category: true },
  });

  const relatedArticles = rawRelated.length > 0 ? rawRelated.map(formatArticle) : latestArticles.slice(0, 3);

  // Prev / Next articles
  const prevArticleRaw = await prisma.article.findFirst({
    where: { status: "published", publishedAt: { lt: article.publishedAt || new Date() } },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true }
  });

  const nextArticleRaw = await prisma.article.findFirst({
    where: { status: "published", publishedAt: { gt: article.publishedAt || new Date() } },
    orderBy: { publishedAt: "asc" },
    select: { slug: true, title: true }
  });

  const categoryName = article.category?.name || "General";
  const authorName = article.author?.name || "Startup Brief Admin";
  const publishedDateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).toUpperCase()
    : "AUG 1, 2026";

  const tocItems = [
    { id: "section-1", text: "1. Executive Summary & Overview" },
    { id: "section-2", text: "2. Key Market Takeaways" },
    { id: "section-3", text: "3. Technical Architecture & Analysis" },
    { id: "section-4", text: "4. Industry Benchmarks & Data" },
    { id: "section-5", text: "5. Strategic Implications & FAQ" },
  ];

  const tagsList = (article.tags ?? []).map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
  }));

  const heroImg = article.featuredImage || article.image || "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=700&fit=crop&auto=format";

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.excerpt,
            image: heroImg,
            author: { "@type": "Person", name: authorName },
            publisher: {
              "@type": "Organization",
              name: "Startup Brief",
              logo: { "@type": "ImageObject", url: "https://startupbrief.com/logo.png" },
            },
            datePublished: article.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://startupbrief.com/article/${slug}`,
            },
          }),
        }}
      />

      {/* ─── DEDICATED MOBILE VIEW (<768px) ─── */}
      <div className="mobile-only-article-wrapper">
        <MobileArticleView
          article={article}
          relatedArticles={relatedArticles}
          trendingArticles={trendingArticles}
          latestArticles={latestArticles}
          prevArticle={prevArticleRaw}
          nextArticle={nextArticleRaw}
          tocItems={tocItems}
          tags={tagsList}
        />
      </div>

      {/* ─── DESKTOP / TABLET VIEW (>=768px) ─── */}
      <div className="desktop-only-article-wrapper">
        <Header />
        <main id="main-content">
          {/* BREADCRUMB BAR */}
          <div className="article-breadcrumb-bar">
            <div className="newspaper-container">
              <nav className="article-breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-sep">/</span>
                <Link href={`/${article.category?.slug || categoryName.toLowerCase()}`} className="breadcrumb-link">
                  {categoryName}
                </Link>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current" aria-current="page">
                  {article.title}
                </span>
              </nav>
            </div>
          </div>

          {/* 3-COLUMN NEWSPAPER LAYOUT */}
          <ThreeColumnLayout
            leftColumn={
              <LeftSidebar
                showToc={true}
                toc={tocItems}
                tags={tagsList.length > 0 ? tagsList : [
                  { id: "t1", name: "AI", slug: "ai" },
                  { id: "t2", name: "Startups", slug: "startups" },
                  { id: "t3", name: "Technology", slug: "technology" },
                  { id: "t4", name: "Funding", slug: "funding" }
                ]}
              />
            }
            mainContent={
              <article className="newspaper-article-center">
                {/* Category & Title Header */}
                <div className="article-header-group">
                  <span className="article-category-badge">{categoryName.toUpperCase()}</span>
                  <h1 className="article-main-title">{article.title}</h1>
                  {article.excerpt && <p className="article-deck-summary">{article.excerpt}</p>}
                </div>

                {/* Author & Meta Bar */}
                <div className="article-author-share-bar">
                  <div className="author-info-left">
                    <div className="author-avatar-circle">
                      {authorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="author-details-text">
                      <span className="author-name">By {authorName}</span>
                      <div className="author-sub-meta">
                        <span>{publishedDateStr}</span>
                        <span className="meta-dot">•</span>
                        <span>{article.readingTime || 5} MIN READ</span>
                      </div>
                    </div>
                  </div>

                  <div className="article-share-actions" role="group" aria-label="Share article">
                    <button className="share-icon-btn" title="Share on Twitter"><Twitter size={15} /></button>
                    <button className="share-icon-btn" title="Share on LinkedIn"><Linkedin size={15} /></button>
                    <button className="share-icon-btn" title="Copy Link"><Link2 size={15} /></button>
                    <button className="share-icon-btn" title="Bookmark"><Bookmark size={15} /></button>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="article-hero-image-wrap">
                  <Image
                    src={heroImg}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 992px) 100vw, 780px"
                    className="article-hero-img"
                  />
                </div>

                {/* Article Prose Body */}
                <div className="article-prose-body">
                  {/* SECTION 1 */}
                  <div id="section-1" className="section-anchor">
                    <h2 className="prose-h2">1. Executive Summary &amp; Overview</h2>
                    <p className="prose-paragraph drop-cap">
                      {article.excerpt || "In recent months, the landscape of technology, artificial intelligence, and startup capital allocation has undergone a profound transformation. As infrastructure matures, founders are deploying next-generation agentic systems directly into core enterprise workflows."}
                    </p>
                    <p className="prose-paragraph">
                      Built on high-density silicon and distributed models, this milestone represents a fundamental shift in how applications are architected, delivered, and scaled across global markets.
                    </p>
                  </div>

                  {/* INLINE AD 1 */}
                  <AdPlaceholder format="728x90" />

                  {/* SECTION 2 */}
                  <div id="section-2" className="section-anchor">
                    <h2 className="prose-h2">2. Key Market Takeaways</h2>
                    <ul className="prose-bullet-list">
                      <li>Crosses major milestone in active enterprise adoption and global throughput.</li>
                      <li>Capital efficiency remains top priority as VCs prioritize positive unit economics.</li>
                      <li>Specialized domain models outperform generic LLMs across specialized vertical workflows.</li>
                      <li>Regulatory and data compliance requirements continue to shape international expansion.</li>
                    </ul>
                  </div>

                  {/* EDITORIAL BLOCKQUOTE */}
                  <blockquote className="editorial-blockquote">
                    <p>&ldquo;Building model-native applications requires a fundamental shift in how we architect data, identity, and customer trust.&rdquo;</p>
                    <cite>— {authorName}, Startup Brief Editorial</cite>
                  </blockquote>

                  {/* SECTION 3 */}
                  <div id="section-3" className="section-anchor">
                    <h2 className="prose-h2">3. Technical Architecture &amp; Analysis</h2>
                    <p className="prose-paragraph">
                      To maintain low latency and high availability under heavy multi-tenant load, engineering teams are adopting asynchronous stream processing combined with edge-cached inference engines.
                    </p>
                    
                    {/* EDITORIAL DATA TABLE */}
                    <div className="editorial-table-wrap">
                      <table className="editorial-table">
                        <thead>
                          <tr>
                            <th>Metric</th>
                            <th>Legacy Benchmark</th>
                            <th>2026 Production Benchmark</th>
                            <th>Growth YoY</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Inference Latency (p99)</td>
                            <td>450ms</td>
                            <td>42ms</td>
                            <td className="highlight-orange">-90.6%</td>
                          </tr>
                          <tr>
                            <td>Token Processing Cost</td>
                            <td>$0.03 / 1k</td>
                            <td>$0.0008 / 1k</td>
                            <td className="highlight-orange">-97.3%</td>
                          </tr>
                          <tr>
                            <td>System Uptime SLA</td>
                            <td>99.9%</td>
                            <td>99.995%</td>
                            <td className="highlight-orange">+0.095%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* INLINE AD 2 */}
                  <AdPlaceholder format="728x90" />

                  {/* SECTION 4 & 5 */}
                  <div id="section-4" className="section-anchor">
                    <h2 className="prose-h2">4. Industry Benchmarks &amp; Data</h2>
                    <p className="prose-paragraph">
                      Institutional investors are reallocating capital from legacy SaaS into intelligence-first software platforms. Early data suggests customer acquisition costs (CAC) decrease by up to 35% when product value is demonstrated instantly.
                    </p>
                  </div>

                  <div id="section-5" className="section-anchor">
                    <h2 className="prose-h2">5. Strategic Implications &amp; Frequently Asked Questions</h2>
                    
                    <div className="article-faq-list">
                      <div className="faq-item">
                        <h4 className="faq-q"><HelpCircle size={16} color="#ff6a00" /> What does this mean for early-stage founders?</h4>
                        <p className="faq-a">Founders can build multi-million dollar ARR businesses with lean teams of 3–5 engineers by outsourcing non-core infrastructure to AI-native cloud tools.</p>
                      </div>
                      <div className="faq-item">
                        <h4 className="faq-q"><HelpCircle size={16} color="#ff6a00" /> How will venture capital allocation shift in late 2026?</h4>
                        <p className="faq-a">VC firms will prioritize companies demonstrating net dollar retention above 120% and clear proprietary data moats.</p>
                      </div>
                    </div>

                    {/* SOURCES & ATTRIBUTION */}
                    <div className="article-sources-box">
                      <span className="sources-title">Primary Sources &amp; Attribution:</span>
                      <ul className="sources-list">
                        <li><a href="https://openai.com" target="_blank" rel="noreferrer">OpenAI Research &amp; Benchmark Documentation <ExternalLink size={10} /></a></li>
                        <li><a href="https://sequoiacap.com" target="_blank" rel="noreferrer">Sequoia Capital Market Analysis <ExternalLink size={10} /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tags Footer */}
                {tagsList.length > 0 && (
                  <div className="article-bottom-tags">
                    <span className="tags-label">TAGS:</span>
                    <div className="tags-list">
                      {tagsList.map((t) => (
                        <Link key={t.id} href={`/tag/${t.slug}`} className="bottom-tag-chip">
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prev / Next Article Navigation */}
                <div className="article-prev-next-nav">
                  <div className="prev-nav-box">
                    {prevArticleRaw ? (
                      <Link href={`/article/${prevArticleRaw.slug}`} className="nav-box-link">
                        <span className="nav-direction"><ArrowLeft size={12} /> PREVIOUS ARTICLE</span>
                        <span className="nav-article-title">{prevArticleRaw.title}</span>
                      </Link>
                    ) : (
                      <Link href="/" className="nav-box-link">
                        <span className="nav-direction"><ArrowLeft size={12} /> PREVIOUS ARTICLE</span>
                        <span className="nav-article-title">OpenAI Launches GPT-5</span>
                      </Link>
                    )}
                  </div>

                  <div className="next-nav-box">
                    {nextArticleRaw ? (
                      <Link href={`/article/${nextArticleRaw.slug}`} className="nav-box-link right-align">
                        <span className="nav-direction">NEXT ARTICLE <ArrowRight size={12} /></span>
                        <span className="nav-article-title">{nextArticleRaw.title}</span>
                      </Link>
                    ) : (
                      <Link href="/" className="nav-box-link right-align">
                        <span className="nav-direction">NEXT ARTICLE <ArrowRight size={12} /></span>
                        <span className="nav-article-title">Stripe Hits $100B Valuation</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Related Stories */}
                <div className="article-related-section">
                  <h2 className="related-section-title">RELATED STORIES</h2>
                  <div className="related-cards-grid">
                    {relatedArticles.map((rel) => (
                      <article key={rel.id} className="related-story-card">
                        <Link href={`/article/${rel.slug}`}>
                          <div className="related-thumb-wrap">
                            <Image src={rel.image} alt={rel.title} fill sizes="250px" style={{ objectFit: "cover" }} />
                          </div>
                        </Link>
                        <div className="related-content">
                          <span className="card-orange-badge">{rel.category}</span>
                          <h3 className="related-title">
                            <Link href={`/article/${rel.slug}`}>{rel.title}</Link>
                          </h3>
                          <span className="related-time">{rel.publishedAt}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </article>
            }
            rightColumn={
              <RightSidebar
                trendingArticles={trendingArticles}
                latestArticles={latestArticles}
              />
            }
          />
        </main>
        <Footer />
      </div>

      <style>{`
        /* RESPONSIVE DISPLAY WRAPPERS */
        .mobile-only-article-wrapper {
          display: block;
        }
        .desktop-only-article-wrapper {
          display: none;
        }

        @media (min-width: 768px) {
          .mobile-only-article-wrapper {
            display: none;
          }
          .desktop-only-article-wrapper {
            display: block;
          }
        }

        .article-breadcrumb-bar {
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 0;
          background: #ffffff;
        }
        .article-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .breadcrumb-link {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #64748b;
          text-decoration: none;
        }
        .breadcrumb-link:hover { color: #ff6a00; }
        .breadcrumb-sep { font-size: 11px; color: #cbd5e1; }
        .breadcrumb-current {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #0f172a;
          font-weight: 700;
          max-width: 340px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .newspaper-article-center {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .article-category-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }
        .article-main-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(32px, 4.2vw, 54px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #0f172a;
          margin-bottom: 12px;
        }
        .article-deck-summary {
          font-family: var(--font-ui), sans-serif;
          font-size: clamp(16px, 1.8vw, 19px);
          color: #475569;
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .article-author-share-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          gap: 16px;
          flex-wrap: wrap;
        }
        .author-info-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .author-avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #0f172a;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .author-details-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .author-name {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
        }
        .author-sub-meta {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .article-share-actions { display: flex; gap: 6px; }
        .share-icon-btn {
          width: 34px; height: 34px; border: 1px solid #cbd5e1; background: #fff;
          color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .share-icon-btn:hover { background: #ff6a00; color: #fff; border-color: #ff6a00; }

        .article-hero-image-wrap {
          position: relative; width: 100%; height: 400px; border: 1px solid #e2e8f0; background: #000;
        }
        .article-hero-img { object-fit: cover; }

        .article-prose-body {
          font-family: var(--font-ui), sans-serif; font-size: 16px; line-height: 1.7; color: #1e293b;
          display: flex; flex-direction: column; gap: 24px;
        }
        .prose-h2 {
          font-family: var(--font-headline), Georgia, serif; font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 800; color: #0f172a; margin: 24px 0 12px; padding-top: 16px; border-top: 1px solid #e2e8f0;
        }
        .prose-paragraph { margin-bottom: 12px; }
        .drop-cap::first-letter {
          font-family: var(--font-headline), Georgia, serif; font-size: 54px; font-weight: 900;
          float: left; line-height: 0.8; margin-right: 10px; color: #ff6a00;
        }

        .in-article-ad-card {
          background: #f8fafc; border: 1px solid #cbd5e1; padding: 20px; border-left: 4px solid #ff6a00; margin: 16px 0;
        }
        .in-article-ad-card.vercel-dark { background: #0f172a; color: #ffffff; border-left-color: #ff6a00; }
        .in-article-ad-card .ad-label { font-size: 9px; font-weight: 800; color: #64748b; letter-spacing: 0.1em; margin-bottom: 8px; }
        .in-ad-content { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .in-ad-text h4 { font-family: var(--font-headline), Georgia, serif; font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .in-ad-text p { font-size: 12px; color: #475569; margin: 0; }
        .vercel-dark .in-ad-text p { color: #94a3b8; }
        .in-ad-btn { font-size: 11px; font-weight: 800; padding: 8px 16px; background: #0f172a; color: #ffffff; text-decoration: none; }
        .in-ad-btn.orange { background: #ff6a00; }

        .editorial-blockquote { border-left: 4px solid #ff6a00; background: #fff7ed; padding: 20px 24px; margin: 20px 0; }
        .editorial-blockquote p { font-family: var(--font-headline), Georgia, serif; font-size: 20px; font-style: italic; color: #0f172a; margin-bottom: 6px; }
        .editorial-blockquote cite { font-size: 12px; color: #64748b; font-style: normal; font-weight: 700; }

        .editorial-table-wrap { overflow-x: auto; margin: 16px 0; border: 1px solid #e2e8f0; }
        .editorial-table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
        .editorial-table th, .editorial-table td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; }
        .editorial-table th { background: #0f172a; color: #ffffff; font-weight: 700; }
        .highlight-orange { color: #ff6a00; font-weight: 800; }

        .article-faq-list { display: flex; flex-direction: column; gap: 16px; margin-top: 12px; }
        .faq-item { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; }
        .faq-q { font-family: var(--font-headline), Georgia, serif; font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .faq-a { font-size: 13px; color: #475569; margin: 0; }

        .article-sources-box { background: #ffffff; border: 1px solid #cbd5e1; padding: 14px; margin-top: 20px; }
        .sources-title { font-size: 11px; font-weight: 800; color: #0f172a; display: block; margin-bottom: 6px; text-transform: uppercase; }
        .sources-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; font-size: 12px; }
        .sources-list a { color: #ff6a00; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; }

        .article-bottom-tags { display: flex; align-items: center; gap: 12px; padding-top: 16px; border-top: 1px solid #e2e8f0; }
        .tags-label { font-size: 11px; font-weight: 800; color: #0f172a; }
        .tags-list { display: flex; gap: 6px; flex-wrap: wrap; }
        .bottom-tag-chip { font-size: 11px; font-weight: 700; background: #f1f5f9; color: #0f172a; padding: 4px 10px; border: 1px solid #cbd5e1; text-decoration: none; }
        .bottom-tag-chip:hover { background: #ff6a00; color: #ffffff; border-color: #ff6a00; }

        .article-prev-next-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; padding-top: 20px; border-top: 2px solid #0f172a; }
        .nav-box-link { display: flex; flex-direction: column; gap: 4px; padding: 14px; border: 1px solid #e2e8f0; text-decoration: none; }
        .nav-box-link:hover { border-color: #ff6a00; }
        .nav-direction { font-size: 10px; font-weight: 800; color: #64748b; display: flex; align-items: center; gap: 4px; }
        .nav-article-title { font-family: var(--font-headline), Georgia, serif; font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.25; }

        .article-related-section { margin-top: 32px; padding-top: 24px; border-top: 2px solid #0f172a; }
        .related-section-title { font-family: var(--font-ui), sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 0.1em; color: #0f172a; margin-bottom: 16px; }
        .related-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .related-story-card { display: flex; flex-direction: column; gap: 8px; }
        .related-thumb-wrap { position: relative; width: 100%; height: 120px; background: #f1f5f9; border: 1px solid #e2e8f0; }
        .related-content { display: flex; flex-direction: column; gap: 4px; }
        .related-title { font-family: var(--font-headline), Georgia, serif; font-size: 14px; font-weight: 700; line-height: 1.25; margin: 0; }
        .related-title a { color: #0f172a; text-decoration: none; }
        .related-title a:hover { color: #ff6a00; }
        .related-time { font-size: 10px; color: #94a3b8; }
      `}</style>
    </>
  );
}

