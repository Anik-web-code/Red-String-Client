import { useContext } from "react";
import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../Context/AuthContext";
import Loader from "../Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading, role } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;

  if (user && role === "admin") return children;

  return <Navigate to="/unauthorized" state={location.pathname} />;
};

export default AdminRoute;
