'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronRight, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Code, 
  Wrench, 
  HeartPulse, 
  BadgeDollarSign, 
  TrendingUp, 
  Scale, 
  Palette, 
  Users, 
  Layers,
  Filter
} from 'lucide-react';
import { ProfessionData } from '@/data/mock-data';
import { AdBanner } from '@/components/AdBanner';

interface Props {
  initialProfessions: ProfessionData[];
}

export interface SectorItem {
  id: string;
  name: string;
  shortName: string;
  keywords: string[];
}

export const MAIN_SECTORS: SectorItem[] = [
  { id: 'ALL', name: 'Tüm Sektörler', shortName: 'Tümü', keywords: [] },
  { id: 'bilisim', name: 'Bilişim, Yazılım & AI', shortName: 'Bilişim & AI', keywords: ['yazılım', 'bilgi', 'yapay zeka', 'devops', 'frontend', 'mobil', 'siber', 'veri', 'bilişim'] },
  { id: 'muhendislik', name: 'Mühendislik & İmalat', shortName: 'Mühendislik', keywords: ['makine', 'elektrik', 'inşaat', 'endüstri', 'gıda', 'imalat', 'mühendis'] },
  { id: 'saglik', name: 'Sağlık, Tıp & İlaç', shortName: 'Sağlık & Tıp', keywords: ['sağlık', 'tıp', 'hekim', 'diş', 'eczacı', 'hemşire', 'fizyoterapist', 'ilaç', 'hasta'] },
  { id: 'finans', name: 'Finans, Muhasebe & Bankacılık', shortName: 'Finans', keywords: ['finans', 'muhasebe', 'smmm', 'yatırım', 'banka', 'risk'] },
  { id: 'pazarlama', name: 'Pazarlama & Dijital Medya', shortName: 'Pazarlama & Medya', keywords: ['pazarlama', 'seo', 'reklam', 'medya', 'büyüme', 'iletişim'] },
  { id: 'hukuk', name: 'Hukuk & Mevzuat', shortName: 'Hukuk', keywords: ['hukuk', 'avukat', 'kvkk', 'mevzuat'] },
  { id: 'tasarim', name: 'Tasarım & Mimarlık', shortName: 'Tasarım', keywords: ['tasarım', 'mimar', 'ui/ux', 'grafik', 'sanat'] },
  { id: 'yonetim', name: 'Yönetim, İK & Satış', shortName: 'Yönetim & İK', keywords: ['yönetim', 'insan kaynakları', 'satış', 'lojistik', 'tedarik', 'öğretmen', 'psikolog'] }
];

function matchSector(p: ProfessionData, sectorId: string): boolean {
  if (sectorId === 'ALL') return true;
  const sector = MAIN_SECTORS.find(s => s.id === sectorId);
  if (!sector) return true;
  const text = (p.category + ' ' + p.title + ' ' + p.slug).toLowerCase();
  return sector.keywords.some(k => text.includes(k));
}

export function ProfessionsDirectoryView({ initialProfessions }: Props) {
  const [professions] = useState<ProfessionData[]>(initialProfessions);
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');

  // Count professions in each sector
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: professions.length };
    MAIN_SECTORS.slice(1).forEach(s => {
      counts[s.id] = professions.filter(p => matchSector(p, s.id)).length;
    });
    return counts;
  }, [professions]);

  const filtered = useMemo(() => {
    return professions.filter(p => {
      const inSector = matchSector(p, selectedSector);
      const matchesSearch =
        p.title.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR')) ||
        p.summary.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR')) ||
        p.category.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR'));
      return inSector && matchesSearch;
    });
  }, [professions, selectedSector, search]);

  const activeSectorObj = MAIN_SECTORS.find(s => s.id === selectedSector) || MAIN_SECTORS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Student Explorer Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-teal-300 uppercase tracking-wide">
              Üniversite & Mezun Kariyer Atlası
            </div>
            <p className="text-sm font-semibold text-slate-100 mt-0.5">
              Hangi üniversite bölümü mezunu hangi mesleği yapar ve ne kadar kazanır?
            </p>
          </div>
        </div>
        <Link
          href="/hangi-bolum-ne-is-yapar"
          className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
        >
          <span>Bölüm Rehberini İncele</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Meslekler & Ücret Kütüphanesi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Türkiye iş piyasasındaki sektörler, unvanlar ve 2026 yılı doğrulanmış medyan ücret dağılımları.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>İŞKUR & ISCO-08 Uyumlu</span>
        </div>
      </div>

      {/* 2-Tier Sector & Search Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        {/* Tier 1: Search & Sector Dropdown Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Meslek unvanı, anahtar kelime veya ISCO kodu ara... (Örn: DevOps, Avukat, SMMM, Hekim)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sector Selector Dropdown for Mobile / Direct Pick */}
          <div className="flex items-center space-x-2">
            <label htmlFor="sector-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap hidden sm:inline">
              Sektör:
            </label>
            <select
              id="sector-select"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 cursor-pointer shadow-sm"
            >
              {MAIN_SECTORS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({sectorCounts[s.id] || 0})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tier 2: Sleek Sector Segmented Pills (Clean & Single / Multi-wrap capped) */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MAIN_SECTORS.map((s) => {
            const isSelected = selectedSector === s.id;
            const count = sectorCounts[s.id] || 0;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSector(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{s.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-teal-800 text-teal-100' : 'bg-slate-200 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status line */}
        <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
          <span>
            <strong>{activeSectorObj.name}</strong> kapsamında <strong>{filtered.length}</strong> meslek listeleniyor
          </span>
          {selectedSector !== 'ALL' && (
            <button
              onClick={() => setSelectedSector('ALL')}
              className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold"
            >
              Tüm Sektörleri Göster
            </button>
          )}
        </div>
      </div>

      {/* Grid of Professions */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Filter className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Seçilen kriterlere uygun meslek bulunamadı</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Arama terimini değiştirebilir veya sektör filtresini "Tüm Sektörler" olarak ayarlayabilirsiniz.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedSector('ALL'); }}
            className="inline-flex px-4 py-2 rounded-lg bg-teal-50 text-teal-700 font-semibold text-xs border border-teal-200"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {p.category}
                  </span>
                  <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                    Grade {p.salaryStats?.sourceGrade || 'B'}
                  </span>
                </div>

                <Link
                  href={`/meslekler/${p.slug}`}
                  className="text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors block"
                >
                  {p.title}
                </Link>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {p.summary}
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Medyan Net Maaş</div>
                  <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                    {p.salaryStats?.median ? p.salaryStats.median.toLocaleString('tr-TR') : '—'} ₺
                    <span className="text-xs font-normal text-slate-500 ml-1">/ ay</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 tabular-nums">
                    Aralık: {p.salaryStats?.p25 ? p.salaryStats.p25.toLocaleString('tr-TR') : '—'} - {p.salaryStats?.p75 ? p.salaryStats.p75.toLocaleString('tr-TR') : '—'} ₺
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">{p.salaryStats?.sampleSize || 350} bildirim</span>
                <Link
                  href={`/meslekler/${p.slug}`}
                  className="font-semibold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                >
                  <span>Detaylı İncele</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Monetization Slot */}
      <AdBanner
        type="lead"
        title="2026 Meslek Ücret Raporunu İndirin"
        description="40'tan fazla meslek grubuna ait 2026 yılı doğrulanmış taban ve tavan maaş verileriyle kariyerinizi veya iş tekliflerinizi doğru planlayın."
        ctaText="Anonim Maaşını Bildir"
        ctaLink="/maas-bildir"
        className="mt-12"
      />
    </div>
  );
}
