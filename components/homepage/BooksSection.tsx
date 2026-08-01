import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { books } from "@/lib/data";

export default function BooksSection() {
  const [featured, ...rest] = books;

  return (
    <section className="books-section section editorial-border-top" aria-label="Startup books">
      <div className="container">
        <div className="section-header">
          <h2 className="section-header-title">Essential Books</h2>
        </div>

        <div className="books-layout">
          {/* ─── FEATURED BOOK ─── */}
          <article className="book-featured">
            <div className="book-featured-cover-wrap">
              <div className="book-featured-cover img-hover">
                <Image
                  src={featured.cover}
                  alt={`${featured.title} book cover`}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="book-cover-img"
                />
              </div>
            </div>
            <div className="book-featured-info">
              <h3 className="book-featured-title link-headline">
                {featured.title}
              </h3>
              <span className="book-author">by {featured.author}</span>
              <p className="book-summary">{featured.summary}</p>
              <div className="book-featured-actions">
                <Link href={`/books/${featured.slug}`} className="btn-book">
                  Read Summary
                </Link>
                <a
                  href={featured.affiliateUrl}
                  className="btn-book btn-book-primary"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Buy Book
                </a>
              </div>
            </div>
          </article>

          {/* ─── RECOMMENDED BOOKS ─── */}
          <div className="books-recommended">
            <div className="books-recommended-header">
              <span className="books-rec-label">More Recommended Books</span>
            </div>
            {rest.map((book) => (
              <article key={book.id} className="book-rec-item">
                <div className="book-rec-cover img-hover">
                  <Image
                    src={book.cover}
                    alt={`${book.title} book cover`}
                    fill
                    sizes="70px"
                    className="book-cover-img"
                  />
                </div>
                <div className="book-rec-info">
                  <h4 className="book-rec-title link-headline">
                    <Link href={`/books/${book.slug}`}>
                      {book.title}
                    </Link>
                  </h4>
                  <span className="book-rec-author">by {book.author}</span>
                  <a
                    href={book.affiliateUrl}
                    className="book-buy-link"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Buy <ArrowRight size={10} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .books-section {
          background: var(--color-bg);
        }
        .books-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* ─── FEATURED ─── */
        .book-featured {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 36px;
          align-items: start;
          padding-right: 40px;
          border-right: 1px solid var(--color-border-dark);
        }
        .book-featured-cover-wrap {
          position: relative;
        }
        .book-featured-cover {
          position: relative;
          width: 200px;
          height: 280px;
          border: 1px solid var(--color-border);
        }
        .book-cover-img {
          object-fit: cover;
        }
        .book-featured-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .book-featured-title {
          font-family: var(--font-headline);
          font-size: clamp(24px, 2.5vw, 32px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-weight: 500;
        }
        .book-author {
          font-family: var(--font-headline);
          font-size: 16px;
          color: var(--color-text);
          font-style: italic;
        }
        .book-summary {
          font-family: var(--font-ui);
          font-size: 14px;
          color: var(--color-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .book-featured-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 12px;
        }
        
        .btn-book {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 20px;
          border: 1px solid var(--color-text);
          color: var(--color-text);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 150ms ease;
        }
        .btn-book:hover {
          background: var(--color-text);
          color: var(--color-bg);
        }
        .btn-book-primary {
          background: var(--color-text);
          color: var(--color-bg);
        }
        .btn-book-primary:hover {
          background: transparent;
          color: var(--color-text);
        }

        /* ─── RECOMMENDED ─── */
        .books-recommended {
          display: flex;
          flex-direction: column;
        }
        .books-recommended-header {
          padding-bottom: 12px;
          border-bottom: 2px solid var(--color-text);
          margin-bottom: 0;
        }
        .books-rec-label {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .book-rec-item {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 20px;
          align-items: start;
          padding: 20px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .book-rec-item:last-child {
          border-bottom: none;
        }
        .book-rec-cover {
          position: relative;
          width: 70px;
          height: 95px;
          border: 1px solid var(--color-border);
        }
        .book-rec-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .book-rec-title {
          font-family: var(--font-headline);
          font-size: 18px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 500;
        }
        .book-rec-title a {
          text-decoration: none;
        }
        .book-rec-author {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-secondary);
          font-style: italic;
        }
        .book-buy-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .books-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .book-featured {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--color-border-dark);
            padding-bottom: 32px;
          }
        }
        @media (max-width: 640px) {
          .book-featured {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .book-featured-cover {
            width: 140px;
            height: 196px;
          }
        }
      `}</style>
    </section>
  );
}
