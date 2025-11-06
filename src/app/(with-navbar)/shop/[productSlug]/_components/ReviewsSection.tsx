"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Filter, Star } from "lucide-react";
import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userName: "Abdur Rahman",
    userAvatar: "",
    rating: 5,
    comment:
      "Awesome product! The quality exceeded my expectations. Fast delivery and great customer service.",
    images: [],
    verified: true,
    createdAt: new Date("2025-10-29"),
  },
  {
    id: "2",
    userName: "Mosaddekur Rahman",
    userAvatar: "",
    rating: 5,
    comment:
      "গতকাল (১৯/১০/২৫) সোমবাটি নিমিত করেছি। আইভা অনুযায়ী পোলুইট এর কেলোনালটি ভালইছে তাছে। ১৬ ঘণ্টা চার্জ করার পর আজাকব টিমারটি বযবহার করলাম। থেম পাই মিনিট বযবহার করার পরও দুরইব পোলারফুল মনে হয়েছে। টিমারটি টক আর তার বাছাই মিনিট উইনিট একবাই টোডলে কোম করে হেন।",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200",
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=200",
    ],
    verified: true,
    createdAt: new Date("2025-10-15"),
  },
  {
    id: "3",
    userName: "Farheen F.",
    userAvatar: "",
    rating: 3,
    comment:
      "one clipper comb is missing got 3 only... the power drops & normals depending on holding position which shows battery problem of the device",
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=200",
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200",
    ],
    verified: true,
    createdAt: new Date("2025-10-10"),
  },
  {
    id: "4",
    userName: "Sarah Johnson",
    userAvatar: "",
    rating: 4,
    comment:
      "Good product overall, but shipping took longer than expected. Quality is solid though.",
    images: [],
    verified: false,
    createdAt: new Date("2025-10-05"),
  },
];

interface ReviewsSectionProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
  userId: string;
}

export const ReviewsSection = ({
  productId,
  averageRating,
  totalReviews,
  userId,
}: ReviewsSectionProps) => {
  const [sortBy, setSortBy] = useState("relevance");
  const [filterBy, setFilterBy] = useState("all");

  // Calculate rating distribution
  const ratingDistribution = [
    { stars: 5, count: 141, percentage: 85 },
    { stars: 4, count: 7, percentage: 4 },
    { stars: 3, count: 4, percentage: 2 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 13, percentage: 9 },
  ];

  const totalRatingCount = ratingDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="space-y-8">
      {/* Summary and Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Review Summary */}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <Badge variant="outline">{totalReviews} reviews</Badge>
            </div>

            {/* Overall Rating */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {totalRatingCount} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{stars}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right: Write Review Form */}
        <ReviewForm productId={productId} userId={userId} />
      </div>

      {/* Reviews List */}
      <div>
        <div className="md:flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">All Reviews</h3>

          {/* Sort and Filter */}
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-4 h-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Sort: Relevance</SelectItem>
                <SelectItem value="recent">Sort: Most Recent</SelectItem>
                <SelectItem value="highest">Sort: Highest Rating</SelectItem>
                <SelectItem value="lowest">Sort: Lowest Rating</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Filter" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter: All stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="verified">Verified Purchase</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};
