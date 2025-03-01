import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).delete("session_id");
  return NextResponse.json({ success: true });
}
