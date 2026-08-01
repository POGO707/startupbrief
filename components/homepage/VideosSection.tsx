import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { videos } from "@/lib/data";

export default function VideosSection() {
  const [featured, ...playlist] = videos;

  return (
    <section className="videos-section section editorial-border-top" aria-label="Videos">
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-title">Videos & Multimedia</h2>
        </div>

        <div className="videos-layout">
          {/* ─── FEATURED VIDEO ─── */}
          <article className="video-featured">
            <a
              href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-featured-thumb"
              aria-label={`Watch: ${featured.title}`}
            >
              <Image
                src={featured.thumbnail}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="video-thumb-img"
              />
              <div className="video-overlay" aria-hidden="true" />
              <div className="video-play-btn" aria-hidden="true">
                <Play size={28} fill="var(--color-bg)" color="var(--color-bg)" />
              </div>
              <span className="video-duration">{featured.duration}</span>
            </a>
            <div className="video-featured-body">
              <span className="badge">{featured.channel}</span>
              <h3 className="video-featured-title">
                <a
                  href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-headline"
                >
                  {featured.title}
                </a>
              </h3>
              <p className="video-featured-excerpt">{featured.excerpt}</p>
              <div className="article-meta" style={{ marginTop: 10 }}>
                <span className="meta-text">{featured.publishedAt}</span>
              </div>
              <Link href={`/videos/${featured.slug}`} className="btn-video-read">
                Read Summary <ArrowRight size={12} />
              </Link>
            </div>
          </article>

          {/* ─── PLAYLIST ─── */}
          <div className="video-playlist">
            <div className="video-playlist-header">
              <span className="video-playlist-label">Up Next</span>
            </div>
            {playlist.map((video) => (
              <article key={video.id} className="video-playlist-item">
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-playlist-thumb-wrap"
                  aria-label={`Watch: ${video.title}`}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="140px"
                    className="video-thumb-img"
                  />
                  <div className="video-playlist-play" aria-hidden="true">
                    <Play size={14} fill="var(--color-bg)" color="var(--color-bg)" />
                  </div>
                  <span className="video-playlist-duration">{video.duration}</span>
                </a>
                <div className="video-playlist-info">
                  <span className="badge">{video.channel}</span>
                  <h4 className="video-playlist-title link-headline">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {video.title}
                    </a>
                  </h4>
                  <span className="meta-text">{video.publishedAt}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .videos-section {
          background: var(--color-bg);
        }
        .videos-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* ─── FEATURED VIDEO ─── */
        .video-featured {
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--color-border-dark);
          padding-right: 40px;
        }
        .video-featured-thumb {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          border: 1px solid var(--color-border);
          cursor: pointer;
          margin-bottom: 24px;
        }
        .video-thumb-img {
          object-fit: cover;
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.2);
          transition: background 300ms ease;
        }
        .video-featured-thumb:hover .video-overlay {
          background: rgba(0,0,0,0.1);
        }
        .video-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          background: var(--color-text);
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: background 200ms ease, transform 200ms ease;
        }
        .video-featured-thumb:hover .video-play-btn {
          background: var(--color-primary);
        }
        .video-duration {
          position: absolute;
          bottom: 12px;
          right: 12px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          color: var(--color-bg);
          background: var(--color-text);
          padding: 4px 8px;
          z-index: 2;
        }
        .video-featured-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }
        .video-featured-title {
          font-family: var(--font-headline);
          font-size: clamp(24px, 2.5vw, 32px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 500;
        }
        .video-featured-title a {
          text-decoration: none;
        }
        .video-featured-excerpt {
          font-family: var(--font-ui);
          font-size: 15px;
          color: var(--color-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .btn-video-read {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          margin-top: 8px;
          border-bottom: 1px solid var(--color-text);
          padding-bottom: 2px;
        }

        /* ─── PLAYLIST ─── */
        .video-playlist {
          display: flex;
          flex-direction: column;
        }
        .video-playlist-header {
          padding-bottom: 12px;
          border-bottom: 2px solid var(--color-text);
          margin-bottom: 0;
        }
        .video-playlist-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .video-playlist-item {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .video-playlist-item:last-child {
          border-bottom: none;
        }
        .video-playlist-thumb-wrap {
          position: relative;
          display: block;
          width: 140px;
          height: 90px;
          border: 1px solid var(--color-border);
          overflow: hidden;
          flex-shrink: 0;
          cursor: pointer;
        }
        .video-playlist-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          background: var(--color-text);
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .video-playlist-duration {
          position: absolute;
          bottom: 6px;
          right: 6px;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          color: var(--color-bg);
          background: var(--color-text);
          padding: 2px 6px;
          z-index: 2;
        }
        .video-playlist-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }
        .video-playlist-title {
          font-family: var(--font-headline);
          font-size: 16px;
          line-height: 1.25;
          letter-spacing: -0.01em;
          font-weight: 500;
        }
        .video-playlist-title a {
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .videos-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .video-featured {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border-dark);
            padding-bottom: 32px;
          }
        }
        @media (max-width: 480px) {
          .video-playlist-item {
            grid-template-columns: 100px 1fr;
          }
          .video-playlist-thumb-wrap {
            width: 100px;
            height: 70px;
          }
        }
      `}</style>
    </section>
  );
}
