/** @format */

import {
  faClose,
  faComment,
  faDashboard,
  faEarth,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const ResponsiveAdminNav = ({ openNav, setOpenNav }) => {
  return (
    <nav className="fixed flex items-center min-h-[100vh] lg:block z-40 left-0 top-0 shadow-lg bg-black bg-opacity-50 w-full">
      <div className="h-full flex justify-start items-start gap-20 flex-col w-[250px] pl-7 pt-7 bg-white relative">
        <FontAwesomeIcon
          icon={faClose}
          className="text-sky-1 cursor-pointer absolute right-2 top-2"
          onClick={() => setOpenNav(false)}
        />
        <div className="w-[100px]">
          <img
            className="w-[100%]"
            src="https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/logourbanpoint.png"
            alt="logo"
          />
        </div>
        <ul className="flex flex-col gap-7  items-start justify-start">
          <li>
            <Link
              href={"/admin/dashboard"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all ">
              {" "}
              <FontAwesomeIcon
                className="w-[20px] text-sky-1"
                icon={faDashboard}
              />{" "}
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/listings"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all">
              {" "}
              <FontAwesomeIcon
                className="w-[20px] text-sky-1"
                icon={faEarth}
              />{" "}
              Listings
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/users"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all">
              {" "}
              <FontAwesomeIcon
                className="w-[20px] text-sky-1"
                icon={faUsers}
              />{" "}
              Users
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/messages"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all">
              {" "}
              <FontAwesomeIcon
                className="w-[20px] text-sky-1"
                icon={faComment}
              />{" "}
              Messages
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ResponsiveAdminNav;
