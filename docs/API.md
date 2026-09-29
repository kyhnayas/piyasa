# API Referans Dokümanı (docs/API.md)

Bu doküman, platformun dahili ve harici HTTP API uç noktalarını, girdi doğrulama şemalarını ve hata formatlarını tanımlar.

---

## 1. Genel Prensipler

- **İçerik Türü:** `application/json`
- **Tarih Formatı:** ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`)
- **Hata Formatı:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Geçersiz maaş değeri.",
    "details": []
  }
}
```

---

## 2. Temel Endpoint'ler

### A. Maaş Hesaplama Motoru
- **Uç Nokta:** `POST /api/salary/calculate`
- **Girdi:**
```json
{
  "professionSlug": "yazilim-muhendisi",
  "citySlug": "istanbul",
  "experienceYears": 3,
  "careerLevel": "MID",
  "sectorSlug": "bilisim",
  "employmentType": "FULL_TIME"
}
```
- **Yanıt:**
```json
{
  "success": true,
  "data": {
    "profession": "Yazılım Mühendisi",
    "salaryMin": 65000,
    "salaryP25": 78000,
    "salaryMedian": 95000,
    "salaryP75": 120000,
    "salaryMax": 165000,
    "currency": "TRY",
    "grossOrNet": "NET",
    "sampleSize": 142,
    "confidenceLevel": 0.88,
    "sourceGrade": "D",
    "disclaimer": "Bu sonuç resmi maaş değildir. Mevcut veri setindeki gözlemlerden oluşturulmuş tahmini piyasa aralığıdır."
  }
}
```

---

### B. Anonim Maaş Bildirimi
- **Uç Nokta:** `POST /api/submit-salary`
- **Rate Limit:** IP başına saatte 3 istek
- **Bot Koruması:** `turnstileToken` zorunlu
- **Girdi Alanları:**
  - `professionId` (Zorunlu)
  - `cityId` (Opsiyonel)
  - `sectorId` (Opsiyonel)
  - `experienceYears` (Zorunlu)
  - `salaryAmount` (Zorunlu, pozitif tamsayı)
  - `grossOrNet` (`NET` | `GROSS`)
  - `bonusIncluded` (boolean)
  - `turnstileToken` (Zorunlu)
  - *Not: Formda PII (ad, telefon, e-posta) kabul edilmez.*
- **Durum:** `201 Created` -> Moderasyon kuyruğuna alınır (`SUBMITTED`).

---

### C. Global Hızlı Arama
- **Uç Nokta:** `GET /api/search?q={query}`
- **Örnek:** `/api/search?q=makine`
- **Yanıt:** Türkçe karakter duyarlı, fuzzy eşleşmeli meslek, unvan alias ve şirket sonuçları.
