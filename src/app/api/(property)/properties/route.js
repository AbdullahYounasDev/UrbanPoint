/** @format */

import Property from "@/models/property.model";
import { connect } from "@/utils/dbConnect";
import { uploadOnCloudinary } from "@/utils/uploadOnCloudinary";
import { NextResponse } from "next/server";

connect();

export const POST = async (request) => {
  try {
    const formData = await request.formData();

    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const image = formData.get("image");
    const propertyType = formData.get("propertyType")?.trim();
    const bathrooms = formData.get("bathrooms");
    const bedrooms = formData.get("bedrooms");
    const price = formData.get("price");
    const address = formData.get("address")?.trim();

    // Basic validation checks
    if (
      !title ||
      !description ||
      !image ||
      !propertyType ||
      !bathrooms ||
      !bedrooms ||
      !price ||
      !address
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Additional checks for specific fields
    if (typeof title !== "string" || title.length < 3) {
      return NextResponse.json(
        { error: "Title must be at least 3 characters long." },
        { status: 400 },
      );
    }

    if (typeof description !== "string" || description.length < 10) {
      return NextResponse.json(
        { error: "Description must be at least 10 characters long." },
        { status: 400 },
      );
    }

    if (isNaN(bedrooms) || bedrooms <= 0) {
      return NextResponse.json(
        { error: "Bedrooms must be a positive number." },
        { status: 400 },
      );
    }

    if (isNaN(bathrooms) || bathrooms <= 0) {
      return NextResponse.json(
        { error: "Bathrooms must be a positive number." },
        { status: 400 },
      );
    }

    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number." },
        { status: 400 },
      );
    }

    // Upload image to Cloudinary
    const uploadCloudinary = await uploadOnCloudinary(
      image,
      "urban-point-gallery",
    );

    // Save the property to the database
    const newProperty = new Property({
      title,
      description,
      image: uploadCloudinary.url, // Assuming Cloudinary returns a URL for the uploaded image
      propertyType,
      bathrooms: Number(bathrooms),
      bedrooms: Number(bedrooms),
      price: Number(price),
      address,
      status: "Available",
    });

    await newProperty.save();

    return NextResponse.json({
      message: "Property added successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Server Error! Please try again later." },
      { status: 500 },
    );
  }
};
