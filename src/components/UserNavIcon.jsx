/** @format */
"use client";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ResponsiveUserNav from "./ResponsiveUserNav";

const UserNavIcon = () => {
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
          <ResponsiveUserNav openNav={openNav} setOpenNav={setOpenNav} />
        ) : null}
      </div>
    </>
  );
};

export default UserNavIcon;
