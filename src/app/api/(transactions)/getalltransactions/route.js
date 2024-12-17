/** @format */

import Property from "@/models/property.model";
import Transaction from "@/models/transaction.model";
import { connect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
connect();
export const GET = async (request) => {
  try {
    const transactions = await Transaction.find();

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        { contacts: "No messages found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { data: transactions, status: 200 },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server Error! Please try again later.",
      },
      { status: "500" },
    );
  }
};
