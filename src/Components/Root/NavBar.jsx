import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [websiteUser, setWebsiteUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchWebsiteUser = async () => {
      if (!user?.email) {
        setWebsiteUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `https://blood-donating-website.onrender.com/users/email/${user.email}`
        );
        setWebsiteUser(res.data || null);
      } catch (error) {
        console.error("Failed to fetch user from backend", error);
        setWebsiteUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteUser();
  }, [user]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        setWebsiteUser(null);
        console.log("Sign Out successful");
      })
      .catch((error) => console.log(error));
  };

  const getDashboardPath = () => {
    if (!websiteUser?.role) return "/dashboard";
    switch (websiteUser.role.toLowerCase()) {
      case "admin":
        return "/dashboard/admin";
      case "donor":
        return "/dashboard/donor";
      case "volunteer":
        return "/dashboard/volunteer";
      default:
        return "/";
    }
  };

  const navLinks = (
    <>
      <NavLink
        className="text-[#FF6B6B] text-[21px]"
        to="/donation-requests"
        onClick={() => setIsOpen(false)}
      >
        Donation Requests
      </NavLink>
      <NavLink
        className="text-[#FF6B6B] text-[21px]"
        to="/blogs"
        onClick={() => setIsOpen(false)}
      >
        Blog
      </NavLink>
      {websiteUser && (
        <NavLink
          className="text-[#FF6B6B] text-[21px]"
          to="/funding"
          onClick={() => setIsOpen(false)}
        >
          Funding
        </NavLink>
      )}
    </>
  );

  if (loading) {
    return (
      <nav className="bg-white w-full shadow-sm mb-10">
        <div className="max-w-[90%] mx-auto p-4 text-center">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-white w-full shadow-sm mb-10">
      <div className="max-w-[90%] mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="flex gap-2 items-center">
          <img
            className="h-12 w-12 rounded-full"
            src="https://i.postimg.cc/gjnsFXL5/2a208716-6846-4db1-9665-77176a50e3c4.jpg"
            alt="Logo"
          />
          <h1 className="text-3xl font-bold">
            Red<span className="text-[#ff0033]">String</span>
          </h1>
        </Link>

        <div className="hidden lg:flex gap-14 items-center">{navLinks}</div>

        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <NavLink
              to="/login"
              className="text-lg font-semibold text-[#FF6B6B] border border-[#FF6B6B] px-4 py-2 rounded-sm hover:bg-[#FF6B6B] hover:text-white"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <img
                className="rounded-full h-12 w-12 cursor-pointer"
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 flex flex-col bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px]">
                  <NavLink
                    to={getDashboardPath()}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-800"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <button className="text-[#FF6B6B]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {navLinks}
          {!user ? (
            <NavLink
              to="/login"
              className="text-lg font-semibold text-[#FF6B6B] border border-[#FF6B6B] px-4 py-2 rounded-sm hover:bg-[#FF6B6B] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink
                to={getDashboardPath()}
                className="text-lg font-semibold text-[#FF6B6B] hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="text-lg font-semibold text-red-600 border border-red-400 px-4 py-2 rounded-sm hover:bg-red-50 hover:text-red-800"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
