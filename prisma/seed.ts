import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialCategories = [
  { name: "AI", slug: "ai", description: "Artificial intelligence, LLMs, neural networks, and machine learning." },
  { name: "Startups", slug: "startups", description: "Early-stage ventures, growth strategies, and disruptors." },
  { name: "Founders", slug: "founders", description: "Founder stories, leadership insights, and executive lessons." },
  { name: "Funding", slug: "funding", description: "Venture capital, seed rounds, IPOs, and market analysis." },
  { name: "AI Tools", slug: "tools", description: "Top AI applications, productivity software, and agentic workflows." },
  { name: "Business", slug: "business", description: "Global markets, macroeconomic trends, and corporate strategy." },
  { name: "Technology", slug: "technology", description: "Semiconductors, cloud infrastructure, quantum computing, and hardware." },
  { name: "Books", slug: "books", description: "Must-read literature for entrepreneurs, builders, and thinkers." },
  { name: "Videos", slug: "videos", description: "Interviews, keynotes, documentary features, and breakdown videos." },
  { name: "Resources", slug: "resources", description: "Guides, playbooks, frameworks, and tools for founders." },
]

const initialArticles = [
  // 1. HERO STORY
  {
    slug: "sam-altmans-world-id-reaches-10-million-users",
    title: "Sam Altman's World ID Reaches 10 Million Users",
    excerpt: "The biometric identity network is expanding rapidly as digital proof-of-personhood becomes critical infrastructure.",
    category: "TECHNOLOGY",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=700&fit=crop&auto=format",
    isHero: true,
    isTrending: true,
    isEditorsPick: true,
  },

  // 2. TRENDING SIDEBAR STORIES
  {
    slug: "openai-launches-gpt5-with-advanced-reasoning",
    title: "OpenAI Launches GPT-5 with Advanced Reasoning Capabilities",
    excerpt: "The new flagship model demonstrates human-level problem solving across complex engineering, logic, and scientific code tasks.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=300&fit=crop&auto=format",
    isHero: true,
    isTrending: true,
    isEditorsPick: false,
  },
  {
    slug: "byjus-former-ceo-files-100m-fraud-case",
    title: "Byju's Former CEO Files $100M Fraud Case Against Trustee",
    excerpt: "In a dramatic legal escalation, former executives claim governance breaches during institutional restructuring.",
    category: "BUSINESS",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=300&fit=crop&auto=format",
    isHero: true,
    isTrending: true,
    isEditorsPick: false,
  },
  {
    slug: "isro-launches-digital-earth-observation-platform",
    title: "ISRO Launches Digital Earth Observation Platform 'Jordan AI'",
    excerpt: "The space agency unveils real-time satellite telemetry mapping for agricultural forecasting and disaster prevention.",
    category: "TECHNOLOGY",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&h=300&fit=crop&auto=format",
    isHero: true,
    isTrending: true,
    isEditorsPick: false,
  },
  {
    slug: "indias-tv-sensing-pioneer-raises-50m-series-c",
    title: "India's TV Sensing Pioneer Raises $50M Series C for Retail Expansion",
    excerpt: "Next-generation computer vision analytics platform expands across 10,000 retail storefronts nationwide.",
    category: "FUNDING",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=300&fit=crop&auto=format",
    isHero: false,
    isTrending: true,
    isEditorsPick: false,
  },

  // 3. EDITOR'S PICKS
  {
    slug: "claude-4-ai-models-are-now-available",
    title: "Claude 4 AI Models Are Now Available For Everyone",
    excerpt: "Anthropic releases its state-of-the-art model suite featuring 1 million token context windows and computer-use agent capabilities.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=300&fit=crop&auto=format",
    isHero: false,
    isTrending: false,
    isEditorsPick: true,
  },
  {
    slug: "razorpay-reports-record-growth-in-fy26-quarter-1",
    title: "Razorpay Reports Record Growth in FY26 Quarter 1",
    excerpt: "Annualized transaction volume crosses $150 billion as cross-border payments and corporate credit lines surge.",
    category: "BUSINESS",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop&auto=format",
    isHero: false,
    isTrending: false,
    isEditorsPick: true,
  },
  {
    slug: "sequoia-launches-new-investment-platform-jordan-ai",
    title: "Sequoia Launches New Investment Platform 'Jordan AI'",
    excerpt: "The legendary venture capital firm dedicates $500 million to early-stage deep-tech and autonomous AI agents.",
    category: "STARTUPS",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=500&h=300&fit=crop&auto=format",
    isHero: false,
    isTrending: false,
    isEditorsPick: true,
  },
  {
    slug: "meta-rolls-out-ai-powered-ad-tools-for-businesses",
    title: "Meta Rolls Out AI-Powered Ad Tools for Businesses",
    excerpt: "Automated generative copy, instant creative generation, and hyper-targeted campaign optimization transform digital marketing.",
    category: "TECHNOLOGY",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop&auto=format",
    isHero: false,
    isTrending: false,
    isEditorsPick: true,
  },

  // 4. LATEST STORIES MAIN FEATURE
  {
    slug: "isro-successfully-launches-eos09-satellite",
    title: "ISRO Successfully Launches EOS-09 Satellite: Strengthens Earth Observation",
    excerpt: "The satellite will enhance disaster monitoring, agriculture planning, and climate tracking across South Asia with sub-meter radar imaging.",
    category: "TECHNOLOGY",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1000&h=600&fit=crop&auto=format",
    isHero: false,
    isTrending: false,
    isEditorsPick: false,
  },

  // 5. ADDITIONAL CATEGORY STORIES
  {
    slug: "openai-and-microsoft-deepen-strategic-partnership",
    title: "OpenAI and Microsoft Deepen Strategic Partnership for Next-Gen Supercomputing",
    excerpt: "A new multi-gigawatt datacenter initiative promises to train 100x larger neural models over the coming three years.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "google-deepmind-unveils-gemini-3-world-model",
    title: "Google DeepMind Unveils Gemini 3 World Model for Physical Robotics",
    excerpt: "Spatial reasoning and real-time physics understanding allow humanoid robots to manipulate everyday household objects seamlessly.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "whatsapp-introduces-ai-chatbot-for-smarter-conversations",
    title: "WhatsApp Introduces AI Chatbot for Smarter Conversations and Business Support",
    excerpt: "2 billion active users can now leverage instant contextual assistance and multi-lingual customer service bots directly within chats.",
    category: "AI Tools",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "elon-musks-xai-unveils-grok-3",
    title: "Elon Musk's xAI Unveils Grok 3 with Advanced Capabilities",
    excerpt: "Trained on Colossus supercomputing cluster in Memphis, Grok 3 tops open benchmarks in mathematics and code reasoning.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "nvidia-blackwell-chips-ship-to-cloud-providers",
    title: "NVIDIA Blackwell B200 Chips Ship to Major Cloud Providers Worldwide",
    excerpt: "Hyperscalers ramp up cluster deployments as demand for 30x faster inference compute accelerates across enterprise IT.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "how-solo-founders-are-building-million-dollar-saas",
    title: "How Solo Founders Are Building $1M ARR SaaS Companies with AI Tools",
    excerpt: "Case studies of micro-SaaS builders leveraging Cursor, Supabase, and Claude 4 to achieve extreme capital efficiency.",
    category: "Startups",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "jensen-huang-on-the-next-decade-of-computing",
    title: "Jensen Huang on the Next Decade of Computing: 'Accelerated Everything'",
    excerpt: "In an exclusive interview, NVIDIA CEO outlines why general-purpose CPUs are being superseded by specialized AI silicon everywhere.",
    category: "Founders",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "global-venture-capital-funding-rebounds-in-q2",
    title: "Global Venture Capital Funding Rebounds in Q2 2026 Led by DeepTech",
    excerpt: "Venture deals total $85 billion quarterly with early-stage AI, energy storage, and robotics attracting 60% of total capital.",
    category: "Funding",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format",
  },
  {
    slug: "future-of-remote-work-in-2026",
    title: "The Async-First Company Playbook: How Modern Startups Operate Across Timezones",
    excerpt: "Lessons from distributed engineering teams running continuous 24/7 product development cycles.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&auto=format",
  },
]

