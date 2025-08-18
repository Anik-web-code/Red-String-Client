import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import { Navigate, useLocation } from "react-router";
import Loader from "../Loader/Loader";

const VolunteerRoute = ({ children }) => {
  const { user, loading, role } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;

  if (user && role === "volunteer") return children;

  return <Navigate to="/unauthorized" state={location.pathname} />;
};

export default VolunteerRoute;
