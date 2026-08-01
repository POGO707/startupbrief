import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { 
  PlusCircle, 
  MoreHorizontal, 
  FileEdit, 
  Trash2, 
  Search, 
  SlidersHorizontal,
  Eye,
  Copy,
  Archive,
  ExternalLink,
  Image as ImageIcon
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";

export default async function ArticlesPage(props: { searchParams?: Promise<{ query?: string, page?: string }> }) {
  await requireAdmin();
  
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;
  
  const where = {
    OR: [
      { title: { contains: query } },
      { excerpt: { contains: query } },
    ]
  };

  const totalArticles = await prisma.article.count({ where });
  const totalPages = Math.ceil(totalArticles / itemsPerPage);

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
    include: { author: true, category: true },
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Articles</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your website&apos;s editorial content.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/articles/new" 
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            New Article
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-200/60 bg-[#fdfdfd] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              defaultValue={query}
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 text-neutral-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 text-neutral-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
              Bulk Actions
            </button>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 border border-neutral-200">
              <FileEdit className="w-5 h-5 text-neutral-400" />
            </div>
            <h3 className="text-[15px] font-medium text-neutral-900 mb-1">No articles found</h3>
            <p className="text-neutral-500 mb-4 text-sm max-w-sm">
              {query ? "Try adjusting your search or filters to find what you're looking for." : "Get started by creating your first editorial article."}
            </p>
            {!query && (
              <Link 
                href="/dashboard/articles/new" 
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Write Article
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#fafafa] border-b border-neutral-200/60 text-neutral-500 uppercase tracking-wider font-medium text-[11px]">
                <tr>
                  <th className="px-5 py-3 w-8">
                    <input type="checkbox" className="rounded border-neutral-300 text-black focus:ring-black" />
                  </th>
                  <th className="px-5 py-3">Article</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Stats</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-neutral-50/80 transition-colors group">
                    <td className="px-5 py-3">
                      <input type="checkbox" className="rounded border-neutral-300 text-black focus:ring-black" />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200 relative">
                          {article.image ? (
                            <Image src={article.image} alt={article.title} fill className="object-cover" sizes="40px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-neutral-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col max-w-[250px]">
                          <Link href={`/dashboard/articles/${article.id}/edit`} className="font-medium text-neutral-900 truncate hover:text-blue-600 transition-colors">
                            {article.title}
                          </Link>
                          <span className="text-neutral-500 text-[11px] truncate">
                            by {article.author?.name || "Admin"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">
                        {article.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium capitalize border ${
                        article.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        article.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono">
                        <div className="flex items-center gap-1" title="Views">
                          <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          <span>0</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-neutral-500 text-[12px] font-mono">
                      {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/article/${article.slug}`} target="_blank" className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md hover:bg-neutral-100 transition-colors" title="View Live">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <form action={async () => { "use server"; import("@/app/dashboard/articles/actions").then(m => m.duplicateArticle(article.id)) }}>
                          <button type="submit" className="p-1.5 text-neutral-400 hover:text-green-600 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer" title="Duplicate">
                            <Copy className="w-4 h-4" />
                          </button>
                        </form>
                        <Link href={`/dashboard/articles/${article.id}/edit`} className="p-1.5 text-neutral-400 hover:text-blue-600 rounded-md hover:bg-neutral-100 transition-colors" title="Edit">
                          <FileEdit className="w-4 h-4" />
                        </Link>
                        <form action={async () => { "use server"; import("@/app/dashboard/articles/actions").then(m => m.deleteArticle(article.id)) }}>
                          <button type="submit" className="p-1.5 text-neutral-400 hover:text-red-600 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-neutral-200/60 bg-[#fdfdfd] flex items-center justify-between text-sm">
            <span className="text-neutral-500">
              Showing <span className="font-medium text-neutral-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-neutral-900">{Math.min(currentPage * itemsPerPage, totalArticles)}</span> of <span className="font-medium text-neutral-900">{totalArticles}</span> results
            </span>
            <div className="flex items-center gap-1">
              <button disabled={currentPage === 1} className="px-3 py-1.5 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm font-medium">Previous</button>
              <button disabled={currentPage === totalPages} className="px-3 py-1.5 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm font-medium">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
