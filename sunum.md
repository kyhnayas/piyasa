# Piyasa.work — Türkiye İş Piyasası & Ücret Veritabanı Platformu
## Kapsamlı Proje Sunumu, Mimari Analizi ve Gelecek Yol Haritası

---

## 1. Yönetici Özeti (Executive Summary)

**Piyasa.work**, Türkiye iş piyasasındaki ücret skalalarını, mesleki kariyer basamaklarını ve üniversite bölümlerinin istihdam karşılıklarını şeffaf, veriye dayalı ve erişilebilir kılan bağımsız bir pazar istihbarat platformudur.

Türkiye'de çalışanlar, yeni mezunlar ve üniversiteye hazırlanan gençler için en kritik soru işaretleri olan *"Hangi bölüm mezunu ne iş yapar?", "Hangi pozisyon 2026 yılında net ne kadar maaş alır?", "Piyasa değerim nedir?"* sorularına kaynaklandırılmış ve sürekli güncellenen istatistiki modellerle yanıt verir.

Platform; **Next.js 15**, **Cloudflare D1** küresel dağıtık veritabanı, **Google Gemini Spark (MCP - Model Context Protocol)** otonom yapay zeka veri üretim hattı ve **Cloudflare Email Routing** altyapısı üzerine inşa edilmiştir.

---

## 2. Platformun Çözdüğü Temel Sorunlar & Değer Önerisi

| Mevcut Piyasa Sorunu | Piyasa.work Çözümü |
| :--- | :--- |
| **Maaş Gizliliği & Bilgi Asimetrisi:** İş ilanlarında maaş yazılmaması, çalışanların piyasa değerini bilmeden mülakata girmesi. | **Şeffaf Ücret Dağılımı:** Taban (P25), Medyan (P50) ve Tavan (P75) net maaş dilimleri, örneklem boyutu ve güven derecesiyle sunulur. |
| **Bölüm-Kariyer Uyuşmazlığı:** Üniversite tercihi yapacak gençlerin YÖK bölümlerinin sektördeki gerçek rollerini bilmemesi. | **"Hangi Bölüm Ne İş Yapar?" Modülü:** YÖK lisans/önlisans bölümlerini iş piyasasındaki reel unvanlarla eşleştirir. |
| **Bölgesel ve Sektörel Farklılıklar:** İstanbul ile Anadolu şehirleri arasındaki yaşam maliyeti ve ücret uçurumu. | **81 İl Programatik SEO & Çarpanı:** Her meslek için il bazlı medyan maaş çarpanları ve sektörel farklar. |
| **Statik & Hızla Eskiye Dönen Veriler:** Yılda bir yayımlanan PDF raporlarının yüksek enflasyon ortamında geçersiz kalması. | **Otonom Günlük Veri Akışı:** Gemini Spark ajanı her gün en çok talep edilen bölümlere ait 10-20 yeni mesleği sisteme işler. |

---

## 3. Platformun Temel Modülleri ve Kullanıcılara Sundukları

### 3.1. Meslekler & Ücret Kütüphanesi (`/meslekler` & `/meslekler/[slug]`)
* **2026 Güncel Maaş Skalası:** Her meslek için net aylık taban, tavan ve medyan kazanç.
* **Deneyim Seviyeleri (Kariyer Merdiveni):** Junior (0-2 Yıl), Mid (3-5 Yıl), Senior (5-8 Yıl) ve Lead (8+ Yıl) unvanlarına göre maaş ve sorumluluk analizi.
* **Şehir Maaş Farkları:** İstanbul (+%18), Ankara (+%5), İzmir (+%2) gibi metropol katsayıları ve 81 il maaş hesaplayıcısı.
* **Sektörel Dağılım:** Bilişim/SaaS, Finans, Sanayi, Hizmet sektörlerine göre ücret farklılaşması.
* **Mülakat ve Yetkinlik Rehberi:** Rol için aranan sertifikalar, teknik araçlar, mülakat soruları ve günlük operasyon rutini.

