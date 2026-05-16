import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1: Brand Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white tracking-wide">
              Artizans' Mart
            </h3>
            <p className="text-sm">
              Your one-stop shop for the latest and greatest in electronic gadgets. We are committed to providing you with high-quality products and an exceptional shopping experience.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaFacebookF size={20} />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/about_us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Section 3: Customer Service */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <span>support@artizansmart.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span>+880 123 456 789</span>
              </li>
              <li className="mt-4">
                <p>123 Tech Avenue, Dhaka, Bangladesh</p>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Artizans' Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;