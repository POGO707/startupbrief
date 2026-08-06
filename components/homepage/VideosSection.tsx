import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";

export default async function VideosSection() {
  const articles = await getPublishedArticles({ take: 3 });

  return (
    <section className="newspaper-section-block" aria-label="Videos Section">
      <div className="section-header">
        <h2 className="section-header-title">VIDEOS</h2>
        <Link href="/videos" className="section-view-all-link">
          VIEW ALL VIDEOS &rarr;
        </Link>
      </div>

      <div className="videos-grid">
        {articles.map((item, idx) => (
          <article key={item.slug || idx} className="video-card">
            <Link href={`/article/${item.slug}`} className="video-thumb-link">
              <div className="video-thumb-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="400px"
                  style={{ objectFit: "cover" }}
                />
                <div className="orange-play-overlay">
                  <Play size={22} fill="#ffffff" color="#ffffff" />
                </div>
                <span className="video-duration-badge">12:45</span>
              </div>
            </Link>
            <div className="video-info">
              <span className="card-orange-badge">{item.category.toUpperCase()}</span>
              <h3 className="video-title">
                <Link href={`/article/${item.slug}`}>{item.title}</Link>
              </h3>
              <span className="video-time">{item.publishedAt}</span>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .newspaper-section-block {
          width: 100%;
          margin-bottom: 40px;
        }
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .video-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border: 1px solid #e2e8f0;
          padding: 12px;
          background: #ffffff;
        }
        .video-thumb-link { display: block; }
        .video-thumb-wrap {
          position: relative;
          width: 100%;
          height: 180px;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orange-play-overlay {
          position: absolute;
          width: 48px;
          height: 48px;
          background: #ff6a00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
          z-index: 2;
          transition: transform 150ms ease;
        }
        .video-thumb-link:hover .orange-play-overlay {
          transform: scale(1.1);
        }
        .video-duration-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.85);
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          z-index: 2;
        }
        .video-info {
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
        .video-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .video-title a { color: #0f172a; text-decoration: none; }
        .video-title a:hover { color: #ff6a00; }
        .video-time {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #94a3b8;
        }

        @media (max-width: 900px) {
          .videos-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
