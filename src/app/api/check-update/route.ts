import { NextResponse } from 'next/server';

export async function GET() {
  const currentVersion = "0.1";
  const repoUrl = "https://api.github.com/repos/Furios12/NexLicense/releases/latest";

  try {
    const res = await fetch(repoUrl);
    const data = await res.json();
    const latestVersion = data.tag_name;

    if (currentVersion !== latestVersion) {
      return NextResponse.json({ updateAvailable: true, latestVersion });
    }

    return NextResponse.json({ updateAvailable: false });
  } catch (error) {
    console.error('Errore nel controllo degli aggiornamenti', error);
    return NextResponse.json({ error: 'Errore nel server' }, { status: 500 });
  }
}
