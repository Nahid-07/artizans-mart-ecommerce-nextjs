"use client";

import React from "react";
import { motion } from "framer-motion";
import { renderStars } from "./RenderStars";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const testimonialsData = [
  {
    id: 1,
    quote:
      "The headphones are absolutely phenomenal! The sound quality is top-notch, and the noise cancellation is a game-changer. I highly recommend Artizans' Mart!",
    author: "Jane Doe",
    initials: "JD",
    product: "Wireless Bluetooth Headphones",
    rating: 5,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    quote:
      "I was skeptical at first, but the delivery was incredibly fast and the smartwatch exceeded my expectations. The team was very helpful with my queries.",
    author: "John Smith",
    initials: "JS",
    product: "Smartwatch with Fitness Tracker",
    rating: 4.5,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: 3,
    quote:
      "Fantastic product and a smooth shopping experience. The gaming monitor is perfect for my setup. Will definitely be a returning customer.",
    author: "Mike Johnson",
    initials: "MJ",
    product: "4K Ultra HD Gaming Monitor",
    rating: 5,
    gradient: "from-orange-400 to-pink-500",
  },
];

const Testimonial = () => {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  return (
    <div className="bg-white py-20 lg:py-32 font-sans relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-4xl h-100 bg-blue-50/50 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
              Real Reviews
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6"
          >
            Loved by{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Tech Enthusiasts
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed"
          >
            Don't just take our word for it. Hear what our community has to say
            about their upgraded setups and everyday tech.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {testimonialsData.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="relative bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group z-10"
            >
              {/* Giant Watermark Quote Icon */}
              <div className="absolute top-6 right-8 text-gray-50 opacity-50 group-hover:text-blue-50 group-hover:scale-110 transition-all duration-500 -z-10">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex mb-6">{renderStars(testimonial.rating)}</div>

              {/* Quote Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author Info Block */}
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center">
                {/* Modern Avatar */}
                <div
                  className={`w-12 h-12 rounded-full bg-linear-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-inner mr-4 shrink-0`}
                >
                  {testimonial.initials}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 flex items-center">
                    {testimonial.author}
                    <CheckBadgeIcon
                      className="w-5 h-5 text-blue-500 ml-1"
                      title="Verified Buyer"
                    />
                  </h4>
                  <p
                    className="text-xs text-gray-500 mt-1 font-medium line-clamp-1"
                    title={testimonial.product}
                  >
                    Bought:{" "}
                    <span className="text-gray-700">{testimonial.product}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
