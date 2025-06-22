/** @format */

import { Ubuntu } from "next/font/google";
import "./globals.css";
import React from "react";
import { Provider } from "./nextauthprovider";
import Script from "next/script";

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
    <head>
          <Script
            src="https://vozyo.vercel.app/widget.js"
            data-chatbot="Ey3qJGsp"
            strategy="afterInteractive"
          />
        </head>
        <body className={ubuntu.className}>{children}</body>
      </html>
    </Provider>
  );
}
