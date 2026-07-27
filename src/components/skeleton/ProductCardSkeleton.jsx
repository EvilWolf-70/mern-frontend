import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
      {/* Image */}
      <div className="h-72 w-full bg-gray-200"></div>

      {/* Content */}
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-5"></div>

        <div className="flex justify-between items-center mb-5">
          <div className="h-7 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>

        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;