import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/articles";

export default async function TopPicks() {
  const articles = await getPublishedArticles({ isEditorsPick: true, take: 4 });
  const displayArticles = articles.length >= 4 ? articles : await getPublishedArticles({ take: 4, skip: 3 });

  return (
    <section className="newspaper-section-block" aria-label="Editor's Picks">
      <div className="section-header">
        <h2 className="section-header-title">EDITOR&apos;S PICKS</h2>
      </div>

      <div className="editors-picks-grid">
        {displayArticles.map((item, idx) => (
          <article key={item.slug || idx} className="editors-card">
            <Link href={`/article/${item.slug}`} className="card-thumb-link">
              <div className="editors-thumb-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
            <div className="editors-card-body">
              <span className="card-orange-badge">{item.category.toUpperCase()}</span>
              <h3 className="editors-card-title">
                <Link href={`/article/${item.slug}`}>{item.title}</Link>
              </h3>
              <span className="editors-card-time">{item.publishedAt}</span>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .newspaper-section-block {
          width: 100%;
          margin-bottom: 36px;
        }
        .editors-picks-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .editors-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 14px;
        }
        .card-thumb-link { display: block; }
        .editors-thumb-wrap {
          position: relative;
          width: 100%;
          height: 140px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }
        .editors-card-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .card-orange-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .editors-card-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .editors-card-title a {
          color: #0f172a;
          text-decoration: none;
        }
        .editors-card-title a:hover {
          color: #ff6a00;
        }
        .editors-card-time {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .editors-picks-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .editors-picks-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
