import Header from "@/components/Header";
export const metadata = {
  title: "Welcome To Our Website",
  description: "Let's find your sweet home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
