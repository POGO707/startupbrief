import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Play, Video, Eye, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Videos & Keynotes Desk — Startup Brief",
  description: "Exclusive founder keynotes, documentary features, technology teardowns, and video interviews.",
};

export default async function VideosPage() {
  const articles = await getPublishedArticles({ take: 6 });
  const heroVideo = articles[0];
  const gridVideos = articles.slice(1);

  const rawTrending = await getPublishedArticles({ take: 5, isTrending: true });
  const rawLatest = await getPublishedArticles({ take: 5 });

  return (
    <>
      <Header />
      <main id="main-content">
        {/* VIDEO THEATER HERO BANNER */}
        <div className="video-theater-hero">
          <div className="newspaper-container">
            <span className="video-badge">VIDEO THEATER DESK</span>
            <h1 className="video-hero-title">Keynotes, Documentary Features &amp; Breakdown Videos</h1>
            <p className="video-hero-sub">
              Watch high-production interviews with tech founders, architecture teardowns, and keynotes from major tech summits.
            </p>

            {heroVideo && (
              <div className="hero-video-theater-card">
                <Link href={`/article/${heroVideo.slug}`} className="video-hero-link">
                  <div className="hero-video-thumb-wrap">
                    <Image src={heroVideo.image} alt={heroVideo.title} fill priority sizes="(max-width: 900px) 100vw, 850px" style={{ objectFit: "cover" }} />
                    <div className="orange-play-button-lg">
                      <Play size={32} fill="#ffffff" color="#ffffff" />
                    </div>
                    <span className="duration-tag">24:15 FULL KEYNOTE</span>
                  </div>
                </Link>
                <div className="hero-video-body">
                  <span className="card-orange-badge">{heroVideo.category}</span>
                  <h2 className="hero-video-headline">
                    <Link href={`/article/${heroVideo.slug}`}>{heroVideo.title}</Link>
                  </h2>
                  <p className="hero-video-excerpt">{heroVideo.excerpt}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MAIN VIDEOS GRID WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="videos-page-layout">
            <div className="videos-left-content">
              <div className="section-header">
                <h2 className="section-header-title">POPULAR VIDEO BREAKDOWNS</h2>
              </div>

              <div className="videos-cards-grid">
                {gridVideos.map((item) => (
                  <article key={item.id} className="video-card-item">
                    <Link href={`/article/${item.slug}`} className="thumb-link">
                      <div className="video-card-thumb">
                        <Image src={item.image} alt={item.title} fill sizes="300px" style={{ objectFit: "cover" }} />
                        <div className="orange-play-overlay-sm">
                          <Play size={20} fill="#ffffff" color="#ffffff" />
                        </div>
                        <span className="video-time-tag">14:20</span>
                      </div>
                    </Link>
                    <div className="video-card-info">
                      <span className="card-orange-badge">{item.category}</span>
                      <h3 className="video-card-title">
                        <Link href={`/article/${item.slug}`}>{item.title}</Link>
                      </h3>
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

            <div className="videos-sidebar-col">
              <RightSidebar trendingArticles={rawTrending} latestArticles={rawLatest} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .video-theater-hero {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .video-badge { font-family: var(--font-ui); font-size: 11px; font-weight: 800; color: #ff6a00; letter-spacing: 0.12em; text-transform: uppercase; }
        .video-hero-title { font-family: var(--font-headline), Georgia, serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 800; color: #ffffff; margin: 6px 0 10px; }
        .video-hero-sub { font-family: var(--font-ui); font-size: 14px; color: #94a3b8; max-width: 680px; margin-bottom: 28px; }

        .hero-video-theater-card { background: #1e293b; border: 1px solid #334155; overflow: hidden; }
        .video-hero-link { display: block; position: relative; }
        .hero-video-thumb-wrap { position: relative; width: 100%; height: 380px; background: #000; display: flex; align-items: center; justify-content: center; }
        .orange-play-button-lg { position: absolute; width: 64px; height: 64px; background: #ff6a00; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding-left: 4px; z-index: 2; transition: transform 200ms ease; }
        .hero-video-link:hover .orange-play-button-lg { transform: scale(1.1); }
        .duration-tag { position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.85); color: #fff; font-family: var(--font-ui); font-size: 11px; font-weight: 800; padding: 4px 10px; z-index: 2; }

        .hero-video-body { padding: 24px; display: flex; flex-direction: column; gap: 8px; }
        .card-orange-badge { font-family: var(--font-ui); font-size: 10px; font-weight: 800; color: #ff6a00; letter-spacing: 0.1em; text-transform: uppercase; }
        .hero-video-headline { font-family: var(--font-headline), Georgia, serif; font-size: 26px; font-weight: 800; margin: 0; }
        .hero-video-headline a { color: #ffffff; text-decoration: none; }
        .hero-video-headline a:hover { color: #ff6a00; }
        .hero-video-excerpt { font-family: var(--font-ui); font-size: 14px; color: #cbd5e1; margin: 0; }

        .videos-page-layout { display: grid; grid-template-columns: 1fr 310px; gap: 36px; align-items: start; }
        .videos-cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .video-card-item { display: flex; flex-direction: column; gap: 10px; border: 1px solid #e2e8f0; padding: 14px; background: #ffffff; }
        .video-card-thumb { position: relative; width: 100%; height: 160px; background: #000; display: flex; align-items: center; justify-content: center; }
        .orange-play-overlay-sm { position: absolute; width: 42px; height: 42px; background: #ff6a00; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding-left: 3px; z-index: 2; }
        .video-time-tag { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.85); color: #fff; font-family: var(--font-ui); font-size: 10px; font-weight: 700; padding: 2px 6px; z-index: 2; }
        .video-card-info { display: flex; flex-direction: column; gap: 6px; }
        .video-card-title { font-family: var(--font-headline), Georgia, serif; font-size: 16px; font-weight: 700; margin: 0; }
        .video-card-title a { color: #0f172a; text-decoration: none; }
        .video-card-title a:hover { color: #ff6a00; }

        .article-meta { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 4px; }
        .meta-dot { color: #cbd5e1; }

        @media (max-width: 900px) {
          .videos-page-layout { grid-template-columns: 1fr; }
          .videos-cards-grid { grid-template-columns: 1fr; }
          .hero-video-thumb-wrap { height: 250px; }
        }
      `}</style>
    </>
  );
}
