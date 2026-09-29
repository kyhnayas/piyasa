'use client';

import React, { useState } from 'react';
import { X, Sparkles, Mail, Flame, CheckCircle, Bell, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  majorName: string;
  majorSlug: string;
  facultyName: string;
  currentVotes: number;
  onVoteSuccess: (newVotes: number) => void;
}

export function MajorDemandModal({
  isOpen,
  onClose,
  majorName,
  majorSlug,
  facultyName,
  currentVotes,
  onVoteSuccess,
}: Props) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/major-demand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          majorSlug,
          majorName,
          facultyName,
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setSuccessMsg(data.message);
        if (data.updatedVotes) {
          onVoteSuccess(data.updatedVotes);
        }
      } else {
        setErrorMsg(data.error || 'Bir hata oluştu, lütfen tekrar deneyin.');
      }
    } catch (err: any) {
      setErrorMsg('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 max-w-md">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Piyasa Araştırma & Veri Masası</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
              {majorName}
            </h3>
            <p className="text-xs text-teal-200 font-medium">
              {facultyName}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-sm mx-auto">
                <h4 className="text-lg font-bold text-slate-900">Talebiniz Başarıyla Alındı!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {successMsg}
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Tamam, Teşekkürler
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Demand status info */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start space-x-3 text-amber-950">
                <div className="p-1.5 rounded-lg bg-amber-200/60 text-amber-800 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="text-xs leading-relaxed">
                  <strong>
                    {currentVotes > 0
                      ? `Şu ana kadar ${currentVotes} kişi bu bölümün incelenmesini talep etti.`
                      : 'Bu bölüm için henüz talep bildirilmedi. İlk talep eden siz olun!'}
                  </strong>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Ziyaretçi taleplerine göre editoryal araştırma ekibimiz bu bölüm mezunlarının istihdam alanlarını, 2026 sektörel maaş aralıklarını ve piyasada aranan kritik yetkinlikleri öncelikli olarak hazırlayıp yayına alacaktır.
                  </p>
                </div>
              </div>

              {/* Email Input Field */}
              <div className="space-y-2">
                <label htmlFor="demand-email" className="block text-xs font-bold text-slate-800">
                  Rapor Yayınlandığında Beni Bilgilendir (İsteğe Bağlı):
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="demand-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@universite.edu.tr veya e-posta"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  * E-posta adresinizi bırakırsanız; bu bölümün kariyer raporu hazırlandığı an, doğrudan sonuç sayfasına yönlendiren özel bir bağlantı maili alırsınız. Asla spam gönderilmez.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-bold shadow-md hover:shadow-teal-600/20 transition-all"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Kaydediliyor...' : 'Talebi İlet & Oy Ver 🔥'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
