import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const VolunteerDashboardHome = () => {
   
     const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/admin/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((err) => toast.error("Failed to fetch stats", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
    
    return (
       <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Donors"
          value={stats?.totalUsers || 0}
          icon="🧑"
        />
        <StatCard
          title="Total Funds"
          value={`$${stats?.totalFunds || 0}`}
          icon="💰"
        />
        <StatCard
          title="Total Requests"
          value={stats?.totalRequests || 0}
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


export default VolunteerDashboardHome;