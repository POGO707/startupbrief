import Link from "next/link";
import Image from "next/image";

const booksData = [
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop&auto=format",
    slug: "the-lean-startup-eric-ries",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop&auto=format",
    slug: "zero-to-one-peter-thiel",
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&auto=format",
    slug: "the-hard-thing-about-hard-things",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop&auto=format",
    slug: "deep-work-cal-newport",
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop&auto=format",
    slug: "start-with-why-simon-sinek",
  },
];

export default function BooksSection() {
  return (
    <section className="newspaper-section-block" aria-label="Books Section">
      <div className="section-header">
        <h2 className="section-header-title">BOOKS</h2>
        <Link href="/books" className="section-view-all-link">
          VIEW ALL BOOKS &rarr;
        </Link>
      </div>

      <div className="books-grid">
        {booksData.map((book) => (
          <div key={book.slug} className="book-card">
            <Link href={`/books/${book.slug}`} className="book-cover-link">
              <div className="book-cover-wrap">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>
            <div className="book-info">
              <h3 className="book-title">
                <Link href={`/books/${book.slug}`}>{book.title}</Link>
              </h3>
              <span className="book-author">By {book.author}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .newspaper-section-block {
          width: 100%;
          margin-bottom: 40px;
        }
        .books-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        .book-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border: 1px solid #e2e8f0;
          padding: 12px;
          background: #ffffff;
        }
        .book-cover-link { display: block; }
        .book-cover-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 2/3;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
        }
        .book-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .book-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
        }
        .book-title a { color: #0f172a; text-decoration: none; }
        .book-title a:hover { color: #ff6a00; }
        .book-author {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #64748b;
        }

        @media (max-width: 1024px) {
          .books-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .books-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
