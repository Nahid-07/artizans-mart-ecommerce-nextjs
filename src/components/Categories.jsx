'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

import Headphone from "../assets/earBuds.png";
import Powerbank from "../assets/powerbank.jpg";
import smartwatch from "../assets/smartwatch.jpg";

const categoriesData = [
  {
    name: "Headphones",
    image: Headphone,
    category: "Earbuds",
  },
  {
    name: "Powerbank",
    image: Powerbank,
    category: "Powerbank",
  },
  {
    name: "Smartwatches",
    image: smartwatch,
    category: "Smartwatch",
  },
  {
    name: "Gaming Accessories",
    image: "https://images.unsplash.com/photo-1596538421869-d4c5c70a0491?q=80&w=2940&auto=format&fit=crop", 
    category: "Gaming",
  },
];

const Categories = () => {
  // Staggered animation for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-gray-50 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
            Collections
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Shop by Category
          </h3>
        </div>

        {/* Animated Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categoriesData.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={`/category/${category.category}`}
                className="group relative block h-72 sm:h-80 lg:h-96 w-full overflow-hidden rounded-3xl shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-white"
              >
                {/* Background Image with slow hover zoom */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content Container */}
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-wide mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {category.name}
                    </h3>
                    <p className="text-blue-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Explore Collection
                    </p>
                  </div>
                  
                  {/* Glassmorphic Arrow Button */}
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-3 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 border border-white/30">
                    <ArrowUpRightIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;