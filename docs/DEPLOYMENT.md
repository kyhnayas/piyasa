# Canlıya Dağıtım Kılavuzu (docs/DEPLOYMENT.md)

Bu doküman, sistemin üretim ortamına (production) güvenli, yüksek erişilebilirlikli ve ölçeklenebilir şekilde dağıtılması sürecini açıklar.

---

## 1. Önerilen Üretim Mimarisi

```mermaid
graph TD
    User[Kullanıcı] --> Cloudflare[Cloudflare CDN & WAF / SSL]
    Cloudflare -->|/* Web Sayfaları| Vercel[Next.js Frontend - Vercel / Cloud Run]
    Cloudflare -->|/ghost/*| GhostHost[Ghost CMS - Railway / VPS]
    Cloudflare -->|mcp.domain.com| MCPHost[MCP Server - Node / Container]
    
    Vercel --> Postgres[(Managed PostgreSQL 16 - Neon / Supabase)]
    MCPHost --> Postgres
    Vercel -->|Ghost Content API| GhostHost
```

---

## 2. Ortam Değişkenleri Yönetimi
- Gerçek gizli anahtarlar asla Git'e yüklenmez.
- Vercel Dashboard / Railway Variables üzerinden şifreli olarak tanımlanır.
- `DATABASE_URL` bağlantı havuzlayıcı (connection pooler - örn. PgBouncer) üzerinden bağlanmalıdır.

---

## 3. Dağıtım Öncesi Doğrulama Adımları
1. `npm run build` hatasız tamamlanmalı.
2. `npx prisma migrate deploy` ile bekleyen veritabanı şema güncellemeleri uygulanmalı.
3. `curl -f https://domaininiz.com/api/health` uç noktası `200 OK` dönmeli.
