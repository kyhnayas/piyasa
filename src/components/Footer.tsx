import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-white">Piyasa</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-950 border border-teal-800 text-teal-400">
                .WORK
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Meslekler · Ücretler · Kariyer · Veriler
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Türkiye iş piyasasını verilerle anlamayı sağlayan tarafsız ve şeffaf kariyer veri platformu.
            </p>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Veri & Araçlar</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/meslekler" className="hover:text-white transition-colors">
                  Meslekler Kütüphanesi
                </Link>
              </li>
              <li>
                <Link href="/hangi-bolum-ne-is-yapar" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
                  🎓 Hangi Bölüm Ne İş Yapar?
                </Link>
              </li>
              <li>
                <Link href="/maas-hesapla" className="hover:text-white transition-colors">
                  Maaş Hesaplama Motoru
                </Link>
              </li>
              <li>
                <Link href="/maas-karsilastir" className="hover:text-white transition-colors">
                  Ücret & Şehir Karşılaştır
                </Link>
              </li>
              <li>
                <Link href="/maas-bildir" className="hover:text-white transition-colors">
                  Anonim Veri Paylaşımı
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Şeffaflık & Sistem</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/veri-metodolojisi" className="hover:text-white transition-colors">
                  Veri Metodolojisi & Güven
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Tukey IQR Algoritması</span>
              </li>
              <li>
                <span className="text-slate-500">A-F Güvenlik Skalası</span>
              </li>
              <li>
                <span className="text-slate-500">Piyasa Açık Veri Masası</span>
              </li>
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Hukuki & Uyum</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="hover:text-white transition-colors">
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi#cerezler" className="hover:text-white transition-colors">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="pt-8 space-y-4">
          <p className="text-[11px] leading-relaxed text-slate-500">
            <strong>Yasal Uyarı:</strong> Piyasa (piyasa.work) üzerinde yer alan tüm ücret aralıkları, dağılım grafikleri ve piyasa tahminleri; doğrulanmış açık veri kaynakları, akademik/sektörel raporlar ve çift aşamalı moderasyon süzgecinden geçmiş anonim kullanıcı bildirimlerinden istatistiksel modellerle türetilmiştir. Resmi ücret bordrosu veya bağlayıcı bir iş teklifi niteliği taşımaz. Kanıtlanmamış hiçbir veri kesin olarak nitelendirilmez.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-slate-800">
            <div>© {new Date().getFullYear()} Piyasa (piyasa.work). Tüm hakları saklıdır.</div>
            <div className="mt-2 sm:mt-0 text-slate-500 font-mono text-[10px]">
              piyasa.work | Data Engine v1.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
