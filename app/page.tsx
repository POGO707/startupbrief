import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/homepage/HeroSection";
import TopPicks from "@/components/homepage/TopPicks";
import TopStories from "@/components/homepage/TopStories";
import SponsorBanner from "@/components/layout/SponsorBanner";
import EditorialCategoryBlock from "@/components/homepage/EditorialCategoryBlock";
import BooksSection from "@/components/homepage/BooksSection";
import VideosSection from "@/components/homepage/VideosSection";
import ResourcesSection from "@/components/homepage/ResourcesSection";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Startup Brief — Premium Digital Newspaper",
  description:
    "The world's leading digital newspaper covering AI, startups, founders, funding, and technology.",
  alternates: {
    canonical: "https://startupbrief.com",
  },
};

export default async function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Startup Brief",
            url: "https://startupbrief.com",
            description:
              "Premium digital newspaper for AI, startups, founders, and technology.",
          }),
        }}
      />

      <Header />

      <main id="main-content">
        <div className="newspaper-container" style={{ paddingTop: 20 }}>
          {/* 5. HERO STORY & TRENDING SIDEBAR */}
          <HeroSection />

          {/* 7. EDITOR'S PICKS */}
          <TopPicks />

          {/* 8. LATEST STORIES */}
          <TopStories />

          <SponsorBanner location="mid_page_leaderboard" />

          {/* 9. AI SECTION */}
          <EditorialCategoryBlock
            title="AI & AUTOMATION"
            categorySlug="ai"
            viewAllLink="/ai"
          />

          {/* 10. STARTUP SECTION */}
          <EditorialCategoryBlock
            title="STARTUPS & SCALEUPS"
            categorySlug="startups"
            viewAllLink="/startups"
          />

          {/* 11. FOUNDER SECTION */}
          <EditorialCategoryBlock
            title="FOUNDER INSIGHTS"
            categorySlug="founders"
            viewAllLink="/founders"
          />

          {/* 12. FUNDING SECTION */}
          <EditorialCategoryBlock
            title="VENTURE & FUNDING"
            categorySlug="funding"
            viewAllLink="/funding"
          />

          <SponsorBanner location="mid_page_leaderboard_2" />

          {/* 13. BUSINESS SECTION */}
          <EditorialCategoryBlock
            title="GLOBAL BUSINESS"
            categorySlug="business"
            viewAllLink="/business"
          />

          {/* 14. TECHNOLOGY SECTION */}
          <EditorialCategoryBlock
            title="DEEP TECH & HARDWARE"
            categorySlug="technology"
            viewAllLink="/technology"
          />

          {/* 15. BOOKS SECTION */}
          <BooksSection />

          {/* 16. VIDEOS SECTION */}
          <VideosSection />

          {/* 17. RESOURCES SECTION */}
          <ResourcesSection />
        </div>

        {/* 18. NEWSLETTER SECTION */}
        <NewsletterSection />
      </main>

      {/* 19. PREMIUM FOOTER */}
      <Footer />
    </>
  );
}
