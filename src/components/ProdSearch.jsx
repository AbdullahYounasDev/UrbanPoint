/** @format */

import React, { useState } from "react";
import Notification from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ProdSearch = ({ setSearch, search }) => {
  return (
    <div className="flex gap-2 border-2 rounded-full justify-between items-center">
      <input
        className="border-0 shadow-none rounded-full outline-none"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Bar"
      />
      <div>
        <FontAwesomeIcon icon={faSearch} className="px-4 text-sky-1" />
      </div>
    </div>
  );
};

export default ProdSearch;
