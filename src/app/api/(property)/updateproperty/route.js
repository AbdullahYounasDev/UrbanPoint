import Property from "@/models/property.model";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { id, ...fieldsToUpdate } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required to update" },
        { status: 400 },
      );
    }
    // second step....it convert each arrays value pair into object value pair e.g[[title:something], [price: 123], [bathroom: undefined]] to {title: something, pice: 123}
    const filteredFields = Object.fromEntries(
      // First Step...Object.entries covert object into array value pair...mean [[title:something], [price: 123], [bathroom: undefined]]
      Object.entries(fieldsToUpdate).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    if (Object.keys(filteredFields).length === 0) {
      return NextResponse.json(
        { error: "No fields provided to update" },
        { status: 400 },
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: filteredFields },
      { new: true, runValidators: true },
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "Property updated successfully",
      status: 200,
      data: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Server Error! Please try again later." },
      { status: 500 },
    );
  }
};
