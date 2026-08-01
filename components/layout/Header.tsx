"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "AI", href: "/ai" },
  { label: "Startups", href: "/startups" },
  { label: "Founders", href: "/founders" },
  { label: "Funding", href: "/funding" },
  { label: "AI Tools", href: "/tools" },
  { label: "Business", href: "/business" },
  { label: "Technology", href: "/technology" },
  { label: "Books", href: "/books" },
  { label: "Videos", href: "/videos" },
  { label: "Resources", href: "/resources" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const largeHeaderRef = useRef<HTMLDivElement>(null);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!largeHeaderRef.current || !stickyHeaderRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "120px top",
        onEnter: () => {
          gsap.to(stickyHeaderRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(stickyHeaderRef.current, {
            y: -80,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── NEWSPAPER MASTHEAD (LARGE HEADER) ─── */}
      <header ref={largeHeaderRef} className="masthead">
        <div className="masthead-top">
          <div className="container">
            <div className="masthead-top-inner">
              <span className="header-date">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="header-top-actions">
                <Link href="/search" aria-label="Search" className="header-icon-btn">
                  <Search size={16} />
                </Link>
                <Link href="/newsletter" className="btn btn-primary" style={{ padding: "6px 16px", fontSize: "10px" }}>
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="masthead-logo">
          <Link href="/" className="logo-link" aria-label="Startup Brief Home">
            <span className="logo-text">Startup Brief</span>
            <span className="logo-dot" aria-hidden="true" />
          </Link>
        </div>

        <nav className="masthead-nav" aria-label="Main navigation">
          <div className="container">
            <div className="masthead-nav-inner">
              <ul className="nav-list" role="list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* ─── STICKY HEADER (NO GLASSMORPHISM) ─── */}
      <header
        ref={stickyHeaderRef}
        className="sticky-header"
        style={{ transform: "translateY(-80px)", opacity: 0 }}
        aria-label="Sticky navigation"
      >
        <div className="container">
          <div className="sticky-header-inner">
            <Link href="/" className="sticky-logo" aria-label="Startup Brief Home">
              <span className="sticky-logo-text">Startup Brief</span>
              <span className="sticky-logo-dot" aria-hidden="true" />
            </Link>

            <nav className="sticky-nav" aria-label="Sticky navigation">
              <ul className="sticky-nav-list" role="list">
                {navItems.slice(0, 8).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="sticky-nav-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="sticky-actions">
              <Link href="/search" aria-label="Search" className="header-icon-btn">
                <Search size={15} />
              </Link>
              <Link href="/newsletter" className="btn btn-primary" style={{ padding: "6px 14px", fontSize: "10px" }}>
                Subscribe
              </Link>
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <div 
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`} 
        onClick={() => setMobileOpen(false)} 
        aria-hidden="true" 
      />

      {/* ─── MOBILE MENU DRAWER ─── */}
      <div className={`mobile-menu-drawer ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-menu-header">
          <Link href="/" className="logo-link" onClick={() => setMobileOpen(false)}>
            <span className="sticky-logo-text">Startup Brief</span>
            <span className="sticky-logo-dot" aria-hidden="true" />
          </Link>
          <button className="mobile-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="mobile-menu-nav">
          <ul role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="mobile-nav-item"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-footer">
            <Link href="/newsletter" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setMobileOpen(false)}>
              Subscribe to Startup Brief
            </Link>
          </div>
        </nav>
      </div>

      <style>{`
        /* ─── MASTHEAD (NEWSPAPER STYLE) ─── */
        .masthead {
          background: var(--color-bg);
          border-bottom: 2px solid var(--color-border-dark);
          position: relative;
          z-index: 90;
        }
        .masthead-top {
          border-bottom: 1px solid var(--color-border);
          padding: 8px 0;
        }
        .masthead-top-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header-date {
          font-family: var(--font-ui);
          font-size: 11px;
          color: var(--color-secondary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .header-top-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .header-icon-btn {
          color: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 150ms ease;
          padding: 6px;
        }
        .header-icon-btn:hover {
          color: var(--color-primary);
        }
        .masthead-logo {
          text-align: center;
          padding: 40px 20px 32px;
        }
        .logo-link {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          text-decoration: none;
        }
        .logo-text {
          font-family: var(--font-headline);
          font-size: clamp(48px, 8vw, 86px);
          font-weight: 700;
          letter-spacing: -0.05em;
          color: var(--color-text);
          line-height: 1;
        }
        .logo-dot {
          width: 10px;
          height: 10px;
          background: var(--color-primary);
          flex-shrink: 0;
        }
        .masthead-nav {
          border-top: 1px solid var(--color-border-dark);
          border-bottom: 1px solid var(--color-border);
        }
        .masthead-nav-inner {
          overflow-x: auto;
          scrollbar-width: none;
        }
        .masthead-nav-inner::-webkit-scrollbar {
          display: none;
        }
        .nav-list {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          list-style: none;
          padding: 0;
          margin: 0;
          flex-wrap: nowrap;
          min-width: max-content;
          margin-inline: auto;
        }
        .nav-item {
          display: block;
          font-family: var(--font-ui);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
          padding: 16px 20px;
          text-decoration: none;
          transition: color 150ms ease;
          white-space: nowrap;
        }
        .nav-item:hover {
          color: var(--color-primary);
        }

        /* ─── STICKY HEADER (NO GLASSMORPHISM) ─── */
        .sticky-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border-dark);
          will-change: transform, opacity;
        }
        .sticky-header-inner {
          display: flex;
          align-items: center;
          gap: 28px;
          height: 60px;
        }
        .sticky-logo {
          display: flex;
          align-items: baseline;
          gap: 4px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .sticky-logo-text {
          font-family: var(--font-headline);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--color-text);
          line-height: 1;
        }
        .sticky-logo-dot {
          width: 5px;
          height: 5px;
          background: var(--color-primary);
          flex-shrink: 0;
        }
        .sticky-nav {
          flex: 1;
          overflow: hidden;
        }
        .sticky-nav-list {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sticky-nav-item {
          display: block;
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
          padding: 10px 14px;
          text-decoration: none;
          transition: color 150ms ease;
          white-space: nowrap;
        }
        .sticky-nav-item:hover {
          color: var(--color-primary);
        }
        .sticky-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }

        /* ─── MOBILE MENU ─── */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text);
          padding: 4px;
        }
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 290;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-menu-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 320px;
          max-width: 85vw;
          background: var(--color-bg);
          z-index: 300;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.08);
          visibility: hidden;
        }
        .mobile-menu-drawer.open {
          transform: translateX(0);
          visibility: visible;
        }
        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .mobile-close-btn {
          background: none;
          border: none;
          color: var(--color-text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          transition: color 150ms ease;
        }
        .mobile-close-btn:hover {
          color: var(--color-primary);
        }
        .mobile-menu-nav {
          padding: 28px 24px;
          overflow-y: auto;
          flex: 1;
        }
        .mobile-menu-nav ul {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
        }
        .mobile-nav-item {
          display: block;
          font-family: var(--font-ui);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text);
          padding: 18px 0;
          border-bottom: 1px solid var(--color-border);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .mobile-nav-item:hover {
          color: var(--color-primary);
        }
        .mobile-menu-footer {
          padding-top: 20px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .sticky-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
        }
        @media (max-width: 640px) {
          .header-date {
            display: none;
          }
          .masthead-logo {
            padding: 24px 16px 20px;
          }
          .logo-text {
            font-size: clamp(36px, 9vw, 56px);
          }
        }
        @media (max-width: 390px) {
          .logo-text {
            font-size: 36px;
          }
          .sticky-logo-text {
            font-size: 20px;
          }
          .masthead-top-inner {
            justify-content: flex-end;
          }
        }
      `}</style>
    </>
  );
}
