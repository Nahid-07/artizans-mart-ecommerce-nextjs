"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const StoryBlock = () => {
  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-50 py-24 md:py-32 overflow-hidden relative font-sans">
      {/* Decorative Background Orb */}
      <div className="absolute top-1/2 left-0 w-125 h-125 bg-indigo-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left Side: The Lifestyle Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 relative perspective-1000"
          >
            <div className="relative h-125 lg:h-162.5 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50 group">
              <Image
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2671&auto=format&fit=crop"
                alt="Person using premium tech"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transform transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Subtle Inner Gradient for Depth */}
              <div className="absolute inset-0 bg-linear-to-tr from-gray-900/20 to-transparent"></div>
            </div>

            {/* Floating Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4"
            >
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-100"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-indigo-100"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  +10k
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Happy Customers
                </p>
                <p className="text-xs text-gray-500">Across the globe</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Editorial Text Block */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm border-b-2 border-blue-200 pb-1">
                Our Philosophy
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6"
            >
              Elevating your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                everyday tech.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-500 leading-relaxed mb-8"
            >
              We believe that the devices you use every day should be more than
              just functional. They should be an extension of your lifestyle,
              crafted with precision and designed to inspire. At Artizans' Mart,
              we curate only the highest quality electronics, blending
              cutting-edge technology with timeless aesthetics.
            </motion.p>

            {/* Feature Bullets */}
            <motion.ul variants={itemVariants} className="space-y-4 mb-10">
              <li className="flex items-center text-gray-700 font-medium">
                <CheckCircleIcon className="w-6 h-6 text-blue-500 mr-3 shrink-0" />
                Curated by industry experts
              </li>
              <li className="flex items-center text-gray-700 font-medium">
                <CheckCircleIcon className="w-6 h-6 text-blue-500 mr-3 shrink-0" />
                Uncompromising build quality
              </li>
              <li className="flex items-center text-gray-700 font-medium">
                <CheckCircleIcon className="w-6 h-6 text-blue-500 mr-3 shrink-0" />
                Sustainable packaging initiatives
              </li>
            </motion.ul>

            <motion.div variants={itemVariants}>
              <Link
                href="/about_us"
                className="inline-flex items-center justify-center bg-gray-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300"
              >
                Read Our Story
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StoryBlock;
