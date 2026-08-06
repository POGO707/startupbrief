import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// PUT: Update an existing article by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      categoryId,
      image,
      featuredImage,
      isHero,
      isTrending,
      isEditorsPick,
      videoUrl,
      status,
    } = body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        slug: slug !== undefined ? slug : existing.slug,
        excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
        content: content !== undefined ? content : existing.content,
        categoryId: categoryId !== undefined ? categoryId : existing.categoryId,
        image: image !== undefined ? image : existing.image,
        featuredImage: featuredImage !== undefined ? featuredImage : (image || existing.featuredImage),
        isHero: isHero !== undefined ? !!isHero : existing.isHero,
        isTrending: isTrending !== undefined ? !!isTrending : existing.isTrending,
        isEditorsPick: isEditorsPick !== undefined ? !!isEditorsPick : existing.isEditorsPick,
        videoUrl: videoUrl !== undefined ? videoUrl : existing.videoUrl,
        status: status !== undefined ? status : existing.status,
      },
    });

    // Revalidate paths for instant CMS updates on live site
    try {
      revalidatePath("/");
      revalidatePath("/ai");
      revalidatePath("/startups");
      revalidatePath("/founders");
      revalidatePath("/funding");
      revalidatePath("/business");
      revalidatePath("/technology");
      revalidatePath(`/article/${updated.slug}`);
    } catch (e) {
      // Ignore cache revalidation errors if static export
    }

    return NextResponse.json({ article: updated });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

// DELETE: Remove an article by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    await prisma.article.delete({ where: { id } });

    // Revalidate paths
    try {
      revalidatePath("/");
      revalidatePath("/ai");
      revalidatePath("/startups");
      revalidatePath("/founders");
      revalidatePath("/funding");
      revalidatePath("/business");
      revalidatePath("/technology");
    } catch (e) {
      // Ignore cache revalidation errors
    }

    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
