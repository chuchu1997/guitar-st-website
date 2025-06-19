/** @format */

import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

const url = `${process.env.NEXT_PUBLIC_API}/products`;

export const ProductAPI = {
  getProductBySlug: async (slug: string) => {
    return await api({
      method: "GET",
      url: `${url}/${slug}`,
    });
  },
  getFeatureProducts: async ({ currentPage = 1, limit = 6 }) => {
    return await api({
      method: "GET",
      url: `${url}`,
      params: {
        currentPage,
        limit,
        storeID,
        isFeature: true,
      },
    });
  },
};
