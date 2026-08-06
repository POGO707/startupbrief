import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RightSidebar from "@/components/sidebar/RightSidebar";
import { getPublishedArticles } from "@/lib/articles";
import { FileText, Download, Code, Layers, Shield, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Founder Resources & Toolkits — Startup Brief",
  description: "Pitch deck templates, financial model spreadsheets, async playbooks, and GTM frameworks.",
};

const resourcesData = [
  {
    title: "Series A Pitch Deck Master Template (2026 Edition)",
    desc: "The 12-slide narrative deck structure used by venture-backed startups to secure top VC term sheets.",
    category: "FUNDRAISING",
    icon: FileText,
    link: "/resources/pitch-deck-template",
    dlCount: "14,200 Downloads",
  },
  {
    title: "AI Infrastructure Unit Economics Spreadsheet",
    desc: "Financial modeling spreadsheet to forecast GPU compute costs, API margins, and token tokenomics.",
    category: "FINANCE",
    icon: Download,
    link: "/resources/unit-economics-calculator",
    dlCount: "9,800 Downloads",
  },
  {
    title: "Async Engineering Operating OS Playbook",
    desc: "Comprehensive playbook on remote engineering documentation, pull request SLAs, and multi-timezone shipping.",
    category: "PLAYBOOK",
    icon: Layers,
    link: "/resources/async-operating-system",
    dlCount: "8,400 Downloads",
  },
  {
    title: "SaaS Go-to-Market Engine Strategy",
    desc: "Zero to 1,000 paying customer launch playbook using automated AI content engines and community funnels.",
    category: "GROWTH",
    icon: Code,
    link: "/resources/gtm-playbook",
    dlCount: "12,100 Downloads",
  },
  {
    title: "SOC2 Compliance & Data Privacy Checklist",
    desc: "Step-by-step security audit readiness checklist for early B2B SaaS and AI agent enterprise deployments.",
    category: "SECURITY",
    icon: Shield,
    link: "/resources/soc2-checklist",
    dlCount: "6,500 Downloads",
  },
  {
    title: "AI Prompt Engineering & Agent Spec Framework",
    desc: "Production prompt guidelines, guardrail specifications, and evaluation benchmarks for LLM apps.",
    category: "AI ENGINE",
    icon: Sparkles,
    link: "/resources/ai-agent-spec",
    dlCount: "11,300 Downloads",
  },
];

export default async function ResourcesPage() {
  const rawTrending = await getPublishedArticles({ take: 5, isTrending: true });
  const rawLatest = await getPublishedArticles({ take: 5 });

  return (
    <>
      <Header />
      <main id="main-content">
        {/* RESOURCES HERO */}
        <div className="resources-editorial-hero">
          <div className="newspaper-container">
            <span className="resources-badge">FOUNDER TOOLKITS &amp; PLAYBOOKS</span>
            <h1 className="resources-title">Resources, Frameworks &amp; Calculators</h1>
            <p className="resources-sub">
              Free production-ready templates, spreadsheets, pitch decks, and operational frameworks created for founders and operators.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT WITH SIDEBAR */}
        <div className="newspaper-container" style={{ paddingBlock: 36 }}>
          <div className="resources-page-layout">
            <div className="resources-left-content">
              <div className="section-header">
                <h2 className="section-header-title">FEATURED FOUNDER TOOLKITS</h2>
              </div>

              <div className="resources-grid-container">
                {resourcesData.map((res) => {
                  const IconComp = res.icon;
                  return (
                    <div key={res.title} className="resource-item-box">
                      <div className="res-icon-wrap">
                        <IconComp size={24} color="#ff6a00" />
                      </div>
                      <div className="res-content-wrap">
                        <div className="res-tag-row">
                          <span className="card-orange-badge">{res.category}</span>
                          <span className="dl-count-lbl">{res.dlCount}</span>
                        </div>
                        <h3 className="res-box-title">
                          <Link href={res.link}>{res.title}</Link>
                        </h3>
                        <p className="res-box-desc">{res.desc}</p>
                        <Link href={res.link} className="res-access-btn">
                          Access Resource &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="resources-sidebar-col">
              <RightSidebar trendingArticles={rawTrending} latestArticles={rawLatest} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .resources-editorial-hero {
          background: #0f172a;
          color: #ffffff;
          padding-block: 40px;
          border-bottom: 4px solid #ff6a00;
        }
        .resources-badge { font-family: var(--font-ui); font-size: 11px; font-weight: 800; color: #ff6a00; letter-spacing: 0.12em; text-transform: uppercase; }
        .resources-title { font-family: var(--font-headline), Georgia, serif; font-size: clamp(32px, 4.5vw, 54px); font-weight: 800; color: #ffffff; margin: 6px 0 10px; }
        .resources-sub { font-family: var(--font-ui); font-size: 14px; color: #94a3b8; max-width: 680px; }

        .resources-page-layout { display: grid; grid-template-columns: 1fr 310px; gap: 36px; align-items: start; }
        .resources-grid-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .resource-item-box { display: flex; gap: 16px; border: 1px solid #e2e8f0; padding: 20px; background: #ffffff; align-items: start; }
        .res-icon-wrap { width: 44px; height: 44px; background: #fff7ed; border: 1px solid #ffedd5; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .res-content-wrap { display: flex; flex-direction: column; gap: 6px; }
        .res-tag-row { display: flex; justify-content: space-between; align-items: center; }
        .card-orange-badge { font-family: var(--font-ui); font-size: 10px; font-weight: 800; color: #ff6a00; letter-spacing: 0.1em; text-transform: uppercase; }
        .dl-count-lbl { font-family: var(--font-ui); font-size: 10px; color: #94a3b8; font-weight: 600; }
        .res-box-title { font-family: var(--font-headline), Georgia, serif; font-size: 17px; font-weight: 700; margin: 0; line-height: 1.25; }
        .res-box-title a { color: #0f172a; text-decoration: none; }
        .res-box-title a:hover { color: #ff6a00; }
        .res-box-desc { font-family: var(--font-ui); font-size: 13px; color: #475569; margin: 0; line-height: 1.45; }
        .res-access-btn { font-family: var(--font-ui); font-size: 11px; font-weight: 800; color: #ff6a00; text-decoration: none; margin-top: 4px; }
        .res-access-btn:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .resources-page-layout { grid-template-columns: 1fr; }
          .resources-grid-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
