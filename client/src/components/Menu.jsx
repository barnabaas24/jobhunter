import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserRole } from "../state/authSlice";

const Menu = () => {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);
  const userRole = useSelector(selectUserRole);
  const isCompany = userRole === "company";

  return (
    <div className="navbar bg-base-100">
      <NavLink className="btn btn-ghost text-xl" to="/">
        Álláshírdetések
      </NavLink>
      {isAuthenticated ? (
        <>
          {isCompany ? (
            <>
              <NavLink className="btn btn-ghost text-xl" to="/companyprofile">
                Profilom
              </NavLink>
              <NavLink className="btn btn-ghost text-xl" to="/createjob">
                Álláshírdetés hozzáadása
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="btn btn-ghost text-xl" to="/profile">
                Profilom
              </NavLink>
            </>
          )}
          <NavLink className="btn btn-ghost text-xl" to="/logout">
            Kijelentkezés
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="btn btn-ghost text-xl" to="/login">
            Bejelentkezés
          </NavLink>
          <NavLink className="btn btn-ghost text-xl" to="/register">
            Regisztráció
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Menu;
