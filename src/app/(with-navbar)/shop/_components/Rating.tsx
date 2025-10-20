import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  totalReviews?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export const Rating = ({
  rating,
  totalReviews = 0,
  size = "md",
  showCount = true,
}: RatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const partial = rating > star - 1 && rating < star;

          return (
            <div key={star} className="relative">
              <Star
                className={`${sizeClasses[size]} ${
                  filled || partial
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted"
                }`}
                style={
                  partial
                    ? {
                        clipPath: `inset(0 ${
                          100 - (rating - (star - 1)) * 100
                        }% 0 0)`,
                      }
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>

      {showCount && totalReviews > 0 && (
        <span className={`${textSizes[size]} text-muted-foreground`}>
          ({totalReviews})
        </span>
      )}
    </div>
  );
};
