'use client';

import React, { useState } from 'react';
import { 
  Gift, 
  Check, 
  Plus, 
  HelpCircle, 
  Sparkles, 
  CreditCard, 
  ShieldPlus, 
  Car, 
  Laptop, 
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  baseMonthlyNet: number;
  professionTitle: string;
}

export function TotalCompensationWidget({ baseMonthlyNet, professionTitle }: Props) {
  // Benefits toggles & customizable values
  const [includeFoodCard, setIncludeFoodCard] = useState(true);
  const foodCardMonthly = 6500; // 2026 standard food allowance

  const [includeHealthInsurance, setIncludeHealthInsurance] = useState(true);
  const healthInsuranceMonthly = 4000; // Market value for comprehensive private health insurance

  const [includeTransport, setIncludeTransport] = useState(true);
  const transportMonthly = 2200; // Transport support / corporate shuttle value

  const [bonusMonths, setBonusMonths] = useState<number>(1); // 0, 1, 2 or 3 months annual bonus

  const [includeTechBudget, setIncludeTechBudget] = useState(true);
  const techBudgetMonthly = 2500; // Hardware + training budget equivalent

  const [isExpanded, setIsExpanded] = useState(false);

  // Calculations
  const monthlyBenefitsTotal = 
    (includeFoodCard ? foodCardMonthly : 0) +
    (includeHealthInsurance ? healthInsuranceMonthly : 0) +
    (includeTransport ? transportMonthly : 0) +
    (includeTechBudget ? techBudgetMonthly : 0);

  const annualBaseSalary = baseMonthlyNet * 12;
  const annualBonus = baseMonthlyNet * bonusMonths;
  const annualBenefitsTotal = monthlyBenefitsTotal * 12;

  const totalAnnualCompensation = annualBaseSalary + annualBonus + annualBenefitsTotal;
  const effectiveMonthlyCompensation = Math.round(totalAnnualCompensation / 12);
  const benefitSharePercent = Math.round(((totalAnnualCompensation - annualBaseSalary) / totalAnnualCompensation) * 100);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 p-6 sm:p-8 text-white relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <Gift className="w-3.5 h-3.5" />
              <span>Yan Haklar & Toplam Paket Değeri (Total Comp)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {professionTitle} İçin Gerçek Gelir Paketi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Maaş pazarlığında yalnızca çıplak net ücrete odaklanmak yanıltıcıdır. Yemek kartı, özel sağlık sigortası ve yıllık primlerle birlikte gerçek aylık kazanımınız hesaplanır.
            </p>
          </div>

          {/* Quick Total Comp Badge */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center sm:text-right shrink-0">
            <div className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">
              Gerçek Aylık Paket Değeri
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              {effectiveMonthlyCompensation.toLocaleString('tr-TR')} ₺
            </div>
            <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">
              +%{benefitSharePercent} Ekstra Paket Avantajı
            </div>
          </div>
        </div>
      </div>

      {/* Main Breakdown Area */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Comparison Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold uppercase text-slate-500">1. Çıplak Net Maaş</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1">
              {baseMonthlyNet.toLocaleString('tr-TR')} ₺ <span className="text-xs font-normal text-slate-500">/ ay</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Yıllık: {(baseMonthlyNet * 12).toLocaleString('tr-TR')} ₺</div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
            <div className="text-[11px] font-bold uppercase text-teal-800">2. Aylık Yan Haklar Toplamı</div>
            <div className="text-xl font-extrabold text-teal-950 mt-1">
              +{monthlyBenefitsTotal.toLocaleString('tr-TR')} ₺ <span className="text-xs font-normal text-teal-700">/ ay</span>
            </div>
            <div className="text-[11px] text-teal-700 mt-0.5">Yıllık Değer: {annualBenefitsTotal.toLocaleString('tr-TR')} ₺</div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200">
            <div className="text-[11px] font-bold uppercase text-indigo-800">3. Yıllık Toplam Paket (Total Comp)</div>
            <div className="text-xl font-extrabold text-indigo-950 mt-1">
              {totalAnnualCompensation.toLocaleString('tr-TR')} ₺ <span className="text-xs font-normal text-indigo-700">/ yıl</span>
            </div>
            <div className="text-[11px] text-indigo-600 mt-0.5">Prim ({bonusMonths} maaş) dahil net kazanım</div>
          </div>
        </div>

        {/* Customizable Benefits Checklist */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Pakete Dahil Yan Hakları Özelleştirin:
            </h4>
            <span className="text-[11px] text-slate-500 font-medium">Şirket teklifine göre işaretleyin</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* 1. Yemek Kartı */}
            <label className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
              includeFoodCard ? 'bg-teal-50/40 border-teal-300' : 'bg-white border-slate-200 opacity-60'
            }`}>
              <input
                type="checkbox"
                checked={includeFoodCard}
                onChange={e => setIncludeFoodCard(e.target.checked)}
                className="mt-1 rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
              />
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-teal-700" />
                  <span>Yemek Kartı (Ticket/Multinet)</span>
                </div>
                <div className="text-slate-600">+{foodCardMonthly.toLocaleString('tr-TR')} ₺ / ay (Vergisiz net)</div>
              </div>
            </label>

            {/* 2. Özel Sağlık Sigortası */}
            <label className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
              includeHealthInsurance ? 'bg-teal-50/40 border-teal-300' : 'bg-white border-slate-200 opacity-60'
            }`}>
              <input
                type="checkbox"
                checked={includeHealthInsurance}
                onChange={e => setIncludeHealthInsurance(e.target.checked)}
                className="mt-1 rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
              />
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldPlus className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Kapsamlı Özel Sağlık (ÖSS)</span>
                </div>
                <div className="text-slate-600">~{healthInsuranceMonthly.toLocaleString('tr-TR')} ₺ / ay piyasa primi</div>
              </div>
            </label>

            {/* 3. Yol / Ulaşım */}
            <label className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
              includeTransport ? 'bg-teal-50/40 border-teal-300' : 'bg-white border-slate-200 opacity-60'
            }`}>
              <input
                type="checkbox"
                checked={includeTransport}
                onChange={e => setIncludeTransport(e.target.checked)}
                className="mt-1 rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
              />
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Ulaşım Desteği / Servis</span>
                </div>
                <div className="text-slate-600">+{transportMonthly.toLocaleString('tr-TR')} ₺ / ay tasarruf değeri</div>
              </div>
            </label>

            {/* 4. Teknoloji & Eğitim */}
            <label className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
              includeTechBudget ? 'bg-teal-50/40 border-teal-300' : 'bg-white border-slate-200 opacity-60'
            }`}>
              <input
                type="checkbox"
                checked={includeTechBudget}
                onChange={e => setIncludeTechBudget(e.target.checked)}
                className="mt-1 rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
              />
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-slate-700" />
                  <span>Ekipman (MacBook) & Eğitim</span>
                </div>
                <div className="text-slate-600">~{techBudgetMonthly.toLocaleString('tr-TR')} ₺ / ay bütçe eşdeğeri</div>
              </div>
            </label>

            {/* 5. Yıllık Prim Seçici */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs col-span-1 sm:col-span-2">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Yıllık Performans Primi / İkramiye:</span>
                </div>
                <div className="text-slate-500 text-[11px]">Yıl sonu veya 6 aylık hedef primi</div>
              </div>

              <div className="flex items-center space-x-1.5">
                {[0, 1, 2, 3].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setBonusMonths(m)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                      bonusMonths === m
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m === 0 ? 'Prim Yok' : `${m} Maaş`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Negotiation Pro-Tip Callout */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Maaş Pazarlığı İpucu:</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            İş teklifi aldığınızda şirket taban net maaşta esneyemiyorsa, yemek kartının tavan tutardan yatırılması, kapsamlı özel sağlık sigortası (eş/çocuk dahil) veya yıllık prim garanti yüzdesi talep ederek toplam paket değerinizi %20 ila %35 oranında artırabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
