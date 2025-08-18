import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

axios.defaults.baseURL = "https://blood-donating-website.onrender.com";

const Register = () => {
  const { createUser, districts, upozillas } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpozillas, setFilteredUpozillas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrictId(districtId);
    setFilteredUpozillas(upozillas.filter((u) => u.district_id === districtId));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const bloodGroup = e.target.bloodGroup.value;
    const district =
      e.target.district.options[e.target.district.selectedIndex].text;
    const upazila =
      e.target.upazila.options[e.target.upazila.selectedIndex].text;
    const avatarUrl = e.target.avatarUrl.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      password.length < 6
    ) {
      alert(
        "Password must contain at least one uppercase, one lowercase, and be at least 6 characters."
      );
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: avatarUrl,
      });

      const userData = {
        uid: result.user.uid,
        name,
        email,
        avatar: avatarUrl,
        bloodGroup,
        district,
        upazila,
        role: "donor",
        status: "active",
      };
      await axios.post("/users", userData);

      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log(selectedDistrictId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-12 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Join us to donate and save lives!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            name="avatarUrl"
            type="url"
            placeholder="Avatar URL"
            required
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <select
            name="bloodGroup"
            required
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            name="district"
            onChange={handleDistrictChange}
            required
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md text-gray-900 dark:text-gray-100"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            name="upazila"
            required
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition shadow-sm hover:shadow-md text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Upazila</option>
            {filteredUpozillas.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            className="text-red-500 dark:text-red-400 font-semibold underline hover:text-red-600 dark:hover:text-red-300 transition"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
