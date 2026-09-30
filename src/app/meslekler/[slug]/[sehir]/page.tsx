import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  MapPin, 
  Building2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Briefcase,
  ChevronRight,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { getProfessionAsync } from '@/lib/professions';
import { TURKEY_81_CITIES, getCityBySlug, getCityCostOfLivingAnalysis } from '@/data/turkey-cities';
import { TotalCompensationWidget } from '@/components/TotalCompensationWidget';
import { AdBanner } from '@/components/AdBanner';
import { CitySelector } from '@/components/CitySelector';

interface PageProps {
  params: Promise<{ slug: string; sehir: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, sehir } = await params;
  const profession = await getProfessionAsync(slug);
  const city = getCityBySlug(sehir);

  if (!profession || !city) {
    return { title: 'Sayfa Bulunamadı | Piyasa' };
  }

  const cityMedian = Math.round(profession.salaryStats.median * city.multiplier);
  const diffSign = city.diffPercent >= 0 ? `+${city.diffPercent}%` : `${city.diffPercent}%`;

  return {
    title: `${city.name} ${profession.title} Maaşları (2026 Güncel)`,
    description: `${city.name} ilinde ${profession.title} ne kadar kazanır? 2026 yılı güncel medyan net maaş: ${cityMedian.toLocaleString('tr-TR')} ₺ (Türkiye ortalamasına göre ${diffSign}). Şehir bazlı yaşam maliyeti ve ücret aralıkları.`,
    alternates: {
      canonical: `https://piyasa.work/meslekler/${profession.slug}/${city.slug}`,
    },
    openGraph: {
      title: `${city.name} ${profession.title} Maaşları (2026)`,
      description: `${city.name} için 2026 yılı medyan net maaş: ${cityMedian.toLocaleString('tr-TR')} ₺.`,
      url: `https://piyasa.work/meslekler/${profession.slug}/${city.slug}`,
    },
  };
}

