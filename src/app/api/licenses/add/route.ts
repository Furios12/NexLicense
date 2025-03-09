import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";

export async function POST(request: Request) {
  const { user, type, expiration } = await request.json();
  const connection = await connectDB();

  try {
    const query = 'INSERT INTO licenses (user, type, expiration) VALUES (?, ?, ?)';
    await connection.execute(query, [user, type, expiration]);

    return new NextResponse("Licenza aggiunta con successo!", { status: 200 });
  } catch (error) {
    console.error("❌ Errore nell'aggiunta della licenza:", error);
    return new NextResponse("Errore nell'aggiunta della licenza", { status: 500 });
  } finally {
    connection.end();
  }
}
