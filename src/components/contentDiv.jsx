/** @format */

import React from "react";

const ContentDiv = ({ content, onClose }) => {
  return (
    <div className="w-100 my-2  bg-white p-7 text-black text-center shadow-lg ">
      <p>{content}</p>
    </div>
  );
};

export default ContentDiv;
