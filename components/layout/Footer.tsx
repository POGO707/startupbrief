import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              Startup Brief
            </Link>
            <p className="footer-description">
              The premier digital newspaper covering the next generation of builders, founders, and technology architectures.
            </p>
          </div>
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4 className="footer-column-title">Editorial</h4>
              <ul className="footer-list">
                <li><Link href="/ai">Artificial Intelligence</Link></li>
                <li><Link href="/startups">Startups & Scaleups</Link></li>
                <li><Link href="/founders">Founder Profiles</Link></li>
                <li><Link href="/funding">Venture Capital</Link></li>
                <li><Link href="/business">Business Strategy</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Resources</h4>
              <ul className="footer-list">
                <li><Link href="/tools">AI Tools Database</Link></li>
                <li><Link href="/books">Essential Books</Link></li>
                <li><Link href="/videos">Video Interviews</Link></li>
                <li><Link href="/resources">Playbooks</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <ul className="footer-list">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span className="footer-copyright">
              © {new Date().getFullYear()} Startup Brief. All rights reserved.
            </span>
            <div className="footer-legal-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: var(--color-bg);
          border-top: 4px solid var(--color-text);
          padding-top: clamp(48px, 6vw, 80px);
          padding-bottom: 24px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.2fr 2fr;
          gap: 64px;
          margin-bottom: 64px;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-logo {
          font-family: var(--font-headline);
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -0.04em;
          color: var(--color-text);
          text-decoration: none;
        }
        .footer-description {
          font-family: var(--font-ui);
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-secondary);
          max-width: 320px;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .footer-column-title {
          font-family: var(--font-ui);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text);
          margin-bottom: 20px;
          border-bottom: 1px solid var(--color-border-dark);
          padding-bottom: 8px;
        }
        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-list a {
          font-family: var(--font-ui);
          font-size: 13px;
          color: var(--color-secondary);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .footer-list a:hover {
          color: var(--color-primary);
        }
        .footer-bottom {
          border-top: 1px solid var(--color-border);
          padding-top: 24px;
        }
        .footer-legal {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-copyright {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-muted);
        }
        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .footer-legal-links a {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-muted);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .footer-legal-links a:hover {
          color: var(--color-text);
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .footer-brand {
            max-width: 100%;
          }
          .footer-description {
            max-width: 480px;
          }
        }
        @media (max-width: 640px) {
          .footer-links-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 24px;
          }
          .footer-legal {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (max-width: 414px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
