/** @format */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

// Debounce helper function
const debounce = (fn: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export default function SearchWithSuggestions() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle the effect to blur input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  // Fetch search results function
  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query.trim()) return; // Prevent empty queries

    setLoading(true);
    try {
      const data = await getSearchs(query);
      setProducts(data || []); // Set products from the API
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced version of fetchSearchResults
  const debouncedFetchSearchResults = useCallback(
    debounce(fetchSearchResults, 500), // 500ms delay
    []
  );

  // Effect to handle query change
  useEffect(() => {
    if (query.length > 2) {
      debouncedFetchSearchResults(query); // Fetch results when the query length is more than 2
    } else {
      setProducts([]); // Clear products if query length is less than 3
    }
  }, [query, debouncedFetchSearchResults]);

  return (
    <div className="relative w-full md:w-[400px]">
      <Command className="rounded-lg shadow-md w-full bg-transparent text-white">
        <CommandInput
          autoFocus={false}
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery} // Update query on change
        />

        {loading && query && (
          <div className="absolute top-full mt-[5px] left-0 w-full bg-white rounded-md p-2 text-center z-50">
            Loading...
          </div>
        )}

        {query && !loading && products.length > 0 && (
          <CommandList className="absolute top-full mt-[5px] left-0 w-full border rounded-md shadow-lg max-h-[200px] p-4 overflow-y-auto z-50">
            {/* Products */}
            <p className="text-sm font-semibold">Search Results:</p>
            {products.map((product) => (
              <div key={product.id} className="my-2">
                <AlertSearch
                  onViewProduct={() => {
                    setQuery(""); // Reset the query on view
                  }}
                  imageUrl={product.images[0].url}
                  slug={product.slug}
                  shortDescription={product.shortDescription}
                  name={product.name}
                />
              </div>
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
