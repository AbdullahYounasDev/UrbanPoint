/** @format */
"use client";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import VideoComponent from "./VideoComponent";

const About = () => {
  const [show, setshow] = useState(false);
  return (
    <div
      id="about"
      className="p-4 my-20 relative"
      style={{
        backgroundImage: "url('/about.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="w-[80%] m-auto my-20">
        <div
          className="w-[150px] h-[150px] cursor-pointer bg-white/25 rounded-full m-auto flex justify-center items-center hover:scale-110 transition-all duration-300"
          onClick={() => setshow(true)}>
          <div className="w-[100px] h-[100px] flex justify-center items-center bg-white rounded-full m-auto">
            <FontAwesomeIcon
              className="text-sky-1 text-[24px]"
              icon={faVideo}
            />
          </div>
        </div>
        <h1 className="sm:text-[70px] text-[40px] text-white text-center font-bold">
          The Modern House
        </h1>
        <div className="para_div text-white text-center text-[24px]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do diam
            eiusmod tempor magna aliqua sed ut enim ad minim veniam, quis
            nostrud.
          </p>
        </div>
      </div>
      {show && <VideoComponent close={() => setshow(false)} />}
    </div>
  );
};

export default About;