export default async function CityProfessionPage({ params }: PageProps) {
  const { slug, sehir } = await params;
  const profession = await getProfessionAsync(slug);
  const city = getCityBySlug(sehir);

  if (!profession || !city) {
    notFound();
  }

  const { salaryStats } = profession;
  const cityMedian = Math.round(salaryStats.median * city.multiplier);
  const cityP25 = Math.round(salaryStats.p25 * city.multiplier);
  const cityP75 = Math.round(salaryStats.p75 * city.multiplier);
  const cityMin = Math.round(salaryStats.min * city.multiplier);
  const cityMax = Math.round(salaryStats.max * city.multiplier);

  const diffText = city.diffPercent >= 0 
    ? `+${city.diffPercent}% (Türkiye ortalamasının üzerinde)`
    : `${city.diffPercent}% (Bölgesel alım gücü ve kira dengesi)`;

  const livingAnalysis = getCityCostOfLivingAnalysis(city.slug, profession.title);

  // Other major comparison cities
  const comparisonCities = TURKEY_81_CITIES.filter(c => 
    ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'kocaeli'].includes(c.slug) && c.slug !== city.slug
  ).slice(0, 5);

  // Schema.org Graph (BreadcrumbList + Occupation)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Ana Sayfa',
            item: 'https://piyasa.work',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Meslekler',
            item: 'https://piyasa.work/meslekler',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: profession.title,
            item: `https://piyasa.work/meslekler/${profession.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: `${city.name} ${profession.title}`,
            item: `https://piyasa.work/meslekler/${profession.slug}/${city.slug}`,
          },
        ],
      },
      {
        '@type': 'Occupation',
        name: `${city.name} ${profession.title}`,
        description: `${city.name} ilinde ${profession.title} pozisyonu için 2026 yılı sektörel maaş dağılımı.`,
        occupationalCategory: profession.category,
        estimatedSalary: {
          '@type': 'MonetaryAmountDistribution',
          name: 'baseSalary',
          currency: 'TRY',
          minValue: cityMin,
          median: cityMedian,
          maxValue: cityMax,
          percentile25: cityP25,
          percentile75: cityP75,
        },
      },
    ],
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 flex-wrap">
            <Link href="/" className="hover:text-slate-900 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/meslekler" className="hover:text-slate-900 transition-colors">Meslekler</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href={`/meslekler/${profession.slug}`} className="hover:text-slate-900 transition-colors">{profession.title}</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-bold">{city.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-700" />
                  <span>{city.name} ({city.plate})</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  Bölge: {city.region}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                  TÜİK Bölgesel Endeks: {city.multiplier}x
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {city.name} <span className="text-teal-700">{profession.title}</span> Maaşları (2026)
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {city.name} ilinde çalışan bir <strong>{profession.title}</strong> için 2026 yılı güncel medyan net maaş <strong>{cityMedian.toLocaleString('tr-TR')} ₺/ay</strong> olarak hesaplanmıştır. Yerel kira giderleri ve alım gücü endeksine göre Türkiye genelinden farkı <strong>{diffText}</strong> düzeyindedir.
              </p>
            </div>

            {/* Action Buttons: City Selector & General Link */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <CitySelector
                currentCitySlug={city.slug}
                professionSlug={profession.slug}
                professionTitle={profession.title}
              />
              <Link
                href={`/meslekler/${profession.slug}`}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Tüm Türkiye Raporu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Localized Salary Distribution Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {city.name} Taban Net (P25)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {cityP25.toLocaleString('tr-TR')} ₺
            </div>
            <p className="text-xs text-slate-500">
              Giriş & orta düzey uzmanlar için beklenen alt aralık.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-900 via-slate-900 to-indigo-950 text-white shadow-md space-y-2">
            <div className="text-[11px] font-bold text-teal-300 uppercase tracking-wider flex items-center justify-between">
              <span>{city.name} Medyan Net Maaş</span>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px]">TÜİK Ağırlıklı</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {cityMedian.toLocaleString('tr-TR')} ₺
            </div>
            <p className="text-xs text-teal-100">
              Piyasadaki çalışanların %50&apos;si bu tutarın üzerinde kazanmaktadır.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {city.name} Tavan Net (P75)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {cityP75.toLocaleString('tr-TR')} ₺
            </div>
            <p className="text-xs text-slate-500">
              Kıdemli ve uzmanlaşmış profesyonellerin kazandığı üst çeyrek.
            </p>
          </div>
        </div>

        {/* Total Compensation Widget with City Values */}
        <TotalCompensationWidget
          baseMonthlyNet={cityMedian}
          professionTitle={`${city.name} ${profession.title}`}
        />

        {/* Regional Purchasing Power & Cost of Living Analysis */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-700" />
              <span>{city.name} Şehrinde Yaşam Maliyeti ve Alım Gücü Değerlendirmesi</span>
            </h2>
            <p className="text-xs text-slate-500">
              TÜİK İBBS Düzey-2 bölgesel tüketim harcamaları ve konut kira ortalamaları referans alınmıştır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">Metropol & Bölge Karşılaştırması:</div>
              <p>
                {livingAnalysis.metropolComparison}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">Pazarlıkta Dikkat Edilmesi Gerekenler:</div>
              <p>
                {livingAnalysis.bargainingTip}
              </p>
            </div>
          </div>
        </div>

        {/* Other Cities Comparison Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Diğer Şehirlerde {profession.title} Maaşları
              </h3>
              <p className="text-xs text-slate-500">
                Aynı pozisyon için Türkiye genelindeki farklı metropollerin medyan ücretleri
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {comparisonCities.map(otherCity => {
              const otherMedian = Math.round(salaryStats.median * otherCity.multiplier);
              return (
                <Link
                  key={otherCity.slug}
                  href={`/meslekler/${profession.slug}/${otherCity.slug}`}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-teal-300 transition-all text-left group"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{otherCity.name}</span>
                    <span className="font-bold text-teal-700">{otherCity.multiplier}x</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1.5 group-hover:text-teal-900 transition-colors">
                    {otherMedian.toLocaleString('tr-TR')} ₺
                  </div>
                  <div className="text-[10px] text-teal-700 font-semibold mt-1 flex items-center justify-between">
                    <span>Şehri İncele</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Ad & CTA Banner */}
        <AdBanner
          type="lead"
          title={`${city.name} Şehrinde Çalışıyorsanız Maaşınızı Anonim Bildirin`}
          description="Yerel maaş veri setimizi genişletmek ve bölgesel şeffaflığı artırmak için katkıda bulunun. Kimliğiniz gizli tutulur."
          ctaText="Maaş Bildir"
          ctaLink="/maas-bildir"
        />
      </div>
    </div>
  );
}
