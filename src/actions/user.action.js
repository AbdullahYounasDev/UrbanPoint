import User from "@/models/user.model";
import { connect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const createUser = async (user) => {
  try {
    await connect();
    const existingUser = await User.findOne({ clerkEmail: user.clerkEmail });
    if (!existingUser) {
      const newUser = await User.create(user);
      return JSON.parse(JSON.stringify(newUser));
    } else {
      return NextResponse.json(
        { error: "User Already Exist" },
        { user: existingUser },
      );
    }
    
  } catch (error) {
    return NextResponse.json({
      error: "Server Error! Please try again later.",
    });
  }
};
