// pages/api/users.js
import User from "@/models/user.model";
import { connect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
connect();
export const GET = async () => {
  try {
    const user = await User.find();
    if (!user) {
      return NextResponse.json({ error: "No Users Found" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Data Fetched Successfully",
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
