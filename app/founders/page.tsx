import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { getPublishedArticles } from "@/lib/articles";
import { UserCheck, Award, MessageSquare, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Founders Desk — Startup Brief",
  description: "Exclusive interviews, leadership insights, and executive playbooks from leading startup founders.",
};

export default async function FoundersPage() {
  const articlesList = await getPublishedArticles({ categorySlug: "founders" });
  const allArticles = articlesList.length >= 5 ? articlesList : await getPublishedArticles({ take: 6 });
  const heroStory = allArticles[0];
  const gridStories = allArticles.slice(1);

  const rawTrending = await getPublishedArticles({ take: 5, isTrending: true });
  const rawLatest = await getPublishedArticles({ take: 5 });

  const founderPillars = [
    { title: "Executive Leadership", desc: "Scaling from seed founder to enterprise CEO", icon: UserCheck },
    { title: "Product Vision", desc: "Building defensible product moats and user habits", icon: Award },
    { title: "Venture Dialogues", desc: "In-depth conversations with visionary builders", icon: MessageSquare },
    { title: "Talent & Culture", desc: "Hiring elite engineering teams across timezones", icon: Briefcase },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* FOUNDERS HERO */}
        <div className="founders-editorial-hero">
          <div className="newspaper-container">
            <span className="founders-badge">FOUNDER INSIGHTS DESK</span>
            <h1 className="founders-title">Founders, Leadership &amp; Executive Playbooks</h1>
            <p className="founders-sub">
              Deep-dive interviews, founder lessons, leadership philosophy, and operating decisions behind top ventures.
            </p>

            {heroStory && (
              <div className="founders-hero-card">
                <Link href={`/article/${heroStory.slug}`} className="img-link">
                  <div className="founders-hero-thumb">
                    <Image src={heroStory.image} alt={heroStory.title} fill priority sizes="(max-width: 900px) 100vw, 700px" style={{ objectFit: "cover" }} />
                  </div>
                </Link>
                <div className="founders-hero-body">
                  <span className="card-orange-badge">{heroStory.category}</span>
                  <h2 className="founders-hero-headline">
                    <Link href={`/article/${heroStory.slug}`}>{heroStory.title}</Link>
                  </h2>
                  <p className="founders-hero-excerpt">{heroStory.excerpt}</p>
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

        {/* PILLARS BANNER */}
        <div className="founders-pillars-banner">
          <div className="newspaper-container">
            <div className="pillars-grid">
              {founderPillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="pillar-card">
                    <Icon size={20} color="#ff6a00" />
                    <div>
                      <h4 className="pillar-title">{p.title}</h4>
                      <p className="pillar-desc">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="founders-page-layout">
            <div className="founders-left-content">
              <div className="section-header">
                <h2 className="section-header-title">FOUNDER INTERVIEWS &amp; INSIGHTS</h2>
              </div>

              <div className="founders-grid">
                {gridStories.map((item) => (
                  <article key={item.id} className="founders-item-card">
                    <Link href={`/article/${item.slug}`} className="img-link">
                      <div className="founders-thumb-wrap">
                        <Image src={item.image} alt={item.title} fill sizes="250px" style={{ objectFit: "cover" }} />
                      </div>
                    </Link>
                    <div className="founders-item-info">
                      <span className="card-orange-badge">{item.category}</span>
                      <h3 className="founders-item-title">
                        <Link href={`/article/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="founders-item-excerpt">{item.excerpt}</p>
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

            <div className="founders-sidebar-col">
              <RightSidebar trendingArticles={rawTrending} latestArticles={rawLatest} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .founders-editorial-hero {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .founders-badge { font-family: var(--font-ui); font-size: 11px; font-weight: 800; color: #ff6a00; letter-spacing: 0.12em; text-transform: uppercase; }
        .founders-title { font-family: var(--font-headline), Georgia, serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 800; color: #ffffff; margin: 6px 0 10px; }
        .founders-sub { font-family: var(--font-ui); font-size: 14px; color: #94a3b8; max-width: 680px; margin-bottom: 24px; }

        .founders-hero-card {
          display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; background: #1e293b; border: 1px solid #334155; padding: 20px; align-items: center;
        }
        .img-link { display: block; }
        .founders-hero-thumb { position: relative; width: 100%; height: 260px; background: #000; }
        .founders-hero-body { display: flex; flex-direction: column; gap: 8px; }
        .card-orange-badge { font-family: var(--font-ui); font-size: 10px; font-weight: 800; color: #ff6a00; letter-spacing: 0.1em; text-transform: uppercase; }
        .founders-hero-headline { font-family: var(--font-headline), Georgia, serif; font-size: 24px; font-weight: 800; margin: 0; }
        .founders-hero-headline a { color: #ffffff; text-decoration: none; }
        .founders-hero-headline a:hover { color: #ff6a00; }
        .founders-hero-excerpt { font-family: var(--font-ui); font-size: 13px; color: #cbd5e1; margin: 0; }

        .founders-pillars-banner { background: #09090b; color: #ffffff; padding-block: 24px; border-bottom: 1px solid #27272a; }
        .pillars-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .pillar-card { background: #18181b; border: 1px solid #27272a; padding: 16px; display: flex; gap: 12px; align-items: start; }
        .pillar-title { font-family: var(--font-headline), Georgia, serif; font-size: 14px; font-weight: 700; color: #ffffff; margin: 0 0 4px; }
        .pillar-desc { font-family: var(--font-ui); font-size: 11px; color: #a1a1aa; margin: 0; }

        .founders-page-layout { display: grid; grid-template-columns: 1fr 310px; gap: 36px; align-items: start; }
        .founders-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .founders-item-card { display: flex; flex-direction: column; gap: 10px; border: 1px solid #e2e8f0; padding: 16px; background: #ffffff; }
        .founders-thumb-wrap { position: relative; width: 100%; height: 150px; background: #f1f5f9; }
        .founders-item-info { display: flex; flex-direction: column; gap: 6px; }
        .founders-item-title { font-family: var(--font-headline), Georgia, serif; font-size: 17px; font-weight: 700; margin: 0; }
        .founders-item-title a { color: #0f172a; text-decoration: none; }
        .founders-item-title a:hover { color: #ff6a00; }
        .founders-item-excerpt { font-family: var(--font-ui); font-size: 13px; color: #475569; margin: 0; }

        .article-meta { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 4px; }
        .meta-dot { color: #cbd5e1; }

        @media (max-width: 900px) {
          .founders-hero-card { grid-template-columns: 1fr; }
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .founders-page-layout { grid-template-columns: 1fr; }
          .founders-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
