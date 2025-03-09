import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db"; // Usa il file di connessione che hai fornito

export async function GET() {
  const connection = await connectDB();

  try {
    // Esegui la query per ottenere tutte le licenze
    const [rows] = await connection.execute('SELECT * FROM licenses');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("❌ Errore nel recupero delle licenze:", error);
    return NextResponse.json({ error: "Errore nel recupero delle licenze" }, { status: 500 });
  } finally {
    // Chiudi la connessione al database
    connection.end();
  }
}
