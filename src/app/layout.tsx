/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BodyContainer } from "@/components/BodyContainer";
import { Footer } from "@/components/layouts/Footer";
import BlockSidebar from "@/components/layouts/BlockSidebar";
import { MobileGroupButton } from "@/components/layouts/MobileGroupButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const baseUrl = "https://www.suachuamayhan.com";
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default:
      "Máy Hàn Hồng Ký Chính Hãng - Sửa Chữa & Phụ Kiện Máy Hàn | Giá Tốt",
    template: "",
  },
  description:
    "🔧 Chuyên cung cấp Máy Hàn Hồng Ký PRO, Máy Hàn Jasic, Que Hàn Kim Tín, Máy Nén Khí, Dụng Cụ Cầm Tay Makita. Bảo hành chính hãng, giá cạnh tranh. Dịch vụ sửa chữa máy hàn tận nơi!.",

  // Canonical URL
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/",
    },
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: baseUrl,
    siteName: "Sửa chữa máy hàn ",
    title: "Máy Hàn Hồng Ký Chính Hãng - Sửa Chữa & Phụ Kiện Máy Hàn | Giá Tốt",
    description:
      "🔧 Chuyên cung cấp Máy Hàn Hồng Ký PRO, Máy Hàn Jasic, Que Hàn Kim Tín, Máy Nén Khí, Dụng Cụ Cầm Tay Makita. Bảo hành chính hãng, giá cạnh tranh. Dịch vụ sửa chữa máy hàn tận nơi!.",
    images: [
      {
        url: `${baseUrl}/images/banner/14.png`,
        width: 1200,
        height: 630,
        alt: "Máy Hàn Hồng Ký Chính Hãng - Sửa Chữa & Phụ Kiện Máy Hàn | Giá Tốt",
      },
    ],
  },

  // Icons
  // Application metadata
  applicationName: "Sửa chữa máy hàn",
  keywords: [
    "máy hàn hồng ký",
    "máy hàn jasic",
    "que hàn kim tín",
    "máy nén khí",
    "dụng cụ makita",
    "sửa chữa máy hàn",
    "máy hàn điện tử",
    "máy hàn mig",
    "máy hàn tig",
    "máy hàn giá rẻ",
    "máy bơm hơi",
    "máy bơm chính hãng",
    "dụng cụ xây dựng",
    "thiết bị xây dựng",
  ],
  authors: [{ name: "Cường" }],
  creator: "cường",
  publisher: "Vercel",

  // Mobile app configuration
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },

  // Verification for search engines
  verification: {
    google: "yDzcBZrLnnzmVf-g5JWvsvEMRhifOUM-9Dm9Y1jmQ8U",
  },

  // Robot directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "standard",
      "max-snippet": 1,
    },
  },

  // Region and language
  category: "shopping",

  // Viewport settings

  // Theme color
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased relative `}>
        <SidebarProvider>
          <div className="flex flex-col  w-full">
            <Navbar />
            <BodyContainer>{children}</BodyContainer>

            <BlockSidebar />
            <MobileGroupButton />

            <Footer />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
