import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./Components/Pages/ErrorPage/ErrorPage.jsx";
import Root from "./Components/Root/Root.jsx";
import HomePage from "./Components/Homepage/HomePage.jsx";
import { HeadProvider } from "react-head";
import AuthProvider from "./Components/Context/AuthProvider.jsx";
import Register from "./Components/Pages/Authentication/Register.jsx";
import Login from "./Components/Pages/Authentication/Login.jsx";
import DonorDashboard from "./Components/Donor Dashboard/DonorDashboard.jsx";
import DonorHome from "./Components/Donor Dashboard/DonorHome.jsx";
import DonorProfile from "./Components/Donor Dashboard/DonorProfile.jsx";
import MyRequests from "./Components/Donor Dashboard/MyRequests.jsx";
import CreateDonationRequest from "./Components/Donor Dashboard/CreateDonationRequest.jsx";
import AdminDashboardHome from "./Components/Admin dashboard/AdminDashboardHome.jsx";
import AllUsers from "./Components/Admin dashboard/AllUsers.jsx";
import AllDonationRequests from "./Components/Admin dashboard/AllDonationRequests.jsx";
import ManageBlogs from "./Components/Admin dashboard/ManageBlogs.jsx";
import AddBlogs from "./Components/Admin dashboard/AddBlogs.jsx";
import DashboardLayout from "./Components/Admin dashboard/DashboardLayout.jsx";
import axios from "axios";
import VolunteerLayout from "./Components/Volunteer Dashboard/VolunteerLayout.jsx";
import ContentManagement from "./Components/Volunteer Dashboard/ContentManagement.jsx";
import AllRequests from "./Components/Volunteer Dashboard/AllRequests.jsx";
import AllRequestsPage from "./Components/Pages/All Requests/AllRequestsPage.jsx";
import RequestDetails from "./Components/Pages/All Requests/RequestDetails.jsx";
import SearchPage from "./Components/Pages/Search Page/SearchPage.jsx";
import BlogsPage from "./Components/Pages/Blogs Page/BlogsPage.jsx";
import { Toaster } from "react-hot-toast";
import BlogDetails from "./Components/Pages/Blogs Page/BlogDetails.jsx";
import FundingPage from "./Components/Pages/Funding Page/FundingPage.jsx";
import PrivateRoute from "./Components/Private Route/PrivateRoute.jsx";
import AdminRoute from "./Components/Private Route/AdminRoute.jsx";
import VolunteerRoute from "./Components/Private Route/VolunteerRoute.jsx";
import DonorRoute from "./Components/Private Route/DonorRoute.jsx";
import Unauthorize from "./Components/Pages/Unauthorize/Unauthorize.jsx";

axios.defaults.baseURL = "https://blood-donating-website.onrender.com";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/donation-requests",
        Component: AllRequestsPage,
      },
      {
        path: "/dashboard/donation/:id",
        element: (
          <PrivateRoute>
            <RequestDetails></RequestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        Component: SearchPage,
      },
      {
        path: "blogs",
        Component: BlogsPage,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "/funding",
        Component: FundingPage,
      },
    ],
  },
  {
    path: "/dashboard/donor",
    element: (
      <DonorRoute>
        <DonorDashboard />
      </DonorRoute>
    ),
    children: [
      {
        path: "/dashboard/donor",
        element: <DonorHome />,
      },
      {
        path: "profile",
        element: <DonorProfile />,
      },
      {
        path: "my-donation-requests",
        element: <MyRequests />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
    ],
  },

  {
    path: "/dashboard/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard/admin",
        element: <AdminDashboardHome />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "donation-requests",
        element: <AllDonationRequests />,
      },
      {
        path: "content-management",
        element: <ManageBlogs />,
      },

      {
        path: "add-blog",
        element: <AddBlogs />,
      },
    ],
  },

  {
    path: "/dashboard/volunteer",
    element: (
      <VolunteerRoute>
        <VolunteerLayout />
      </VolunteerRoute>
    ),
    children: [
      {
        path: "/dashboard/volunteer",
        element: <AdminDashboardHome />,
      },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "all-donation-requests",
        element: <AllRequests />,
      },
      {
        path: "add-blog",
        element: <AddBlogs />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorize></Unauthorize>,
  },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HeadProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <RouterProvider router={router} />
        </HeadProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
