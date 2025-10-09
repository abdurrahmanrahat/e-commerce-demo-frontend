"use server";

import { fetchWithAuth } from "./fetchWithAuth";

export const getMeFromDB = async () => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKED_URL}/users/get-me`
  );

  if (!res.ok) {
    // User not logged in or forbidden
    return null;
  }

  return res.json();
};
