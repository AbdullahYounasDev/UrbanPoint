import Contact from "@/models/contact.model";
import { NextResponse } from "next/server";
import { connect } from "@/utils/dbConnect";

connect();

export const GET = async () => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { contacts: "No messages found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: contacts, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error! Please try again later.",
      },
      { status: "500" },
    );
  }
};
