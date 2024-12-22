/** @format */

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const ResponsiveUserNav = ({ openNav, setOpenNav }) => {
  return (
    <nav className="fixed flex items-center  lg:block z-40 left-0 top-0 shadow-lg bg-black bg-opacity-50 w-full">
      <div className="min-h-[100vh] flex justify-start items-start gap-20 flex-col w-[250px] pl-7 pt-7 bg-white relative">
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
              href={"/"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all ">
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/#Listing"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all">
              Listing
            </Link>
          </li>
          <li>
            <Link
              href={"/user/transaction"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all">
              Transactions
            </Link>
          </li>

          <li>
            <Link
              href={"/about"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all">
              About
            </Link>
          </li>
          <li>
            <Link
              href={"/#contact"}
              className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ResponsiveUserNav;
