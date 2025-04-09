import "./globals.css";
import Provider from "@/lib/provider";

export const metadata = {
  title: "AI Sales Orchestration",
  description: "Boost your B2B sales with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}