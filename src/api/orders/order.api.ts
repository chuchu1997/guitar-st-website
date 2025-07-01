/** @format */

import { CreateOrderInterface } from "@/types/order";
import api from "../interceptor";
const storeID = process.env.STORE_ID || 1;

const url = `/orders`;

export const OrderAPI = {
  createOrder: async (data: CreateOrderInterface) => {
    return await api({
      method: "POST",
      url: `${url}`,
      data: {
        ...data,
        storeId: storeID,
      },
    });
  },

  getOrdersWithUserID: async (userID: number) => {
    return await api({
      method: "GET",
      url: url,
      params: {
        userId: userID,
      },
    });
  },
};
