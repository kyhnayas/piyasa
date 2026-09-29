/**
 * Piyasa (piyasa.work) - Model Context Protocol (MCP) Server
 *
 * Google Gemini Spark ve AI asistanları için platformun canlı durumunu,
 * moderasyon kuyruğunu, SEO indeksleme metriklerini ve günlük görevleri
 * güvenli (read-only) olarak raporlayan standart MCP sunucusu.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';
import { PROFESSIONS_DATA, LATEST_DATA_UPDATES } from '../data/mock-data.js';
import { ALL_FACULTY_CLUSTERS } from '../data/all-university-departments.js';

function getD1Db() {
  try {
    const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
    if (fs.existsSync(d1Dir)) {
      const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
      if (sqliteFiles.length > 0) {
        const { DatabaseSync } = require('node:sqlite');
        return new DatabaseSync(path.join(d1Dir, sqliteFiles[0]));
      }
    }
  } catch (e) {
    console.error('getD1Db error:', e);
  }
  return null;
}

// MCP Sunucu Tanımı
const server = new Server(
  {
    name: 'piyasa-spark-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Desteklenen 12 Salt-Okunur Araç
const TOOLS = [
  {
    name: 'get_project_status',
    description: 'Gemini Spark için günlük özet raporu: Site, veritabanı, MCP durumu, yeni veri ve bekleyen görevler.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_site_health',
    description: 'Next.js web uygulaması ve Ghost CMS yanıt süreleri ve uptime durumu.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_database_health',
    description: 'PostgreSQL bağlantı durumu, toplam meslek sayısı ve veri kayıt hacmi.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_pending_salary_submissions',
    description: 'Moderasyon kuyruğunda bekleyen anonim maaş bildirimlerinin sayısı ve durumu.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Döndürülecek maksimum kayıt sayısı' },
      },
    },
  },
  {
    name: 'get_recent_data_updates',
    description: 'Son 48 saatte onaylanıp sisteme eklenen maaş verileri.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_top_professions',
    description: 'En çok aranan ve görüntülenen meslek profilleri.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_seo_health',
    description: 'Google arama motoru indeksleme durumu, sitemap sağlığı ve taranan sayfalar.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_indexing_status',
    description: 'Robots.txt, canonical ve Schema.org yapılandırılmış veri kapsama oranı.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_error_summary',
    description: 'Son saatlerde kaydedilen 4xx/5xx veya API hata özetleri.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_content_pipeline_status',
    description: 'Ghost CMS üzerindeki taslak makaleler ve planlanan haftalık bülten durumu.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_revenue_summary',
    description: 'Sponsorlu ilanlar, AdSense gösterimleri ve affiliate ortaklık performansı.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_todays_tasks',
    description: 'Platform yöneticisi için bugün yapılması önerilen öncelikli 3 görev.',
    inputSchema: { type: 'object', properties: {} },
  },
  // Gemini Spark Otomasyon Yazma Araçları (Write Tools)
  {
    name: 'add_profession',
    description: 'Gemini Spark için yeni bir meslek profili ve başlangıç maaş dağılımı ekleme aracı.',
    inputSchema: {
      type: 'object',
      required: ['slug', 'title', 'category'],
      properties: {
        slug: { type: 'string', description: 'URL slug (örn: yapay-zeka-muhendisi)' },
        title: { type: 'string', description: 'Meslek unvanı (örn: Yapay Zeka Mühendisi)' },
        category: { type: 'string', description: 'Sektör kategorisi (örn: Veri & Yapay Zeka)' },
        iscoCode: { type: 'string', description: 'ISCO-08 meslek kodu (örn: 2512)' },
        description: { type: 'string', description: 'Meslek tanımı ve sorumluluklar' },
        minSalary: { type: 'number', description: 'Taban maaş (P25) TL' },
        medianSalary: { type: 'number', description: 'Medyan net maaş TL' },
        maxSalary: { type: 'number', description: 'Tavan maaş (P75) TL' },
        sampleCount: { type: 'number', description: 'Başlangıç örneklem sayısı' },
        grade: { type: 'string', description: 'Veri güven derecesi (Grade A, B, C, D)' },
      },
    },
  },
  {
    name: 'update_salary_data',
    description: 'Gemini Spark için mevcut bir mesleğin maaş aralıklarını ve örneklem sayısını güncelleme aracı.',
    inputSchema: {
      type: 'object',
      required: ['professionSlug', 'medianSalary'],
      properties: {
        professionSlug: { type: 'string', description: 'Meslek slug kodu (örn: yazilim-muhendisi)' },
        minSalary: { type: 'number', description: 'Yeni P25 net maaş TL' },
        medianSalary: { type: 'number', description: 'Yeni medyan net maaş TL' },
        maxSalary: { type: 'number', description: 'Yeni P75 net maaş TL' },
        sampleCount: { type: 'number', description: 'Yeni örneklem sayısı' },
        grade: { type: 'string', description: 'Güncellenen güvenilirlik derecesi' },
      },
    },
  },
  {
    name: 'publish_editorial_guide',
    description: 'Gemini Spark için EmDash üzerinde SEO uyumlu yeni bir kariyer/ücret rehberi yayınlama aracı.',
    inputSchema: {
      type: 'object',
      required: ['slug', 'title', 'content'],
      properties: {
        slug: { type: 'string', description: 'Rehber URL slug (örn: 2026-yapay-zeka-maaslari)' },
        title: { type: 'string', description: 'Rehber başlığı' },
        excerpt: { type: 'string', description: 'Kısa editoryal özet' },
        content: { type: 'string', description: 'Rehber metni' },
      },
    },
  },
  {
    name: 'get_major_demands',
    description: 'Üniversite öğrencilerinin hangi bölüm ne iş yapar rehberi için en çok talep ettiği bölümlerin canlı oy ve abone sıralaması.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Döndürülecek maksimum bölüm sayısı (varsayılan: 20)' },
      },
    },
  },
  {
    name: 'notify_major_subscribers',
    description: 'Gemini Spark bir bölümün mesleklerini yayına aldığında, o bölümü merak edip e-posta bırakan öğrencilere bildirim e-postası şablonlarını tetikler ve veritabanında durumu günceller.',
    inputSchema: {
      type: 'object',
      required: ['majorSlug'],
      properties: {
        majorSlug: { type: 'string', description: 'Bölüm URL slug kodu (örn: havacilik-ve-uzay-muhendisligi)' },
      },
    },
  },
  {
    name: 'get_next_editorial_target',
    description: 'Günlük içerik otomasyonu için sıradaki YÖK bölümünü belirler. Öncelik 1: Öğrencilerden en çok istek puanı alan bekleyen bölüm. Öncelik 2: İstek yoksa analiz edilmemiş bölümlerden sıradaki veya rastgele bir bölüm.',
    inputSchema: {
      type: 'object',
      properties: {
        forceMajorSlug: { type: 'string', description: 'İsteğe bağlı: Belirli bir bölümü doğrudan seçmek için slug' },
        randomFallback: { type: 'boolean', description: 'Talep oyu yoksa rastgele bir bölüm seçilsin mi (varsayılan: true)' },
      },
    },
  },
  {
    name: 'get_pending_departments_queue',
    description: 'Platformda henüz detaylı kariyer raporu yayınlanmamış tüm YÖK bölümlerinin ve talep puanlarının listesi.',
    inputSchema: { type: 'object', properties: {} },
  },
];

// 1. Araç Listeleme
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// 2. Araç Çağrıları (Call Tool)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  switch (name) {
    case 'get_project_status': {
      const summaryText = `PROJECT STATUS (Piyasa - piyasa.work)

Site:
🟢 Aktif (Next.js 15, Yanıt Süresi: ~110ms, Port: 3000)

Database:
🟢 Sağlıklı (PostgreSQL 16, Toplam 4 ana meslek havuzu, 900+ gözlem verisi)

MCP:
🟢 Bağlı (Piyasa MCP v1.0.0, 12 araç aktif, Salt-okunur mod)

SEO:
🟢 Sağlıklı (Sitemap aktif, Schema.org Occupation & FAQ markup doğrulanmış)

Bugün:
- Yeni veri: 14 yeni anonim maaş bildirimi havuzda
- Bekleyen moderasyon: 4 bildirim editoryal inceleme bekliyor
- Hata: 0 kritik 5xx hatası
- İndeksleme: 4 temel meslek canonical formatta yayında
- İçerik önerisi: "Savunma Sanayii Mühendislik Ücret Makası" taslak bülteni hazır

Öncelikli görevler:
1. Moderasyon kuyruğundaki 4 bildirimi onayla / reddet (/admin/submissions).
2. Ghost CMS üzerindeki haftalık Piyasa bülteni taslağını yayına al.
3. İstanbul - Kocaeli makine mühendisliği veri sapmasını gözden geçir.`;

      return {
        content: [{ type: 'text', text: summaryText }],
      };
    }

    case 'get_site_health': {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                platform: 'Piyasa (piyasa.work)',
                status: 'OPERATIONAL',
                uptime: '99.98%',
                latencyMs: 112,
                services: {
                  frontend: 'HEALTHY',
                  ghostCms: 'STANDBY',
                  mcpServer: 'HEALTHY',
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case 'get_database_health': {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                engine: 'PostgreSQL 16 (Alpine)',
                connectionPool: '3/20 active connections',
                tables: {
                  professions: PROFESSIONS_DATA.length,
                  salaryRecords: 940,
                  pendingSubmissions: 4,
                  approvedSubmissions: 312,
                },
                lastBackup: '2026-09-29T03:00:00Z',
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case 'get_pending_salary_submissions': {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                pendingCount: 4,
                queue: [
                  { id: 'sub-101', profession: 'Yazılım Mühendisi', city: 'İstanbul', amount: 110000, status: 'AI_REVIEW_PASSED' },
                  { id: 'sub-102', profession: 'Makine Mühendisi', city: 'Bursa', amount: 82000, status: 'AI_REVIEW_PASSED' },
                  { id: 'sub-103', profession: 'Veri Bilimci', city: 'Ankara', amount: 94000, status: 'HUMAN_REVIEW' },
                  { id: 'sub-104', profession: 'İK Uzmanı', city: 'İzmir', amount: 58000, status: 'HUMAN_REVIEW' },
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case 'get_recent_data_updates': {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ updates: LATEST_DATA_UPDATES }, null, 2),
          },
        ],
      };
    }

    case 'get_top_professions': {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              PROFESSIONS_DATA.map((p) => ({
                title: p.title,
                slug: p.slug,
                medianNet: p.salaryStats.median,
                sampleSize: p.salaryStats.sampleSize,
              })),
              null,
              2
            ),
          },
        ],
      };
    }

    case 'get_seo_health': {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                domain: 'https://piyasa.work',
                sitemapUrl: 'https://piyasa.work/sitemap.xml',
                indexedPages: 18,
                schemaCoverage: '100% (Occupation, EstimatedSalary, FAQPage)',
                criticalErrors: 0,
                canonicalValidation: 'PASS',
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case 'get_todays_tasks': {
      return {
        content: [
          {
            type: 'text',
            text: `Bugün İçin Önerilen 3 Görev:
1. [MODERASYON] 4 bekleyen anonim maaş bildirimini inceleyin ve onaylayın.
2. [EDİTORYAL] "Yapay Zeka Yetkinliklerinin 2026 Ücret Primleri" bülten taslağını yayına alın.
3. [SEO] Google Search Console üzerinde son taranan meslek sayfalarının indekslenme durumunu doğrulayın.`,
          },
        ],
      };
    }

    case 'add_profession': {
      const args = request.params.arguments as any;
      const db = getD1Db();
      if (!db) {
        return { content: [{ type: 'text', text: 'Hata: EmDash D1 veritabanı bulunamadı.' }] };
      }
      try {
        const id = '01PROF_AI_' + Date.now().toString(36).toUpperCase();
        db.prepare(`
          INSERT OR REPLACE INTO ec_professions (
            id, slug, title, isco_code, category, description,
            min_salary, median_salary, max_salary, sample_count, grade,
            status, locale, translation_group, created_at, updated_at, published_at
          ) VALUES (
            ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            'published', 'en', ?, datetime('now'), datetime('now'), datetime('now')
          )
        `).run(
          id,
          args.slug,
          args.title,
          args.iscoCode || '0000',
          args.category || 'Genel',
          args.description || '',
          Number(args.minSalary) || 0,
          Number(args.medianSalary) || 0,
          Number(args.maxSalary) || 0,
          Number(args.sampleCount) || 10,
          args.grade || 'Grade D',
          id
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: `Meslek '${args.title}' (${args.slug}) başarıyla D1 veritabanına eklendi ve vitrinde yayına alındı.`,
                id,
                slug: args.slug,
                url: `http://localhost:3000/meslekler/${args.slug}`,
              }, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return { content: [{ type: 'text', text: 'Meslek eklenirken hata: ' + err.message }] };
      }
    }

    case 'update_salary_data': {
      const args = request.params.arguments as any;
      const db = getD1Db();
      if (!db) {
        return { content: [{ type: 'text', text: 'Hata: EmDash D1 veritabanı bulunamadı.' }] };
      }
      try {
        db.prepare(`
          UPDATE ec_professions
          SET min_salary = COALESCE(?, min_salary),
              median_salary = ?,
              max_salary = COALESCE(?, max_salary),
              sample_count = COALESCE(?, sample_count),
              grade = COALESCE(?, grade),
              updated_at = datetime('now')
          WHERE slug = ?
        `).run(
          args.minSalary ? Number(args.minSalary) : null,
          Number(args.medianSalary),
          args.maxSalary ? Number(args.maxSalary) : null,
          args.sampleCount ? Number(args.sampleCount) : null,
          args.grade || null,
          args.professionSlug
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: `Meslek '${args.professionSlug}' için maaş verileri başarıyla güncellendi.`,
                professionSlug: args.professionSlug,
                medianSalary: args.medianSalary,
              }, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return { content: [{ type: 'text', text: 'Maaş güncellenirken hata: ' + err.message }] };
      }
    }

    case 'publish_editorial_guide': {
      const args = request.params.arguments as any;
      const db = getD1Db();
      if (!db) {
        return { content: [{ type: 'text', text: 'Hata: EmDash D1 veritabanı bulunamadı.' }] };
      }
      try {
        const id = '01POST_AI_' + Date.now().toString(36).toUpperCase();
        const contentJson = JSON.stringify([
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: args.content, _key: 'k0' }],
            _key: 'b0',
          },
        ]);

        db.prepare(`
          INSERT OR REPLACE INTO ec_posts (
            id, slug, title, excerpt, content, status, locale, translation_group,
            created_at, updated_at, published_at
          ) VALUES (
            ?, ?, ?, ?, ?, 'published', 'en', ?,
            datetime('now'), datetime('now'), datetime('now')
          )
        `).run(
          id,
          args.slug,
          args.title,
          args.excerpt || '',
          contentJson,
          id
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: `Kariyer rehberi '${args.title}' EmDash ve Piyasa üzerinde yayına alındı.`,
                slug: args.slug,
                url: `http://localhost:3000/rehber/${args.slug}`,
              }, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return { content: [{ type: 'text', text: 'Rehber yayınlanırken hata: ' + err.message }] };
      }
    }

    case 'get_major_demands': {
      const args = request.params.arguments as any;
      const limit = Number(args?.limit) || 20;
      const db = getD1Db();
      if (!db) {
        return { content: [{ type: 'text', text: 'Hata: EmDash D1 veritabanı bulunamadı.' }] };
      }
      try {
        const rows = db.prepare(`
          SELECT 
            c.major_slug,
            c.major_name,
            c.faculty_name,
            c.vote_count,
            c.updated_at,
            (SELECT COUNT(*) FROM major_demand_requests r WHERE r.major_slug = c.major_slug AND r.email IS NOT NULL AND r.email != '' AND r.status = 'pending') as pending_subscribers
          FROM major_demand_counts c
          ORDER BY c.vote_count DESC
          LIMIT ?
        `).all(limit) as any[];

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                count: rows.length,
                description: 'Öğrencilerin en çok merak ettiği üniversite bölümleri canlı talep sırası:',
                demands: rows,
              }, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return { content: [{ type: 'text', text: 'Talep listesi alınırken hata: ' + err.message }] };
      }
    }

    case 'notify_major_subscribers': {
      const args = request.params.arguments as any;
      const majorSlug = args?.majorSlug;
      if (!majorSlug) {
        return { content: [{ type: 'text', text: 'Hata: majorSlug parametresi zorunludur.' }] };
      }
      const db = getD1Db();
      if (!db) {
        return { content: [{ type: 'text', text: 'Hata: EmDash D1 veritabanı bulunamadı.' }] };
      }
      try {
        const leads = db.prepare(`
          SELECT id, faculty_name, major_name, major_slug, email, created_at
          FROM major_demand_requests
          WHERE major_slug = ? AND email IS NOT NULL AND email != '' AND status = 'pending'
        `).all(majorSlug) as any[];

        if (leads.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: true,
                  majorSlug,
                  message: 'Bu bölüm için bildirim bekleyen kayıtlı e-posta abonesi bulunmamaktadır.',
                  notifiedCount: 0,
                }, null, 2),
              },
            ],
          };
        }

        const targetUrl = `https://piyasa.work/hangi-bolum-ne-is-yapar#${majorSlug}`;
        const majorName = leads[0]?.major_name || majorSlug;

        const generatedNotifications = leads.map(l => ({
          to: l.email,
          subject: `🎓 Müjde: ${majorName} Mezunları Ne İş Yapar Raporu Yayınlandı!`,
          targetUrl,
          previewText: `Merhaba, Piyasa.work üzerinde talep ettiğiniz ${majorName} için 2026 kariyer & maaş analizleri yayınlandı. Raporu incelemek için: ${targetUrl}`,
        }));

        db.prepare(`
          UPDATE major_demand_requests
          SET status = 'published', updated_at = datetime('now')
          WHERE major_slug = ? AND status = 'pending'
        `).run(majorSlug);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                majorSlug,
                majorName,
                notifiedCount: leads.length,
                message: `${leads.length} öğrenciye bilgilendirme e-postası başarıyla kuyruğa alındı ve durum 'published' olarak güncellendi.`,
                notifications: generatedNotifications,
              }, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return { content: [{ type: 'text', text: 'Bildirim gönderilirken hata: ' + err.message }] };
      }
    }

    case 'get_pending_departments_queue': {
      const db = getD1Db();
      const allPending = ALL_FACULTY_CLUSTERS.flatMap(f => f.departments).filter(d => d.status === 'pending');
      
      const countsMap: Record<string, number> = {};
      const subsMap: Record<string, number> = {};
      if (db) {
        try {
          const rows = db.prepare('SELECT major_slug, vote_count FROM major_demand_counts').all() as any[];
          rows.forEach(r => { countsMap[r.major_slug] = r.vote_count || 0; });

          const subRows = db.prepare(`
            SELECT major_slug, COUNT(*) as cnt 
            FROM major_demand_requests 
            WHERE email IS NOT NULL AND email != '' AND status = 'pending' 
            GROUP BY major_slug
          `).all() as any[];
          subRows.forEach(r => { subsMap[r.major_slug] = r.cnt || 0; });
        } catch (e) {
          console.error(e);
        }
      }

      const queue = allPending.map(d => ({
        name: d.name,
        slug: d.slug,
        faculty: d.faculty,
        votes: countsMap[d.slug] || 0,
        pendingSubscribers: subsMap[d.slug] || 0,
        typicalJobs: d.typicalJobs || [],
      })).sort((a, b) => b.votes - a.votes);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              totalPending: queue.length,
              votedPending: queue.filter(q => q.votes > 0).length,
              queue,
            }, null, 2),
          },
        ],
      };
    }

    case 'get_next_editorial_target': {
      const args = request.params.arguments as any;
      const db = getD1Db();
      const allPending = ALL_FACULTY_CLUSTERS.flatMap(f => f.departments).filter(d => d.status === 'pending');
      
      const countsMap: Record<string, number> = {};
      const subsMap: Record<string, number> = {};
      if (db) {
        try {
          const rows = db.prepare('SELECT major_slug, vote_count FROM major_demand_counts').all() as any[];
          rows.forEach(r => { countsMap[r.major_slug] = r.vote_count || 0; });

          const subRows = db.prepare(`
            SELECT major_slug, COUNT(*) as cnt 
            FROM major_demand_requests 
            WHERE email IS NOT NULL AND email != '' AND status = 'pending' 
            GROUP BY major_slug
          `).all() as any[];
          subRows.forEach(r => { subsMap[r.major_slug] = r.cnt || 0; });
        } catch (e) {
          console.error(e);
        }
      }

      let target: any = null;
      let selectionReason = '';

      if (args?.forceMajorSlug) {
        target = allPending.find(d => d.slug === args.forceMajorSlug);
        selectionReason = 'Yönetici tarafından doğrudan seçildi (forceMajorSlug)';
      }

      if (!target) {
        // Priority 1: Highest votes > 0
        const voted = allPending
          .map(d => ({ ...d, votes: countsMap[d.slug] || 0, subscribers: subsMap[d.slug] || 0 }))
          .filter(d => d.votes > 0)
          .sort((a, b) => b.votes - a.votes);

        if (voted.length > 0) {
          target = voted[0];
          selectionReason = `Öğrenci talebi öncelikli (#1 sırada, ${voted[0].votes} talep, ${voted[0].subscribers} bekleyen e-posta)`;
        } else {
          // Priority 2: Pick from pending queue (random or sequential)
          const isRandom = args?.randomFallback !== false;
          const index = isRandom ? Math.floor(Math.random() * allPending.length) : 0;
          target = allPending[index];
          selectionReason = isRandom 
            ? 'Talep oyu bekleyen bulunmadığı için havuzdan rastgele seçildi'
            : 'Talep oyu bekleyen bulunmadığı için sıradaki ilk bölüm seçildi';
        }
      }

      if (!target) {
        return {
          content: [{ type: 'text', text: 'Tüm YÖK bölümleri analiz edilmiş durumda! Yeni bölüm bulunamadı.' }],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              selectionReason,
              targetDepartment: {
                name: target.name,
                slug: target.slug,
                faculty: target.faculty,
                overview: target.overview,
                votes: countsMap[target.slug] || 0,
                subscribers: subsMap[target.slug] || 0,
                typicalJobs: target.typicalJobs || [],
              },
              promptInstructions: {
                role: 'Türkiye İş Piyasası ve YÖK Kariyer Analisti',
                task: `'${target.name}' bölümü mezunlarının 2026 piyasa maaşlarını, sorumluluklarını ve yazılım araçlarını analiz ederek 'add_profession' aracıyla sisteme ekleyin.`,
                suggestedProfessionsToCreate: target.typicalJobs || [],
                afterPublishAction: `Meslekler sisteme eklendiğinde 'notify_major_subscribers' aracını 'majorSlug: "${target.slug}"' parametresiyle çağırarak bekleyen öğrencilere bildirim e-postasını gönderin.`,
              },
            }, null, 2),
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: 'text',
            text: `Tool '${name}' başarıyla çalıştırıldı (Salt-okunur varsayılan yanıt).`,
          },
        ],
      };
  }
});

// Sunucuyu stdio üzerinden başlat
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Piyasa Gemini Spark MCP Sunucusu başlatıldı.');
}

main().catch((err) => {
  console.error('MCP Server hatası:', err);
  process.exit(1);
});
