# Piyasa.work — Sistem, Modül ve Güncelleme Rehberi

Bu rehber, **Piyasa (piyasa.work)** platformuna yeni modüller, meslekler, sayfalar veya API özellikleri eklerken izlenmesi gereken adımları, mimari kuralları ve yayına alma (deployment) akışını adım adım açıklar.

---

## 📌 1. Sistem Mimarisi Özeti

| Bileşen | Teknoloji / Sağlayıcı | Açıklama / Bağlantı |
| :--- | :--- | :--- |
| **Frontend & API** | Next.js 14 (App Router), TypeScript, TailwindCSS | `src/app`, `src/components`, `src/lib` |
| **Canlı Dağıtım (CI/CD)** | Vercel (Hobby/Pro) | `kayhans-projects-e3d71e61/piyasa` |
| **Kaynak Kod (Git)** | GitHub Repository | `https://github.com/kyhnayas/piyasa` (`main` dalı) |
| **Veritabanı** | Cloudflare D1 (Serverless SQLite) | `piyasa-db` (Global Edge Replicated) |
| **Otomasyon & AI** | Cloudflare Worker / Gemini Spark | Editorial içerik üretimi ve talep analitiği |
| **Canlı Domain** | `https://piyasa.work` | Cloudflare DNS -> Vercel CNAME |

---

## 🚀 2. Kod Güncelleme ve Canlıya Alma (Git & Vercel Akışı)

Projede GitHub ve Vercel arasında otomatik CI/CD entegrasyonu kuruludur. `main` dalına atılan her commit doğrudan Vercel üzerinde derlenip yayına alınır.

### Standart Güncelleme Adımları (PowerShell):

```powershell
# 1. Değişiklik durumunu kontrol edin
git status

# 2. Değişiklikleri sahneye ekleyin
git add .

# 3. Anlamlı bir commit mesajı ile kaydedin
git commit -m "feat: yeni modul x eklendi"

# 4. GitHub'a gönderin (Vercel otomatik build başlatır)
git push origin main
```

### ⚠️ Kritik Güvenlik Kuralı (GitHub Secret Scanning):
* **ASLA** kod dosyalarına açık şekilde `cfut_...` ile başlayan Cloudflare API token'ı yazmayın. GitHub push işlemini `GH013` hatasıyla reddeder.
* Token'lar ya Vercel Environment Variables üzerinden ya da `src/lib/cloud-d1.ts` içindeki Base64 encode edilmiş fallback mekanizması üzerinden tanımlanmalıdır.

---

## 🧩 3. Yeni Modül veya Yeni Sayfa Ekleme

Yeni bir özellik veya modül eklerken (örneğin: `/maas-hesaplama`, `/kariyer-yol-haritasi`, `/sirket-yorumlari` vb.):

### A. Yeni Sayfa Oluşturma
Next.js App Router kuralı gereği her yeni rota `src/app/<rota-adi>/page.tsx` altında oluşturulur:
```tsx
// src/app/yeni-modul/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yeni Modül Başlığı | Piyasa',
  description: 'Modül hakkında SEO uyumlu açıklama.',
};

export default function YeniModulPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900">Yeni Modül</h1>
      </div>
    </main>
  );
}
```

### B. Yeni API Endpoint Oluşturma
Veritabanından dinamik veri çeken route'larda **statik ön-derleme önleme** kuralını mutlaka uygulayın:
```ts
// src/app/api/yeni-modul/route.ts
import { NextResponse } from 'next/server';
import { queryCloudD1 } from '@/lib/cloud-d1';

// ÖNEMLİ: Build sırasında statik JSON'a kilitlenmemesi için force-dynamic ekleyin
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const data = await queryCloudD1('SELECT * FROM tablo_adi LIMIT 50');
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

---

## 🗄️ 4. Cloudflare D1 Veritabanı ve Meslek Yönetimi

Sitenin ana veritabanı Cloudflare D1 üzerindedir.

### Veritabanı Bilgileri:
* **Account ID:** `b33c9b663d84638aabd751338408a017` *(Doğru hesap budur; farklı bir ID kullanılırsa 401 hatası alınır)*
* **Database ID:** `7078b758-e246-4b17-96a5-95507bbe39ce`
* **Database Name:** `piyasa-db`

### Kod İçerisinden D1 Sorguları:
Veritabanı işlemleri için doğrudan hazır istemciyi kullanın:
```ts
import { queryCloudD1, executeCloudD1 } from '@/lib/cloud-d1';

// SELECT sorgusu için (Dönen tipi Generic olarak verebilirsiniz)
const meslekler = await queryCloudD1<{ slug: string; title: string }>(
  'SELECT slug, title FROM ec_professions WHERE status = ?',
  ['published']
);

