import { getProductsByIdsFromDB } from "@/app/actions/product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { ids } = await req.json();

  const res = await getProductsByIdsFromDB(ids);

  return NextResponse.json(res);
}
