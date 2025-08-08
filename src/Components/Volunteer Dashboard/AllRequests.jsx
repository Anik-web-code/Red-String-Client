import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const AllRequests = () => {
  const { role, user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("/donations").then((res) => {
      setRequests(res.data);
    });
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    axios
      .patch(`/donations/email/${user.email}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setRequests((prev) =>
            prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
          );
        }
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        All Blood Donation Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2 text-left">Requester</th>
              <th className="p-2 text-left">Blood Group</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Status</th>
              {role === "volunteer" && <th className="p-2">Update</th>}
              {role === "admin" && <th className="p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="p-2">{req.requesterEmail || "alianikofficial12@gmail.com"}</td>
                <td className="p-2">{req.bloodGroup}</td>
                <td className="p-2">{req.fullAddress}</td>
                <td className="p-2 capitalize">{req.status}</td>
                {role === "volunteer" && (
                  <td className="p-2">
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusUpdate(req._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>
                )}
                {role === "admin" && (
                  <td className="p-2 flex gap-2 flex-wrap">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
