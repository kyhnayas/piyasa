import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/_emdash/',
        ],
      },
    ],
    sitemap: 'https://piyasa.work/sitemap.xml',
    host: 'https://piyasa.work',
  };
}
