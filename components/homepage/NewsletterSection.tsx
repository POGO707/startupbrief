"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="newsletter-section section" aria-label="Newsletter subscription">
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-inner">
            {/* ─── LEFT: COPY ─── */}
            <div className="newsletter-copy">
              <span className="newsletter-overline">The Startup Brief Newsletter</span>
              <h2 className="newsletter-headline">
                Intelligence that moves the needle.
              </h2>
              <p className="newsletter-body">
                Every week, we distill the most important developments in AI, startups, and technology
                into a single, premium briefing. No fluff. No noise. Only what matters.
              </p>

              <ul className="newsletter-benefits" role="list">
                {[
                  "Startup funding news before it trends",
                  "AI tool recommendations from experts",
                  "Founder interviews and frameworks",
                  "Weekly resource drops — always free",
                ].map((benefit) => (
                  <li key={benefit} className="newsletter-benefit">
                    <span className="newsletter-check" aria-hidden="true">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ─── RIGHT: FORM ─── */}
            <div className="newsletter-form-wrap">
              {submitted ? (
                <div className="newsletter-success">
                  <div className="newsletter-success-icon">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="newsletter-success-title">You&rsquo;re in.</h3>
                  <p className="newsletter-success-body">
                    Welcome to Startup Brief. Your first issue lands in your inbox shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
                  <label htmlFor="newsletter-email" className="newsletter-label">
                    Email Address
                  </label>
                  <div className="newsletter-input-wrap">
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="newsletter-input"
                      required
                      aria-required="true"
                    />
                  </div>
                  <button
                    type="submit"
                    className="newsletter-submit"
                    disabled={loading}
                    aria-label="Subscribe to newsletter"
                  >
                    {loading ? (
                      <span className="newsletter-loading">Subscribing…</span>
                    ) : (
                      <>
                        Subscribe Free <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                  <p className="newsletter-disclaimer">
                    Free forever. No spam. Unsubscribe anytime. Join 200,000+ readers.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .newsletter-section {
          background: var(--color-bg);
          padding-bottom: clamp(60px, 8vw, 100px);
        }
        .newsletter-box {
          border: 4px solid var(--color-text);
          padding: 60px;
        }
        .newsletter-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .newsletter-copy {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .newsletter-overline {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .newsletter-headline {
          font-family: var(--font-headline);
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.03em;
          font-weight: 600;
          color: var(--color-text);
        }
        .newsletter-body {
          font-family: var(--font-ui);
          font-size: 16px;
          color: var(--color-secondary);
          line-height: 1.7;
          max-width: 480px;
        }
        .newsletter-benefits {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid var(--color-border);
          padding-top: 24px;
          margin-top: 8px;
        }
        .newsletter-benefit {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-ui);
          font-size: 15px;
          color: var(--color-text);
          font-weight: 500;
        }
        .newsletter-check {
          width: 20px;
          height: 20px;
          background: var(--color-text);
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-bg);
          flex-shrink: 0;
        }

        /* ─── FORM ─── */
        .newsletter-form-wrap {
          border-left: 1px solid var(--color-border-dark);
          padding-left: 60px;
        }
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .newsletter-label {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text);
        }
        .newsletter-input-wrap {
          position: relative;
        }
        .newsletter-input {
          width: 100%;
          font-family: var(--font-ui);
          font-size: 16px;
          padding: 16px 20px;
          background: transparent;
          border: 2px solid var(--color-text);
          color: var(--color-text);
          outline: none;
          transition: border-color 150ms ease;
        }
        .newsletter-input:focus {
          border-color: var(--color-primary);
        }
        .newsletter-input::placeholder {
          color: var(--color-muted);
        }
        .newsletter-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px 24px;
          background: var(--color-text);
          color: var(--color-bg);
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .newsletter-submit:hover:not(:disabled) {
          background: var(--color-primary);
          color: #fff;
        }
        .newsletter-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .newsletter-disclaimer {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--color-secondary);
          line-height: 1.5;
          margin-top: 8px;
        }

        /* ─── SUCCESS ─── */
        .newsletter-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }
        .newsletter-success-icon {
          width: 60px;
          height: 60px;
          background: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-bg);
        }
        .newsletter-success-title {
          font-family: var(--font-headline);
          font-size: 32px;
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: -0.02em;
        }
        .newsletter-success-body {
          font-family: var(--font-ui);
          font-size: 16px;
          color: var(--color-secondary);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .newsletter-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .newsletter-form-wrap {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--color-border-dark);
            padding-top: 40px;
          }
          .newsletter-box {
            padding: 40px 24px;
          }
        }
      `}</style>
    </section>
  );
}
