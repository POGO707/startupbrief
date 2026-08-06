import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/articles";
import HeroSlider from "@/components/homepage/HeroSlider";

export default async function HeroSection() {
  // Fetch featured articles for slider
  const heroArticles = await getPublishedArticles({ isHero: true, take: 5 });
  const allArticles = await getPublishedArticles({ take: 8 });

  // If no specific hero articles, use top published articles
  const sliderArticles = heroArticles.length > 0 ? heroArticles : allArticles.slice(0, 5);

  const trendingList = allArticles.slice(1, 5).length > 0 ? allArticles.slice(1, 5) : [
    {
      id: "t1",
      slug: "openai-launches-gpt5-with-advanced-reasoning",
      title: "OpenAI Launches GPT-5 with Advanced Reasoning Capabilities",
      publishedAt: "AUG 1, 2026",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&h=150&fit=crop&auto=format",
    },
    {
      id: "t2",
      slug: "byjus-former-ceo-files-100m-fraud-case",
      title: "Byju's Former CEO Files $100M Fraud Case Against Trustee",
      publishedAt: "AUG 1, 2026",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=150&fit=crop&auto=format",
    },
    {
      id: "t3",
      slug: "isro-launches-digital-earth-observation-platform",
      title: "ISRO Launches Digital Earth Observation Platform 'Jordan AI'",
      publishedAt: "AUG 1, 2026",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=200&h=150&fit=crop&auto=format",
    },
    {
      id: "t4",
      slug: "indias-tv-sensing-pioneer-raises-50m-series-c",
      title: "India's TV Sensing Pioneer Raises $50M Series C",
      publishedAt: "AUG 1, 2026",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=150&fit=crop&auto=format",
    },
  ];

  return (
    <section className="newspaper-hero-layout" aria-label="Featured News Slider Section">
      {/* LEFT FEATURED NEWS AUTOMATIC SLIDER */}
      <HeroSlider articles={sliderArticles} />

      {/* RIGHT TRENDING SIDEBAR */}
      <aside className="hero-trending-sidebar">
        <div className="sidebar-header-bar">
          <span>TRENDING NOW</span>
        </div>

        <div className="sidebar-list-container">
          {trendingList.map((item, idx) => (
            <article key={item.slug || idx} className="sidebar-trending-item">
              <Link href={`/article/${item.slug}`} className="thumb-link">
                <div className="sidebar-thumb-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
              <div className="sidebar-item-info">
                <h3 className="sidebar-item-title">
                  <Link href={`/article/${item.slug}`}>{item.title}</Link>
                </h3>
                <span className="sidebar-item-date">{item.publishedAt}</span>
              </div>
            </article>
          ))}
        </div>
      </aside>

      <style>{`
        .newspaper-hero-layout {
          display: grid;
          grid-template-columns: 2.2fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
          align-items: stretch;
        }

        /* TRENDING SIDEBAR */
        .hero-trending-sidebar {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }
        .sidebar-header-bar {
          background: #0f172a;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 10px 14px;
          border-bottom: 2px solid #ff6a00;
          text-transform: uppercase;
        }
        .sidebar-list-container {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sidebar-trending-item {
          display: grid;
          grid-template-columns: 74px 1fr;
          gap: 12px;
          align-items: start;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }
        .sidebar-trending-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .sidebar-thumb-wrap {
          position: relative;
          width: 74px;
          height: 60px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }
        .sidebar-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sidebar-item-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .sidebar-item-title a {
          color: #0f172a;
          text-decoration: none;
        }
        .sidebar-item-title a:hover {
          color: #ff6a00;
        }
        .sidebar-item-date {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .newspaper-hero-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
