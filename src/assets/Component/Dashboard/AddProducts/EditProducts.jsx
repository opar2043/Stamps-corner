import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { FiImage, FiDollarSign, FiFlag, FiCalendar, FiBookmark } from "react-icons/fi";

const img_api_key = "https://api.imgbb.com/1/upload?key=188918a9c4dee4bd0453f7ec15042a27";

const EditProducts = () => {
  const { id } = useParams(); // stamp ID
  const axiosSecure = useAxios();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [stamp, setStamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  console.log(id);

  // Fetch existing stamp data
  useEffect(() => {
    axiosSecure.get(`/products/${id}`)
      .then(res => {
        setStamp(res.data);
        setLoading(false);
      })
      .catch(() => {
        setAlert({ type: "error", message: "Failed to load stamp data." });
        setLoading(false);
      });
  }, [id]);

  const handleEditStamp = (e) => {
    e.preventDefault();
    if (!stamp) return;

    const form = e.target;

    const name = form.name.value;
    const country = form.country.value;
    const year = form.year.value;
    const condition = form.condition.value;
    const price = form.price.value;
    const letter = form.letter.value.toUpperCase();

    const updateStamp = (imageUrl) => {
      const stampObj = {
        name,
        country,
        year,
        condition,
        price: parseFloat(price),
        letter,
        image: imageUrl || stamp.image, // keep old image if not replaced
      };

      axiosSecure.put(`/stamps/${id}`, stampObj)
        .then(() => {
          setAlert({ type: "success", message: "Stamp updated successfully!" });
        })
        .catch(() => {
          setAlert({ type: "error", message: "Update failed. Try again." });
        });
    };

    // If a new image is selected, upload it
    if (imageFile) {
      const data = new FormData();
      data.append("image", imageFile);

      fetch(img_api_key, {
        method: "POST",
        body: data,
      })
        .then(res => res.json())
        .then(imgData => {
          updateStamp(imgData.data.url);
        })
        .catch(() => {
          setAlert({ type: "error", message: "Image upload failed." });
        });
    } else {
      updateStamp(); // no image change
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading stamp data...</p>;
  }

  if (!stamp) {
    return <p className="text-center mt-10 text-red-500">Stamp not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xs shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Stamp</h2>
      <p className="text-gray-600 mb-6">Update the details of this stamp</p>

      {alert.message && (
        <div
          className={`mb-6 p-4 rounded-xs text-white text-center font-medium ${
            alert.type === "success" ? "bg-blue-500" : "bg-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}

      <form onSubmit={handleEditStamp} className="space-y-5">
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
              defaultValue={stamp.name}
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
              defaultValue={stamp.country}
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
              defaultValue={stamp.year}
              placeholder="e.g. 1854"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <input
              type="text"
              name="condition"
              required
              defaultValue={stamp.condition}
              placeholder="e.g. Used – Good"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Price & Letter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FiDollarSign className="inline mr-2 text-blue-500" /> Price ($)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              required
              defaultValue={stamp.price}
              placeholder="e.g. 60.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Letter</label>
            <input
              type="text"
              name="letter"
              required
              defaultValue={stamp.letter}
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
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-200 rounded-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100"
          />
          {stamp.image && !imageFile && (
            <img src={stamp.image} alt="Stamp" className="mt-2 w-32 h-32 object-cover rounded-md" />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xs shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
        >
          Update Stamp
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
