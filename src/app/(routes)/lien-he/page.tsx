
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://happyfurniture.logtech.vn";

export const metadata: Metadata = {
  title: "Liên Hệ Với Chúng Tôi | Happy Furniture",
  description:
    "Bạn cần tư vấn hoặc hỗ trợ về nội thất? Liên hệ ngay với đội ngũ Happy Furniture để được phục vụ nhanh chóng và chuyên nghiệp.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}/lien-he`,
    languages: {
      "vi-VN": `${baseUrl}/lien-he`,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${baseUrl}/lien-he`,
    siteName: "Happy Furniture",
    title: "Liên Hệ Với Chúng Tôi | Happy Furniture",
    description:
      "Liên hệ Happy Furniture để nhận tư vấn về thiết kế, thi công và giải pháp nội thất toàn diện cho không gian của bạn.",
    images: [
      {
        url: `${baseUrl}/images/contact-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Liên Hệ - Happy Furniture",
      },
    ],
  },
  applicationName: "Happy Furniture",
  keywords: [
    "liên hệ nội thất",
    "tư vấn nội thất",
    "liên hệ happy furniture",
    "thiết kế nội thất",
    "hỗ trợ khách hàng",
    "dịch vụ nội thất",
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



const LienHePage = ()=>{
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4">Liên hệ</h1>
            <p className="text-lg">Đây là trang liên hệ .</p>
        </div>
    )

}



export default LienHePage;
