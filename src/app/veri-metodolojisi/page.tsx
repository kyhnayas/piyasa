import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, BarChart2, AlertCircle, FileText } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-slate-200 pb-6">
        <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
          Şeffaflık & Standartlar
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Veri Metodolojisi ve Güvenlik İlkeleri
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Piyasa (piyasa.work), Türkiye iş piyasasındaki ücret ve kariyer dinamiklerini tekil ve yanıltıcı &ldquo;ortalama maaş&rdquo; algısından kurtararak, kaynaklandırılmış istatistiksel dağılımlarla sunar.
        </p>
      </div>

      {/* Principle 1: Dil ve Tarafsızlık */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-teal-700" />
          <span>1. Tarafsızlık ve Dil Standartları</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Piyasa hiçbir zaman kanıtlanamayacak şekilde &ldquo;Türkiye&apos;nin en doğru maaş sitesi&rdquo;, &ldquo;gerçek maaş&rdquo; veya &ldquo;kesin maaş&rdquo; gibi abartılı ifadeler kullanmaz. Bunun yerine:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900">
            <span className="font-bold">❌ Yasaklı İfadeler:</span> Kesin maaş garantisi, resmi iş teklifi, mutlak gerçek rakamlar.
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
            <span className="font-bold">✓ Standartlarımız:</span> Kaynaklandırılmış piyasa aralığı, gözlemlenen medyan ücret, doğrulanmış kullanıcı bildirimleri.
          </div>
        </div>
      </section>

      {/* Principle 2: Kaynak Skalası A-F */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <BarChart2 className="w-5 h-5 text-teal-700" />
          <span>2. A - F Kaynak Sınıflandırma Sistemi</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Sistemdeki her bir maaş verisi mutlaka aşağıdaki güven skalasından bir referans etiketi taşır:
        </p>

        <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
          <div className="p-4 flex items-start space-x-3">
            <span className="px-2 py-0.5 rounded bg-emerald-700 text-white font-mono font-bold">Grade A</span>
            <div>
              <div className="font-bold text-slate-900">Resmi & Kurumsal Kaynaklar</div>
              <div className="text-slate-500 mt-0.5">TÜİK, SGK istatistikleri, Resmi Gazete kamu skalaları.</div>
            </div>
          </div>
          <div className="p-4 flex items-start space-x-3">
            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold">Grade B</span>
            <div>
              <div className="font-bold text-slate-900">Sendika & Toplu Sözleşmeler (TİS)</div>
              <div className="text-slate-500 mt-0.5">İmzalanmış resmi toplu iş sözleşmesi protokolleri.</div>
            </div>
          </div>
          <div className="p-4 flex items-start space-x-3">
            <span className="px-2 py-0.5 rounded bg-sky-600 text-white font-mono font-bold">Grade C</span>
            <div>
              <div className="font-bold text-slate-900">Doğrulanmış İş İlanları</div>
              <div className="text-slate-500 mt-0.5">Şirketler tarafından açık maaş aralığı ile yayınlanan ilanlar.</div>
            </div>
          </div>
          <div className="p-4 flex items-start space-x-3">
            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono font-bold">Grade D</span>
            <div>
              <div className="font-bold text-slate-900">Doğrulanmış Kullanıcı Bildirimleri</div>
              <div className="text-slate-500 mt-0.5">Çift aşamalı moderasyon süzgecinden geçmiş anonim saha verisi.</div>
            </div>
          </div>
          <div className="p-4 flex items-start space-x-3">
            <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-mono font-bold">Grade E/F</span>
            <div>
              <div className="font-bold text-slate-900">Piyasa Modellemesi & Araştırma Raporları</div>
              <div className="text-slate-500 mt-0.5">Bağımsız anketler veya veri yetersizliğinde ekstrapolasyon modelleri.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Principle 3: Tukey IQR */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-teal-700" />
          <span>3. Aykırı Değer Filtresi (Tukey IQR Metodu)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Anonim formlardan gelen verilerde olası trolleme, asılsız uç değerler veya yazım hatalarını elemek için Tukey IQR (Interquartile Range) filtresi uygulanır. 1. Çeyrek (Q1) ve 3. Çeyrek (Q3) arasındaki bandın 1.5 kat dışına taşan gözlemler istatistik hesaplama motorundan elenir.
        </p>
      </section>

      {/* Yasal Uyarı Metni */}
      <div className="p-5 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-900">Hukuki Sorumluluk Reddi (Disclaimer)</div>
        <p className="leading-relaxed">
          Bu sayfada yer alan bilgiler genel bilgilendirme amacıyla sunulmuş olup yasal, mali veya kariyer tavsiyesi teşkil etmez. Resmi kurumlar, işverenler veya çalışanlar arasındaki hukuki uyuşmazlıklarda mahkemelerde bağlayıcı delil niteliği taşımaz.
        </p>
      </div>
    </div>
  );
}
