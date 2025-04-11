/** @format */
import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://happyfurniture.logtech.vn";

export const metadata: Metadata = {
  title: "Giới Thiệu Về Chúng Tôi | Happy Furniture",
  description:
    "Happy Furniture - Đơn vị chuyên cung cấp nội thất cao cấp, hiện đại. Tìm hiểu về sứ mệnh, giá trị và đội ngũ của chúng tôi.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}/gioi-thieu`,
    languages: {
      "vi-VN": `${baseUrl}/gioi-thieu`,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${baseUrl}/gioi-thieu`,
    siteName: "Happy Furniture",
    title: "Giới Thiệu Về Chúng Tôi | Happy Furniture",
    description:
      "Khám phá câu chuyện và giá trị cốt lõi của Happy Furniture – nơi mang đến giải pháp nội thất toàn diện cho mọi không gian sống.",
    images: [
      {
        url: `${baseUrl}/images/about-us.jpg`,
        width: 1200,
        height: 630,
        alt: "Giới Thiệu - Happy Furniture",
      },
    ],
  },
  applicationName: "Happy Furniture",
  keywords: [
    "giới thiệu",
    "happy furniture",
    "nội thất cao cấp",
    "nội thất hiện đại",
    "về chúng tôi",
    "câu chuyện thương hiệu",
  ],
  authors: [{ name: "Happy Furniture Team" }],
  creator: "Happy Furniture",
  publisher: "Happy Furniture Việt Nam",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};
const GioiThieuPage = () => {
  return <div className="container mx-auto">GIOI THIEU PAGE</div>;
};

export default GioiThieuPage;
