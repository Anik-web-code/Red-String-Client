import React from "react";
import { Link } from "react-router";

const Unauthorize = () => {
  return (
    <div className="w-[80%] m-auto mb-16 flex flex-col justify-center pb-[250px]">
      <div className="p-6 w-full m-auto  text-center flex justify-center">
        <div className="bg-[#FFFFFF] p-10 rounded-xl">
          <img src="https://i.ibb.co.com/HDyFLrWY/images.png" alt="" />
        </div>
      </div>
      <h1 className="text-center text-[54px] text-red-400 font-medium">
        404 - Unauthorized 
      </h1>
      <h1 className="text-center text-2xl">
        Oops! You don't have access to this page 
      </h1>
      <button className="mt-8">
        {" "}
        <Link
          className="bg-blue-500 font-bold text-[#FFFFFF] px-4 rounded-md py-2"
          to={"/"}
        >
          Go Back Home
        </Link>
      </button>
    </div>
  );
};

export default Unauthorize;
