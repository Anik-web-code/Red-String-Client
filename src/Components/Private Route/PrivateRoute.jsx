import { use } from "react";
import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../Context/AuthContext";
import Loader from "../Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/Login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
