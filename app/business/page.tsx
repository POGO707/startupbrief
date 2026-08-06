import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { getPublishedArticles } from "@/lib/articles";
import { TrendingUp, TrendingDown, DollarSign, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Business & Macroeconomy Desk — Startup Brief",
  description: "Global markets, macroeconomic policy, corporate earnings, trade, and economic trends.",
};

export default async function BusinessPage() {
  const articlesList = await getPublishedArticles({ categorySlug: "business" });
  const allArticles = articlesList.length >= 5 ? articlesList : await getPublishedArticles({ take: 6 });
  const heroStory = allArticles[0];
  const gridStories = allArticles.slice(1);

  const rawTrending = await getPublishedArticles({ take: 5, isTrending: true });
  const rawLatest = await getPublishedArticles({ take: 5 });

  const marketTickerData = [
    { symbol: "NASDAQ", val: "18,420.50", change: "+1.25%", isUp: true },
    { symbol: "S&P 500", val: "5,580.12", change: "+0.85%", isUp: true },
    { symbol: "NVDA", val: "$138.40", change: "+3.40%", isUp: true },
    { symbol: "AAPL", val: "$224.10", change: "-0.45%", isUp: false },
    { symbol: "MSFT", val: "$448.90", change: "+1.10%", isUp: true },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* BUSINESS HERO */}
        <div className="business-editorial-hero">
          <div className="newspaper-container">
            <span className="business-badge">BUSINESS &amp; MARKETS DESK</span>
            <h1 className="business-title">Global Markets, Macro &amp; Corporate Economy</h1>
            <p className="business-sub">
              Reporting on earnings reports, global trade policy, central bank rates, and enterprise technology consolidation.
            </p>

            {heroStory && (
              <div className="business-hero-card">
                <Link href={`/article/${heroStory.slug}`} className="img-link">
                  <div className="business-hero-thumb">
                    <Image src={heroStory.image} alt={heroStory.title} fill priority sizes="(max-width: 900px) 100vw, 700px" style={{ objectFit: "cover" }} />
                  </div>
                </Link>
                <div className="business-hero-body">
                  <span className="card-orange-badge">{heroStory.category}</span>
                  <h2 className="business-hero-headline">
                    <Link href={`/article/${heroStory.slug}`}>{heroStory.title}</Link>
                  </h2>
                  <p className="business-hero-excerpt">{heroStory.excerpt}</p>
                  <div className="article-meta">
                    <span className="meta-text">By {heroStory.author}</span>
                    <span className="meta-dot">•</span>
                    <span className="meta-text">{heroStory.publishedAt}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MARKET TICKER BAR */}
        <div className="markets-ticker-bar">
          <div className="newspaper-container">
            <div className="ticker-items-row">
              <span className="market-label"><Globe2 size={14} color="#ff6a00" /> GLOBAL MARKETS:</span>
              {marketTickerData.map((m) => (
                <div key={m.symbol} className="market-item">
                  <span className="sym">{m.symbol}</span>
                  <span className="val">{m.val}</span>
                  <span className={`chg ${m.isUp ? "green" : "red"}`}>
                    {m.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {m.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN BUSINESS CONTENT WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="business-page-layout">
            <div className="business-left-content">
              <div className="section-header">
                <h2 className="section-header-title">CORPORATE &amp; MARKET STORIES</h2>
              </div>

              <div className="business-grid">
                {gridStories.map((item) => (
                  <article key={item.id} className="business-item-card">
                    <Link href={`/article/${item.slug}`} className="img-link">
                      <div className="business-thumb-wrap">
                        <Image src={item.image} alt={item.title} fill sizes="250px" style={{ objectFit: "cover" }} />
                      </div>
                    </Link>
                    <div className="business-item-info">
                      <span className="card-orange-badge">{item.category}</span>
                      <h3 className="business-item-title">
                        <Link href={`/article/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="business-item-excerpt">{item.excerpt}</p>
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

            <div className="business-sidebar-col">
              <RightSidebar trendingArticles={rawTrending} latestArticles={rawLatest} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .business-editorial-hero {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .business-badge { font-family: var(--font-ui); font-size: 11px; font-weight: 800; color: #ff6a00; letter-spacing: 0.12em; text-transform: uppercase; }
        .business-title { font-family: var(--font-headline), Georgia, serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 800; color: #ffffff; margin: 6px 0 10px; }
        .business-sub { font-family: var(--font-ui); font-size: 14px; color: #94a3b8; max-width: 680px; margin-bottom: 24px; }

        .business-hero-card {
          display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; background: #1e293b; border: 1px solid #334155; padding: 20px; align-items: center;
        }
        .img-link { display: block; }
        .business-hero-thumb { position: relative; width: 100%; height: 260px; background: #000; }
        .business-hero-body { display: flex; flex-direction: column; gap: 8px; }
        .card-orange-badge { font-family: var(--font-ui); font-size: 10px; font-weight: 800; color: #ff6a00; letter-spacing: 0.1em; text-transform: uppercase; }
        .business-hero-headline { font-family: var(--font-headline), Georgia, serif; font-size: 24px; font-weight: 800; margin: 0; }
        .business-hero-headline a { color: #ffffff; text-decoration: none; }
        .business-hero-headline a:hover { color: #ff6a00; }
        .business-hero-excerpt { font-family: var(--font-ui); font-size: 13px; color: #cbd5e1; margin: 0; }

        .markets-ticker-bar { background: #09090b; color: #ffffff; padding-block: 14px; border-bottom: 1px solid #27272a; }
        .ticker-items-row { display: flex; align-items: center; gap: 24px; overflow-x: auto; font-family: var(--font-ui); font-size: 12px; }
        .market-label { font-weight: 800; color: #ffffff; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
        .market-item { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .market-item .sym { font-weight: 700; color: #a1a1aa; }
        .market-item .val { font-weight: 700; color: #ffffff; }
        .market-item .chg { display: flex; align-items: center; gap: 2px; font-weight: 800; font-size: 11px; }
        .market-item .chg.green { color: #22c55e; }
        .market-item .chg.red { color: #ef4444; }

        .business-page-layout { display: grid; grid-template-columns: 1fr 310px; gap: 36px; align-items: start; }
        .business-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .business-item-card { display: flex; flex-direction: column; gap: 10px; border: 1px solid #e2e8f0; padding: 16px; background: #ffffff; }
        .business-thumb-wrap { position: relative; width: 100%; height: 150px; background: #f1f5f9; }
        .business-item-info { display: flex; flex-direction: column; gap: 6px; }
        .business-item-title { font-family: var(--font-headline), Georgia, serif; font-size: 17px; font-weight: 700; margin: 0; }
        .business-item-title a { color: #0f172a; text-decoration: none; }
        .business-item-title a:hover { color: #ff6a00; }
        .business-item-excerpt { font-family: var(--font-ui); font-size: 13px; color: #475569; margin: 0; }

        .article-meta { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 4px; }
        .meta-dot { color: #cbd5e1; }

        @media (max-width: 900px) {
          .business-hero-card { grid-template-columns: 1fr; }
          .business-page-layout { grid-template-columns: 1fr; }
          .business-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
