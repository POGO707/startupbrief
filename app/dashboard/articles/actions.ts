"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
  const user = await requireAdmin();
  
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as string;

  if (!title || !slug || !content) {
    throw new Error("Missing required fields");
  }

  // Ensure mock user exists in DB (for local sqlite dev)
  await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name || "Admin User",
    }
  });

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      status: status || "draft",
      authorId: user.id,
      categoryId: categoryId ? categoryId : undefined,
      publishedAt: status === "published" ? new Date() : null,
    },
  });

  revalidatePath("/", "layout");
  redirect("/dashboard/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAdmin();
  
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as string;

  if (!title || !slug || !content) {
    throw new Error("Missing required fields");
  }

  const existing = await prisma.article.findUnique({ where: { id } });
  
  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      status,
      categoryId: categoryId ? categoryId : undefined,
      publishedAt: status === "published" && existing?.status !== "published" ? new Date() : existing?.publishedAt,
    },
  });

  revalidatePath("/", "layout");
  redirect("/dashboard/articles");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/", "layout"); // Revalidate all layouts (homepage, categories, etc)
}

export async function togglePublishStatus(id: string, currentStatus: string) {
  await requireAdmin();
  const newStatus = currentStatus === "published" ? "draft" : "published";
  
  await prisma.article.update({
    where: { id },
    data: { 
      status: newStatus,
      publishedAt: newStatus === "published" ? new Date() : null
    },
  });
  
  revalidatePath("/", "layout");
}

export async function duplicateArticle(id: string) {
  const user = await requireAdmin();
  
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) throw new Error("Article not found");
  
  const newSlug = `${article.slug}-copy-${Date.now()}`;
  
  await prisma.article.create({
    data: {
      ...article,
      id: undefined,
      title: `${article.title} (Copy)`,
      slug: newSlug,
      status: "draft",
      publishedAt: null,
      createdAt: undefined,
      updatedAt: undefined,
    }
  });
  
  revalidatePath("/dashboard/articles");
}
