import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { getPublishedArticles } from "@/lib/articles";
import { BookOpen, Star, BookMarked } from "lucide-react";

export const metadata: Metadata = {
  title: "Books & Entrepreneurial Literature — Startup Brief",
  description: "Must-read books, executive summaries, key takeaways, and literary breakdowns for founders and operators.",
};

const curatedBooksList = [
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    excerpt: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop&auto=format",
    slug: "the-lean-startup-eric-ries",
    rating: 4.9,
    year: "2011",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    excerpt: "Notes on startups, or how to build the future by asking non-consensus questions.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop&auto=format",
    slug: "zero-to-one-peter-thiel",
    rating: 4.8,
    year: "2014",
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    excerpt: "Building a business when there are no easy answers, dealing with layoffs, and executive grit.",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&auto=format",
    slug: "the-hard-thing-about-hard-things",
    rating: 4.9,
    year: "2014",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    excerpt: "Rules for focused success in a distracted world and mastering high-value cognitively demanding skills.",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&auto=format",
    slug: "deep-work-cal-newport",
    rating: 4.7,
    year: "2016",
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    excerpt: "How great leaders inspire everyone to take action by articulating core purpose first.",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop&auto=format",
    slug: "start-with-why-simon-sinek",
    rating: 4.8,
    year: "2009",
  },
  {
    title: "High Output Management",
    author: "Andrew Grove",
    excerpt: "The essential guide for managers and leaders by legendary Intel CEO Andy Grove.",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop&auto=format",
    slug: "high-output-management",
    rating: 5.0,
    year: "1983",
  },
];

export default async function BooksPage() {
  const rawTrending = await getPublishedArticles({ take: 5, isTrending: true });
  const rawLatest = await getPublishedArticles({ take: 5 });

  return (
    <>
      <Header />
      <main id="main-content">
        {/* BOOKS HERO BANNER */}
        <div className="books-editorial-hero">
          <div className="newspaper-container">
            <span className="books-badge">FOUNDER LITERATURE DESK</span>
            <h1 className="books-title">Books, Executive Summaries &amp; Key Takeaways</h1>
            <p className="books-sub">
              Curated reading lists, chapter breakdowns, and essential books every founder and venture investor should study.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="books-page-layout">
            <div className="books-left-content">
              <div className="section-header">
                <h2 className="section-header-title">MUST-READ STARTUP &amp; LEADERSHIP BOOKS</h2>
              </div>

              <div className="books-grid-layout">
                {curatedBooksList.map((book) => (
                  <article key={book.slug} className="book-item-card">
                    <Link href={`/article/${book.slug}`} className="book-cover-link">
                      <div className="book-cover-wrap">
                        <Image src={book.cover} alt={book.title} fill sizes="200px" style={{ objectFit: "cover" }} />
                      </div>
                    </Link>
                    <div className="book-item-info">
                      <div className="book-rating-row">
                        <Star size={13} color="#ff6a00" fill="#ff6a00" />
                        <span className="rating-num">{book.rating}</span>
                        <span className="dot">•</span>
                        <span className="year-lbl">{book.year}</span>
                      </div>
                      <h3 className="book-title-h3">
                        <Link href={`/article/${book.slug}`}>{book.title}</Link>
                      </h3>
                      <span className="book-author-lbl">By {book.author}</span>
                      <p className="book-excerpt-txt">{book.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="books-sidebar-col">
              <RightSidebar trendingArticles={rawTrending} latestArticles={rawLatest} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .books-editorial-hero {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .books-badge { font-family: var(--font-ui); font-size: 11px; font-weight: 800; color: #ff6a00; letter-spacing: 0.12em; text-transform: uppercase; }
        .books-title { font-family: var(--font-headline), Georgia, serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 800; color: #ffffff; margin: 6px 0 10px; }
        .books-sub { font-family: var(--font-ui); font-size: 14px; color: #94a3b8; max-width: 680px; }

        .books-page-layout { display: grid; grid-template-columns: 1fr 310px; gap: 36px; align-items: start; }
        .books-grid-layout { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .book-item-card { display: grid; grid-template-columns: 140px 1fr; gap: 16px; border: 1px solid #e2e8f0; padding: 16px; background: #ffffff; align-items: start; }
        .book-cover-link { display: block; }
        .book-cover-wrap { position: relative; width: 140px; aspect-ratio: 2/3; background: #f1f5f9; border: 1px solid #cbd5e1; }
        .book-item-info { display: flex; flex-direction: column; gap: 6px; }
        .book-rating-row { display: flex; align-items: center; gap: 6px; font-family: var(--font-ui); font-size: 11px; color: #64748b; font-weight: 700; }
        .rating-num { color: #0f172a; }
        .book-title-h3 { font-family: var(--font-headline), Georgia, serif; font-size: 17px; font-weight: 700; margin: 0; line-height: 1.25; }
        .book-title-h3 a { color: #0f172a; text-decoration: none; }
        .book-title-h3 a:hover { color: #ff6a00; }
        .book-author-lbl { font-family: var(--font-ui); font-size: 12px; color: #ff6a00; font-weight: 700; }
        .book-excerpt-txt { font-family: var(--font-ui); font-size: 13px; color: #475569; margin: 0; line-height: 1.45; }

        @media (max-width: 900px) {
          .books-page-layout { grid-template-columns: 1fr; }
          .books-grid-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
