import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHome,
  FiInfo,
  FiGrid,
  FiLogIn,
  FiLogOut,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import CartSidebar from "./CartSidebar";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, refetch, isLoading] = useCart();

  const { admin } = useAdmin();
  console.log(admin);
  function logOut() {
    handleLogout()
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Log Out Successful",
          icon: "success",
        });
      })
      .catch(() =>
        Swal.fire({
          title: "Something Went Wrong",
          icon: "error",
        })
      );
  }

  const NavLinks = ({ onClick }) => (
    <div className="flex flex-col lg:flex-row gap-6 text-sm">
      <Link
        onClick={onClick}
        to="/"
        className="flex items-center gap-2 text-white/90 hover:text-white"
      >
        <FiHome /> Home
      </Link>
      <Link
        onClick={onClick}
        to="/collection"
        className="flex items-center gap-2 text-white/90 hover:text-white"
      >
        <FiGrid /> Collection
      </Link>
      <Link
        onClick={onClick}
        to="/about"
        className="flex items-center gap-2 text-white/90 hover:text-white"
      >
        <FiInfo /> About Us
      </Link>
      {admin && (
        <Link
          onClick={onClick}
          to="/dashboard"
          className="flex items-center gap-2 text-white/90 hover:text-white"
        >
          <FiUser /> Dashboard
        </Link>
      )}
    </div>
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* ================= TOP NAV ================= */}
      <div className="bg-[#0E4588] text-white">
        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <div className="max-w-7xl mx-auto px-4 py-3 md:py-2 flex items-center justify-between">
          {/* ---------------- MOBILE ONLY ---------------- */}
          <div className="flex items-center justify-between w-full lg:hidden">
            {/* Left: Text/Logo */}
            <Link to="/" className="text-md font-semibold text-white">
              Stamp Collectors Corner
            </Link>

            {/* Right: Cart + Menu */}
            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center justify-center"
              >
                <FiShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-[10px] text-white flex items-center justify-center">
                  {cart.length > 9 ? "9+" : cart.length}
                </span>
              </button>

              {/* Menu Icon */}
              <button onClick={() => setOpen(true)} className="text-2xl">
                <FiMenu />
              </button>
            </div>
          </div>

          {/* ---------------- DESKTOP ONLY ---------------- */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Left */}
            <div className="flex items-center gap-3">
              {user ? (
                <button
                  onClick={() => logOut()}
                  className="hidden lg:flex items-center gap-2 text-sm bg-rose-500 text-white px-4 py-1.5 rounded font-medium hover:bg-[#FFB300] transition"
                >
                  <FiLogOut /> Sign Out
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="hidden lg:flex items-center gap-2 text-sm bg-[#ffbd07] text-slate-900 px-4 py-1.5 rounded font-medium hover:bg-[#FFB300] transition"
                >
                  <FiLogIn /> Sign In
                </Link>
              )}
            </div>

            {/* Middle */}
            <p className="hidden lg:block text-sm text-white/80">
              Trusted UK marketplace for stamp collectors worldwide
            </p>

            {/* Right */}
            <div className="hidden lg:flex gap-6 items-center">
              <NavLinks />
              <button
                type="button"
                aria-label="Cart"
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-full shadow-sm hover:text-yellow-300 hover:border-slate-300 transition-all duration-200"
              >
                <FiShoppingCart size={20} />
                <span className="absolute top-1 right-1 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-[10px] leading-[18px] text-white font-semibold flex items-center justify-center shadow-sm">
                  {cart.length > 9 ? "9+" : cart.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <div className="bg-[#1B64B3] text-white">
        <div className="max-w-7xl mx-auto px-4 md:py-3 flex items-center justify-between">
          {/* Left */}
          <Link
            to="/"
            className="text-2xl text-white font-semibold hidden md:flex"
          >
            Stamp Collectors Corner
          </Link>

          {/* Right */}
          <div className="hidden md:flex items-center px-1">
            {/* Search Box */}
            <div
              onClick={() => navigate("/collection")}
              className="flex items-center bg-white px-3 py-2 cursor-pointer w-64"
            >
              <FiSearch className="text-[#1B64B3] mr-2" />
              <input
                readOnly
                placeholder="Search stamps..."
                className="w-full text-sm outline-none text-gray-700 cursor-pointer bg-white"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={() => navigate("/collection")}
              className="ml-1 flex items-center justify-center bg-[#ffbd07] text-slate-900 px-4 py-2.5 font-medium hover:bg-[#FFB300] transition"
            >
              <FiSearch />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed left-0 top-0 h-full w-[80%] max-w-sm bg-[#0E4588] z-50 p-5 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg text-white font-semibold">
                  Stamp Collectors Corner
                </span>
                <button onClick={() => setOpen(false)}>
                  <FiX className="text-2xl text-white" />
                </button>
              </div>

              {/* Links */}
              <NavLinks onClick={() => setOpen(false)} />

              {/* Auth button */}
              <div className="mt-auto pt-6 border-t border-white/20">
                {user ? (
                  <button
                    onClick={() => {
                      logOut();
                      setOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#1B64B3] text-white py-2 rounded hover:bg-[#FFB300]"
                  >
                    <FiLogOut /> Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-[#1B64B3] text-white py-2 rounded hover:bg-[#FFB300]"
                  >
                    <FiLogIn /> Sign In
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
