import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";

const DonorHome = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/donations/email/${user.email}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setDonations(res.data);
          } else {
            setDonations([]);
            console.warn("Expected array, got:", res.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching donations:", err);
          setDonations([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-[24px] py-6">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 ">
        Welcome, {user?.name || "Donor"}
      </h2>

      {donations.length === 0 ? (
        <p className="text-gray-500 text-[20px]">No donation requests found.</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">
            Recent Donation Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm font-medium">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Recipient</th>
                  <th className="px-4 py-2 border">Blood Group</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.slice(0, 5).map((donation) => (
                  <tr key={donation._id}>
                    <td className="px-4 py-2 border">
                      {donation.recipientName}
                    </td>
                    <td className="px-4 py-2 border">{donation.bloodGroup}</td>
                    <td className="px-4 py-2 border">
                      {donation.donationDate}
                    </td>
                    <td className="px-4 py-2 border capitalize">
                      {donation.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Link
              to="/dashboard/donor/my-donation-requests"
              className="inline-block bg-[#ff0033] text-white px-4 py-2 rounded"
            >
              View All
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorHome;
