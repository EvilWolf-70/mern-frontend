import React from "react";

const ProductCard = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300 group">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-72 w-full object-cover group-hover:scale-110 duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold line-clamp-1">{item.name}</h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center my-5">
          <span className="text-2xl font-bold text-indigo-600">
            ₹{item.price}
          </span>

          <p
            className={`text-sm font-medium ${
              item.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {item.stock > 0
              ? `In Stock: ${item.stock}`
              : "Out of Stock"}
          </p>
        </div>

        <button
          onClick={() => addToCart(item)}
          disabled={item.stock === 0}
          className={`w-full px-5 py-2 rounded-lg text-white transition ${
            item.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;