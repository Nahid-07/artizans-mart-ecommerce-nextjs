'use client'; // Required for useState and usePathname

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Next.js active route hook
import { FaBars, FaTimes } from "react-icons/fa";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current URL

  // Automatically close sidebar on mobile when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="flex z-50 shrink-0">
      {/* Hamburger Button (Mobile Only) */}
      <button
        className="md:hidden p-4 text-2xl fixed top-0 left-0 z-50 bg-white w-full shadow-sm flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-bold">Admin Panel</span>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay (when sidebar is open on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-gray-50 shadow-lg transform 
          ${isOpen ? "translate-x-0 pt-16" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out 
          md:translate-x-0 md:static md:w-64 z-50 md:pt-0`}
      >
        <Link href="/">
          <h1 className="text-2xl font-bold text-center py-6 border-b border-gray-300 hover:text-blue-600 transition-colors">
            Artizans' Mart
          </h1>
        </Link>

        <ul className="mt-6 space-y-2 px-4">
          <li>
            <Link
              href="/dashboard"
              className={`block w-full py-3 px-4 rounded-md text-center transition ${
                pathname === "/dashboard" 
                  ? "bg-blue-100 text-blue-700 font-bold border-l-4 border-blue-600" 
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              Overview
            </Link>
          </li>

          <li>
            {/* Note: Updated to match your Next.js folder names (underscores instead of dashes) */}
            <Link
              href="/dashboard/add_product"
              className={`block w-full py-3 px-4 rounded-md text-center transition ${
                pathname === "/dashboard/add_product" 
                  ? "bg-blue-100 text-blue-700 font-bold border-l-4 border-blue-600" 
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              Add Products
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/all_product"
              className={`block w-full py-3 px-4 rounded-md text-center transition ${
                pathname === "/dashboard/all_product" 
                  ? "bg-blue-100 text-blue-700 font-bold border-l-4 border-blue-600" 
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              All Products
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/orders"
              className={`block w-full py-3 px-4 rounded-md text-center transition ${
                pathname === "/dashboard/orders" 
                  ? "bg-blue-100 text-blue-700 font-bold border-l-4 border-blue-600" 
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};