'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { PROFESSIONS_DATA, CITIES, SECTORS } from '@/data/mock-data';

export default function SubmitSalaryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultStats, setResultStats] = useState<any>(null);
  const [professionsList, setProfessionsList] = useState(PROFESSIONS_DATA);

  React.useEffect(() => {
    fetch('/api/professions')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          setProfessionsList(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    professionSlug: 'yazilim-muhendisi',
    city: CITIES[0].name,
    sector: SECTORS[0].name,
    experienceYears: '3',
    employmentType: 'FULL_TIME',
    grossOrNet: 'NET',
    salaryAmount: '',
    bonusIncluded: false,
    companySize: '51-250',
    optionalComment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.salaryAmount) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/salary-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professionSlug: formData.professionSlug,
          salaryAmount: Number(formData.salaryAmount),
          grossOrNet: formData.grossOrNet,
          city: formData.city,
          sector: formData.sector,
          experienceYears: Number(formData.experienceYears),
          employmentType: formData.employmentType,
          companySize: formData.companySize,
          bonusIncluded: formData.bonusIncluded,
          optionalComment: formData.optionalComment
        })
      });
      const data = await res.json();
      if (data.success) {
        setResultStats(data.data);
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Bildirim kaydedilirken bir hata oluştu.');
      }
    } catch (err: any) {
      setErrorMsg('Ağ hatası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
          Saha Verisi Katkısı
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Maaşını Tamamen Anonim Paylaş
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          Türkiye iş piyasasında maaş şeffaflığına katkıda bulunun. İsminiz, e-postanız veya IP adresiniz kaydedilmez. Veriniz Tukey IQR istatistik filtresinden geçtikten sonra anlık olarak meslek havuzuna eklenir.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-start space-x-3 text-xs leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Gizlilik & Doğruluk Garantisi:</strong> Formda kesinlikle kimlik, e-posta veya telefon istenmez. Uç değerler ve trol bildirimler Tukey IQR istatistik algoritması ile filtrelenerek elenir.
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {submitted ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs text-center space-y-5 animate-in fade-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Bildiriminiz Havuzla Eşleşti!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              Katkınız için teşekkürler. Bildiriminiz Tukey IQR filtresinden geçerek başarıyla doğrulandı ve ilgili meslek istatistiği anlık olarak güncellendi.
            </p>
          </div>

          {resultStats && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-xs">
                <span className="text-slate-500">Meslek:</span>
                <span className="font-bold text-slate-900">{resultStats.professionTitle}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Güncel Katılımcı Sayısı:</span>
                <span className="font-bold text-teal-700">{resultStats.sampleCount} kişi</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Yeni Medyan Net Maaş:</span>
                <span className="text-sm font-extrabold text-slate-900">{Number(resultStats.medianSalary).toLocaleString('tr-TR')} ₺ / ay</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Piyasa Aralığı (P25 - P75):</span>
                <span className="font-medium text-slate-700">{Number(resultStats.minSalary).toLocaleString('tr-TR')} ₺ - {Number(resultStats.maxSalary).toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ ...formData, salaryAmount: '' });
              }}
              className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Yeni Bir Veri Paylaş
            </button>
            <Link
              href="/meslekler"
              className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Meslekler Kütüphanesini Gör
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Meslek */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Meslek / Unvan</label>
              <select
                value={formData.professionSlug}
                onChange={(e) => setFormData({ ...formData, professionSlug: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
              >
                {professionsList.map((p: any) => (
                  <option key={p.slug || p.id} value={p.slug}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Şehir */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Şehir</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
              >
                {CITIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sektör */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Sektör</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
              >
                {SECTORS.map((s) => (
                  <option key={s.slug} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Deneyim Yılı */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Toplam Sektör Deneyimi</label>
              <select
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
              >
                <option value="0">0 - 1 Yıl (Yeni Başlayan)</option>
                <option value="2">2 - 3 Yıl (Junior / Mid)</option>
                <option value="5">4 - 6 Yıl (Mid / Senior)</option>
                <option value="8">7 - 10 Yıl (Kıdemli / Lead)</option>
                <option value="12">10+ Yıl (Yönetici / Uzman)</option>
              </select>
            </div>
          </div>

          {/* Ücret Girişi */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-800">
                Aylık Maaş Miktarı (TL) *
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, grossOrNet: 'NET' })}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    formData.grossOrNet === 'NET'
                      ? 'bg-teal-700 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  Net Ele Geçen
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, grossOrNet: 'GROSS' })}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    formData.grossOrNet === 'GROSS'
                      ? 'bg-teal-700 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  Brüt Bordro
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                required
                min="17002"
                max="2000000"
                value={formData.salaryAmount}
                onChange={(e) => setFormData({ ...formData, salaryAmount: e.target.value })}
                placeholder="Örn: 85000"
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-base font-bold text-slate-900 focus:outline-none focus:border-teal-600 tabular-nums"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                ₺ / Ay
              </span>
            </div>

            <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bonusIncluded}
                onChange={(e) => setFormData({ ...formData, bonusIncluded: e.target.checked })}
                className="rounded text-teal-700 focus:ring-teal-600"
              />
              <span>Yıllık prim, ikramiye veya yan haklar bu tutara orantılı olarak dahil edildi</span>
            </label>
          </div>

          {/* Opsiyonel Yorum */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Saha Gözlemi veya Yan Haklar (Opsiyonel)
            </label>
            <textarea
              rows={3}
              value={formData.optionalComment}
              onChange={(e) => setFormData({ ...formData, optionalComment: e.target.value })}
              placeholder="Şirketinizin çalışma modeli (hibrit, ofis), yemek kartı, özel sağlık sigortası veya yan haklar hakkında genel bilgi verebilirsiniz. (Asla şahıs veya gizli kurum bilgisi yazmayınız)."
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm transition-colors"
            >
              Maaş Bilgisini Güvenli ve Anonim Olarak Gönder
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Gönderilen veriler moderasyon onayından geçtikten sonra istatistik havuzuna aktarılır.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