### 3.2. "Hangi Bölüm Ne İş Yapar?" Rehberi (`/hangi-bolum-ne-is-yapar`)
* **Tüm YÖK Bölümleri:** Mühendislik, İktisadi İdari Bilimler, Sağlık, Hukuk, Eğitim, İletişim vb. fakülte kümelerine göre filtrelenebilir veri tabanı.
* **Öğrenci Talep Oylaması:** Henüz detaylı raporu çıkmamış bölümler için öğrencilerin "Analiz Talep Et" oyu vermesi.
* **E-posta Bildirim Aboneliği:** Bölüm yayına girdiğinde öğrencilere otomatik bilgilendirme e-postası gitmesi.

### 3.3. Net/Brüt Maaş Hesaplama Motoru (`/maas-hesapla`)
* 2026 yılı güncel vergi dilimleri (%15, %20, %27, %35, %40).
* SGK İşçi Payı (%14) ve İşsizlik Sigortası Fonu (%1).
* Asgari Ücret Vergi İstisnası entegrasyonu.
* Aylık netten brüte veya brütten nete anlık simülasyon.

### 3.4. Maaş Karşılaştırma Aracı (`/maas-karsilastir`)
* İki farklı mesleği veya aynı mesleğin iki farklı ildeki karşılığını yan yana getiren kıyaslama ekranı.

### 3.5. Anonim Maaş Bildirimi Modülü (`/maas-bildir`)
* Çalışanların çalıştığı sektör, şehir, deneyim yılı ve net maaşını hiçbir kişisel veri bırakmadan girdiği topluluk katkı motoru.

---

## 4. Teknik Mimari & Nasıl Çalışıyor?

```mermaid
graph TD
    User([Kullanıcı / Öğrenci / Ziyaretçi]) <--> WebApp[Next.js 15 Web App - piyasa.work]
    
    subgraph Frontend & Hosting
        WebApp <--> VercelEdge[Vercel Serverless Edge Platform]
    end

    subgraph Canlı Veri Katmanı
        WebApp <--> D1[(Cloudflare D1 Distributed SQLite - piyasa-db)]
    end

    subgraph Otonom Yapay Zeka Hattı (Gemini Spark)
        Spark[Google Gemini Spark AI Agent] <-->|MCP JSON-RPC 2.0| MCPServer[MCP Endpoint: piyasa.work/mcp]
        MCPServer <-->|Talep Sıralaması| D1
        MCPServer -->|Günlük 10-20 Meslek| D1
        MCPServer -->|Bildirim E-postası| Mailer[Cloudflare Email & Nodemailer]
        Mailer --> SubscribedUser([Bekleyen Öğrenci Maili])
    end

    subgraph Yedek Güvenlik Ağı
        Cron[Vercel Cron: 0 8 * * *] -->|Otomatik Tetikleme| BackupSync[/api/admin/spark/run]
        BackupSync --> D1
    end

    subgraph Gelir Modeli
        AdSense[Google AdSense pub-0088844737786444] <--> WebApp
    end
```

### 4.1. Model Context Protocol (MCP) Sunucusu
`https://piyasa.work/mcp` adresinde çalışan MCP sunucusu, Google Gemini Spark ajanıyla doğrudan konuşur.
Sunucu şu araçları (Tools) dışa açar:
1. `get_next_department_to_analyze`: Öğrenci oylarına göre en çok merak edilen bölümleri ve günlük 10-20 mesleklik hedef listeyi Spark'a iletir.
2. `add_profession`: Spark'ın ürettiği meslek ve 2026 ücret skalasını tek tıkla Cloudflare D1'e yazar.
3. `notify_major_subscribers`: Bölüm yayına girdiği anda bekleyen öğrencilere duyuru e-postası iletir.
4. `run_daily_automation`: Tüm günlük döngüyü tek komutla çalıştırır.
5. `get_project_status`: Veritabanı ve talep metriklerini özetler.

### 4.2. Dağıtık Veritabanı (Cloudflare D1)
* Tablolar: `ec_professions` (meslekler), `major_demand_counts` (oylar), `major_demand_requests` (e-posta aboneleri).
* Vercel sunucularından Cloudflare REST API üzerinden güvenli ve sıfır disk bağımlılığı ile yönetilir.

---

## 5. Gelir Modeli (Monetizasyon)

1. **Google AdSense:** 
   * Yayıncı Kimliği: `pub-0088844737786444`
   * `ads.txt` doğrulaması tamamlandı, Google inceleme onayı sürecinde.
   * Yüksek tıklama değerli finans, kariyer ve eğitim reklamları.
