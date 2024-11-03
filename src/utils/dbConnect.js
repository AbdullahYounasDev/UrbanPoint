import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONOGO_URI);
    const connection = mongoose.connection();

    connection.on("connected", () => {
      return NextResponse.json({ message: "Database Connected" });
    });
    connection.on("error", () => {
      return NextResponse.json({ erorr: "Database Connection Error" });
    });
    console.log("Connected");
  } catch (error) {
    return NextResponse.json({ error: "Error in Connecting Database" });
  }
};
