'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import { TURKEY_81_CITIES } from '@/data/turkey-cities';

interface CitySelectorProps {
  currentCitySlug?: string;
  professionSlug: string;
  professionTitle: string;
}

export function CitySelector({ currentCitySlug, professionSlug, professionTitle }: CitySelectorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const currentCity = currentCitySlug 
    ? TURKEY_81_CITIES.find(c => c.slug === currentCitySlug)
    : undefined;

  const filteredCities = TURKEY_81_CITIES.filter(c => 
    c.name.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR')) ||
    c.plate.toString().includes(search)
  );

  const handleSelectCity = (slug: string) => {
    setIsOpen(false);
    setSearch('');
    router.push(`/meslekler/${professionSlug}/${slug}`);
  };

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto inline-flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-teal-600 shadow-xs hover:shadow-sm text-xs sm:text-sm font-semibold text-slate-800 transition-all cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-700" />
          <span>{currentCity ? `${currentCity.name} (${currentCity.plate})` : '81 İlden Şehir Seç'}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {/* Search Box */}
            <div className="p-2.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="81 İl Ara (Örn: Bursa, 34, İzmir)..."
                className="w-full text-xs bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 p-1">
              {filteredCities.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400">Şehir bulunamadı.</div>
              ) : (
                filteredCities.map(city => (
                  <button
                    key={city.slug}
                    type="button"
                    onClick={() => handleSelectCity(city.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-xs transition-colors cursor-pointer ${
                      city.slug === currentCitySlug 
                        ? 'bg-teal-50 text-teal-900 font-bold' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 text-[11px] font-mono text-slate-400">{city.plate < 10 ? `0${city.plate}` : city.plate}</span>
                      <span>{city.name}</span>
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {city.multiplier}x
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
