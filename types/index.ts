// Article type
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorSlug: string;
  authorAvatar: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  featured?: boolean;
  tags?: string[];
}

// Tool type
export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  logo: string;
  pricing: string;
  pricingType: "free" | "freemium" | "paid";
  url: string;
  description: string;
}

// Founder type
export interface Founder {
  id: string;
  slug: string;
  name: string;
  title: string;
  company: string;
  photo: string;
  bio: string;
  excerpt: string;
}

// Startup type
export interface Startup {
  id: string;
  slug: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  founded: string;
}

// Funding round type
export interface FundingRound {
  id: string;
  startup: string;
  amount: string;
  stage: string;
  investors: string[];
  country: string;
  date: string;
  logo: string;
}

// Book type
export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  cover: string;
  summary: string;
  affiliateUrl: string;
  rating: number;
  year: number;
}

// Video type
export interface Video {
  id: string;
  slug: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  channel: string;
  excerpt: string;
  publishedAt: string;
}

// Resource type
export interface Resource {
  id: string;
  slug: string;
  title: string;
  type: "template" | "guide" | "checklist" | "tool" | "download";
  description: string;
  icon: string;
  downloadUrl: string;
  free: boolean;
}
