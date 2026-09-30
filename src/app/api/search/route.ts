import { NextResponse } from 'next/server';
import { getAllProfessionsAsync } from '@/lib/professions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLocaleLowerCase('tr-TR').trim();
  const allProfessions = await getAllProfessionsAsync();

  if (!q) {
    return NextResponse.json({
      success: true,
      data: allProfessions.slice(0, 5),
    });
  }

  const results = allProfessions.filter((p) =>
    p.title.toLocaleLowerCase('tr-TR').includes(q) ||
    p.summary.toLocaleLowerCase('tr-TR').includes(q) ||
    p.category.toLocaleLowerCase('tr-TR').includes(q) ||
    p.skills.some((s) => s.toLocaleLowerCase('tr-TR').includes(q))
  );

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}
