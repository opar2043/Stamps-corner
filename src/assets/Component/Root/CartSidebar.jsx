// src/Components/CartSidebar.jsx
import React, { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import useCart from "../Hooks/useCart";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";

const CartSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const [cart = [], refetch] = useCart();
  const [quantities, setQuantities] = useState({});
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const handleDeleteCart = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, remove",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/cart/${id}`);
      Swal.fire({
        icon: "success",
        title: "Removed!",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong",
      });
    }
  };

  // 🔹 change quantity local state
  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Number(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const subtotal =
    cart.reduce((sum, item) => {
      const qty = quantities[item._id] ?? 1;
      return sum + Number(item.price || 0) * qty;
    }, 0) || 0;

  // const handlePayPal = async (e) => {
  //   e.preventDefault();
  //   const items = cart.map((item) => ({
  //     productId: item.productId,
  //     qty: quantities[item._id] || item.quantity || 1,
  //   }));
  //   const res = await axiosSecure.post("/payment", {
  //     items,
  //     userId: user?.uid,
  //   });
  //   if (res?.data?.approvalUrl) {
  //     window.location.href = res.data.approvalUrl;
  //   }
  // };

  const handlePayPal = async (e) => {
    e.preventDefault();

    if (!cart.length) return;

    const items = cart.map((item) => ({
      productId: item.productId || item._id, // ✅ fallback
      qty: quantities[item._id] ?? 1,
    }));

    try {
      const res = await axiosSecure.post("/payment", {
        items,
        userId: user?.uid,
      });

      if (res.data?.approvalUrl) {
        window.location.href = res.data.approvalUrl;
      } else {
        throw new Error("No approval URL");
      }
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Unable to process PayPal payment.",
      });
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-slate-50 border-b p-4 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <FaShoppingCart />
            <h2 className="font-semibold text-slate-950">Your Cart</h2>
          </div>
          <button className="text-red-500" onClick={onClose}>
            <MdClose size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
          {cart.length ? (
            <div className="space-y-3">
              {cart.map((item) => {
                const qty = quantities[item._id] ?? 1;
                return (
                  <div
                    key={item._id}
                    className="flex gap-3 border p-3 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-800">
                        {item.name}
                      </h4>

                      <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) =>
                          handleQuantityChange(item._id, e.target.value)
                        }
                        className="mt-2 w-16 border border-slate-500 text-slate-500 rounded px-2 py-1 text-xs"
                      />

                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        £{(item.price * qty).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteCart(item._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-20">
              Your cart is empty
            </p>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3 text-black">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={(e) => handlePayPal(e)}
              className="w-full text-white bg-[#103C6B] transition-all hover:bg-yellow-700  py-2 rounded font-semibold"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-[55]" onClick={onClose} />
      )}
    </>
  );
};

export default CartSidebar;
