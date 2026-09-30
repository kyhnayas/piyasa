import { NextResponse } from 'next/server';
import { getAllProfessionsAsync } from '@/lib/professions';

export async function GET() {
  try {
    const professions = await getAllProfessionsAsync();
    return NextResponse.json({
      success: true,
      total: professions.length,
      data: professions,
    });
  } catch (err: any) {
    console.error('Error fetching professions in /api/professions:', err.message);
    const { PROFESSIONS_DATA } = await import('@/data/mock-data');
    return NextResponse.json({ success: true, source: 'fallback', data: PROFESSIONS_DATA });
  }
}
