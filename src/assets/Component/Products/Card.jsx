import React from "react";
import { FaPaypal } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxios from "../Hooks/useAxios";
import useCart from "../Hooks/useCart";

const Card = ({ item }) => {
  const { image, name, country, price,condition} = item;
  const [, refetch] = useCart();
  const axiosSecure = useAxios();

  const handleCart = async (item) => {

    const product = {
      productId:item._id,
      image: item.image,
      price: item.price,
      name: item.name,
    };

    try {
      const res = await axiosSecure.post("/cart", product);

      if (res?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: `${item.name} added successfully`,
          timer: 1200,
          showConfirmButton: false,
        });
        refetch();
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: `${item.name} is already in your cart`,
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add item",
      });
    }
  };

  return (
    <div className="bg-white border shadow-sm hover:shadow-md transition">
      <div className="h-52 bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-1">{name}</h3>
        <p className="text-xs text-gray-500">{country}</p>
        <p className="text-xs text-gray-500">{condition}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-[#0E4588]">
            £{price.toFixed(2)}
          </span>

          <button
            onClick={() => handleCart(item)}
            className="flex items-center gap-1 bg-[#ffbd07] px-3 py-1.5 rounded text-xs font-medium hover:bg-[#FFB300]"
          >
            <FaPaypal /> Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
