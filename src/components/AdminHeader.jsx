/** @format */
"use client";
import { useSession } from "next-auth/react";
import AdminNavIcon from "./AdminNavIcon";
import UserProfile from "./UserProfile";
import { useState } from "react";

const AdminHeader = () => {
  const { status, data } = useSession();
  const [showProfile, setShowProfile] = useState(false);
  return (
    <nav className="first-nav flex justify-between items-center bg-white py-5 px-8 w-[100%]">
      <div className="w-[100px]">
        <img
          className="w-[100%]"
          src="https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/logourbanpoint.png"
          alt="logo"
        />
      </div>
      <div className="flex gap-2 justify-center items-center">
        <AdminNavIcon />
        <div>
          {status === "authenticated" ? (
            <div>
              <button
                className=" font-bold h-[40px] rounded-[50px] flex gap-1 justify-center items-center relative"
                onClick={() => setShowProfile(!showProfile)}>
                {data && <div>{data.user.name.slice(0, 1).toUpperCase()}</div>}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {showProfile && (
        <UserProfile data={data} setShowProfile={setShowProfile} />
      )}
    </nav>
  );
};

export default AdminHeader;
