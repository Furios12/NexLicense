import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";

export async function GET() {
  const connection = await connectDB();

  try {
    const [rows] = await connection.execute('SELECT * FROM licenses');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("❌ Errore nel recupero delle licenze:", error);
    return NextResponse.json({ error: "Errore nel recupero delle licenze" }, { status: 500 });
  } finally {
    connection.end();
  }
}
