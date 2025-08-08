// MyRequests.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../Context/AuthContext";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(`/donations/mine?email=${user.email}`);
        const data = Array.isArray(res.data) ? res.data : [];
        setDonations(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setDonations([]);
      }
    };

    if (user?.email) {
      fetchDonations();
    }
  }, [user]);

  useEffect(() => {
    if (filterStatus === "all") {
      setFiltered(donations);
    } else {
      setFiltered(donations.filter((d) => d.status === filterStatus));
    }
    setCurrentPage(0);
  }, [donations, filterStatus]);

  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  const displayedItems = Array.isArray(filtered)
    ? filtered.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    : [];

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        My Donation Requests
      </h2>

      <div className="mb-4 text-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {Array.isArray(displayedItems) && displayedItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-[20px] font-semibold">
          No donation Requests found
        </p>
      ) : (
        <>
          <table className="w-full border mb-4 place-items-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Recipient</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Blood Group</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((d) => (
                <tr key={d._id} className="text-center border-t">
                  <td className="p-2">{d.recipientName}</td>
                  <td className="p-2">
                    {d.recipientDistrict}, {d.recipientUpazila}
                  </td>
                  <td className="p-2">
                    {new Date(d.donationDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">{d.donationTime}</td>
                  <td className="p-2">{d.bloodGroup}</td>
                  <td className="p-2 capitalize">{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel="← Prev"
            nextLabel="Next →"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex gap-2 justify-center"
            pageClassName="px-3 py-1 border rounded"
            activeClassName="bg-red-500 text-white"
            breakLabel="..."
          />
        </>
      )}
    </div>
  );
};

export default MyRequests;
