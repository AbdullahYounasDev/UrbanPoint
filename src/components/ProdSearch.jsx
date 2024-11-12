import React from "react";

const ProdSearch = () => {
  return (
    <div className="flex gap-2 border-2 rounded-full">
      <input
        className="border-0 shadow-none rounded-full outline-none"
        type="text"
        placeholder="Search Bar"
      />
      <button>Search</button>
    </div>
  );
};

export default ProdSearch;
