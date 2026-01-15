import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import useProducts from "../../Hooks/useProducts";
import { Link } from "react-router-dom";

const AllProducts = () => {

  const axiosSecure = useAxios();
  const [products , refetch , isLoading] = useProducts([]);
  console.log(products);
  // useEffect(() => {
  //   fetch("https://stupms-backend.vercel.app/products")
  //     .then((res) => res.json())
  //     .then((data) => setStamps(data));
  // }, []);

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This stamp will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563EB", // blue-500
    cancelButtonColor: "#EF4444", // red-500
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure
        .delete(`/products/${id}`)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Stamp deleted successfully!",
            confirmButtonColor: "#2563EB",
          });
           refetch();

        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to delete stamp.",
            confirmButtonColor: "#EF4444",
          });
        });
    }
  });
};


  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8 tracking-wide">
        🏷️ All Stamps
      </h2>



      <div className="overflow-x-auto shadow-md rounded-xs bg-white border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xs">
            <tr>
              <th className="px-4 py-3 font-semibold">#</th>
              <th className="px-4 py-3 font-semibold">Image</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Price ($)</th>
              <th className="px-4 py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products && products.length > 0 ? (
              products.map((stamp, idx) => (
                <tr
                  key={stamp._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-gray-600 font-medium">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={stamp.image}
                      alt={stamp.name}
                      className="w-12 h-12 rounded-xs object-cover border border-gray-200"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-semibold">
                    {stamp.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-medium">
                    {stamp.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                     <Link to={`/dashboard/edit-products/${stamp._id}`}>
                                           <button className="flex items-center justify-center w-9 h-9 rounded-xs bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">
                        <FaEdit />
                      </button>
                     </Link>
                      <button
                        className="flex items-center justify-center w-9 h-9 rounded-xs bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
                        onClick={() => handleDelete(stamp._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No stamps available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
