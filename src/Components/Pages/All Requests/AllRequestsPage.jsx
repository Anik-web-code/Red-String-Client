import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import { Loader } from "../../Loader/Loader";

const AllRequestsPage = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("https://blood-donating-website.onrender.com/donations")
      .then((res) => {
        const pendingRequests = res.data.filter((d) => d.status === "pending");
        setDonationRequests(pendingRequests);
      })
      .catch((err) => {
        console.error("error fetching", err);
      })
      .finally(() => setLoading(false)); // Stop loading after fetch
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (donationRequests.length === 0) {
    return (
      <div className="w-[96%] mx-auto lg:w-[80%] md:w-[90%] mt-10 text-center">
        <h1 className="text-2xl font-medium mb-4">No Pending Requests Found</h1>
        <p className="text-gray-500">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="w-[96%] mx-auto lg:w-[80%] md:w-[90%] mt-10">
      <h1 className="text-center text-[48px] font-medium mb-5">
        All Pending Requests
      </h1>
      <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {donationRequests.map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default AllRequestsPage;
