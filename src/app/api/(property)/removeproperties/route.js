/** @format */

import Property from "@/models/property.model";
import { connect } from "@/utils/dbConnect";
import { DeleteOnCloudinary } from "@/utils/deleteOnCloudinary";
import { NextResponse } from "next/server";
connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "To remove property there must be specific id" },
        { status: 400 },
      );
    }
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { error: "Failed! Try again later" },
        { status: 400 },
      );
    }

    try {
      await DeleteOnCloudinary(property.imagePublicId);
    } catch (error) {
      throw new Error("Cloudinary Error :" + error.message);
    }
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return NextResponse.json(
        { error: "Error in Deleting Property" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "Property Deleted Successfully",
      status: "200",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error! Please try again later.",
      },
      { status: "500" },
    );
  }
};
