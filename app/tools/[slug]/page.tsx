import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Check, X, ArrowRight, Star, DollarSign } from "lucide-react";
import { topTools } from "@/lib/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
  return topTools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = topTools.find((t) => t.slug === slug) ?? topTools[0];
  return {
    title: `${tool.name} Review & Overview`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = topTools.find((t) => t.slug === slug) ?? topTools[0];
  const alternatives = topTools.filter((t) => t.slug !== slug).slice(0, 3);

  const features = [
    "Advanced context window up to 200K tokens",
    "Real-time web search integration",
    "Multi-file code understanding and editing",
    "Built-in version control awareness",
    "Team collaboration features",
    "API access with generous rate limits",
  ];
  const pros = [
    "Best-in-class accuracy and reasoning",
    "Fast response times even on complex tasks",
    "Excellent code generation quality",
    "Regular model updates included",
  ];
  const cons = [
    "Pricing can be high for heavy users",
    "Occasional rate limits during peak hours",
    "No offline mode",
  ];
  const useCases = [
    { icon: "🧑‍💻", title: "Developers", desc: "Write, review, and debug code faster" },
    { icon: "✍️", title: "Content Teams", desc: "Draft, edit, and repurpose content at scale" },
    { icon: "📊", title: "Analysts", desc: "Synthesize data and generate insights instantly" },
    { icon: "🎯", title: "Founders", desc: "Research markets, write copy, build strategies" },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <div className="tool-page">
          {/* ─── BREADCRUMB ─── */}
          <div className="tool-breadcrumb-bar">
            <div className="container">
              <nav aria-label="Breadcrumb" className="article-breadcrumb">
                <Link href="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-sep" aria-hidden="true">/</span>
                <Link href="/tools" className="breadcrumb-link">AI Tools</Link>
                <span className="breadcrumb-sep" aria-hidden="true">/</span>
                <span className="breadcrumb-current" aria-current="page">{tool.name}</span>
              </nav>
            </div>
          </div>

          {/* ─── TOOL HEADER ─── */}
          <header className="tool-header">
            <div className="container">
              <div className="tool-header-inner">
                <div className="tool-header-logo-wrap">
                  <Image src={tool.logo} alt={`${tool.name} logo`} width={72} height={72} className="tool-header-logo" />
                </div>
                <div className="tool-header-info">
                  <div className="tool-header-top">
                    <span className="badge">{tool.category}</span>
                    <span className={`tool-pricing-badge tool-pricing-${tool.pricingType}`} style={{ fontSize: 11, padding: "3px 10px" }}>
                      {tool.pricing}
                    </span>
                  </div>
                  <h1 className="tool-name-headline">{tool.name}</h1>
                  <p className="tool-tagline-headline">{tool.tagline}</p>
                  <p className="tool-desc-headline">{tool.description}</p>
                  <div className="tool-header-actions">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-primary">
                      <ExternalLink size={14} /> Visit Official Website
                    </a>
                    <div className="tool-rating-wrap">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={16} fill={s <= 4 ? "var(--color-primary)" : "none"} color="var(--color-primary)" />
                      ))}
                      <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--color-secondary)", marginLeft: 6 }}>4.8 / 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="container">
            <div className="tool-body-grid">
              {/* ─── MAIN ─── */}
              <div className="tool-main">
                {/* Features */}
                <section className="tool-section">
                  <h2 className="tool-section-title">Key Features</h2>
                  <ul className="tool-features-list" role="list">
                    {features.map((f) => (
                      <li key={f} className="tool-feature-item">
                        <span className="tool-feature-check" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Use Cases */}
                <section className="tool-section">
                  <h2 className="tool-section-title">Use Cases</h2>
                  <div className="tool-use-cases">
                    {useCases.map((uc) => (
                      <div key={uc.title} className="tool-use-case-card">
                        <span className="tool-use-case-icon">{uc.icon}</span>
                        <h3 className="tool-use-case-title">{uc.title}</h3>
                        <p className="tool-use-case-desc">{uc.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Pros & Cons */}
                <section className="tool-section">
                  <h2 className="tool-section-title">Pros &amp; Cons</h2>
                  <div className="tool-pros-cons">
                    <div className="tool-pros">
                      <h3 className="pros-header">✅ Pros</h3>
                      {pros.map((p) => (
                        <div key={p} className="pros-item">
                          <Check size={13} color="#10b981" strokeWidth={3} />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="tool-cons">
                      <h3 className="cons-header">❌ Cons</h3>
                      {cons.map((c) => (
                        <div key={c} className="cons-item">
                          <X size={13} color="#ef4444" strokeWidth={3} />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* ─── SIDEBAR ─── */}
              <aside className="tool-sidebar">
                {/* Pricing */}
                <div className="tool-sidebar-card">
                  <h2 className="tool-sidebar-title">Pricing</h2>
                  {[
                    { plan: "Free", price: "$0/mo", features: ["1,000 messages/mo", "Basic models only", "No API access"] },
                    { plan: "Pro", price: "$20/mo", features: ["Unlimited messages", "All models", "API access", "Priority support"], highlight: true },
                    { plan: "Team", price: "$30/user/mo", features: ["Everything in Pro", "Team management", "SSO", "Custom domains"] },
                  ].map((tier) => (
                    <div key={tier.plan} className={`pricing-tier ${tier.highlight ? "pricing-tier-highlight" : ""}`}>
                      <div className="pricing-tier-top">
                        <span className="pricing-plan">{tier.plan}</span>
                        <span className="pricing-price">{tier.price}</span>
                      </div>
                      <ul className="pricing-features" role="list">
                        {tier.features.map((f) => (
                          <li key={f} className="pricing-feature-item">
                            <DollarSign size={10} /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Alternatives */}
                <div className="tool-sidebar-card">
                  <h2 className="tool-sidebar-title">Alternatives</h2>
                  {alternatives.map((alt) => (
                    <Link key={alt.id} href={`/tools/${alt.slug}`} className="tool-alt-item">
                      <Image src={alt.logo} alt={alt.name} width={36} height={36} className="tool-alt-logo" />
                      <div>
                        <div className="tool-alt-name">{alt.name}</div>
                        <div className="tool-alt-cat">{alt.category}</div>
                      </div>
                      <ArrowRight size={13} style={{ marginLeft: "auto", color: "var(--color-muted)" }} />
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .tool-page { background: #fff; }
        .tool-breadcrumb-bar {
          border-bottom: 1px solid var(--color-border);
          padding: 12px 0;
          background: #fafafa;
        }
        .tool-header {
          border-bottom: 1px solid var(--color-border);
          padding: 48px 0;
          background: #fff;
        }
        .tool-header-inner {
          display: flex;
          gap: 28px;
          align-items: flex-start;
        }
        .tool-header-logo-wrap {
          border: 1px solid var(--color-border);
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .tool-header-logo { display: block; object-fit: cover; }
        .tool-header-info { display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .tool-header-top { display: flex; align-items: center; gap: 10px; }
        .tool-pricing-badge {
          font-family: var(--font-ui); font-size: 10px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 8px; border-radius: 2px;
        }
        .tool-pricing-freemium { background: rgba(251,146,60,0.15); color: #ea7e25; }
        .tool-pricing-free { background: rgba(34,197,94,0.15); color: #16a34a; }
        .tool-pricing-paid { background: rgba(167,139,250,0.15); color: #7c3aed; }
        .tool-name-headline {
          font-family: var(--font-headline);
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;
        }
        .tool-tagline-headline {
          font-family: var(--font-ui); font-size: 16px; color: var(--color-secondary);
          font-style: italic;
        }
        .tool-desc-headline {
          font-family: var(--font-ui); font-size: 15px; color: var(--color-secondary);
          line-height: 1.6; max-width: 600px;
        }
        .tool-header-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 4px; }
        .tool-rating-wrap { display: flex; align-items: center; gap: 2px; }
        .tool-body-grid {
          display: grid; grid-template-columns: 1fr 320px; gap: 48px;
          padding: 48px 0; align-items: start;
        }
        .tool-main { display: flex; flex-direction: column; gap: 0; }
        .tool-section { padding: 32px 0; border-bottom: 1px solid var(--color-border); }
        .tool-section:last-child { border-bottom: none; }
        .tool-section-title {
          font-family: var(--font-headline); font-size: 22px; font-weight: 600;
          letter-spacing: -0.02em; margin-bottom: 20px;
        }
        .tool-features-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .tool-feature-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-family: var(--font-ui); font-size: 15px; color: var(--color-text);
        }
        .tool-feature-check {
          width: 20px; height: 20px; background: rgba(16,185,129,0.12); border-radius: 50%;
          display: flex; align-items: center; justify-content: center; color: #10b981; flex-shrink: 0; margin-top: 1px;
        }
        .tool-use-cases { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .tool-use-case-card {
          padding: 20px; border: 1px solid var(--color-border); display: flex;
          flex-direction: column; gap: 6px;
        }
        .tool-use-case-icon { font-size: 24px; }
        .tool-use-case-title {
          font-family: var(--font-headline); font-size: 16px; font-weight: 600; letter-spacing: -0.01em;
        }
        .tool-use-case-desc {
          font-family: var(--font-ui); font-size: 13px; color: var(--color-secondary); line-height: 1.5;
        }
        .tool-pros-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .pros-header, .cons-header {
          font-family: var(--font-ui); font-size: 12px; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px;
        }
        .pros-item, .cons-item {
          display: flex; align-items: flex-start; gap: 8px; padding: 8px 0;
          border-bottom: 1px solid var(--color-border);
          font-family: var(--font-ui); font-size: 14px; color: var(--color-text);
          line-height: 1.4;
        }
        .tool-sidebar { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 80px; }
        .tool-sidebar-card { border: 1px solid var(--color-border); padding: 24px; }
        .tool-sidebar-title {
          font-family: var(--font-ui); font-size: 11px; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px;
          padding-bottom: 10px; border-bottom: 2px solid var(--color-text);
        }
        .pricing-tier { padding: 14px 0; border-bottom: 1px solid var(--color-border); }
        .pricing-tier:last-child { border-bottom: none; }
        .pricing-tier-highlight { background: rgba(255,107,0,0.04); margin: 0 -24px; padding: 14px 24px; }
        .pricing-tier-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .pricing-plan {
          font-family: var(--font-ui); font-size: 13px; font-weight: 700; color: var(--color-text);
        }
        .pricing-price {
          font-family: var(--font-headline); font-size: 18px; font-weight: 600;
          letter-spacing: -0.02em; color: var(--color-text);
        }
        .pricing-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 5px; }
        .pricing-feature-item {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--font-ui); font-size: 12px; color: var(--color-secondary);
        }
        .tool-alt-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 0;
          border-bottom: 1px solid var(--color-border); text-decoration: none;
          transition: color 150ms ease;
        }
        .tool-alt-item:last-child { border-bottom: none; }
        .tool-alt-item:hover .tool-alt-name { color: var(--color-primary); }
        .tool-alt-logo { border-radius: 6px; object-fit: cover; border: 1px solid var(--color-border); }
        .tool-alt-name {
          font-family: var(--font-ui); font-size: 14px; font-weight: 600;
          color: var(--color-text); transition: color 150ms ease;
        }
        .tool-alt-cat {
          font-family: var(--font-ui); font-size: 11px; color: var(--color-muted); margin-top: 2px;
        }
        @media (max-width: 900px) {
          .tool-body-grid { grid-template-columns: 1fr; }
          .tool-sidebar { position: static; }
          .tool-header-inner { flex-direction: column; }
          .tool-use-cases { grid-template-columns: 1fr; }
          .tool-pros-cons { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
