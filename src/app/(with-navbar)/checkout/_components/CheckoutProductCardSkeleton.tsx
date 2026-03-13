import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutProductCardSkeleton() {
  return (
    <div className="flex gap-3">
      <Skeleton className="w-16 h-16 rounded-md shrink-0 bg-muted/40 dark:bg-muted/70" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-[80%] bg-muted/60" />
        <Skeleton className="h-3 w-[40%] bg-muted/60" />
      </div>

      <Skeleton className="h-4 w-12 bg-muted/60" />
    </div>
  );
}
