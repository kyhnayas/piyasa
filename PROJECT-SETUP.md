# Yerel Kurulum & Geliştirme Rehberi (PROJECT-SETUP.md)

Bu doküman, projenin Windows, macOS ve Linux ortamlarında sıfırdan sorunsuz kurulup çalıştırılmasını adım adım anlatır.

---

## 1. Ön Koşullar (Prerequisites)

- **Node.js:** v20.0.0 veya üzeri (Sisteminizde `v22.23.3` kurulu, hazır).
- **npm:** v10+ (Sisteminizde `10.9.9` kurulu, hazır).
- **Git:** (Sisteminizde `2.50.0` kurulu, hazır).
- **Docker & Docker Compose:** PostgreSQL ve Ghost servislerini tek komutla çalıştırmak için (Sisteminizde Docker Desktop kurulu).
  *Not: Docker çalıştırılmadığı senaryolarda Prisma yerel SQLite fallback ile de çalışabilir.*

---

## 2. Adım Adım Kurulum (Installation)

### Adım 1: Depoyu Hazırlama ve Ortam Değişkenleri
```bash
# Ortam değişkeni şablonunu kopyalayın
# Windows PowerShell:
Copy-Item .env.example .env.local

# macOS / Linux:
cp .env.example .env.local
```

### Adım 2: Bağımlılıkların Yüklenmesi
```bash
npm install
```

---

## 3. Veritabanı & Servislerin Başlatılması

### Docker ile PostgreSQL & Ghost CMS Başlatma:
```bash
docker compose up -d
```
Bu komut arka planda:
- `localhost:5432` üzerinde PostgreSQL veritabanını
- `localhost:2368` üzerinde Ghost CMS'i ayağa kaldırır.

### Veritabanı Migration & Seed İşlemi:
```bash
# Prisma migration'larını uygulayın
npx prisma migrate dev --name init

# Demo ve başlangıç meslek verilerini yükleyin
npx prisma db seed
```

---

## 4. Geliştirme Ortamı (Development)

Sistemdeki servisleri paralel veya ayrı ayrı çalıştırabilirsiniz:

```bash
# 1. Next.js Web Uygulaması (Port 3000)
npm run dev

# 2. Model Context Protocol (MCP) Sunucusu (Port 4000)
npm run mcp

# 3. Prisma Studio (Veritabanı Görsel Yönetim - Port 5555)
npx prisma studio
```

Tarayıcınızda açın:
- **Web Sitesi:** [http://localhost:3000](http://localhost:3000)
- **Ghost Admin:** [http://localhost:2368/ghost](http://localhost:2368/ghost)
- **Prisma Studio:** [http://localhost:5555](http://localhost:5555)
- **MCP Sunucusu:** [http://localhost:4000](http://localhost:4000)

---

## 5. Test & Doğrulama (Testing)

```bash
# Tip kontrolü ve linter
npm run lint

# Birim ve istatistik motoru testleri
npm run test

# Production build provası
npm run build
```

---

## 6. Canlıya Dağıtım (Production Build & Deployment)

- **Frontend:** Vercel veya Node.js Docker container.
- **Veritabanı:** Supabase, Neon veya Managed PostgreSQL.
- **Ghost CMS:** Railway, DigitalOcean veya bağımsız Ghost Pro.
- **MCP Sunucusu:** Cloudflare Workers, Fly.io veya Railway.
