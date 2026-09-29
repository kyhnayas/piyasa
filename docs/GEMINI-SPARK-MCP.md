# Gemini Spark & MCP Entegrasyon Kılavuzu

Bu doküman, Google Gemini Spark üzerinden platformunuzu her gün tek bir komutla izlemenizi sağlayacak Model Context Protocol (MCP) kurulumunu sıfırdan adım adım anlatır.

---

## 1. MCP Server Nasıl Çalışıyor?

Model Context Protocol (MCP), yapay zeka modellerinin (Gemini, Claude vb.) dış araçlara, API'lere ve veritabanlarına güvenli ve standart bir arayüzle bağlanmasını sağlayan açık bir protokoldür.

Platformumuzun MCP sunucusu, arka plandaki PostgreSQL veritabanı, Next.js web sunucusu ve Ghost CMS ile konuşur. Gemini Spark bir soru sorduğunda, MCP sunucusu bu soruları özel fonksiyonlara (tools) çevirir ve sonucu Spark'a özet olarak iletir.

---

## 2. Localhost Neden Gemini Spark Tarafından Doğrudan Erişilemez?

Gemini Spark, Google'ın bulut altyapısında çalışan bir servistir. Bilgisayarınızdaki `http://localhost:4000` adresi yalnızca sizin yerel makineniz tarafından görülebilir; internete açık değildir. 

Gemini Spark'ın sunucunuza erişebilmesi için:
1. **Yerel Test Aşamasında:** Güvenli bir HTTPS tüneli (Cloudflare Tunnel veya ngrok).
2. **Canlı (Production) Aşamasında:** Genel bir domain veya subdomain (örn: `https://mcp.domaininiz.com`) üzerinde çalışan bir bulut sunucusu (VPS, Fly.io, Railway veya Cloud Run) gereklidir.

---

## 3. HTTPS Endpoint Nasıl Oluşturulur?

Google ve modern MCP standartları uyarınca, **tüm MCP bağlantıları zorunlu olarak TLS/HTTPS üzerinden şifrelenmelidir.**

### Yerel Geliştirmede Tünel Açma:
```bash
# Cloudflare Tunnel ile ücretsiz ve güvenli tünel:
cloudflared tunnel --url http://localhost:4000
```
Bu komut size geçici bir `https://xxxxx.trycloudflare.com` adresi verir.

---

## 4. Güvenli Deployment Nasıl Yapılır?

1. MCP sunucusu küçük bir Node.js veya Docker container olarak deploy edilir (Railway, Fly.io veya VPS).
2. Ortam değişkenlerinde `MCP_AUTH_SECRET` tanımlanır.
3. Sunucu, yetkisiz gelen tüm isteklere anında `401 Unauthorized` döner.

---

## 5. Domain Nasıl Bağlanır?

Domain adınızı belirledikten sonra DNS yönetim panelinizde (Cloudflare / Namecheap / vb.):
- **Tür:** `CNAME` veya `A`
- **Ad (Name):** `mcp`
- **Hedef:** Sunucunuzun IP'si veya Cloudflare Tunnel hedefi
- **Sonuç URL:** `https://mcp.domaininiz.com`

---

## 6. MCP URL Nedir?

Gemini Spark'a ekleyeceğiniz uç noktadır. Standardı:
`https://mcp.domaininiz.com/sse` (Server-Sent Events) veya `https://mcp.domaininiz.com/mcp` (Stream HTTP).

---

## 7. Gemini Spark Connected Apps Nereden Açılır?

1. Gemini Web / Spark arayüzüne gidin (gemini.google.com).
2. Sol alttaki **Settings (Ayarlar)** veya profil simgesine tıklayın.
3. **Extensions / Connected Apps (Bağlı Uygulamalar)** sekmesine geçin.
4. **Add Custom MCP Server / Integration** butonuna tıklayın.

---

## 8. MCP URL Nasıl Eklenir?

Açılan forma şunları girin:
- **Server Name:** `Piyasa Ansiklopedisi`
- **Server URL:** `https://mcp.domaininiz.com/sse` (veya geçici tünel adresiniz)
- **Authentication:** `Bearer Token`
- **Bearer Token:** `.env` dosyanızda belirlediğiniz `MCP_AUTH_SECRET` değeri.

---

## 9. OAuth & Bearer Token Güvenliği

- **Bearer Token Koruması:** `MCP_AUTH_SECRET` en az 32 karakterlik rastgele bir dize olmalıdır (Örn: `openssl rand -hex 32`).
- Asla açık repolara yüklenmemeli, sadece Gemini Spark arayüzünde gizli alan olarak girilmelidir.

---

## 10. Spark'ta Custom App Nasıl Çağrılır?

Entegrasyon tamamlandığında, Gemini Spark araçları otomatik olarak tanır.

Mesajınızda doğrudan:
- *"Bugünkü durumu getir."*
- *"@PiyasaAnsiklopedisi bugünkü durum raporunu ver"*

yazmanız yeterlidir.

---

## 11. Mobil Kullanım

Gemini mobil uygulamasında da bağlı hesap üzerinden aynı MCP sunucusu kullanılabilir. Hareket halindeyken telefonunuzdan:
*"Piyasa Ansiklopedisi'nde bugün bekleyen moderasyon var mı?"*
diye sorduğunuzda anında veritabanından filtrelenen rakamları alırsınız.

---

## 12. Günlük Çalışma Örneği: "Bugünkü durumu getir"

Siz Gemini Spark'a:
> **"Bugünkü durumu getir."**

dediğinizde, MCP sunucusu `get_project_status` ve ilişkili araçları çalıştırarak şu formatı döndürür:

```markdown
PROJECT STATUS

Site:
🟢 Aktif (Yanıt süresi: 120ms, Uptime: %99.98)

Database:
🟢 Sağlıklı (PostgreSQL 16, Bağlantı havuzu: 3/20, Toplam 1,420 kayıt)

MCP:
🟢 Bağlı (v1.0.0, 12 araç aktif, Salt-okunur mod)

SEO:
🟢 Sitemap güncel (420 sayfa indeksleme havuzunda, 0 kritik hata)

Bugün:
- Yeni veri: 14 yeni anonim maaş bildirimi
- Bekleyen moderasyon: 6 bildirim (İnceleme bekliyor)
- Hata: 0 kritik 5xx hatası
- İndeksleme: 12 yeni meslek sayfası tarandı
- İçerik önerisi: "Yapay Zeka Mühendisi 2026 Ücret Trendleri" taslakta hazır

Öncelikli görevler:
1. Moderasyon kuyruğundaki 6 bildirimi onayla / reddet.
2. Ghost CMS'te taslak bülteni yayına al.
3. İstanbul - Ankara makine mühendisi veri sapmasını kontrol et.
```

---

## 13. Sorun Giderme (Troubleshooting)

| Belirti | Olası Neden | Çözüm |
| :--- | :--- | :--- |
| **401 Unauthorized** | Yanlış Bearer token | Spark ayarlarındaki token ile `.env` içindeki `MCP_AUTH_SECRET` değerini eşleştirin. |
| **Connection Timed Out** | Sunucu kapalı veya tünel kesildi | `npm run mcp` çalıştığından ve tünelin aktif olduğundan emin olun. |
| **Tool Execution Error** | Veritabanı bağlantısı koptu | PostgreSQL Docker konteynerinin (`docker ps`) çalıştığını doğrulayın. |
