/** @format */

"use client";
import AddProdPage from "@/components/AddProdPage";
import ListingTable from "@/components/ListingTable";
import ProdSearch from "@/components/ProdSearch";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const page = () => {
  const [show, setShow] = useState(false);
  const showAddProd = () => {
    setShow(true);
  };
  return (
    <div className="w-full">
      <div className="flex gap-3 w-[95%] justify-end">
        <ProdSearch />
        <button onClick={showAddProd} className="px-3 py-2">
          Add Listings
        </button>
      </div>
      {show && <AddProdPage onClose={() => setShow(false)} />}
      <ListingTable />
    </div>
  );
};

export default page;
