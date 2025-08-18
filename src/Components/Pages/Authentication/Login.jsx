import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log("User logged in:", result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        alert("Login failed. Please check your email and password.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-12 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Login to continue exploring amazing features
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Or */}
        <div className="flex items-center my-6 gap-2 text-gray-400 dark:text-gray-500">
          <span className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700"></span>
          <span>OR</span>
          <span className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700"></span>
        </div>

        {/* Social Login */}
        {/* <div className="flex gap-4 justify-center">
          <button className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2">
            <FaGoogle /> Login with Google
          </button>
          <button className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2">
            <FaFacebook /> Login with Facebook
          </button>
        </div> */}

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          New here?{" "}
          <Link
            className="text-red-500 dark:text-red-400 font-semibold underline hover:text-red-600 dark:hover:text-red-300 transition"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
