import User from "@/models/user.model";
import { connect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const createUser = async (user) => {
  try {
    await connect();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    return NextResponse.json({
      error: "Server Error! Please try again later.",
    });
  }
};
