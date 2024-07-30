"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, showNavbar }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CustomCursor />
        {showNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
