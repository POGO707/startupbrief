import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Share2, Bookmark, Twitter, Linkedin, Link2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import type { Tag } from "@prisma/client";

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug }, include: { author: true } });
  
  if (!article) return { title: "Not Found" };

  return {
    title: article.title,
    description: article.excerpt || "",
    alternates: { canonical: `https://startupbrief.com/article/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: article.image ? [{ url: article.image, width: 1200, height: 630 }] : [],
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author.name || "Admin"],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: true, category: true, tags: true }
  });

  if (!article) notFound();

  const related = await prisma.article.findMany({
    where: { categoryId: article.categoryId, NOT: { id: article.id } },
    take: 3,
    include: { author: true, category: true }
  });

  const categoryName = article.category?.name || "General";
  const authorName = article.author.name || "Admin";

  const tableOfContents = [
    "Introduction",
    "Key Takeaways",
    "Deep Dive",
    "Conclusion",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.image,
            author: { "@type": "Person", name: authorName },
            publisher: {
              "@type": "Organization",
              name: "Startup Brief",
              logo: { "@type": "ImageObject", url: "https://startupbrief.com/logo.png" },
            },
            datePublished: article.publishedAt,
          }),
        }}
      />

      <Header />
      <main id="main-content">
        <article className="article-page">
          {/* ─── BREADCRUMB ─── */}
          <div className="article-breadcrumb-bar">
            <div className="container-narrow">
              <nav className="article-breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-sep" aria-hidden="true">/</span>
                <Link href={`/${categoryName.toLowerCase()}`} className="breadcrumb-link">
                  {categoryName}
                </Link>
                <span className="breadcrumb-sep" aria-hidden="true">/</span>
                <span className="breadcrumb-current" aria-current="page">
                  {article.title.slice(0, 50)}…
                </span>
              </nav>
            </div>
          </div>

          {/* ─── ARTICLE HEADER ─── */}
          <header className="article-header">
            <div className="container-narrow">
              <Link href={`/${categoryName.toLowerCase()}`} className="badge" style={{ marginBottom: 20 }}>
                {categoryName}
              </Link>
              <h1 className="article-title">{article.title}</h1>
              <p className="article-deck">{article.excerpt}</p>

              <div className="article-meta-bar">
                <div className="article-author-info">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-600 flex-shrink-0">
                    {authorName.charAt(0)}
                  </div>
                  <div className="article-author-details">
                    <span className="article-author-name">
                      {authorName}
                    </span>
                    <div className="article-meta-row">
                      <span className="meta-text">{article.publishedAt?.toLocaleDateString()}</span>
                      <span className="meta-dot" aria-hidden="true" />
                      <Clock size={12} color="var(--color-muted)" />
                      <span className="meta-text">5 min read</span>
                    </div>
                  </div>
                </div>
                <div className="article-share-btns" role="group" aria-label="Share article">
                  <button className="share-btn" title="Share on Twitter" aria-label="Share on Twitter">
                    <Twitter size={15} />
                  </button>
                  <button className="share-btn" title="Share on LinkedIn" aria-label="Share on LinkedIn">
                    <Linkedin size={15} />
                  </button>
                  <button className="share-btn" title="Copy link" aria-label="Copy link">
                    <Link2 size={15} />
                  </button>
                  <button className="share-btn" title="Bookmark" aria-label="Bookmark article">
                    <Bookmark size={15} />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* ─── HERO IMAGE ─── */}
          {article.image && (
            <div className="article-hero-image">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="100vw"
                className="article-hero-img"
                priority
              />
            </div>
          )}

          {/* ─── ARTICLE BODY ─── */}
          <div className="article-body-wrap">
            <div className="article-body-grid">
              {/* Table of Contents */}
              <aside className="article-toc" aria-label="Table of contents">
                <div className="toc-inner">
                  <h2 className="toc-title">In This Article</h2>
                  <nav>
                    <ol className="toc-list" role="list">
                      {tableOfContents.map((item, i) => (
                        <li key={i} className="toc-item">
                          <a href={`#section-${i + 1}`} className="toc-link">
                            <span className="toc-num">{i + 1}</span>
                            <span>{item}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </aside>

              {/* Body */}
              <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
              </div>

                {/* Tags */}
                <div className="article-tags">
                  <span className="article-tags-label">Tags:</span>
                  {(article.tags ?? []).map((tag: Tag) => (
                    <Link key={tag.id} href={`/tag/${tag.slug}`} className="article-tag">
                      {tag.name}
                    </Link>
                  ))}
                </div>

                {/* Share */}
                <div className="article-share-footer">
                  <span className="article-share-label">Share this article</span>
                  <div className="article-share-btns">
                    <button className="share-btn-lg" aria-label="Share on Twitter">
                      <Twitter size={16} /> Twitter
                    </button>
                    <button className="share-btn-lg" aria-label="Share on LinkedIn">
                      <Linkedin size={16} /> LinkedIn
                    </button>
                    <button className="share-btn-lg" aria-label="Copy link">
                      <Link2 size={16} /> Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>

          {/* ─── RELATED STORIES ─── */}
          <div className="related-stories">
            <div className="container">
              <div className="section-header">
                <span className="section-header-accent" aria-hidden="true" />
                <h2 className="section-header-title">Related Stories</h2>
              </div>
              <div className="related-grid">
                {related.map((a) => (
                  <article key={a.id} className="related-card">
                    {a.image && (
                      <div className="related-img img-hover">
                        <Image src={a.image} alt={a.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="related-img-inner" />
                      </div>
                    )}
                    <div className="related-body">
                      <Link href={`/article/${a.slug}`} className="badge">{a.category?.name}</Link>
                      <h3 className="related-title">
                        <Link href={`/article/${a.slug}`} className="link-headline">{a.title}</Link>
                      </h3>
                      <div className="article-meta" style={{ marginTop: 8 }}>
                        <span className="meta-text">{a.author?.name}</span>
                        <span className="meta-dot" aria-hidden="true" />
                        <span className="meta-text">5 min read</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />

      <style>{`
        .article-page { background: #fff; }

        /* Breadcrumb */
        .article-breadcrumb-bar {
          border-bottom: 1px solid var(--color-border);
          padding: 12px 0;
          background: #fafafa;
        }
        .article-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .breadcrumb-link {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-secondary);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .breadcrumb-link:hover { color: var(--color-primary); }
        .breadcrumb-sep {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-border-dark);
        }
        .breadcrumb-current {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-text);
          font-weight: 500;
        }

        /* Header */
        .article-header {
          padding: clamp(40px, 5vw, 64px) 0 32px;
        }
        .article-title {
          font-family: var(--font-headline);
          font-size: clamp(28px, 4vw, 52px);
          line-height: 1.08;
          letter-spacing: -0.03em;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 20px;
        }
        .article-deck {
          font-family: var(--font-ui);
          font-size: clamp(16px, 1.5vw, 20px);
          color: var(--color-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 700px;
        }
        .article-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--color-border);
          flex-wrap: wrap;
        }
        .article-author-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .article-author-avatar {
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .article-author-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .article-author-name {
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .article-author-name:hover { color: var(--color-primary); }
        .article-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .article-share-btns {
          display: flex;
          gap: 6px;
        }
        .share-btn {
          width: 34px;
          height: 34px;
          border: 1.5px solid var(--color-border-dark);
          background: transparent;
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 150ms ease;
        }
        .share-btn:hover {
          background: var(--color-text);
          color: #fff;
          border-color: var(--color-text);
        }

        /* Hero image */
        .article-hero-image {
          position: relative;
          width: 100%;
          height: clamp(320px, 45vw, 580px);
          margin-bottom: 0;
        }
        .article-hero-img { object-fit: cover; }

        /* Body */
        .article-body-wrap {
          padding: 60px 0;
        }
        .article-body-grid {
          max-width: 1100px;
          margin-inline: auto;
          padding-inline: clamp(16px, 3vw, 40px);
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 60px;
          align-items: start;
        }

        /* TOC */
        .article-toc {
          position: sticky;
          top: 80px;
        }
        .toc-inner {
          border-left: 2px solid var(--color-border);
          padding-left: 20px;
        }
        .toc-title {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
          margin-bottom: 14px;
        }
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .toc-link {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-secondary);
          text-decoration: none;
          padding: 7px 0;
          border-bottom: 1px solid var(--color-border);
          transition: color 150ms ease;
          line-height: 1.4;
        }
        .toc-link:hover { color: var(--color-primary); }
        .toc-num {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          color: var(--color-muted);
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Article content typography */
        .article-content {
          font-family: var(--font-ui);
          font-size: 18px;
          line-height: 1.75;
          color: var(--color-text);
        }
        .article-content h2 {
          font-family: var(--font-headline);
          font-size: clamp(22px, 2.2vw, 30px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 48px 0 20px;
          padding-top: 8px;
          border-top: 1px solid var(--color-border);
        }
        .article-content h2:first-child { margin-top: 0; border-top: none; }
        .article-content p {
          margin-bottom: 24px;
          color: #222;
        }
        .article-content section { margin-bottom: 0; }

        /* Inline ad */
        .article-inline-ad {
          background: #fafafa;
          border: 1px solid var(--color-border);
          border-left: 3px solid var(--color-primary);
          padding: 20px 24px;
          margin: 32px 0;
        }
        .article-inline-ad .ad-label {
          display: block;
          margin-bottom: 10px;
        }
        .inline-ad-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .inline-ad-content p {
          font-size: 15px;
          color: var(--color-secondary);
          margin: 0;
          line-height: 1.5;
        }

        /* Tags */
        .article-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
        }
        .article-tags-label {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .article-tag {
          font-family: var(--font-ui);
          font-size: 11px;
          color: var(--color-secondary);
          border: 1px solid var(--color-border-dark);
          padding: 4px 10px;
          text-decoration: none;
          transition: all 150ms ease;
        }
        .article-tag:hover {
          background: var(--color-text);
          color: #fff;
          border-color: var(--color-text);
        }

        /* Share footer */
        .article-share-footer {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 2px solid var(--color-text);
          flex-wrap: wrap;
        }
        .article-share-label {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .share-btn-lg {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 8px 14px;
          border: 1.5px solid var(--color-border-dark);
          background: transparent;
          color: var(--color-secondary);
          cursor: pointer;
          transition: all 150ms ease;
        }
        .share-btn-lg:hover {
          background: var(--color-text);
          color: #fff;
          border-color: var(--color-text);
        }

        /* Related */
        .related-stories {
          border-top: 2px solid var(--color-text);
          padding: 60px 0;
          background: #fafafa;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .related-card { display: flex; flex-direction: column; gap: 16px; }
        .related-img {
          position: relative;
          width: 100%;
          height: 200px;
        }
        .related-img-inner { object-fit: cover; }
        .related-body { display: flex; flex-direction: column; gap: 6px; }
        .related-title {
          font-family: var(--font-headline);
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .article-body-grid {
            grid-template-columns: 1fr;
          }
          .article-toc { display: none; }
          .related-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .related-grid { grid-template-columns: 1fr; }
          .article-content { font-size: 16px; }
        }
      `}</style>
    </>
  );
}
