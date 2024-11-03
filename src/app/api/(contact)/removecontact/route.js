import Contact from "@/models/contact.model";
import { connect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    if (!id) {
      NextResponse.json(
        { error: "To remove contact there must be specific id" },
        { status: 400 },
      );
    }

    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      NextResponse.json(
        { error: "Error in Deleting contact" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "Message Deleted Successfully",
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
