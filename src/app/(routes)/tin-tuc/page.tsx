/** @format */

import React from "react";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
};

const newsList: NewsItem[] = [
  {
    id: 1,
    title: "Top 5 cây guitar acoustic tốt nhất cho người mới bắt đầu",
    excerpt:
      "Khám phá những mẫu guitar acoustic chất lượng, dễ chơi và giá hợp lý dành cho người mới bắt đầu.",
    date: "2025-06-15",
    imageUrl: "/images/news-acoustic.jpg",
    slug: "top-5-guitar-acoustic-cho-nguoi-moi",
  },
  {
    id: 2,
    title: "Lợi ích của việc học chơi guitar đối với sức khỏe tinh thần",
    excerpt:
      "Chơi guitar không chỉ giúp giải trí mà còn mang lại nhiều lợi ích về mặt cảm xúc và tinh thần.",
    date: "2025-06-10",
    imageUrl: "/images/news-guitar-health.jpg",
    slug: "loi-ich-choi-guitar",
  },
  {
    id: 3,
    title: "Guitar điện hay guitar cổ điển – lựa chọn nào phù hợp với bạn?",
    excerpt:
      "So sánh ưu nhược điểm của các dòng guitar phổ biến để chọn ra cây đàn phù hợp với phong cách của bạn.",
    date: "2025-06-01",
    imageUrl: "/images/news-compare.jpg",
    slug: "nen-chon-guitar-nao",
  },
];

const NewsPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 container mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-50 to-white py-16 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Tin Tức & Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cập nhật những tin tức mới nhất, bài viết hữu ích và kinh nghiệm chơi
          nhạc cụ từ Guitar Sài Thành.
        </p>
      </div>

      {/* News List */}
      <section className="py-12 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((item) => (
          <a
            key={item.id}
            href={`/tin-tuc/${item.slug}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.excerpt}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
};

export default NewsPage;
