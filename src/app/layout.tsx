import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Alexander the Great | A Cinematic Journey",
  description: "An interactive historical documentary experience exploring the life and conquests of Alexander the Great.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
      <body className={`${outfit.variable} font-sans antialiased bg-[#050505] text-[#E5E5E5] overflow-x-hidden relative`}>
        <div className="fixed inset-0 bg-noise z-[9999] pointer-events-none" />
        <div className="fixed inset-0 vignette z-[9998] pointer-events-none" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
