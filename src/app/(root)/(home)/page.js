/** @format */
"use client";

import About from "@/components/About";
import Contact from "@/components/ContactForms";
import HeroSec from "@/components/HeroSec";
import Listings from "@/components/listings";
import PushCall from "@/components/PushCall";
import { fetchProperties } from "@/utils/properties/fetchProperties";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        setNotification({
          message: error.message,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  return (
    <>
      <HeroSec />
      <Listings
        isLoading={isLoading}
        properties={properties}
        notification={notification}
        setNotification={setNotification}
      />
      <About />
      <Contact />
      <PushCall />
    </>
  );
};

export default Home;
