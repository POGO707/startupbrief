import { requireAdmin } from "@/lib/auth";
import { UploadCloud, Folder, Image as ImageIcon, Search, Plus, MoreHorizontal } from "lucide-react";

export default async function MediaDashboardPage() {
  await requireAdmin();

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Media Library</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage images, videos, and files across your platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-white border border-neutral-200 text-neutral-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer">
            <Folder className="w-4 h-4" />
            New Folder
          </button>
          <button className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-200/60 bg-[#fdfdfd] flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search media..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 py-3 border-b border-neutral-200/60 flex items-center gap-2 text-sm text-neutral-500">
          <span className="font-medium text-black">Root</span>
          <span>/</span>
          <span>Articles</span>
        </div>

        {/* Media Grid */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Mock Folders */}
            <div className="group cursor-pointer">
              <div className="aspect-square bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-center mb-2 group-hover:bg-neutral-100 transition-colors">
                <Folder className="w-10 h-10 text-neutral-400 group-hover:text-neutral-500" />
              </div>
              <p className="text-sm font-medium text-neutral-900 truncate">Founders</p>
              <p className="text-xs text-neutral-500">12 items</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-square bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-center mb-2 group-hover:bg-neutral-100 transition-colors">
                <Folder className="w-10 h-10 text-neutral-400 group-hover:text-neutral-500" />
              </div>
              <p className="text-sm font-medium text-neutral-900 truncate">Startups</p>
              <p className="text-xs text-neutral-500">45 items</p>
            </div>

            {/* Empty State for files */}
            <div className="col-span-full mt-8">
              <div className="border-2 border-dashed border-neutral-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-6 h-6 text-neutral-400" />
                </div>
                <h3 className="text-[15px] font-medium text-neutral-900 mb-1">Drag and drop files</h3>
                <p className="text-neutral-500 text-sm max-w-sm mb-4">
                  Upload images, videos, or documents directly into this folder.
                </p>
                <button className="bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm">
                  Select Files
                </button>
                <p className="text-xs text-neutral-400 mt-4">
                  Note: Supabase Storage integration requires bucket configuration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