const initialAds = [
  {
    title: "Google AdSense Sidebar Placeholder",
    location: "sidebar_rectangle",
    imageUrl: "https://placehold.co/300x250/f8fafc/0f172a/png?text=Google+AdSense+300x250",
    targetUrl: "#",
    sponsor: "Google AdSense",
    adSize: "300x250",
  },
  {
    title: "Google AdSense Feed Leaderboard",
    location: "in_feed",
    imageUrl: "https://placehold.co/728x90/f8fafc/0f172a/png?text=Google+AdSense+728x90",
    targetUrl: "#",
    sponsor: "Google AdSense",
    adSize: "728x90",
  },
  {
    title: "Google AdSense Header Leaderboard",
    location: "header_leaderboard",
    imageUrl: "https://placehold.co/728x90/f8fafc/0f172a/png?text=Google+AdSense+728x90",
    targetUrl: "#",
    sponsor: "Google AdSense",
    adSize: "728x90",
  },
]

async function main() {
  console.log('Seeding database with production news and Google AdSense placeholder data...')

  const admin = await prisma.user.upsert({
    where: { email: 'admin@startupbrief.com' },
    update: {},
    create: {
      id: 'mock-admin-123',
      email: 'admin@startupbrief.com',
      name: 'Startup Brief Admin',
      role: 'admin',
    },
  })

  // 1. Seed Categories
  for (const cat of initialCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { description: cat.description },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    })
  }

  // 2. Seed Articles
  for (const mock of initialArticles) {
    let catSlug = mock.category.toLowerCase().replace(/\s+/g, '-')
    let category = await prisma.category.findFirst({
      where: {
        OR: [
          { slug: catSlug },
          { name: mock.category }
        ]
      }
    })
    if (!category) {
      category = await prisma.category.create({
        data: { name: mock.category, slug: catSlug }
      })
    }

    await prisma.article.upsert({
      where: { slug: mock.slug },
      update: {
        isHero: mock.isHero || false,
        isTrending: mock.isTrending || false,
        isEditorsPick: mock.isEditorsPick || false,
      },
      create: {
        title: mock.title,
        slug: mock.slug,
        excerpt: mock.excerpt,
        content: `### ${mock.title}\n\n${mock.excerpt}\n\nIn recent months, the global landscape for technology, artificial intelligence, and startup capital allocation has undergone a profound transformation. As infrastructure matures, founders and engineering teams are deploying next-generation agentic systems directly into core enterprise workflows.\n\n> "Innovation distinguishes between a leader and a follower. Execution in software demands relentless focus and architectural clarity."\n\nBuilt on high-density silicon and distributed models, this milestone represents a fundamental shift in how applications are architected, delivered, and scaled across global markets.\n\n#### Key Takeaways for Builders\n\n1. **Focus on Core Infrastructure**: Scalability starts with sound distributed architecture.\n2. **Iterate Rapidly**: Real-world customer feedback trumps theoretical perfection.\n3. **Maintain High Standards**: Precision and reliability build long-term trust.`,
        image: mock.image,
        status: 'published',
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: category.id,
        readingTime: 5,
        isHero: mock.isHero || false,
        isTrending: mock.isTrending || false,
        isEditorsPick: mock.isEditorsPick || false,
      }
    })
  }

  // 3. Seed Advertisements
  for (const ad of initialAds) {
    const existing = await prisma.advertisement.findFirst({ where: { location: ad.location } })
    if (!existing) {
      await prisma.advertisement.create({
        data: {
          title: ad.title,
          location: ad.location,
          imageUrl: ad.imageUrl,
          targetUrl: ad.targetUrl,
          sponsor: ad.sponsor,
          adSize: ad.adSize,
          status: "active",
        }
      })
    } else {
      await prisma.advertisement.update({
        where: { id: existing.id },
        data: {
          title: ad.title,
          sponsor: ad.sponsor,
        }
      })
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
