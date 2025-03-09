import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";

export async function DELETE(request: Request) {
  // Estrai l'ID della licenza da eliminare dal body della richiesta
  const { id } = await request.json();

  const connection = await connectDB();

  try {
    // Esegui la query di eliminazione della licenza
    const query = 'DELETE FROM licenses WHERE id = ?';
    await connection.execute(query, [id]);

    return new NextResponse("Licenza eliminata con successo!", { status: 200 });
  } catch (error) {
    console.error("❌ Errore nell'eliminazione della licenza:", error);
    return new NextResponse("Errore nell'eliminazione della licenza", { status: 500 });
  } finally {
    connection.end();
  }
}
