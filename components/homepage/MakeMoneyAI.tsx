import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Clock } from "lucide-react";
import { makeMoneyArticles } from "@/lib/data";

export default function MakeMoneyAI() {
  const [featured, ...guides] = makeMoneyArticles;

  return (
    <section className="make-money-section section" aria-label="Make money with AI">
      <div className="container">
        <div className="make-money-header">
          <div>
            <div className="section-header" style={{ marginBottom: 4, paddingBottom: 8, borderBottomWidth: 1, borderColor: "var(--color-primary)" }}>
              <span style={{ width: 24, height: 2, background: "var(--color-primary)", flexShrink: 0 }} aria-hidden="true" />
              <h2 className="section-header-title" style={{ color: "var(--color-primary)" }}>
                Make Money with AI
              </h2>
              <Link href="/make-money-with-ai" className="section-header-link">
                All Tutorials <ArrowRight size={12} />
              </Link>
            </div>
            <p className="make-money-sub">
              Practical AI tutorials, workflows, and strategies for founders and creators.
            </p>
          </div>
        </div>

        <div className="make-money-grid">
          {/* ─── FEATURED TUTORIAL ─── */}
          <article className="mm-featured">
            <div className="mm-featured-img img-hover">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="mm-img"
              />
              <div className="mm-featured-badge">
                <Zap size={12} fill="currentColor" />
                Step-by-Step Tutorial
              </div>
            </div>
            <div className="mm-featured-body">
              <Link href={`/article/${featured.slug}`} className="badge">
                {featured.category}
              </Link>
              <h3 className="mm-featured-title">
                <Link href={`/article/${featured.slug}`} className="link-headline">
                  {featured.title}
                </Link>
              </h3>
              <p className="mm-featured-excerpt">{featured.excerpt}</p>
              <div className="article-meta" style={{ marginTop: 14 }}>
                <Image
                  src={featured.authorAvatar}
                  alt={featured.author}
                  width={26}
                  height={26}
                  className="mm-avatar"
                />
                <span className="meta-text">{featured.author}</span>
                <span className="meta-dot" aria-hidden="true" />
                <Clock size={11} color="var(--color-muted)" />
                <span className="meta-text">{featured.readingTime} min read</span>
              </div>
              <Link
                href={`/article/${featured.slug}`}
                className="mm-read-btn"
              >
                Read Tutorial <ArrowRight size={13} />
              </Link>
            </div>
          </article>

          {/* ─── QUICK GUIDES ─── */}
          <div className="mm-guides">
            <div className="mm-guides-header">
              <span className="mm-guides-label">Quick Guides</span>
            </div>
            {guides.map((article) => (
              <article key={article.id} className="mm-guide-item">
                <div className="mm-guide-img img-hover">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="80px"
                    className="mm-img"
                  />
                </div>
                <div className="mm-guide-body">
                  <Link href={`/article/${article.slug}`} className="badge" style={{ marginBottom: 5 }}>
                    {article.category}
                  </Link>
                  <h3 className="mm-guide-title">
                    <Link href={`/article/${article.slug}`} className="link-headline">
                      {article.title}
                    </Link>
                  </h3>
                  <div className="article-meta" style={{ marginTop: 8 }}>
                    <span className="meta-text">{article.author}</span>
                    <span className="meta-dot" aria-hidden="true" />
                    <span className="meta-text">{article.readingTime} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ─── POPULAR WORKFLOWS ─── */}
          <div className="mm-workflows">
            <div className="mm-guides-header">
              <span className="mm-guides-label">Popular AI Workflows</span>
            </div>
            {[
              { title: "From Idea to MVP: The 7-Day AI Sprint", steps: 7, readers: "12.4K" },
              { title: "The Solopreneur AI Stack: 12 Tools That Replace a Team", steps: 12, readers: "9.8K" },
              { title: "AI Content System: From One Idea to 50 Pieces", steps: 5, readers: "18.2K" },
              { title: "How to Automate Your Entire Email With AI", steps: 6, readers: "7.3K" },
              { title: "Building a $5K/Month AI Passive Income Stream", steps: 8, readers: "15.6K" },
            ].map((wf, i) => (
              <a key={i} href="#" className="mm-workflow-item">
                <span className="mm-workflow-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="mm-workflow-title">{wf.title}</span>
                <span className="mm-workflow-meta">
                  <span>{wf.steps} steps</span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span>{wf.readers} readers</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .make-money-section {
          background: #fafafa;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .make-money-header {
          margin-bottom: 32px;
        }
        .make-money-sub {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          margin-top: 8px;
        }
        .make-money-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ─── FEATURED ─── */
        .mm-featured {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .mm-featured-img {
          position: relative;
          width: 100%;
          height: 280px;
          margin-bottom: 20px;
        }
        .mm-img {
          object-fit: cover;
        }
        .mm-featured-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--color-primary);
          color: #fff;
          padding: 5px 10px;
          z-index: 2;
        }
        .mm-featured-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mm-featured-title {
          font-family: var(--font-headline);
          font-size: clamp(18px, 1.8vw, 24px);
          line-height: 1.2;
          letter-spacing: -0.02em;
          font-weight: 600;
        }
        .mm-featured-excerpt {
          font-family: var(--font-ui);
          font-size: 14px;
          color: var(--color-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .mm-avatar {
          border-radius: 50%;
          object-fit: cover;
        }
        .mm-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-primary);
          text-decoration: none;
          margin-top: 6px;
          border-bottom: 1.5px solid var(--color-primary);
          padding-bottom: 2px;
          transition: all 150ms ease;
          align-self: flex-start;
        }
        .mm-read-btn:hover {
          color: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
        }

        /* ─── GUIDES / WORKFLOWS HEADER ─── */
        .mm-guides-header {
          padding-bottom: 10px;
          border-bottom: 2px solid var(--color-text);
          margin-bottom: 0;
        }
        .mm-guides-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
        }

        /* ─── GUIDES ─── */
        .mm-guides {
          display: flex;
          flex-direction: column;
        }
        .mm-guide-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 12px;
          align-items: start;
          padding: 14px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .mm-guide-item:last-child {
          border-bottom: none;
        }
        .mm-guide-img {
          position: relative;
          width: 80px;
          height: 64px;
        }
        .mm-guide-body {
          display: flex;
          flex-direction: column;
        }
        .mm-guide-title {
          font-family: var(--font-headline);
          font-size: 14px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 600;
        }

        /* ─── WORKFLOWS ─── */
        .mm-workflows {
          display: flex;
          flex-direction: column;
        }
        .mm-workflow-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid var(--color-border);
          text-decoration: none;
          transition: all 150ms ease;
          cursor: pointer;
        }
        .mm-workflow-item:last-child {
          border-bottom: none;
        }
        .mm-workflow-item:hover .mm-workflow-title {
          color: var(--color-primary);
        }
        .mm-workflow-num {
          font-family: var(--font-headline);
          font-size: 22px;
          font-weight: 300;
          color: var(--color-border-dark);
          line-height: 1;
          flex-shrink: 0;
          padding-top: 1px;
        }
        .mm-workflow-title {
          font-family: var(--font-headline);
          font-size: 15px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 600;
          color: var(--color-text);
          flex: 1;
          transition: color 150ms ease;
        }
        .mm-workflow-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-ui);
          font-size: 11px;
          color: var(--color-muted);
          flex-shrink: 0;
        }
        .mm-workflow-meta .meta-dot {
          background: var(--color-border-dark);
        }

        @media (max-width: 1024px) {
          .make-money-grid {
            grid-template-columns: 1fr 1fr;
          }
          .mm-featured {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            align-items: start;
          }
          .mm-featured-img {
            margin-bottom: 0;
            height: 100%;
            min-height: 260px;
          }
        }
        @media (max-width: 768px) {
          .make-money-grid {
            grid-template-columns: 1fr;
          }
          .mm-featured {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
