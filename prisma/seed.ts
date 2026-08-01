import { PrismaClient } from '@prisma/client'
import { featuredArticle, heroSideArticles, topPicksArticles, makeMoneyArticles, aiArticles, startupArticles, founderArticles, businessArticles, technologyArticles } from '../lib/data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with initial data from lib/data.ts...')

  // Create mock admin user
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

  // Combine all unique articles from the mock data
  const allMockArticles = [
    featuredArticle,
    ...heroSideArticles,
    ...topPicksArticles,
    ...makeMoneyArticles,
    ...aiArticles,
    ...startupArticles,
    ...founderArticles,
    ...businessArticles,
    ...technologyArticles
  ]

  // Deduplicate by slug
  const uniqueArticlesMap = new Map()
  for (const article of allMockArticles) {
    if (!uniqueArticlesMap.has(article.slug)) {
      uniqueArticlesMap.set(article.slug, article)
    }
  }
  const uniqueArticles = Array.from(uniqueArticlesMap.values())

  for (const mock of uniqueArticles) {
    // Determine category
    let category = await prisma.category.findUnique({ where: { slug: mock.category.toLowerCase().replace(/\s+/g, '-') } })
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: mock.category,
          slug: mock.category.toLowerCase().replace(/\s+/g, '-'),
        }
      })
    }

    // Insert article
    await prisma.article.upsert({
      where: { slug: mock.slug },
      update: {},
      create: {
        title: mock.title,
        slug: mock.slug,
        excerpt: mock.excerpt || `This is a sample excerpt for ${mock.title}.`,
        content: `This is the auto-migrated content for **${mock.title}**.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        image: mock.image,
        status: 'published',
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: category.id,
      }
    })
  }

  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
