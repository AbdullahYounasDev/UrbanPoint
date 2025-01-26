/** @format */
import NextUser from "@/models/nextuser.model";
import { connect } from "@/utils/dbConnect";
import { sendEmail } from "@/utils/sendEmail";
import { NextResponse } from "next/server";
await connect();
export const POST = async (req) => {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;
    const exsistedUser = await NextUser.findOne({ email });
    if (exsistedUser) {
      return NextResponse.json(
        { erorr: "User Already Exists" },
        { status: 400 },
      );
    }
    const newUser = new NextUser({ name, email, password });

    const subject = "Welcome to Our App!";
    const text = `Hi ${name}, welcome to our application!`;
    const html = `<p>Hi <strong>${name}</strong>,</p><p>Welcome to our application! We're excited to have you onboard.</p>`;

    await sendEmail(email, subject, text, html);

    const user = await newUser.save();
    return NextResponse.json({
      message: "User Created",
      status: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error! Please try again later.",
      },
      { status: 500 },
    );
  }
};
export const GET = async (req) => {
  try {
    const user = await NextUser.find();
    return NextResponse.json({
      message: "User Fetched",
      status: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error! Please try again later.",
      },
      { status: 500 },
    );
  }
};
