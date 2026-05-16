import Link from 'next/link';
import Image from 'next/image'; // ADDED: Next.js Image component
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
    image: "https://images.unsplash.com/photo-1596538421869-d4c5c70a0491?q=80&w=2940&auto=format&fit=crop", // This is a remote string URL
    category: "Gaming",
  },
];

const Categories = () => {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.category}`}
              className="block group"
            >
              {/* Added explicitly defined height/relative wrapper for Next.js Image fill */}
              <div className="relative h-48 sm:h-64 overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-50">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;