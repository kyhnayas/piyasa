# Alan Adı (Domain) & DNS Yapılandırması: piyasa.work

> **Marka:** Piyasa  
> **Birincil Domain:** `piyasa.work`  
> **Kapsam:** Türkiye İş Piyasası Veri Platformu (Meslekler · Ücretler · Kariyer · Veriler)

---

## 1. Domain & Servis Mimarisi

Platform servislerinin izolasyonu, güvenliği ve SEO performansı için aşağıdaki mimari belirlenmiştir:

| Adres | Servis | Açıklama |
| :--- | :--- | :--- |
| **`piyasa.work`** (veya `www.piyasa.work`) | **Next.js Web Uygulaması** | Ana portal, arama, meslek sayfaları, ücret motoru, karşılaştırma ve kullanıcı arayüzü. |
| **`piyasa.work/rehber`** (veya `blog.piyasa.work`) | **Ghost CMS (Headless)** | Editoryal kariyer rehberleri, bülten altyapısı ve sektör analizleri. |
| **`api.piyasa.work`** | **Backend API Ağ Geçidi** | Dış veri akışları, mobil ve B2B API entegrasyonları. |
| **`mcp.piyasa.work`** | **Gemini Spark MCP Server** | Google Gemini Spark'ın canlı sistem durumunu sorgulaması için güvenli HTTPS uç noktası. |

---

## 2. DNS Yapılandırma Tablosu (Cloudflare / DNS Sağlayıcı)

Aşağıdaki DNS kayıtları Cloudflare veya alan adı yöneticinizde tanımlanmalıdır:

| Tür (Type) | Ad (Name) | Hedef / Değer (Target) | Proxy (Turuncu Bulut) | Açıklama |
| :---: | :--- | :--- | :---: | :--- |
| **A** | `@` | `[Vercel / Sunucu IPv4]` | Aktif (Proxied) | Ana domain (`https://piyasa.work`) |
| **CNAME** | `www` | `piyasa.work` | Aktif (Proxied) | `www` trafiğini ana domaine bağlar (301 yönlendirmesi) |
| **CNAME** | `mcp` | `[MCP Sunucu / Railway / VPS]` | Aktif (Proxied) | Gemini Spark MCP sunucusu (`https://mcp.piyasa.work`) |
| **CNAME** | `ghost` | `[Ghost Sunucu Adresi]` | Aktif (Proxied) | Ghost CMS yönetim paneli |

---

## 3. SSL / TLS & HSTS Güvenlik Standardı

- **Cloudflare SSL Modu:** `Full (Strict)`
- **HTTPS Yönlendirmesi:** "Always Use HTTPS" = Açık (Tüm `http://` istekleri `https://` protokolüne 301 kalıcı yönlendirilir).
- **HSTS:** `max-age=31536000; includeSubDomains; preload` (HTTP Strict Transport Security zorunlu).
- **Canonical Kuralı:** `https://piyasa.work` tekil ve değişmez canonical adrestir. `http://piyasa.work`, `http://www.piyasa.work` ve `https://www.piyasa.work` varyasyonları kalıcı olarak ana domaine yönlendirilir.

---

## 4. E-Posta & Ghost Bülten DNS Kayıtları (Email Deliverability)

Ghost CMS üzerinden "Piyasa Bülteni" abonelerine e-posta gönderilirken spam filtrelerine takılmamak için zorunlu DNS kayıtları:

### A. SPF Kaydı
- **Tür:** `TXT`
- **Ad:** `@`
- **Değer:** `v=spf1 include:mailgun.org ~all`

### B. DKIM Kaydı
- **Tür:** `TXT`
- **Ad:** `k1._domainkey`
- **Değer:** `k=rsa; p=[Mailgun/E-posta sağlayıcınız tarafından üretilen Public Key]`

### C. DMARC Kaydı
- **Tür:** `TXT`
- **Ad:** `_dmarc`
- **Değer:** `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@piyasa.work; ruf=mailto:dmarc-reports@piyasa.work; fo=1`
- **Gerekçe:** Alan adınızın adını kullanarak sahte bülten/phishing e-postası atılmasını kesin olarak engeller.

---

## 5. Doğrulama ve Test Adımları

Yapılandırma tamamlandıktan sonra terminal üzerinden test edin:

```bash
# DNS çözümlemesi kontrolü
nslookup piyasa.work

# SSL sertifikası ve HTTP -> HTTPS 301 kontrolü
curl -I http://piyasa.work

# Güvenlik başlıkları (HSTS) kontrolü
curl -I https://piyasa.work
```
