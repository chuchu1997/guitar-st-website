/** @format */

import OrderType, { Billboard, Category } from "@/types/ProjectInterface";

import axios from "axios";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API}orders`;

const onCreateOrderAPI = async (data: OrderType) => {
  try {
    const res = await axios.post(`${URL}`, data);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

const onGetOrderByCustomerID = async (
  customerId: string
): Promise<OrderType[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        customerId: customerId,
      },
    });

    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    throw err;
  }
};

const onCancelOrderWithID = async (orderID: string, customerID: string) => {
  try {
    const res = await axios.patch(`${URL}/${orderID}`, {
      action: "cancelled",
      customerID,
    });
    console.log("RES", res);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};
export { onCreateOrderAPI, onGetOrderByCustomerID, onCancelOrderWithID };
