import Sidebar from "./components/sidebar";
import TitleBar from "./components/titlebar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <main className="flex flex-row justify-stretch p-0 min-h-screen">
          <Sidebar />

          <div className="flex flex-col justify-stretch bg-[#050505] p-0 grow">
            <TitleBar />
            <div className="bg-[#151515] p-8 rounded-tl-2xl grow">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
