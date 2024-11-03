import Property from "@/models/property.model";
import { NextResponse } from "next/server";
import { connect } from "@/utils/dbConnect";
connect();

export const GET = async () => {
  try {
    const properties = await Property.find();
    if (!properties) {
      return NextResponse.json({ error: "No Property Found" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Data Fetched Successfully",
      status: 200,
      data: properties,
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
