import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1B64B3] text-white">
      <div className="max-w-7xl mx-auto px-5 py-12">
        {/* TOP GRID */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Buy */}
          <div>
            <h4 className="font-semibold mb-4">Buy</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Buying on Delcampe</li>
              <li>Stamps</li>
              <li>Postcards</li>

            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="font-semibold mb-4">Sell</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Selling on Delcampe</li>
              <li>Rates</li>
              <li>Selling methods</li>
              <li>Estimate my item</li>

            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Delcampe Community</li>
              <li>Calendar</li>

              <li>Blog</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">The company</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Who are we?</li>

              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Usage Policy</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>A secure website</li>
              <li>Payment methods</li>
              <li>Contact us</li>
              <li>Help centre</li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Currency converter</li>
              <li>Verified Reviews</li>
              <li className="font-medium text-white">
                ⭐ 5 out of 5
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/20 my-10"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">
              Stamp Collectors Corner
            </h3>
            <p className="text-xs text-white/70">
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
          <div className="text-xs text-white/70 text-center">
            © {new Date().getFullYear()} Stamp Collectors Corner.  
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
