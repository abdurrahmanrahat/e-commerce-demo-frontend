"use client";

import { TOrder } from "@/types/order.type";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { InvoicePDF } from "./InvoicePDF";

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false },
);

export default function InvoiceViewerAnotherTab({ order }: { order: TOrder }) {
  return (
    <BlobProvider document={<InvoicePDF order={order} />}>
      {({ url, loading }) => (
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => {
            if (url) {
              window.open(url, "_blank");
            }
          }}
        >
          <Eye className="h-4 w-4 mr-2" />
          {loading ? "Preparing..." : "View Invoice"}
        </Button>
      )}
    </BlobProvider>
  );
}
