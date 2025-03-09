import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db";

export async function POST(req: Request) {
  let connection;
  try {
    const { email, name, surname, username, password } = await req.json();

    if (!email || !name || !surname || !username || !password) {
      return NextResponse.json({ error: "⚠️ Tutti i campi sono obbligatori!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    connection = await connectDB();

    const [existingUsers] = await connection.execute(
      "SELECT id FROM accounts WHERE email = ? OR username = ?",
      [email, username]
    );

    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json({ error: "⚠️ Email o Username già in uso!" }, { status: 409 });
    }

    await connection.execute(
      "INSERT INTO accounts (email, name, surname, username, password) VALUES (?, ?, ?, ?, ?)",
      [email, name, surname, username, hashedPassword]
    );

    return NextResponse.json({ message: "✅ Account creato con successo!" }, { status: 200 });

  } catch (error) {
    console.error("❌ Errore nella registrazione:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });

  } finally {
    if (connection) await connection.end();
  }
}
