import Contact from "@/models/contact.model";
import { NextResponse } from "next/server";
import { connect } from "@/utils/dbConnect";

connect();
export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, subject, message, phoneNumber } = reqBody;

    if (!firstName || !lastName || !subject || !message || !phoneNumber) {
      return NextResponse.json(
        { error: "All Fields Are Necessary" },
        { status: 400 },
      );
    }

    const newMessage = new Contact({
      firstName,
      lastName,
      phoneNumber,
      subject,
      message,
    });

    const Message = await newMessage.save();
    if (!Message) {
      return NextResponse.json(
        { error: "Message is not saved properly" },
        { status: 400 },
      );
    }
    return NextResponse.json({
      message: "Your Message is Sended",
      status: 200,
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
