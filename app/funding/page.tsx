import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { getPublishedArticles } from "@/lib/articles";
import { DollarSign, PieChart, Landmark, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Venture Capital & Funding Desk — Startup Brief",
  description: "Venture capital deals, Series A to D funding rounds, IPO filings, and investor market insights.",
};

export default async function FundingPage() {
  const articlesList = await getPublishedArticles({ categorySlug: "funding" });
  const allArticles = articlesList.length >= 5 ? articlesList : await getPublishedArticles({ take: 6 });
  const heroStory = allArticles[0];
  const gridStories = allArticles.slice(1);

  const rawTrending = await getPublishedArticles({ take: 5, isTrending: true });
  const rawLatest = await getPublishedArticles({ take: 5 });

  const vcDealsTimeline = [
    { company: "Jordan AI", round: "Series A", amount: "$500M", investor: "Sequoia Capital", date: "AUG 2, 2026" },
    { company: "TV Sensing", round: "Series C", amount: "$50M", investor: "Lightspeed India", date: "AUG 1, 2026" },
    { company: "HyperCompute", round: "Seed", amount: "$18M", investor: "Founders Fund", date: "JUL 31, 2026" },
    { company: "ScaleAgent", round: "Series B", amount: "$85M", investor: "Accel Partners", date: "JUL 30, 2026" },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* FUNDING HERO */}
        <div className="funding-editorial-hero">
          <div className="newspaper-container">
            <span className="funding-badge">VENTURE &amp; CAPITAL DESK</span>
            <h1 className="funding-title">Venture Capital, Funding Rounds &amp; IPOs</h1>
            <p className="funding-sub">
              Tracking institutional capital allocation, term sheets, lead venture funds, and private technology market valuations.
            </p>

            {heroStory && (
              <div className="funding-hero-card">
                <Link href={`/article/${heroStory.slug}`} className="img-link">
                  <div className="funding-hero-thumb">
                    <Image src={heroStory.image} alt={heroStory.title} fill priority sizes="(max-width: 900px) 100vw, 700px" style={{ objectFit: "cover" }} />
                  </div>
                </Link>
                <div className="funding-hero-body">
                  <span className="card-orange-badge">{heroStory.category}</span>
                  <h2 className="funding-hero-headline">
                    <Link href={`/article/${heroStory.slug}`}>{heroStory.title}</Link>
                  </h2>
                  <p className="funding-hero-excerpt">{heroStory.excerpt}</p>
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

        {/* RECENT VC ROUNDS TIMELINE TABLE BANNER */}
        <div className="vc-deals-banner">
          <div className="newspaper-container">
            <div className="section-header" style={{ borderColor: "#334155" }}>
              <h2 className="section-header-title" style={{ color: "#ffffff" }}>RECENT VENTURE DEALS TIMELINE</h2>
            </div>
            <div className="deals-table-wrap">
              <table className="vc-deals-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Round</th>
                    <th>Amount Raised</th>
                    <th>Lead Investor</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {vcDealsTimeline.map((deal) => (
                    <tr key={deal.company}>
                      <td className="deal-comp-name">{deal.company}</td>
                      <td><span className="round-badge">{deal.round}</span></td>
                      <td className="deal-amt-orange">{deal.amount}</td>
                      <td>{deal.investor}</td>
                      <td className="deal-date">{deal.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MAIN FUNDING GRID WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="funding-page-layout">
            <div className="funding-left-content">
              <div className="section-header">
                <h2 className="section-header-title">VENTURE &amp; CAPITAL COVERAGE</h2>
              </div>

              <div className="funding-grid">
                {gridStories.map((item) => (
                  <article key={item.id} className="funding-item-card">
                    <Link href={`/article/${item.slug}`} className="img-link">
                      <div className="funding-thumb-wrap">
                        <Image src={item.image} alt={item.title} fill sizes="250px" style={{ objectFit: "cover" }} />
                      </div>
                    </Link>
                    <div className="funding-item-info">
                      <span className="card-orange-badge">{item.category}</span>
                      <h3 className="funding-item-title">
                        <Link href={`/article/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="funding-item-excerpt">{item.excerpt}</p>
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

            <div className="funding-sidebar-col">
              <RightSidebar trendingArticles={rawTrending} latestArticles={rawLatest} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .funding-editorial-hero {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .funding-badge { font-family: var(--font-ui); font-size: 11px; font-weight: 800; color: #ff6a00; letter-spacing: 0.12em; text-transform: uppercase; }
        .funding-title { font-family: var(--font-headline), Georgia, serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 800; color: #ffffff; margin: 6px 0 10px; }
        .funding-sub { font-family: var(--font-ui); font-size: 14px; color: #94a3b8; max-width: 680px; margin-bottom: 24px; }

        .funding-hero-card {
          display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; background: #1e293b; border: 1px solid #334155; padding: 20px; align-items: center;
        }
        .img-link { display: block; }
        .funding-hero-thumb { position: relative; width: 100%; height: 260px; background: #000; }
        .funding-hero-body { display: flex; flex-direction: column; gap: 8px; }
        .card-orange-badge { font-family: var(--font-ui); font-size: 10px; font-weight: 800; color: #ff6a00; letter-spacing: 0.1em; text-transform: uppercase; }
        .funding-hero-headline { font-family: var(--font-headline), Georgia, serif; font-size: 24px; font-weight: 800; margin: 0; }
        .funding-hero-headline a { color: #ffffff; text-decoration: none; }
        .funding-hero-headline a:hover { color: #ff6a00; }
        .funding-hero-excerpt { font-family: var(--font-ui); font-size: 13px; color: #cbd5e1; margin: 0; }

        .vc-deals-banner { background: #09090b; color: #ffffff; padding-block: 28px; border-bottom: 1px solid #27272a; }
        .deals-table-wrap { overflow-x: auto; }
        .vc-deals-table { width: 100%; border-collapse: collapse; font-family: var(--font-ui); font-size: 13px; text-align: left; }
        .vc-deals-table th, .vc-deals-table td { padding: 10px 14px; border-bottom: 1px solid #27272a; }
        .vc-deals-table th { background: #18181b; color: #94a3b8; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .deal-comp-name { font-family: var(--font-headline), Georgia, serif; font-size: 15px; font-weight: 700; color: #ffffff; }
        .round-badge { background: #1e293b; color: #cbd5e1; font-size: 10px; font-weight: 800; padding: 2px 8px; border: 1px solid #334155; }
        .deal-amt-orange { color: #ff6a00; font-weight: 800; }
        .deal-date { color: #71717a; font-size: 11px; }

        .funding-page-layout { display: grid; grid-template-columns: 1fr 310px; gap: 36px; align-items: start; }
        .funding-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .funding-item-card { display: flex; flex-direction: column; gap: 10px; border: 1px solid #e2e8f0; padding: 16px; background: #ffffff; }
        .funding-thumb-wrap { position: relative; width: 100%; height: 150px; background: #f1f5f9; }
        .funding-item-info { display: flex; flex-direction: column; gap: 6px; }
        .funding-item-title { font-family: var(--font-headline), Georgia, serif; font-size: 17px; font-weight: 700; margin: 0; }
        .funding-item-title a { color: #0f172a; text-decoration: none; }
        .funding-item-title a:hover { color: #ff6a00; }
        .funding-item-excerpt { font-family: var(--font-ui); font-size: 13px; color: #475569; margin: 0; }

        .article-meta { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 4px; }
        .meta-dot { color: #cbd5e1; }

        @media (max-width: 900px) {
          .funding-hero-card { grid-template-columns: 1fr; }
          .funding-page-layout { grid-template-columns: 1fr; }
          .funding-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
