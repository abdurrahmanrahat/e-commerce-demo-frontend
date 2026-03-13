import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CartSheetCardSkeleton() {
  return (
    <Card className="p-2">
      <div className="flex gap-2">
        {/* Image */}
        <Skeleton className="w-24 h-24 rounded-lg" />

        {/* Content */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <Skeleton className="h-4 w-[80%]" />

          {/* Price */}
          <Skeleton className="h-4 w-[40%]" />

          {/* Quantity + Delete */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        {/* Total */}
        <div className="text-right flex items-start">
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
    </Card>
  );
}
