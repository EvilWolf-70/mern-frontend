
import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ProductTable = ({
  products = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Product List
        </h2>

        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-72 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold text-indigo-600">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(product)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(product._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
