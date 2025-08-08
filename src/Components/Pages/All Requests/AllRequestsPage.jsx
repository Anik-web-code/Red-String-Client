import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import RequestCard from "./RequestCard";
import { Loader } from "../../Loader/Loader";

const AllRequestsPage = () => {
  const [donationRequests, setDonationRequests] = useState([]);

  useEffect(() => {
    axios
      .get("https://blood-donating-website.onrender.com/donations")
      .then((res) => {
        const pendingRequests = res.data.filter((d) => d.status === "pending");

        setDonationRequests(pendingRequests);
      })
      .catch((err) => {
        console.error("error fetching", err);
      });
  }, []);

  if (!donationRequests) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-[96%] mx-auto lg:w-[80%] md:w-[90%] mt-10">
      <h1 className="text-center text-[48px] font-medium mb-5">
        All Pending Requests
      </h1>
      <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {donationRequests?.map((request) => {
          return <RequestCard key={request._id} request={request} />;
        })}
      </div>
    </div>
  );
};

export default AllRequestsPage;
