"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // ADDED: Image Component
import useAxiosPublic from "@/hooks/useAxiosPublic";

const SearchModal = ({ isOpen, onClose }) => {
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setResults([]);
      setLoading(false);
      return;
    }
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
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery, isOpen, axiosPublic]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-gray-900/90 flex justify-center items-start pt-20 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="relative grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              autoFocus
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Searching...</p>
          ) : results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((item) => (
                <li
                  key={item._id}
                  className="rounded-md hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  {/* UPDATED: Flex container for side-by-side layout */}
                  <Link
                    href={`/productDetails/${item._id}`}
                    className="flex items-center p-3 gap-4 w-full"
                    onClick={onClose}
                  >
                    {/* Image Box */}
                    <div className="relative w-12 h-12 shrink-0 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                      <Image
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    {/* Text Container */}
                    <div className="flex flex-col grow">
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
          ) : searchQuery.length > 2 ? (
            <p className="text-center text-gray-500 py-4">No results found.</p>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Start typing to search for products.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
