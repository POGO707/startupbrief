import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 20,
    include: { author: true, category: true },
  });

  const rssItemsXml = articles
    .map((article) => {
      const pubDate = article.publishedAt
        ? new Date(article.publishedAt).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://startupbrief.com/article/${article.slug}</link>
      <guid isPermaLink="true">https://startupbrief.com/article/${article.slug}</guid>
      <description><![CDATA[${article.excerpt || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${article.category?.name || "General"}]]></category>
      <author><![CDATA[${article.author?.name || "Startup Brief Admin"}]]></author>
    </item>`;
    })
    .join("");

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Startup Brief</title>
    <link>https://startupbrief.com</link>
    <description>Premium editorial media platform covering AI, startups, founders, funding, and technology.</description>
    <language>en-us</language>
    <atom:link href="https://startupbrief.com/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeedXml, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
