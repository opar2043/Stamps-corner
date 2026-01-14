import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiMail, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";

const Login = () => {
  const { handleLogin, handleGoogle, resetPass } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handleLogin(email, password)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Logged in successfully!",
          icon: "success",
          confirmButtonColor: "#1B64B3",
        }).then(() => navigate("/"));
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#1B64B3",
        });
      });
  };

  const handleForget = () => {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({
        title: "Warning",
        text: "Please enter your email address",
        icon: "warning",
        confirmButtonColor: "#1B64B3",
      });
      return;
    }
    resetPass(email)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Please check your email for reset instructions",
          icon: "success",
          confirmButtonColor: "#1B64B3",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#1B64B3",
        });
      });
  };

  const handleGoogleAccount = () => {
    handleGoogle()
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
          role: "customer",
        };
        axiosSecure.post("/users", userInfo).then(() => {
          Swal.fire({
            title: "Success",
            text: "Signed in with Google!",
            icon: "success",
            confirmButtonColor: "#1B64B3",
          }).then(() => navigate("/"));
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Google Sign-In Failed",
          text: err.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#1B64B3",
        });
      });
  };

  return (
    <section className="min-h-[75vh] my-12 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xl px-4"
      >
        <h1 className="text-center text-2xl my-10 text-slate-900">SIGN IN</h1>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none bg-white text-slate-900 placeholder:text-slate-500"
              ref={emailRef}
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
            className="w-full py-3 font-semibold bg-[#1B64B3] text-white tracking-wide hover:opacity-90 transition"
          >
            Sign In
          </button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              className="underline text-slate-900"
              onClick={handleForget}
            >
              Forgot password
            </button>

            <Link to="/register" className="underline text-slate-900">
              Sign up
            </Link>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
