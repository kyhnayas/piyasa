import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://piyasa.work'),
  title: {
    default: 'Piyasa | Türkiye İş Piyasasını Verilerle Keşfet',
    template: '%s | Piyasa',
  },
  description:
    'Meslekler, ücret aralıkları, kariyer basamakları ve pazar trendleri. Türkiye iş piyasasının güvenilir ve kaynaklandırılmış dijital veri platformu.',
  keywords: [
    'Türkiye maaşları',
    'meslek maaşları',
    'kariyer rehberi',
    'yazılım mühendisi maaşı',
    'makine mühendisi maaşı',
    'iş piyasası verileri',
    'piyasa.work',
  ],
  authors: [{ name: 'Piyasa Araştırma Ekibi' }],
  creator: 'Piyasa',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://piyasa.work',
    title: 'Piyasa | Türkiye İş Piyasasını Verilerle Keşfet',
    description:
      'Meslekleri, ücretleri, kariyer yollarını ve iş piyasasındaki değişimleri tek bir yerde keşfet.',
    siteName: 'Piyasa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piyasa | Türkiye İş Piyasasını Verilerle Keşfet',
    description: 'Meslekler · Ücretler · Kariyer · Veriler',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://piyasa.work/#organization',
        name: 'Piyasa',
        url: 'https://piyasa.work',
        logo: 'https://piyasa.work/favicon.svg',
        description: 'Türkiye iş piyasasının güvenilir ve kaynaklandırılmış dijital veri platformu.',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://piyasa.work/#website',
        url: 'https://piyasa.work',
        name: 'Piyasa',
        publisher: {
          '@id': 'https://piyasa.work/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://piyasa.work/meslekler?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
