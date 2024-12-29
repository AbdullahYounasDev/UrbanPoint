/** @format */
"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const VideoComponent = ({ close }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="w-[80%] h-[400px] m-auto my-20 relative bg-black rounded-xl">
        <FontAwesomeIcon
          className="text-white absolute right-2 top-2 cursor-pointer z-10"
          onClick={() => close()}
          icon={faClose}
        />
        <video
          src="/property.mp4"
          controls
          className="w-full h-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default VideoComponent;
