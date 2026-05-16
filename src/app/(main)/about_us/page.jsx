import Link from "next/link"; // Changed to Next.js Link
import {
  SparklesIcon,
  GlobeAltIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

// Converted to a direct default export function
export default function AboutUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Our Story: Crafting a Modern Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Artizans' Mart, we believe in the power of craftsmanship and the
            people behind it. Our journey began with a simple idea: to connect
            talented artisans with customers who value quality, authenticity,
            and unique design.
          </p>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
            <SparklesIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To be the world's most trusted online destination for authentic,
              handcrafted goods.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
            <GlobeAltIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To empower local and independent artisans by providing a global
              platform to share their unique creations.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
            <HeartIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Our Values
            </h3>
            <p className="text-gray-600">
              We value creativity, quality, sustainability, and fair trade
              practices.
            </p>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Example Team Member Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs transition-transform duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca14?q=80&w=2680&auto=format&fit=crop"
                alt="Jane Doe"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">Jane Doe</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
              <p className="text-sm text-gray-600 mt-2">
                With a background in design and a passion for craftsmanship,
                Jane founded Artizans' Mart to build a community-driven
                marketplace.
              </p>
            </div>
            {/* Add more team members here */}
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs transition-transform duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1539571696357-43351fd425d7?q=80&w=2680&auto=format&fit=crop"
                alt="John Smith"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">John Smith</h3>
              <p className="text-sm text-gray-500">Lead Developer</p>
              <p className="text-sm text-gray-600 mt-2">
                John is the technical backbone of our platform, ensuring a
                seamless and secure experience for our users.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-6">
            Explore unique creations from talented artisans around the globe.
          </p>
          <Link
            href="/shop" // Changed 'to' to 'href'
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}