import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import {
  FiImage,
  FiDollarSign,
  FiFlag,
  FiCalendar,
  FiBookmark,
} from "react-icons/fi";
import useProducts from "../../Hooks/useProducts";

const img_api_key =
  "https://api.imgbb.com/1/upload?key=188918a9c4dee4bd0453f7ec15042a27";

const EditProducts = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [stamp, setStamp] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [products, refetch, isLoading] = useProducts();

  // 🔹 Find product
  const findstamp = products?.find((item) => item._id === id);

  // 🔹 Sync to local state
  useEffect(() => {
    if (findstamp) {
      setStamp(findstamp);
    }
  }, [findstamp]);

  const handleEditStamp = async (e) => {
    e.preventDefault();
    if (!stamp) return;

    const form = e.target;

    const stampObj = {
      name: form.name.value,
      country: form.country.value,
      year: form.year.value,
      condition: form.condition.value,
      price: parseFloat(form.price.value),
      letter: form.letter.value.toUpperCase(),
      image: stamp.image,
    };

    try {
      // 🔹 Upload image if changed
      if (imageFile) {
        const data = new FormData();
        data.append("image", imageFile);

        const res = await fetch(img_api_key, {
          method: "POST",
          body: data,
        });
        const imgData = await res.json();
        stampObj.image = imgData.data.display_url;
      }

      const res = await axiosSecure.put(`/products/${id}`, stampObj);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Stamp updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch(); // ✅ IMPORTANT
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "Nothing was updated",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong",
      });
    }
  };

  if (isLoading || !stamp) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading stamp data...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Edit Stamp
      </h2>

      <form onSubmit={handleEditStamp} className="space-y-5">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold mb-1">
            <FiBookmark /> Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={stamp.name}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold mb-1">
            <FiFlag /> Country
          </label>
          <input
            type="text"
            name="country"
            defaultValue={stamp.country}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Year */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold mb-1">
            <FiCalendar /> Year
          </label>
          <input
            type="number"
            name="year"
            defaultValue={stamp.year}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="text-sm font-semibold mb-1 block">
            Condition
          </label>
          <input
            type="text"
            name="condition"
            defaultValue={stamp.condition}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold mb-1">
            <FiDollarSign /> Price
          </label>
          <input
            type="number"
            name="price"
            defaultValue={stamp.price}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Letter */}
        <div>
          <label className="text-sm font-semibold mb-1 block">
            Letter
          </label>
          <input
            type="text"
            name="letter"
            defaultValue={stamp.letter}
            maxLength={1}
            required
            className="w-full border rounded px-3 py-2 uppercase text-center"
          />
        </div>

        {/* Image */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold mb-1">
            <FiImage /> Image
          </label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          {!imageFile && stamp.image && (
            <img
              src={stamp.image}
              alt="Stamp"
              className="mt-2 w-32 h-32 rounded object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          Update Stamp
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
