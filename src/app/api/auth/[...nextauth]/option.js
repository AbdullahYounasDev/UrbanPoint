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
        await connect();
        const user = await NextUser.findOne({
          email: credentials?.email,
        });

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = credentials.password === user.password;
        if (!passwordMatch) throw new Error("Wrong Password");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
