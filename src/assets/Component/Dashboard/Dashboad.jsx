import React from "react";
import { NavLink, Outlet, Link, useOutlet } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiBox,
  FiUsers,
  FiShoppingBag,
} from "react-icons/fi";

const links = [
  { label: "Overview", to: "/dashboard", icon: <FiHome /> },
  { label: "Add Stamp", to: "/dashboard/add-product", icon: <FiPlusCircle /> },
  { label: "All Stamps", to: "/dashboard/all-product", icon: <FiBox /> },
  { label: "Users", to: "/dashboard/users", icon: <FiUsers /> },
  { label: "Orders", to: "/dashboard/orders", icon: <FiShoppingBag /> },
  // { label: "My Orders", to: "/dashboard/my-orders", icon: <FiShoppingBag /> },
];

const Dashboard = () => {
  const outlet = useOutlet();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="md:w-64 w-full bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              SC
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              Stamp Collectors Corner
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition",
                  isActive ? "bg-blue-50 text-blue-600 font-semibold" : "",
                ].join(" ")
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm">{link.label}</span>
            </NavLink>
          ))}

          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center gap-3 p-3 mt-4 rounded text-white bg-blue-500 hover:bg-blue-600 transition text-sm"
          >
            <FiHome />
            <span>Home</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="text-center py-4 border-t text-xs text-gray-400">
          © {new Date().getFullYear()} Stamp Collectors Corner
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Dashboard Overview Cards */}
        {!outlet && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-xl transition">
              <span className="text-gray-400 text-sm">Total Stamps</span>
              <h2 className="text-2xl font-bold text-gray-800">120</h2>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-xl transition">
              <span className="text-gray-400 text-sm">Total Users</span>
              <h2 className="text-2xl font-bold text-gray-800">35</h2>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-xl transition">
              <span className="text-gray-400 text-sm">Orders</span>
              <h2 className="text-2xl font-bold text-gray-800">58</h2>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-xl transition">
              <span className="text-gray-400 text-sm">Revenue</span>
              <h2 className="text-2xl font-bold text-gray-800">$12,450</h2>
            </div>
          </div>
        )}

        {/* Outlet renders child routes */}
        <div className="bg-white rounded-xl shadow p-6">{outlet}</div>
      </main>
    </div>
  );
};

export default Dashboard;
