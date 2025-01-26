/** @format */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import AdminHeader from "@/components/AdminHeader";
import AdminNav from "@/components/AdminNav";
import React, { useEffect } from "react";

export default function RootLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (status === "authenticated" &&
        session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)
    ) {
      router.push("/"); // Redirect unauthorized users to the homepage or login page.
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <Loader />;
  }

  if (
    status === "authenticated" &&
    session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    return (
      <html lang="en">
        <body>
          <AdminHeader />
          <div className="flex justify-start w-[100%] gap-16">
            <AdminNav />
            {children}
          </div>
        </body>
      </html>
    );
  }

  // If not authenticated or the email doesn't match, prevent rendering the layout.
  return null;
}
