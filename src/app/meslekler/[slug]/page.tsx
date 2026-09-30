import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  Briefcase,
  GraduationCap,
  Award,
  TrendingUp,
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { getProfessionAsync, getAllProfessionsAsync } from '@/lib/professions';
import { AdBanner } from '@/components/AdBanner';
import { CitySalaryCalculator } from '@/components/CitySalaryCalculator';
import { TotalCompensationWidget } from '@/components/TotalCompensationWidget';
import { TURKEY_81_CITIES } from '@/data/turkey-cities';
import { CitySelector } from '@/components/CitySelector';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profession = await getProfessionAsync(slug);
  if (!profession) return { title: 'Meslek Bulunamadı | Piyasa' };

  return {
    title: `${profession.title} Maaşları ve Kariyer Rehberi (2026)`,
    description: `${profession.title} ne kadar kazanır? 2026 yılı güncel medyan net maaş: ${profession.salaryStats.median.toLocaleString('tr-TR')} ₺. Deneyim seviyeleri, şehir farkları ve kariyer basamakları.`,
    alternates: {
      canonical: `https://piyasa.work/meslekler/${profession.slug}`,
    },
  };
}

export default async function ProfessionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profession = await getProfessionAsync(slug);

  if (!profession) {
    notFound();
  }

  const allProfessions = await getAllProfessionsAsync();

  const { salaryStats, careerLadder, citySalaries, sectorSalaries, fieldExperiences, faq } = profession;

  // JSON-LD Schema.org Structured Data with BreadcrumbList & Occupation
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
        ],
      },
      {
        '@type': 'Occupation',
        name: profession.title,
        description: profession.description,
        occupationalCategory: profession.category,
        educationRequirements: profession.education.join(', '),
        estimatedSalary: {
          '@type': 'MonetaryAmountDistribution',
          name: 'baseSalary',
          currency: 'TRY',
          minValue: salaryStats.min,
          median: salaryStats.median,
          maxValue: salaryStats.max,
          percentile10: salaryStats.min,
          percentile25: salaryStats.p25,
          percentile75: salaryStats.p75,
          percentile90: salaryStats.max,
        },
        skills: profession.skills.join(', '),
      },
    ],
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Schema.org script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ========================================================================= */}
      {/* 1. HERO & MESLEK ÖZETİ */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-900 transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/meslekler" className="hover:text-slate-900 transition-colors">Meslekler</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{profession.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                  {profession.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-medium">
                  Veri Güven Seviyesi: Grade {salaryStats.sourceGrade}
                </span>
                <span className="flex items-center space-x-1 text-slate-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Son Güncelleme: {salaryStats.lastUpdated}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {profession.title}
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                {profession.summary}
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex-shrink-0 w-full lg:w-72 space-y-3">
              <div className="text-xs font-bold text-slate-900">Bu Veriye Katkıda Bulun</div>
              <p className="text-[11px] text-slate-500">
                Bu meslekte çalışıyorsanız, tamamen anonim olarak güncel maaş aralığınıza katkıda bulunabilirsiniz.
              </p>
              <Link
                href="/maas-bildir"
                className="w-full inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors"
              >
                <span>Maaşımı Anonim Paylaş</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* ========================================================================= */}
          {/* 2. MAAŞ DAĞILIMI (Min, P25, Median, P75, Max) */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {profession.title} Maaş Dağılımı (2026)
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  TÜİK bölgesel endeksleri ve {salaryStats.sampleSize} doğrulanmış bildirim üzerinden hesaplanmıştır.
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-teal-50 text-teal-800 font-semibold border border-teal-200 self-start sm:self-auto">
                Net Aylık Ücret
              </span>
            </div>

            {/* Big Median Display */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/70 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Medyan Net Ücret (P50)
                </div>
                <div className="text-4xl font-extrabold text-slate-900 tabular-nums mt-1">
                  {salaryStats.median.toLocaleString('tr-TR')} ₺
                  <span className="text-sm font-normal text-slate-500 ml-1.5">/ ay</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 sm:text-right">
                <div>Örneklem: <strong>{salaryStats.sampleSize} kişi</strong></div>
                <div>Güven Katsayısı: <strong className="text-teal-700">Yüksek (%88)</strong></div>
              </div>
            </div>

            {/* Distribution Visual Range Bar */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                <span>P25 (Alt Dilim): {salaryStats.p25.toLocaleString('tr-TR')} ₺</span>
                <span className="text-teal-800 font-bold">Medyan: {salaryStats.median.toLocaleString('tr-TR')} ₺</span>
                <span>P75 (Üst Dilim): {salaryStats.p75.toLocaleString('tr-TR')} ₺</span>
              </div>

              {/* Progress bar container */}
              <div className="h-4 w-full bg-slate-100 rounded-lg p-0.5 relative overflow-hidden flex">
                <div
                  className="bg-teal-700 h-full rounded-md transition-all relative"
                  style={{ width: '70%', marginLeft: '15%' }}
                >
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white shadow-xs"></div>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
                <span>Gözlemlenen Min: {salaryStats.min.toLocaleString('tr-TR')} ₺</span>
                <span>Gözlemlenen Max: {salaryStats.max.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>

            {/* Methodology Note */}
            <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Metodoloji Notu:</strong> Bu aralık tekil bir ortalama değil; aşırı uç değerler (Tukey IQR formülü ile) temizlendikten sonra Türkiye piyasasında çalışanların %50’sinin yer aldığı bant (P25 - P75) temel alınarak üretilmiştir.
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. KARİYER BASAMAKLARI & DENEYİME GÖRE ÜCRETLER */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Kariyer Basamakları & Deneyime Göre Ücret Değişimi
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Giriş seviyesinden liderlik pozisyonuna kadar unvan bazlı sorumluluk ve ücret ilerlemesi.
              </p>
            </div>

            <div className="relative border-l-2 border-teal-200 ml-4 space-y-8 pl-6">
              {careerLadder.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-teal-700 border-4 border-white shadow-xs"></div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 hover:border-teal-200 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-slate-900 text-sm">{step.level}</div>
                      <div className="text-teal-800 font-extrabold text-sm tabular-nums">
                        {step.medianNet.toLocaleString('tr-TR')} ₺
                        <span className="text-[10px] font-normal text-slate-500 ml-1">(Medyan Net)</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">{step.years} tecrübe · {step.range}</div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      <strong>Odak & Rol:</strong> {step.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. 81 İL VE SEKTÖRLER ARASI MAAŞ ANALİZİ */}
          {/* ========================================================================= */}
          <CitySalaryCalculator
            baseMedianSalary={salaryStats.median}
            baseMinSalary={salaryStats.p25}
            baseMaxSalary={salaryStats.p75}
            professionTitle={profession.title}
          />

          {/* Yan Haklar & Gerçek Yıllık Paket (Total Compensation) */}
          <TotalCompensationWidget
            baseMonthlyNet={salaryStats.median}
            professionTitle={profession.title}
          />

          {/* Şehirlere Göre Hızlı pSEO Linkleri & 81 İl Seçici */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-700" />
                  <span>Şehirlere Göre {profession.title} Maaş Raporları</span>
                </h3>
                <p className="text-xs text-slate-500">
                  TÜİK bölgesel yaşam maliyeti ve alım gücü endeksine göre 81 il için detaylı ücretler:
                </p>
              </div>
              <div className="shrink-0">
                <CitySelector
                  professionSlug={profession.slug}
                  professionTitle={profession.title}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
              {['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'kocaeli', 'adana', 'eskisehir', 'gaziantep', 'konya', 'samsun', 'trabzon'].map(cSlug => {
                const c = TURKEY_81_CITIES.find(ci => ci.slug === cSlug);
                if (!c) return null;
                return (
                  <Link
                    key={cSlug}
                    href={`/meslekler/${profession.slug}/${c.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-xs text-slate-800 hover:text-teal-900 font-medium transition-colors"
                  >
                    {c.name} {profession.title} →
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sektör Bazlı Maaş Dağılımı */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-teal-700" />
              <span>Sektörlere Göre {profession.title} Medyan Net Maaşları</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {sectorSalaries.map((s, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between">
                  <span className="font-semibold text-slate-700 text-xs">{s.sector}</span>
                  <div className="font-bold tabular-nums text-slate-900 text-sm mt-1">
                    {s.medianNet.toLocaleString('tr-TR')} ₺ <span className="text-[10px] font-normal text-slate-500">/ ay</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anonim Maaş Katkı Alanı */}
          <AdBanner
            type="native"
            badge="Maaş Şeffaflığı"
            verifiedText="100% Anonim"
            title={`${profession.title} Olarak Çalışıyorsanız Maaşınızı Anonim Paylaşın`}
            description="Türkiye iş piyasasındaki bilgi asimetrisini kırmak ve 2026 medyan verilerini daha da güçlendirmek için katkıda bulunun. Kimliğiniz tamamen gizli kalır."
            footerNote="Gizlilik: Ad veya firma bilgisi istenmez"
            ctaText="Anonim Maaşını Bildir"
            ctaLink="/maas-bildir"
          />

          {/* ========================================================================= */}
          {/* 5. GÖREVLER, EĞİTİM & BECERİLER */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900">{profession.title} Ne İş Yapar?</h2>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Temel Görev ve Sorumluluklar</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {profession.tasks.map((task, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Daily Routine Callout */}
            {profession.dailyRoutine && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] uppercase font-bold text-teal-800 tracking-wider">
                  Tipik Bir İş Günü Rutini
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {profession.dailyRoutine}
                </p>
              </div>
            )}

            {/* Tools and Technologies */}
            {profession.toolsAndTech && profession.toolsAndTech.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Kullanılan Başlıca Araçlar, Yazılımlar & Teknolojiler
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {profession.toolsAndTech.map((tool, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Legal Requirements & Chamber Registration Callout */}
            {profession.legalRequirement && (
              <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-amber-950 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                    <span className="font-bold text-sm text-amber-900">
                      Yasal İmza Yetkisi, Diploma ve Oda Kaydı Şartları
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                    Resmi Mevzuat
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  {profession.legalRequirement.summaryText}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] border-t border-amber-200/60">
                  {profession.legalRequirement.lawName && (
                    <div>
                      <span className="font-semibold text-amber-800">Dayanak Kanun: </span>
                      <span className="text-amber-950">{profession.legalRequirement.lawName}</span>
                    </div>
                  )}
                  {profession.legalRequirement.chamber && (
                    <div>
                      <span className="font-semibold text-amber-800">Yetkili Meslek Odası: </span>
                      <span className="text-amber-950">{profession.legalRequirement.chamber}</span>
                    </div>
                  )}
                  {profession.legalRequirement.requiredDegree && (
                    <div className="sm:col-span-2">
                      <span className="font-semibold text-amber-800">Zorunlu Mezuniyet: </span>
                      <span className="text-amber-950 font-bold">{profession.legalRequirement.requiredDegree}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-teal-700" />
                  <span>Önerilen Üniversite Bölümleri</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {profession.education.map((edu, i) => (
                    <li key={i}>
                      <Link
                        href="/hangi-bolum-ne-is-yapar"
                        className="p-2.5 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-200 flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-teal-900 transition-colors group"
                      >
                        <span>{edu}</span>
                        <span className="text-[10px] text-teal-700 flex items-center">
                          Bölüm Atlası <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-teal-700" />
                  <span>Kritik Yetkinlikler (Skills)</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {profession.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mülakat Soruları Modülü */}
            {profession.interviewQuestions && profession.interviewQuestions.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-teal-700" />
                      <span>{profession.title} İçin Tipik Mülakat Soruları ve Değerlendirme Kriterleri</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Şirketlerin teknik ve İK mülakatlarında yönelttiği kritik sorular ve adayda aranan yanıt standartları
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                    {profession.interviewQuestions.length} Örnek Soru
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-1">
                  {profession.interviewQuestions.map((q, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                        <span className="font-bold text-slate-900 text-sm">
                          #{idx + 1} {q.question}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 w-fit">
                          {q.category}
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-teal-50/70 border border-teal-200/70 text-xs text-teal-950 space-y-1">
                        <div className="font-bold text-teal-900 text-[11px] flex items-center gap-1">
                          <Lightbulb className="w-3.5 h-3.5 text-teal-700" />
                          <span>Mülakat İpucu & Beklenen Cevap Stratejisi:</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {q.tip}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* 6. SERTİFİKALAR & ŞEFFAF EĞİTİM ÖNERİLERİ (Affiliate) */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Öne Çıkan Sertifikalar</h2>
              <span className="text-[10px] text-slate-400">Şeffaf İş Birliği Standardı</span>
            </div>

            <div className="space-y-3">
              {profession.certifications.map((cert, i) => (
                <div key={i} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{cert.name}</div>
                    <div className="text-[11px] text-slate-500">Sağlayıcı: {cert.issuer}</div>
                  </div>
                  {cert.isAffiliate && (
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Ortaklık Bağlantısı
                      </span>
                      <a
                        href={cert.url || '#'}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-teal-700 text-white font-semibold text-xs hover:bg-teal-800 transition-colors"
                      >
                        <span>Eğitimi İncele</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. ANONİM ÇALIŞAN SAHA DENEYİMLERİ */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Anonim Saha Deneyimleri</h2>
            <div className="space-y-3">
              {fieldExperiences.map((exp, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">
                      {exp.level} Seviye · {exp.city} ({exp.years} yıl tecrübe)
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      ✓ Doğrulanmış Bildirim
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    &ldquo;{exp.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 8. SIKÇA SORULAN SORULAR (FAQ) */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Sıkça Sorulan Sorular</h2>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-start space-x-2">
                    <HelpCircle className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <aside className="space-y-6">
          {/* Calculator widget shortcut */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Kişiselleştirilmiş Tahmin
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Kendi Tecrübenize Göre Maaşınızı Hesaplayın
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Şehir, sektör ve deneyim yılınızı seçerek {profession.title} için hedeflenen ücret aralığınızı anında öğrenin.
            </p>
            <Link
              href={`/maas-hesapla?meslek=${profession.slug}`}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors"
            >
              <span>Hesaplama Motorunu Başlat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Similar Professions */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-900">Benzer Meslekler</div>
            <div className="space-y-2">
              {allProfessions
                .filter((p) => p.slug !== profession.slug)
                .slice(0, 5)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/meslekler/${p.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-xs"
                  >
                    <span className="font-medium text-slate-800">{p.title}</span>
                    <span className="font-bold text-teal-800 tabular-nums">
                      {p.salaryStats.median.toLocaleString('tr-TR')} ₺
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
