import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import ActiveStatus from "./components/ActiveStatus";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
