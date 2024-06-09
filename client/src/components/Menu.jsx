import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout, selectUserRole } from "../state/authSlice";

const Menu = () => {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);
  const userRole = useSelector(selectUserRole);
  const isCompany = userRole === "company";
  const dispatch = useDispatch();

  return (
    <div className="navbar bg-primary">
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
          <button onClick={() => dispatch(logout())} className="btn btn-ghost text-xl">
            Kijelentkezés
          </button>
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
