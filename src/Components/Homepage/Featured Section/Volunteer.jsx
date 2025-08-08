import React from "react";
import VolunteerCard from "./VolunteerCard";


const volunteers = [
  {
    id: 1,
    name: "Asadur Jaman",
    imageURL:
      "https://i.postimg.cc/fyp1Fx11/488801989-122171909738311397-8428798571120840812-n.jpg",
    suppliedMeals: 25,
    donatedMeals: 120,
    email: "asadur.jaman@gmail.com",
  },

  {
    id: 2,
    name: "Rafiq Ahmed",
    imageURL:
      "https://i.postimg.cc/SRZLzT9G/c1-D22w-QKB2g-Wknjchhx-y0-TRK2-I69w-3-I-zd-Wb0-Hdd-ZRm02x-EX5-EXGjx-Se-RDAC.webp",
    suppliedMeals: 15,
    donatedMeals: 104,
    email: "rafiq.ahmed@gmail.com",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    imageURL:
      "https://i.postimg.cc/bYtPxWQg/smiling-young-woman-in-hijab-2021-08-26-15-34-43-utc-scaled.png",
    suppliedMeals: 17,
    donatedMeals: 90,
    email: "nusrat.jahan@gmail.com",
  },
  {
    id: 4,
    name: "Mehedi Hasan",
    imageURL:
      "https://i.postimg.cc/bJp1VcHT/c1m87-Nhiyu-Q15o-QXX3yt-Qtyhj-R-f-YDZJlpvd3nay-Sy-W7-STPc2-FZQip-Pzo7-DMF2-Hcg.webp",
    suppliedMeals: 21,
    donatedMeals: 80,
    email: "mehedi.hasan@gmail.com",
  },
  {
    id: 5,
    name: "Faruk Kabir",
    imageURL:
      "https://i.postimg.cc/Qx29nZjT/c1a-S0-EII9-SWh-VI5-M3b5-U0bb-HMz-X5-Oyp2ya-D-h5-XBYqhnlz-Pd-Vp-QO2-Kfa9-RGow-KEDl-G.webp",
    suppliedMeals: 9,
    donatedMeals: 110,
    email: "faruk.kabir@gmail.com",
  },
  {
    id: 6,
    name: "Tanvir Alam",
    imageURL:
      "https://i.postimg.cc/bvjndcMh/c13-P5m6hd-ULPQEl9-OSPZf-OYN0-Byn0-O9-Xxso-Jk7-bj-Jgd-G9-Jj-XK2-Pqy1f9w9-U6-Lb2j-R-1.jpg",
    suppliedMeals: 16,
    donatedMeals: 108,
    email: "tanvir.alam@gmail.com",
  },
  {
    id: 7,
    name: "Shaila Akter",
    imageURL:
      "https://i.postimg.cc/RV1z8tpn/aab7a909af5b68540eae80d4255174e2-jpg-720x720q80.jpg",
    suppliedMeals: 18,
    donatedMeals: 100,
    email: "shaila.akter@gmail.com",
  },
  {
    id: 8,
    name: "Arif Chowdhury",
    imageURL:
      "https://i.postimg.cc/fy3yBBFC/c168o2zp-N1-Lavw3-IM3o-YDSov-Nh-LClh5-Ms-NQe-PMXlz-Ai2sao-NWOup-Ami-KT-e93t-Y9h.webp",
    suppliedMeals: 12,
    donatedMeals: 97,
    email: "arif.chowdhury@gmail.com",
  },
  {
    id: 9,
    name: "Ayesha Rahman",
    imageURL: "https://i.postimg.cc/sXtrF4R5/5831.webp",
    suppliedMeals: 12,
    donatedMeals: 95,
    email: "ayesha.rahman@gmail.com",
  },
];

const Volunteer = () => {
  return (
    <div className="w-[95%] mx-auto md:w-[90%] lg:w-[80%] mt-24 pb-24">
      <h1 className="text-[40px] font-semibold text-center mb-10">
        Our Top Volunteers
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto">
        {volunteers.map((volunteer) => {
          return (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
            ></VolunteerCard>
          );
        })}
      </div>
    </div>
  );
};

export default Volunteer;
