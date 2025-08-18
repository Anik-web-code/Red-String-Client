import React, { useContext, useEffect, useState } from "react";
import Hero from "./Hero";
import Volunteer from "./Featured Section/Volunteer";
import ContactUs from "./ContactUs";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import About from "./Sections/About";
import MissionVision from "./Sections/MissionVision";
import DonationSteps from "./Sections/DonationSteps";
import HowItWorks from "./Sections/HowItWorks";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://blood-donating-website.onrender.com/users/email/${user.email}`
        )
        .then((res) => {
          setUserInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-600">
          Starting server... Please wait up to 30 seconds
        </p>
      </div>
    );
  }

  console.log(userInfo);

  return (
    <div>
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <Volunteer></Volunteer>
      <About></About>
      <MissionVision></MissionVision>

      <ContactUs></ContactUs>
    </div>
  );
};

export default HomePage;
