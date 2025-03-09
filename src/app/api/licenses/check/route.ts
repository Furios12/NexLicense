import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db"; // Importa la funzione di connessione

export async function POST(request: Request) {
  // Estrai i dati della licenza dal body della richiesta
  const { id, user, expiration } = await request.json();

  // Verifica che tutti i parametri siano presenti
  if (!id || !user || !expiration) {
    return NextResponse.json({ error: "⚠️ Tutti i campi sono obbligatori!" }, { status: 400 });
  }

  // Ottieni la connessione al database
  const connection = await connectDB();

  try {
    // Esegui la query per controllare se la licenza esiste
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