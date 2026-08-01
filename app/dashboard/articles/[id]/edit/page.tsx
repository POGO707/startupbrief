import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ArticleForm from "@/components/editor/ArticleForm";

export default async function EditArticlePage(props: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  
  const params = await props.params;
  const article = await prisma.article.findUnique({
    where: { id: params.id }
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/articles" 
          className="text-neutral-500 hover:text-black transition-colors bg-white p-2 border border-neutral-200/60 rounded-md shadow-sm hover:bg-neutral-50"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Edit Article</h1>
          <p className="text-sm text-neutral-500">Update your existing story.</p>
        </div>
      </div>

      <ArticleForm initialData={article} />
    </div>
  );
}
