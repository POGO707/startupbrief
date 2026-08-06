import Link from "next/link";
import Image from "next/image";
import type { FormattedArticle } from "@/lib/articles";
import AdPlaceholder from "@/components/common/AdPlaceholder";

interface RightSidebarProps {
  trendingArticles?: FormattedArticle[];
  latestArticles?: FormattedArticle[];
}

export default function RightSidebar({ trendingArticles = [], latestArticles = [] }: RightSidebarProps) {
  const trendingList = trendingArticles.slice(0, 5);
  const editorsChoiceMain = latestArticles[0] || {
    id: "ec-1",
    slug: "rise-of-autonomous-ai-agents",
    title: "The Rise of Autonomous AI Agents: What Comes Next?",
    publishedAt: "AUG 1, 2026",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&auto=format",
  };
  const editorsChoiceSub = latestArticles.slice(1, 3);

  return (
    <aside className="newspaper-right-sidebar" aria-label="Trending and Sidebar Content">
      {/* ─── CARD 1: TRENDING NOW ─── */}
      <div className="sidebar-card">
        <h2 className="sidebar-card-title">TRENDING NOW</h2>
        <div className="side-articles-list">
          {trendingList.map((art, idx) => (
            <article key={art.id || idx} className="side-article-item">
              <Link href={`/article/${art.slug}`} className="side-article-thumb-link">
                <div className="side-article-thumb img-hover">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="64px"
                    className="thumb-img"
                  />
                </div>
              </Link>
              <div className="side-article-info">
                <h3 className="side-article-title link-headline">
                  <Link href={`/article/${art.slug}`}>{art.title}</Link>
                </h3>
                <span className="side-article-time">{`${(idx + 1) * 2} HOURS AGO`}</span>
              </div>
            </article>
          ))}
        </div>
        <Link href="/search?cat=trending" className="view-all-trending-btn">
          VIEW ALL TRENDING
        </Link>
      </div>

      {/* ─── CARD 2: ADVERTISEMENT PLACEHOLDER ─── */}
      <AdPlaceholder format="300x250" />

      {/* ─── CARD 3: NEWSLETTER CARD ─── */}
      <div className="sidebar-card newsletter-sidebar-card">
        <span className="newsletter-card-label">NEWSLETTER</span>
        <h3 className="newsletter-card-title">Get the latest startup news in your inbox.</h3>
        <p className="newsletter-card-sub">
          Join 50,000+ founders, investors &amp; operators who read Startup Brief daily.
        </p>
        <form action="/newsletter" method="POST" className="newsletter-card-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-card-input"
            required
          />
          <button type="submit" className="newsletter-card-submit">
            SUBSCRIBE
          </button>
        </form>
      </div>

      {/* ─── CARD 4: EDITORS CHOICE ─── */}
      <div className="sidebar-card editors-choice-card">
        <h2 className="sidebar-card-title">EDITORS CHOICE</h2>
        <div className="editors-choice-main">
          <Link href={`/article/${editorsChoiceMain.slug}`}>
            <div className="choice-thumb-wrap img-hover">
              <Image
                src={editorsChoiceMain.image}
                alt={editorsChoiceMain.title}
                fill
                sizes="300px"
                className="choice-img"
              />
            </div>
          </Link>
          <h3 className="choice-title link-headline">
            <Link href={`/article/${editorsChoiceMain.slug}`}>{editorsChoiceMain.title}</Link>
          </h3>
          <span className="choice-meta">{editorsChoiceMain.publishedAt} · {editorsChoiceMain.readingTime || 5} MIN READ</span>
        </div>

        <div className="editors-choice-sublist">
          {editorsChoiceSub.map((sub, i) => (
            <article key={sub.id || i} className="choice-sub-item">
              <h4 className="choice-sub-title link-headline">
                <Link href={`/article/${sub.slug}`}>{sub.title}</Link>
              </h4>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .newspaper-right-sidebar {
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: sticky;
          top: 80px;
        }
        .sidebar-card {
          border: 1px solid var(--color-border);
          padding: 20px;
          background: #fff;
        }
        .sidebar-card-title {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--color-text);
        }
        .side-articles-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .side-article-item {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 12px;
          align-items: start;
        }
        .side-article-thumb-link { display: block; }
        .side-article-thumb {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 2px;
          overflow: hidden;
          background: #f4f4f5;
          border: 1px solid var(--color-border);
        }
        .thumb-img { object-fit: cover; }
        .side-article-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .side-article-title {
          font-family: var(--font-headline);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.3;
          color: var(--color-text);
        }
        .side-article-time {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        .view-all-trending-btn {
          display: block;
          width: 100%;
          text-align: center;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 10px 0;
          border: 1px solid var(--color-border-dark);
          color: var(--color-text);
          text-decoration: none;
          margin-top: 16px;
          transition: all 150ms ease;
        }
        .view-all-trending-btn:hover {
          background: var(--color-text);
          color: #fff;
        }
        .ad-header {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-muted);
          text-align: center;
          margin-bottom: 8px;
        }
        .ad-card.vercel-ad {
          background: #000;
          color: #fff;
          padding: 20px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ad-brand-logo { font-family: var(--font-ui); font-size: 13px; font-weight: 800; }
        .ad-title { font-family: var(--font-headline); font-size: 17px; font-weight: 600; line-height: 1.25; }
        .ad-desc { font-family: var(--font-ui); font-size: 11px; color: rgba(255,255,255,0.7); line-height: 1.4; }
        .ad-btn {
          display: inline-block; font-family: var(--font-ui); font-size: 10px; font-weight: 700;
          padding: 5px 12px; background: #fff; color: #000; text-decoration: none; border-radius: 2px;
          align-self: flex-start;
        }
        .newsletter-sidebar-card {
          background: #fafafa;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .newsletter-card-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-text);
          text-transform: uppercase;
        }
        .newsletter-card-title {
          font-family: var(--font-headline);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.25;
        }
        .newsletter-card-sub {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-secondary);
          line-height: 1.45;
        }
        .newsletter-card-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 6px;
        }
        .newsletter-card-input {
          width: 100%;
          font-family: var(--font-ui);
          font-size: 13px;
          padding: 10px 12px;
          border: 1px solid var(--color-border);
          outline: none;
          background: #fff;
        }
        .newsletter-card-submit {
          width: 100%;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 10px;
          background: #000;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .newsletter-card-submit:hover {
          background: var(--color-primary);
        }
        .editors-choice-main {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--color-border);
        }
        .choice-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 2px;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .choice-img { object-fit: cover; }
        .choice-title {
          font-family: var(--font-headline);
          font-size: 15px;
          font-weight: 600;
          line-height: 1.25;
        }
        .choice-meta {
          font-family: var(--font-ui);
          font-size: 10px;
          color: var(--color-muted);
        }
        .editors-choice-sublist {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 12px;
        }
        .choice-sub-item {
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border);
        }
        .choice-sub-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .choice-sub-title {
          font-family: var(--font-headline);
          font-size: 13px;
          font-weight: 500;
          line-height: 1.3;
        }
      `}</style>
    </aside>
  );
}
