import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-5 py-7">

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">
              Stamp Collectors Corner
            </h3>
            <p className="text-xs ">
              crossbarry998@gmail.com
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-4">

            <a className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaInstagram />
            </a>
            <a className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaTwitter />
            </a>
            <a className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaLinkedinIn />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs  text-center">
            © {new Date().getFullYear()} Stamp Collectors Corner.  
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
