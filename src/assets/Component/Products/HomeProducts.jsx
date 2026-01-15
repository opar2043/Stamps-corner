import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts";

const HomeProducts = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("/products.json")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.slice(0, 6))); // show only 6 on home
  // }, []);


  const [products , refetch] = useProducts();

  return (
    <section className="bg-[#f8f9fa] mx-auto px-6 py-16">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0E4588] mb-12">
        Featured Stamps for Collectors
      </h2>

      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-11/12 mx-auto">
        {products && products?.map((item) => (
          <div
            key={item._id}
            className="transform transition-transform hover:scale-105 hover:shadow-lg duration-300"
          >
            <Card item={item} />
          </div>
        ))}
      </div>

      {/* All Collection Button */}
      <div className="mt-12 flex justify-center">
        <Link
          to={"/collection"}
          className="relative inline-block px-5 md:px-10 py-2 font-semibold text-black rounded-xsshadow-lg overflow-hidden group transition-all duration-300 border border-black"
        >
          {/* Gradient Background */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#0E4588] to-[#3B82F6] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
          
          {/* Button Text */}
          <span className="relative z-10 group-hover:text-white">
            VIEW ALL COLLECTION
          </span>

          {/* Hover Overlay */}
          <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></span>
        </Link>
      </div>
    </section>
  );
};

export default HomeProducts;
