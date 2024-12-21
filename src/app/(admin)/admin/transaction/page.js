/** @format */
"use client";
import Loader from "@/components/Loader";
import TransactionTable from "@/components/TransactionTable";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  if (!user) {
    return <Loader />;
  }

  useEffect(() => {
    if (
      !isSignedIn ||
      !user?.emailAddresses?.[0]?.emailAddress ||
      user.emailAddresses[0].emailAddress !==
        process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      router.push("/");
    }
  }, [isSignedIn, user, router]);
  return (
    <div className="w-full">
      <TransactionTable />
    </div>
  );
};

export default page;
