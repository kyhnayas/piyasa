/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  async rewrites() {
    const emdashUrl = process.env.EMDASH_URL || 'http://127.0.0.1:4321';
    const coreRewrites = [
      {
        source: '/rehber',
        destination: `${emdashUrl}/rehber`,
      },
      {
        source: '/rehber/:path*',
        destination: `${emdashUrl}/rehber/:path*`,
      },
      {
        source: '/raporlar',
        destination: `${emdashUrl}/raporlar`,
      },
      {
        source: '/raporlar/:path*',
        destination: `${emdashUrl}/raporlar/:path*`,
      },
      {
        source: '/_emdash/:path*',
        destination: `${emdashUrl}/_emdash/:path*`,
      },
      {
        source: '/_image/:path*',
        destination: `${emdashUrl}/_image/:path*`,
      },
      {
        source: '/_astro/:path*',
        destination: `${emdashUrl}/_astro/:path*`,
      },
    ];

    // Vite development rewrites strictly isolated to development mode to prevent arbitrary file read / information disclosure
    const devRewrites = isDev
      ? [
          {
            source: '/@react-refresh',
            destination: 'http://127.0.0.1:4321/@react-refresh',
          },
          {
            source: '/@vite/:path*',
            destination: 'http://127.0.0.1:4321/@vite/:path*',
          },
          {
            source: '/@id/:path*',
            destination: 'http://127.0.0.1:4321/@id/:path*',
          },
          {
            source: '/@fs/:path*',
            destination: 'http://127.0.0.1:4321/@fs/:path*',
          },
          {
            source: '/src/:path*',
            destination: 'http://127.0.0.1:4321/src/:path*',
          },
          {
            source: '/node_modules/vite/:path*',
            destination: 'http://127.0.0.1:4321/node_modules/vite/:path*',
          },
          {
            source: '/node_modules/@emdash-cms/:path*',
            destination: 'http://127.0.0.1:4321/node_modules/@emdash-cms/:path*',
          },
          {
            source: '/node_modules/emdash/:path*',
            destination: 'http://127.0.0.1:4321/node_modules/emdash/:path*',
          },
        ]
      : [];

    return [...coreRewrites, ...devRewrites];
  },
};

export default nextConfig;
