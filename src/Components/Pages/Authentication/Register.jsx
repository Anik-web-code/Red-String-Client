import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
axios.defaults.baseURL = "https://blood-donating-website.onrender.com";

const Register = () => {
  const { createUser, districts, upozillas } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpozillas, setFilteredUpozillas] = useState([]);

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrictId(districtId);
    setFilteredUpozillas(upozillas.filter((u) => u.district_id === districtId));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
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
    }
  };

  console.log(selectedDistrictId);

  return (
    <div className="mx-auto w-[80%]">
      <h1 className="text-5xl font-bold text-center mb-5">Register Now</h1>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered"
              required
            />

            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered"
              required
            />

            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered"
              required
            />

            <label className="label">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="input input-bordered"
              required
            />

            <label className="label">Avatar URL</label>
            <input
              name="avatarUrl"
              type="url"
              placeholder="Enter image URL"
              className="input input-bordered"
              required
            />

            <label className="label">Blood Group</label>
            <select
              name="bloodGroup"
              className="select select-bordered"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>

            <label className="label">District</label>
            <select
              name="district"
              className="select select-bordered"
              onChange={handleDistrictChange}
              required
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <label className="label">Upazila</label>
            <select name="upazila" className="select select-bordered" required>
              <option value="">Select Upazila</option>
              {filteredUpozillas.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            <button className="btn btn-neutral mt-4">Register</button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link className="text-blue-400 underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
