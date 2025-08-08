import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loader } from "../../Loader/Loader";

const RequestDetails = () => {
  const { id } = useParams();
  const [donations, setDonations] = useState(null);

  useEffect(() => {
    axios
      .get(`https://blood-donating-website.onrender.com/donations/${id}`)
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching donation:", err));
  }, [id]);

  if (!donations) {
    return <Loader></Loader>;
  }

  return (
    <div className="p-8 border-2 border-[#FF4500] mx-auto w-[96%] md:w-[60%] lg:w-[39%] mt-10 rounded-[12px] mb-10">
      <h1 className="text-[30px] font-medium mb-6">
        Patient: {donations.recipientName}
      </h1>
      <p className="text-[22px] font-medium text-[#00000099] mb-4">
        {donations.message}
      </p>
      <p className="text-[22px] font-medium text-[#00000099] mb-3">
        Blood Group: {donations.bloodGroup}
      </p>

      <p className="text-[22px] font-medium text-[#00000099] mb-3 ">
        Hospital: {donations.hospitalName}
      </p>
      <p className="text-[22px] font-medium text-[#00000099] mb-3">
        Donation date: {donations.donationDate}
      </p>

      <p className="text-[22px] font-medium text-[#00000099] mb-3">
        Requester Email: {donations.requesterEmail}
      </p>
    </div>
  );
};

export default RequestDetails;
