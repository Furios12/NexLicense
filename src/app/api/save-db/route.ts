import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "database.json");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ message: "Configurazione salvata con successo!" });
  } catch (error) {
    console.error("Errore nel salvataggio della configurazione:", error);
    return NextResponse.json({ error: "Errore nel salvataggio della configurazione" }, { status: 500 });
  }
}
