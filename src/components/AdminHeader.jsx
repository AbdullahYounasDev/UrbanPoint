/** @format */
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import AdminNavIcon from "./AdminNavIcon";

const AdminHeader = async () => {
  const user = await currentUser();
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
          {user && (
            <SignedIn>
              <UserButton />
            </SignedIn>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
