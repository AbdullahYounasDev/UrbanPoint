/** @format */
"use client";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ResponsiveAdminNav from "./ResponsiveAdminNav";

const AdminNavIcon = () => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
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
    </>
  );
};

export default AdminNavIcon;
