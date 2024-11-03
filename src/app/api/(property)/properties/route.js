import Property from "@/models/property.model";
// import { uploadOnCloudinary } from "@/utils/uploadOnCloudinary";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const {
      title,
      description,
      image,
      status,
      propertyType,
      bathrooms,
      bedrooms,
      price,
      address,
    } = reqBody;

    if (
      !title ||
      !description ||
      !image ||
      !status ||
      !propertyType ||
      !bathrooms ||
      !bedrooms ||
      !price ||
      !address
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }
    // const cloudImage = uploadOnCloudinary(image, "Rental-website-gallery");
    const newProperty = new Property({
      title,
      description,
      image,
      status,
      propertyType,
      bathrooms,
      bedrooms,
      price,
      address,
    });

    if (!newProperty) {
      return NextResponse.json(
        { error: "Error while creating this property" },
        { status: 400 },
      );
    }

    const saveProperty = await newProperty.save();
    if (!saveProperty) {
      return NextResponse.json(
        { error: "Error while saving this property" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "Property Added Successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server Error ! Please try again later" },
      { status: 500 },
    );
  }
};
