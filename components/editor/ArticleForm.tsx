"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import TipTapEditor from "./TipTapEditor";
import { createArticle, updateArticle } from "@/app/dashboard/articles/actions";

interface ArticleFormProps {
  initialData?: any;
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    formData.set("content", content); // Add the TipTap HTML to the form data
    
    try {
      if (initialData?.id) {
        await updateArticle(initialData.id, formData);
      } else {
        await createArticle(formData);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-neutral-900 mb-1.5">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              defaultValue={initialData?.title}
              placeholder="Enter a compelling title..."
              required
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-neutral-900 mb-1.5">URL Slug</label>
              <input 
                type="text" 
                id="slug" 
                name="slug"
                defaultValue={initialData?.slug} 
                placeholder="article-url-slug"
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-neutral-900 mb-1.5">Status</label>
              <select 
                id="status" 
                name="status"
                defaultValue={initialData?.status || "draft"}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-neutral-900 mb-1.5">Cover Image URL</label>
            <input 
              type="url" 
              id="image" 
              name="image" 
              defaultValue={initialData?.image}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-semibold text-neutral-900 mb-1.5">Excerpt</label>
            <textarea 
              id="excerpt" 
              name="excerpt" 
              rows={2}
              defaultValue={initialData?.excerpt}
              placeholder="A brief summary for the homepage..."
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-6">
        <label className="block text-sm font-semibold text-neutral-900 mb-2">Content</label>
        <TipTapEditor content={content} onChange={setContent} />
      </div>

      <div className="flex justify-end gap-3 sticky bottom-6 p-4 bg-white/80 backdrop-blur-md border border-neutral-200/60 rounded-xl shadow-sm z-20">
        <Link 
          href="/dashboard/articles" 
          className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
        >
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm disabled:opacity-70"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Saving..." : (initialData ? "Update Article" : "Save Article")}
        </button>
      </div>
    </form>
  );
}
