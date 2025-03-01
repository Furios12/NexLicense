import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "database.json");
    await fs.access(filePath);
    return NextResponse.json({ exists: true });
  } catch (error) {
    return NextResponse.json({ exists: false });
  }
}
