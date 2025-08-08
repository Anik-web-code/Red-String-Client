import React from "react";

import { Outlet } from "react-router";
import Footer from "./Footer";
import NavBar from "./Navbar";


const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
