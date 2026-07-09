import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, CircleUser } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">ShopEasy</h1>

        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
            {user?.isAdmin && (
    <Link to="/admin">Admin</Link>
  )}
        </div>

        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative">
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <CircleUser size={32} className="text-indigo-600" />

              <span className="font-medium">{user.name}</span>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
