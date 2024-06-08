import React from "react";
import { selectUserRole } from "../../state/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CompanyRoleRequired = ({ children }) => {
  const userRole = useSelector(selectUserRole);

  if (userRole === "company") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default CompanyRoleRequired;
