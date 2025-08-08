import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-[#FFFFFF] py-16 flex flex-col items-center justify-center ">
      <div className="flex gap-2 items-center mx-40">
        <img
          className="h-12 w-12 rounded-full"
          src="https://i.postimg.cc/gjnsFXL5/2a208716-6846-4db1-9665-77176a50e3c4.jpg"
          alt="Logo"
        />
        <h1 className="text-3xl font-medium ">
          Red<span className="text-[#FF6B6B]">String</span>
        </h1>
      </div>
      <div className="flex justify-center gap-5 text-[20px] mt-4 mb-4">
        <Link to="/">Contact Us </Link>
        <Link to="/">Terms and Conditions</Link>
      </div>
      <hr className="w-1/2 border-t-2 border-dotted border-gray-700 mb-5" />
      <div className="flex justify-center items-center gap-4">
        <a href="https://www.facebook.com/Anik.2201097" target="_blank">
          <img src="https://i.ibb.co.com/q3Y6MsD0/fb.png" alt="" />
        </a>

        <a href="https://github.com/Anik-web-code" target="_blank">
          <img src="https://i.ibb.co.com/LhDJmcdb/github-thumb.png" alt="" />
        </a>

        <a href="https://x.com/AnikWebCode" target="_blank">
          <img src="https://i.ibb.co.com/20hTmQ4v/x.png" alt="" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
