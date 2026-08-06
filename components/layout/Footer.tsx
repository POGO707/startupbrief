import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { getPublishedArticles } from "@/lib/articles";
import Logo from "@/components/ui/Logo";

export default async function Footer() {
  const recentPosts = await getPublishedArticles({ take: 3 });

  return (
    <footer className="black-newspaper-footer" aria-label="Site footer">
      <div className="newspaper-container">
        <div className="footer-5col-grid">
          {/* COLUMN 1: BRAND LOGO & DESCRIPTION */}
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo-link" aria-label="Startup Brief Home">
              <Logo variant="light" height={38} />
            </Link>
            <p className="footer-desc">
              Your daily dose of startup, business, technology, and AI stories. Read by 200,000+ founders and investors worldwide.
            </p>
            <div className="footer-social-row">
              <a href="#" aria-label="Facebook"><Facebook size={14} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={14} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={14} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={14} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={14} /></a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="footer-col">
            <h4 className="footer-col-header">QUICK LINKS</h4>
            <ul className="footer-menu-links" role="list">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/contact">Advertise</Link></li>
              <li><Link href="/contact">Write for Us</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: CATEGORIES */}
          <div className="footer-col">
            <h4 className="footer-col-header">CATEGORIES</h4>
            <ul className="footer-menu-links" role="list">
              <li><Link href="/ai">AI</Link></li>
              <li><Link href="/startups">Startups</Link></li>
              <li><Link href="/founders">Founders</Link></li>
              <li><Link href="/funding">Funding</Link></li>
              <li><Link href="/tools">AI Tools</Link></li>
              <li><Link href="/business">Business</Link></li>
              <li><Link href="/technology">Technology</Link></li>
              <li><Link href="/resources">Resources</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: RECENT POSTS WITH THUMBNAILS */}
          <div className="footer-col recent-posts-col">
            <h4 className="footer-col-header">RECENT POSTS</h4>
            <div className="footer-recent-list">
              {recentPosts.map((post, idx) => (
                <div key={post.slug || idx} className="footer-post-item">
                  <div className="footer-post-thumb">
                    <Image src={post.image} alt={post.title} fill sizes="50px" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="footer-post-info">
                    <h5 className="footer-post-title">
                      <Link href={`/article/${post.slug}`}>{post.title}</Link>
                    </h5>
                    <span className="footer-post-time">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 5: NEWSLETTER */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-header">NEWSLETTER</h4>
            <p className="footer-newsletter-sub">
              Subscribe to our newsletter to get our latest news &amp; updates:
            </p>
            <form action="/newsletter" method="POST" className="footer-subscribe-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-email-input"
                required
              />
              <button type="submit" className="footer-orange-sub-btn">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="footer-bottom-copyright">
          <p>© 2026 Startup Brief. All Rights Reserved.</p>
          <div className="bottom-legal-links">
            <Link href="/terms">Terms of Use</Link>
            <span className="sep">|</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className="sep">|</span>
            <Link href="/privacy">Disclaimer</Link>
          </div>
        </div>
      </div>

      <style>{`
        .black-newspaper-footer {
          background: #09090b;
          color: #ffffff;
          border-top: 4px solid #ff6a00;
          padding-top: 48px;
          margin-top: 48px;
        }
        .footer-5col-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr 1fr 1.3fr 1.3fr;
          gap: 28px;
          padding-bottom: 36px;
          border-bottom: 1px solid #27272a;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-logo-link {
          display: inline-flex;
          align-items: baseline;
          text-decoration: none;
        }
        .footer-logo-link .logo-serif-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
        }
        .footer-logo-link .logo-orange-dot {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 28px;
          font-weight: 900;
          color: #ff6a00;
        }
        .footer-desc {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          color: #a1a1aa;
          line-height: 1.5;
          margin: 0;
        }
        .footer-social-row {
          display: flex;
          gap: 10px;
        }
        .footer-social-row a {
          color: #ffffff;
          transition: color 150ms ease;
        }
        .footer-social-row a:hover {
          color: #ff6a00;
        }

        .footer-col-header {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0 0 4px;
        }
        .footer-menu-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-menu-links a {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          color: #a1a1aa;
          text-decoration: none;
          transition: color 150ms ease;
        }
        .footer-menu-links a:hover {
          color: #ff6a00;
        }

        /* RECENT POSTS THUMBNAILS */
        .footer-recent-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-post-item {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 10px;
          align-items: center;
        }
        .footer-post-thumb {
          position: relative;
          width: 48px;
          height: 38px;
          background: #18181b;
        }
        .footer-post-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.25;
          margin: 0;
        }
        .footer-post-title a {
          color: #f4f4f5;
          text-decoration: none;
        }
        .footer-post-title a:hover {
          color: #ff6a00;
        }
        .footer-post-time {
          font-family: var(--font-ui), sans-serif;
          font-size: 9px;
          color: #71717a;
        }

        /* NEWSLETTER */
        .footer-newsletter-sub {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #a1a1aa;
          margin: 0;
        }
        .footer-subscribe-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-email-input {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          padding: 9px 10px;
          background: #18181b;
          border: 1px solid #27272a;
          color: #ffffff;
          outline: none;
        }
        .footer-orange-sub-btn {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 10px;
          background: #ff6a00;
          color: #ffffff;
          border: none;
          cursor: pointer;
        }

        /* COPYRIGHT */
        .footer-bottom-copyright {
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #71717a;
        }
        .bottom-legal-links {
          display: flex;
          gap: 8px;
        }
        .bottom-legal-links a {
          color: #71717a;
          text-decoration: none;
        }
        .bottom-legal-links a:hover {
          color: #ffffff;
        }
        .bottom-legal-links .sep { color: #27272a; }

        @media (max-width: 1024px) {
          .footer-5col-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 640px) {
          .footer-5col-grid { grid-template-columns: 1fr; }
          .footer-bottom-copyright { flex-direction: column; gap: 8px; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
