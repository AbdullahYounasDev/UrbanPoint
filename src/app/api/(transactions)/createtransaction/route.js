/** @format */

import { NextResponse } from "next/server";

import { connect } from "@/utils/dbConnect";

import Property from "@/models/property.model";

import Transaction from "@/models/transaction.model";
import NextUser from "@/models/nextuser.model";

connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();

    const { buyerEmail, propertyId, amount, cvv, accountNumber, cardHolder } =
      reqBody;

    if (
      !buyerEmail ||
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

    const user = await NextUser.findOne({ email: buyerEmail });

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
      buyerEmail: user.email,
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