2. **Doğrudan İK Sponsorlukları:**
   * İlgili meslek sayfalarında *"Bu pozisyonda iş arayanlar için açık ilanlar"* sponsorlu kutuları.
3. **B2B Ücret Benchmark Verisi:**
   * İK departmanlarına yönelik yıllık sektör raporları satışı.

---

## 6. İleride Yapılacak Modüller (Gelecek Yol Haritası)

Platformun Türkiye'nin en büyük kariyer ve ücret platformu olması için planlanan modüller:

### Faz 1: Topluluk & Etkileşim Derinleştirme (Q4 2026)
* **Doğrulanmış Şirket Maaş İncelemeleri (Glassdoor Modeli):** Çalışanların şirket bazında (örn: Trendyol, Aselsan, Garanti BBVA vb.) yan hak, prim ve maaş paylaşabilmesi.
* **Üniversite Mezun Memnuniyet Endeksi:** Hangi üniversitenin hangi bölüm mezunu daha hızlı iş buluyor, ne kadar kazanıyor?

### Faz 2: Yapay Zeka Destekli Kariyer Danışmanı (Q1 2027)
* **CV Yükle & Piyasa Değerini Öğren (AI Resume Valuation):** Kullanıcının yüklediği PDF özgeçmişi Gemini AI ile taranarak beceri seviyesi belirlenir ve *"Piyasa değeriniz 85.000 TL - 95.000 TL aralığında"* şeklinde kişiselleştirilmiş değerleme sunulur.
* **Eksik Beceri (Skill Gap) Analizi:** Kullanıcının hedeflediği kıdem veya maaş için öğrenmesi gereken teknolojilerin ve sertifikaların listelenmesi.

### Faz 3: Şeffaf Maaşlı İş İlanları Portalı (Q2 2027)
* **Maaşsız İlan Yasak Modeli:** Şirketlerin yalnızca net ücret aralığını şeffafça belirterek ilan açabileceği yeni nesil iş ilanları modülü.
* **Aday-İş Eşleştirme Motoru:** Öğrenci ve uzmanlara profil ve maaş beklentilerine göre anında eşleşen iş teklifleri.

### Faz 4: Mobil Deneyim & Kurumsal API (Q3 2027)
* **Piyasa.work Mobil Uygulaması (iOS & Android):** Anlık zam dönemi anketleri, sektör bildirimleri ve maaş takip alarmı.
* **B2B Piyasa Veri API'si:** İK yazılımlarına ve danışmanlık firmalarına canlı ücret skalası sunan ücretli REST API aboneliği.

---

## 7. Hedef Metrikler ve Başarı Kriterleri (KPIs)

| Metrik | 3. Ay Hedefi | 6. Ay Hedefi | 12. Ay Hedefi |
| :--- | :---: | :---: | :---: |
| **Toplam Meslek Sayısı** | 300+ | 800+ | 1.500+ |
| **Aylık Organik Ziyaretçi (SEO)** | 50.000 | 250.000 | 1.000.000+ |
| **Google Search Console İndeksi** | 2.500+ Sayfa | 10.000+ Sayfa | 35.000+ Sayfa |
| **Kayıtlı E-posta Abonesi** | 5.000 | 25.000 | 100.000 |
| **Aylık Anonim Maaş Bildirimi** | 1.000 | 5.000 | 25.000 |
| **Aylık Reklam & B2B Geliri** | 15.000 ₺ | 75.000 ₺ | 300.000 ₺+ |

---

## 8. Canlı Sistem Bağlantıları & Erişim Bilgileri

* **Canlı Web Sitesi:** [https://piyasa.work](https://piyasa.work)
* **Yönetici Paneli:** [https://piyasa.work/admin](https://piyasa.work/admin) *(Şifre korumalı)*
* **Canlı Model Context Protocol (MCP):** [https://piyasa.work/mcp](https://piyasa.work/mcp)
* **Dinamik Site Haritası:** [https://piyasa.work/sitemap.xml](https://piyasa.work/sitemap.xml)
* **Google AdSense ads.txt:** [https://piyasa.work/ads.txt](https://piyasa.work/ads.txt)
* **İletişim & Kurumsal Posta:** `info@piyasa.work` *(Kyhnayas@gmail.com yönlendirmeli)*
