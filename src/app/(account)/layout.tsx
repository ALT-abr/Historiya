import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
