import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Globe, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { formatArticle } from "@/lib/articles";

export async function generateStaticParams() {
  const users = await prisma.user.findMany({ select: { id: true, name: true } });
  const articles = await prisma.article.findMany({ select: { slug: true } });
  const authorSlugs = users.map((u) => u.name ? u.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : u.id);
  const articleSlugs = articles.map((a) => a.slug);
  return Array.from(new Set([...authorSlugs, ...articleSlugs])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { id: slug },
        { name: { contains: slug.replace(/-/g, " ") } }
      ]
    }
  });

  const authorName = user?.name || "Featured Founder";
  return {
    title: `${authorName} — Startup Brief`,
    description: `Read interviews, articles, and insights from ${authorName}.`,
  };
}

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { id: slug },
        { name: { contains: slug.replace(/-/g, " ") } }
      ]
    }
  });

  const dbArticles = await prisma.article.findMany({
    where: { status: "published" },
    include: { author: true, category: true },
    take: 6,
    orderBy: { publishedAt: "desc" }
  });

  const articles = dbArticles.map(formatArticle);
  const founder = {
    author: user?.name || articles[0]?.author || "Featured Founder",
    authorAvatar: articles[0]?.authorAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&auto=format",
    category: articles[0]?.category || "Founders",
    id: user?.id || "f-1"
  };

  const timeline = [
    { year: "2018", event: "Co-founded tech startup in San Francisco" },
    { year: "2020", event: "Raised Series A funding led by top Silicon Valley VCs" },
    { year: "2022", event: "Expanded product suite and hit 1M+ active users" },
    { year: "2024", event: "Scaled company to profitability and global distribution" },
    { year: "2026", event: "Pioneering next-generation AI infrastructure and tools" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: founder.author,
        image: founder.authorAvatar,
        jobTitle: "Founder & CEO",
        url: `https://startupbrief.com/founders/${slug}`,
      })}} />
      <Header />
      <main id="main-content">
        <div className="founder-page">
          {/* ─── HERO ─── */}
          <div className="founder-page-hero">
            <div className="container">
              <div className="founder-page-hero-inner">
                <div className="founder-page-photo-wrap">
                  <Image src={founder.authorAvatar} alt={founder.author} width={160} height={160} className="founder-page-photo" />
                </div>
                <div className="founder-page-info">
                  <span className="badge" style={{ marginBottom: 12 }}>Founder Profile</span>
                  <h1 className="founder-page-name">{founder.author}</h1>
                  <p className="founder-page-title">Founder &amp; CEO · Featured in {founder.category}</p>
                  <p className="founder-page-bio">
                    A pioneering figure in the technology and startup ecosystem, {founder.author} has built
                    category-defining products and is widely regarded as an influential
                    voice in modern entrepreneurship. Their approach to product, people, and growth has shaped
                    how modern founders think about building companies.
                  </p>
                  <div className="founder-page-social">
                    <a href="#" className="founder-social-btn" aria-label="Twitter"><Twitter size={15} /> Twitter</a>
                    <a href="#" className="founder-social-btn" aria-label="LinkedIn"><Linkedin size={15} /> LinkedIn</a>
                    <a href="#" className="founder-social-btn" aria-label="Website"><Globe size={15} /> Website</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="founder-page-body">
              {/* ─── MAIN ─── */}
              <div className="founder-page-main">
                {/* Timeline */}
                <section className="founder-section-block">
                  <h2 className="founder-block-title">Career Timeline</h2>
                  <div className="founder-timeline">
                    {timeline.map((item, i) => (
                      <div key={i} className="founder-timeline-row">
                        <div className="founder-timeline-year">{item.year}</div>
                        <div className="founder-timeline-dot-wrap" aria-hidden="true">
                          <div className="founder-timeline-dot" />
                          {i < timeline.length - 1 && <div className="founder-timeline-line" />}
                        </div>
                        <div className="founder-timeline-event">{item.event}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Articles */}
                <section className="founder-section-block">
                  <h2 className="founder-block-title">Articles &amp; Interviews</h2>
                  <div className="founder-articles">
                    {articles.map((article) => (
                      <article key={article.id} className="founder-article-item">
                        <div className="founder-article-img img-hover">
                          <Image src={article.image} alt={article.title} fill sizes="120px" className="founder-article-img-inner" />
                        </div>
                        <div className="founder-article-body">
                          <Link href={`/article/${article.slug}`} className="badge">{article.category}</Link>
                          <h3 className="founder-article-title">
                            <Link href={`/article/${article.slug}`} className="link-headline">{article.title}</Link>
                          </h3>
                          <div className="article-meta" style={{ marginTop: 8 }}>
                            <span className="meta-text">{article.publishedAt}</span>
                            <span className="meta-dot" aria-hidden="true" />
                            <span className="meta-text">{article.readingTime} min read</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              {/* ─── SIDEBAR ─── */}
              <aside className="founder-page-sidebar">
                <div className="founder-sidebar-card">
                  <h2 className="tool-sidebar-title">At a Glance</h2>
                  {[
                    { label: "Companies Founded", value: "2+" },
                    { label: "Total Capital Raised", value: "$100M+" },
                    { label: "Portfolio Valuation", value: "$1.2B" },
                    { label: "Based In", value: "San Francisco, CA" },
                  ].map((stat) => (
                    <div key={stat.label} className="founder-stat-row">
                      <span className="founder-stat-label">{stat.label}</span>
                      <span className="founder-stat-value">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .founder-page { background: #fff; }
        .founder-page-hero { background: var(--color-text); padding: 60px 0; }
        .founder-page-hero-inner { display: flex; gap: 40px; align-items: center; }
        .founder-page-photo-wrap {
          width: 160px; height: 160px; border-radius: 50%; overflow: hidden;
          border: 3px solid rgba(255,255,255,0.2); flex-shrink: 0;
        }
        .founder-page-photo { object-fit: cover; }
        .founder-page-info { display: flex; flex-direction: column; gap: 10px; }
        .founder-page-name {
          font-family: var(--font-headline); font-size: clamp(28px,3.5vw,48px);
          font-weight: 600; letter-spacing: -0.03em; color: #fff; line-height: 1.05;
        }
        .founder-page-title {
          font-family: var(--font-ui); font-size: 14px; color: rgba(255,255,255,0.55);
          font-style: italic;
        }
        .founder-page-bio {
          font-family: var(--font-ui); font-size: 15px; color: rgba(255,255,255,0.7);
          line-height: 1.65; max-width: 600px;
        }
        .founder-page-social { display: flex; gap: 8px; flex-wrap: wrap; }
        .founder-social-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-ui); font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 7px 14px; border: 1.5px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7); text-decoration: none; transition: all 150ms ease;
        }
        .founder-social-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .founder-page-body {
          display: grid; grid-template-columns: 1fr 280px; gap: 48px;
          padding: 48px 0; align-items: start;
        }
        .founder-page-main { display: flex; flex-direction: column; gap: 0; }
        .founder-section-block {
          padding: 32px 0; border-bottom: 1px solid var(--color-border);
        }
        .founder-section-block:last-child { border-bottom: none; }
        .founder-block-title {
          font-family: var(--font-headline); font-size: 24px; font-weight: 600;
          letter-spacing: -0.02em; margin-bottom: 24px;
        }
        .founder-timeline { display: flex; flex-direction: column; gap: 0; }
        .founder-timeline-row { display: grid; grid-template-columns: 60px 24px 1fr; gap: 12px; align-items: start; }
        .founder-timeline-year {
          font-family: var(--font-headline); font-size: 16px; font-weight: 600;
          color: var(--color-text); padding-top: 2px; text-align: right;
        }
        .founder-timeline-dot-wrap { display: flex; flex-direction: column; align-items: center; }
        .founder-timeline-dot {
          width: 10px; height: 10px; border-radius: 50%; background: var(--color-primary);
          border: 2px solid #fff; box-shadow: 0 0 0 1.5px var(--color-primary); flex-shrink: 0;
        }
        .founder-timeline-line { width: 1px; flex: 1; background: var(--color-border); min-height: 28px; margin-top: 4px; }
        .founder-timeline-event {
          font-family: var(--font-ui); font-size: 14px; color: var(--color-text);
          line-height: 1.5; padding: 0 0 20px;
        }
        .founder-articles { display: flex; flex-direction: column; gap: 0; }
        .founder-article-item {
          display: grid; grid-template-columns: 120px 1fr; gap: 16px;
          padding: 16px 0; border-bottom: 1px solid var(--color-border);
        }
        .founder-article-img { position: relative; width: 120px; height: 80px; }
        .founder-article-img-inner { object-fit: cover; }
        .founder-article-body { display: flex; flex-direction: column; gap: 4px; }
        .founder-article-title {
          font-family: var(--font-headline); font-size: 16px; line-height: 1.3;
          letter-spacing: -0.01em; font-weight: 600;
        }
        .founder-page-sidebar { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 80px; }
        .founder-sidebar-card { border: 1px solid var(--color-border); padding: 24px; }
        .founder-stat-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0; border-bottom: 1px solid var(--color-border);
        }
        .founder-stat-row:last-child { border-bottom: none; }
        .founder-stat-label { font-family: var(--font-ui); font-size: 12px; color: var(--color-secondary); }
        .founder-stat-value { font-family: var(--font-ui); font-size: 13px; font-weight: 700; color: var(--color-text); }
        @media (max-width: 900px) {
          .founder-page-hero-inner { flex-direction: column; align-items: flex-start; }
          .founder-page-body { grid-template-columns: 1fr; }
          .founder-page-sidebar { position: static; }
        }
      `}</style>
    </>
  );
}
