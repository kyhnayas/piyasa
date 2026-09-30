import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PROFESSIONS_DATA } from '@/data/mock-data';
import { getProfessionAsync } from '@/lib/professions';
import { calculateMarketSalary } from '@/lib/salary-engine';

const calculateSchema = z.object({
  professionSlug: z.string().min(1),
  citySlug: z.string().optional(),
  sectorSlug: z.string().optional(),
  experienceYears: z.number().min(0).max(50).default(2),
  careerLevel: z.string().optional(),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE']).default('FULL_TIME'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = calculateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Geçersiz parametreler.',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const { professionSlug, citySlug, sectorSlug, experienceYears, careerLevel, employmentType } = parsed.data;

    const prof = (await getProfessionAsync(professionSlug)) || PROFESSIONS_DATA.find((p) => p.slug === professionSlug) || PROFESSIONS_DATA[0];

    const result = calculateMarketSalary(prof.salaryStats.median, {
      professionSlug,
      citySlug,
      sectorSlug,
      experienceYears,
      careerLevelSlug: careerLevel,
      employmentType,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Hesaplama motoru çalışırken bir hata oluştu.',
        },
      },
      { status: 500 }
    );
  }
}
