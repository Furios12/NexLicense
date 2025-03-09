import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    const user = verify(token, process.env.JWT_SECRET || "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p7q8r9s0t"); //chiave di emergenza (cambiala come vuoi tu)
    return NextResponse.json({ user });

  } catch (error) {
    return NextResponse.json({ error: "Sessione non valida" }, { status: 401 });
  }
}
