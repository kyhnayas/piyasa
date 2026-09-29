import React from 'react';
import Link from 'next/link';
import { Shield, Cookie, EyeOff, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Gizlilik ve Çerez Politikası | Piyasa.work',
  description: 'Piyasa.work ziyaretçilerinin gizlilik hakları, çerez kullanımı ve veri güvenliği standartları.',
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        {/* Navigation Back */}
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Kullanıcı Güvenliği & Şeffaflık</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gizlilik ve Çerez Politikası
          </h1>
          <p className="text-xs text-slate-500">
            Yürürlük Tarihi: 29 Eylül 2026 · Sürüm: 1.1
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-teal-600" />
              1. Genel Gizlilik Taahhüdü
            </h2>
            <p>
              Piyasa (piyasa.work), kullanıcılarının gizliliğine mutlak saygı duyar. Sitemizi ziyaret etmek, meslek maaşlarını incelemek, bölüm rehberini kullanmak veya maaş hesaplamak için herhangi bir hesap açmanız, e-posta vermeniz veya oturum açmanız gerekmez.
            </p>
          </section>

          <section id="cerezler" className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-teal-600" />
              2. Çerez (Cookie) Kullanımı ve Türleri
            </h2>
            <p>
              Platformumuzda yalnızca sitenin temel işlevselliğini ve veri güvenliğini sağlamaya yönelik asgari çerezler kullanılmaktadır:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-xs font-bold text-teal-800">piyasa_sub_lock</span>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Amaç:</strong> Anonim maaş bildiriminde bulunan kullanıcının sistem verilerini art arda manipüle etmesini önlemek amacıyla tarayıcıya yerleştirilen 7 günlük teknik güvenlik çerezidir. Herhangi bir kişisel veri barındırmaz.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-xs font-bold text-slate-800">Analitik & Performans Çerezleri</span>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Amaç:</strong> Sitenin hangi sayfalarının daha çok ziyaret edildiğini, arama motorlarındaki performansını ve olası hata oranlarını anonim olarak ölçmek için kullanılan standart web metrikleridir.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              3. Reklam ve Dış Bağlantılar
            </h2>
            <p>
              Piyasa.work üzerinde üçüncü taraf reklam ağları (Google AdSense vb.) veya sponsorlu kariyer bağlantıları yer alabilir. Bu harici web sitelerinin kendi gizlilik politikaları geçerlidir; söz konusu sitelerin içerik veya gizlilik uygulamalarından Piyasa sorumlu tutulamaz.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              4. İletişim
            </h2>
            <p>
              Gizlilik ve çerez politikamızla ilgili görüş, öneri ve talepleriniz için lütfen <span className="font-mono text-xs font-semibold text-slate-900">iletisim@piyasa.work</span> adresiyle iletişime geçiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
