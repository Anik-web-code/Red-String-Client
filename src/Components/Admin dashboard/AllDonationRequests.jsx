import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";

axios.defaults.baseURL = "https://blood-donating-website.onrender.com";

const AllDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`/donations`);
      const data = Array.isArray(res.data) ? res.data : [];
      setRequests(data);
    } catch (err) {
      toast.error("Failed to load requests");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (filterStatus === "all") {
      setFiltered(requests);
    } else {
      setFiltered(requests.filter((r) => r.status === filterStatus));
    }
    setCurrentPage(0);
  }, [requests, filterStatus]);

  const displayedItems = filtered.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`/donations/${id}/status`, { status });
      toast.success("Status updated");
      fetchRequests();
    } catch (err) {
      toast.error("Failed to update status");
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">
        All Donation Requests
      </h2>

      <div className="mb-4 text-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {displayedItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg font-medium">
          No donation requests found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full font-medium text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left text-[18px]">
                <th>Recipient</th>
                <th>Blood Group</th>
                <th>Date</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((r) => (
                <tr key={r._id}>
                  <td>{r.recipientName}</td>
                  <td>{r.bloodGroup}</td>
                  <td>{new Date(r.donationDate).toLocaleDateString()}</td>
                  <td>{r.status || "pending"}</td>
                  <td>
                    <select
                      value={r.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(r._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-6">
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
        </div>
      )}
    </div>
  );
};

export default AllDonationRequests;
