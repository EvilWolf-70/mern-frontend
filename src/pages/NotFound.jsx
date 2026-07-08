import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-6">
      <div className="max-w-lg w-full text-center bg-white shadow-2xl rounded-3xl p-10">
        <h1 className="text-8xl font-extrabold text-indigo-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          Oops! The page you're looking for doesn't exist or may have been
          moved. Please check the URL or return to the home page.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <Home size={20} />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="mt-10 text-7xl">😕</div>
      </div>
    </div>
  );
};

export default NotFound;