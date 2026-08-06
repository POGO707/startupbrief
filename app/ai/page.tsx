import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { getPublishedArticles } from "@/lib/articles";
import { Cpu, Zap, Sparkles, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "AI & Artificial Intelligence Intelligence Desk — Startup Brief",
  description: "Breaking coverage on large language models, agentic workflows, machine learning research, and enterprise AI adoption.",
};

export default async function AIPage() {
  const articlesList = await getPublishedArticles({ categorySlug: "ai" });
  const allArticles = articlesList.length >= 5 ? articlesList : await getPublishedArticles({ take: 6 });
  const featured = allArticles[0];
  const secondaryArticles = allArticles.slice(1, 4);
  const gridNews = allArticles.slice(4);

  const rawTrending = await getPublishedArticles({ take: 5, isTrending: true });
  const rawLatest = await getPublishedArticles({ take: 5 });

  const aiToolsPicks = [
    { name: "Claude 4 Opus", desc: "1M context window & computer use agents", cat: "LLM", icon: Cpu },
    { name: "Cursor IDE", desc: "AI-first code editor & agentic codebase search", cat: "Developer", icon: Zap },
    { name: "v0 by Vercel", desc: "Generative UI component generation engine", cat: "Design", icon: Sparkles },
    { name: "Pinecone Vector DB", desc: "High-performance vector retrieval platform", cat: "Database", icon: Server },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* AI HERO HEADER */}
        <div className="ai-editorial-hero">
          <div className="newspaper-container">
            <div className="ai-hero-header-box">
              <span className="ai-badge-header">AI DESK · INTELLIGENCE REPORT</span>
              <h1 className="ai-hero-title">Artificial Intelligence &amp; Autonomous Agents</h1>
              <p className="ai-hero-sub">
                Tracking neural model breakthroughs, enterprise agentic workflows, chip architecture, and multi-modal intelligence.
              </p>
            </div>

            {/* FEATURED AI HERO STORY */}
            {featured && (
              <div className="ai-hero-featured-grid">
                <article className="ai-featured-main-card">
                  <Link href={`/article/${featured.slug}`} className="img-link">
                    <div className="ai-featured-thumb-wrap">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        priority
                        sizes="(max-width: 900px) 100vw, 750px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="ai-featured-body">
                    <span className="card-orange-badge">{featured.category}</span>
                    <h2 className="ai-featured-headline">
                      <Link href={`/article/${featured.slug}`}>{featured.title}</Link>
                    </h2>
                    <p className="ai-featured-excerpt">{featured.excerpt}</p>
                    <div className="article-meta">
                      <span className="meta-text">By {featured.author}</span>
                      <span className="meta-dot">•</span>
                      <span className="meta-text">{featured.publishedAt}</span>
                    </div>
                  </div>
                </article>

                <div className="ai-hero-sec-col">
                  {secondaryArticles.map((item, idx) => (
                    <article key={item.slug || idx} className="ai-sec-item">
                      <span className="sec-num">0{idx + 1}</span>
                      <div>
                        <h3 className="sec-title">
                          <Link href={`/article/${item.slug}`}>{item.title}</Link>
                        </h3>
                        <span className="sec-date">{item.publishedAt}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI TOOLS SHOWCASE SECTION */}
        <div className="ai-tools-banner-section">
          <div className="newspaper-container">
            <div className="section-header" style={{ borderColor: "#334155" }}>
              <h2 className="section-header-title" style={{ color: "#ffffff" }}>FEATURED AI TOOLS &amp; ARCHITECTURE</h2>
              <Link href="/tools" style={{ color: "#ff6a00", fontSize: 11, fontWeight: 800, textDecoration: "none" }}>
                BROWSE ALL TOOLS &rarr;
              </Link>
            </div>

            <div className="ai-tools-cards-grid">
              {aiToolsPicks.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.name} className="ai-tool-mini-card">
                    <div className="tool-icon-circle">
                      <Icon size={18} color="#ff6a00" />
                    </div>
                    <div>
                      <span className="tool-cat-tag">{tool.cat}</span>
                      <h4 className="tool-mini-name">{tool.name}</h4>
                      <p className="tool-mini-desc">{tool.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="ai-page-main-layout">
            <div className="ai-left-content">
              <div className="section-header">
                <h2 className="section-header-title">LATEST AI COVERAGE</h2>
              </div>

              <div className="ai-articles-grid">
                {gridNews.map((item) => (
                  <article key={item.id} className="ai-grid-card">
                    <Link href={`/article/${item.slug}`} className="thumb-link">
                      <div className="ai-card-thumb-wrap">
                        <Image src={item.image} alt={item.title} fill sizes="250px" style={{ objectFit: "cover" }} />
                      </div>
                    </Link>
                    <div className="ai-card-info">
                      <span className="card-orange-badge">{item.category}</span>
                      <h3 className="ai-card-title">
                        <Link href={`/article/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="ai-card-excerpt">{item.excerpt}</p>
                      <div className="article-meta">
                        <span className="meta-text">{item.author}</span>
                        <span className="meta-dot">•</span>
                        <span className="meta-text">{item.publishedAt}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="ai-sidebar-col">
              <RightSidebar trendingArticles={rawTrending} latestArticles={rawLatest} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .ai-editorial-hero {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .ai-badge-header {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .ai-hero-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 800;
          color: #ffffff;
          margin: 6px 0 10px;
        }
        .ai-hero-sub {
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          color: #94a3b8;
          max-width: 680px;
          margin-bottom: 28px;
        }

        .ai-hero-featured-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .ai-featured-main-card {
          background: #1e293b;
          border: 1px solid #334155;
          display: flex;
          flex-direction: column;
        }
        .img-link { display: block; }
        .ai-featured-thumb-wrap {
          position: relative;
          width: 100%;
          height: 280px;
          background: #000;
        }
        .ai-featured-body {
          padding: 20px;
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
        .ai-featured-headline {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 22px;
          font-weight: 800;
          margin: 0;
        }
        .ai-featured-headline a { color: #ffffff; text-decoration: none; }
        .ai-featured-headline a:hover { color: #ff6a00; }
        .ai-featured-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #cbd5e1;
          margin: 0;
        }

        .ai-hero-sec-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #1e293b;
          border: 1px solid #334155;
          padding: 20px;
        }
        .ai-sec-item {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #334155;
          align-items: start;
        }
        .ai-sec-item:last-child { border-bottom: none; padding-bottom: 0; }
        .sec-num { font-family: var(--font-headline), Georgia, serif; font-size: 18px; font-weight: 800; color: #ff6a00; }
        .sec-title { font-family: var(--font-headline), Georgia, serif; font-size: 14px; font-weight: 700; margin: 0; }
        .sec-title a { color: #ffffff; text-decoration: none; }
        .sec-title a:hover { color: #ff6a00; }
        .sec-date { font-family: var(--font-ui), sans-serif; font-size: 9px; color: #94a3b8; }

        .ai-tools-banner-section {
          background: #09090b;
          color: #ffffff;
          padding-block: 28px;
          border-bottom: 1px solid #27272a;
        }
        .ai-tools-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .ai-tool-mini-card {
          background: #18181b;
          border: 1px solid #27272a;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: start;
        }
        .tool-icon-circle {
          width: 36px;
          height: 36px;
          background: rgba(255,106,0,0.1);
          border: 1px solid rgba(255,106,0,0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tool-cat-tag { font-family: var(--font-ui), sans-serif; font-size: 9px; font-weight: 800; color: #ff6a00; text-transform: uppercase; }
        .tool-mini-name { font-family: var(--font-headline), Georgia, serif; font-size: 15px; font-weight: 700; color: #ffffff; margin: 2px 0 4px; }
        .tool-mini-desc { font-family: var(--font-ui), sans-serif; font-size: 11px; color: #a1a1aa; margin: 0; line-height: 1.35; }

        .ai-page-main-layout {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 36px;
          align-items: start;
        }
        .ai-articles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .ai-grid-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border: 1px solid #e2e8f0;
          padding: 16px;
          background: #ffffff;
        }
        .ai-card-thumb-wrap {
          position: relative;
          width: 100%;
          height: 150px;
          background: #f1f5f9;
        }
        .ai-card-info { display: flex; flex-direction: column; gap: 6px; }
        .ai-card-title { font-family: var(--font-headline), Georgia, serif; font-size: 17px; font-weight: 700; margin: 0; }
        .ai-card-title a { color: #0f172a; text-decoration: none; }
        .ai-card-title a:hover { color: #ff6a00; }
        .ai-card-excerpt { font-family: var(--font-ui), sans-serif; font-size: 13px; color: #475569; margin: 0; }

        .article-meta { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 4px; }
        .meta-dot { color: #cbd5e1; }

        @media (max-width: 900px) {
          .ai-hero-featured-grid { grid-template-columns: 1fr; }
          .ai-tools-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .ai-page-main-layout { grid-template-columns: 1fr; }
          .ai-articles-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
