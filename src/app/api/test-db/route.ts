import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";

export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute("SHOW TABLES;");
    return NextResponse.json({ message: "Connessione riuscita!", tables: rows });
  } catch (error) {
    return NextResponse.json({ error: "Errore di connessione al database" }, { status: 500 });
  }
}
