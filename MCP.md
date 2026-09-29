# Model Context Protocol (MCP) Mimarisi

Bu doküman, projenin MCP (Model Context Protocol) sunucusunun yeteneklerini, güvenlik ilkelerini ve araç (tool) tanımlarını açıklar.

---

## 1. Amaç ve Kapsam

Platform, Google Gemini Spark (veya diğer MCP uyumlu AI asistanları) ile doğrudan iletişim kurarak projenin canlı sağlık durumunu, veri akışını, SEO indeksleme performansını ve bekleyen moderasyon işlerini raporlayabilen özel bir MCP sunucusuna sahiptir.

### Temel Güvenlik Kuralları:
1. **Varsayılan Olarak Salt Okunur (Read-Only Default):** İlk sürümdeki tüm araçlar yalnızca durum ve istatistik sorgulamaya izin verir. Veritabanına yazma, silme veya güncelleme yapamaz.
2. **Kimlik Doğrulama (Bearer Auth):** Tüm istekler `Authorization: Bearer <MCP_AUTH_SECRET>` başlığı ile doğrulanır. Korumasız istekler reddedilir.
3. **Sıfır Ham SQL:** Araçlar asla dışarıdan raw SQL almaz. Tüm işlemler Prisma servis katmanındaki önceden tanımlanmış fonksiyonlarla sınırlandırılmıştır.
4. **En Az Yetki (Least Privilege):** Her araç yalnızca görevi için gereken asgari veri alanlarını döner. Şifreler, e-postalar veya kullanıcı kimlik bilgileri MCP yanıtlarında filtrelenir.

---

## 2. MCP Araçları (Tools)

| Tool Adı | Parametreler | Görevi |
| :--- | :--- | :--- |
| `get_project_status` | - | Genel özet: Site, Veritabanı, MCP durumu, yeni veri ve bekleyen işler. |
| `get_site_health` | - | Frontend ve Ghost CMS erişilebilirlik durumu, HTTP yanıt kodları, ortalama gecikme süresi. |
| `get_database_health` | - | PostgreSQL bağlantı havuzu durumu, toplam kayıt sayıları, migration versiyonu. |
| `get_pending_salary_submissions`| `limit?: number` | Moderasyon kuyruğunda bekleyen anonim maaş bildirimlerinin sayısı ve özet listesi. |
| `get_recent_data_updates` | `days?: number` | Son günlerde sisteme eklenen veya güncellenen maaş kayıtlarının özeti. |
| `get_top_professions` | `limit?: number` | En çok aranan ve görüntülenen meslek profilleri. |
| `get_seo_health` | - | İndekslenen sayfa sayısı, sitemap durumu, 404 hataları ve Google Search Console özeti. |
| `get_indexing_status` | - | Arama motoru indeksleme kapsamı ve robots.txt durumu. |
| `get_error_summary` | `hours?: number` | Son saatlerdeki hata logları, 5xx yanıtları ve başarısız API çağrıları. |
| `get_content_pipeline_status` | - | Ghost CMS üzerindeki taslak makaleler, yayınlanan içerikler ve bülten durumu. |
| `get_revenue_summary` | - | Reklam gösterimleri, affiliate tıklamaları ve aktif sponsorluk metrikleri. |
| `get_todays_tasks` | - | Bugün admin/yönetici tarafından yapılması gereken öncelikli 3 görev önerisi. |
