import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";

export default async function FeatureGrid() {
  const articles = await getPublishedArticles({ take: 4, skip: 2 });

  const featureCards = articles.slice(0, 3).length > 0 ? articles.slice(0, 3) : [
    {
      slug: "london-workshop-making-tech-more-human",
      title: "A London Workshop Is Making Tech More Human",
      excerpt: "Maecenas ultrices neque nunc, et est placerat interdum.",
      category: "TECHNOLOGY",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop&auto=format",
    },
    {
      slug: "the-new-retirement-making-a-difference",
      title: "The New Retirement: Making a Difference",
      excerpt: "Fusee at ante luctus, non vestibula.",
      category: "BUSINESS, FINANCE",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop&auto=format",
    },
    {
      slug: "psy-gangnam-style-hits-record-milestones",
      title: "PSY — GANGNAM STYLE (강남스타일) M/V",
      excerpt: "Praesent augue sapien, vehicula eget.",
      category: "ARTS",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=300&fit=crop&auto=format",
    },
  ];

  const videoCard = articles[3] || {
    slug: "more-with-dwight-yoakam-in-the-studio",
    title: "Obama Inauguration Keynote Address & Economic Forecast",
    category: "VIDEOS",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&h=300&fit=crop&auto=format",
  };

  return (
    <section className="feature-grid-section" aria-label="Featured Stories & Videos">
      <div className="feature-grid-layout">
        {/* LEFT 3-CARD AREA WITH TABS */}
        <div className="feature-left-block">
          {/* TAB HEADER */}
          <div className="feature-tab-header">
            <button className="tab-btn red-active">MOST RECENT FEATURES</button>
            <button className="tab-btn dark-inactive">POPULAR FEATURES</button>
          </div>

          {/* 3 CARDS ROW */}
          <div className="feature-cards-row">
            {featureCards.map((card, idx) => (
              <article key={card.slug || idx} className="feature-card">
                <Link href={`/article/${card.slug}`} className="feature-card-img-link">
                  <div className="feature-img-wrap">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
                <div className="feature-card-body">
                  <span className="feature-category-label">{card.category.toUpperCase()}</span>
                  <h3 className="feature-card-title">
                    <Link href={`/article/${card.slug}`}>{card.title}</Link>
                  </h3>
                  <p className="feature-card-excerpt">{card.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT VIDEO BLOCK */}
        <aside className="feature-right-video-block">
          <div className="video-block-header">
            <span>MOST RECENT VIDEO</span>
          </div>

          <div className="video-card-body">
            <Link href={`/article/${videoCard.slug}`} className="video-thumb-link">
              <div className="video-thumb-wrap">
                <Image
                  src={videoCard.image}
                  alt={videoCard.title}
                  fill
                  sizes="300px"
                  style={{ objectFit: "cover" }}
                />
                <div className="play-button-overlay">
                  <Play size={20} fill="#fff" color="#fff" />
                </div>
              </div>
            </Link>
            <h4 className="video-card-title">
              <Link href={`/article/${videoCard.slug}`}>{videoCard.title}</Link>
            </h4>
          </div>
        </aside>
      </div>

      <style>{`
        .feature-grid-section {
          width: 100%;
          margin-bottom: 28px;
        }
        .feature-grid-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          align-items: start;
        }

        /* LEFT BLOCK */
        .feature-left-block {
          display: flex;
          flex-direction: column;
        }
        .feature-tab-header {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 16px;
        }
        .tab-btn {
          border: none;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 8px 16px;
          cursor: pointer;
          text-transform: uppercase;
        }
        .tab-btn.red-active {
          background: #dc2626;
          color: #ffffff;
        }
        .tab-btn.dark-inactive {
          background: #0f172a;
          color: #ffffff;
        }

        .feature-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .feature-img-wrap {
          position: relative;
          width: 100%;
          height: 120px;
          background: #e2e8f0;
          border: 1px solid #cbd5e1;
        }
        .feature-category-label {
          font-family: var(--font-ui), sans-serif;
          font-size: 9px;
          font-weight: 800;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .feature-card-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
        }
        .feature-card-title a {
          color: #0f172a;
          text-decoration: none;
        }
        .feature-card-title a:hover {
          color: #dc2626;
        }
        .feature-card-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          color: #64748b;
          line-height: 1.35;
          margin: 0;
        }

        /* RIGHT VIDEO BLOCK */
        .feature-right-video-block {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          display: flex;
          flex-direction: column;
        }
        .video-block-header {
          background: #0f172a;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 10px 14px;
          text-align: center;
          text-transform: uppercase;
        }
        .video-card-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .video-thumb-wrap {
          position: relative;
          width: 100%;
          height: 150px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .play-button-overlay {
          position: absolute;
          width: 44px;
          height: 44px;
          background: rgba(220, 38, 38, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 3px;
          z-index: 2;
          transition: transform 150ms ease;
        }
        .video-thumb-link:hover .play-button-overlay {
          transform: scale(1.1);
        }
        .video-card-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .video-card-title a {
          color: #0f172a;
          text-decoration: none;
        }
        .video-card-title a:hover {
          color: #dc2626;
        }

        @media (max-width: 900px) {
          .feature-grid-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .feature-cards-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
