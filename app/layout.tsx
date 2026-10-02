import type { Metadata, Viewport } from "next";
import { Archivo, Bangers, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });

const { site, personal } = portfolio;

// Set the deployed URL in portfolio.json (site.url) or NEXT_PUBLIC_SITE_URL so social previews resolve.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    siteName: site.shortTitle,
    locale: site.locale,
    images: [{ url: site.ogImage, alt: personal.avatar?.alt }],
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: "device-width",
  initialScale: 1,
};

// Flags the document before first paint so GSAP-animated elements don't flash.
// Falls back to showing everything if the animation layer never initialises.
const antiFlashScript = `(function(){var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-anim');setTimeout(function(){if(!d.classList.contains('anim-ready'))d.classList.remove('js-anim')},2500)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={site.language}
      className={`${archivo.variable} ${bangers.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
