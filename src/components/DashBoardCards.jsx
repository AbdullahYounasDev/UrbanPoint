/** @format */

import {
  faGlobeAmericas,
  faHandHoldingDollar,
  faUser,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const DashBoardCards = ({
  id,
  title,
  numbers,
  type,
  desc,
  firstname,
  lastname,
  width,
  func,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.post("/api/removecontact", { id });
      if (response) {
        setIsDeleted(true);
      }
    } catch (err) {}
  };
  if (isDeleted) return null;

  return (
    <div
      style={{ width: width }}
      className={`bg-white rounded-lg shadow-2xl border-sky-1 border-[1px] flex justify-${
        desc ? "start" : "center"
      } items-${desc ? "start" : "center"} flex-col gap-3  p-4 my-2`}>
      {type == "All Times" ? (
        <FontAwesomeIcon
          icon={faUser}
          className="w-[40px] text-[30px] text-black"
        />
      ) : type === "Our Recent Users" ? (
        <FontAwesomeIcon
          icon={faUserClock}
          className="w-[40px] text-[30px] text-black"
        />
      ) : type === "All Listings" ? (
        <FontAwesomeIcon
          icon={faGlobeAmericas}
          className="w-[40px] text-[30px] text-black"
        />
      ) : type === "Sold Listings" ? (
        <FontAwesomeIcon
          icon={faHandHoldingDollar}
          className="w-[40px] text-[30px] text-black"
        />
      ) : (
        ""
      )}
      <div
        className={`flex items-${desc ? "start" : "center"} justify-${
          desc ? "start" : "center"
        } flex-col`}>
        {firstname && lastname ? (
          <h2
            className={`text-[14px] text-${
              desc ? "start" : "center"
            } font-bold text-sky-1`}>
            {firstname + " " + lastname}
          </h2>
        ) : null}
        {title ? (
          <h3
            className={`text-${desc ? "[20px]" : "[14px]"}  text-${
              desc ? "start" : "center"
            } font-medium text-${desc ? "black" : "gray-400"} `}>
            {title}
          </h3>
        ) : null}
        {type ? <h5 className="text-xl font-bold">{type}</h5> : null}
        {desc ? (
          <p className="text-[12px] text-start text-black">{desc}</p>
        ) : null}
      </div>
      {numbers ? (
        <h4
          className={`${
            desc ? "text-[14px]" : "text-3xl"
          } font-bold text-sky-1`}>
          {desc ? "Phone : +" : ""}
          {numbers}
        </h4>
      ) : null}
      {func ? (
        <button onClick={handleDelete} className="bg-red-500 font-bold">
          Delete
        </button>
      ) : null}
    </div>
  );
};

export default DashBoardCards;
