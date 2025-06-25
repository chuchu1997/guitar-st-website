// import TileComponent from "@/components/layouts/TileComponent"
// import ServiceList from "@/components/service/service-list"
// import BillboardLayout from "@/components/ui/billboard"
// import CircleLoading from "@/components/ui/circle-loading"
// import { Suspense } from "react"



// import type { Metadata } from "next";

// const baseUrl = "https://happyfurniture.logtech.vn";

// export const metadata: Metadata = {
//   title: {
//     default: "Dịch Vụ Nội Thất - Thiết Kế & Lắp Đặt Chuyên Nghiệp | Happy Furniture",
//     template: "%s | Happy Furniture",
//   },
//   description:
//     "Khám phá các dịch vụ nội thất chuyên nghiệp từ Happy Furniture: thiết kế, tư vấn, lắp đặt và bảo trì nội thất. Đội ngũ giàu kinh nghiệm, phục vụ tận tâm.",

//   metadataBase: new URL(baseUrl),
//   alternates: {
//     canonical: "/dich-vu",
//     languages: {
//       "vi-VN": "/dich-vu",
//     },
//   },

//   openGraph: {
//     type: "website",
//     locale: "vi_VN",
//     url: `${baseUrl}/dich-vu`,
//     siteName: "Happy Furniture",
//     title: "Dịch Vụ Nội Thất - Thiết Kế & Lắp Đặt Chuyên Nghiệp | Happy Furniture",
//     description:
//       "Happy Furniture cung cấp dịch vụ thiết kế, lắp đặt và tư vấn nội thất chuyên nghiệp. Giải pháp toàn diện cho không gian sống hiện đại.",
//     images: [
//       {
//         url: `${baseUrl}/images/banner-service.jpg`, // nên là hình banner dịch vụ
//         width: 1200,
//         height: 630,
//         alt: "Dịch vụ nội thất chuyên nghiệp - Happy Furniture",
//       },
//     ],
//   },

//   applicationName: "Happy Furniture",
//   keywords: [
//     "dịch vụ nội thất",
//     "thiết kế nội thất",
//     "lắp đặt nội thất",
//     "tư vấn nội thất",
//     "bảo trì nội thất",
//     "dịch vụ chuyên nghiệp",
//     "nội thất nhà ở",
//     "thi công nội thất",
//   ],
//   authors: [{ name: "Happy Furniture Team" }],
//   creator: "Happy Furniture",
//   publisher: "Happy Furniture Việt Nam",

//   formatDetection: {
//     telephone: true,
//     date: true,
//     address: true,
//     email: true,
//     url: true,
//   },

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },

//   category: "shopping",
// };



// const DichVuPage = async  ()=>{

//     const category = await getCategoryWithSlug('dich-vu');
//     if (!category) return null;

//     return <div className = "container mx-auto">
  
//          <Suspense fallback={<CircleLoading />}>
//         <BillboardLayout data={category.billboard} />
//         <section className="list-products">
//           <TileComponent
//             title={`Các Dịch Vụ Của (CN) :(${category.name}) `}
//           />
//           <ServiceList title=  {category.name} services={category.services}  />
//         </section>
//       </Suspense>   
//     </div>
// }


// export default DichVuPage

const DichVuPage = ()=>{
  return <>D</>
}

export default DichVuPage;
