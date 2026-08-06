import Link from "next/link";
import Image from "next/image";
import { Grid, List, Play } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";

export default async function CategorySectionTwo() {
  const articles = await getPublishedArticles({ categorySlug: "ai", take: 5 });
  const allArticles = articles.length >= 4 ? articles : await getPublishedArticles({ take: 5 });

  const mainStory = allArticles[0] || {
    slug: "artificial-intelligence-and-future-of-media",
    title: "Artificial Intelligence & Future of Media: Next-Gen Content Models",
    publishedAt: "AUG 1, 2026",
    author: "Startup Brief Admin",
    category: "AI & TECHNOLOGY",
    excerpt: "Exploring neural synthesis, automated video editing, and modern editorial dispatches.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&h=600&fit=crop&auto=format",
    tags: ["ai", "media", "technology"],
  };

  const popularVideo = allArticles[1] || {
    slug: "autonomous-ai-agents-breakthrough-video",
    title: "Autonomous AI Agents Demonstration: Enterprise Workflows",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=300&fit=crop&auto=format",
  };

  const listItems = allArticles.slice(2, 5);

  return (
    <section className="category-section-wrapper" aria-label="AI & Technology Section">
      {/* SECTION BANNER */}
      <div className="category-section-banner">
        <span className="banner-title-text">AI &amp; TECHNOLOGY ARTICLES</span>
        <div className="banner-view-toggle">
          <button aria-label="Grid view" className="view-btn active"><Grid size={13} /></button>
          <button aria-label="List view" className="view-btn"><List size={13} /></button>
        </div>
      </div>

      {/* SECTION CONTENT GRID */}
      <div className="category-section-grid">
        {/* MAIN HORIZONTAL FEATURED CARD LEFT */}
        <article className="cat-horizontal-main-card">
          <div className="cat-horizontal-img-wrap">
            <Image
              src={mainStory.image}
              alt={mainStory.title}
              fill
              sizes="(max-width: 900px) 100vw, 600px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="cat-horizontal-content">
            <h2 className="cat-horizontal-title">
              <Link href={`/article/${mainStory.slug}`}>{mainStory.title}</Link>
            </h2>
            <span className="cat-horizontal-meta">
              {mainStory.publishedAt} - {mainStory.category} / By {mainStory.author}
            </span>
            <p className="cat-horizontal-excerpt">{mainStory.excerpt}</p>
            <div className="cat-tags-row">
              <span>Tags:</span>
              {mainStory.tags?.map((t: string) => (
                <span key={t} className="tag-link">{t}</span>
              ))}
            </div>
          </div>
        </article>

        {/* RIGHT SIDEBAR INSIDE SECTION */}
        <aside className="section-sidebar-right">
          <div className="sidebar-popular-header">
            <span>POPULAR ON THIS CATEGORY</span>
          </div>

          <div className="sidebar-popular-body">
            {/* VIDEO FEATURED THUMBNAIL ITEM */}
            <div className="popular-video-item">
              <Link href={`/article/${popularVideo.slug}`} className="video-thumb-link">
                <div className="popular-video-thumb-wrap">
                  <Image
                    src={popularVideo.image}
                    alt={popularVideo.title}
                    fill
                    sizes="280px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="play-button-overlay">
                    <Play size={18} fill="#fff" color="#fff" />
                  </div>
                </div>
              </Link>
              <h4 className="popular-video-title">
                <Link href={`/article/${popularVideo.slug}`}>{popularVideo.title}</Link>
              </h4>
            </div>

            {/* HEADLINE LIST */}
            <ul className="popular-list-headlines" role="list">
              {listItems.map((item, idx) => (
                <li key={item.slug || idx} className="popular-headline-item">
                  <Link href={`/article/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <style>{`
        .cat-horizontal-main-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #ffffff;
        }
        .cat-horizontal-img-wrap {
          position: relative;
          width: 100%;
          height: 260px;
          background: #000;
        }
        .cat-horizontal-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cat-horizontal-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 22px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
        }
        .cat-horizontal-title a { color: #0f172a; text-decoration: none; }
        .cat-horizontal-title a:hover { color: #ff6a00; }
        .cat-horizontal-meta {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #94a3b8;
        }
        .cat-horizontal-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #475569;
          line-height: 1.45;
          margin: 0;
        }

        .popular-video-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 10px;
        }
        .popular-video-thumb-wrap {
          position: relative;
          width: 100%;
          height: 130px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popular-video-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          margin: 0;
        }
        .popular-video-title a { color: #0f172a; text-decoration: none; }
        .popular-video-title a:hover { color: #ff6a00; }
      `}</style>
    </section>
  );
}
