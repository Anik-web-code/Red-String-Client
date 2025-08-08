import React from "react";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside className="bg-[#ff003320] p-4 md:w-64">
          <h2 className="text-[22px] font-bold mb-4 text-center md:text-left">
            Dashboard
          </h2>
          <ul className="flex flex-wrap justify-center md:flex-col md:space-y-2 md:text-[18px] space-x-4 md:space-x-0">
            <li>
              <NavLink to="/dashboard/admin">🏠 Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/all-users">👤 All Users </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/donation-requests">
                🩸 All Donation Requests
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/content-management">
                📒 Manage Blogs
              </NavLink>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-1 md:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
