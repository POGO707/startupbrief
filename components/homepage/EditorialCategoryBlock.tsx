import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/articles";

interface EditorialCategoryBlockProps {
  title: string;
  categorySlug: string;
  viewAllLink: string;
}

export default async function EditorialCategoryBlock({
  title,
  categorySlug,
  viewAllLink,
}: EditorialCategoryBlockProps) {
  const articles = await getPublishedArticles({ categorySlug, take: 5 });
  const displayArticles = articles.length > 0 ? articles : await getPublishedArticles({ take: 5 });

  const featured = displayArticles[0];
  const gridItems = displayArticles.slice(1, 4);
  const sidebarItems = displayArticles.slice(1, 5);

  return (
    <section className="newspaper-category-block-wrapper" aria-label={`${title} Section`}>
      {/* SECTION HEADER */}
      <div className="section-header">
        <h2 className="section-header-title">{title}</h2>
        <Link href={viewAllLink} className="section-view-all-link">
          VIEW ALL &rarr;
        </Link>
      </div>

      {/* SECTION GRID */}
      <div className="category-block-grid">
        {/* LEFT MAIN AREA */}
        <div className="category-main-left">
          {/* FEATURED CARD */}
          {featured && (
            <article className="category-featured-card">
              <Link href={`/article/${featured.slug}`} className="cat-img-link">
                <div className="cat-featured-img-wrap">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 650px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
              <div className="cat-featured-body">
                <span className="card-orange-badge">{featured.category.toUpperCase()}</span>
                <h3 className="cat-featured-title">
                  <Link href={`/article/${featured.slug}`}>{featured.title}</Link>
                </h3>
                <p className="cat-featured-excerpt">{featured.excerpt}</p>
                <div className="cat-meta-row">
                  <span>By {featured.author}</span>
                  <span className="dot">•</span>
                  <span>{featured.publishedAt}</span>
                </div>
              </div>
            </article>
          )}

          {/* 3-COLUMN CARDS ROW */}
          <div className="category-cards-row">
            {gridItems.map((item, idx) => (
              <article key={item.slug || idx} className="cat-sub-card">
                <Link href={`/article/${item.slug}`} className="cat-sub-img-link">
                  <div className="cat-sub-img-wrap">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="220px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
                <div className="cat-sub-body">
                  <h4 className="cat-sub-title">
                    <Link href={`/article/${item.slug}`}>{item.title}</Link>
                  </h4>
                  <span className="cat-sub-date">{item.publishedAt}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR INSIDE CATEGORY BLOCK */}
        <aside className="category-sidebar-right">
          <div className="cat-sidebar-header">
            <span>TRENDING IN {title}</span>
          </div>

          <div className="cat-sidebar-body">
            <ul className="cat-sidebar-list" role="list">
              {sidebarItems.map((item, idx) => (
                <li key={item.slug || idx} className="cat-sidebar-item">
                  <span className="item-num">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="item-info">
                    <h5 className="item-title">
                      <Link href={`/article/${item.slug}`}>{item.title}</Link>
                    </h5>
                    <span className="item-time">{item.publishedAt}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <style>{`
        .newspaper-category-block-wrapper {
          width: 100%;
          margin-bottom: 40px;
        }
        .section-view-all-link {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #ff6a00;
          text-decoration: none;
        }
        .section-view-all-link:hover {
          text-decoration: underline;
        }

        .category-block-grid {
          display: grid;
          grid-template-columns: 2.2fr 1fr;
          gap: 24px;
          align-items: start;
        }

        /* MAIN LEFT */
        .category-main-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .category-featured-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 20px;
          border: 1px solid #e2e8f0;
          padding: 16px;
          align-items: center;
        }
        .cat-img-link { display: block; }
        .cat-featured-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          background: #f1f5f9;
        }
        .cat-featured-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .card-orange-badge {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .cat-featured-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 20px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
        }
        .cat-featured-title a { color: #0f172a; text-decoration: none; }
        .cat-featured-title a:hover { color: #ff6a00; }
        .cat-featured-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #475569;
          line-height: 1.45;
          margin: 0;
        }
        .cat-meta-row {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
          display: flex;
          gap: 6px;
        }

        .category-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .cat-sub-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cat-sub-img-wrap {
          position: relative;
          width: 100%;
          height: 110px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }
        .cat-sub-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .cat-sub-title a { color: #0f172a; text-decoration: none; }
        .cat-sub-title a:hover { color: #ff6a00; }
        .cat-sub-date {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #94a3b8;
        }

        /* SIDEBAR RIGHT */
        .category-sidebar-right {
          background: #ffffff;
          border: 1px solid #e2e8f0;
        }
        .cat-sidebar-header {
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
        .cat-sidebar-body {
          padding: 14px;
        }
        .cat-sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cat-sidebar-item {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f1f5f9;
          align-items: start;
        }
        .cat-sidebar-item:last-child { border-bottom: none; padding-bottom: 0; }
        .item-num {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 16px;
          font-weight: 800;
          color: #ff6a00;
        }
        .item-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .item-title a { color: #0f172a; text-decoration: none; }
        .item-title a:hover { color: #ff6a00; }
        .item-time {
          font-family: var(--font-ui), sans-serif;
          font-size: 9px;
          color: #94a3b8;
        }

        @media (max-width: 900px) {
          .category-block-grid { grid-template-columns: 1fr; }
          .category-featured-card { grid-template-columns: 1fr; }
          .category-cards-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
