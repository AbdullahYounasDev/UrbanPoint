import Property from "@/models/property.model";
import { connect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    if (!id) {
      NextResponse.json(
        { error: "To remove property there must be specific id" },
        { status: 400 },
      );
    }

    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      NextResponse.json(
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
