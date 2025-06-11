/** @format */

import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

const url = `${process.env.NEXT_PUBLIC_API}/categories`;
export const CategoryAPI = {
  getCategoryWithSlug: async (slug: string) => {
    return await api({
      method: "GET",
      url: `${url}/${slug}`,
      params: {
        storeID,
      },
    });
  },

  getAllCategoriesOfStore: async ({
    justGetParent,
  }: {
    justGetParent: boolean;
  }) => {
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
