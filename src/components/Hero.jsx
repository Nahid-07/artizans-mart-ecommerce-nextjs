'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import HeroImg from '@/assets/Hero.jpg';

const Hero = () => {
  // Animation variants for staggered rendering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative bg-gray-50 overflow-hidden font-sans pt-20 md:pt-28 lg:pt-32 pb-20 lg:pb-40">
      
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-125 h-100 bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Part: Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-xl mx-auto lg:mx-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="bg-blue-50 border border-blue-200 text-blue-600 font-semibold text-sm px-4 py-1.5 rounded-full uppercase tracking-wider">
                Next-Gen Tech
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]"
            >
              Discover the Future of <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Electronics
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Explore our curated collection of the latest gadgets, from powerful laptops to innovative smart devices engineered to elevate your daily life.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/shop"
                className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Shop Collection
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about_us"
                className="w-full sm:w-auto flex items-center justify-center text-gray-700 bg-white border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Secure Checkout
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Fast Delivery
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                24/7 Support
              </div>
            </motion.div>
          </motion.div>

          {/* Right Part: Image */}
          <motion.div 
            className="flex-1 w-full lg:w-auto relative perspective-1000"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Image Wrapper with subtle float animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white p-2"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/20 to-transparent z-10"></div>
                <Image
                  src={HeroImg}
                  alt="A collection of modern electronic gadgets"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Decorative dots pattern behind image */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 text-blue-200">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2"></circle>
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#dots)"></rect>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;