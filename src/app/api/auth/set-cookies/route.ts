import {
  accessAuthKey,
  accessExpiry,
  refreshAuthKey,
  refreshExpiry,
} from "@/constants/authKey";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { accessToken, refreshToken } = await req.json();

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: "Token required" }, { status: 400 });
  }

  const response = NextResponse.json(
    { message: "Cookie set" },
    { status: 200 }
  );

  // ✅ Set cookie via response
  response.cookies.set(accessAuthKey, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: accessExpiry,
  });
  response.cookies.set(refreshAuthKey, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: refreshExpiry,
  });

  return response;
}
