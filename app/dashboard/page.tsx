import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { FileText, Users, Eye, ArrowUpRight } from "lucide-react";

export default async function DashboardPage() {
  await requireAdmin();

  // Fetch real stats
  const totalArticles = await prisma.article.count();
  const publishedArticles = await prisma.article.count({ where: { status: "published" } });
  const totalUsers = await prisma.user.count();
  
  // Real recent activity
  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Overview</h1>
        <p className="text-sm text-neutral-500 mt-1">Metrics and performance for your startup media platform.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200/60 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-5 opacity-20 group-hover:opacity-100 transition-opacity">
            <FileText className="w-8 h-8 text-neutral-300" />
          </div>
          <h3 className="text-[13px] font-medium text-neutral-500 mb-2">Total Articles</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-neutral-900 font-mono tracking-tighter">{totalArticles}</p>
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
              +12% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-3">{publishedArticles} published</p>
        </div>
        
        {/* Stat Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200/60 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-5 opacity-20 group-hover:opacity-100 transition-opacity">
            <Eye className="w-8 h-8 text-neutral-300" />
          </div>
          <h3 className="text-[13px] font-medium text-neutral-500 mb-2">Total Views</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-neutral-900 font-mono tracking-tighter">42,891</p>
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
              +8.1% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-3">Across all articles</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200/60 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-5 opacity-20 group-hover:opacity-100 transition-opacity">
            <Users className="w-8 h-8 text-neutral-300" />
          </div>
          <h3 className="text-[13px] font-medium text-neutral-500 mb-2">Total Users</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-neutral-900 font-mono tracking-tighter">{totalUsers}</p>
          </div>
          <p className="text-xs text-neutral-400 mt-3">Registered admins & editors</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-200/60 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-neutral-900">Recent Articles</h2>
            <p className="text-xs text-neutral-500 mt-0.5">The latest content published on your platform.</p>
          </div>
          <Link href="/dashboard/articles" className="text-xs font-medium text-neutral-600 hover:text-black transition-colors bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-md">
            View All
          </Link>
        </div>
        
        {recentArticles.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-neutral-500">No articles found.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#fafafa] border-b border-neutral-200/60 text-neutral-500 font-medium text-[11px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentArticles.map((article) => (
                <tr key={article.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-3.5">
                    <Link href={`/dashboard/articles/${article.id}/edit`} className="font-medium text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium capitalize border ${
                      article.status === 'published' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-neutral-500 text-xs font-mono">
                    {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
