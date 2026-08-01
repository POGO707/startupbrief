import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TopAd from "@/components/layout/TopAd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import { aiArticles, heroSideArticles, topTools } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI | Startup Brief",
  description: "The latest in ai.",
};

export default function AIPage() {

  let featured: any = null;
  let latestNews: any[] = [];
  const gridNews: any[] = [];
  let tools: any[] = [];
  const categories: string[] = [];
  const gridBooks: any[] = [];
  const gridVideos: any[] = [];
  const gridResources: any[] = [];
  const rounds: any[] = [];
  
  featured = aiArticles[0];
  latestNews = aiArticles.slice(1).concat(heroSideArticles).slice(0, 4);
  tools = topTools.slice(0, 4);

  return (
    <>
      <TopAd />
      <Header />
      <main id="main-content" style={{ minHeight: "100vh" }}>
        {/* PAGE HEADER */}
        <div className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="section-header">
              <h1 className="section-header-title">AI</h1>
            </div>
          </div>
        </div>

        {/* HERO FEATURE SECTION */}
        <section className="section editorial-border-top">
          <div className="container">
            <div className="hero-grid">
              <article className="hero-main">
                <Link href={"#"} className="hero-main-link">
                  <div className="hero-main-image img-hover">
                    <Image
                      src={(featured as any)?.image || (featured as any)?.cover || (featured as any)?.thumbnail || "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=700&fit=crop&auto=format"}
                      alt={(featured as any)?.title || "AI"}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="hero-main-img"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                  <div className="hero-main-content">
                    <span className="badge">{(featured as any)?.category || "AI"}</span>
                    <h2 className="hero-main-title link-headline">{(featured as any)?.title || "Featured AI Story"}</h2>
                    <p className="hero-main-excerpt" style={{ fontFamily: "var(--font-headline)", fontSize: "19px", color: "var(--color-secondary)", lineHeight: 1.6, maxWidth: 640 }}>
                      {(featured as any)?.excerpt || (featured as any)?.summary || "Read the full in-depth analysis on the latest trends and breakthroughs."}
                    </p>
                    <div className="article-meta" style={{ marginTop: 12 }}>
                      <span className="meta-text" style={{ color: "var(--color-text)" }}>
                        By {(featured as any)?.author || "Editorial Team"}
                      </span>
                      <span className="meta-dot" aria-hidden="true" />
                      <span className="meta-text">
                        {(featured as any)?.publishedAt || (featured as any)?.year || "July 31, 2026"}
                      </span>
                      <span className="meta-dot" aria-hidden="true" />
                      <span className="meta-text">
                        {(featured as any)?.readingTime || 5} min read
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              <aside className="hero-sidebar">
                <div className="sidebar-header" style={{ borderBottom: "2px solid var(--color-text)", paddingBottom: 12, marginBottom: 16 }}>
                  <span className="sidebar-header-title" style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Trending</span>
                </div>
                <div className="hero-sidebar-list" style={{ display: "flex", flexDirection: "column" }}>
                  {(typeof latestNews !== 'undefined' ? latestNews : []).map((item, i) => (
                    <article key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 16, alignItems: "start", padding: "16px 0", borderBottom: "1px solid var(--color-border)" }}>
                      <div style={{ fontFamily: "var(--font-headline)", fontSize: 24, paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Link href="#" className="badge" style={{ marginBottom: 6, alignSelf: "flex-start" }}>{(item as any).category || "AI"}</Link>
                        <Link href="#" className="link-headline" style={{ fontFamily: "var(--font-headline)", fontSize: 18, fontWeight: 500, lineHeight: 1.25 }}>{(item as any).title}</Link>
                        <div className="article-meta" style={{ marginTop: 6 }}><span className="meta-text">{(item as any).author || "Staff"}</span></div>
                      </div>
                    </article>
                  ))}
                  
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* GRID SECTION */}
        <section className="section editorial-border-top">
          <div className="container">
            <div className="section-header">
              <h2 className="section-header-title">LATEST IN AI</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
              {/* RENDER GRID ITEMS BASED ON ROUTE DATA */}
              
                {(typeof gridNews !== 'undefined' ? gridNews : []).map((item, i) => (
                  <article key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Link href="#">
                      <div className="img-hover" style={{ position: "relative", width: "100%", aspectRatio: "16/9", border: "1px solid var(--color-border)" }}>
                        <Image src={(item as any).image} alt={(item as any).title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                      </div>
                    </Link>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                      <span className="badge">{(item as any).category}</span>
                      <h3 className="link-headline" style={{ fontFamily: "var(--font-headline)", fontSize: 22, fontWeight: 500, lineHeight: 1.2 }}>
                        <Link href="#">{(item as any).title}</Link>
                      </h3>
                      <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--color-secondary)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {(item as any).excerpt}
                      </p>
                      <div className="article-meta">
                        <span className="meta-text">{(item as any).author}</span>
                        <span className="meta-dot" />
                        <span className="meta-text">{(item as any).readingTime} min</span>
                      </div>
                    </div>
                  </article>
                ))}
              

              

              

              

              

              
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .hero-main {
          border-right: 1px solid var(--color-border-dark);
          padding-right: 40px;
        }
        .hero-main-link {
          display: flex;
          flex-direction: column;
          gap: 24px;
          text-decoration: none;
        }
        .hero-main-image {
          position: relative;
          aspect-ratio: 16/9;
          width: 100%;
          border: 1px solid var(--color-border);
        }
        .hero-main-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-main-content .badge {
          margin-bottom: 12px;
        }
        .hero-main-title {
          font-family: var(--font-headline);
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--color-text);
          font-weight: 500;
          margin-bottom: 16px;
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-main {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border-dark);
            padding-bottom: 40px;
          }
        }
      `}</style>
    </>
  );
}
