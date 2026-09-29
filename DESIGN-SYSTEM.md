# Tasarım Sistemi: Piyasa (piyasa.work)

> **Tasarım Vizyonu:** Bloomberg, Financial Times, Stripe ve Linear'ın editoryal ciddiyeti ve veri hiyerarşisinden beslenen; ancak hiçbirini doğrudan kopyalamayan, Türkiye iş piyasasının güvenilir ve modern dijital veri kaynağı.  
> **Temel İlke:** *"Bu ekran kullanıcıya Türkiye iş piyasası hakkında hangi bilgiyi daha hızlı ve daha güvenilir şekilde veriyor?"*

---

## 1. Renk Paleti (Color System)

Piyasa renk sistemi, kurumsal güveni temsil eden **Deep Navy** ile veri ve aksiyon canlılığını vurgulayan **Emerald / Teal** üzerine kuruludur.

```css
:root {
  /* Marka Ana Renkleri */
  --color-navy-primary: #0F172A;      /* Deep Navy - Başlıklar, birincil marka kimliği */
  --color-navy-secondary: #172554;    /* İkincil Navy - Menü, footer, koyu kartlar */
  --color-teal-accent: #0F766E;       /* Emerald/Teal - Aksiyonlar, birincil butonlar, veri vurguları */
  --color-teal-light: #F0FDFA;        /* Teal Açık Tint - Rozet zeminleri, aktif durumlar */
  
  /* Arka Plan & Yüzeyler */
  --color-bg-base: #F8FAFC;           /* Ana arka plan - Gözü yormayan hafif kırık beyaz/soğuk gri */
  --color-surface-white: #FFFFFF;     /* Kartlar, paneller, form zeminleri */
  --color-surface-muted: #F1F5F9;     /* İkincil yüzeyler, tablo başlıkları, arama inputu */
  
  /* Tipografi & Metin */
  --color-text-primary: #111827;      /* Birincil metin - Yüksek kontrastlı antrasit */
  --color-text-secondary: #64748B;    /* İkincil metin - Açıklamalar, meta bilgiler */
  --color-text-muted: #94A3B8;        /* Pasif metin, placeholder, dipnotlar */
  
  /* Sınır & Bölücüler (Borders) */
  --color-border: #E2E8F0;            /* Standart ince kart & tablo kenarlığı */
  --color-border-subtle: #F1F5F9;     /* Çok hafif iç bölücü */
  --color-border-focus: #0F766E;      /* Odaklanma kenarlık rengi */
  
  /* Semantik / Durum Renkleri */
  --color-success: #15803D;           /* Pozitif ücret artışı, onaylı veri, A/B sınıfı kaynak */
  --color-success-bg: #DCFCE7;
  --color-warning: #B45309;           /* Düşük örneklem, dikkat, inceleme bekliyor */
  --color-warning-bg: #FEF3C7;
  --color-error: #B91C1C;             /* Hata, red, manipülatif bildirim */
  --color-error-bg: #FEE2E2;
}
```

---

## 2. Tipografi Sistemi (Typography)

- **Birincil Font:** `Inter`, sans-serif (Türkçe karakter desteği kusursuz, yüksek ekran okunabilirliği).
- **Sayısal Veri & Tablolar:** `font-variant-numeric: tabular-nums` (Tüm para birimleri ve yüzdelik rakamlar aynı hizada hizalanır).

### Tipografik Ölçek:
| Token | Boyut | Satır Yüksekliği | Ağırlık | Kullanım Alanı |
| :--- | :--- | :--- | :--- | :--- |
| `display-hero` | 40px (Desktop: 48px) | 1.15 | 800 (Extra Bold) | Ana sayfa hero başlığı |
| `heading-1` | 30px (Desktop: 36px) | 1.25 | 700 (Bold) | Meslek adı, ana sayfa başlıkları |
| `heading-2` | 24px (Desktop: 28px) | 1.3 | 700 (Bold) | Bölüm başlıkları (Maaş Dağılımı vb.) |
| `heading-3` | 18px (Desktop: 20px) | 1.4 | 600 (Semi Bold) | Kart başlıkları, alt bileşenler |
| `body-large` | 16px (Desktop: 18px) | 1.6 | 400 / 500 | Hero altı açıklama, giriş metinleri |
| `body-base` | 14px (Desktop: 15px) | 1.6 | 400 (Regular) | Standart gövde metni, makaleler |
| `data-large` | 24px (Desktop: 30px) | 1.2 | 700 (Tabular) | Medyan maaş rakamı, büyük metrikler |
| `data-base` | 14px | 1.4 | 600 (Tabular) | Tablo içi ücretler, yüzdelikler |
| `caption` | 12px (Desktop: 13px) | 1.4 | 500 (Medium) | Kaynak künyesi, güven rozeti, tarih |

