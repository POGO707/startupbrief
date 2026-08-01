import type { Metadata } from "next";
import TopAd from "@/components/layout/TopAd";
import Header from "@/components/layout/Header";
import BreakingNewsTicker from "@/components/layout/BreakingNewsTicker";
import Footer from "@/components/layout/Footer";
import TopStories from "@/components/homepage/TopStories";
import { MiddleAd, BottomAd } from "@/components/layout/AdPlacements";
import HeroSection from "@/components/homepage/HeroSection";
import FounderFirst from "@/components/homepage/FounderFirst";
import SpotlightSection from "@/components/homepage/SpotlightSection";
import TodaysAI from "@/components/homepage/TodaysAI";
import FundingTracker from "@/components/homepage/FundingTracker";
import BusinessSection from "@/components/homepage/BusinessSection";
import TechnologySection from "@/components/homepage/TechnologySection";
import BooksSection from "@/components/homepage/BooksSection";
import VideosSection from "@/components/homepage/VideosSection";
import ResourcesSection from "@/components/homepage/ResourcesSection";
import NewsletterSection from "@/components/homepage/NewsletterSection";

export const metadata: Metadata = {
  title: "Startup Brief — AI, Startups, Founders & Technology",
  description:
    "The world's leading editorial media platform covering AI, startups, founders, funding, and technology. Read by 200,000+ founders and investors worldwide.",
  alternates: {
    canonical: "https://startupbrief.com",
  },
};

export default function HomePage() {
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
              "Premium editorial media platform for AI, startups, founders, and technology.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://startupbrief.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <TopAd />
      <Header />
      <BreakingNewsTicker />
      <main id="main-content">
        <TopStories />
        <HeroSection />
        <MiddleAd />
        <FounderFirst />
        <SpotlightSection />
        <TodaysAI />
        <FundingTracker />
        <BusinessSection />
        <TechnologySection />
        <BooksSection />
        <VideosSection />
        <ResourcesSection />
        <NewsletterSection />
        <BottomAd />
      </main>
      <Footer />
    </>
  );
}
