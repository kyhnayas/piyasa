/**
 * Türkiye 81 İl Veri Seti ve TÜİK Bölgesel Ücret Endeksi Katsayıları
 * 2026 yılı yaşam maliyeti ve iş gücü piyasası bölgesel katsayıları
 */

export interface CityData {
  plate: number;
  name: string;
  slug: string;
  region: string;
  diffPercent: number; // Türkiye ortalamasına göre tahmini % sapma (+% / -%)
  multiplier: number;  // 1.00 baz katsayı
}

export const TURKEY_81_CITIES: CityData[] = [
  { plate: 1, name: 'Adana', slug: 'adana', region: 'Akdeniz', diffPercent: -4, multiplier: 0.96 },
  { plate: 2, name: 'Adıyaman', slug: 'adiyaman', region: 'Güneydoğu Anadolu', diffPercent: -12, multiplier: 0.88 },
  { plate: 3, name: 'Afyonkarahisar', slug: 'afyonkarahisar', region: 'Ege', diffPercent: -10, multiplier: 0.90 },
  { plate: 4, name: 'Ağrı', slug: 'agri', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85 },
  { plate: 5, name: 'Amasya', slug: 'amasya', region: 'Karadeniz', diffPercent: -11, multiplier: 0.89 },
  { plate: 6, name: 'Ankara', slug: 'ankara', region: 'İç Anadolu', diffPercent: 6, multiplier: 1.06 },
  { plate: 7, name: 'Antalya', slug: 'antalya', region: 'Akdeniz', diffPercent: 4, multiplier: 1.04 },
  { plate: 8, name: 'Artvin', slug: 'artvin', region: 'Karadeniz', diffPercent: -10, multiplier: 0.90 },
  { plate: 9, name: 'Aydın', slug: 'aydin', region: 'Ege', diffPercent: -5, multiplier: 0.95 },
  { plate: 10, name: 'Balıkesir', slug: 'balikesir', region: 'Marmara', diffPercent: -3, multiplier: 0.97 },
  { plate: 11, name: 'Bilecik', slug: 'bilecik', region: 'Marmara', diffPercent: -2, multiplier: 0.98 },
  { plate: 12, name: 'Bingöl', slug: 'bingol', region: 'Doğu Anadolu', diffPercent: -14, multiplier: 0.86 },
  { plate: 13, name: 'Bitlis', slug: 'bitlis', region: 'Doğu Anadolu', diffPercent: -14, multiplier: 0.86 },
  { plate: 14, name: 'Bolu', slug: 'bolu', region: 'Karadeniz', diffPercent: -4, multiplier: 0.96 },
  { plate: 15, name: 'Burdur', slug: 'burdur', region: 'Akdeniz', diffPercent: -9, multiplier: 0.91 },
  { plate: 16, name: 'Bursa', slug: 'bursa', region: 'Marmara', diffPercent: 2, multiplier: 1.02 },
  { plate: 17, name: 'Çanakkale', slug: 'canakkale', region: 'Marmara', diffPercent: -2, multiplier: 0.98 },
  { plate: 18, name: 'Çankırı', slug: 'cankiri', region: 'İç Anadolu', diffPercent: -12, multiplier: 0.88 },
  { plate: 19, name: 'Çorum', slug: 'corum', region: 'Karadeniz', diffPercent: -10, multiplier: 0.90 },
  { plate: 20, name: 'Denizli', slug: 'denizli', region: 'Ege', diffPercent: -2, multiplier: 0.98 },
  { plate: 21, name: 'Diyarbakır', slug: 'diyarbakir', region: 'Güneydoğu Anadolu', diffPercent: -8, multiplier: 0.92 },
  { plate: 22, name: 'Edirne', slug: 'edirne', region: 'Marmara', diffPercent: -4, multiplier: 0.96 },
  { plate: 23, name: 'Elazığ', slug: 'elazig', region: 'Doğu Anadolu', diffPercent: -10, multiplier: 0.90 },
  { plate: 24, name: 'Erzincan', slug: 'erzincan', region: 'Doğu Anadolu', diffPercent: -12, multiplier: 0.88 },
  { plate: 25, name: 'Erzurum', slug: 'erzurum', region: 'Doğu Anadolu', diffPercent: -8, multiplier: 0.92 },
  { plate: 26, name: 'Eskişehir', slug: 'eskisehir', region: 'İç Anadolu', diffPercent: 3, multiplier: 1.03 },
  { plate: 27, name: 'Gaziantep', slug: 'gaziantep', region: 'Güneydoğu Anadolu', diffPercent: -2, multiplier: 0.98 },
  { plate: 28, name: 'Giresun', slug: 'giresun', region: 'Karadeniz', diffPercent: -11, multiplier: 0.89 },
  { plate: 29, name: 'Gümüşhane', slug: 'gumushane', region: 'Karadeniz', diffPercent: -13, multiplier: 0.87 },
  { plate: 30, name: 'Hakkari', slug: 'hakkari', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85 },
  { plate: 31, name: 'Hatay', slug: 'hatay', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92 },
  { plate: 32, name: 'Isparta', slug: 'isparta', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92 },
  { plate: 33, name: 'Mersin', slug: 'mersin', region: 'Akdeniz', diffPercent: -2, multiplier: 0.98 },
  { plate: 34, name: 'İstanbul', slug: 'istanbul', region: 'Marmara', diffPercent: 18, multiplier: 1.18 },
  { plate: 35, name: 'İzmir', slug: 'izmir', region: 'Ege', diffPercent: 4, multiplier: 1.04 },
  { plate: 36, name: 'Kars', slug: 'kars', region: 'Doğu Anadolu', diffPercent: -14, multiplier: 0.86 },
  { plate: 37, name: 'Kastamonu', slug: 'kastamonu', region: 'Karadeniz', diffPercent: -11, multiplier: 0.89 },
  { plate: 38, name: 'Kayseri', slug: 'kayseri', region: 'İç Anadolu', diffPercent: -3, multiplier: 0.97 },
  { plate: 39, name: 'Kırklareli', slug: 'kirklareli', region: 'Marmara', diffPercent: -4, multiplier: 0.96 },
  { plate: 40, name: 'Kırşehir', slug: 'kirsehir', region: 'İç Anadolu', diffPercent: -11, multiplier: 0.89 },
  { plate: 41, name: 'Kocaeli', slug: 'kocaeli', region: 'Marmara', diffPercent: 8, multiplier: 1.08 },
  { plate: 42, name: 'Konya', slug: 'konya', region: 'İç Anadolu', diffPercent: -3, multiplier: 0.97 },
  { plate: 43, name: 'Kütahya', slug: 'kutahya', region: 'Ege', diffPercent: -8, multiplier: 0.92 },
  { plate: 44, name: 'Malatya', slug: 'malatya', region: 'Doğu Anadolu', diffPercent: -10, multiplier: 0.90 },
  { plate: 45, name: 'Manisa', slug: 'manisa', region: 'Ege', diffPercent: 0, multiplier: 1.00 },
  { plate: 46, name: 'Kahramanmaraş', slug: 'kahramanmaras', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92 },
  { plate: 47, name: 'Mardin', slug: 'mardin', region: 'Güneydoğu Anadolu', diffPercent: -11, multiplier: 0.89 },
  { plate: 48, name: 'Muğla', slug: 'mugla', region: 'Ege', diffPercent: 2, multiplier: 1.02 },
  { plate: 49, name: 'Muş', slug: 'mus', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85 },
  { plate: 50, name: 'Nevşehir', slug: 'nevsehir', region: 'İç Anadolu', diffPercent: -8, multiplier: 0.92 },
  { plate: 51, name: 'Niğde', slug: 'nigde', region: 'İç Anadolu', diffPercent: -11, multiplier: 0.89 },
  { plate: 52, name: 'Ordu', slug: 'ordu', region: 'Karadeniz', diffPercent: -8, multiplier: 0.92 },
  { plate: 53, name: 'Rize', slug: 'rize', region: 'Karadeniz', diffPercent: -7, multiplier: 0.93 },
  { plate: 54, name: 'Sakarya', slug: 'sakarya', region: 'Marmara', diffPercent: 1, multiplier: 1.01 },
  { plate: 55, name: 'Samsun', slug: 'samsun', region: 'Karadeniz', diffPercent: -4, multiplier: 0.96 },
  { plate: 56, name: 'Siirt', slug: 'siirt', region: 'Güneydoğu Anadolu', diffPercent: -14, multiplier: 0.86 },
  { plate: 57, name: 'Sinop', slug: 'sinop', region: 'Karadeniz', diffPercent: -12, multiplier: 0.88 },
  { plate: 58, name: 'Sivas', slug: 'sivas', region: 'İç Anadolu', diffPercent: -9, multiplier: 0.91 },
  { plate: 59, name: 'Tekirdağ', slug: 'tekirdag', region: 'Marmara', diffPercent: 3, multiplier: 1.03 },
  { plate: 60, name: 'Tokat', slug: 'tokat', region: 'Karadeniz', diffPercent: -12, multiplier: 0.88 },
  { plate: 61, name: 'Trabzon', slug: 'trabzon', region: 'Karadeniz', diffPercent: -5, multiplier: 0.95 },
  { plate: 62, name: 'Tunceli', slug: 'tunceli', region: 'Doğu Anadolu', diffPercent: -12, multiplier: 0.88 },
  { plate: 63, name: 'Şanlıurfa', slug: 'sanliurfa', region: 'Güneydoğu Anadolu', diffPercent: -10, multiplier: 0.90 },
  { plate: 64, name: 'Uşak', slug: 'usak', region: 'Ege', diffPercent: -8, multiplier: 0.92 },
  { plate: 65, name: 'Van', slug: 'van', region: 'Doğu Anadolu', diffPercent: -12, multiplier: 0.88 },
  { plate: 66, name: 'Yozgat', slug: 'yozgat', region: 'İç Anadolu', diffPercent: -12, multiplier: 0.88 },
  { plate: 67, name: 'Zonguldak', slug: 'zonguldak', region: 'Karadeniz', diffPercent: -4, multiplier: 0.96 },
  { plate: 68, name: 'Aksaray', slug: 'aksaray', region: 'İç Anadolu', diffPercent: -10, multiplier: 0.90 },
  { plate: 69, name: 'Bayburt', slug: 'bayburt', region: 'Karadeniz', diffPercent: -14, multiplier: 0.86 },
  { plate: 70, name: 'Karaman', slug: 'karaman', region: 'İç Anadolu', diffPercent: -9, multiplier: 0.91 },
  { plate: 71, name: 'Kırıkkale', slug: 'kirikkale', region: 'İç Anadolu', diffPercent: -8, multiplier: 0.92 },
  { plate: 72, name: 'Batman', slug: 'batman', region: 'Güneydoğu Anadolu', diffPercent: -11, multiplier: 0.89 },
  { plate: 73, name: 'Şırnak', slug: 'sirnak', region: 'Güneydoğu Anadolu', diffPercent: -15, multiplier: 0.85 },
  { plate: 74, name: 'Bartın', slug: 'bartin', region: 'Karadeniz', diffPercent: -10, multiplier: 0.90 },
  { plate: 75, name: 'Ardahan', slug: 'ardahan', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85 },
  { plate: 76, name: 'Iğdır', slug: 'igdir', region: 'Doğu Anadolu', diffPercent: -13, multiplier: 0.87 },
  { plate: 77, name: 'Yalova', slug: 'yalova', region: 'Marmara', diffPercent: 2, multiplier: 1.02 },
  { plate: 78, name: 'Karabük', slug: 'karabuk', region: 'Karadeniz', diffPercent: -7, multiplier: 0.93 },
  { plate: 79, name: 'Kilis', slug: 'kilis', region: 'Güneydoğu Anadolu', diffPercent: -13, multiplier: 0.87 },
  { plate: 80, name: 'Osmaniye', slug: 'osmaniye', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92 },
  { plate: 81, name: 'Düzce', slug: 'duzce', region: 'Karadeniz', diffPercent: -3, multiplier: 0.97 },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return TURKEY_81_CITIES.find(c => c.slug === slug);
}

export function getCityByPlate(plate: number): CityData | undefined {
  return TURKEY_81_CITIES.find(c => c.plate === plate);
}
