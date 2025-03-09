import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";

export async function PUT(request: Request) {
  const { id, user, type, expiration } = await request.json();
  const connection = await connectDB();

  try {
    const query = 'UPDATE licenses SET user = ?, type = ?, expiration = ? WHERE id = ?';
    await connection.execute(query, [user, type, expiration, id]);

    return new NextResponse("Licenza aggiornata con successo!", { status: 200 });
  } catch (error) {
    console.error("❌ Errore nell'aggiornamento della licenza:", error);
    return new NextResponse("Errore nell'aggiornamento della licenza", { status: 500 });
  } finally {
    connection.end();
  }
}
