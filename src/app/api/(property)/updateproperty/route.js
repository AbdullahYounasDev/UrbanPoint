/** @format */

import Property from "@/models/property.model";
import { connect } from "@/utils/dbConnect";
import { uploadOnCloudinary } from "@/utils/uploadOnCloudinary";
import { DeleteOnCloudinary } from "@/utils/deleteOnCloudinary";
import { NextResponse } from "next/server";

connect();

export const PUT = async (request) => {
  try {
    const formData = await request.formData();

    // Get property ID from formData
    const id = formData.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required." },
        { status: 400 },
      );
    }

    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 },
      );
    }

    // Extract updated fields from formData
    const title = formData.get("title")?.trim() || property.title;
    const description =
      formData.get("description")?.trim() || property.description;
    const propertyType =
      formData.get("propertyType")?.trim() || property.propertyType;
    const bathrooms = formData.get("bathrooms") || property.bathrooms;
    const bedrooms = formData.get("bedrooms") || property.bedrooms;
    const price = formData.get("price") || property.price;
    const address = formData.get("address")?.trim() || property.address;

    // Handle image upload/update
    let updatedImage = property.image;
    let updatedImagePublicId = property.imagePublicId;
    const newImage = formData.get("image");

    if (newImage) {
      // Delete the old image from Cloudinary
      if (property.imagePublicId) {
        await DeleteOnCloudinary(property.imagePublicId);
      }

      const uploadCloudinary = await uploadOnCloudinary(
        newImage,
        "urban-point-gallery",
      );
      updatedImage = uploadCloudinary.url;
      updatedImagePublicId = uploadCloudinary.public_id;
    }

    // Update property details
    property.title = title;
    property.description = description;
    property.image = updatedImage;
    property.imagePublicId = updatedImagePublicId;
    property.propertyType = propertyType;
    property.bathrooms = Number(bathrooms);
    property.bedrooms = Number(bedrooms);
    property.price = Number(price);
    property.address = address;

    await property.save();

    return NextResponse.json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Server Error! Please try again later." },
      { status: 500 },
    );
  }
};
