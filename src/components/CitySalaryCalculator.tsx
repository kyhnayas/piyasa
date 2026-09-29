'use client';

import React, { useState } from 'react';
import { MapPin, TrendingUp, Info, Check } from 'lucide-react';
import { TURKEY_81_CITIES, CityData } from '@/data/turkey-cities';

interface Props {
  baseMedianSalary: number;
  baseMinSalary: number;
  baseMaxSalary: number;
  professionTitle: string;
}

export function CitySalaryCalculator({
  baseMedianSalary,
  baseMinSalary,
  baseMaxSalary,
  professionTitle,
}: Props) {
  const [selectedPlate, setSelectedPlate] = useState<number>(34); // Default: Istanbul

  const selectedCity = TURKEY_81_CITIES.find(c => c.plate === selectedPlate) || TURKEY_81_CITIES[33];

  const cityMedian = Math.round(baseMedianSalary * selectedCity.multiplier);
  const cityP25 = Math.round(baseMinSalary * selectedCity.multiplier);
  const cityP75 = Math.round(baseMaxSalary * selectedCity.multiplier);

  // Top 5 metropolitan benchmarks
  const topCities = [
    TURKEY_81_CITIES.find(c => c.plate === 34)!, // Istanbul
    TURKEY_81_CITIES.find(c => c.plate === 6)!,  // Ankara
    TURKEY_81_CITIES.find(c => c.plate === 35)!, // Izmir
    TURKEY_81_CITIES.find(c => c.plate === 41)!, // Kocaeli
    TURKEY_81_CITIES.find(c => c.plate === 16)!, // Bursa
  ];

  return (
    <div className="space-y-6 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-700" />
            <span>81 İle Göre {professionTitle} Maaşları</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            TÜİK İBBS Düzey-2 bölgesel satın alma gücü ve yerel iş gücü piyasası katsayılarıyla hesaplanmıştır.
          </p>
        </div>

        {/* 81 City Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="city-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            İl Seçin:
          </label>
          <select
            id="city-select"
            value={selectedPlate}
            onChange={(e) => setSelectedPlate(Number(e.target.value))}
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 cursor-pointer shadow-sm"
          >
            {TURKEY_81_CITIES.map((c) => (
              <option key={c.plate} value={c.plate}>
                {c.plate.toString().padStart(2, '0')} - {c.name} ({c.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected City Result Highlight Card */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50/80 via-white to-slate-50 border border-teal-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
              {selectedCity.name} ({selectedCity.region} Bölgesi)
            </span>
            <span className={`text-xs font-bold ${selectedCity.diffPercent >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
              Türkiye Ortalamasına Göre: {selectedCity.diffPercent >= 0 ? `+${selectedCity.diffPercent}%` : `${selectedCity.diffPercent}%`}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {cityMedian.toLocaleString('tr-TR')} ₺
            <span className="text-xs sm:text-sm font-medium text-slate-500 ml-1.5">/ ay net medyan</span>
          </div>
          <div className="text-xs text-slate-500 tabular-nums">
            Tahmini Aralık ({selectedCity.name}): <strong>{cityP25.toLocaleString('tr-TR')} ₺</strong> — <strong>{cityP75.toLocaleString('tr-TR')} ₺</strong>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-white/90 p-3.5 rounded-lg border border-slate-200 max-w-sm">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>Bölgesel Faktörler</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            {selectedCity.name} için belirlenen katsayı; kira endeksleri, sanayi/teknoloji kümelenmesi ve yerel iş gücü arz-talep dengesine dayanmaktadır.
          </p>
        </div>
      </div>

      {/* Top 5 Benchmark Quick Comparison */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold text-slate-700">Başlıca Büyükşehir Karşılaştırması</div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {topCities.map((c) => {
            const isSelected = c.plate === selectedPlate;
            const med = Math.round(baseMedianSalary * c.multiplier);
            return (
              <button
                key={c.plate}
                onClick={() => setSelectedPlate(c.plate)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-800 shadow-sm ring-2 ring-teal-500/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`font-bold ${isSelected ? 'text-teal-200' : 'text-slate-600'}`}>
                    {c.name}
                  </span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-white' : c.diffPercent >= 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {c.diffPercent >= 0 ? `+${c.diffPercent}%` : `${c.diffPercent}%`}
                  </span>
                </div>
                <div className={`text-sm font-extrabold mt-1 tabular-nums ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {med.toLocaleString('tr-TR')} ₺
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
