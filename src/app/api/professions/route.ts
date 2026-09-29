import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
    if (fs.existsSync(d1Dir)) {
      const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
      if (sqliteFiles.length > 0) {
        const { DatabaseSync } = await import('node:sqlite');
        const dbPath = path.join(d1Dir, sqliteFiles[0]);
        const db = new DatabaseSync(dbPath);
        
        const rows = db.prepare(`
          SELECT id, slug, title, isco_code, category, description,
                 min_salary, median_salary, max_salary, sample_count, grade, status
          FROM ec_professions
          WHERE status = 'published' OR status IS NULL
          ORDER BY title ASC
        `).all() as any[];

        if (rows && rows.length > 0) {
          const professions = rows.map(r => ({
            id: r.id,
            slug: r.slug,
            title: r.title || r.slug,
            category: r.category || 'Genel',
            iscoCode: r.isco_code || '0000',
            summary: r.description || '',
            salaryStats: {
              p25: Number(r.min_salary) || 0,
              median: Number(r.median_salary) || 0,
              p75: Number(r.max_salary) || 0,
              sampleSize: Number(r.sample_count) || 0,
              sourceGrade: (r.grade || 'Grade D').replace('Grade ', '')
            }
          }));
          return NextResponse.json({ success: true, source: 'emdash-d1', data: professions });
        }
      }
    }
  } catch (err: any) {
    console.error('Error reading from EmDash D1:', err.message);
  }

  // Fallback to static mock data if D1 is not populated
  const { PROFESSIONS_DATA } = await import('@/data/mock-data');
  return NextResponse.json({ success: true, source: 'fallback', data: PROFESSIONS_DATA });
}
