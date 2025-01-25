/** @format */

"use client";
import AddProdPage from "@/components/AddProdPage";
import ListingTable from "@/components/ListingTable";
import ProdSearch from "@/components/ProdSearch";
import React, { useState } from "react";

const ListingsPage = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [checkData, setCheckData] = useState(false);

  const showAddProd = () => {
    setShow(true);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 w-full sm:justify-end justify-center">
        <ProdSearch setSearch={setSearch} search={search} />
        <button onClick={showAddProd} className="px-3 py-2 mx-3">
          Add Listings
        </button>
      </div>
      {show && (
        <AddProdPage
          onClose={() => setShow(false)}
          setCheckData={setCheckData}
        />
      )}
      <ListingTable
        searchResult={search}
        setCheckData={setCheckData}
        checkData={checkData}
      />
    </div>
  );
};

export default ListingsPage;
