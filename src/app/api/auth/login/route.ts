import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  let connection;
  try {
    const { username, password } = await req.json();
    connection = await connectDB();

    // Cerca l'utente nel database
    const [rows]: any = await connection.execute("SELECT * FROM accounts WHERE username = ?", [username]);
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "❌ Utente non trovato!" }, { status: 401 });
    }

    // Verifica la password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "❌ Password errata!" }, { status: 401 });
    }

    // Crea un token JWT
    const token = sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "supersegreto",
      { expiresIn: "1h" }
    );

    // Salva il token nel cookie
    const response = NextResponse.json({ message: "✅ Login riuscito!" });
    response.headers.append(
      "Set-Cookie",
      `session=${token}; HttpOnly; Path=/; Max-Age=3600; Secure`
    );

    return response;

  } catch (error) {
    console.error("❌ Errore nel login:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });

  } finally {
    if (connection) await connection.end();
  }
}
