import { NextResponse } from "next/server";

import { connect } from "@/utils/dbConnect";

import User from "@/models/user.model";

import Property from "@/models/property.model";

import Transaction from "@/models/transaction.model";

connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();

    const { buyerId, propertyId, amount, cvv, accountNumber, cardHolder } =
      reqBody;

    if (
      !buyerId ||
      !propertyId ||
      !amount ||
      !cvv ||
      !accountNumber ||
      !cardHolder
    ) {
      return NextResponse.json(
        { error: "All fields are required." },

        { status: 400 },
      );
    }

    const user = await User.findOne({ clerkId: buyerId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },

        { status: 400 },
      );
    }
    if (property.status === "Sold") {
      return NextResponse.json(
        { error: "Property is Sold" },

        { status: 400 },
      );
    }

    property.status = "Sold";

    const newTransaction = new Transaction({
      buyer: user,
      property,
      amount,
      cvv,
      accountNumber,
      cardHolder,
    });

    await property.save();
    await newTransaction.save();

    return NextResponse.json({
      message: "Transaction added successfully",

      transaction: newTransaction,
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
