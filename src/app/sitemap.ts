import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllProfessions } from '@/lib/professions';
import { queryCloudD1 } from '@/lib/cloud-d1';
import { TURKEY_81_CITIES } from '@/data/turkey-cities';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://piyasa.work';

  // 1. Static Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/meslekler`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/hangi-bolum-ne-is-yapar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/maas-hesapla`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/maas-karsilastir`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/maas-bildir`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rehber`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/veri-metodolojisi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/kullanim-sartlari`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Dynamic Professions & Posts
  const dynamicRoutes: MetadataRoute.Sitemap = [];
  const topMetroSlugs = ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'kocaeli', 'adana', 'eskisehir'];

  try {
    let profSlugs: { slug: string; updated_at?: string }[] = [];
    let postSlugs: { slug: string; updated_at?: string }[] = [];

    // 1. Primary: Query Cloudflare D1 (Live production database)
    try {
      const cloudProfs = await queryCloudD1<{ slug: string; updated_at?: string }>(
        "SELECT slug, updated_at FROM ec_professions WHERE status = 'published' OR status IS NULL"
      );
      if (cloudProfs && cloudProfs.length > 0) {
        profSlugs = cloudProfs;
      }
      const cloudPosts = await queryCloudD1<{ slug: string; updated_at?: string }>(
        "SELECT slug, updated_at FROM ec_posts WHERE status = 'published'"
      );
      if (cloudPosts && cloudPosts.length > 0) {
        postSlugs = cloudPosts;
      }
    } catch (d1Err) {
      console.warn('Sitemap Cloudflare D1 query skipped/failed, trying local fallback:', d1Err);
    }

    // 2. Secondary: Local Miniflare sqlite fallback
    if (profSlugs.length === 0) {
      const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
      if (fs.existsSync(d1Dir)) {
        const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
        if (sqliteFiles.length > 0) {
          const { DatabaseSync } = await import('node:sqlite');
          const db = new DatabaseSync(path.join(d1Dir, sqliteFiles[0]));

          profSlugs = db.prepare("SELECT slug, updated_at FROM ec_professions WHERE status = 'published' OR status IS NULL").all() as any[];
          postSlugs = db.prepare("SELECT slug, updated_at FROM ec_posts WHERE status = 'published'").all() as any[];
        }
      }
    }

    // 3. Tertiary: Mock data fallback
    if (profSlugs.length === 0) {
      profSlugs = getAllProfessions().map(p => ({ slug: p.slug }));
    }

    // Add profession URLs and top city programmatic SEO URLs
    for (const p of profSlugs) {
      const modDate = p.updated_at ? new Date(p.updated_at) : new Date();

      // Main profession page
      dynamicRoutes.push({
        url: `${baseUrl}/meslekler/${p.slug}`,
        lastModified: modDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      });

      // Top Metropolitan City pages (Programmatic SEO)
      for (const citySlug of topMetroSlugs) {
        dynamicRoutes.push({
          url: `${baseUrl}/meslekler/${p.slug}/${citySlug}`,
          lastModified: modDate,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }

    // Editorial Guides
    for (const post of postSlugs) {
      dynamicRoutes.push({
        url: `${baseUrl}/rehber/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  } catch (err) {
    console.error('Sitemap generation error:', err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
