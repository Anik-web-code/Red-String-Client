import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
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
      });
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">Login and explore to get started.</p>
      </div>
      <div className="card w-full mx-auto max-w-sm shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered"
              placeholder="Password"
              required
            />
            <button className="btn btn-neutral mt-4" type="submit">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            New to this site?{" "}
            <Link className="text-blue-400 underline" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
