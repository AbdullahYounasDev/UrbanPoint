/** @format */

import { connect } from "@/utils/dbConnect";
import NextUser from "@/models/nextuser.model";
import credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to the database
        await connect();

        // Find user by email
        const user = await NextUser.findOne({
          email: credentials?.email,
        });

        // Check if user exists
        if (!user) throw new Error("Wrong Email");

        // Validate password (add proper hashing in production)
        const passwordMatch = credentials.password === user.password;
        if (!passwordMatch) throw new Error("Wrong Password");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  secret: process.env.NEXTAUTH_SECRET, // Retrieve secret from the environment
};
