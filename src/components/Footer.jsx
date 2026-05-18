"use client";

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 font-sans relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-linear-to-r from-transparent via-blue-900 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Top Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-12 mb-12 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Join our newsletter
            </h2>
            <p className="text-gray-400">
              Get the latest updates on new products and upcoming sales.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md">
            <form
              className="flex relative"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-full font-bold transition-colors flex items-center justify-center"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Section 1: Brand Info */}
          <div className="flex flex-col space-y-6 lg:pr-8">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                Artizans' Mart
              </h3>
            </Link>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for the latest and greatest in electronic
              gadgets. We are committed to providing you with high-quality
              products and an exceptional shopping experience.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/20"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/20"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-700/20"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-all duration-300 inline-flex items-center group"
                >
                  <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-blue-400 transition-all duration-300 inline-flex items-center group"
                >
                  <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />{" "}
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/track_order"
                  className="hover:text-blue-400 transition-all duration-300 inline-flex items-center group"
                >
                  <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />{" "}
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/about_us"
                  className="hover:text-blue-400 transition-all duration-300 inline-flex items-center group"
                >
                  <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />{" "}
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">
              Customer Service
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                <a
                  href="mailto:support@artizansmart.com"
                  className="hover:text-white transition-colors"
                >
                  support@artizansmart.com
                </a>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                <a
                  href="tel:+880123456789"
                  className="hover:text-white transition-colors"
                >
                  +880 123 456 789
                </a>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                <span>
                  123 Tech Avenue,
                  <br />
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
          <p>
            &copy; {new Date().getFullYear()} Artizans' Mart. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <span className="text-gray-500">Secure payments via</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-gray-800 rounded"></div>
              <div className="w-8 h-5 bg-gray-800 rounded"></div>
              <div className="w-8 h-5 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
