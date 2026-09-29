/**
 * Piyasa (piyasa.work) - Prisma Seed Script
 * Başlangıç mesleklerini, kategorilerini, şehirlerini ve kaynaklarını PostgreSQL veritabanına aktarır.
 */

import { PrismaClient, SourceGrade } from '@prisma/client';
import { PROFESSIONS_DATA, CITIES, SECTORS } from '../src/data/mock-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Piyasa veritabanı seed işlemi başlatılıyor...');

  // 1. Şehirler
  for (const city of CITIES) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        name: city.name,
        slug: city.slug,
        plateCode: city.plate || null,
      },
    });
  }

  // 2. Sektörler
  for (const sector of SECTORS) {
    await prisma.sector.upsert({
      where: { slug: sector.slug },
      update: {},
      create: {
        name: sector.name,
        slug: sector.slug,
      },
    });
  }

  // 3. Kariyer Seviyeleri
  const levels = [
    { name: 'Junior', slug: 'junior', order: 1 },
    { name: 'Mid', slug: 'mid', order: 2 },
    { name: 'Senior', slug: 'senior', order: 3 },
    { name: 'Lead', slug: 'lead', order: 4 },
    { name: 'Manager', slug: 'manager', order: 5 },
    { name: 'Director', slug: 'director', order: 6 },
  ];

  for (const lvl of levels) {
    await prisma.careerLevel.upsert({
      where: { slug: lvl.slug },
      update: {},
      create: {
        name: lvl.name,
        slug: lvl.slug,
        levelOrder: lvl.order,
      },
    });
  }

  // 4. Veri Kaynağı
  const defaultSource = await prisma.salarySource.upsert({
    where: { slug: 'piyasa-dogrulanmis-saha' },
    update: {},
    create: {
      name: 'Piyasa Doğrulanmış Saha & Rapor Havuzu',
      slug: 'piyasa-dogrulanmis-saha',
      grade: SourceGrade.D,
      description: 'Çift aşamalı moderasyondan geçmiş anonim bildirimler ve sektörel anketler.',
      reliabilityScore: 0.85,
    },
  });

  // 5. Meslek Kategorisi
  const defaultCategory = await prisma.professionCategory.upsert({
    where: { slug: 'teknoloji-ve-muhendislik' },
    update: {},
    create: {
      name: 'Teknoloji & Mühendislik',
      slug: 'teknoloji-ve-muhendislik',
      description: 'Yazılım, veri, yapay zeka ve temel mühendislik unvanları.',
    },
  });

  // 6. Meslekler & Maaş Kayıtları
  for (const prof of PROFESSIONS_DATA) {
    const createdProf = await prisma.profession.upsert({
      where: { slug: prof.slug },
      update: {
        summary: prof.summary,
        description: prof.description,
      },
      create: {
        title: prof.title,
        slug: prof.slug,
        summary: prof.summary,
        description: prof.description,
        categoryId: defaultCategory.id,
      },
    });

    // Mid seviyesi için salary record ekle
    const midLevel = await prisma.careerLevel.findUnique({ where: { slug: 'mid' } });
    if (midLevel) {
      await prisma.salaryRecord.create({
        data: {
          professionId: createdProf.id,
          careerLevelId: midLevel.id,
          salaryMin: prof.salaryStats.min,
          salaryP25: prof.salaryStats.p25,
          salaryMedian: prof.salaryStats.median,
          salaryP75: prof.salaryStats.p75,
          salaryMax: prof.salaryStats.max,
          sampleSize: prof.salaryStats.sampleSize,
          confidenceLevel: 0.88,
          sourceId: defaultSource.id,
          methodology: 'Tukey IQR filtrelemesi ile oluşturulmuş dağılım.',
        },
      });
    }
  }

  console.log('Seed işlemi başarıyla tamamlandı!');
}

main()
  .catch((e) => {
    console.error('Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
