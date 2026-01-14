import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";

const AlCollection = () => {
  const [products, setProducts] = useState([]);
  const [activeLetter, setActiveLetter] = useState("ALL");

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // A–Z letters
  const letters = useMemo(
    () => ["ALL", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))],
    []
  );

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (activeLetter === "ALL") return products;

    return products.filter(
      (item) =>
        item.country &&
        item.country.charAt(0).toUpperCase() === activeLetter
    );
  }, [products, activeLetter]);

  return (
  <div>
        <section className="bg-white max-w-7xl mx-auto px-4 py-14">
      {/* Page Header */}
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

        <span>
          Filter:
          <span className="ml-1 font-semibold text-[#0E4588]">
            {activeLetter === "ALL"
              ? "All Countries"
              : `Country starts with "${activeLetter}"`}
          </span>
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {filteredProducts.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          No stamps found for this letter.
        </div>
      )}
    </section>
  </div>
  );
};

export default AlCollection;
