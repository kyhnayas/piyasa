# Güvenlik & Gizlilik İlkeleri (OWASP Standartları)

Bu doküman, projenin güvenlik mimarisini, veri koruma tedbirlerini ve hassas bilgi yönetimini tanımlar.

---

## 1. Güvenlik Standartları ve Prensipler

Platform, ilk günden itibaren **OWASP Top 10** güvenlik standartlarına tam uyumlu olarak tasarlanmıştır.

### A. Veritabanı ve Enjeksiyon Koruması
- Tüm veritabanı sorguları Prisma ORM aracılığıyla parametreli (prepared statements) olarak çalıştırılır.
- Ham SQL (raw query) kullanımından kesinlikle kaçınılır.

### B. Girdi Doğrulama ve Sanitizasyon (Input Validation)
- API endpointlerine gelen her veri, **Zod** şemaları ile doğrulanır.
- Kullanıcı yorum ve girdi alanları HTML/XSS etiketlerinden arındırılır (DOMPurify / sanitize-html).

### C. Hız Sınırlaması (Rate Limiting)
Aşağıdaki kritik endpointlerde agresif hız sınırlaması uygulanır:
- `/api/submit-salary`: IP başına saatte en fazla 3 bildirim.
- `/api/auth/*`: IP başına 15 dakikada en fazla 5 deneme.
- `/api/search`: IP başına dakikada en fazla 30 istek.

### D. Bot & Otomasyon Koruması
- Anonim maaş bildirim formlarında **Cloudflare Turnstile** kullanılır (reCAPTCHA yerine gizlilik dostu ve kullanıcıyı yormayan alternatif).

---

## 2. Hassas Veri ve Loglama (Structured Logging)

Log dosyalarında asla şu bilgiler yer alamaz:
- ❌ Şifreler ve kimlik doğrulama belirteçleri (Bearer tokens, session secrets).
- ❌ E-posta ve telefon numaraları.
- ❌ Kullanıcıların IP adresleri (yalnızca maskeli veya hashli).
- ❌ Kişisel maaş bildirimi ayrıntıları.

Tüm loglar JSON formatında yapılandırılmış (structured) biçimde üretilir.

---

## 3. HTTP Güvenlik Başlıkları (Security Headers)

Next.js yapılandırmasında aşağıdaki başlıklar zorunludur:
- `Content-Security-Policy (CSP)`
- `Strict-Transport-Security (HSTS)`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
