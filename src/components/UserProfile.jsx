/** @format */

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import React from "react";

const UserProfile = ({ data, setShowProfile }) => {
  return (
    <div className="absolute right-1 top-[80px] rounded-sm bg-white p-5 w-[400px] border border-gray-200 z-50">
      <div
        onClick={() => setShowProfile(false)}
        className="text-sky-1 absolute right-2 top-2 cursor-pointer">
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="flex items-center gap-5 ">
        <div className="px-3 py-1 font-bold min-h-[70px] min-w-[70px] rounded-[50px] flex gap-1 justify-center items-center bg-sky-1">
          <h1 className="text-white font-bold text-[35px]">
            {data.user.name.slice(0, 1).toUpperCase()}
          </h1>
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-black">{data.user.name}</h2>
          <h2 className="text-[15px] font-bold text-black/70">
            {data.user.email}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <a href="/user/transaction" className="text-blue-500">
          <button className="px-3 py-1 font-bold w-full rounded-[50px] flex gap-1 justify-center items-center relative">
            Transactions
          </button>
        </a>
        <button
          className="bg-red-500 text-white px-3  py-1 font-bold w-full rounded-[50px] flex gap-1 justify-center items-center relative"
          onClick={() => signOut({ callbackUrl: "/login" })}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
