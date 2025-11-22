import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, replace } from "react-router-dom";
export const PrivateRoute = () => {
  const loggedIn = useSelector((state) => state.User.LoggedIn);
  return loggedIn ? <Outlet /> : <Navigate to='/login' replace/>
};

export default PrivateRoute;
