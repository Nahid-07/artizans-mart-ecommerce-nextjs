"use client";

import { motion } from "framer-motion";
import {
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const TrustBar = () => {
  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const trustItems = [
    {
      icon: <TruckIcon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-3" />,
      title: "Fast Delivery",
      subtitle: "Trackable Nationwide",
    },
    {
      icon: (
        <ShieldCheckIcon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-3" />
      ),
      title: "Secure Checkout",
      subtitle: "Encrypted Payments",
    },
    {
      icon: (
        <ArrowPathIcon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-3" />
      ),
      title: "Easy Returns",
      subtitle: "Hassle-Free Process",
    },
    {
      icon: (
        <ChatBubbleLeftRightIcon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-3" />
      ),
      title: "24/7 Support",
      subtitle: "Always Here to Help",
    },
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-10 relative z-20 font-sans shadow-[0_4px_20px_-15px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 lg:divide-x lg:divide-gray-100"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center px-4 group cursor-default"
            >
              <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                {item.icon}
              </div>
              <h3 className="text-sm lg:text-base font-extrabold text-gray-900 tracking-wide uppercase mb-1">
                {item.title}
              </h3>
              <p className="text-xs lg:text-sm text-gray-500 font-medium">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBar;
