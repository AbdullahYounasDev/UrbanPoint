/** @format */
import NextUser from "@/models/nextuser.model";
import { connect } from "@/utils/dbConnect";
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
