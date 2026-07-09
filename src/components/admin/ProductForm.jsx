
import React from "react";

const ProductForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  isEditing = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Electronics, Shoes..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Available stock"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div>
            <img
              src={formData.image}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl border"
            />
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:bg-indigo-400"
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Product"
              : "Add Product"}
          </button>

          <button
            type="reset"
            className="px-6 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

