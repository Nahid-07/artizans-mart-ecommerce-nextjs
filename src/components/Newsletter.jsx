'use client'
import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import newsletter from "../assets/newsletter.png";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate a successful subscription
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 gap-4">
          {/* Left Side: Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Join Our Newsletter
            </h2>
            <p className="text-gray-400 max-w-md">
              Get the latest product updates, special offers, and exclusive
              content delivered right to your inbox.
            </p>

            {/* Subscription Form */}
            {!isSubmitted ? (
              <form
                onSubmit={handleSubscribe}
                className="mt-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative grow">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="mt-4 text-green-400 font-semibold">
                Thank you for subscribing!
              </div>
            )}

            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          </div>

          {/* Right Side: Image */}
          <div className="hidden md:block w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src={newsletter}
              alt="Newsletter Subscription"
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
