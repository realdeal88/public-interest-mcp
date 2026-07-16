import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HakBul — Resmî kaynağa giden en kısa yol",
  description: "Türkiye'de destek, hizmet ve fırsatları resmî kaynaktan araştırmaya başlamak için sade bir yönlendirme aracı.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "HakBul", description: "Resmî kaynağa giden en kısa yol", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "HakBul", description: "Resmî kaynağa giden en kısa yol", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
