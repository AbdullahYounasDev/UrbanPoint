/** @format */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyPage = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState();
  const [property, setProperty] = useState();

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true); // Start loading before the API call
      try {
        const response = await axios.get(`/api/property/${id}`);
        const { data } = response;

        if (!data || !data.data) {
          throw new Error("Invalid data received from the server.");
        }

        setProperty(data.data);
      } catch (err) {
        // Set a user-friendly error message
        setError(
          err.response?.data?.error ||
            "Failed to fetch property data. Please try again.",
        );
      } finally {
        setLoading(false); // Stop loading once the API call finishes
      }
    };

    fetchProperty();
  }, [id]);

  // Render loading state while the data is being fetched
  if (loading || !property) {
    return <div>Loading...</div>;
  }

  // Render the property details once data is available
  return (
    <div>
      <img src={property.image} />
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <p>Location: {property.address}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Status: {property.status}</p>
      <p>Property Type: {property.propertyType}</p>
    </div>
  );
};

export default PropertyPage;
