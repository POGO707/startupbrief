"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FormattedArticle } from "@/lib/articles";

interface HeroSliderProps {
  articles: FormattedArticle[];
}

export default function HeroSlider({ articles }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideCount = articles.length;

  const nextSlide = useCallback(() => {
    if (slideCount === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    if (slideCount === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (isPaused || slideCount <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, slideCount]);

  if (slideCount === 0) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div
      className="hero-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SLIDE CONTENT WRAPPER */}
      <div className="hero-slider-track">
        {articles.map((article, idx) => {
          const isActive = idx === currentIndex;
          return (
            <article
              key={article.id || article.slug || idx}
              className={`hero-slide-item ${isActive ? "active" : ""}`}
              aria-hidden={!isActive}
            >
              <Link href={`/article/${article.slug}`} className="hero-slide-link">
                <div className="hero-slide-img-wrap">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 850px"
                    className="hero-slide-img"
                  />
                  <div className="hero-dark-overlay" />
                </div>
              </Link>

              <div className="hero-slide-content">
                <span className="hero-orange-badge">
                  {article.category ? article.category.toUpperCase() : "FEATURED"}
                </span>
                <h1 className="hero-main-title">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h1>
                {article.excerpt && (
                  <p className="hero-main-excerpt">{article.excerpt}</p>
                )}
                <div className="hero-author-row">
                  <div className="author-avatar-circle">
                    {article.author ? article.author.charAt(0).toUpperCase() : "S"}
                  </div>
                  <div className="author-meta-text">
                    <span className="name">{article.author || "Startup Brief"}</span>
                    <span className="time">
                      {article.publishedAt} · {article.readingTime || 5} MIN READ
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* CONTROLS: PREV / NEXT ARROWS */}
      {slideCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="slider-arrow-btn prev"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="slider-arrow-btn next"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* PAGINATION DOTS */}
      {slideCount > 1 && (
        <div className="slider-pagination-dots" role="tablist">
          {articles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`pagination-dot ${idx === currentIndex ? "active" : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
              role="tab"
              aria-selected={idx === currentIndex}
            />
          ))}
        </div>
      )}

      <style>{`
        .hero-slider-container {
          position: relative;
          background: #000000;
          border: 1px solid #e2e8f0;
          min-height: 480px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .hero-slider-track {
          position: absolute;
          inset: 0;
        }

        .hero-slide-item {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), visibility 600ms ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 1;
        }
        .hero-slide-item.active {
          opacity: 1;
          visibility: visible;
          z-index: 2;
        }

        .hero-slide-link {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hero-slide-img-wrap {
          position: absolute;
          inset: 0;
        }
        .hero-slide-img {
          object-fit: cover;
          transition: transform 500ms ease;
        }
        .hero-slider-container:hover .hero-slide-item.active .hero-slide-img {
          transform: scale(1.02);
        }
        .hero-dark-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 0, 0, 0.4) 55%,
            rgba(0, 0, 0, 0.15) 100%
          );
        }

        .hero-slide-content {
          position: relative;
          z-index: 3;
          padding: clamp(20px, 3.5vw, 36px);
          padding-bottom: 48px; /* space for pagination dots */
          color: #ffffff;
          max-width: 740px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }
        .hero-slide-content a {
          pointer-events: auto;
        }
        .hero-orange-badge {
          background: #ff6a00;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 4px 10px;
          align-self: flex-start;
          text-transform: uppercase;
        }
        .hero-main-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: clamp(26px, 3.8vw, 42px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .hero-main-title a {
          color: #ffffff;
          text-decoration: none;
          transition: color 150ms ease;
        }
        .hero-main-title a:hover {
          color: #ff6a00;
        }
        .hero-main-excerpt {
          font-family: var(--font-ui), sans-serif;
          font-size: 14px;
          color: #e2e8f0;
          line-height: 1.45;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hero-author-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
        }
        .author-avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .author-meta-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .author-meta-text .name {
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
        }
        .author-meta-text .time {
          font-family: var(--font-ui), sans-serif;
          font-size: 10px;
          color: #cbd5e1;
        }

        /* ARROW BUTTONS */
        .slider-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(15, 23, 42, 0.65);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 200ms ease;
          backdrop-filter: blur(4px);
        }
        .slider-arrow-btn.prev {
          left: 16px;
        }
        .slider-arrow-btn.next {
          right: 16px;
        }
        .slider-arrow-btn:hover {
          background: #ff6a00;
          border-color: #ff6a00;
          color: #ffffff;
        }

        /* PAGINATION DOTS */
        .slider-pagination-dots {
          position: absolute;
          bottom: 16px;
          left: clamp(20px, 3.5vw, 36px);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pagination-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .pagination-dot.active {
          width: 28px;
          border-radius: 6px;
          background: #ff6a00;
        }
        .pagination-dot:hover:not(.active) {
          background: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 900px) {
          .hero-slider-container {
            min-height: 380px;
          }
          .slider-arrow-btn {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>
    </div>
  );
}
