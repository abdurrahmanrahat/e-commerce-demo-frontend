"use client";

import { useEffect, useState } from "react";

// Format Date
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Expiry Countdown
const getRemainingTimeParts = (expiresAt?: string) => {
  if (!expiresAt) return null;

  const now = new Date().getTime();
  const expiry = new Date(expiresAt).getTime();
  const diff = expiry - now;

  if (diff <= 0) return { expired: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes, expired: false };
};

const ExpiryRemaining = ({ expiresAt }: { expiresAt: string | undefined }) => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTimeParts(expiresAt));

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      setTimeLeft(getRemainingTimeParts(expiresAt));
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <>
      {expiresAt ? (
        <div className="">
          <p className="font-medium">{formatDate(expiresAt)}</p>

          {timeLeft?.expired ? (
            <p className="text-sm text-red-500 font-medium">Expired</p>
          ) : (
            <p
              className={`text-sm font-medium ${
                (timeLeft?.days ?? 0) === 0 && (timeLeft?.hours ?? 0) < 1
                  ? "text-red-500 animate-pulse"
                  : (timeLeft?.days ?? 0) <= 1
                    ? "text-orange-500"
                    : "text-green-600"
              }`}
            >
              {/* Clean formatting */}
              {timeLeft?.days ? `${timeLeft.days}d ` : ""}
              {timeLeft?.hours ? `${timeLeft.hours}h ` : ""}
              {timeLeft?.minutes ? `${timeLeft.minutes}m` : ""}
              {" remaining"}
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No expiration date</p>
      )}
    </>
  );
};

export default ExpiryRemaining;
