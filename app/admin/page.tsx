"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/ui/Logo";
import Wordmark from "@/components/ui/Wordmark";
import { Plus, Edit, Trash2, FileText, FolderPlus, Layout, Check, X, Shield, Lock, Sliders } from "lucide-react";
import { defaultWidgetSettings, WidgetSettings } from "@/lib/widgets";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sb_admin_auth") === "true";
    }
    return false;
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"articles" | "categories" | "ads" | "widgets">("articles");
  const [widgetSettings, setWidgetSettings] = useState<WidgetSettings>(defaultWidgetSettings);
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(() => isAuthenticated);

  // Edit Article Modal State
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  // Article Form State (Create / Edit)
  const [editTitle, setEditTitle] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isHero, setIsHero] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isEditorsPick, setIsEditorsPick] = useState(false);

  const fetchData = async () => {
    try {
      const [resArticles, resCategories, resAds] = await Promise.all([
        fetch("/api/articles").then((r) => r.json()),
        fetch("/api/categories").then((r) => r.json()),
        fetch("/api/ads").then((r) => r.json()),
      ]);
      setArticles(resArticles.articles || []);
      setCategories(resCategories.categories || []);
      setAds(resAds.ads || []);
    } catch (err) {
      console.error("Failed to load CMS data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!isAuthenticated) return;

    Promise.all([
      fetch("/api/articles").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/ads").then((r) => r.json()),
      fetch("/api/settings").then((r) => r.json()),
    ])
      .then(([resArticles, resCategories, resAds, resSettings]) => {
        if (!ignore) {
          setArticles(resArticles.articles || []);
          setCategories(resCategories.categories || []);
          setAds(resAds.ads || []);
          if (resSettings?.settings) setWidgetSettings(resSettings.settings);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load CMS data:", err);
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [isAuthenticated]);

  const handleSaveWidgetSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(widgetSettings),
      });
      if (res.ok) {
        alert("Widget settings saved successfully!");
      }
    } catch (err) {
      alert("Error saving widget settings");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "startupbrief") {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") localStorage.setItem("sb_admin_auth", "true");
      setAuthError("");
      fetchData();
    } else {
      setAuthError("Invalid admin passcode. Try: admin123");
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          slug: editSlug || undefined,
          excerpt: editExcerpt,
          content: editContent,
          categoryId: editCategory || (categories[0]?.id || undefined),
          image: editImage,
          featuredImage: editImage,
          isHero,
          isTrending,
          isEditorsPick,
        }),
      });

      if (res.ok) {
        resetForm();
        fetchData();
        alert("Article published successfully!");
      }
    } catch (err) {
      alert("Error creating article");
    }
  };

  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    try {
      const res = await fetch(`/api/articles/${editingArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          slug: editSlug,
          excerpt: editExcerpt,
          content: editContent,
          categoryId: editCategory,
          image: editImage,
          featuredImage: editImage,
          isHero,
          isTrending,
          isEditorsPick,
        }),
      });

      if (res.ok) {
        setEditingArticle(null);
        resetForm();
        fetchData();
        alert("Article updated successfully!");
      }
    } catch (err) {
      alert("Error updating article");
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      alert("Error deleting article");
    }
  };

  const startEditArticle = (art: any) => {
    setEditingArticle(art);
    setEditTitle(art.title || "");
    setEditSlug(art.slug || "");
    setEditExcerpt(art.excerpt || "");
    setEditContent(art.content || "");
    setEditCategory(art.categoryId || art.category?.id || "");
    setEditImage(art.image || art.featuredImage || "");
    setIsHero(!!art.isHero);
    setIsTrending(!!art.isTrending);
    setIsEditorsPick(!!art.isEditorsPick);
  };

  const resetForm = () => {
    setEditingArticle(null);
    setEditTitle("");
    setEditSlug("");
    setEditExcerpt("");
    setEditContent("");
    setEditCategory("");
    setEditImage("");
    setIsHero(false);
    setIsTrending(false);
    setIsEditorsPick(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main id="main-content" className="admin-login-wrap">
          <div className="admin-login-card">
            <div className="login-logo-box">
              <Logo variant="dark" height={48} />
            </div>
            <h1 className="login-title">Admin CMS Authentication</h1>
            <p className="login-sub">Enter your security key to manage stories and advertisements.</p>

            {authError && <div className="auth-error-badge">{authError}</div>}

            <form onSubmit={handleLogin} className="login-form">
              <label className="form-label">
                Security Key / Passcode
                <div className="pass-input-wrap">
                  <Lock size={16} className="pass-icon" />
                  <input
                    type="password"
                    placeholder="Enter admin passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                    className="form-input pass-input"
                  />
                </div>
              </label>
              <button type="submit" className="login-submit-btn">
                <Shield size={16} /> Authenticate Admin
              </button>
            </form>
          </div>
        </main>
        <Footer />
        <style>{`
          .admin-login-wrap {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            padding: 40px 20px;
          }
          .admin-login-card {
            width: 100%;
            max-width: 420px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            padding: 32px;
            border-radius: 4px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.06);
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .login-logo-box {
            display: flex;
            justify-content: center;
            margin-bottom: 8px;
          }
          .login-title {
            font-family: var(--font-headline), Georgia, serif;
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            text-align: center;
            margin: 0;
          }
          .login-sub {
            font-family: var(--font-ui), sans-serif;
            font-size: 12px;
            color: #64748b;
            text-align: center;
            margin: 0;
          }
          .auth-error-badge {
            background: #fef2f2;
            color: #b91c1c;
            border: 1px solid #fca5a5;
            padding: 8px 12px;
            font-family: var(--font-ui), sans-serif;
            font-size: 12px;
            font-weight: 700;
            border-radius: 2px;
            text-align: center;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .pass-input-wrap {
            position: relative;
            width: 100%;
          }
          .pass-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #64748b;
          }
          .pass-input {
            padding-left: 36px !important;
            width: 100%;
          }
          .login-submit-btn {
            background: #ff6a00;
            color: #ffffff;
            font-family: var(--font-ui), sans-serif;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.08em;
            padding: 12px;
            border: none;
            border-radius: 2px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background 150ms ease;
          }
          .login-submit-btn:hover { background: #e55e00; }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" style={{ minHeight: "80vh", background: "#f8fafc", paddingBlock: 32 }}>
        <div className="newspaper-container">
          <div className="admin-header-title-bar">
            <div>
              <h1 className="admin-title">Startup Brief CMS Control Panel</h1>
              <p className="admin-subtitle">Manage homepage layout, featured stories, categories, and ad placeholders.</p>
            </div>
            <div className="header-actions-right">
              <button
                onClick={() => {
                  if (typeof window !== "undefined") localStorage.removeItem("sb_admin_auth");
                  setIsAuthenticated(false);
                }}
                className="logout-btn"
              >
                Sign Out
              </button>
              <Link href="/" className="back-site-btn">View Live Site &rarr;</Link>
            </div>
          </div>

          {/* ADMIN TABS */}
          <div className="admin-tabs-bar">
            <button
              className={`admin-tab-btn ${activeTab === "articles" ? "active" : ""}`}
              onClick={() => setActiveTab("articles")}
            >
              <FileText size={15} /> Articles ({articles.length})
            </button>
            <button
              className={`admin-tab-btn ${activeTab === "categories" ? "active" : ""}`}
              onClick={() => setActiveTab("categories")}
            >
              <FolderPlus size={15} /> Categories ({categories.length})
            </button>
            <button
              className={`admin-tab-btn ${activeTab === "ads" ? "active" : ""}`}
              onClick={() => setActiveTab("ads")}
            >
              <Layout size={15} /> Ad Placements ({ads.length})
            </button>
            <button
              className={`admin-tab-btn ${activeTab === "widgets" ? "active" : ""}`}
              onClick={() => setActiveTab("widgets")}
            >
              <Sliders size={15} /> Live Data Widgets
            </button>
          </div>

          {loading ? (
            <div className="admin-loading">Loading CMS data...</div>
          ) : (
            <div className="admin-tab-content">
              {/* ─── ARTICLES TAB ─── */}
              {activeTab === "articles" && (
                <div className="admin-grid-2col">
                  {/* CREATE / EDIT ARTICLE FORM */}
                  <div className="admin-card">
                    <div className="card-header-row">
                      <h3 className="card-title">
                        {editingArticle ? `Edit Story: ${editingArticle.title}` : "Publish New Story"}
                      </h3>
                      {editingArticle && (
                        <button onClick={resetForm} className="cancel-edit-btn">
                          <X size={14} /> Cancel Edit
                        </button>
                      )}
                    </div>

                    <form
                      onSubmit={editingArticle ? handleUpdateArticle : handleCreateArticle}
                      className="admin-form"
                    >
                      <label className="form-label">
                        Title
                        <input
                          type="text"
                          className="form-input"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="e.g. OpenAI Releases GPT-5 Enterprise"
                          required
                        />
                      </label>

                      <label className="form-label">
                        Slug (URL identifier)
                        <input
                          type="text"
                          className="form-input"
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value)}
                          placeholder="openai-releases-gpt5-enterprise"
                        />
                      </label>

                      <label className="form-label">
                        Category
                        <select
                          className="form-input"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="form-label">
                        Excerpt Summary
                        <textarea
                          className="form-textarea"
                          rows={2}
                          value={editExcerpt}
                          onChange={(e) => setEditExcerpt(e.target.value)}
                          placeholder="Short introductory summary for homepage card..."
                        />
                      </label>

                      <label className="form-label">
                        Featured Image URL (CMS Managed)
                        <input
                          type="url"
                          className="form-input"
                          value={editImage}
                          onChange={(e) => setEditImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                        />
                      </label>

                      <label className="form-label">
                        Full Article Content (Markdown / Text)
                        <textarea
                          className="form-textarea"
                          rows={6}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          placeholder="Full story body content..."
                        />
                      </label>

                      <div className="checkbox-row">
                        <label className="check-item">
                          <input
                            type="checkbox"
                            checked={isHero}
                            onChange={(e) => setIsHero(e.target.checked)}
                          />
                          Hero Featured Slider
                        </label>
                        <label className="check-item">
                          <input
                            type="checkbox"
                            checked={isTrending}
                            onChange={(e) => setIsTrending(e.target.checked)}
                          />
                          Trending Story
                        </label>
                        <label className="check-item">
                          <input
                            type="checkbox"
                            checked={isEditorsPick}
                            onChange={(e) => setIsEditorsPick(e.target.checked)}
                          />
                          Editor&apos;s Pick
                        </label>
                      </div>

                      <button type="submit" className="submit-cms-btn">
                        {editingArticle ? (
                          <>
                            <Check size={16} /> Save Changes
                          </>
                        ) : (
                          <>
                            <Plus size={16} /> Publish Article
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* ARTICLES LIST */}
                  <div className="admin-card">
                    <h3 className="card-title">All CMS Articles ({articles.length})</h3>
                    <div className="cms-articles-list">
                      {articles.map((art) => (
                        <div key={art.id} className="cms-article-item">
                          <div className="cms-art-meta">
                            <span className="cat-badge">{art.category?.name || "General"}</span>
                            {art.isHero && <span className="tag-hero">Hero</span>}
                            {art.isTrending && <span className="tag-trending">Trending</span>}
                            {art.isEditorsPick && <span className="tag-editors">Pick</span>}
                          </div>
                          <h4 className="cms-art-title">{art.title}</h4>
                          <span className="cms-art-slug">/article/{art.slug}</span>

                          <div className="art-action-buttons">
                            <button
                              onClick={() => startEditArticle(art)}
                              className="act-btn edit"
                            >
                              <Edit size={13} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id, art.title)}
                              className="act-btn delete"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── CATEGORIES TAB ─── */}
              {activeTab === "categories" && (
                <div className="admin-card">
                  <h3 className="card-title">Categories Manager</h3>
                  <ul className="cms-cat-list" role="list">
                    {categories.map((cat) => (
                      <li key={cat.id} className="cms-cat-item">
                        <div>
                          <strong>{cat.name}</strong> <span className="slug-text">({cat.slug})</span>
                          {cat.description && <p className="desc-text">{cat.description}</p>}
                        </div>
                        <span className="status-badge">Active</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ─── ADVERTISEMENTS TAB ─── */}
              {activeTab === "ads" && (
                <div className="admin-card">
                  <h3 className="card-title">Ad Placements Manager (Google AdSense Placeholders)</h3>
                  <div className="cms-ads-list">
                    {ads.map((ad) => (
                      <div key={ad.id} className="cms-ad-card">
                        <div>
                          <strong>{ad.title}</strong> — <span className="loc-text">{ad.location}</span>
                          <div className="ad-sub">Size: {ad.adSize} | Sponsor: {ad.sponsor || "Google AdSense"}</div>
                        </div>
                        <span className="status-badge">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── LIVE WIDGETS TAB ─── */}
              {activeTab === "widgets" && (
                <div className="admin-card">
                  <h3 className="card-title">Live Data Widgets Settings</h3>
                  <form onSubmit={handleSaveWidgetSettings} className="admin-form">
                    <div className="checkbox-row" style={{ flexDirection: "column", gap: 12 }}>
                      <label className="check-item">
                        <input
                          type="checkbox"
                          checked={widgetSettings.showDateTime}
                          onChange={(e) =>
                            setWidgetSettings({ ...widgetSettings, showDateTime: e.target.checked })
                          }
                        />
                        Live Date &amp; Time Clock (Auto-updating)
                      </label>

                      <label className="check-item">
                        <input
                          type="checkbox"
                          checked={widgetSettings.showWeather}
                          onChange={(e) =>
                            setWidgetSettings({ ...widgetSettings, showWeather: e.target.checked })
                          }
                        />
                        Weather Widget (Open-Meteo Free API)
                      </label>

                      <label className="check-item">
                        <input
                          type="checkbox"
                          checked={widgetSettings.showStocks}
                          onChange={(e) =>
                            setWidgetSettings({ ...widgetSettings, showStocks: e.target.checked })
                          }
                        />
                        Stock Market Indices (NIFTY 50, SENSEX, NASDAQ, S&amp;P 500)
                      </label>

                      <label className="check-item">
                        <input
                          type="checkbox"
                          checked={widgetSettings.showCrypto}
                          onChange={(e) =>
                            setWidgetSettings({ ...widgetSettings, showCrypto: e.target.checked })
                          }
                        />
                        Crypto Prices (Bitcoin, Ethereum)
                      </label>

                      <label className="check-item">
                        <input
                          type="checkbox"
                          checked={widgetSettings.showForex}
                          onChange={(e) =>
                            setWidgetSettings({ ...widgetSettings, showForex: e.target.checked })
                          }
                        />
                        Forex Rates (USD / INR)
                      </label>

                      <label className="check-item">
                        <input
                          type="checkbox"
                          checked={widgetSettings.showMetals}
                          onChange={(e) =>
                            setWidgetSettings({ ...widgetSettings, showMetals: e.target.checked })
                          }
                        />
                        Commodities (Gold &amp; Silver Prices)
                      </label>
                    </div>

                    <label className="form-label" style={{ marginTop: 16 }}>
                      Default Weather City
                      <input
                        type="text"
                        className="form-input"
                        value={widgetSettings.defaultCity}
                        onChange={(e) =>
                          setWidgetSettings({ ...widgetSettings, defaultCity: e.target.value })
                        }
                        placeholder="e.g. New Delhi, Mumbai, New York, London"
                      />
                    </label>

                    <label className="form-label">
                      Refresh Interval (Seconds)
                      <input
                        type="number"
                        className="form-input"
                        value={widgetSettings.refreshInterval}
                        onChange={(e) =>
                          setWidgetSettings({
                            ...widgetSettings,
                            refreshInterval: Number(e.target.value) || 300,
                          })
                        }
                        min={30}
                        max={3600}
                      />
                    </label>

                    <button type="submit" className="submit-cms-btn" style={{ marginTop: 16 }}>
                      <Check size={16} /> Save Widget Settings
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <style>{`
        .admin-header-title-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .admin-title {
          font-family: var(--font-headline), Georgia, serif;
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .admin-subtitle {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          color: #64748b;
          margin-top: 4px;
        }
        .header-actions-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logout-btn {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 14px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          cursor: pointer;
          border-radius: 4px;
        }
        .back-site-btn {
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          background: #ff6a00;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
        }
        .admin-tabs-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          border-bottom: 2px solid #cbd5e1;
        }
        .admin-tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 18px;
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
        }
        .admin-tab-btn.active {
          color: #ff6a00;
          border-bottom-color: #ff6a00;
        }
        .admin-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .admin-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 20px;
          border-radius: 4px;
        }
        .card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }
        .card-title {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0f172a;
          margin: 0;
        }
        .cancel-edit-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 4px 8px;
          cursor: pointer;
          border-radius: 2px;
        }
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .form-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #334155;
        }
        .form-input, .form-textarea {
          font-family: var(--font-ui), sans-serif;
          font-size: 13px;
          padding: 8px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 2px;
          outline: none;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: #ff6a00;
        }
        .checkbox-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-block: 8px;
        }
        .check-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 600;
        }
        .submit-cms-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #ff6a00;
          color: #ffffff;
          font-family: var(--font-ui), sans-serif;
          font-size: 12px;
          font-weight: 800;
          padding: 11px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .submit-cms-btn:hover { background: #e55e00; }
        .cms-articles-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 600px;
          overflow-y: auto;
        }
        .cms-article-item {
          padding: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cms-art-meta {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .cat-badge { font-family: var(--font-ui); font-size: 9px; font-weight: 700; background: #0f172a; color: #fff; padding: 2px 6px; }
        .tag-hero { font-family: var(--font-ui); font-size: 9px; font-weight: 700; background: #ff6a00; color: #fff; padding: 2px 6px; }
        .tag-trending { font-family: var(--font-ui); font-size: 9px; font-weight: 700; background: #334155; color: #fff; padding: 2px 6px; }
        .tag-editors { font-family: var(--font-ui); font-size: 9px; font-weight: 700; background: #64748b; color: #fff; padding: 2px 6px; }
        .cms-art-title { font-family: var(--font-headline); font-size: 15px; font-weight: 700; margin: 0; color: #0f172a; }
        .cms-art-slug { font-family: var(--font-ui); font-size: 11px; color: #64748b; }
        .art-action-buttons {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .act-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-ui), sans-serif;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 2px;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .act-btn.edit {
          background: #ffffff;
          border-color: #cbd5e1;
          color: #0f172a;
        }
        .act-btn.delete {
          background: #fef2f2;
          border-color: #fca5a5;
          color: #b91c1c;
        }

        .cms-cat-list, .cms-ads-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-cat-item, .cms-ad-card {
          padding: 12px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-ui); font-size: 13px;
        }
        .slug-text { color: #64748b; font-size: 11px; }
        .desc-text { color: #94a3b8; font-size: 11px; margin: 2px 0 0; }
        .status-badge { background: #f0fdf4; color: #166534; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; border: 1px solid #bbf7d0; }

        @media (max-width: 900px) {
          .admin-grid-2col { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
