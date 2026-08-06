import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: { author: true, category: true, tags: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, slug, excerpt, content, categoryId, image, isHero, isTrending, isEditorsPick, videoUrl } = data;

    let admin = await prisma.user.findFirst({ where: { role: "admin" } });
    if (!admin) {
      admin = await prisma.user.create({
        data: { email: "admin@startupbrief.com", name: "Shanto Bari", role: "admin" },
      });
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        excerpt,
        content,
        categoryId,
        image,
        isHero: !!isHero,
        isTrending: !!isTrending,
        isEditorsPick: !!isEditorsPick,
        videoUrl,
        status: "published",
        publishedAt: new Date(),
        authorId: admin.id,
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
