import AdminHeader from "@/components/AdminHeader";
import AdminNav from "@/components/AdminNav";

export const metadata = {
  title: "Admin - Rental Website",
  description:
    "This Is Property Rental Website Where You Can Purchase and Rent Your Properties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminHeader />
        <div className="flex justify-start w-[100%] gap-16">
          <AdminNav />
          {children}
        </div>
      </body>
    </html>
  );
}
