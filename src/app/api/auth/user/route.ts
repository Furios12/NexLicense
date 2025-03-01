import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    // Verifica il token
    const user = verify(token, process.env.JWT_SECRET || "supersegreto");
    return NextResponse.json({ user });

  } catch (error) {
    return NextResponse.json({ error: "Sessione non valida" }, { status: 401 });
  }
}
