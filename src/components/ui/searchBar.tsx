/** @format */

"use client";

import { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { Calendar, Search } from "lucide-react";
import { Product } from "@/types/ProjectInterface";
import { getSearchs } from "@/actions/get-searchs";
import AlertSearch from "./alert-search";

export default function SearchWithSuggestions() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false); // For loading state

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    try {
      const data = await getSearchs(query);
      setProducts(data || []); // Set products from the API
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (query.length > 2) {
      fetchSearchResults(query); // Fetch results when the query length is more than 2
    } else {
      setProducts([]);
    }
  }, [query]);

  return (
    <div className="relative  min-[200px]  ">
      <Command className="rounded-lg border shadow-md w-full">
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />

        {loading && query && (
          <div className="absolute top-full mt-[5px] left-0 w-full bg-white p-2 text-center z-50">
            Loading...
          </div>
        )}

        {query && !loading && products.length > 0 && (
          <CommandList className="absolute top-full mt-[5px] left-0 w-full bg-white border rounded-md shadow-lg max-h-[200px] p-4 overflow-y-auto z-50">
            {/* Products */}
            <p className="text-sm font-semibold py-2">Search Results :</p>
            {products.map((product) => (
              <AlertSearch
                onViewProduct={() => {
                  setQuery("");
                }}
                imageUrl={product.images[0].url}
                key={product.id}
                slug={product.slug}
                shortDescription={product.shortDescription}
                name={product.name}
              />
              //   <div key={product.id}>{product.name}</div>
            ))}

            {/* No Results */}
            {products.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
