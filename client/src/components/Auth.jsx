import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Auth({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={"/"} />;
}
