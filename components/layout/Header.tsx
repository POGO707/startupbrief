"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/ui/Logo";
import Wordmark from "@/components/ui/Wordmark";
import LiveDataBar from "@/components/widgets/LiveDataBar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { label: "HOME", href: "/" },
  { label: "AI", href: "/ai" },
  { label: "STARTUPS", href: "/startups" },
  { label: "FOUNDERS", href: "/founders" },
  { label: "FUNDING", href: "/funding" },
  { label: "AI TOOLS", href: "/tools" },
  { label: "BUSINESS", href: "/business" },
  { label: "TECHNOLOGY", href: "/technology" },
  { label: "BOOKS", href: "/books" },
  { label: "VIDEOS", href: "/videos" },
  { label: "RESOURCES", href: "/resources" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const stickyHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stickyHeaderRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "180px top",
        onEnter: () => {
          gsap.to(stickyHeaderRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(stickyHeaderRef.current, {
            y: -80,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isTabActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ─── 1. LIVE DATA WIDGETS TICKER BAR ─── */}
      <LiveDataBar />

      {/* ─── 2. CENTER EDITORIAL MASTHEAD LOGO (WORDMARK ONLY) ─── */}
      <header className="newspaper-masthead">
        <div className="newspaper-container">
          <div className="masthead-center-box">
            <Link href="/" className="main-logo-link" aria-label="Startup Brief Home">
              <Wordmark variant="dark" size="masthead" />
            </Link>
          </div>
        </div>
      </header>

      {/* ─── 3. BLACK NAVIGATION CONTAINER WITH DATE BADGE ─── */}
      <nav className="black-nav-bar" aria-label="Main Navigation">
        <div className="newspaper-container">
          <div className="black-nav-inner">
            {/* DATE BADGE BOX */}
            <div className="date-badge-box">
              <div className="date-day-num">15</div>
              <div className="date-month-year">MAY, 2026</div>
            </div>

            {/* NAV MENU LINKS (Dynamic active menu tab) */}
            <ul className="nav-menu-list" role="list">
              {navItems.map((item) => {
                const active = isTabActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link-item ${active ? "active-orange-tab" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* RIGHT MOBILE TOGGLE */}
            <div className="nav-right-actions">
              <button
                className="mobile-toggle-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── 4. BREAKING NEWS TICKER & SEARCH BAR ─── */}
      <div className="news-ticker-bar">
        <div className="newspaper-container">
          <div className="news-ticker-inner">
            <div className="ticker-left">
              <span className="trending-now-orange-badge">TRENDING NOW</span>
              <div className="ticker-content-scroll">
                <Link href="/article/openai-launches-gpt5-with-advanced-reasoning" className="ticker-story-link">
                  OpenAI Launches GPT-5 with Advanced Reasoning Capabilities
                </Link>
              </div>
            </div>

            {/* SEARCH INPUT */}
            <form onSubmit={handleSearchSubmit} className="header-search-form">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
              />
              <button type="submit" className="header-search-submit-btn" aria-label="Submit search">
                <Search size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ─── STICKY HEADER ─── */}
      <header
        ref={stickyHeaderRef}
        className="sticky-newspaper-header"
        style={{ transform: "translateY(-80px)", opacity: 0 }}
      >
        <div className="newspaper-container">
          <div className="sticky-newspaper-inner">
            <Link href="/" className="sticky-logo-link" aria-label="Startup Brief Home">
              <Wordmark variant="light" size="header" />
            </Link>

            <ul className="sticky-nav-list" role="list">
              {navItems.slice(0, 8).map((item) => {
                const active = isTabActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`sticky-nav-item ${active ? "active-orange" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="sticky-right-tools">
              <Link href="/search" className="sticky-tool-btn" aria-label="Search">
                <Search size={16} />
              </Link>
              <Link href="/newsletter" className="btn-orange-subscribe" style={{ padding: "6px 14px", fontSize: "10px" }}>
                SUBSCRIBE
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE DRAWER ─── */}
      {mobileOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Wordmark variant="light" size="mobile" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                <X size={24} />
              </button>
            </div>
            <ul className="mobile-drawer-links">
              {navItems.map((item) => {
                const active = isTabActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={active ? "mobile-active-link" : ""}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <style>{`
        /* 1. TOP UTILITY BAR */
        .top-utility-bar {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          color: #475569;
          padding: 8px 0;
        }
        .top-utility-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .utility-date {
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #64748b;
          text-transform: uppercase;
        }
        .utility-right-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .utility-search-link {
          color: #0f172a;
          display: flex;
          align-items: center;
          transition: color 150ms ease;
        }
        .utility-search-link:hover { color: #ff6a00; }
        .btn-orange-subscribe {
          background: #ff6a00;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 6px 16px;
          border-radius: 2px;
          text-decoration: none;
          transition: background 150ms ease;
        }
        .btn-orange-subscribe:hover { background: #e55e00; }

        /* 2. CENTER EDITORIAL MASTHEAD LOGO */
        .newspaper-masthead {
          background: #ffffff;
          padding: 36px 0 28px;
          border-bottom: 1px solid #e2e8f0;
          text-align: center;
        }
        .masthead-center-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .main-logo-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: transform 200ms ease;
        }
        .main-logo-link:hover {
          transform: scale(1.01);
        }

        /* 3. BLACK NAV BAR */
        .black-nav-bar {
          background: #0f172a;
          color: #ffffff;
          border-bottom: 3px solid #ff6a00;
        }
        .black-nav-inner {
          display: flex;
          align-items: center;
          height: 48px;
        }
        .date-badge-box {
          background: #000000;
          padding: 0 16px;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          border-right: 1px solid #334155;
          flex-shrink: 0;
        }
        .date-day-num {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 26px;
          font-weight: 800;
          line-height: 1;
          color: #ffffff;
        }
        .date-month-year {
          font-family: var(--font-ui), sans-serif;
          font-size: 9px;
          font-weight: 700;
          line-height: 1.2;
          color: #94a3b8;
          text-transform: uppercase;
        }
        .nav-menu-list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .nav-menu-list::-webkit-scrollbar { display: none; }
        .nav-link-item {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 16px;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #f1f5f9;
          text-decoration: none;
          white-space: nowrap;
          transition: background 150ms ease, color 150ms ease;
        }
        .nav-link-item:hover {
          background: #1e293b;
          color: #ffffff;
        }
        .nav-link-item.active-orange-tab {
          background: #ff6a00 !important;
          color: #ffffff !important;
        }
        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: #fff;
          padding: 8px;
          cursor: pointer;
        }

        /* 4. NEWS TICKER BAR */
        .news-ticker-bar {
          background: #f8fafc;
          border-bottom: 1px solid #cbd5e1;
          padding: 6px 0;
        }
        .news-ticker-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .ticker-left {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
        }
        .trending-now-orange-badge {
          background: #ff6a00;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .ticker-story-link {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ticker-story-link:hover { color: #ff6a00; }

        .header-search-form {
          display: flex;
          align-items: center;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          border-radius: 2px;
        }
        .header-search-input {
          border: none;
          outline: none;
          padding: 5px 10px;
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          width: 160px;
        }
        .header-search-submit-btn {
          background: none;
          border: none;
          padding: 6px 10px;
          color: #64748b;
          cursor: pointer;
        }
        .header-search-submit-btn:hover { color: #ff6a00; }

        /* STICKY HEADER */
        .sticky-newspaper-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 250;
          background: #0f172a;
          border-bottom: 3px solid #ff6a00;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .sticky-newspaper-inner {
          display: flex;
          align-items: center;
          height: 52px;
          justify-content: space-between;
        }
        .sticky-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .sticky-nav-list {
          display: flex;
          align-items: center;
          list-style: none;
          gap: 16px;
          margin: 0;
          padding: 0;
        }
        .sticky-nav-item {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #f1f5f9;
          text-decoration: none;
          transition: color 150ms ease;
        }
        .sticky-nav-item:hover, .sticky-nav-item.active-orange { color: #ff6a00; }
        .sticky-right-tools {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sticky-tool-btn { color: #ffffff; }

        /* MOBILE DRAWER */
        .mobile-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 999;
        }
        .mobile-drawer-content {
          width: 280px;
          height: 100%;
          background: #0f172a;
          color: #ffffff;
          padding: 24px;
        }
        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .mobile-drawer-header button {
          background: none; border: none; color: #fff; cursor: pointer;
        }
        .mobile-drawer-links {
          list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px;
        }
        .mobile-drawer-links a {
          color: #fff; font-family: var(--font-ui), sans-serif; font-weight: 700; text-decoration: none; font-size: 14px;
          transition: color 150ms ease;
        }
        .mobile-drawer-links a.mobile-active-link {
          color: #ff6a00;
        }

        @media (max-width: 1024px) {
          .sticky-nav-list { display: none; }
          .mobile-toggle-btn { display: block; }
        }
        @media (max-width: 768px) {
          .date-badge-box { display: none; }
          .header-search-form { display: none; }
        }
      `}</style>
    </>
  );
}
