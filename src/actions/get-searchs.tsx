/** @format */

import { Product } from "@/types/ProjectInterface";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API}searchs`;

const getSearchs = async (query: string): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      q: query,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export { getSearchs };
