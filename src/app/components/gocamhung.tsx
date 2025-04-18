/** @format */

import { getArticle } from "@/actions/get-article";
import ArticleList from "@/components/article/ArticleItem";

const GocCamHungView = async () => {
  const articles = await getArticle();

  return (
    <div className="container mx-auto">
      <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold italic text-[#7c4d26] dark:text-[#f5e6d6] tracking-tight leading-tight mt-10 mb-8 drop-shadow-sm">
        Góc cảm hứng
      </h3>
      <ArticleList articles={articles}></ArticleList>
    </div>
  );
};
export default GocCamHungView;
