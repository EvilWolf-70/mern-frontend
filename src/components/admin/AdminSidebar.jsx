
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  Store,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminSidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBag size={20} />,
    },
  ];
  const {  logout } = useAuth();


  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="border-b border-slate-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <Store className="text-indigo-400" size={32} />

          <div>
            <h1 className="text-2xl font-bold">
              ShopEasy
            </h1>

            <p className="text-sm text-slate-400">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <p className="text-xs uppercase text-slate-500 mb-4 px-3 tracking-wider">
          Main Menu
        </p>

        <div className="space-y-2">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {menu.icon}

              <span className="font-medium">
                {menu.name}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <button
        onClick={logout}
         className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
