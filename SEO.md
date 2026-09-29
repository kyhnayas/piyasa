# SEO Stratejisi & URL Mimarisi: Türkiye Meslek & Ücret Ansiklopedisi

Bu doküman, platformun arama motoru optimizasyonu (SEO), semantik veri işaretlemesi (Schema.org) ve URL hiyerarşisini detaylandırır.

---

## 1. Altın Kural: Yüksek Değerli İndeksleme (Thin Content Engelleme)

Programmatik SEO uygulanırken boş veya birbirinin kopyası düşük değerli binlerce sayfa (`thin content`) üretilmez.
- **Kural:** Bir meslek veya şehir sayfasının Google tarafından indekslenmesi için minimum veri eşiği ($N \ge 3$ onaylanmış kayıt veya doğrulanmış editoryal analiz) gereklidir.
- Eşiğin altındaki sayfalar `noindex, follow` etiketi ile işaretlenir.

---

## 2. Standart URL Mimarisi

| URL Yapısı | Sayfa Türü | Amaç |
| :--- | :--- | :--- |
| `/` | Ana Sayfa | Global arama, trendler, CTA butonları |
| `/meslekler` | Meslek Dizini | Kategorize edilmiş tüm meslek kütüphanesi |
| `/meslekler/[slug]` | Meslek Ana Profili | Görevler, eğitim, maaş özeti, kariyer basamakları |
| `/meslekler/[slug]/maas` | Detaylı Ücret Sayfası | Yıllara, deneyime ve yüzdelik dilimlere göre maaş grafikleri |
| `/meslekler/[slug]/[sehir]` | Şehir Bazlı Maaş | Şehir yaşam maliyeti ve yerel piyasa aralığı |
| `/meslekler/[slug]/kariyer` | Kariyer Yolu | Junior'dan Direktörlüğe geçiş haritası |
| `/meslekler/[slug]/sertifikalar`| Sertifika & Eğitimler | Gereken yetkinlikler ve şeffaf eğitim önerileri |
| `/maas-hesapla` | Maaş Hesaplama Motoru | Filtrelere göre anlık aralık tahmini aracı |
| `/maas-karsilastir` | Maaş Karşılaştırma | İki unvan veya iki şehir arası karşılaştırma aracı |
| `/maas-bildir` | Maaş Paylaşım Ekranı | Anonim saha verisi toplama formu |
| `/kariyer-rehberi` | Ghost Editoryal Blog | Derinlemesine rehberler ve sektör bültenleri |
| `/veri-metodolojisi` | Metodoloji & Güven | İstatistiksel yöntem ve yasal açıklamalar |
| `/gizlilik`, `/kvkk`, `/cerez` | Yasal Sayfalar | Hukuki uyumluluk ve veri hakları |

---

## 3. Schema.org Semantik İşaretlemeler

Her meslek ana sayfasında aşağıdaki JSON-LD yapılandırılmış verisi dinamik olarak üretilir:
- `Occupation`: Unvan, sorumluluklar, gerekli eğitim derecesi, yetkinlikler.
- `EstimatedSalary`: Para birimi (TRY), asgari-azami aralık ve medyan ücret.
- `FAQPage`: Sıkça sorulan sorular (örn: "Makine Mühendisi 2026'da ne kadar kazanır?").
- `BreadcrumbList`: Hiyerarşik gezinim bağlantıları.
