"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// Note: Ensure this path is correct for your project structure
import newsletterImg from "../assets/newsletter.png";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    setIsSubmitted(true);
    setEmail("");
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 py-20 lg:py-32 font-sans overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative bg-gray-950 rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          {/* Abstract Glowing Backgrounds */}
          <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 lg:p-16 gap-12 lg:gap-8">
            {/* Left Side: Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6 w-fit"
              >
                <SparklesIcon className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">
                  Stay Updated
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight"
              >
                Get the latest tech <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                  delivered to you.
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-400 mb-8 max-w-md leading-relaxed"
              >
                Join our community of tech enthusiasts. Get exclusive offers,
                early access to new releases, and expert insights right in your
                inbox.
              </motion.p>

              {/* Subscription Form / Success State */}
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-md"
              >
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubscribe}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <div className="relative grow">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full pl-11 pr-4 py-4 bg-white/5 border backdrop-blur-sm rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            error ? "border-red-500/50" : "border-white/10"
                          }`}
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Subscribe
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center space-x-4 backdrop-blur-sm"
                    >
                      <div className="bg-green-500 rounded-full p-2">
                        <CheckCircleIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">
                          You're on the list!
                        </h4>
                        <p className="text-green-200 text-sm">
                          Keep an eye on your inbox for updates.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-6 left-2 text-red-400 text-sm font-medium"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Right Side: Image with Float Animation */}
            <motion.div
              variants={itemVariants}
              className="w-full md:w-1/2 flex justify-center md:justify-end relative perspective-1000 mt-8 md:mt-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                animate={{
                  y: isHovered ? -10 : [0, -15, 0],
                  rotate: isHovered ? 2 : [0, 1, 0],
                }}
                transition={{
                  y: {
                    duration: isHovered ? 0.3 : 6,
                    repeat: isHovered ? 0 : Infinity,
                    ease: "easeInOut",
                  },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative w-full max-w-sm aspect-square md:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Fallback to conditional rendering just in case the imported image fails */}
                <Image
                  src={newsletterImg}
                  alt="Newsletter Subscription"
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-transparent mix-blend-overlay"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;
