/** @format */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UserNavIcon from "./UserNavIcon";
import { useSession } from "next-auth/react";
import { useState } from "react";
import UserProfile from "./UserProfile";

const Header = () => {
  const { status, data } = useSession();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="w-[100%]">
      <nav className="flex justify-between items-center w-[100%] bg-white py-5 px-3">
        <div className="w-[150px]">
          <img
            className="w-[100%]"
            src="https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/logourbanpoint.png"
            alt="logo"
          />
        </div>
        <ul className=" gap-10 font-bold md:flex hidden">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#listing">Listing</Link>
          </li>
          <li>
            <Link href="/#about">About</Link>
          </li>
          <li>
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
        <div className="flex gap-3 items-center">
          <UserNavIcon />
          {status === "authenticated" ? (
            <div>
              <button
                className=" font-bold h-[40px] rounded-[50px] flex gap-1 justify-center items-center relative"
                onClick={() => setShowProfile(!showProfile)}>
                {data && <div>{data.user.name.slice(0, 1).toUpperCase()}</div>}
              </button>
            </div>
          ) : (
            <div>
              <a href="/login">
                <button className="px-3 py-1 font-bold h-[40px] rounded-[50px] flex gap-1 justify-center items-center">
                  <FontAwesomeIcon
                    className="w-[20px] text-white"
                    icon={faUser}
                  />
                  Log In
                </button>
              </a>
            </div>
          )}
        </div>
      </nav>
      {showProfile && (
        <UserProfile data={data} setShowProfile={setShowProfile} />
      )}
    </header>
  );
};

export default Header;
