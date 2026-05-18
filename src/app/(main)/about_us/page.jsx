"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  GlobeAltIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function AboutUsPage() {
  // Framer Motion Animation Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 overflow-hidden font-sans relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-blue-100/40 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute top-1/2 left-0 w-125 h-125 bg-indigo-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Editorial Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24 lg:mb-32"
        >
          <div className="lg:w-1/2">
            <motion.div variants={fadeUpVariant} className="inline-block mb-4">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm border-b-2 border-blue-600 pb-1">
                Our Story
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUpVariant}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight"
            >
              Crafting a <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Modern Marketplace
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariant}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl"
            >
              At Artizans' Mart, we believe in the power of craftsmanship and
              the people behind it. Our journey began with a simple idea: to
              connect talented artisans with customers who value quality,
              authenticity, and unique design.
            </motion.p>
          </div>

          <motion.div variants={fadeUpVariant} className="lg:w-1/2 relative">
            <div className="relative h-100 sm:h-125 w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                alt="Modern Workspace"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Vision, Mission, Values Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 lg:mb-32"
        >
          {/* Card 1 */}
          <motion.div
            variants={fadeUpVariant}
            className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-500">
              <SparklesIcon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To be the world's most trusted online destination for authentic,
              high-quality, and handcrafted goods.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeUpVariant}
            className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-500">
              <GlobeAltIcon className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To empower local and independent artisans by providing a powerful
              global platform to share their unique creations.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeUpVariant}
            className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-500">
              <HeartIcon className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Values
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We value relentless creativity, uncompromised quality,
              environmental sustainability, and fair trade practices.
            </p>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-24 lg:mb-32"
        >
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeUpVariant}
              className="text-4xl font-extrabold text-gray-900 tracking-tight"
            >
              Meet the Leadership
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              className="mt-4 text-lg text-gray-500"
            >
              The people dedicated to pushing our vision forward.
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {/* Team Member 1 */}
            <motion.div
              variants={fadeUpVariant}
              className="group w-full max-w-sm"
            >
              <div className="relative h-80 w-full rounded-3xl overflow-hidden mb-6 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca14?q=80&w=2680&auto=format&fit=crop"
                  alt="Jane Doe"
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">Jane Doe</h3>
                <p className="text-blue-600 font-semibold mb-3">
                  Founder & CEO
                </p>
                <p className="text-gray-600">
                  With a background in design and a passion for craftsmanship,
                  Jane founded Artizans' Mart to build a community-driven
                  marketplace.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              variants={fadeUpVariant}
              className="group w-full max-w-sm"
            >
              <div className="relative h-80 w-full rounded-3xl overflow-hidden mb-6 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-43351fd425d7?q=80&w=2680&auto=format&fit=crop"
                  alt="John Smith"
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">John Smith</h3>
                <p className="text-indigo-600 font-semibold mb-3">
                  Lead Developer
                </p>
                <p className="text-gray-600">
                  John is the technical backbone of our platform, ensuring a
                  seamless and secure experience for our users across the globe.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Modern Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700"></div>

          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative p-12 sm:p-16 md:p-24 text-center z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Discover Something Unique?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Join our community and explore handcrafted creations from talented
              artisans around the globe.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300"
            >
              Start Shopping <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
