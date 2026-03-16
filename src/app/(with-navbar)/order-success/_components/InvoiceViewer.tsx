"use client";

import { TOrder } from "@/types/order.type";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";
import { InvoicePDF } from "./InvoicePDF";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

export default function InvoiceViewer({ order }: { order: TOrder }) {
  return (
    <Dialog>
      {/* View Button */}
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          View Invoice
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-6xl! h-[65vh] md:h-[75vh] lg:h-[90vh] flex flex-col p-0"
      >
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        {/* PDF Viewer */}
        <div className="flex-1 w-full h-full overflow-hidden ">
          <PDFViewer width="100%" height="100%">
            <InvoicePDF order={order} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
