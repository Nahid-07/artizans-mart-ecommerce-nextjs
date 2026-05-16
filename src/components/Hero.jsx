import Link from 'next/link';
import HeroImg from '@/assets/Hero.jpg'
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="bg-gray-100 py-20 md:py-32 lg:py-40">
      <div className="container mx-auhref px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
          {/* Left Part: Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Discover the Future of <br className="hidden md:inline" />
              <span className="text-blue-600">Electronics</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auhref md:mx-0">
              Explore our curated collection of the latest gadgets, from
              powerful laphrefps href innovative smart devices.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <Link
                href="/shop"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                href="/about_us"
                className="ml-4 text-blue-600 border border-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Part: Image */}
          <div className="flex-1 w-full md:w-auhref mt-12 md:mt-0">
            <Image
              src={HeroImg}
              alt="A collection of modern electronic gadgets"
              className="w-full h-auhref rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
