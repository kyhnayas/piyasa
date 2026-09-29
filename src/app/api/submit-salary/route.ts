import { NextResponse } from 'next/server';
import { z } from 'zod';

const submissionSchema = z.object({
  professionId: z.string().min(1),
  cityId: z.string().optional(),
  sectorId: z.string().optional(),
  experienceYears: z.number().min(0).max(60),
  salaryAmount: z.number().min(17002).max(5000000), // Minimum yasal asgari ücret kontrolü
  grossOrNet: z.enum(['NET', 'GROSS']).default('NET'),
  bonusIncluded: z.boolean().default(false),
  optionalComment: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = submissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Geçersiz maaş bildirimi verisi.',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    // AI & PII Filtre Kontrolü (TCKN, telefon veya e-posta kalıpları kontrolü)
    const comment = parsed.data.optionalComment || '';
    const phoneRegex = /(05\d{9}|\+90\d{10})/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const tcknRegex = /\b\d{11}\b/g;

    let initialStatus = 'SUBMITTED';
    let flagReason = '';

    if (phoneRegex.test(comment) || emailRegex.test(comment) || tcknRegex.test(comment)) {
      initialStatus = 'FLAGGED';
      flagReason = 'Olası kişisel veri (PII) tespiti';
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Maaş bildiriminiz başarıyla alındı ve moderasyon kuyruğuna iletildi.',
        status: initialStatus,
        flagReason: flagReason || undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Bildirim işlenirken sunucu hatası oluştu.',
        },
      },
      { status: 500 }
    );
  }
}
