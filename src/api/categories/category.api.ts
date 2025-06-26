/** @format */

import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

const url = `${process.env.NEXT_PUBLIC_API}/categories`;
console.log("PULIC API URL", url);
export const CategoryAPI = {
  getCategoryWithSlug: async (slug: string, currentPage: number) => {
    return await api({
      method: "GET",
      url: `${url}/${slug}`,
      params: {
        storeID,
        currentPage,
      },
    });
  },

  getAllCategoriesOfStore: async ({
    justGetParent,
  }: {
    justGetParent: boolean;
  }) => {
    console.log("URL GET CATEGORIES", url);
    console.log("STORE BUILD", storeID);
    return await api({
      method: "GET",
      url: url,
      params: {
        justGetParent,
        storeID,

        //     justGetParent,
        //   process.env.STORE_ID
      },
    });
  },
};
