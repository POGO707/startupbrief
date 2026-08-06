import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/articles";

export default async function TopStories() {
  const articles = await getPublishedArticles({ take: 1, categorySlug: "technology" });
  const story = articles[0] || {
    slug: "isro-successfully-launches-eos09-satellite",
    title: "ISRO Successfully Launches EOS-09 Satellite: Strengthens India's Earth Observation Capabilities",
    excerpt: "The satellite will enhance disaster monitoring, agriculture planning, climate tracking, and infrastructure management across South Asia with sub-meter radar imaging.",
    category: "TECHNOLOGY",
    author: "Startup Brief Admin",
    publishedAt: "AUG 1, 2026",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1000&h=600&fit=crop&auto=format",
  };

  return (
    <section className="newspaper-section-block" aria-label="Latest Stories">
      <div className="section-header">
        <h2 className="section-header-title">LATEST STORIES</h2>
      </div>

      <article className="latest-horizontal-card">
        <Link href={`/article/${story.slug}`} className="latest-img-link">
          <div className="latest-thumb-wrap">
            <Image
              src={story.image}
              alt={story.title}
              fill
              sizes="(max-width: 900px) 100vw, 600px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>

        <div className="latest-card-content">
          <span className="card-orange-badge">{story.category.toUpperCase()}</span>
          <h3 className="latest-card-title">
            <Link href={`/article/${story.slug}`}>{story.title}</Link>
          </h3>
          <p className="latest-card-excerpt">{story.excerpt}</p>

          <div className="latest-author-meta">
            <span className="author-name">By {story.author}</span>
            <span className="meta-dot">•</span>
            <span className="meta-date">{story.publishedAt}</span>
            <span className="meta-dot">•</span>
            <span className="meta-date">{story.readingTime || 4} MIN READ</span>
          </div>
        </div>
      </article>

      <style>{`
        .latest-horizontal-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          padding: 20px;
          align-items: center;
        }
        .latest-img-link { display: block; }
        .latest-thumb-wrap {
          position: relative;
          width: 100%;
          height: 280px;
          background: #f1f5f9;
        }
        .latest-card-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .card-orange-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .latest-card-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(22px, 2.8vw, 32px);
          font-weight: 800;
          line-height: 1.15;
          margin: 0;
        }
        .latest-card-title a {
          color: #0f172a;
          text-decoration: none;
        }
        .latest-card-title a:hover {
          color: #ff6a00;
        }
        .latest-card-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }
        .latest-author-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          margin-top: 4px;
        }
        .meta-dot { color: #cbd5e1; }

        @media (max-width: 900px) {
          .latest-horizontal-card { grid-template-columns: 1fr; }
          .latest-thumb-wrap { height: 220px; }
        }
      `}</style>
    </section>
  );
}
