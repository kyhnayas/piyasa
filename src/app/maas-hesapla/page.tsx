'use client';

import React, { useState } from 'react';
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Building2,
  Briefcase,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { PROFESSIONS_DATA, CITIES, SECTORS } from '@/data/mock-data';
import { calculateMarketSalary } from '@/lib/salary-engine';

export default function SalaryCalculatorPage() {
  const [professionSlug, setProfessionSlug] = useState(PROFESSIONS_DATA[0].slug);
  const [citySlug, setCitySlug] = useState(CITIES[0].slug);
  const [sectorSlug, setSectorSlug] = useState(SECTORS[0].slug);
  const [experienceYears, setExperienceYears] = useState(3);
  const [careerLevel, setCareerLevel] = useState('mid');
  const [employmentType, setEmploymentType] = useState<'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE'>('FULL_TIME');

  const selectedProf = PROFESSIONS_DATA.find((p) => p.slug === professionSlug) || PROFESSIONS_DATA[0];

  const result = calculateMarketSalary(selectedProf.salaryStats.median, {
    professionSlug,
    citySlug,
    sectorSlug,
    experienceYears,
    careerLevelSlug: careerLevel,
    employmentType,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
          Analitik Motoru
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Maaş Hesaplama Motoru
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Mesleğinize, deneyiminize ve yaşadığınız şehre göre Türkiye iş piyasasındaki tahmini ücret dağılımınızı anında hesaplayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Filtre ve Parametreler
          </h2>

          {/* Profession Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Meslek / Unvan</label>
            <select
              value={professionSlug}
              onChange={(e) => setProfessionSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
            >
              {PROFESSIONS_DATA.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* City Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Çalışma Lokasyonu / Şehir</label>
            <select
              value={citySlug}
              onChange={(e) => setCitySlug(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
            >
              {CITIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Sektör</label>
            <select
              value={sectorSlug}
              onChange={(e) => setSectorSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
            >
              {SECTORS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Deneyim Süresi</span>
              <span className="text-teal-800 font-bold">{experienceYears} Yıl</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 (Yeni Mezun)</span>
              <span>10 Yıl</span>
              <span>20+ Yıl</span>
            </div>
          </div>

          {/* Career Level Radio */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Kariyer Seviyesi</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'junior', label: 'Junior' },
                { id: 'mid', label: 'Mid' },
                { id: 'senior', label: 'Senior' },
                { id: 'lead', label: 'Lead' },
                { id: 'manager', label: 'Yönetici' },
                { id: 'director', label: 'Direktör' },
              ].map((lvl) => (
                <button
                  type="button"
                  key={lvl.id}
                  onClick={() => setCareerLevel(lvl.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    careerLevel === lvl.id
                      ? 'bg-teal-700 text-white border-teal-700 font-semibold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Output & Distribution */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Hesaplanan Piyasa Dağılımı
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {result.professionTitle}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-semibold">
                Net Ücret
              </span>
            </div>

            {/* Central Median Result */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/80 text-center space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tahmini Medyan Net Maaş
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tabular-nums">
                {result.salaryMedian.toLocaleString('tr-TR')} ₺
                <span className="text-sm font-normal text-slate-500 ml-1.5">/ ay</span>
              </div>
              <div className="text-xs text-teal-700 font-medium">
                Örneklem Güveni: Yüksek (%{Math.round(result.confidenceScore * 100)}) · {result.sampleSize} Doğrulanmış Gözlem
              </div>
            </div>

            {/* Percentile Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Min</div>
                <div className="text-sm font-bold text-slate-800 tabular-nums mt-0.5">
                  {result.salaryMin.toLocaleString('tr-TR')} ₺
                </div>
              </div>
              <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100 text-center">
                <div className="text-[10px] uppercase font-bold text-teal-700">P25 (Alt Bant)</div>
                <div className="text-sm font-bold text-teal-900 tabular-nums mt-0.5">
                  {result.salaryP25.toLocaleString('tr-TR')} ₺
                </div>
              </div>
              <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100 text-center">
                <div className="text-[10px] uppercase font-bold text-teal-700">P75 (Üst Bant)</div>
                <div className="text-sm font-bold text-teal-900 tabular-nums mt-0.5">
                  {result.salaryP75.toLocaleString('tr-TR')} ₺
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Max</div>
                <div className="text-sm font-bold text-slate-800 tabular-nums mt-0.5">
                  {result.salaryMax.toLocaleString('tr-TR')} ₺
                </div>
              </div>
            </div>

            {/* Disclaimer & Transparency Box */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Piyasa Şeffaflık & Hukuki Uyarı</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {result.disclaimer}
              </p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/50">
                {result.methodologyNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
