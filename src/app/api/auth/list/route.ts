// /pages/api/auth/accounts/list.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';

export async function GET(req: Request) {
  let connection;
  try {
    connection = await connectDB();

    const [rows]: any = await connection.execute('SELECT * FROM accounts');
    
    return NextResponse.json(rows);

  } catch (error) {
    console.error("❌ Errore nel recupero degli account:", error);
    return NextResponse.json({ error: 'Errore nel recupero degli account' }, { status: 500 });

  } finally {
    if (connection) await connection.end();
  }
}
