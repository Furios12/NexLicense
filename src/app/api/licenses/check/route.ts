import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";

export async function POST(request: Request) {
  const { id, user, expiration } = await request.json();

  if (!id || !user || !expiration) {
    return NextResponse.json({ error: "⚠️ Tutti i campi sono obbligatori!" }, { status: 400 });
  }

  const connection = await connectDB();

  try {
    const query = 'SELECT * FROM licenses WHERE id = ? AND user = ? AND expiration = ?';
    const [rows, fields]: [any[], any] = await connection.execute(query, [id, user, expiration]);

    if ((rows as any[]).length > 0) {
      return NextResponse.json({ message: "Licenza trovata!", license: rows[0] }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Licenza non trovata!" }, { status: 404 });
    }
  } catch (error) {
    console.error("❌ Errore nel controllo della licenza:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  } finally {
    connection.end();
  }
}