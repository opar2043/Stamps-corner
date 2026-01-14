import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiEye } from "react-icons/fi";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";



const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e) => {
  e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const name = `${firstName} ${lastName}`.trim();
    const email = form.email.value;
    const password = form.password.value;

    const userObj = {
      name,
      email,
      role: "customer",
    };

    handleRegister(email, password)
      .then(() => axiosSecure.post("/users", userObj))
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Account created successfully!",
          icon: "success",
          confirmButtonColor: "#1B64B3",
        }).then(() => navigate("/"));
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed",
          text: error.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#1B64B3",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="min-h-[85vh] my-12 md:my-20 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-6 md:px-12"
      >
        <h1 className="text-center text-2xl mb-10 text-slate-900">REGISTER</h1>

        <form className="space-y-5" onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="w-full border border-slate-300 px-4 py-3 outline-none bg-white text-slate-900 placeholder:text-slate-500 focus:border-[#1B64B3] transition"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="w-full border border-slate-300 px-4 py-3 outline-none bg-white text-slate-900 placeholder:text-slate-500 focus:border-[#1B64B3] transition"
            />
          </div>

          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
              required
            />
            <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FiEye className="text-slate-600" />
              <span className="block h-[2px] w-6 bg-slate-600 translate-y-[6px]" />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-semibold bg-[#1B64B3] text-white tracking-wide hover:opacity-90 transition disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-sm text-slate-700 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline text-[#1B64B3]">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Register;
