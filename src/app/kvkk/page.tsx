import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'KVKK Aydınlatma Metni | Piyasa.work',
  description: '6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca Piyasa.work veri işleme ve anonimleştirme politikası.',
};

export default function KvkkPage() {
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
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>6698 Sayılı Kanun Uyarınca</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kişisel Verilerin Korunması (KVKK) Aydınlatma Metni
          </h1>
          <p className="text-xs text-slate-500">
            Son Güncelleme: 29 Eylül 2026 · Sürüm: 1.2
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-600" />
              1. Veri Sorumlusu ve Temel İlke
            </h2>
            <p>
              Piyasa (piyasa.work), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket etmektedir. Platformumuzun temel tasarım felsefesi <strong>"Gizlilik Odaklı Mimari" (Privacy by Design)</strong> olup, ziyaretçilerimizden ve maaş bildiriminde bulunan çalışanlardan kimlik, ad-soyad, T.C. kimlik numarası, telefon veya doğrudan kişiyle eşleştirilebilecek hiçbir kişisel veri talep edilmemekte ve saklanmamaktadır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600" />
              2. İşlenen Veriler ve Anonimleştirme Metodolojisi
            </h2>
            <p>
              Kullanıcılarımızın gönüllü olarak paylaştığı veriler şunlardan ibarettir:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Meslek unvanı ve deneyim yılı (örn: 3-5 yıl)</li>
              <li>Aylık net ücret aralığı (TL)</li>
              <li>Çalışılan şehir ve çalışma biçimi (Ofis, Hibrit, Remote)</li>
              <li>İsteğe bağlı sektör ve şirket ölçeği bilgisi</li>
            </ul>
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-900 text-xs mt-3">
              <strong>Kritik Güvenlik Güvencesi:</strong> Sistemimize iletilen IP adresleri ham haliyle veri tabanına asla kaydedilmez. IP adresleri sunucu tarafında rastgele bir tuzlama (salt) anahtarı ile birleştirilerek tek yönlü SHA-256 algoritmasıyla özetlenir (hash). Bu özet, yalnızca 7 günlük bot/spam manipülasyonunu engellemek amacıyla tutulur ve süresi dolduğunda otomatik olarak imha edilir. Geriye dönük kimlik tespiti matematiksel olarak imkansızdır.
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              3. Kişisel Verilerin İşlenme Amacı ve Hukuki Sebebi
            </h2>
            <p>
              Toplanan mesleki ve ücret verileri, KVKK m. 5/2-f uyarınca "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati" kapsamında; Türkiye iş gücü piyasasında bilgi asimetrisini azaltmak, şeffaf istatistiki agregasyon oluşturmak ve kamuya açık tarafsız maaş göstergeleri sunmak amacıyla işlenmektedir.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              4. Verilerin Aktarımı ve Üçüncü Taraflar
            </h2>
            <p>
              Toplanan anonim istatistikler ham veri olarak hiçbir üçüncü tarafa, veri simsarına veya reklam ajansına satılmaz. İstatistiksel çıktılar (medyan, 25. ve 75. yüzdelikler) yalnızca anonim ve toplu biçimde platformda açık veri olarak yayınlanır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              5. İlgili Kişinin Hakları (KVKK Madde 11)
            </h2>
            <p>
              KVKK m. 11 uyarınca her ilgili kişi; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme hakkına sahiptir. Ancak sistemimizde kimlikle eşleşen bir veri kaydı bulunmadığından, anonim bildirimlerin spesifik olarak kime ait olduğu tespit edilemez. Her türlü soru ve geri bildirim için <span className="font-mono text-xs font-semibold text-slate-900">iletisim@piyasa.work</span> adresi üzerinden iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
