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
    <div className="navbar bg-primary flex gap-1">
      <NavLink
        className={({ isActive }) => `btn btn-ghost text-xl ${isActive ? "btn-active font-bold" : ""}`}
        to="/"
      >
        Álláshírdetések
      </NavLink>
      {isAuthenticated ? (
        <>
          {isCompany ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `btn btn-ghost text-xl ${isActive ? "btn-active font-bold" : ""}`
                }
                to="/companyprofile"
              >
                Profilom
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `btn btn-ghost text-xl ${isActive ? "btn-active font-bold" : ""}`
                }
                to="/createjob"
              >
                Álláshírdetés hozzáadása
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `btn btn-ghost text-xl ${isActive ? "btn-active font-bold" : ""}`
                }
                to="/profile"
              >
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
          <NavLink
            className={({ isActive }) => `btn btn-ghost text-xl ${isActive ? "btn-active font-bold" : ""}`}
            to="/login"
          >
            Bejelentkezés
          </NavLink>
          <NavLink
            className={({ isActive }) => `btn btn-ghost text-xl ${isActive ? "btn-active font-bold" : ""}`}
            to="/register"
          >
            Regisztráció
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Menu;
