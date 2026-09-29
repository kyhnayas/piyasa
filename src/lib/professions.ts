import fs from 'fs';
import path from 'path';
import { PROFESSIONS_DATA, ProfessionData } from '@/data/mock-data';
import { getDetailedRoleInfo } from '@/data/profession-details';

export function getProfessionFromD1(slug: string): ProfessionData | null {
  try {
    const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
    if (fs.existsSync(d1Dir)) {
      const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
      if (sqliteFiles.length > 0) {
        // Node sqlite sync
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { DatabaseSync } = require('node:sqlite');
        const dbPath = path.join(d1Dir, sqliteFiles[0]);
        const db = new DatabaseSync(dbPath);

        const row = db.prepare(`
          SELECT id, slug, title, isco_code, category, description,
                 min_salary, median_salary, max_salary, sample_count, grade, status
          FROM ec_professions
          WHERE slug = ?
        `).get(slug) as any;

        if (row) {
          // If we also have a detailed static override in mock-data, merge it
          const existingMock = PROFESSIONS_DATA.find(p => p.slug === slug);

          const median = Number(row.median_salary) || 75000;
          const min = Number(row.min_salary) || Math.round(median * 0.65);
          const max = Number(row.max_salary) || Math.round(median * 1.6);
          const p25 = Math.round(min + (median - min) * 0.45);
          const p75 = Math.round(median + (max - median) * 0.55);
          const sampleCount = Number(row.sample_count) || 350;
          const gradeLetter = (row.grade || 'Grade B').replace('Grade ', '') as 'A' | 'B' | 'C' | 'D' | 'E';

          const title = row.title || row.slug;
          const category = row.category || 'Genel';
          const description = row.description || `${title} mesleği için 2026 yılı Türkiye iş piyasası ücret analizleri, kariyer basamakları ve yetkinlik rehberi.`;

          const detailed = getDetailedRoleInfo(row.slug, title, category);

          return {
            id: row.id,
            slug: row.slug,
            title: title,
            category: category,
            categorySlug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            summary: description,
            description: description,
            tasks: existingMock?.tasks || detailed.tasks,
            toolsAndTech: detailed.toolsAndTech,
            dailyRoutine: detailed.dailyRoutine,
            education: existingMock?.education || detailed.education,
            skills: existingMock?.skills || detailed.skills,
            certifications: existingMock?.certifications || detailed.certifications,
            interviewQuestions: detailed.interviewQuestions,
            careerLadder: existingMock?.careerLadder || [
              {
                level: 'Junior / Başlangıç Seviyesi',
                years: '0 - 2 Yıl',
                medianNet: Math.round(median * 0.7),
                range: `${Math.round(min * 0.9).toLocaleString('tr-TR')} ₺ - ${Math.round(median * 0.85).toLocaleString('tr-TR')} ₺`,
                focus: 'Temel süreçlerin öğrenilmesi, mentor gözetiminde operasyon yürütülmesi.'
              },
              {
                level: 'Mid / Orta Düzey Uzman',
                years: '3 - 5 Yıl',
                medianNet: median,
                range: `${Math.round(p25).toLocaleString('tr-TR')} ₺ - ${Math.round(p75).toLocaleString('tr-TR')} ₺`,
                focus: 'Bağımsız proje yürütme, problem çözme ve kritik iş çıktısı üretimi.'
              },
              {
                level: 'Senior / Kıdemli Uzman',
                years: '5 - 8 Yıl',
                medianNet: Math.round(median * 1.35),
                range: `${Math.round(median * 1.15).toLocaleString('tr-TR')} ₺ - ${Math.round(max * 0.95).toLocaleString('tr-TR')} ₺`,
                focus: 'Mimari/stratejik kararlar alma, junior mentorluğu ve sistem optimizasyonu.'
              },
              {
                level: 'Lead / Takım Lideri & Yönetici',
                years: '8+ Yıl',
                medianNet: Math.round(median * 1.7),
                range: `${Math.round(median * 1.4).toLocaleString('tr-TR')} ₺ - ${Math.round(max * 1.25).toLocaleString('tr-TR')} ₺`,
                focus: 'Bütçe, ekip ve strateji yönetimi; üst düzey paydaş ilişkileri.'
              }
            ],
            salaryStats: {
              min: min,
              p25: p25,
              median: median,
              p75: p75,
              max: max,
              sampleSize: sampleCount,
              sourceGrade: gradeLetter,
              confidenceLabel: sampleCount > 500 ? 'YÜKSEK' : 'ORTA',
              lastUpdated: '2026-09-29'
            },
            citySalaries: existingMock?.citySalaries || [
              { city: 'İstanbul', citySlug: 'istanbul', medianNet: Math.round(median * 1.18), diffPercent: 18 },
              { city: 'Ankara', citySlug: 'ankara', medianNet: Math.round(median * 1.05), diffPercent: 5 },
              { city: 'İzmir', citySlug: 'izmir', medianNet: Math.round(median * 1.02), diffPercent: 2 },
              { city: 'Bursa', citySlug: 'bursa', medianNet: Math.round(median * 0.96), diffPercent: -4 },
              { city: 'Kocaeli', citySlug: 'kocaeli', medianNet: Math.round(median * 1.04), diffPercent: 4 }
            ],
            sectorSalaries: existingMock?.sectorSalaries || [
              { sector: 'Bilişim & SaaS', medianNet: Math.round(median * 1.2) },
              { sector: 'Finans & Bankacılık', medianNet: Math.round(median * 1.15) },
              { sector: 'Üretim & Sanayi', medianNet: Math.round(median * 0.95) },
              { sector: 'Perakende & E-Ticaret', medianNet: Math.round(median * 1.02) }
            ],
            fieldExperiences: existingMock?.fieldExperiences || [
              {
                level: 'Mid Level',
                city: 'İstanbul',
                years: 4,
                comment: 'Sektörde deneyim arttıkça şirketler arası geçişlerde %40-50 ücret sıçraması mümkün olabiliyor.',
                workType: 'Hibrit',
                verified: true
              }
            ],
            faq: existingMock?.faq || [
              {
                q: `${title} 2026 yılında ortalama ne kadar maaş alır?`,
                a: `2026 yılı piyasa verilerine göre ${title} için medyan net aylık ücret yaklaşık ${median.toLocaleString('tr-TR')} ₺ civarındadır. Başlangıç seviyesinde ${min.toLocaleString('tr-TR')} ₺ iken kıdemli rollerde ${max.toLocaleString('tr-TR')} ₺ seviyesine ulaşmaktadır.`
              },
              {
                q: `${title} olmak için hangi bölüm okunmalı?`,
                a: `Genellikle ilgili üniversite fakültelerinin 4 yıllık lisans programlarından mezun olunması beklenir. Bununla birlikte portföy ve sektörel sertifikalar işe alımda belirleyicidir.`
              }
            ]
          };
        }
      }
    }
  } catch (err) {
    console.error('getProfessionFromD1 error:', err);
  }

  // Fallback to static mock-data
  const staticFound = PROFESSIONS_DATA.find(p => p.slug === slug);
  return staticFound || null;
}

export function getAllProfessions(): ProfessionData[] {
  try {
    const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
    if (fs.existsSync(d1Dir)) {
      const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
      if (sqliteFiles.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { DatabaseSync } = require('node:sqlite');
        const dbPath = path.join(d1Dir, sqliteFiles[0]);
        const db = new DatabaseSync(dbPath);

        const rows = db.prepare(`
          SELECT slug FROM ec_professions WHERE status = 'published' OR status IS NULL ORDER BY title ASC
        `).all() as any[];

        if (rows && rows.length > 0) {
          return rows.map(r => getProfessionFromD1(r.slug)).filter((p): p is ProfessionData => p !== null);
        }
      }
    }
  } catch (err) {
    console.error('getAllProfessions error:', err);
  }
  return PROFESSIONS_DATA;
}
