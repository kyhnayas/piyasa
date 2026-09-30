'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  Layers,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  BarChart2,
} from 'lucide-react';
import {
  PROFESSIONS_DATA,
  SECTORS,
  MARKET_TRENDS,
  LATEST_DATA_UPDATES,
} from '@/data/mock-data';
import { SearchModal } from '@/components/SearchModal';

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    setNewsletterError(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'homepage_footer' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Abonelik kaydedilemedi.');
      }
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterError(err.message || 'Bir hata oluştu.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Search-First Data Architecture) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            <span>Kaynaklandırılmış Türkiye İş Piyasası Veritabanı</span>
          </div>

          {/* Primary Brand Message */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Türkiye iş piyasasını <br />
              <span className="text-teal-700">verilerle keşfet.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
              Meslekleri, ücretleri, kariyer yollarını ve iş piyasasındaki değişimleri tek bir yerde keşfet.
            </p>
          </div>

          {/* Search-First Interaction Bar */}
          <div className="max-w-2xl mx-auto">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="group cursor-pointer flex items-center bg-white border border-slate-300 hover:border-teal-600 rounded-xl p-2 sm:p-2.5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="pl-3 pr-2 text-slate-400 group-hover:text-teal-700 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left text-sm sm:text-base text-slate-400 font-normal">
                Meslek, unvan, sektör veya beceri ara...
              </span>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                Veri Ara
              </button>
            </div>
            {/* Quick popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
              <span className="text-slate-400">Popüler:</span>
              {PROFESSIONS_DATA.map((p) => (
                <Link
                  key={p.id}
                  href={`/meslekler/${p.slug}`}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-teal-300 hover:text-teal-800 transition-colors"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/meslekler"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <span>Meslekleri Keşfet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/maas-karsilastir"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-sm font-semibold shadow-xs transition-all"
            >
              <span>Maaşları Karşılaştır</span>
            </Link>
          </div>

          {/* Transparency Pillars */}
          <div className="pt-8 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-xs font-semibold text-slate-900 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Tekil Dağılım Skalası</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Ortalama değil; P25, Medyan ve P75 dilimleri.
              </div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-xs font-semibold text-slate-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>A-F Kaynak Derecesi</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Her verinin şeffaf metodoloji ve güven kodu.
              </div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-xs font-semibold text-slate-900 flex items-center space-x-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Tukey IQR Filtresi</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Aşırı uç ve manipülatif bildirimler elenir.
              </div>
            </div>
            <div className="p-3 bg-white/70 rounded-lg border border-slate-200/60">
              <div className="text-xs font-semibold text-slate-900 flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-teal-600" />
                <span>Çift Moderasyon</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                AI + İnsan onayından geçmeyen veri yayınlanmaz.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. POPÜLER MESLEKLER & GÜNCEL ÜCRET VERİLERİ */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Meslek Kütüphanesi
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Öne Çıkan Meslekler ve Ücret Dağılımları
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              TÜİK, doğrulanmış iş ilanları ve onaylı anonim saha bildirimlerinden derlenen medyan net ücretler.
            </p>
          </div>
          <Link
            href="/meslekler"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <span>Tüm Meslekleri Gör</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFESSIONS_DATA.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {p.category}
                  </span>
                  <span className="font-mono text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                    Grade {p.salaryStats.sourceGrade}
                  </span>
                </div>

                <Link
                  href={`/meslekler/${p.slug}`}
                  className="block text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors"
                >
                  {p.title}
                </Link>

                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {p.summary}
                </p>

                {/* Salary Metric Highlight */}
                <div className="mt-5 p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Medyan Net Maaş
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                    {p.salaryStats.median.toLocaleString('tr-TR')} ₺
                    <span className="text-xs font-normal text-slate-500 ml-1">/ ay</span>
                  </div>

                  {/* Range visual bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 tabular-nums">
                      <span>P25: {p.salaryStats.p25.toLocaleString('tr-TR')} ₺</span>
                      <span>P75: {p.salaryStats.p75.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                      <div className="bg-teal-700 h-full rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {p.salaryStats.sampleSize} veri noktası
                </span>
                <Link
                  href={`/meslekler/${p.slug}`}
                  className="font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                >
                  <span>Analizi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. İŞ PİYASASI TRENDLERİ & GÜNCEL METRİKLER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Market Trends */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Piyasa Nabzı
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                İş Piyasası Değişim & Ücret Trendleri
              </h2>
            </div>

            <div className="space-y-4">
              {MARKET_TRENDS.map((t, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    <TrendingUp className="w-5 h-5 text-teal-700" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{t.title}</h3>
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                        {t.changeRate}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{t.sector}</div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Live Data Stream */}
          <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Canlı Moderasyon Akışı
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Doğrulanmış</span>
              </div>

              <div className="divide-y divide-slate-800 mt-4 space-y-3">
                {LATEST_DATA_UPDATES.map((u, i) => (
                  <div key={i} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-100">{u.profession}</span>
                      <span className="text-emerald-400 font-bold tabular-nums">{u.median}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{u.change}</span>
                      <span className="text-[10px] text-slate-400">{u.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <Link
                href="/maas-bildir"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Siz de Anonim Maaşınızı Bildirin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SEKTÖRLER (Endüstriyel Kapsam) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Sektörel Kapsam
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Türkiye Ekonomisinin Lokomotif Sektörleri
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SECTORS.map((s) => (
            <Link
              key={s.slug}
              href={`/meslekler?sektor=${s.slug}`}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all group flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-700 text-slate-700 flex items-center justify-center transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-teal-900">
                  {s.name}
                </div>
                <div className="text-[11px] text-slate-400">Ücret & Pozisyonlar</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. GHOST BÜLTEN & EDİTORYAL ENTEGRASYON (Piyasa Bülteni) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-teal-950 border border-teal-800 text-teal-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haftalık Piyasa Bülteni</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              İş piyasasındaki maaş ve istihdam değişimlerini e-postanızda görün.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Her salı; yeni eklenen meslek verileri, sektör karşılaştırmaları ve onaylı maaş raporları doğrudan gelen kutunuzda. Spam yok, dilediğiniz an tek tıkla ayrılabilirsiniz.
            </p>

            {newsletterSuccess ? (
              <div className="p-4 rounded-lg bg-teal-950/80 border border-teal-700 text-teal-200 text-xs font-medium">
                ✓ Teşekkürler! Bülten aboneliğiniz alındı. İlk rapor Salı günü iletilecektir.
              </div>
            ) : (
              <div className="space-y-2">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <input
                    type="email"
                    required
                    disabled={newsletterLoading}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="E-posta adresiniz..."
                    className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-500 flex-1 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 text-white text-xs sm:text-sm font-semibold transition-colors flex-shrink-0"
                  >
                    {newsletterLoading ? 'Kaydediliyor...' : 'Ücretsiz Abone Ol'}
                  </button>
                </form>
                {newsletterError && (
                  <p className="text-xs text-rose-400 font-medium">{newsletterError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
