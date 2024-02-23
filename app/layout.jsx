"use client";
import Sidebar from "./components/sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <main className="flex flex-row justify-stretch p-0 min-h-screen">
          <Sidebar />

          <div className="p-8 grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
