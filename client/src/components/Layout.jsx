import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const Layout = () => {
  return (
    <div className="container mx-auto p-4">
      <Menu />
      <div className="w-3/4 pt-8 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
