/** @format */

import { Ubuntu } from "next/font/google";
import "./globals.css";
import React from "react";
import { Provider } from "./nextauthprovider";

export const metadata = {
  title: "Property Rental Website",
  description:
    "This Is Property Rental Website Where You Can Purchase and Rent Your Properties",
};

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en">
        <body className={ubuntu.className}>{children}</body>
      </html>
    </Provider>
  );
}
