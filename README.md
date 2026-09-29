# Türkiye Meslek & Ücret Ansiklopedisi

> **Çalışma Adı:** Türkiye Meslek & Ücret Ansiklopedisi  
> **Durum:** Aşama 1 Tamamlandı — Sistem Analizi, Mimari ve Güvenlik Altyapısı Kuruldu. Kullanıcıdan marka/domain adı bekleniyor.

Türkiye'deki meslekleri yalnızca "ortalama maaş" olarak göstermek yerine; kaynaklandırılmış ücret aralıkları, medyan ve yüzdelik dilimler (P25, P75), deneyim basamakları, şehir farkları, kariyer hiyerarşisi, gerekli sertifikalar ve doğrulanmış anonim saha verileriyle sunan modern, editoryal ve veri odaklı dijital platform.

---

## 🏛️ Mimari & Teknoloji Yığını

- **Web & Arayüz:** Next.js (App Router, React 19) + TypeScript + Tailwind CSS
- **Editoryal İçerik & Bülten:** Ghost CMS Headless (v5)
- **Veri Motoru & ORM:** PostgreSQL 16 + Prisma ORM
- **Yönetim & Günlük Takip:** Model Context Protocol (MCP) Server (Gemini Spark uyumlu)
- **Güvenlik & Bot Koruması:** OWASP standartları, Cloudflare Turnstile, Argon2, Rate Limiting
- **Konteynerizasyon:** Docker Compose (Postgres + Ghost)

---

## 📚 Dokümantasyon İndeksi

Platformun tüm mimari, veri, güvenlik ve dağıtım standartları dokümante edilmiştir:

1. [Sistem Mimarisi (PROJECT-ARCHITECTURE.md)](./PROJECT-ARCHITECTURE.md)
2. [Yerel Kurulum Rehberi (PROJECT-SETUP.md)](./PROJECT-SETUP.md)
3. [Alan Adı & DNS Yapılandırması (DOMAIN-SETUP.md)](./DOMAIN-SETUP.md)
4. [Veritabanı Şeması & Varlıklar (DATABASE.md)](./DATABASE.md)
5. [Veri Metodolojisi & İstatistik Motoru (DATA-METHODOLOGY.md)](./DATA-METHODOLOGY.md)
6. [Güvenlik & OWASP Prensipleri (SECURITY.md)](./SECURITY.md)
7. [SEO & Programmatik URL Mimarisi (SEO.md)](./SEO.md)
8. [Gelir Modelleri & Reklam Politikası (MONETIZATION.md)](./MONETIZATION.md)
9. [İçerik Standartları & Hukuki Sorumluluk Reddi (CONTENT-GUIDELINES.md)](./CONTENT-GUIDELINES.md)
10. [Çift Aşamalı Moderasyon Standartları (MODERATION.md)](./MODERATION.md)
11. [Model Context Protocol Özeti (MCP.md)](./MCP.md)
12. [Gemini Spark & MCP Kurulum Kılavuzu (docs/GEMINI-SPARK-MCP.md)](./docs/GEMINI-SPARK-MCP.md)
13. [API Referans Dokümanı (docs/API.md)](./docs/API.md)
14. [Canlıya Dağıtım Rehberi (docs/DEPLOYMENT.md)](./docs/DEPLOYMENT.md)
15. [Veritabanı Yedekleme & Geri Yükleme (docs/BACKUP-RESTORE.md)](./docs/BACKUP-RESTORE.md)
16. [Sorun Giderme Kılavuzu (docs/TROUBLESHOOTING.md)](./docs/TROUBLESHOOTING.md)

---

## 🚀 Hızlı Başlangıç

```bash
# 1. Ortam değişkenlerini hazırlayın
cp .env.example .env.local

# 2. PostgreSQL ve Ghost CMS servislerini başlatın
docker compose up -d

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirme sunucusunu çalıştırın
npm run dev
```

---

## ⚖️ Yasal Uyarı

Bu sistemde sunulan veriler istatistiksel modeller, resmi açık kaynaklar ve onaylı anonim bildirimlerin agregasyonu ile üretilir; bağlayıcı bir resmi teklif veya yasal taahhüt teşkil etmez.
