import React from 'react';
import { Link, NavLink } from 'react-router';

const RequestCard = ({request}) => {
    return (
         <div className="mb-6 dark:text-[#FFFFFF]">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src="https://i.postimg.cc/tCSqnYYN/image-jpg.jpg" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[22px]">Recipient:{request.recipientName}</h2>
          <p className="text-[22px] font-medium h-[64px]">
        Location: {request.hospitalName}
          </p>
          <h1 className="text-[22px] font-medium">Blood Group: {request.bloodGroup}</h1>
          <h1 className="text-[22px] font-medium">Donation date: {request.donationDate}</h1>
          <div className="card-actions flex justify-between">
            <h1 className="text-[22px] font-medium">
              Donation Time: {request.donationTime}
            </h1><br></br>
            <Link to={`/dashboard/donation/${request._id}`}>
              <button className="px-4 py-2 text-[18px] text-[#FFFFFF] rounded-[6px] bg-[#FF6B6B] hover:bg-[#FF6B6B95]">
                {" "}
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
};

export default RequestCard;