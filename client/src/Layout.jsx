import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const Layout = () => {
  return (
    <div className="">
      <Menu />
      <Outlet />
    </div>
  );
};

export default Layout;
