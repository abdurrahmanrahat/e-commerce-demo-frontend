import Footer from "@/components/shared/Ui/Footer/Footer";
import Navbar from "@/components/shared/Ui/Navbar/Navbar";
import RetellCallWidget from "@/components/shared/Ui/RetellCallWidget";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gadgetoria",
  description:
    "Discover genuine electronic parts and accessories for every device",
};

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
      <div className="fixed bottom-6 right-6 z-50">
        <RetellCallWidget />
      </div>
    </>
  );
};

export default CommonLayout;
