/** @format */
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const SearchResult = ({ close, properties }) => {
  return (
    <div className="absolute z-50 top-0 left-0 w-full min-h-[100vh] h-auto bg-black/50 flex justify-center items-center">
      <div className="w-[60%] h-auto m-auto my-20 relative bg-white rounded-xl p-3">
        <h1 className="text-black text-[24px] font-bold m-3">Search Result:</h1>
        <FontAwesomeIcon
          className="text-sky-1 absolute right-2 top-2 cursor-pointer z-10"
          onClick={() => close()}
          icon={faClose}
        />
        <div
          id="listing_div"
          className="p-3 m-3"
          style={{ justifyContent: "flex-start" }}>
          {properties.map((property, index) => (
            <Link href={`/singleproperty/${property._id}`} key={property._id}>
              <div className="list">
                <div className="shine"></div>
                <img
                  src={property.image}
                  alt={property.title}
                  style={{ width: "350px", height: "250px" }}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col gap-1 mt-3">
                  <div className="list_class flex justify-between items-center font-light">
                    <h3>{property.title}</h3>
                    <p>{property.propertyType}</p>
                  </div>
                  <div className="list_class flex justify-between items-center font-light">
                    <h3>{property.bathrooms} bathrooms</h3>
                    <p>{property.price} -/RS</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
