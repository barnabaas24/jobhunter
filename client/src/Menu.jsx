import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  return (
    <div className="navbar bg-base-100">
      <NavLink className="btn btn-ghost text-xl" to="/">
        JobHunter
      </NavLink>
      {isAuthenticated ? (
        <></>
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
