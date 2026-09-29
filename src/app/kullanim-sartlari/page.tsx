import React from 'react';
import Link from 'next/link';
import { Scale, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Kullanım Şartları ve Yasal Uyarı | Piyasa.work',
  description: 'Piyasa.work platformunun kullanım kuralları, veri doğruluğu feragati ve yasal sorumluluk sınırları.',
};

export default function KullanimSartlariPage() {
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
            <Scale className="w-4 h-4 text-teal-600" />
            <span>Kullanıcı Sözleşmesi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kullanım Şartları ve Yasal Feragatname
          </h1>
          <p className="text-xs text-slate-500">
            Son Güncelleme: 29 Eylül 2026 · Sürüm: 1.0
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              1. Platformun Amacı ve Hizmet Kapsamı
            </h2>
            <p>
              Piyasa (piyasa.work), Türkiye iş gücü piyasasına yönelik meslek tanımları, yetkinlik setleri, İŞKUR/ISCO sınıflandırmaları ve istatistiksel ücret tahminleri sunan bağımsız bir açık veri projesidir. Sitede sunulan tüm veriler bilgilendirme ve rehberlik amacıyla kamuya sunulmaktadır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              2. Maaş Verilerinin Niteliği ve Yasal Feragat
            </h2>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs leading-relaxed space-y-2">
              <p>
                <strong>Önemli Yasal Uyarı:</strong> Sitede belirtilen hiçbir ücret rakamı, medyan değer veya yüzdelik dilim; herhangi bir işveren adına bağlayıcı bir iş teklifi, asgari taahhüt veya resmi bordro garantisi teşkil etmez.
              </p>
              <p>
                Ücretler, piyasa koşulları, çalışılan sektör, şirket büyüklüğü, yabancı dil, deneyim ve bireysel pazarlık yeteneğine göre önemli ölçüde farklılık gösterebilir. Kullanıcıların platformdaki verilere dayanarak alacağı kariyer, istifa, iş değişikliği veya sözleşme kararlarından Piyasa.work doğrudan veya dolaylı olarak sorumlu tutulamaz.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              3. Fikri Mülkiyet Hakları
            </h2>
            <p>
              Piyasa.work yazılım kodları, arayüz tasarımları, veri temizleme algoritmaları ve derlenmiş veri tabanı mimarisi telif haklarıyla korunmaktadır. Verilerimizin akademik ve haber amaçlı alıntılanması, kaynak (piyasa.work) gösterilmek şartıyla serbesttir. Platformun otomatik botlarla (scraping) izin alınmaksızın kopyalanması yasaktır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              4. Kullanıcı Bildirimleri ve Kurallar
            </h2>
            <p>
              Anonim maaş bildirim formunu kullanan ziyaretçiler; kasten yanıltıcı, gerçek dışı veya manipülatif veri girmemeyi taahhüt eder. Sistemimizin güvenlik algoritmaları, anormal ve manipülatif bildirimleri otomatik olarak filtreleme ve veri havuzundan çıkarma hakkını saklı tutar.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              5. Değişiklikler ve Yetkili Mahkeme
            </h2>
            <p>
              Piyasa.work, bu kullanım şartlarını dilediği zaman güncelleme hakkını saklı tutar. İhtilaf durumunda Türkiye Cumhuriyeti kanunları geçerli olup, İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
