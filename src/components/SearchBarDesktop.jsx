"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // ADDED: Image Component
import useAxiosPublic from "../hooks/useAxiosPublic";

export const SearchBarDesktop = () => {
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setLoading(true);
        try {
          const response = await axiosPublic.get(`/search?q=${searchQuery}`);

          let searchData = response.data;
          if (searchData && searchData.data) searchData = searchData.data;
          if (searchData && searchData.products)
            searchData = searchData.products;
          if (searchData && searchData.result) searchData = searchData.result;

          if (!Array.isArray(searchData)) {
            searchData = [];
          }

          setResults(searchData);
          setShowResults(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery, axiosPublic]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col w-full relative" ref={searchContainerRef}>
      <div className="hidden md:flex grow items-center md:justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.length > 2) {
                setShowResults(true);
              }
            }}
            value={searchQuery}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-full">
              {loading ? (
                <p className="p-4 text-center text-gray-500">Searching...</p>
              ) : results.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {results.map((item) => (
                    <li
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      {/* UPDATED: Flex container for side-by-side layout */}
                      <Link
                        href={`/productDetails/${item._id}`}
                        className="flex items-center p-3 gap-4 w-full"
                        onClick={() => {
                          setShowResults(false);
                          setSearchQuery("");
                        }}
                      >
                        {/* Image Box */}
                        <div className="relative w-12 h-12 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                          <Image
                            src={item.images?.[0] || "/placeholder.png"}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        {/* Text Container */}
                        <div className="flex flex-col flex-grow">
                          <span className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {item.name}
                          </span>
                          <span className="text-xs font-medium text-blue-600">
                            ৳{item.offer_price}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                searchQuery.length > 2 && (
                  <p className="p-4 text-center text-gray-500">
                    No results found.
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
