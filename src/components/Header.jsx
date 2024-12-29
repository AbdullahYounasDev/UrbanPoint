/** @format */

import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UserNavIcon from "./UserNavIcon";

const Header = async () => {
  const user = await currentUser();
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
            <Link href="http://localhost:3000/#listing">Listing</Link>
          </li>
          {user ? (
            <li>
              <Link href="/user/transaction">Transactions</Link>
            </li>
          ) : null}
          <li>
            <Link href="/#about">About</Link>
          </li>
          <li>
            <Link href="http://localhost:3000/#contact">Contact</Link>
          </li>
        </ul>
        <div className="flex gap-3 items-center">
          <UserNavIcon />
          {user ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
            <div>
              <a href="/sign-in">
                <button className="px-3 py-1 font-bold h-[40px] rounded-[50px] flex gap-1 justify-center items-center">
                  <FontAwesomeIcon
                    className="w-[20px] text-white"
                    icon={faUser}
                  />
                  Sign In
                </button>
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
