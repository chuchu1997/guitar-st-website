/** @format */

import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;
const url = `${process.env.NEXT_PUBLIC_API}/banners`;

export const BannerAPI = {
  getAllBannerFromStore: async () => {
    return await api({
      method: "GET",
      url: `${url}`,
      params: {
        storeID: storeID,
      },
    });
  },
};
