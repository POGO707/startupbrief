import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://startupbrief.com"),
  title: {
    default: "Startup Brief — AI, Startups, Founders & Technology",
    template: "%s | Startup Brief",
  },
  description:
    "Startup Brief is a premium editorial media platform covering AI, startups, founders, technology, funding, and business for the next generation of builders.",
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
    title: "Startup Brief — AI, Startups, Founders & Technology",
    description:
      "Premium editorial media platform covering AI, startups, founders, and technology.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Startup Brief",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@startupbrief",
    creator: "@startupbrief",
    title: "Startup Brief — AI, Startups, Founders & Technology",
    description:
      "Premium editorial media platform covering AI, startups, founders, and technology.",
    images: ["/og-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
        {children}
      </body>
    </html>
  );
}
