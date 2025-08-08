import React from "react";

const VolunteerCard = ({ volunteer }) => {
  return (
    <div className="bg-[#FFFFFF] p-6 rounded-lg">
      <div className="flex gap-5 mb-6">
        <img
          className="h-24 w-24 rounded-full"
          src={volunteer.imageURL}
          alt=""
        />
        <div className="items-center content-center">
          <h1 className="text-[18px] font-medium">{volunteer.name}</h1>
          <h1>{volunteer.email}</h1>
        </div>
      </div>
      <h1 className="text-[20px] font-medium">
        Blood Donated: {volunteer.suppliedMeals}🩸 times{" "}
      </h1>
      <h1 className="text-[20px] font-medium">
       Volunteered : {volunteer.donatedMeals}🩸 times{" "}
      </h1>
    </div>
  );
};

export default VolunteerCard;