---

## 3. Boşluk (Spacing) & Ölçü Sistemi

4px temel ızgara (base grid) prensibi:
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px (Varsayılan bileşen iç dolgusu)
- `space-6`: 24px (Kart dolgusu, grid boşlukları)
- `space-8`: 32px (Bölümler arası standart boşluk)
- `space-12`: 48px (Geniş bölüm ayırıcıları)
- `space-16`: 64px (Hero ve büyük sayfa blokları)

---

## 4. Kenarlık Yarıçapı (Border Radius) & Gölgeler

Aşırı yuvarlatılmış şekillerden ("bubble" görünüm) kaçınılır; profesyonel ve mimari bir ciddiyet sağlanır.
- `radius-sm`: 4px (Rozetler, minik etiketler)
- `radius-md`: 6px (Inputlar, butonlar)
- `radius-lg`: 8px (Veri kartları, modal pencereleri)
- `radius-xl`: 12px (Büyük kapsayıcılar, hero blokları)

### Gölgeler (Subtle Elevations):
- `shadow-sm`: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
- `shadow-md`: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`
- `shadow-lg`: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`

---

## 5. Bileşen Standartları (Components)

### A. Butonlar (Buttons)
- **Primary:** `bg-[#0F766E] text-white hover:bg-[#115E59]` — Keskin, güven veren vurgu.
- **Secondary:** `bg-[#0F172A] text-white hover:bg-[#1E293B]` — Koyu kurumsal aksiyon.
- **Outline:** `border border-[#E2E8F0] bg-white text-[#111827] hover:bg-[#F8FAFC]`.
- **Ghost:** `text-[#64748B] hover:text-[#111827] hover:bg-[#F1F5F9]`.

### B. Veri Kartları (Data Cards)
- Zemin beyaz (`#FFFFFF`), kenarlık `1px solid #E2E8F0`, hafif gölge `shadow-sm`.
- Üstte meslek unvanı ve kategori rozeti, ortada medyan maaş ve P25-P75 aralığı, altta örneklem büyüklüğü ve kaynak derecesi.

### C. Güvenilirlik Rozetleri (Source Grade Badges)
- **Grade A (Resmi / Kurumsal):** Koyu yeşil zemin, beyaz metin (`#15803D`).
- **Grade B (Sendika / TİS):** Yeşil açık zemin, koyu yeşil metin.
- **Grade C (Doğrulanmış İlan):** Mavi zemin (`#0284C7`).
- **Grade D (Kullanıcı Bildirimi):** Mor/indigo zemin (`#4F46E5`).
- **Grade E/F (Tahmin / Model):** Gri/kehribar zemin (`#B45309`).

### D. Veri Tabloları (Accessible Data Tables)
- Tablo başlığı `bg-[#F8FAFC]` ve `text-[#64748B]`.
- Sayısal sütunlar sağa yaslı (`text-right tabular-nums`).
- Satır hover efekti (`hover:bg-[#F8FAFC] transition-colors`).
- Mobilde yatay kaydırılabilir (`overflow-x-auto`) ve dokunmatik uyumlu.

### E. Maaş Dağılım Grafiği (Range Distribution Bar)
- P25 ile P75 arası kalın bir yatay bant ile gösterilir.
- Medyan değer dikey bir çizgi ve belirteç rozeti ile ortalanır.
- Altında Min ve Max sınırlar ince çizgilerle belirtilir.

---

## 6. Erişilebilirlik (WCAG 2.1 AA Kuralları)

1. **Kontrast:** Tüm metin ve zemin kontrast oranı en az `4.5:1` (Gövde metinleri için `#111827` beyaz zemin üzerinde `15.8:1` ile mükemmel seviyededir).
2. **Klavye Odaklanması (Visible Focus):** Tüm interaktif elemanlarda `outline: 2px solid #0F766E; outline-offset: 2px` standardı uygulanır.
3. **Ekran Okuyucu Desteği:** İkonlar ve grafikler için `aria-label`, gizli açıklamalar (`sr-only`) ve semantik HTML5 (`<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`) zorunludur.

---

## 7. Responsive Kırılma Noktaları (Breakpoints)

- **Mobile:** `< 640px` (Tek sütun, tam genişlikte arama, sadeleştirilmiş veri kartları).
- **Tablet (sm/md):** `640px - 1023px` (İki sütunlu ızgara, katlanabilir filtreler).
- **Desktop (lg):** `1024px - 1279px` (Üç sütunlu ızgara, yan filtre çubuğu, zengin grafikler).
- **Wide Desktop (xl):** `1280px+` (Maksimum 1280px içerik konteyneri, mükemmel nefes alan beyaz alan).
