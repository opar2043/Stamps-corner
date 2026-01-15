import React, { useMemo, useState } from "react";
import Card from "./Card";
import useProducts from "../Hooks/useProducts";
import { FiSearch } from "react-icons/fi";

const AlCollection = () => {
  const [activeLetter, setActiveLetter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [products, refetch, isLoading] = useProducts();

  // A–Z letters
  const letters = useMemo(
    () => [
      "ALL",
      ...Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
      ),
    ],
    []
  );

  // Filtered products (A–Z + Search)
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesLetter =
        activeLetter === "ALL" ||
        (item.country &&
          item.country.charAt(0).toUpperCase() === activeLetter);

      const matchesSearch =
        item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesLetter && matchesSearch;
    });
  }, [products, activeLetter, searchTerm]);

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-500">
        Loading stamps...
      </div>
    );
  }

  return (
    <section className="bg-white max-w-7xl mx-auto px-4 py-12">

            {/* Search Box */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center bg-white px-5 py-4 w-full md:w-10/12 mx-auto border border-gray-400 rounded">
          <FiSearch className="text-[#1B64B3] mr-2" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stamps by their name..."
            className="w-full text-sm outline-none text-gray-700 bg-white"
          />
        </div>
      </div>

      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-[#0E4588]">
          Stamp Collection A–Z
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Browse stamps by country name (alphabetical order)
        </p>
      </div>



      {/* A–Z Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => setActiveLetter(letter)}
            className={`px-3 py-1.5 text-sm rounded border transition
              ${
                activeLetter === letter
                  ? "bg-[#0E4588] text-white border-[#0E4588]"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Info Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 text-sm text-gray-600">
        <span>
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {filteredProducts.length}
          </span>{" "}
          stamps
        </span>
        <span className="font-semibold text-[#0E4588]">
          {activeLetter === "ALL"
            ? "All Countries"
            : `Country starts with "${activeLetter}"`}
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          No stamps found.
        </div>
      )}
    </section>
  );
};

export default AlCollection;
