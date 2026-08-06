import { prisma } from "@/lib/prisma";

export interface FormattedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  author: string;
  authorSlug: string;
  authorAvatar: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  featured: boolean;
  isHero: boolean;
  isTrending: boolean;
  isEditorsPick: boolean;
  videoUrl?: string | null;
  tags: string[];
}

export interface FormattedAd {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  targetUrl: string;
  sponsor?: string | null;
  adSize: string;
}

export function formatArticle(a: any): FormattedArticle {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title || "Untitled Article",
    excerpt: a.excerpt || "",
    content: a.content || "",
    category: a.category?.name || "General",
    categorySlug: a.category?.slug || "general",
    author: a.author?.name || "Shanto Bari",
    authorSlug: a.author?.name
      ? a.author.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "editorial-team",
    authorAvatar:
      a.author?.image ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    publishedAt: a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).toUpperCase()
      : "MAY 15, 2026",
    readingTime: a.readingTime || 5,
    image:
      a.featuredImage ||
      a.image ||
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=700&fit=crop&auto=format",
    featured: true,
    isHero: !!a.isHero,
    isTrending: !!a.isTrending,
    isEditorsPick: !!a.isEditorsPick,
    videoUrl: a.videoUrl || null,
    tags: a.tags ? a.tags.map((t: any) => t.name) : [],
  };
}

export async function getPublishedArticles(options?: {
  categorySlug?: string;
  categoryName?: string;
  isHero?: boolean;
  isTrending?: boolean;
  isEditorsPick?: boolean;
  take?: number;
  skip?: number;
}): Promise<FormattedArticle[]> {
  try {
    const whereClause: any = {
      status: "published",
    };

    if (options?.isHero) whereClause.isHero = true;
    if (options?.isTrending) whereClause.isTrending = true;
    if (options?.isEditorsPick) whereClause.isEditorsPick = true;

    if (options?.categorySlug) {
      whereClause.category = {
        slug: options.categorySlug.toLowerCase(),
      };
    } else if (options?.categoryName) {
      whereClause.category = {
        name: options.categoryName,
      };
    }

    const articles = await prisma.article.findMany({
      where: whereClause,
      include: {
        author: true,
        category: true,
        tags: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: options?.take,
      skip: options?.skip,
    });

    if (articles.length === 0 && (options?.categorySlug || options?.categoryName)) {
      const fallbackArticles = await prisma.article.findMany({
        where: { status: "published" },
        include: {
          author: true,
          category: true,
          tags: true,
        },
        orderBy: {
          publishedAt: "desc",
        },
        take: options?.take,
        skip: options?.skip,
      });
      return fallbackArticles.map(formatArticle);
    }

    return articles.map(formatArticle);
  } catch (err) {
    console.error("Error fetching published articles from DB:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<FormattedArticle | null> {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    if (!article) return null;
    return formatArticle(article);
  } catch (err) {
    console.error("Error fetching article by slug:", err);
    return null;
  }
}

export async function getAdvertisementByLocation(location: string): Promise<FormattedAd | null> {
  try {
    const ad = await prisma.advertisement.findFirst({
      where: { location, status: "active" },
    });
    if (!ad) return null;
    return {
      id: ad.id,
      title: ad.title,
      location: ad.location,
      imageUrl: ad.imageUrl,
      targetUrl: ad.targetUrl,
      sponsor: ad.sponsor,
      adSize: ad.adSize,
    };
  } catch (err) {
    console.error("Error fetching ad by location:", err);
    return null;
  }
}
