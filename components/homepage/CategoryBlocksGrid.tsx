import Link from "next/link";
import Image from "next/image";
import { getPublishedArticles } from "@/lib/articles";

const categoryList = [
  { name: "AI", slug: "ai", count: "25 ARTICLES", defaultImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop&auto=format" },
  { name: "STARTUPS", slug: "startups", count: "42 ARTICLES", defaultImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format" },
  { name: "FUNDING", slug: "funding", count: "18 ARTICLES", defaultImg: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=400&h=250&fit=crop&auto=format" },
  { name: "TECHNOLOGY", slug: "technology", count: "30 ARTICLES", defaultImg: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&auto=format" },
  { name: "BUSINESS", slug: "business", count: "28 ARTICLES", defaultImg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop&auto=format" },
];

export default async function CategoryBlocksGrid() {
  const categoryData = await Promise.all(
    categoryList.map(async (cat) => {
      const articles = await getPublishedArticles({ categorySlug: cat.slug, take: 3 });
      return {
        ...cat,
        articles,
      };
    })
  );

  return (
    <section className="newspaper-category-blocks-section" aria-label="Category Overview Grid">
      <div className="category-blocks-grid">
        {categoryData.map((cat) => {
          const mainImg = cat.articles[0]?.image || cat.defaultImg;
          const bullets = cat.articles.length > 0 ? cat.articles : [
            { id: "1", title: "GPT-5 Launch and Features", slug: "openai-gpt5-changes-everything" },
            { id: "2", title: "Claude 4 Is Now Available", slug: "anthropic-claude-4-enterprise" },
            { id: "3", title: "AI in Healthcare: What's Next?", slug: "ai-in-healthcare" },
          ];

          return (
            <div key={cat.slug} className="category-block-card">
              <div className="cat-card-header">
                <h3 className="cat-card-name">{cat.name}</h3>
                <span className="cat-card-count">{cat.count}</span>
              </div>

              <Link href={`/${cat.slug}`}>
                <div className="cat-card-thumb img-hover">
                  <Image
                    src={mainImg}
                    alt={cat.name}
                    fill
                    sizes="200px"
                    className="cat-card-img"
                  />
                </div>
              </Link>

              <ul className="cat-card-bullets" role="list">
                {bullets.slice(0, 3).map((item) => (
                  <li key={item.id} className="bullet-item">
                    <span className="bullet-dot" aria-hidden="true">&bull;</span>
                    <Link href={`/article/${item.slug}`} className="bullet-link">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="cat-card-footer">
                <Link href={`/${cat.slug}`} className="cat-view-all-link">
                  VIEW ALL &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .newspaper-category-blocks-section {
          width: 100%;
          margin-top: 24px;
          padding-top: 32px;
          border-top: 2px solid var(--color-text);
        }
        .category-blocks-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .category-block-card {
          border: 1px solid var(--color-border);
          padding: 14px;
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cat-card-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cat-card-name {
          font-family: var(--font-ui);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-text);
          margin: 0;
        }
        .cat-card-count {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--color-muted);
        }
        .cat-card-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 2px;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .cat-card-img { object-fit: cover; }
        .cat-card-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-family: var(--font-ui);
          font-size: 11px;
          line-height: 1.35;
        }
        .bullet-dot {
          color: var(--color-muted);
          font-size: 12px;
          line-height: 1;
        }
        .bullet-link {
          color: var(--color-text);
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 150ms ease;
        }
        .bullet-link:hover {
          color: var(--color-primary);
        }
        .cat-card-footer {
          padding-top: 6px;
          border-top: 1px solid var(--color-border);
        }
        .cat-view-all-link {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-text);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .cat-view-all-link:hover {
          color: var(--color-primary);
        }
        @media (max-width: 1200px) {
          .category-blocks-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .category-blocks-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .category-blocks-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
