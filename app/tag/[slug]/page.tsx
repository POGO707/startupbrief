import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { prisma } from "@/lib/prisma";
import { formatArticle } from "@/lib/articles";

export async function generateStaticParams() {
  const tags = await prisma.tag.findMany({ select: { slug: true } });
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = await prisma.tag.findUnique({ where: { slug } });

  const tagName = tag ? tag.name : slug;
  return {
    title: `#${tagName} News & Articles — Startup Brief`,
    description: `Browse all startup, technology, and AI articles tagged with #${tagName}.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const tag = await prisma.tag.findUnique({
    where: { slug: slug.toLowerCase() },
    include: {
      articles: {
        where: { status: "published" },
        include: { author: true, category: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const tagName = tag ? tag.name : slug;
  const articlesRaw = tag ? tag.articles : await prisma.article.findMany({ take: 6, include: { author: true, category: true } });
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

  return (
    <>
      <Header />
      <main id="main-content">
        {/* TAG HERO BANNER */}
        <div className="tag-hero-banner">
          <div className="newspaper-container">
            <span className="tag-label-sub">TOPIC ARCHIVE</span>
            <h1 className="tag-hero-title">#{tagName.toUpperCase()}</h1>
            <p className="tag-hero-desc">
              Curated editorial stories, analysis, and breaking news tagged under #{tagName}.
            </p>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="tag-page-layout">
            <div className="tag-main-left">
              {articles.length === 0 ? (
                <div className="no-articles-card">
                  <p>No published articles currently associated with tag #{tagName}.</p>
                </div>
              ) : (
                <div className="tag-articles-grid">
                  {articles.map((item) => (
                    <article key={item.id} className="tag-article-card">
                      <Link href={`/article/${item.slug}`} className="tag-thumb-link">
                        <div className="tag-thumb-wrap">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </Link>
                      <div className="tag-card-body">
                        <span className="card-orange-badge">{item.category}</span>
                        <h2 className="tag-card-title">
                          <Link href={`/article/${item.slug}`}>{item.title}</Link>
                        </h2>
                        <p className="tag-card-excerpt">{item.excerpt}</p>
                        <div className="article-meta">
                          <span className="meta-text">{item.author}</span>
                          <span className="meta-dot">•</span>
                          <span className="meta-text">{item.publishedAt}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              <div className="newspaper-pagination" style={{ marginTop: 32 }}>
                <button className="page-num active">1</button>
                <button className="page-num">2</button>
                <button className="page-num">3</button>
                <button className="page-next">NEXT &rarr;</button>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="tag-sidebar-col">
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
        .tag-hero-banner {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .tag-label-sub {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .tag-hero-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 800;
          color: #ffffff;
          margin: 6px 0 10px;
        }
        .tag-hero-desc {
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          color: #94a3b8;
        }

        .tag-page-layout {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 36px;
          align-items: start;
        }

        .tag-articles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .tag-article-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 1px solid #e2e8f0;
          padding: 16px;
          background: #ffffff;
        }
        .tag-thumb-link { display: block; }
        .tag-thumb-wrap {
          position: relative;
          width: 100%;
          height: 160px;
          background: #f1f5f9;
        }
        .tag-card-body {
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
        .tag-card-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .tag-card-title a { color: #0f172a; text-decoration: none; }
        .tag-card-title a:hover { color: #ff6a00; }
        .tag-card-excerpt {
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

        .no-articles-card { padding: 40px; background: #f8fafc; border: 1px solid #e2e8f0; }

        @media (max-width: 900px) {
          .tag-page-layout { grid-template-columns: 1fr; }
          .tag-articles-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