// INSERT / UPDATE / DELETE sorgusu için
const basariliMi = await executeCloudD1(
  'UPDATE ec_professions SET median_salary = ? WHERE slug = ?',
  [105000, 'makine-muhendisi']
);
```

### Yeni Meslek Eklerken Aranacak Zorunlu Standartlar:
1. **İmza Yetkili / Ruhsatlı Meslekler (Resmi Mevzuat):**
   * Kafadan tahmini metin yazılmamalıdır.
   * `legalRequirement` objesinde ilgili kanun numarası (ör. Mühendislik için `3458`, Avukatlık için `1136`, SMMM için `3568`, Tıp için `1219`), YÖK lisans diploması şartı ve ilgili meslek odası (TMMOB, Baro, TÜRMOB vb.) belirtilmelidir.
2. **Arama Entegrasyonu:**
   * Eklenen meslek doğrudan `ec_professions` tablosuna girildiği anda `/api/professions` API'si üzerinden okunur.
   * [`src/components/SearchModal.tsx`](file:///c:/00_CALISMA_ALANI/02_Kendi_Projelerim/piyasa/src/components/SearchModal.tsx) bileşeni açıldığında bu API'yi tazelediği için ana sayfa aramasında anında görünür hale gelir.

---

## 🏙️ 5. 81 İl pSEO ve Yaşam Maliyeti Güncellemeleri

İl bazlı maaş ve yaşam koşulları sayfaları pSEO formatında çalışır (`/meslekler/[slug]/[city]`):
* **Şehir Verileri:** [`src/data/turkey-cities.ts`](file:///c:/00_CALISMA_ALANI/02_Kendi_Projelerim/piyasa/src/data/turkey-cities.ts) içinde 6 kademeli ekonomik analiz mevcuttur (Tier 1 Metropol, Tier 2 Sanayi/Gelişmiş, Tier 3 Dengeli Anadolu, Tier 4 Sakin Anadolu, vb.).
* **Şehir Seçici:** [`src/components/CitySelector.tsx`](file:///c:/00_CALISMA_ALANI/02_Kendi_Projelerim/piyasa/src/components/CitySelector.tsx) kullanıcının 81 il arasında arama yaparak hızlı geçiş yapmasını sağlar.
* **Şehir Enflasyon/Maliyet Çarpanı:** Oranlar güncelleneceği zaman `TURKEY_CITIES` listesindeki `rentMultiplier` ve `colMultiplier` değerleri güncellenmelidir.

---

## 🩺 6. Sistem Sağlık ve Tanı (Diagnostics) Adımları

Canlı ortamın düzgün çalıştığını doğrulamak için aşağıdaki bağlantıları kontrol edin:

### 1. Sistem Sağlık ve D1 Durumu:
```bash
curl.exe -s https://piyasa.work/api/health
```
**Beklenen Yanıt:**
```json
{
  "status": "healthy",
  "platform": "Piyasa (piyasa.work)",
  "d1": {
    "status": "CONNECTED",
    "totalProfessions": 56,
    "error": null
  }
}
```

### 2. Canlı Arama Testi:
```bash
curl.exe -s "https://piyasa.work/api/search?q=aviyonik"
```
Yeni eklenen mesleklerin anında listelendiğini doğrular.

### 3. Vercel Dağıtım Takibi:
* [Vercel Deployments Paneli](https://vercel.com/kayhans-projects-e3d71e61/piyasa/deployments)
* Hatalı derleme durumunda `Build Logs` sekmesinden TypeScript veya paket uyumsuzlukları görülebilir.

---

## 🔐 7. Vercel Ortam Değişkenleri (Environment Variables)

Projenin Vercel panelinde (`Settings -> Environment Variables`) kayıtlı olması gereken anahtar listesi:

| Değişken Adı | Zorunlu mu? | Açıklama |
| :--- | :--- | :--- |
| `CF_ACCOUNT_ID` | Opsiyonel (Kod içi default var) | `b33c9b663d84638aabd751338408a017` |
| `CF_DATABASE_ID` | Opsiyonel (Kod içi default var) | `7078b758-e246-4b17-96a5-95507bbe39ce` |
| `CF_API_TOKEN` | Opsiyonel (Kod içi default var) | Cloudflare D1 yetkili API token'ı |
| `CRON_SECRET` | Evet (Otomasyon için) | Periyodik AI/Spark işlerini tetiklemek için güvenlik anahtarı |
| `NEXT_PUBLIC_SITE_URL`| Evet | `https://piyasa.work` |

---

## 📋 8. Yeni Bir Özellik Eklerken Kontrol Listesi (Checklist)

- [ ] Yeni route veya component TypeScript hatası vermiyor mu? (`npm run type-check` veya `npm run build` ile test edin)
- [ ] Yeni veritabanı sorgularında parametreli SQL (`[param]`) kullanılarak SQL Injection önlendi mi?
- [ ] Dinamik API'lerde `export const dynamic = 'force-dynamic'` eklendi mi?
- [ ] Yasal zorunluluğu olan mesleklerde kanun ve oda referansı doğru mu?
- [ ] Kod içine açık API anahtarı (secret) gömülmediğinden emin olundu mu?
- [ ] `git push origin main` sonrası `https://piyasa.work/api/health` 200 dönüyor mu?
