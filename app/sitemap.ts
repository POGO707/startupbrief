import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://startupbrief.com";
  const now = new Date();

  const staticPages = [
    "",
    "/ai",
    "/startups",
    "/founders",
    "/funding",
    "/tools",
    "/business",
    "/technology",
    "/books",
    "/videos",
    "/resources",
    "/search",
    "/subscribe",
    "/about",
    "/contact",
    "/advertise",
    "/write-for-us",
    "/careers",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return staticPages;
}
