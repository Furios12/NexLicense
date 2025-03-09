import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db"; // Connessione al DB

export async function DELETE(req: Request) {
  let connection;
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "⚠️ ID account obbligatorio!" }, { status: 400 });
    }

    // Connessione al database
    connection = await connectDB();

    // Controlla se l'account esiste
    const [existingAccount] = await connection.execute(
      "SELECT id FROM accounts WHERE id = ?",
      [id]
    );

    if ((existingAccount as any[]).length === 0) {
      return NextResponse.json({ error: "⚠️ Account non trovato!" }, { status: 404 });
    }

    // Query per eliminare l'account
    await connection.execute(
      "DELETE FROM accounts WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "✅ Account eliminato con successo!" }, { status: 200 });

  } catch (error) {
    console.error("❌ Errore nell'eliminazione dell'account:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });

  } finally {
    if (connection) await connection.end(); // Chiudiamo la connessione
  }
}