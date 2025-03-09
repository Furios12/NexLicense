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

    const [existingUsers]: any[] = await connection.execute(
      "SELECT id FROM accounts WHERE email = ? OR username = ? OR name = ? OR surname = ?",
      [email, username, name, surname]
    );

    if ((existingUsers as any[]).length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.email === email) {
        return NextResponse.json({ error: "⚠️ Email già in uso!" }, { status: 409 });
      }
      if (existingUser.username === username) {
        return NextResponse.json({ error: "⚠️ Username già in uso!" }, { status: 409 });
      }
      if (existingUser.name === name) {
        return NextResponse.json({ error: "⚠️ Nome già in uso!" }, { status: 409 });
      }
      if (existingUser.surname === surname) {
        return NextResponse.json({ error: "⚠️ Cognome già in uso!" }, { status: 409 });
      }
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
