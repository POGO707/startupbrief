import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { founderArticles } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function FounderFirst() {
  const [featuredStory, mediumStory, compact1, compact2, compact3] = founderArticles;
  const compactStories = [compact1, compact2, compact3];

  return (
    <section className="founder-section section" aria-label="Founder stories">
      <div className="container">
        {/* ─── HEADER ─── */}
        <div className="founder-header-editorial">
          <div className="founder-header-center-wrap">
            <span className="founder-kicker">EXCLUSIVE PROFILES</span>
            <SectionHeading normalText="FOUNDER" highlightText="STORY" />
            <p className="founder-description">
              In-depth interviews, founder journeys, startup lessons and business insights from the people building the future.
            </p>
          </div>
          <div className="founder-link-container">
            <Link href="/founders" className="founder-link-top">
              All Founder Stories <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ─── THIN EDITORIAL DIVIDER ─── */}
        <div className="founder-divider" aria-hidden="true" />

        {/* ─── 3-PART EDITORIAL GRID ─── */}
        <div className="founder-grid-editorial">
          {/* ─── LEFT: 1 MEDIUM STORY ─── */}
          <article className="founder-card-medium">
            <div className="founder-med-img img-hover">
              <Image
                src={mediumStory.image}
                alt={mediumStory.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="founder-img-cover"
              />
            </div>
            <div className="founder-med-body">
              <Link href={`/article/${mediumStory.slug}`} className="badge">
                {mediumStory.category}
              </Link>
              <h3 className="founder-med-title">
                <Link href={`/article/${mediumStory.slug}`} className="link-headline">
                  {mediumStory.title}
                </Link>
              </h3>
              <p className="founder-med-excerpt">{mediumStory.excerpt}</p>
              <div className="article-meta" style={{ marginTop: 6 }}>
                <span className="meta-text">{mediumStory.author}</span>
                <span className="meta-dot" aria-hidden="true" />
                <span className="meta-text">{mediumStory.readingTime} min read</span>
              </div>
            </div>
          </article>

          {/* ─── CENTER: 1 LARGE FEATURED STORY ─── */}
          <article className="founder-card-hero">
            <Link href={`/article/${featuredStory.slug}`} className="founder-hero-link">
              <div className="founder-hero-img img-hover">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="founder-img-cover"
                  priority
                />
                <div className="founder-hero-badge">Exclusive Interview</div>
              </div>
              <div className="founder-hero-body">
                <span className="badge" style={{ marginBottom: 6, alignSelf: "flex-start" }}>
                  {featuredStory.category}
                </span>
                <h3 className="founder-hero-title link-headline">{featuredStory.title}</h3>
                <p className="founder-hero-excerpt">{featuredStory.excerpt}</p>
                <div className="article-meta" style={{ marginTop: 12 }}>
                  <span className="meta-text" style={{ color: "var(--color-text)" }}>
                    {featuredStory.author}
                  </span>
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="meta-text">{featuredStory.publishedAt}</span>
                </div>
              </div>
            </Link>
          </article>

          {/* ─── RIGHT: LATEST FOUNDER UPDATES ─── */}
          <aside className="founder-updates-col" aria-label="Latest Founder Updates">
            <div className="founder-updates-header">
              <span className="founder-updates-label">Latest Founder Updates</span>
            </div>
            <div className="founder-updates-list">
              {compactStories.map((article, idx) => (
                <article key={article.id} className="founder-compact-item">
                  <span className="founder-compact-num">0{idx + 1}</span>
                  <div className="founder-compact-content">
                    <Link href={`/article/${article.slug}`} className="badge" style={{ marginBottom: 4 }}>
                      {article.category}
                    </Link>
                    <h4 className="founder-compact-title">
                      <Link href={`/article/${article.slug}`} className="link-headline">
                        {article.title}
                      </Link>
                    </h4>
                    <div className="article-meta" style={{ marginTop: 4 }}>
                      <span className="meta-text">{article.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .founder-section {
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
        }
        .founder-header-editorial {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          position: relative;
        }
        .founder-header-center-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }
        .founder-kicker {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-secondary);
          margin-bottom: 12px;
          display: block;
        }
        .founder-title {
          font-family: var(--font-headline);
          font-size: clamp(48px, 6vw, 84px);
          line-height: 1.1;
          font-weight: 600;
          letter-spacing: -0.04em;
          color: var(--color-text);
          text-transform: uppercase;
          margin-bottom: 16px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .story-highlight {
          position: relative;
          display: inline-block;
          color: var(--color-bg);
          background: var(--color-primary);
          padding: 6px 20px;
          clip-path: polygon(2% 4%, 97% 1%, 99% 95%, 96% 99%, 3% 97%, 1% 94%);
          transform: rotate(-2deg);
        }
        .founder-description {
          font-family: var(--font-headline);
          font-size: 19px;
          color: var(--color-text);
          max-width: 520px;
          line-height: 1.6;
          text-align: center;
        }
        .founder-link-container {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: -30px;
        }
        .founder-link-top {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid var(--color-text);
          padding-bottom: 2px;
          transition: color 150ms ease, border-color 150ms ease;
          margin-bottom: 4px;
        }
        .founder-link-top:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
        }
        .founder-divider {
          width: 100%;
          height: 1px;
          background: var(--color-border-dark);
          margin-bottom: clamp(32px, 5vw, 48px);
        }

        /* ─── 3-PART GRID ─── */
        .founder-grid-editorial {
          display: grid;
          grid-template-columns: 1fr 1.6fr 1fr;
          gap: 32px;
          align-items: start;
        }

        /* LEFT MEDIUM CARD */
        .founder-card-medium {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-right: 1px solid var(--color-border);
          padding-right: 32px;
        }
        .founder-med-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border: 1px solid var(--color-border);
        }
        .founder-img-cover {
          object-fit: cover;
        }
        .founder-med-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }
        .founder-med-title {
          font-family: var(--font-headline);
          font-size: 20px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 500;
        }
        .founder-med-excerpt {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* CENTER HERO CARD */
        .founder-card-hero {
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--color-border);
          padding-right: 32px;
        }
        .founder-hero-link {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        .founder-hero-img {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border: 1px solid var(--color-border);
        }
        .founder-hero-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--color-text);
          color: var(--color-bg);
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 8px;
          z-index: 2;
        }
        .founder-hero-body {
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }
        .founder-hero-title {
          font-family: var(--font-headline);
          font-size: clamp(24px, 2.5vw, 36px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 500;
          color: var(--color-text);
        }
        .founder-hero-excerpt {
          font-family: var(--font-headline);
          font-size: 19px;
          color: var(--color-secondary);
          line-height: 1.6;
        }

        /* RIGHT COMPACT UPDATES */
        .founder-updates-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .founder-updates-header {
          padding-bottom: 8px;
          border-bottom: 2px solid var(--color-text);
          margin-bottom: 12px;
          text-align: left;
        }
        .founder-updates-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .founder-updates-list {
          display: flex;
          flex-direction: column;
        }
        .founder-compact-item {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 12px;
          align-items: start;
          padding: 16px 0;
          border-bottom: 1px solid var(--color-border);
          text-align: left;
        }
        .founder-compact-item:last-child {
          border-bottom: none;
        }
        .founder-compact-num {
          font-family: var(--font-headline);
          font-size: 20px;
          font-weight: 500;
          color: var(--color-text);
          line-height: 1;
          padding-top: 2px;
        }
        .founder-compact-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .founder-compact-title {
          font-family: var(--font-headline);
          font-size: 16px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 500;
        }

        /* ─── RESPONSIVE BREAKPOINTS ─── */
        @media (max-width: 1024px) {
          .founder-grid-editorial {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .founder-card-hero {
            border-right: none;
            padding-right: 0;
          }
          .founder-updates-col {
            grid-column: 1 / -1;
            border-top: 1px solid var(--color-border-dark);
            padding-top: 32px;
          }
        }
        @media (max-width: 768px) {
          .founder-grid-editorial {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .founder-card-medium {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border-dark);
            padding-bottom: 40px;
          }
          .founder-link-container {
            justify-content: center;
            margin-top: 0;
          }
        }
        @media (max-width: 414px) {
          .founder-title {
            font-size: 42px;
            gap: 12px;
          }
          .story-highlight {
            padding: 4px 14px;
          }
        }
      `}</style>
    </section>
  );
}
