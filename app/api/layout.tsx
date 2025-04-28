import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
import { ReactNode } from "react";

export default function APILayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex flex-col min-h-screen">
          <Navbar></Navbar>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-4xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
