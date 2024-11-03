import {
  faComment,
  faDashboard,
  faEarth,
  faList,
  faLocation,
  faMessage,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const AdminNav = () => {
  return (
    <nav className="flex justify-between w-[200px] items-center py-10">
      <ul className="px-8 flex flex-col gap-12 bg-white items-start">
        <li>
          <Link
            href={"/admin/dashboard"}
            className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all "
          >
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
            className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all"
          >
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
            className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all"
          >
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
            className="text-black flex gap-2 justify-start items-center py-3 px-2 w-[150px] rounded-md hover:bg-gray-200 hover:transition-all"
          >
            {" "}
            <FontAwesomeIcon
              className="w-[20px] text-sky-1"
              icon={faComment}
            />{" "}
            Messages
          </Link>
        </li>
      </ul>
      <div className="h-[80%] border-[1px] border-gray-300 rounded-2xl"></div>
    </nav>
  );
};

export default AdminNav;
