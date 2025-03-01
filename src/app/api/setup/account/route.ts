import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db"; // Importiamo la connessione

export async function POST(req: Request) {
  let connection;
  try {
    const { email, name, surname, username, password } = await req.json();

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connessione al database
    connection = await connectDB();

    // Query per salvare l'account
    await connection.execute(
      "INSERT INTO accounts (email, name, surname, username, password) VALUES (?, ?, ?, ?, ?)",
      [email, name, surname, username, hashedPassword]
    );

    return NextResponse.json({ message: "✅ Account creato con successo!" }, { status: 200 });

  } catch (error) {
    console.error("❌ Errore nel salvataggio dell'account:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });

  } finally {
    if (connection) await connection.end(); // Chiudiamo la connessione
  }
}
