/** @format */
"use client";
import { faClose, faNavicon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ResponsiveAdminNav from "./ResponsiveAdminNav";

const AdminHeader = () => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <nav className="first-nav flex justify-between items-center bg-white py-5 px-8 w-[100%]">
      <div className="w-[100px]">
        <img
          className="w-[100%]"
          src="https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/logourbanpoint.png"
          alt="logo"
        />
      </div>
      <div className="lg:hidden block">
        <FontAwesomeIcon
          icon={faNavicon}
          className="text-sky-1 cursor-pointer"
          onClick={() => setOpenNav(true)}
        />
        {openNav ? (
          <ResponsiveAdminNav openNav={openNav} setOpenNav={setOpenNav} />
        ) : null}
      </div>
    </nav>
  );
};

export default AdminHeader;
