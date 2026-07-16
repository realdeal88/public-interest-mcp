import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Tercih Dengesi — YKS tercih listesi stres testi", description: "YKS tercih listesini riskli, dengeli ve güvenli katmanlara ayıran şeffaf kontrol aracı." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="tr"><body>{children}</body></html>; }
