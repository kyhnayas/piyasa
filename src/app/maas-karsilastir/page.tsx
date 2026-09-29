'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Check, TrendingUp, Building2, MapPin } from 'lucide-react';
import { PROFESSIONS_DATA, CITIES } from '@/data/mock-data';

export default function SalaryComparePage() {
  const [prof1Slug, setProf1Slug] = useState('yazilim-muhendisi');
  const [prof2Slug, setProf2Slug] = useState('makine-muhendisi');
  const [city1Slug, setCity1Slug] = useState('istanbul');
  const [city2Slug, setCity2Slug] = useState('ankara');

  const p1 = PROFESSIONS_DATA.find((p) => p.slug === prof1Slug) || PROFESSIONS_DATA[0];
  const p2 = PROFESSIONS_DATA.find((p) => p.slug === prof2Slug) || PROFESSIONS_DATA[1];

  const city1 = CITIES.find((c) => c.slug === city1Slug) || CITIES[0];
  const city2 = CITIES.find((c) => c.slug === city2Slug) || CITIES[1];

  const medianDiff = p1.salaryStats.median - p2.salaryStats.median;
  const percentDiff = Math.round((medianDiff / p2.salaryStats.median) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
          Kıyaslama Motoru
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Maaş & Meslek Karşılaştırma
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          İki farklı meslek veya iki farklı şehir arasındaki ücret dağılımını, deneyim basamaklarını ve pazar farklarını yan yana inceleyin.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        {/* Entity 1 */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            1. Meslek / Seçim
          </div>
          <select
            value={prof1Slug}
            onChange={(e) => setProf1Slug(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-teal-600"
          >
            {PROFESSIONS_DATA.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
          <select
            value={city1Slug}
            onChange={(e) => setCity1Slug(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-teal-600"
          >
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Entity 2 */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            2. Meslek / Seçim
          </div>
          <select
            value={prof2Slug}
            onChange={(e) => setProf2Slug(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-teal-600"
          >
            {PROFESSIONS_DATA.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
          <select
            value={city2Slug}
            onChange={(e) => setCity2Slug(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-teal-600"
          >
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Summary Banner */}
      <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          <ArrowLeftRight className="w-4 h-4 text-teal-700 flex-shrink-0" />
          <span>
            <strong>{p1.title}</strong>, Türkiye medyanında <strong>{p2.title}</strong> unvanından yaklaşık{' '}
            <strong className="text-teal-950 font-bold">{Math.abs(percentDiff)}% {percentDiff >= 0 ? 'daha yüksek' : 'daha düşük'}</strong> seyretmektedir.
          </span>
        </div>
        <span className="font-mono text-xs font-bold tabular-nums">
          Fark: {Math.abs(medianDiff).toLocaleString('tr-TR')} ₺
        </span>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs text-slate-400 font-medium">{p1.category}</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{p1.title}</h2>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Medyan Net Ücret
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {p1.salaryStats.median.toLocaleString('tr-TR')} ₺
            </div>
            <div className="text-xs text-slate-500 tabular-nums">
              P25 - P75 Aralığı: {p1.salaryStats.p25.toLocaleString('tr-TR')} - {p1.salaryStats.p75.toLocaleString('tr-TR')} ₺
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">Kariyer Basamağı Ücretleri:</div>
            <div className="space-y-1.5 text-xs">
              {p1.careerLadder.slice(0, 4).map((lvl, idx) => (
                <div key={idx} className="flex justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-700">{lvl.level}</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {lvl.medianNet.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs text-slate-400 font-medium">{p2.category}</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{p2.title}</h2>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Medyan Net Ücret
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {p2.salaryStats.median.toLocaleString('tr-TR')} ₺
            </div>
            <div className="text-xs text-slate-500 tabular-nums">
              P25 - P75 Aralığı: {p2.salaryStats.p25.toLocaleString('tr-TR')} - {p2.salaryStats.p75.toLocaleString('tr-TR')} ₺
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">Kariyer Basamağı Ücretleri:</div>
            <div className="space-y-1.5 text-xs">
              {p2.careerLadder.slice(0, 4).map((lvl, idx) => (
                <div key={idx} className="flex justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-700">{lvl.level}</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {lvl.medianNet.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
