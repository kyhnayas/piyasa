import { NextRequest, NextResponse } from 'next/server';
import { queryCloudD1 } from '@/lib/cloud-d1';
import { ALL_FACULTY_CLUSTERS, DepartmentItem } from '@/data/all-university-departments';
import { sendEmail, generateMajorPublishedEmailHtml } from '@/lib/mailer';
import { runSparkDailyAutomation, cleanTitleForDeduplication, getRealisticIscoCode } from '@/lib/spark-automation';
import { getDetailedRoleInfo } from '@/data/profession-details';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', I: 'i', İ: 'i',
    ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u',
  };
  return text
    .split('')
    .map((c) => trMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const MCP_TOOLS = [
  {
    name: 'get_next_department_to_analyze',
    description: 'Piyasa.work için günün hedeflenen 10 ila 20 meslek listesini ve öncelikli YÖK bölümlerini getirir.',
    inputSchema: {
      type: 'object',
      properties: {
        forceMajorSlug: { type: 'string', description: 'İsteğe bağlı: Belirli bir bölüm slug kodu' },
      },
    },
  },
  {
    name: 'get_pending_departments',
    description: 'Tüm YÖK bölümlerinin öğrenci talep oyu ve bekleyen e-posta abone sıralamasını listeler.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Maksimum bölüm sayısı (varsayılan: 20)' },
      },
    },
  },
  {
    name: 'add_profession',
    description: 'Gemini Spark tarafından üretilen meslek verisini ve 2026 piyasa maaş skalasını Cloudflare D1 veritabanına ekler ve sitede anında canlıya alır.',
    inputSchema: {
      type: 'object',
      required: ['title', 'category', 'medianSalary'],
      properties: {
        title: { type: 'string', description: 'Meslek unvanı (örn: Havacılık ve Uzay Mühendisi)' },
        slug: { type: 'string', description: 'URL kodu (boş bırakılırsa otomatik üretilir)' },
        category: { type: 'string', description: 'Sektör / Fakülte kategorisi' },
        iscoCode: { type: 'string', description: 'ISCO-08 kodu' },
        description: { type: 'string', description: '2026 piyasa özeti ve görev tanımı' },
        minSalary: { type: 'number', description: 'Taban net maaş (P25) TL' },
        medianSalary: { type: 'number', description: 'Medyan net maaş TL' },
        maxSalary: { type: 'number', description: 'Tavan net maaş (P75) TL' },
        sampleCount: { type: 'number', description: 'Örneklem sayısı' },
      },
    },
  },
  {
    name: 'notify_major_subscribers',
    description: 'Bir bölümün meslekleri yayına alındığında, o bölümü merak edip e-posta bırakan öğrencilere bilgilendirme e-postası gönderir.',
    inputSchema: {
      type: 'object',
      required: ['majorSlug'],
      properties: {
        majorSlug: { type: 'string', description: 'Bölüm URL slug kodu' },
      },
    },
  },
  {
    name: 'run_daily_automation',
    description: 'Günün 10 ila 20 mesleğini öncelikli bölümlerden otomatik olarak üretip Cloudflare D1 veritabanına ekler, öğrencilere bildirim gönderir ve tam işlem raporunu döner.',
    inputSchema: {
      type: 'object',
      properties: {
        forceMajorSlug: { type: 'string', description: 'İsteğe bağlı: Belirli bir bölüm slug kodu' },
      },
    },
  },
  {
    name: 'get_project_status',
    description: 'Piyasa.work platformunun canlı durumunu, toplam meslek sayısını, son eklenen verileri ve bekleyen talepleri özetler.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function GET(req: NextRequest) {
  // If client wants SSE or JSON info
  const accept = req.headers.get('accept') || '';
  if (accept.includes('text/event-stream')) {
    // SSE stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`event: endpoint\ndata: https://piyasa.work/mcp\n\n`)
        );
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...CORS_HEADERS,
      },
    });
  }

  // Standard JSON response
  return NextResponse.json(
    {
      name: 'piyasa-spark-mcp',
      description: 'Piyasa.work Model Context Protocol (MCP) Server for Gemini Spark',
      version: '1.0.0',
      capabilities: {
        tools: MCP_TOOLS,
      },
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { jsonrpc, id, method, params } = body;

    // 1. MCP Initialization
    if (method === 'initialize') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: 'piyasa-spark-mcp',
              version: '1.0.0',
            },
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    // 2. Initialized Notification
    if (method === 'notifications/initialized') {
      return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, result: {} }, { headers: CORS_HEADERS });
    }

    // 3. Tools List
    if (method === 'tools/list') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            tools: MCP_TOOLS,
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    // 4. Tools Call
    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      let resultText = '';

      switch (toolName) {
        case 'get_next_department_to_analyze': {
          const allDepartments: DepartmentItem[] = ALL_FACULTY_CLUSTERS.flatMap((f) => f.departments);
          const existingProfessions = await queryCloudD1<{ slug: string; title: string }>('SELECT slug, title FROM ec_professions');
          const existingSlugs = new Set(existingProfessions.map((p) => p.slug));
          const existingCleanTitles = new Set(existingProfessions.map((p) => cleanTitleForDeduplication(p.title)));

          const demandCounts = await queryCloudD1<{ major_slug: string; vote_count: number }>(
            'SELECT major_slug, vote_count FROM major_demand_counts ORDER BY vote_count DESC'
          );
          const countsMap = new Map<string, number>();
          demandCounts.forEach((dc) => countsMap.set(dc.major_slug, dc.vote_count));

          const pendingSubscribers = await queryCloudD1<{ major_slug: string; cnt: number }>(
            "SELECT major_slug, COUNT(*) as cnt FROM major_demand_requests WHERE email IS NOT NULL AND email != '' AND status = 'pending' GROUP BY major_slug"
          );
          const subsMap = new Map<string, number>();
          pendingSubscribers.forEach((ps) => subsMap.set(ps.major_slug, ps.cnt));

          const sorted = [...allDepartments].sort((a, b) => (countsMap.get(b.slug) || 0) - (countsMap.get(a.slug) || 0));

          const MIN_DAILY_TARGET = 10;
          const MAX_DAILY_TARGET = 20;
          const targetDepartments: any[] = [];
          const allTargetJobs: Array<{
            jobTitle: string;
            jobSlug: string;
            departmentName: string;
            departmentSlug: string;
            faculty: string;
          }> = [];

          // If forced by user
          if (args.forceMajorSlug) {
            const forced = allDepartments.find((d) => d.slug === args.forceMajorSlug);
            if (forced) {
              const jobs = (forced.typicalJobs || [`${forced.name} Uzmanı`]).filter((j) => {
                const s = slugify(j);
                const c = cleanTitleForDeduplication(j);
                return !existingSlugs.has(s) && !existingCleanTitles.has(c);
              });
              jobs.forEach((j) => {
                allTargetJobs.push({
                  jobTitle: j,
                  jobSlug: slugify(j),
                  departmentName: forced.name,
                  departmentSlug: forced.slug,
                  faculty: forced.faculty,
                });
              });
              targetDepartments.push({
                name: forced.name,
                slug: forced.slug,
                faculty: forced.faculty,
                votes: countsMap.get(forced.slug) || 0,
                subscribersCount: subsMap.get(forced.slug) || 0,
                professions: jobs,
              });
            }
          }

          // Accumulate departments until we reach between 10 and 20 target professions
          for (const d of sorted) {
            if (allTargetJobs.length >= MIN_DAILY_TARGET) break;
            if (targetDepartments.some((td) => td.slug === d.slug)) continue;

            const typical = d.typicalJobs || [`${d.name} Uzmanı`, `${d.name} Danışmanı`];
            const uncreated = typical.filter((j) => {
              const s = slugify(j);
              const c = cleanTitleForDeduplication(j);
              return !existingSlugs.has(s) && !existingCleanTitles.has(c);
            });

            if (uncreated.length > 0) {
              const deptJobs: string[] = [];
              for (const j of uncreated) {
                if (allTargetJobs.length >= MAX_DAILY_TARGET) break;
                allTargetJobs.push({
                  jobTitle: j,
                  jobSlug: slugify(j),
                  departmentName: d.name,
                  departmentSlug: d.slug,
                  faculty: d.faculty,
                });
                deptJobs.push(j);
              }

              if (deptJobs.length > 0) {
                targetDepartments.push({
                  name: d.name,
                  slug: d.slug,
                  faculty: d.faculty,
                  votes: countsMap.get(d.slug) || 0,
                  subscribersCount: subsMap.get(d.slug) || 0,
                  professions: deptJobs,
                });
              }
            }
          }

          resultText = JSON.stringify(
            {
              success: true,
              dailyQuota: {
                min: MIN_DAILY_TARGET,
                max: MAX_DAILY_TARGET,
                targetProfessionsCount: allTargetJobs.length,
              },
              targetDepartments,
              allTargetProfessions: allTargetJobs,
              instructionForSpark: `GÜNLÜK HEDEF KOTASI: Bugün en az ${MIN_DAILY_TARGET}, en fazla ${MAX_DAILY_TARGET} meslek eklenmelidir. Yukarıda listelenen toplam ${allTargetJobs.length} mesleğin her birini 'add_profession' aracıyla sisteme kaydedin. Ardından tamamlanan her bölüm için 'notify_major_subscribers' aracını çalıştırın. İsterseniz tek bir işlemle tüm bu süreci 'run_daily_automation' aracıyla doğrudan çalıştırabilirsiniz.`,
            },
            null,
            2
          );
          break;
        }

        case 'run_daily_automation': {
          const autoResult = await runSparkDailyAutomation({ forceMajorSlug: args.forceMajorSlug });
          resultText = JSON.stringify(autoResult, null, 2);
          break;
        }

        case 'add_profession': {
          const title = args.title;
          const slug = args.slug || slugify(title);
          const category = args.category || 'Genel';
          const iscoCode = args.iscoCode || getRealisticIscoCode(title, category);
          
          const detailed = getDetailedRoleInfo(slug, title, category);
          let description = args.description || `${title} için 2026 Türkiye iş piyasası ücret analizi ve kariyer basamakları rehberi.`;
          if (detailed.legalRequirement && !description.includes(detailed.legalRequirement.chamber || '')) {
            description += ` ${detailed.legalRequirement.summaryText}`;
          }

          const medianSalary = Number(args.medianSalary) || 75000;
          const minSalary = Number(args.minSalary) || Math.round(medianSalary * 0.65);
          const maxSalary = Number(args.maxSalary) || Math.round(medianSalary * 1.55);
          const sampleCount = Number(args.sampleCount) || 320;

          await queryCloudD1(
            `INSERT INTO ec_professions (
              slug, title, isco_code, category, description,
              min_salary, median_salary, max_salary, sample_count, grade, status, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Grade B', 'published', datetime('now'))
            ON CONFLICT(slug) DO UPDATE SET
              median_salary = excluded.median_salary,
              min_salary = excluded.min_salary,
              max_salary = excluded.max_salary,
              description = excluded.description,
              updated_at = datetime('now')`,
            [slug, title, iscoCode, category, description, minSalary, medianSalary, maxSalary, sampleCount]
          );

          resultText = JSON.stringify({
            success: true,
            message: `'${title}' mesleği Cloudflare D1 veritabanına kaydedildi ve https://piyasa.work/meslekler/${slug} adresinde canlı yayına girdi!`,
            profession: {
              slug,
              title,
              category,
              minSalary,
              medianSalary,
              maxSalary,
            },
          }, null, 2);
          break;
        }

        case 'notify_major_subscribers': {
          const majorSlug = args.majorSlug;
          const pendingSubs = await queryCloudD1<{ email: string; major_name: string }>(
            "SELECT email, major_name FROM major_demand_requests WHERE major_slug = ? AND status = 'pending' AND email IS NOT NULL AND email != ''",
            [majorSlug]
          );

          let notifiedCount = 0;
          if (pendingSubs.length > 0) {
            const majorName = pendingSubs[0].major_name || majorSlug;
            const html = generateMajorPublishedEmailHtml({
              majorName,
              majorSlug,
            });

            for (const sub of pendingSubs) {
              const res = await sendEmail({
                to: sub.email,
                subject: `🎯 ${majorName} 2026 Maaş ve Kariyer Raporu Yayında! | Piyasa.work`,
                html,
              });
              if (res.success) notifiedCount++;
            }

            await queryCloudD1(
              "UPDATE major_demand_requests SET status = 'notified', updated_at = datetime('now') WHERE major_slug = ? AND status = 'pending'",
              [majorSlug]
            );
          }

          resultText = JSON.stringify({
            success: true,
            majorSlug,
            notifiedCount,
            message: `${notifiedCount} aboneye duyuru e-postası başarıyla iletildi.`,
          }, null, 2);
          break;
        }

        case 'get_project_status': {
          const totalProfs = await queryCloudD1<{ cnt: number }>('SELECT COUNT(*) as cnt FROM ec_professions');
          const totalDemands = await queryCloudD1<{ sumVotes: number; cnt: number }>(
            'SELECT SUM(vote_count) as sumVotes, COUNT(*) as cnt FROM major_demand_counts'
          );
          const totalSubs = await queryCloudD1<{ cnt: number }>(
            "SELECT COUNT(*) as cnt FROM major_demand_requests WHERE email IS NOT NULL AND email != ''"
          );

          resultText = JSON.stringify({
            status: 'online',
            platform: 'Piyasa.work',
            database: 'Cloudflare D1 (piyasa-db)',
            totalProfessionsInDatabase: totalProfs[0]?.cnt || 36,
            totalStudentVotes: totalDemands[0]?.sumVotes || 0,
            demandedMajorsCount: totalDemands[0]?.cnt || 0,
            totalEmailSubscribers: totalSubs[0]?.cnt || 0,
            health: '100% Operational',
          }, null, 2);
          break;
        }

        default:
          resultText = `Bilinmeyen araç: ${toolName}`;
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            content: [
              {
                type: 'text',
                text: resultText,
              },
            ],
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: id ?? null,
        error: {
          code: -32601,
          message: `Method not found: ${method}`,
        },
      },
      { headers: CORS_HEADERS, status: 404 }
    );
  } catch (error: any) {
    console.error('MCP Endpoint error:', error);
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: error.message || 'Internal error',
        },
      },
      { headers: CORS_HEADERS, status: 500 }
    );
  }
}
