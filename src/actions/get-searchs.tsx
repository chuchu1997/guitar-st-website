/** @format */

import { Product } from "@/types/ProjectInterface";
import qs from "query-string";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API}searchs`;

const getSearchs = async (query: string): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      q: query,
    },
  });


  const result = await fetch(url);

  return result.json();


  

  return result.json();
};

export { getSearchs };
