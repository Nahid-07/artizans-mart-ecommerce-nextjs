'use client'
import { useContext, useState, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"; // Switched to outline for a cleaner modern look
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Added to detect active links
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModal";
import { AuthContext } from "../context_API/authContext";
import { SearchBarDesktop } from "./SearchBarDesktop";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();
  const pathname = usePathname();

  // Add a subtle shadow only when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Track Order', path: '/track_order' },
    { name: 'About Us', path: '/about_us' },
  ];

  return (
    <>
      {/* Glassmorphic Navbar */}
      <nav 
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm py-3" 
            : "bg-white/50 backdrop-blur-md border-b border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Left Part: Logo */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-indigo-600 whitespace-nowrap"
            >
              Artizans' Mart
            </Link>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={openSearchModal}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-[10px] font-bold text-white bg-blue-600 border-2 border-white rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus:outline-none"
              >
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Middle Part: Search Bar (Desktop Only) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBarDesktop />
          </div>

          {/* Right Part: Desktop Menu Items & Actions */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="flex items-center space-x-4 pl-4 ml-2 border-l border-gray-200">
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-[10px] font-bold text-white bg-blue-600 border-2 border-white rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              
              {!user?.email ? (
                <Link
                  href="/login_user"
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Log In
                </Link>
              ) : (
                <button
                  onClick={logOut}
                  className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Animated with Framer Motion) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed top-18 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl z-40"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-2 border-t border-gray-100">
                {!user?.email ? (
                  <Link
                    href="/login_user"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-base font-bold hover:bg-blue-700 transition-colors"
                  >
                    Log In
                  </Link>
                ) : (
                  <button
                    onClick={() => { logOut(); setIsMenuOpen(false); }}
                    className="flex justify-center w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-xl text-base font-bold hover:bg-gray-200 transition-colors"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={searchModalOpen} onClose={closeSearchModal} />
    </>
  );
};

export default Navbar;