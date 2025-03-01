
import fs from "fs";
import path from "path";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  try {
    const { pin } = await req.json();
    const filePath = path.resolve("data", "adminPin.json");
    const adminPinData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (adminPinData.pin === pin) {
      return NextResponse.json({ valid: true }, { status: 200 });
    } else {
      return NextResponse.json({ valid: false }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Errore nel server" }, { status: 500 });
  }
}
