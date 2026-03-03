import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Watchlist is persisted client-side in localStorage for this mocked local-dev build."
    },
    { status: 200 }
  );
}
