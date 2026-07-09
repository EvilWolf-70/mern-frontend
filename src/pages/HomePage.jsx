import React from "react";
import { useProducts } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
const HomePage = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-5 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest mb-3">New Collection</p>

            <h1 className="text-5xl font-bold leading-tight">
              Upgrade Your Lifestyle With Premium Products
            </h1>

            <p className="mt-6 text-lg text-indigo-100">
              Discover thousands of amazing products at unbeatable prices.
            </p>

            <Link
              to="/products"
              className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 duration-300 inline-block"
            >
              Shop Now
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
              alt="Banner"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">Featured Products</h2>

          <p className="text-gray-500 mt-3">
            Hand-picked products just for you.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300 group"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-72 w-full object-cover group-hover:scale-110 duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center my-5">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{item.price}
                  </span>
                  <p
                    className={`text-sm mt-2 font-medium ${item.stock > 0 ? "text-green-600" : "text-red-500"}`}
                  >
                    {item.stock > 0
                      ? `In Stock: ${item.stock}`
                      : "Out of Stock"}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  disabled={item.stock === 0}
                  className={`px-5 py-2 rounded-lg text-white w-full ${
                    item.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
