const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-200"></div>

      {/* Content Placeholder */}
      <div className="p-5 flex flex-col space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        {/* Description */}
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>

        {/* Rating & Price */}
        <div className="flex justify-between items-center mt-4 pt-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-lg mt-6"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;