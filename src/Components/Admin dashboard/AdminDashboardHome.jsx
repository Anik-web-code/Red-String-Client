import { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";



const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://blood-donating-website.onrender.com/users")
      .then((res) => setStats(res.data))
      .catch((err) => toast.error("Failed to fetch stats", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader></Loader>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Donors" value={stats?.total || 0} icon="🧑" />
        <StatCard
          title="Total Funds"
          value={`$${stats?.totalFunds || 3910}`}
          icon="💰"
        />
        <StatCard
          title="Total Requests"
          value={stats?.totalRequests || 6}
          icon="🩸"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="p-4 bg-white shadow-md rounded-xl text-center">
    <div className="text-4xl mb-2">{icon}</div>
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboardHome;
