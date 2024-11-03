import Property from "@/models/property.model";
import { connect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

connect();

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { error: "No property found with this ID." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Property Fetched Successfully",
      status: 200,
      data: property,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error! Please try again later." },
      { status: 500 },
    );
  }
};
