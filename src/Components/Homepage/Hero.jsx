import React from "react";
import { NavLink } from "react-router";

const Hero = () => {
  return (
    <div className="mb-20 mt-10">
      <div
        className="bg-cover rounded-[16px] bg-center mx-auto h-[500px] w-[95%] lg:h-[600px] md:w-[90%] lg:w-[80%] md:h-screen flex-shrink-0 p-7"
        style={{
          backgroundImage:
            'url("https://i.postimg.cc/zv2M2KvB/hands-of-the-giver-and-the-recipient-to-donate-blood-blood-donation-concept-heart-medical-sign-give.jpg")',
        }}
      >
        <h1 className="text-[40px] sm:text-[56px] md:text-[80px] text-[#ff0033] font-medium mb-8">
          Be the Lifeline – Donate Blood, Save Lives
        </h1>
        <p className="text-[16px] md:text-[32px] text-[#FFFFFF] font-medium mb-10">
          Every drop counts. Join our mission to bring hope and health to those
          in need. Your simple act of donating blood can give someone another
          chance at life. Sign up today and be the hero someone is waiting for
        </p>
        <NavLink to="/register">
          <button className="bg-[#ff0033] text-[#FFFFFF] px-4 py-2 text-[20px] rounded-[8px] hover:bg-[#FF6B6B90]">
            Join as a Donor
          </button>
        </NavLink>
        <NavLink to="/search">
          <button className="bg-[#ff0033] ml-4 text-[#FFFFFF] px-4 py-2 text-[20px] rounded-[8px] hover:bg-[#FF6B6B90]">
            Search Donors
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
