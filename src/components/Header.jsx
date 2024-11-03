import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();
  return (
    <header>
      <nav className="flex justify-between items-center w-[100%] bg-white py-5 px-3">
        <div className="w-[150px]">
          <img
            className="w-[100%]"
            src="https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/logourbanpoint.png"
            alt="logo"
          />
        </div>
        <ul className="flex gap-10 font-bold">
          <li>
            <Link href="#image">Home</Link>
          </li>
          <li>
            <Link href="#listing">Listing</Link>
          </li>
          <li>
            <Link href="/about.html">About</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
        <div>
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
