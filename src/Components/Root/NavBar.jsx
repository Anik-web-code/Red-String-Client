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
        to="/"
        onClick={() => setIsOpen(false)}
        className="relative text-lg font-semibold transition-all duration-300 
                   after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
                   after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 
                   hover:after:w-full"
      >
        Home
      </NavLink>
      <NavLink
        to="/donation-requests"
        onClick={() => setIsOpen(false)}
        className="relative text-lg font-semibold transition-all duration-300 
                   after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
                   after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 
                   hover:after:w-full"
      >
        Donation Requests
      </NavLink>
      <NavLink
        to="/blogs"
        onClick={() => setIsOpen(false)}
        className="relative text-lg font-semibold transition-all duration-300 
                   after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
                   after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 
                   hover:after:w-full"
      >
        Blog
      </NavLink>
      {websiteUser && (
        <NavLink
          to="/funding"
          onClick={() => setIsOpen(false)}
          className="relative text-lg font-semibold transition-all duration-300 
                     after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
                     after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 
                     hover:after:w-full"
        >
          Funding
        </NavLink>
      )}
    </>
  );

  if (loading) {
    return (
      <nav className="bg-[#FF6B6B] w-full sticky top-0 shadow-md">
        <div className="max-w-7xl mx-auto p-4 text-center text-white">
          Loading...
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-red-500 text-white sticky top-0 w-full z-50 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex gap-2 items-center">
          <img
            className="h-12 w-12 rounded-full border-2 border-white"
            src="https://i.postimg.cc/gjnsFXL5/2a208716-6846-4db1-9665-77176a50e3c4.jpg"
            alt="Logo"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            Red<span className="text-white">String</span>
          </h1>
        </Link>


        <div className="hidden lg:flex gap-10 items-center font-medium">
          {navLinks}
        </div>


        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <NavLink
              to="/login"
              className="text-white border border-white px-4 py-2 rounded-md transition hover:bg-white hover:text-[#FF6B6B]"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <img
                className="rounded-full h-12 w-12 cursor-pointer border-2 border-white"
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 flex flex-col bg-white text-gray-700 border rounded-lg shadow-lg z-50 min-w-[180px] overflow-hidden">
                  <NavLink
                    to={getDashboardPath()}
                    className="px-4 py-3 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-3 text-left text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4 bg-[#FF6B6B] dark:bg-[#1a1a1a] shadow-md">
          {navLinks}
          {!user ? (
            <NavLink
              to="/login"
              className="text-white border border-white px-4 py-2 rounded-md transition hover:bg-white hover:text-[#FF6B6B]"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink
                to={getDashboardPath()}
                className="text-lg font-semibold hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="text-red-600 border border-red-400 px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-800"
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
