'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  type?: 'native' | 'display' | 'lead';
  slotId?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  verifiedText?: string;
  footerNote?: string;
  className?: string;
}

export function AdBanner({
  type = 'native',
  slotId = 'piyasa-inline-01',
  title,
  description,
  ctaText,
  ctaLink,
  badge = 'Maaş Şeffaflığı',
  verifiedText = 'Anonim & Doğrulanmış',
  footerNote = 'Gizlilik: Kimliğiniz ASLA paylaşılmaz',
  className = '',
}: AdBannerProps) {
  if (type === 'display') {
    return (
      <div className={`w-full my-6 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 flex flex-col items-center justify-center text-center ${className}`}>
        <div className="flex items-center space-x-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
          <span>{badge}</span>
        </div>
        {/* Placeholder for AdSense / Header Bidding snippet */}
        <div className="min-h-[100px] w-full flex flex-col items-center justify-center bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-700">
            {title || 'Piyasa.work Reklam Alanı (Google AdSense / Programatik Uyumlu)'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {description || `Slot ID: ${slotId} · 728x90 / Responsive`}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'lead') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl ${className}`}>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badge || '2026 Piyasa Analizi'}</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {title || 'Sektöründeki Güncel Ücretleri ve Kariyer Fırsatlarını Kaçırma'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {description || 'Anonim veri tabanımızdaki 10.000+ maaş kaydı ve Tukey IQR filtrelemesiyle hazırlanan 2026 sektör raporuna ücretsiz göz atın.'}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href={ctaLink || '/maas-bildir'}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              <span>{ctaText || 'Anonim Maaşını Bildir'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Native Banner
  return (
    <div className={`relative overflow-hidden rounded-xl border border-teal-200/80 bg-gradient-to-br from-teal-50/70 via-white to-sky-50/50 p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded">
          {badge}
        </span>
        <div className="flex items-center text-[11px] text-teal-700 font-medium space-x-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{verifiedText}</span>
        </div>
      </div>
      <div className="space-y-1.5">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-teal-600" />
          {title || 'Maaşınızı Anonim Paylaşarak Piyasa Şeffaflığına Katkı Sağlayın'}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          {description || 'Sektördeki gerçek piyasa taban ve tavanlarını belirlemek amacıyla güncel gelirinizi anonim olarak sisteme bildirin.'}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-teal-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">{footerNote}</span>
        <Link
          href={ctaLink || '/maas-bildir'}
          className="inline-flex items-center space-x-1 text-xs font-bold text-teal-700 hover:text-teal-900 group"
        >
          <span>{ctaText || 'Anonim Maaşını Bildir'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
