import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import {
  FiImage,
  FiDollarSign,
  FiFlag,
  FiCalendar,
  FiBookmark,
} from "react-icons/fi";
import Swal from "sweetalert2";

const img_api_key =
  "https://api.imgbb.com/1/upload?key=188918a9c4dee4bd0453f7ec15042a27";

const AddProducts = () => {
  const axiosSecure = useAxios();

  const handleAddStamp = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const country = form.country.value;
    const year = form.year.value;
    const condition = form.condition.value;
    const price = form.price.value;
    const letter = form.letter.value.toUpperCase();
    const imageFile = form.image.files[0];


    const data = new FormData();
    data.append("image", imageFile);

    fetch(img_api_key, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const stampObj = {
          name,
          country,
          year,
          condition,
          price: parseFloat(price),
          letter,
          image: imgData.data.url,
        };

        axiosSecure
          .post("/products", stampObj)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Stamp Uploaded successfully!",
              confirmButtonColor: "#2563EB", // blue-500
            });
            form.reset();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to Upload stamp.",
              confirmButtonColor: "#EF4444", // red-500
            });
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to Upload stamp.",
          confirmButtonColor: "#EF4444", // red-500
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6  rounded-xs shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Stamp</h2>
      <p className="text-gray-600 mb-6">
        Fill in the details to add a new stamp to your collection
      </p>

      {alert.message && (
        <div
          className={`mb-6 p-4 rounded-xs text-white text-center font-medium ${
            alert.type === "success" ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}

      <form onSubmit={handleAddStamp} className="space-y-5">
        {/* Name & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiBookmark className="inline mr-2 text-blue-500" /> Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter stamp name"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiFlag className="inline mr-2 text-blue-500" /> Country
            </label>
            <input
              type="text"
              name="country"
              required
              placeholder="Enter country"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Year & Condition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiCalendar className="inline mr-2 text-blue-500" /> Year
            </label>
            <input
              type="number"
              name="year"
              required
              placeholder="e.g. 1854"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <input
              type="text"
              name="condition"
              required
              placeholder="e.g. Used – Good"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Price & Letter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiDollarSign className="inline mr-2 text-blue-500" /> Price (£)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              required
              placeholder="e.g. 60.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Letter
            </label>
            <input
              type="text"
              name="letter"
              required
              placeholder="e.g. P"
              maxLength={1}
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center uppercase"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FiImage className="inline mr-2 text-blue-500" /> Stamp Image
          </label>
          <input
            type="file"
            name="image"
            required
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xs shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
        >
          Add Stamp
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
