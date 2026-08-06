/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://startupbrief.com"),
  applicationName: "Startup Brief",
  title: {
    default: "Startup Brief – AI, Startups & Business News",
    template: "%s | Startup Brief",
  },
  description: "Premium AI, Startup, Founder and Business Media Platform",
  keywords: [
    "startups",
    "AI news",
    "founders",
    "technology",
    "venture capital",
    "funding",
    "business",
    "AI tools",
  ],
  authors: [{ name: "Startup Brief" }],
  creator: "Startup Brief",
  publisher: "Startup Brief",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://startupbrief.com",
    siteName: "Startup Brief",
    title: "Startup Brief – AI, Startups & Business News",
    description: "Premium AI, Startup, Founder and Business Media Platform",
  },
  twitter: {
    card: "summary_large_image",
    site: "@startupbrief",
    creator: "@startupbrief",
    title: "Startup Brief – AI, Startups & Business News",
    description: "Premium AI, Startup, Founder and Business Media Platform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Startup Brief",
              "url": "https://startupbrief.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://startupbrief.com/icon/32",
                "width": 32,
                "height": 32
              },
              "sameAs": [
                "https://twitter.com/startupbrief",
                "https://linkedin.com/company/startupbrief"
              ],
              "description": "Premium AI, Startup, Founder and Business Media Platform"
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
