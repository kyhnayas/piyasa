/**
 * Türkiye 81 İl Veri Seti ve TÜİK Bölgesel Ücret Endeksi Katsayıları
 * 2026 yılı yaşam maliyeti ve iş gücü piyasası bölgesel katsayıları
 */

export type CityTier = 
  | 'mega-metropol' 
  | 'metropol' 
  | 'sanayi-ussu' 
  | 'turizm-kenti' 
  | 'bolgesel-merkez' 
  | 'anadolu-sehri';

export interface CityData {
  plate: number;
  name: string;
  slug: string;
  region: string;
  diffPercent: number; // Türkiye ortalamasına göre tahmini % sapma (+% / -%)
  multiplier: number;  // 1.00 baz katsayı
  tier?: CityTier;
  rentLevel?: 'Aşırı Yüksek' | 'Yüksek' | 'Dengeli / Orta' | 'Düşük / Avantajlı';
}

export const TURKEY_81_CITIES: CityData[] = [
  { plate: 1, name: 'Adana', slug: 'adana', region: 'Akdeniz', diffPercent: -4, multiplier: 0.96, tier: 'bolgesel-merkez', rentLevel: 'Dengeli / Orta' },
  { plate: 2, name: 'Adıyaman', slug: 'adiyaman', region: 'Güneydoğu Anadolu', diffPercent: -12, multiplier: 0.88, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 3, name: 'Afyonkarahisar', slug: 'afyonkarahisar', region: 'Ege', diffPercent: -10, multiplier: 0.90, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 4, name: 'Ağrı', slug: 'agri', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 5, name: 'Amasya', slug: 'amasya', region: 'Karadeniz', diffPercent: -11, multiplier: 0.89, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 6, name: 'Ankara', slug: 'ankara', region: 'İç Anadolu', diffPercent: 6, multiplier: 1.06, tier: 'metropol', rentLevel: 'Yüksek' },
  { plate: 7, name: 'Antalya', slug: 'antalya', region: 'Akdeniz', diffPercent: 4, multiplier: 1.04, tier: 'turizm-kenti', rentLevel: 'Yüksek' },
  { plate: 8, name: 'Artvin', slug: 'artvin', region: 'Karadeniz', diffPercent: -10, multiplier: 0.90, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 9, name: 'Aydın', slug: 'aydin', region: 'Ege', diffPercent: -5, multiplier: 0.95, tier: 'turizm-kenti', rentLevel: 'Dengeli / Orta' },
  { plate: 10, name: 'Balıkesir', slug: 'balikesir', region: 'Marmara', diffPercent: -3, multiplier: 0.97, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 11, name: 'Bilecik', slug: 'bilecik', region: 'Marmara', diffPercent: -2, multiplier: 0.98, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 12, name: 'Bingöl', slug: 'bingol', region: 'Doğu Anadolu', diffPercent: -14, multiplier: 0.86, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 13, name: 'Bitlis', slug: 'bitlis', region: 'Doğu Anadolu', diffPercent: -14, multiplier: 0.86, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 14, name: 'Bolu', slug: 'bolu', region: 'Karadeniz', diffPercent: -4, multiplier: 0.96, tier: 'anadolu-sehri', rentLevel: 'Dengeli / Orta' },
  { plate: 15, name: 'Burdur', slug: 'burdur', region: 'Akdeniz', diffPercent: -9, multiplier: 0.91, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 16, name: 'Bursa', slug: 'bursa', region: 'Marmara', diffPercent: 2, multiplier: 1.02, tier: 'sanayi-ussu', rentLevel: 'Yüksek' },
  { plate: 17, name: 'Çanakkale', slug: 'canakkale', region: 'Marmara', diffPercent: -2, multiplier: 0.98, tier: 'turizm-kenti', rentLevel: 'Dengeli / Orta' },
  { plate: 18, name: 'Çankırı', slug: 'cankiri', region: 'İç Anadolu', diffPercent: -12, multiplier: 0.88, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 19, name: 'Çorum', slug: 'corum', region: 'Karadeniz', diffPercent: -10, multiplier: 0.90, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 20, name: 'Denizli', slug: 'denizli', region: 'Ege', diffPercent: -2, multiplier: 0.98, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 21, name: 'Diyarbakır', slug: 'diyarbakir', region: 'Güneydoğu Anadolu', diffPercent: -8, multiplier: 0.92, tier: 'bolgesel-merkez', rentLevel: 'Dengeli / Orta' },
  { plate: 22, name: 'Edirne', slug: 'edirne', region: 'Marmara', diffPercent: -4, multiplier: 0.96, tier: 'bolgesel-merkez', rentLevel: 'Dengeli / Orta' },
  { plate: 23, name: 'Elazığ', slug: 'elazig', region: 'Doğu Anadolu', diffPercent: -10, multiplier: 0.90, tier: 'bolgesel-merkez', rentLevel: 'Düşük / Avantajlı' },
  { plate: 24, name: 'Erzincan', slug: 'erzincan', region: 'Doğu Anadolu', diffPercent: -12, multiplier: 0.88, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 25, name: 'Erzurum', slug: 'erzurum', region: 'Doğu Anadolu', diffPercent: -8, multiplier: 0.92, tier: 'bolgesel-merkez', rentLevel: 'Düşük / Avantajlı' },
  { plate: 26, name: 'Eskişehir', slug: 'eskisehir', region: 'İç Anadolu', diffPercent: 3, multiplier: 1.03, tier: 'bolgesel-merkez', rentLevel: 'Dengeli / Orta' },
  { plate: 27, name: 'Gaziantep', slug: 'gaziantep', region: 'Güneydoğu Anadolu', diffPercent: -2, multiplier: 0.98, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 28, name: 'Giresun', slug: 'giresun', region: 'Karadeniz', diffPercent: -11, multiplier: 0.89, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 29, name: 'Gümüşhane', slug: 'gumushane', region: 'Karadeniz', diffPercent: -13, multiplier: 0.87, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 30, name: 'Hakkari', slug: 'hakkari', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 31, name: 'Hatay', slug: 'hatay', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92, tier: 'bolgesel-merkez', rentLevel: 'Düşük / Avantajlı' },
  { plate: 32, name: 'Isparta', slug: 'isparta', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 33, name: 'Mersin', slug: 'mersin', region: 'Akdeniz', diffPercent: -2, multiplier: 0.98, tier: 'bolgesel-merkez', rentLevel: 'Dengeli / Orta' },
  { plate: 34, name: 'İstanbul', slug: 'istanbul', region: 'Marmara', diffPercent: 18, multiplier: 1.18, tier: 'mega-metropol', rentLevel: 'Aşırı Yüksek' },
  { plate: 35, name: 'İzmir', slug: 'izmir', region: 'Ege', diffPercent: 4, multiplier: 1.04, tier: 'metropol', rentLevel: 'Yüksek' },
  { plate: 36, name: 'Kars', slug: 'kars', region: 'Doğu Anadolu', diffPercent: -14, multiplier: 0.86, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 37, name: 'Kastamonu', slug: 'kastamonu', region: 'Karadeniz', diffPercent: -11, multiplier: 0.89, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 38, name: 'Kayseri', slug: 'kayseri', region: 'İç Anadolu', diffPercent: -3, multiplier: 0.97, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 39, name: 'Kırklareli', slug: 'kirklareli', region: 'Marmara', diffPercent: -4, multiplier: 0.96, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 40, name: 'Kırşehir', slug: 'kirsehir', region: 'İç Anadolu', diffPercent: -11, multiplier: 0.89, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 41, name: 'Kocaeli', slug: 'kocaeli', region: 'Marmara', diffPercent: 8, multiplier: 1.08, tier: 'sanayi-ussu', rentLevel: 'Yüksek' },
  { plate: 42, name: 'Konya', slug: 'konya', region: 'İç Anadolu', diffPercent: -3, multiplier: 0.97, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 43, name: 'Kütahya', slug: 'kutahya', region: 'Ege', diffPercent: -8, multiplier: 0.92, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 44, name: 'Malatya', slug: 'malatya', region: 'Doğu Anadolu', diffPercent: -10, multiplier: 0.90, tier: 'bolgesel-merkez', rentLevel: 'Düşük / Avantajlı' },
  { plate: 45, name: 'Manisa', slug: 'manisa', region: 'Ege', diffPercent: 0, multiplier: 1.00, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 46, name: 'Kahramanmaraş', slug: 'kahramanmaras', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 47, name: 'Mardin', slug: 'mardin', region: 'Güneydoğu Anadolu', diffPercent: -11, multiplier: 0.89, tier: 'turizm-kenti', rentLevel: 'Düşük / Avantajlı' },
  { plate: 48, name: 'Muğla', slug: 'mugla', region: 'Ege', diffPercent: 2, multiplier: 1.02, tier: 'turizm-kenti', rentLevel: 'Aşırı Yüksek' },
  { plate: 49, name: 'Muş', slug: 'mus', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 50, name: 'Nevşehir', slug: 'nevsehir', region: 'İç Anadolu', diffPercent: -8, multiplier: 0.92, tier: 'turizm-kenti', rentLevel: 'Dengeli / Orta' },
  { plate: 51, name: 'Niğde', slug: 'nigde', region: 'İç Anadolu', diffPercent: -11, multiplier: 0.89, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 52, name: 'Ordu', slug: 'ordu', region: 'Karadeniz', diffPercent: -8, multiplier: 0.92, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 53, name: 'Rize', slug: 'rize', region: 'Karadeniz', diffPercent: -7, multiplier: 0.93, tier: 'anadolu-sehri', rentLevel: 'Dengeli / Orta' },
  { plate: 54, name: 'Sakarya', slug: 'sakarya', region: 'Marmara', diffPercent: 1, multiplier: 1.01, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 55, name: 'Samsun', slug: 'samsun', region: 'Karadeniz', diffPercent: -4, multiplier: 0.96, tier: 'bolgesel-merkez', rentLevel: 'Dengeli / Orta' },
  { plate: 56, name: 'Siirt', slug: 'siirt', region: 'Güneydoğu Anadolu', diffPercent: -14, multiplier: 0.86, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 57, name: 'Sinop', slug: 'sinop', region: 'Karadeniz', diffPercent: -12, multiplier: 0.88, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 58, name: 'Sivas', slug: 'sivas', region: 'İç Anadolu', diffPercent: -9, multiplier: 0.91, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 59, name: 'Tekirdağ', slug: 'tekirdag', region: 'Marmara', diffPercent: 3, multiplier: 1.03, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 60, name: 'Tokat', slug: 'tokat', region: 'Karadeniz', diffPercent: -12, multiplier: 0.88, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 61, name: 'Trabzon', slug: 'trabzon', region: 'Karadeniz', diffPercent: -5, multiplier: 0.95, tier: 'bolgesel-merkez', rentLevel: 'Dengeli / Orta' },
  { plate: 62, name: 'Tunceli', slug: 'tunceli', region: 'Doğu Anadolu', diffPercent: -12, multiplier: 0.88, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 63, name: 'Şanlıurfa', slug: 'sanliurfa', region: 'Güneydoğu Anadolu', diffPercent: -10, multiplier: 0.90, tier: 'bolgesel-merkez', rentLevel: 'Düşük / Avantajlı' },
  { plate: 64, name: 'Uşak', slug: 'usak', region: 'Ege', diffPercent: -8, multiplier: 0.92, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 65, name: 'Van', slug: 'van', region: 'Doğu Anadolu', diffPercent: -12, multiplier: 0.88, tier: 'bolgesel-merkez', rentLevel: 'Düşük / Avantajlı' },
  { plate: 66, name: 'Yozgat', slug: 'yozgat', region: 'İç Anadolu', diffPercent: -12, multiplier: 0.88, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 67, name: 'Zonguldak', slug: 'zonguldak', region: 'Karadeniz', diffPercent: -4, multiplier: 0.96, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 68, name: 'Aksaray', slug: 'aksaray', region: 'İç Anadolu', diffPercent: -10, multiplier: 0.90, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 69, name: 'Bayburt', slug: 'bayburt', region: 'Karadeniz', diffPercent: -14, multiplier: 0.86, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 70, name: 'Karaman', slug: 'karaman', region: 'İç Anadolu', diffPercent: -9, multiplier: 0.91, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 71, name: 'Kırıkkale', slug: 'kirikkale', region: 'İç Anadolu', diffPercent: -8, multiplier: 0.92, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 72, name: 'Batman', slug: 'batman', region: 'Güneydoğu Anadolu', diffPercent: -11, multiplier: 0.89, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 73, name: 'Şırnak', slug: 'sirnak', region: 'Güneydoğu Anadolu', diffPercent: -15, multiplier: 0.85, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 74, name: 'Bartın', slug: 'bartin', region: 'Karadeniz', diffPercent: -10, multiplier: 0.90, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 75, name: 'Ardahan', slug: 'ardahan', region: 'Doğu Anadolu', diffPercent: -15, multiplier: 0.85, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 76, name: 'Iğdır', slug: 'igdir', region: 'Doğu Anadolu', diffPercent: -13, multiplier: 0.87, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 77, name: 'Yalova', slug: 'yalova', region: 'Marmara', diffPercent: 2, multiplier: 1.02, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
  { plate: 78, name: 'Karabük', slug: 'karabuk', region: 'Karadeniz', diffPercent: -7, multiplier: 0.93, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 79, name: 'Kilis', slug: 'kilis', region: 'Güneydoğu Anadolu', diffPercent: -13, multiplier: 0.87, tier: 'anadolu-sehri', rentLevel: 'Düşük / Avantajlı' },
  { plate: 80, name: 'Osmaniye', slug: 'osmaniye', region: 'Akdeniz', diffPercent: -8, multiplier: 0.92, tier: 'sanayi-ussu', rentLevel: 'Düşük / Avantajlı' },
  { plate: 81, name: 'Düzce', slug: 'duzce', region: 'Karadeniz', diffPercent: -3, multiplier: 0.97, tier: 'sanayi-ussu', rentLevel: 'Dengeli / Orta' },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return TURKEY_81_CITIES.find(c => c.slug === slug);
}

export function getCityByPlate(plate: number): CityData | undefined {
  return TURKEY_81_CITIES.find(c => c.plate === plate);
}

/**
 * 81 İl için Benzersiz ve SEO Uyumlu Yaşam Koşulları & Ücret Pazarlık Analizi Üretir.
 * Google kopyalama cezasını (duplicate content) önlemek için her ilin ekonomik tipine ve dinamiklerine göre özelleştirilmiştir.
 */
export function getCityCostOfLivingAnalysis(citySlug: string, professionTitle: string): {
  metropolComparison: string;
  bargainingTip: string;
} {
  const city = getCityBySlug(citySlug);
  if (!city) {
    return {
      metropolComparison: `Bölgesel yaşam maliyeti ve konut giderleri Türkiye ortalamasına göre dengeli bir seyir izlemektedir.`,
      bargainingTip: `Mülakatlarda medyan ücret seviyelerini baz alarak yan haklar üzerinden pazarlık yürütmeniz önerilir.`
    };
  }

  // 1. İSTANBUL
  if (city.slug === 'istanbul') {
    return {
      metropolComparison: `İstanbul, Türkiye'nin finans ve şirket merkezi olarak en yüksek nominal ücret skalasını sunar. Ancak konut kira giderleri ve ulaşım maliyetleri Türkiye genelinin 2 ila 2.5 katı seviyesinde seyretmektedir. Bu durum, yüksek maaşa rağmen Ankara veya İzmir gibi diğer metropollere kıyasla net tasarruf oranını daha sıkışık hale getirebilir.`,
      bargainingTip: `İstanbul merkezli şirketlerle yapılan ücret müzakerelerinde yalnızca çıplak maaşa değil; günlük yemek kartı tavanı (Ticket/Multinet), servis imkanı veya tam yol yardımı, özel sağlık sigortası (ÖSS) ve haftalık hibrit çalışma modellerine odaklanarak toplam hakedişi maksimize edebilirsiniz.`
    };
  }

  // 2. ANKARA
  if (city.slug === 'ankara') {
    return {
      metropolComparison: `Ankara; kamu kurumları, savunma sanayii devleri ve ODTÜ/Bilkent teknokent kümelenmesi sayesinde Türkiye'nin en istikrarlı ücret ekosistemlerinden birine sahiptir. İstanbul'a kıyasla konut kira giderleri ve günlük ulaşım süreleri belirgin şekilde daha makul olduğundan, ${professionTitle} profesyonelleri için reel alım gücü ve net tasarruf potansiyeli oldukça yüksektir.`,
      bargainingTip: `Ankara merkezli teknoloji, savunma veya kurumsal müşavirlik firmalarıyla görüşürken savunma standartları tecrübenizi, yıllık performans primlerini ve proje bazlı ek teşvikleri masaya getirerek medyanın %15 ila %25 üzerine çıkabilirsiniz.`
    };
  }

  // 3. İZMİR
  if (city.slug === 'izmir') {
    return {
      metropolComparison: `İzmir; yüksek yaşam kalitesi, teknoloji ve batı illerinden aldığı nitelikli beyaz yaka göçüyle dinamik bir iş piyasası sunar. Merkezi ilçelerde konut kiraları metropol seviyesine yaklaşmış olmakla birlikte, İstanbul'a oranla daha dengeli bir sosyal harcama sepeti ve daha kısa ulaşım mesafeleriyle öne çıkar.`,
      bargainingTip: `İzmir yerel şirketleri ile ulusal firmalar arasında ücret makası bulunabilmektedir. Uzaktan veya hibrit çalışma opsiyonlarında İstanbul merkezli şirket tekliflerini referans göstererek İzmir piyasa medyanının üzerinde bir ücret skalası talep edebilirsiniz.`
    };
  }

  // 4. SANAYİ VE İMALAT KUŞAĞI (Kocaeli, Bursa, Tekirdağ, Sakarya, Manisa, vb.)
  if (city.tier === 'sanayi-ussu') {
    return {
      metropolComparison: `${city.name}, Türkiye imalat sanayii, otomotiv ve lojistik koridorunun merkez üssüdür. Konut kira giderleri İstanbul'a kıyasla daha dengeli seyrederken; kurumsal fabrikaların ve sanayi tesislerinin sağladığı servis, fabrika içi yemek ve tamamlayıcı sağlık sigortası gibi güçlü yan haklar çalışan bütçesini doğrudan korur.`,
      bargainingTip: `${city.name} lokasyonundaki sanayi ve üretim devleriyle görüşürken; vardiya primleri, bayram/ikramiye ek ödemeleri ve tam kapsamlı özel sağlık sigortası gibi kurumsal hakların net sözleşmeye bağlanmasını talep ederek toplam paket değerini %20 artırabilirsiniz.`
    };
  }

  // 5. TURİZM VE SAHİL KENTLERİ (Antalya, Muğla, Aydın, Çanakkale vb.)
  if (city.tier === 'turizm-kenti') {
    return {
      metropolComparison: `${city.name}, yoğun turizm dinamikleri ve yabancı yerleşim talebi sebebiyle konut kira giderlerinde Türkiye ortalamasının belirgin şekilde üzerindedir. Sezonluk fiyat dalgalanmaları ve yaz aylarındaki hizmet maliyeti artışları ${professionTitle} pozisyonundaki çalışanların reel alım gücünü doğrudan etkiler.`,
      bargainingTip: `${city.name} pazarında iş tekliflerini değerlendirirken lojman veya kira yardımı olup olmadığını mutlaka sorgulayın. Yüksek konut maliyetlerini gerekçe göstererek başlangıç teklifinin en az %15-%20 üzerinde bir taban net maaş talep etmeniz tavsiye edilir.`
    };
  }

  // 6. GELİŞMİŞ BÖLGESEL MERKEZLER (Eskişehir, Gaziantep, Konya, Kayseri, Adana, Samsun, Trabzon, Diyarbakır vb.)
  if (city.tier === 'bolgesel-merkez') {
    return {
      metropolComparison: `${city.name}, gelişmiş bölgesel sanayi ve ticaret hacmi ile çalışan lehine yüksek bir yaşam maliyeti dengesi sunar. Konut kiraları ve temel tüketim harcamaları İstanbul ve Ankara'ya kıyasla %35-%50 daha düşüktür; bu sayede ${city.name} ilinde kazanılan net maaşın tasarrufa ve yatırıma dönüşme oranı metropollere göre çok daha yüksektir.`,
      bargainingTip: `${city.name} merkezli şirketlerle görüşmelerde büyükşehir medyan verilerini referans göstererek tavan banda yaklaşabilir; özellikle uzaktan çalışma imkanı sunan ulusal şirketlerde çalışarak yerel yaşam maliyeti avantajını en üst düzeye çıkarabilirsiniz.`
    };
  }

  // 7. DİĞER ANADOLU VE DOĞU/GÜNEYDOĞU İLLERİ (81 ilin tüm kalanları)
  return {
    metropolComparison: `${city.name} ilinde genel yaşam maliyeti, konut kiraları ve günlük harcamalar TÜİK İBBS Düzey-2 verilerine göre büyük metropollere kıyasla son derece avantajlı bir seviyededir. Metropollerdeki kira ve ulaşım baskısının burada bulunmaması, nominal maaş farkına rağmen ${professionTitle} çalışanlarının net birikim gücünü güçlü kılar.`,
    bargainingTip: `${city.name} pazarındaki ücret görüşmelerinde Türkiye geneli medyan seviyesini korumayı hedefleyin. Yerel şirketler için bölgeye kattığınız kurumsal yetkinlikleri öne çıkarırken, uzaktan/hibrit çalışanlar için 'büyükşehir maaşı - yerel yaşam maliyeti' kombinasyonu en yüksek refahı sağlar.`
  };
}

