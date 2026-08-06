import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { formatArticle } from "@/lib/articles";

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  return articles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  return { title: `${article?.title || "Book"} — Book Summary | Startup Brief`, description: article?.excerpt || "Book summary" };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbArticle = await prisma.article.findUnique({ where: { slug }, include: { author: true } });
  const dbArticles = await prisma.article.findMany({ where: { status: "published" }, take: 5 });
  const articles = dbArticles.map(formatArticle);

  const book = {
    title: dbArticle?.title || "Essential Startup Book",
    author: dbArticle?.author?.name || "Peter Thiel",
    cover: dbArticle?.featuredImage || dbArticle?.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=560&fit=crop&auto=format",
    summary: dbArticle?.excerpt || "Notes on startups and how to build the future.",
    affiliateUrl: `/article/${slug}`,
    rating: 4.8,
    year: 2026,
  };

  const related = articles.filter((b) => b.slug !== slug).slice(0, 4).map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    author: b.author,
    cover: b.image,
  }));

  const keyLearnings = [
    "Stop competing — instead, create a monopoly by building something entirely new",
    "Every successful startup is built on a secret that others haven't discovered yet",
    "The last mover advantage is more important than the first mover advantage",
    "Sales matters just as much as product, no matter what engineers think",
    "Great companies have strong internal cultures aligned around a singular mission",
  ];

  const bestQuotes = [
    '"Competition is for losers."',
    '"The most valuable businesses of coming decades will be built by entrepreneurs who seek to empower people rather than try to make them obsolete."',
    '"If you can identify a delusional popular belief, you can find what lies hidden behind it: the contrarian truth."',
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Book",
        name: book.title, author: { "@type": "Person", name: book.author },
        datePublished: String(book.year), description: book.summary,
      })}} />
      <Header />
      <main id="main-content">
        <div className="book-page">
          <div className="book-page-hero">
            <div className="container">
              <div className="book-hero-inner">
                <div className="book-hero-cover-wrap">
                  <div className="book-hero-cover">
                    <Image src={book.cover} alt={`${book.title} cover`} fill sizes="(max-width:768px) 50vw, 220px" className="book-hero-cover-img" />
                  </div>
                  <div className="book-hero-shadow" aria-hidden="true" />
                </div>
                <div className="book-hero-info">
                  <span className="badge" style={{ marginBottom: 12 }}>Book Summary</span>
                  <h1 className="book-hero-title">{book.title}</h1>
                  <p className="book-hero-author">by <strong>{book.author}</strong> · {book.year}</p>
                  <div className="book-hero-rating">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={18} fill={s <= Math.floor(book.rating) ? "var(--color-primary)" : "none"} color="var(--color-primary)" />
                    ))}
                    <span className="book-rating-num">{book.rating} / 5</span>
                  </div>
                  <p className="book-hero-summary">{book.summary}</p>
                  <div className="book-hero-actions">
                    <a href={book.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-primary">
                      <ShoppingBag size={14} /> Read Summary
                    </a>
                    <span className="book-affiliate-note">Supports Startup Brief</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="book-body-grid">
              <div className="book-main">
                <section className="book-section">
                  <h2 className="book-section-title">Key Learnings</h2>
                  <ol className="book-learnings" role="list">
                    {keyLearnings.map((l, i) => (
                      <li key={i} className="book-learning-item">
                        <span className="book-learning-num">{i + 1}</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ol>
                </section>
                <section className="book-section">
                  <h2 className="book-section-title">Best Quotes</h2>
                  {bestQuotes.map((q, i) => (
                    <blockquote key={i} className="book-quote">
                      <p>{q}</p>
                      <cite>— {book.author}</cite>
                    </blockquote>
                  ))}
                </section>
                <section className="book-section">
                  <h2 className="book-section-title">Who Should Read This</h2>
                  <p className="book-who-text">
                    This book is essential for any founder, investor, or operator who wants to build something
                    genuinely valuable — not just a slightly better version of what already exists. It&apos;s
                    especially recommended for first-time founders who are still deciding what to build.
                  </p>
                </section>
              </div>

              <aside className="book-sidebar">
                <div className="tool-sidebar-card">
                  <h2 className="tool-sidebar-title">Book Details</h2>
                  {[
                    { label: "Author", value: book.author },
                    { label: "Year", value: String(book.year) },
                    { label: "Rating", value: `${book.rating} / 5` },
                    { label: "Genre", value: "Business / Startups" },
                  ].map((d) => (
                    <div key={d.label} className="founder-stat-row">
                      <span className="founder-stat-label">{d.label}</span>
                      <span className="founder-stat-value">{d.value}</span>
                    </div>
                  ))}
                </div>

                <div className="tool-sidebar-card">
                  <h2 className="tool-sidebar-title">Related Books</h2>
                  {related.map((b) => (
                    <Link key={b.id} href={`/books/${b.slug}`} className="book-related-item">
                      <div className="book-related-cover">
                        <Image src={b.cover} alt={b.title} fill sizes="50px" className="book-hero-cover-img" />
                      </div>
                      <div>
                        <div className="book-related-title">{b.title}</div>
                        <div className="book-related-author">by {b.author}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .book-page { background: #fff; }
        .book-page-hero { background: #fafafa; border-bottom: 1px solid var(--color-border); padding: 60px 0; }
        .book-hero-inner { display: flex; gap: 48px; align-items: flex-start; }
        .book-hero-cover-wrap { position: relative; flex-shrink: 0; }
        .book-hero-cover { position: relative; width: 220px; height: 308px; }
        .book-hero-cover-img { object-fit: cover; }
        .book-hero-shadow {
          position: absolute; bottom: -10px; left: 10px; right: -10px;
          height: 100%; background: rgba(0,0,0,0.15); z-index: -1; filter: blur(16px);
        }
        .book-hero-info { display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .book-hero-title {
          font-family: var(--font-headline); font-size: clamp(26px,3.5vw,44px);
          font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;
        }
        .book-hero-author {
          font-family: var(--font-ui); font-size: 15px; color: var(--color-secondary);
        }
        .book-hero-rating { display: flex; align-items: center; gap: 3px; }
        .book-rating-num {
          font-family: var(--font-ui); font-size: 13px; font-weight: 600;
          color: var(--color-text); margin-left: 8px;
        }
        .book-hero-summary {
          font-family: var(--font-ui); font-size: 15px; color: var(--color-secondary);
          line-height: 1.65; max-width: 540px;
        }
        .book-hero-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .book-affiliate-note {
          font-family: var(--font-ui); font-size: 11px; color: var(--color-muted); font-style: italic;
        }
        .book-body-grid {
          display: grid; grid-template-columns: 1fr 280px; gap: 48px;
          padding: 48px 0; align-items: start;
        }
        .book-main { display: flex; flex-direction: column; gap: 0; }
        .book-section { padding: 32px 0; border-bottom: 1px solid var(--color-border); }
        .book-section:last-child { border-bottom: none; }
        .book-section-title {
          font-family: var(--font-headline); font-size: 24px; font-weight: 600;
          letter-spacing: -0.02em; margin-bottom: 20px;
        }
        .book-learnings { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
        .book-learning-item {
          display: flex; gap: 14px; align-items: flex-start;
          font-family: var(--font-ui); font-size: 15px; color: var(--color-text); line-height: 1.55;
        }
        .book-learning-num {
          font-family: var(--font-headline); font-size: 28px; font-weight: 300;
          color: var(--color-border-dark); line-height: 1; flex-shrink: 0;
        }
        .book-quote {
          border-left: 3px solid var(--color-primary); padding: 16px 24px;
          margin: 0 0 16px; background: #fafafa;
        }
        .book-quote p {
          font-family: var(--font-headline); font-size: 18px; font-style: italic;
          color: var(--color-text); line-height: 1.55; margin-bottom: 8px;
        }
        .book-quote cite {
          font-family: var(--font-ui); font-size: 12px; color: var(--color-muted); font-style: normal;
        }
        .book-who-text {
          font-family: var(--font-ui); font-size: 15px; color: var(--color-secondary); line-height: 1.7;
        }
        .book-sidebar { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 80px; }
        .book-related-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 0;
          border-bottom: 1px solid var(--color-border); text-decoration: none;
        }
        .book-related-item:last-child { border-bottom: none; }
        .book-related-item:hover .book-related-title { color: var(--color-primary); }
        .book-related-cover { position: relative; width: 40px; height: 54px; flex-shrink: 0; }
        .book-related-title {
          font-family: var(--font-headline); font-size: 14px; font-weight: 600;
          color: var(--color-text); transition: color 150ms ease; line-height: 1.3;
        }
        .book-related-author { font-family: var(--font-ui); font-size: 11px; color: var(--color-muted); }
        @media (max-width: 900px) {
          .book-hero-inner { flex-direction: column; align-items: center; }
          .book-body-grid { grid-template-columns: 1fr; }
          .book-sidebar { position: static; }
        }
      `}</style>
    </>
  );
}
