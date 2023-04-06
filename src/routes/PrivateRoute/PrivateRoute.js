import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import LoaderSpinner from "../../shared/Navbar/LoaderSpinner/LoaderSpinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <LoaderSpinner />;
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
