import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const Layout = () => {
  return (
    <div>
      <Menu />
      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
