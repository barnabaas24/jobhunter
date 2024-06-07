import React from "react";
import { selectUserRole } from "../../state/authSlice";
import { useSelector } from "react-redux";

const JobSeekerRoleRequired = ({ children }) => {
  const userRole = useSelector(selectUserRole);

  if (userRole === "jobseeker") {
    return children;
  }

  return <Navigate to={"/"} />;
};

export default JobSeekerRoleRequired;
