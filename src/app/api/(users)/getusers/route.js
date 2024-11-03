// pages/api/users.js
import { connect } from "@/utils/dbConnect";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
connect();
export const GET = async () => {
  try {
    const users = await clerkClient.users.getUserList();
    if (!users) {
      return NextResponse.json({ error: "No User Found" }, { status: 400 });
    }
    return NextResponse.json({ data: users, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error! Please try again later.",
      },
      { status: "500" },
    );
  }
};
