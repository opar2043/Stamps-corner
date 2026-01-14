import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <div className="text-9xl mb-4 animate-bounce">😢</div>
        <h1 className="text-6xl font-bold text-slate-950  mb-2">404</h1>
        <h2 className="text-2xl text-slate-950  mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-slate-950  mb-8">
          The page you are looking is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#1B64B3] hover:bg-[#c7994f] text-slate-950 font-semibold py-3 px-6 rounded shadow-lg transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;