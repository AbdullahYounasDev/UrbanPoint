/** @format */

"use client";
import AddProdPage from "@/components/AddProdPage";
import ListingTable from "@/components/ListingTable";
import ProdSearch from "@/components/ProdSearch";
import React, { useState } from "react";

const page = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const showAddProd = () => {
    setShow(true);
  };
  return (
    <div className="w-full">
      <div className="flex gap-3 w-[95%] justify-end">
        <ProdSearch setSearch={setSearch} search={search} />
        <button onClick={showAddProd} className="px-3 py-2">
          Add Listings
        </button>
      </div>
      {show && <AddProdPage onClose={() => setShow(false)} />}
      <ListingTable searchResult={search} />
    </div>
  );
};

export default page;
