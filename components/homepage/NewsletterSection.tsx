"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="newspaper-newsletter-banner" aria-label="Newsletter Subscription">
      <div className="newspaper-container">
        <div className="newsletter-box-inner">
          <div className="newsletter-text-col">
            <span className="newsletter-tag">DAILY NEWSLETTER</span>
            <h2 className="newsletter-headline">
              Join 200,000+ Founders &amp; Operators Who Read Startup Brief Every Morning
            </h2>
            <p className="newsletter-subtext">
              Get our daily analysis on AI breakdowns, funding announcements, founder playbooks, and tech market trends delivered straight to your inbox.
            </p>
          </div>

          <div className="newsletter-form-col">
            {submitted ? (
              <div className="success-message">
                <CheckCircle2 size={24} color="#ff6a00" />
                <span>You are subscribed! Thank you for joining Startup Brief.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="subscribe-input-form">
                <div className="input-wrap">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-email-input"
                  />
                </div>
                <button type="submit" className="newsletter-orange-submit-btn">
                  SUBSCRIBE NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .newspaper-newsletter-banner {
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          border-top: 4px solid #ff6a00;
          padding-block: 44px;
          margin-block: 40px;
        }
        .newsletter-box-inner {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 32px;
          align-items: center;
        }
        .newsletter-text-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .newsletter-tag {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ff6a00;
          text-transform: uppercase;
        }
        .newsletter-headline {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          line-height: 1.15;
          color: #ffffff;
          margin: 0;
        }
        .newsletter-subtext {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0;
        }

        .newsletter-form-col {
          display: flex;
          flex-direction: column;
        }
        .subscribe-input-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .input-wrap {
          position: relative;
          width: 100%;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }
        .newsletter-email-input {
          width: 100%;
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          padding: 12px 14px 12px 42px;
          background: #1e293b;
          border: 1px solid #334155;
          color: #ffffff;
          outline: none;
          border-radius: 2px;
        }
        .newsletter-email-input:focus {
          border-color: #ff6a00;
        }
        .newsletter-orange-submit-btn {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 13px;
          background: #ff6a00;
          color: #ffffff;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .newsletter-orange-submit-btn:hover {
          background: #e55e00;
        }
        .success-message {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          color: #ffffff;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .newsletter-box-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
