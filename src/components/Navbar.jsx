'use client'
import { useContext, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Link from 'next/link';
import SearchModal from "./SearchModal";
import { AuthContext } from "../context_API/authContext";
import { SearchBarDesktop } from "./SearchBarDesktop";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const {cartItems} = useCart()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);
  const handleLogOut = () => {
    logOut();
  };
  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
        <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
          {/* Left Part: Logo */}
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-gray-800 whitespace-nowrap"
            >
              Artizans' Mart
            </Link>
            {/* Mobile menu and search/cart buttons */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={openSearchModal}
                className="text-gray-800 hover:text-blue-500 transition-colors duration-300"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <Link
                href="/cart"
                className="relative text-gray-800 hover:text-blue-500 transition-colors duration-300"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Middle Part: Search Bar (Desktop Only) */}
          <div className="hidden md:flex grow items-center md:justify-center">
            <SearchBarDesktop />
          </div>

          {/* Right Part: Menu Items & Icons */}
          <div
            className={`md:flex md:items-center md:space-x-6 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 px-4 py-8 md:py-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about_us"
                  className="block py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              {/* Login/Logout for mobile menu */}
              <li className="md:hidden mt-4">
                {!user?.email ? (
                  <Link
                    href="/login_user"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full w-full block text-center hover:bg-blue-600 transition-colors duration-300"
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleLogOut}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full w-full block text-center hover:bg-blue-600 transition-colors duration-300"
                  >
                    Log out
                  </button>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/cart"
              className="relative text-gray-800 hover:text-blue-500 transition-colors duration-300"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {!user?.email ? (
              <Link
                href="/login_user"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogOut}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </>
  );
};

export default Navbar;