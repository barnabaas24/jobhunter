import React from "react";
import { selectUserRole } from "../../state/authSlice";
import { useSelector } from "react-redux";

const CompanyRoleRequired = ({ children }) => {
  const userRole = useSelector(selectUserRole);

  if (userRole === "company") {
    return children;
  }

  return <Navigate to={"/"} />;
};

export default CompanyRoleRequired;
