/** @format */

import About from "@/components/About";
import Contact from "@/components/ContactForms";
import HeroSec from "@/components/HeroSec";
import Listings from "@/components/listings";
import PushCall from "@/components/PushCall";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSec />
      <Listings />
      <About />
      <Contact />
      <PushCall />
    </>
  );
};

export default Home;
