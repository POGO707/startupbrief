import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const spotlightArticles = [
  {
    id: "sp-1",
    slug: "ai-chip-war-nvidia-amd-groq",
    title: "The Silent War for AI Inference: Inside the $100B Chip Architecture Battle",
    excerpt:
      "While GPUs dominate training, a new battleground has emerged for real-time inference latency. Here is how custom silicon startups are taking market share.",
    category: "Deep Dive",
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    publishedAt: "July 31, 2026",
    readingTime: 12,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop&auto=format",
    badge: "Cover Story",
  },
  {
    id: "sp-2",
    slug: "autonomous-agents-enterprise-architecture",
    title: "How 50 Fortune 500 Engineering Teams Are Deploying Agentic AI",
    excerpt:
      "A rare architectural teardown of production multi-agent systems built with LangChain, LlamaIndex, and custom orchestrators.",
    category: "Architecture",
    author: "Marcus Vance",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    publishedAt: "July 30, 2026",
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop&auto=format",
    badge: "Spotlight",
  },
  {
    id: "sp-3",
    slug: "zero-to-one-hundred-million-arr-playbook",
    title: "The $0 to $100M ARR Playbook for Next-Gen B2B AI Software",
    excerpt: "Why traditional SaaS metrics no longer apply when building model-native applications with high variable compute costs.",
    category: "Strategy",
    author: "Sarah Chen",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    publishedAt: "July 29, 2026",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
    badge: "Analysis",
  },
  {
    id: "sp-4",
    slug: "quantum-ai-hybrid-models",
    title: "Quantum-Classical Hybrids Are Solving Previously Impossible Chemistry Problems",
    excerpt: "How bio-tech startups are accelerating drug discovery from 10 years to 10 weeks using hybrid quantum models.",
    category: "Research",
    author: "David Park",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    publishedAt: "July 28, 2026",
    readingTime: 9,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop&auto=format",
    badge: "Future Tech",
  },
];

export default function SpotlightSection() {
  return (
    <section className="spotlight-section section editorial-border-top" aria-label="Editorial Spotlight">
      <div className="container">
        <div className="spotlight-layout">
          {/* ─── LEFT: ROTATED VERTICAL TITLE WITH ACCENT ─── */}
          <div className="spotlight-left">
            <div className="spotlight-title-sticky">
              <span className="spotlight-badge-label">
                Magazine Edition
              </span>
              <h2 className="spotlight-vertical-title">
                SPOT<span className="text-orange">L</span>IGHT
              </h2>
            </div>
          </div>

          {/* ─── RIGHT: 4 EDITORIAL MAGAZINE CARDS IN A GRID ─── */}
          <div className="spotlight-right-grid">
            {spotlightArticles.map((article, index) => (
              <article key={article.id} className="spotlight-card">
                <div className="spotlight-card-header">
                  <span className="spotlight-num">0{index + 1}</span>
                  <span className="badge">{article.category}</span>
                </div>
                <Link href={`/article/${article.slug}`} className="spotlight-img-link">
                  <div className="spotlight-img-wrapper img-hover">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="spotlight-img"
                    />
                  </div>
                </Link>
                <div className="spotlight-card-body">
                  <h3 className="spotlight-title link-headline">
                    <Link href={`/article/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="spotlight-excerpt">{article.excerpt}</p>
                  <div className="spotlight-card-footer">
                    <div className="article-meta">
                      <span className="meta-text" style={{ color: "var(--color-text)" }}>
                        {article.author}
                      </span>
                      <span className="meta-dot" aria-hidden="true" />
                      <span className="meta-text">{article.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .spotlight-section {
          background: var(--color-bg);
          padding-block: clamp(48px, 6vw, 80px);
        }
        .spotlight-layout {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ─── LEFT VERTICAL TITLE ─── */
        .spotlight-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          border-right: 1px solid var(--color-border-dark);
          padding-right: 32px;
        }
        .spotlight-title-sticky {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .spotlight-badge-label {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
          white-space: nowrap;
          transform: rotate(180deg);
          writing-mode: vertical-lr;
        }
        .spotlight-vertical-title {
          writing-mode: vertical-lr;
          transform: rotate(180deg);
          font-family: var(--font-headline);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text);
          line-height: 1;
          margin: 0;
          user-select: none;
        }
        .text-orange {
          color: var(--color-primary);
        }

        /* ─── RIGHT EDITORIAL GRID (4-COLUMN) ─── */
        .spotlight-right-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .spotlight-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-right: 1px solid var(--color-border);
          padding-right: 24px;
        }
        .spotlight-card:last-child {
          border-right: none;
          padding-right: 0;
        }
        .spotlight-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .spotlight-num {
          font-family: var(--font-headline);
          font-size: 20px;
          font-weight: 500;
          color: var(--color-text);
        }
        .spotlight-img-link {
          display: block;
        }
        .spotlight-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .spotlight-img {
          object-fit: cover;
        }
        .spotlight-card-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .spotlight-title {
          font-family: var(--font-headline);
          font-size: 18px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          font-weight: 500;
          /* Max 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .spotlight-title a {
          text-decoration: none;
        }
        .spotlight-excerpt {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          line-height: 1.5;
          /* Max 2 lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .spotlight-card-footer {
          margin-top: auto;
          padding-top: 8px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1280px) {
          .spotlight-right-grid {
            gap: 24px;
          }
          .spotlight-card {
            padding-right: 16px;
          }
        }
        @media (max-width: 1024px) {
          .spotlight-layout {
            grid-template-columns: 60px 1fr;
            gap: 32px;
          }
          .spotlight-right-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
          .spotlight-card {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 24px;
          }
        }
        @media (max-width: 768px) {
          .spotlight-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .spotlight-left {
            border-right: none;
            border-bottom: 2px solid var(--color-text);
            padding-right: 0;
            padding-bottom: 16px;
            align-items: flex-start;
          }
          .spotlight-title-sticky {
            position: relative;
            top: 0;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          .spotlight-badge-label {
            transform: none;
            writing-mode: horizontal-tb;
          }
          .spotlight-vertical-title {
            writing-mode: horizontal-tb;
            transform: none;
            font-size: 32px;
          }
          .spotlight-right-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
