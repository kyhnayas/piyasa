'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Briefcase, Building2, Award, ArrowRight } from 'lucide-react';
import { PROFESSIONS_DATA } from '@/data/mock-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Türkçe karakter duyarlı normalizasyon
  const normalize = (str: string) =>
    str
      .toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .trim();

  const cleanQ = normalize(query);

  const filteredProfessions = cleanQ
    ? PROFESSIONS_DATA.filter((p) =>
        normalize(p.title).includes(cleanQ) ||
        normalize(p.summary).includes(cleanQ) ||
        normalize(p.category).includes(cleanQ) ||
        p.skills.some((s) => normalize(s).includes(cleanQ))
      )
    : PROFESSIONS_DATA.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/50 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Meslek, unvan, beceri veya sektör ara..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors ml-2"
            aria-label="Aramayı kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Panel */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              {query ? 'Eşleşen Meslekler' : 'Öne Çıkan Meslekler'}
            </div>
            {filteredProfessions.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                &ldquo;{query}&rdquo; ile eşleşen bir meslek kaydı bulunamadı.
              </div>
            ) : (
              <div className="space-y-1 mt-1">
                {filteredProfessions.map((p) => (
                  <Link
                    key={p.id}
                    href={`/meslekler/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-teal-50/50 hover:border-teal-200 border border-transparent transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-900">
                          {p.title}
                        </div>
                        <div className="text-xs text-slate-500">{p.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-teal-800 tabular-nums">
                        {p.salaryStats.median.toLocaleString('tr-TR')} ₺
                      </div>
                      <div className="text-[10px] text-slate-400">Medyan Net</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="pt-3 mt-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
              Hızlı Araçlar
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link
                href="/maas-hesapla"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 bg-slate-50 hover:bg-white text-xs font-medium text-slate-800 transition-all"
              >
                <span>Maaş Hesaplama Motoru</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/maas-karsilastir"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 bg-slate-50 hover:bg-white text-xs font-medium text-slate-800 transition-all"
              >
                <span>Ücret Karşılaştırma</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Piyasa İş Veri Motoru (v1.0)</span>
          <span className="flex items-center space-x-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px]">
              ESC
            </kbd>
            <span>ile kapat</span>
          </span>
        </div>
      </div>
    </div>
  );
}
