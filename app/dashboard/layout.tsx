import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "@/app/login/actions";
import { 
  LayoutDashboard, 
  FileText, 
  Cpu, 
  Wrench, 
  Rocket, 
  Users, 
  Banknote, 
  Briefcase, 
  Laptop, 
  BookOpen, 
  Video, 
  Archive, 
  Image as ImageIcon, 
  Tags, 
  Hash, 
  Mail, 
  BarChart, 
  Megaphone, 
  Users as UsersIcon, 
  Settings,
  LogOut,
  Command,
  Search
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/articles", label: "Articles", icon: FileText },
  { href: "/dashboard/media", label: "Media Library", icon: ImageIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
  { divider: true },
  { href: "/dashboard/ai-news", label: "AI News", icon: Cpu },
  { href: "/dashboard/tools", label: "AI Tools", icon: Wrench },
  { href: "/dashboard/startups", label: "Startups", icon: Rocket },
  { href: "/dashboard/founders", label: "Founders", icon: Users },
  { href: "/dashboard/funding", label: "Funding", icon: Banknote },
  { divider: true },
  { href: "/dashboard/business", label: "Business", icon: Briefcase },
  { href: "/dashboard/technology", label: "Technology", icon: Laptop },
  { href: "/dashboard/books", label: "Books", icon: BookOpen },
  { href: "/dashboard/videos", label: "Videos", icon: Video },
  { href: "/dashboard/resources", label: "Resources", icon: Archive },
  { divider: true },
  { href: "/dashboard/categories", label: "Categories", icon: Tags },
  { href: "/dashboard/tags", label: "Tags", icon: Hash },
  { divider: true },
  { href: "/dashboard/newsletter", label: "Newsletter", icon: Mail },
  { href: "/dashboard/ads", label: "Advertisements", icon: Megaphone },
  { href: "/dashboard/users", label: "Users", icon: UsersIcon },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-[#fafafa] font-sans selection:bg-black selection:text-white">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#fdfdfd] border-r border-neutral-200/60 flex flex-col h-screen sticky top-0 hidden md:flex">
        {/* Workspace Selector Mock */}
        <div className="h-14 flex items-center px-4 border-b border-neutral-200/60 hover:bg-neutral-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 w-full">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-[10px] font-bold">
              SB
            </div>
            <span className="text-sm font-medium text-neutral-800 tracking-tight flex-1">Startup Brief</span>
            <span className="text-[10px] bg-neutral-100 border border-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded shadow-sm">PRO</span>
          </div>
        </div>
        
        {/* Search Mock */}
        <div className="px-3 py-3">
          <button className="w-full flex items-center gap-2 bg-white border border-neutral-200/80 rounded-md px-3 py-1.5 text-xs text-neutral-400 hover:border-neutral-300 transition-colors shadow-sm">
            <Search className="w-3.5 h-3.5" />
            <span className="flex-1 text-left">Search...</span>
            <div className="flex items-center gap-0.5 opacity-60">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 styled-scrollbar">
          <div className="space-y-0.5">
            {sidebarLinks.map((link, idx) => {
              if (link.divider) {
                return <div key={`div-${idx}`} className="h-px bg-neutral-200/50 my-2 mx-2" />;
              }
              
              const Icon = link.icon!;
              return (
                <Link 
                  key={link.href}
                  href={link.href!}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] font-medium rounded-md text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all group"
                >
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* User Profile */}
        <div className="p-3 border-t border-neutral-200/60">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-neutral-100 transition-colors mb-1 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 flex items-center justify-center text-white font-medium text-xs shadow-inner">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              <span className="text-[13px] font-medium text-neutral-800 truncate leading-none">{user.name || "Admin"}</span>
              <span className="text-[11px] text-neutral-500 truncate mt-1 leading-none">{user.email}</span>
            </div>
          </div>
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-2.5 w-full px-2.5 py-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer group">
              <LogOut className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-neutral-200/60 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
            <span>Admin</span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900">Workspace</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-[13px] font-medium text-neutral-500 hover:text-black transition-colors flex items-center gap-1">
              View Site ↗
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      <style>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 20px;
        }
        .styled-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #e5e5e5;
        }
      `}</style>
    </div>
  );
}
