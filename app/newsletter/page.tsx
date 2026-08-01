import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/homepage/NewsletterSection";

export const metadata: Metadata = {
  title: "Newsletter — Startup Brief",
  description: "Join 200,000+ founders, investors, and builders. Get the Startup Brief newsletter.",
};

export default function NewsletterPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
