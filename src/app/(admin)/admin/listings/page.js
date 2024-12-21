/** @format */

"use client";
import AddProdPage from "@/components/AddProdPage";
import ListingTable from "@/components/ListingTable";
import Loader from "@/components/Loader";
import ProdSearch from "@/components/ProdSearch";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const showAddProd = () => {
    setShow(true);
  };
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 w-full sm:justify-end justify-center ">
        <ProdSearch setSearch={setSearch} search={search} />
        <button onClick={showAddProd} className="px-3 py-2 mx-3">
          Add Listings
        </button>
      </div>
      {show && <AddProdPage onClose={() => setShow(false)} />}
      <ListingTable searchResult={search} />
    </div>
  );
};

export default page;
