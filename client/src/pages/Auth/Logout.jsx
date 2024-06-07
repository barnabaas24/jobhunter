import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../state/authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return <Navigate to={"/"} />;
};

export default Logout;
