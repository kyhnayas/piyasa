/**
 * Piyasa (piyasa.work) - Kapsamlı Başlangıç Veri Seti
 * Türkiye iş piyasasının farklı sektörlerindeki gerçekçi meslek, ücret, şehir ve kariyer verileri.
 */

export interface ProfessionData {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  summary: string;
  description: string;
  tasks: string[];
  toolsAndTech?: string[];
  dailyRoutine?: string;
  education: string[];
  skills: string[];
  certifications: { name: string; issuer: string; isAffiliate?: boolean; url?: string }[];
  interviewQuestions?: { question: string; category: string; tip: string }[];
  legalRequirement?: {
    isRegulated: boolean;
    lawName?: string;
    chamber?: string;
    requiredDegree: string;
    licenseOrRegistry?: string;
    summaryText: string;
  };
  careerLadder: {
    level: string;
    years: string;
    medianNet: number;
    range: string;
    focus: string;
  }[];
  salaryStats: {
    min: number;
    p25: number;
    median: number;
    p75: number;
    max: number;
    sampleSize: number;
    sourceGrade: 'A' | 'B' | 'C' | 'D' | 'E';
    confidenceLabel: 'YÜKSEK' | 'ORTA';
    lastUpdated: string;
  };
  citySalaries: {
    city: string;
    citySlug: string;
    medianNet: number;
    diffPercent: number; // vs Türkiye geneli
  }[];
  sectorSalaries: {
    sector: string;
    medianNet: number;
  }[];
  fieldExperiences: {
    level: string;
    city: string;
    years: number;
    comment: string;
    workType: string;
    verified: boolean;
  }[];
  faq: { q: string; a: string }[];
}

export const CITIES = [
  { name: 'İstanbul', slug: 'istanbul', plate: 34 },
  { name: 'Ankara', slug: 'ankara', plate: 6 },
  { name: 'İzmir', slug: 'izmir', plate: 35 },
  { name: 'Bursa', slug: 'bursa', plate: 16 },
  { name: 'Kocaeli', slug: 'kocaeli', plate: 41 },
  { name: 'Antalya', slug: 'antalya', plate: 7 },
  { name: 'Eskişehir', slug: 'eskisehir', plate: 26 },
  { name: 'Uzaktan (Türkiye)', slug: 'remote_tr', plate: 0 },
  { name: 'Uzaktan (Global)', slug: 'remote_global', plate: 0 },
];

export const SECTORS = [
  { name: 'Bilişim & Yazılım', slug: 'bilisim_yazilim', icon: 'Code' },
  { name: 'Finans & FinTech', slug: 'finans_fintech', icon: 'Building2' },
  { name: 'Savunma Sanayii', slug: 'savunma_sanayii', icon: 'ShieldCheck' },
  { name: 'Enerji & Altyapı', slug: 'enerji', icon: 'Zap' },
  { name: 'Otomotiv & İmalat', slug: 'otomotiv', icon: 'Cpu' },
  { name: 'Sağlık & İlaç', slug: 'saglik_ilac', icon: 'HeartPulse' },
  { name: 'Perakende & E-Ticaret', slug: 'perakende_eticaret', icon: 'ShoppingBag' },
];

export const PROFESSIONS_DATA: ProfessionData[] = [
  {
    id: 'prof-1',
    title: 'Yazılım Mühendisi',
    slug: 'yazilim-muhendisi',
    category: 'Yazılım & Teknoloji',
    categorySlug: 'bilisim_yazilim',
    summary: 'Sistem mimarisi tasarlayan, ölçeklenebilir yazılım servisleri geliştiren ve kod kalitesini denetleyen teknoloji uzmanı.',
    description: 'Yazılım Mühendisleri, modern web, mobil ve bulut tabanlı uygulamaların gereksinim analizinden mimarisine, kodlanmasından test ve canlıya alma süreçlerine kadar tüm geliştirme yaşam döngüsünü yönetir.',
    tasks: [
      'Mikroservis mimarileri ve RESTful / gRPC API uç noktaları tasarlamak',
      'Veritabanı şemalarını modellemek ve sorgu optimizasyonlarını yürütmek',
      'CI/CD otomatik dağıtım hatlarını yapılandırmak ve sürdürmek',
      'Kod incelemeleri (Code Review) yaparak yazılım kalitesini ve güvenliğini sağlamak',
    ],
    education: ['Bilgisayar Mühendisliği', 'Yazılım Mühendisliği', 'Yönetim Bilişim Sistemleri (YBS)'],
    skills: ['TypeScript / Node.js', 'PostgreSQL', 'Docker & Kubernetes', 'Sistem Mimarisi', 'Cloud (AWS/GCP/Azure)'],
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', isAffiliate: true, url: '#' },
      { name: 'CKA: Certified Kubernetes Administrator', issuer: 'Linux Foundation', isAffiliate: true, url: '#' },
    ],
    careerLadder: [
      { level: 'Junior Yazılım Mühendisi', years: '0 - 2 Yıl', medianNet: 52000, range: '42.000 - 64.000 ₺', focus: 'Birim geliştirme, hata giderme ve temel algoritmalar' },
      { level: 'Mid (Orta Düzey) Mühendis', years: '2 - 5 Yıl', medianNet: 88000, range: '74.000 - 105.000 ₺', focus: 'Modül sahipliği, API tasarımı ve bağımsız teslimat' },
      { level: 'Senior Yazılım Mühendisi', years: '5 - 8 Yıl', medianNet: 135000, range: '115.000 - 170.000 ₺', focus: 'Mimari kararlar, performans optimizasyonu ve mentorluk' },
      { level: 'Lead / Principal Mühendis', years: '8 - 12 Yıl', medianNet: 185000, range: '155.000 - 235.000 ₺', focus: 'Teknoloji stratejisi, çapraz ekip mimarisi ve vizyon' },
      { level: 'Yazılım Müdürü / VP', years: '12+ Yıl', medianNet: 260000, range: '210.000 - 340.000 ₺', focus: 'Mühendislik organizasyonu, bütçe ve iş ortaklığı' },
    ],
    salaryStats: {
      min: 42000,
      p25: 72000,
      median: 95000,
      p75: 140000,
      max: 275000,
      sampleSize: 342,
      sourceGrade: 'D',
      confidenceLabel: 'YÜKSEK',
      lastUpdated: 'Eylül 2026',
    },
    citySalaries: [
      { city: 'İstanbul', citySlug: 'istanbul', medianNet: 108000, diffPercent: 13.7 },
      { city: 'Ankara (Savunma & Kamu)', citySlug: 'ankara', medianNet: 98000, diffPercent: 3.1 },
      { city: 'İzmir', citySlug: 'izmir', medianNet: 88000, diffPercent: -7.3 },
      { city: 'Uzaktan (Global Sözleşmeli)', citySlug: 'remote_global', medianNet: 165000, diffPercent: 73.6 },
    ],
    sectorSalaries: [
      { sector: 'FinTech / Dijital Bankacılık', medianNet: 115000 },
      { sector: 'Savunma Sanayii', medianNet: 112000 },
      { sector: 'B2B SaaS / Yazılım İhracatı', medianNet: 104000 },
      { sector: 'E-Ticaret & Perakende', medianNet: 89000 },
    ],
    fieldExperiences: [
      { level: 'Senior', city: 'İstanbul', years: 6, comment: 'Banka/Fintech tarafında yan haklar ve özel sağlık sigortası çok güçlü ancak sorumluluk ve nöbet yükü yüksek.', workType: 'Hibrit', verified: true },
      { level: 'Mid', city: 'Ankara', years: 3, comment: 'Savunma sanayiinde maaş düzenli ve TİS benzeri haklar var, çalışma disiplini çok net.', workType: 'Ofis', verified: true },
    ],
    faq: [
      { q: 'Yazılım mühendisleri 2026 yılında ortalama ne kadar kazanıyor?', a: 'Piyasa veritabanındaki 342 doğrulanmış gözleme göre Türkiye genelinde medyan net maaş 95.000 ₺ seviyesindedir. Yeni başlayanlarda 42.000 - 64.000 ₺ aralığındayken kıdemli uzmanlarda 140.000 ₺ üzerine çıkmaktadır.' },
      { q: 'İstanbul ile Ankara arasında yazılım maaş farkı nedir?', a: 'İstanbul özel sektör ve fintech ağırlığı sebebiyle ortalama %10-15 daha yüksek nominal maaş sunarken, Ankara savunma sanayii odaklı kurumsal paketler ve yaşam maliyeti avantajı sağlar.' },
    ],
  },
  {
    id: 'prof-2',
    title: 'Makine Mühendisi',
    slug: 'makine-muhendisi',
    category: 'Mühendislik & İmalat',
    categorySlug: 'otomotiv',
    summary: 'Mekanik sistemlerin, üretim hatlarının, motorların ve endüstriyel tesislerin tasarım ve analizini yapan mühendislik uzmanı.',
    description: 'Makine Mühendisliği; otomotiv, havacılık, enerji, ısıtma-soğutma ve savunma sanayiinde fiziksel bileşenlerin tasarımı, termodinamik ve mukavemet analizleri ile seri üretim hatlarının optimizasyonunu kapsar.',
    tasks: [
      'CAD yazılımları ile 3D parça ve montaj modellemesi yapmak',
      'Sonlu elemanlar (FEA) ve akışkanlar mekaniği (CFD) analizlerini yürütmek',
      'Üretim yöntemlerini (talaşlı imalat, döküm, kalıplama) ve toleransları belirlemek',
      'Saha montajı ve kalite kontrol testlerini yönetmek',
    ],
    education: ['Makine Mühendisliği', 'Mekatronik Mühendisliği', 'İmalat Mühendisliği'],
    skills: ['SolidWorks / CATIA', 'Ansys FEA', 'Teknik Resim & GD&T', 'Termodinamik', 'Üretim Planlama'],
    certifications: [
      { name: 'CSWA / CSWP SolidWorks Sertifikası', issuer: 'Dassault Systèmes', isAffiliate: false },
      { name: 'Altı Sigma Yeşil Kuşak', issuer: 'ASQ', isAffiliate: true, url: '#' },
    ],
    careerLadder: [
      { level: 'Junior Makine Mühendisi', years: '0 - 2 Yıl', medianNet: 44000, range: '36.000 - 52.000 ₺', focus: 'Teknik çizim, montaj desteği ve malzeme takibi' },
      { level: 'Tasarım / Üretim Mühendisi', years: '2 - 5 Yıl', medianNet: 68000, range: '56.000 - 82.000 ₺', focus: 'Bağımsız parça tasarımı ve hat verimliliği' },
      { level: 'Kıdemli Makine Mühendisi', years: '5 - 9 Yıl', medianNet: 105000, range: '88.000 - 130.000 ₺', focus: 'Kompleks mekanik analiz ve alt yüklenici yönetimi' },
      { level: 'Mühendislik Yöneticisi', years: '9+ Yıl', medianNet: 165000, range: '135.000 - 210.000 ₺', focus: 'Ar-Ge merkezi liderliği, bütçe ve patent stratejisi' },
    ],
    salaryStats: {
      min: 36000,
      p25: 54000,
      median: 76000,
      p75: 110000,
      max: 195000,
      sampleSize: 218,
      sourceGrade: 'D',
      confidenceLabel: 'YÜKSEK',
      lastUpdated: 'Eylül 2026',
    },
    citySalaries: [
      { city: 'Kocaeli & Gebze Sanayi', citySlug: 'kocaeli', medianNet: 84000, diffPercent: 10.5 },
      { city: 'Bursa (Otomotiv Kümesi)', citySlug: 'bursa', medianNet: 82000, diffPercent: 7.9 },
      { city: 'Ankara (Savunma Kümesi)', citySlug: 'ankara', medianNet: 85000, diffPercent: 11.8 },
      { city: 'İstanbul', citySlug: 'istanbul', medianNet: 81000, diffPercent: 6.5 },
    ],
    sectorSalaries: [
      { sector: 'Savunma & Havacılık', medianNet: 94000 },
      { sector: 'Otomotiv Ana Sanayi', medianNet: 86000 },
      { sector: 'Enerji & Santral İşletmeciliği', medianNet: 78000 },
      { sector: 'HVAC (Isıtma/Soğutma)', medianNet: 65000 },
    ],
    fieldExperiences: [
      { level: 'Mid', city: 'Bursa', years: 4, comment: 'Otomotiv yan sanayide mesai yoğun ancak ana sanayiye geçişte tecrübe çok kıymetli.', workType: 'Ofis/Fabrika', verified: true },
    ],
    faq: [
      { q: 'Makine mühendisliği için en yüksek maaş hangi sektörde?', a: 'Doğrulanmış piyasa gözlemlerine göre Savunma & Havacılık ile Otomotiv Ana Sanayi medyan ücretlerde ilk sırada yer almaktadır.' },
    ],
  },
  {
    id: 'prof-3',
    title: 'Veri Bilimci (Data Scientist)',
    slug: 'veri-bilimci',
    category: 'Veri & Yapay Zeka',
    categorySlug: 'bilisim_yazilim',
    summary: 'Büyük veri setlerini makine öğrenmesi, istatistiksel modelleme ve algoritmalarla işleyerek iş değerine dönüştüren analitik uzman.',
    description: 'Veri Bilimciler, yapılandırılmış ve yapılandırılmamış verileri temizler, keşifsel veri analizi yapar, kestirimci (predictive) modeller geliştirir ve kurumsal karar mekanizmalarını yapay zekayla güçlendirir.',
    tasks: [
      'Tahmine dayalı makine öğrenmesi ve derin öğrenme modelleri eğitmek',
      'A/B testleri tasarlamak ve deneysel istatistiksel analizler üretmek',
      'Büyük veri altyapılarında (Spark, BigQuery) veri boru hatları sorgulamak',
      'Model metriklerini ve iş çıktısını karar vericilere görselleştirmek',
    ],
    education: ['Endüstri Mühendisliği', 'İstatistik', 'Bilgisayar Mühendisliği', 'Matematik'],
    skills: ['Python (pandas, scikit-learn)', 'SQL & BigQuery', 'Machine Learning', 'Derin Öğrenme / NLP', 'PowerBI / Tableau'],
    certifications: [
      { name: 'Google Professional Data Engineer', issuer: 'Google Cloud', isAffiliate: true, url: '#' },
      { name: 'TensorFlow Developer Certificate', issuer: 'Google', isAffiliate: false },
    ],
    careerLadder: [
      { level: 'Junior Veri Bilimci', years: '0 - 2 Yıl', medianNet: 50000, range: '40.000 - 62.000 ₺', focus: 'Veri ön işleme, temel regresyon ve EDA' },
      { level: 'Mid Veri Bilimci', years: '2 - 5 Yıl', medianNet: 86000, range: '72.000 - 105.000 ₺', focus: 'Uçtan uca model eğitimi ve hiperparametre optimizasyonu' },
      { level: 'Senior Veri Bilimci', years: '5 - 8 Yıl', medianNet: 132000, range: '110.000 - 165.000 ₺', focus: 'Model serving, LLM entegrasyonu ve MLOps' },
      { level: 'Head of Data & AI', years: '8+ Yıl', medianNet: 210000, range: '170.000 - 290.000 ₺', focus: 'Yapay zeka stratejisi ve veri yönetişimi' },
    ],
    salaryStats: {
      min: 40000,
      p25: 68000,
      median: 92000,
      p75: 138000,
      max: 260000,
      sampleSize: 184,
      sourceGrade: 'D',
      confidenceLabel: 'YÜKSEK',
      lastUpdated: 'Eylül 2026',
    },
    citySalaries: [
      { city: 'İstanbul', citySlug: 'istanbul', medianNet: 104000, diffPercent: 13.0 },
      { city: 'Ankara', citySlug: 'ankara', medianNet: 90000, diffPercent: -2.2 },
      { city: 'Uzaktan (Global)', citySlug: 'remote_global', medianNet: 160000, diffPercent: 73.9 },
    ],
    sectorSalaries: [
      { sector: 'Telekom & İletişim', medianNet: 106000 },
      { sector: 'FinTech & Bankacılık', medianNet: 105000 },
      { sector: 'E-Ticaret (Pazar Yeri)', medianNet: 94000 },
    ],
    fieldExperiences: [
      { level: 'Senior', city: 'İstanbul', years: 5, comment: 'Bankacılık tarafında kredi skorlama ve dolandırıcılık tespiti projeleri çok teknik ve doyurucu.', workType: 'Hibrit', verified: true },
    ],
    faq: [
      { q: 'Veri bilimci maaşları 2026’da yazılımcılardan yüksek mi?', a: 'Giriş seviyesinde benzer seyretmekle birlikte, MLOps ve LLM tecrübesi olan Senior veri bilimcilerin üst çeyreklik (P75) ücretleri yazılım ortalamasının hafif üzerindedir.' },
    ],
  },
  {
    id: 'prof-4',
    title: 'İnsan Kaynakları Uzmanı',
    slug: 'insan-kaynaklari-uzmani',
    category: 'Yönetim & İK',
    categorySlug: 'perakende_eticaret',
    summary: 'İşe alım, bordrolama, yetenek yönetimi ve çalışan deneyimi süreçlerini planlayan kurumsal profesyonel.',
    description: 'İnsan Kaynakları Uzmanları, kurumun hedefleri ile iş gücü stratejisini uyumlaştırır; yetenek kazanımı, performans değerlendirme, çalışan bağlılığı ve çalışma mevzuatı uyumunu sağlar.',
    tasks: [
      'Aday tarama, mülakat organizasyonları ve teklif süreçlerini yönetmek',
      'Bordro, SGK bildirgeleri ve yasal hak ediş hesaplamalarını denetlemek',
      'Eğitim ve gelişim ihtiyaç analizlerini yapmak',
      'Şirket içi çalışan bağlılığı anketleri düzenlemek',
    ],
    education: ['Çalışma Ekonomisi ve Endüstri İlişkileri (ÇEEİ)', 'Psikoloji', 'İşletme', 'Sosyoloji'],
    skills: ['Yetkinlik Bazlı Mülakat', 'İş Kanunu & SGK Mevzuatı', 'Bordrolama', 'Yetenek Yönetimi'],
    certifications: [
      { name: 'SHRM-CP Certified Professional', issuer: 'SHRM', isAffiliate: true, url: '#' },
    ],
    careerLadder: [
      { level: 'İK Asistanı / Stajyer', years: '0 - 1 Yıl', medianNet: 32000, range: '28.000 - 38.000 ₺', focus: 'Özgeçmiş tarama ve evrak yönetimi' },
      { level: 'İK Uzmanı', years: '2 - 5 Yıl', medianNet: 54000, range: '44.000 - 68.000 ₺', focus: 'Uçtan uca işe alım ve özlük işleri' },
      { level: 'Kıdemli İK Yöneticisi', years: '5 - 9 Yıl', medianNet: 84000, range: '70.000 - 105.000 ₺', focus: 'Performans yönetimi ve İK analitiği' },
      { level: 'İK Direktörü (CHRO)', years: '9+ Yıl', medianNet: 145000, range: '115.000 - 210.000 ₺', focus: 'Organizasyonel dönüşüm ve kültür' },
    ],
    salaryStats: {
      min: 28000,
      p25: 44000,
      median: 62000,
      p75: 88000,
      max: 160000,
      sampleSize: 156,
      sourceGrade: 'D',
      confidenceLabel: 'YÜKSEK',
      lastUpdated: 'Eylül 2026',
    },
    citySalaries: [
      { city: 'İstanbul', citySlug: 'istanbul', medianNet: 70000, diffPercent: 12.9 },
      { city: 'Ankara', citySlug: 'ankara', medianNet: 60000, diffPercent: -3.2 },
      { city: 'İzmir', citySlug: 'izmir', medianNet: 55000, diffPercent: -11.3 },
    ],
    sectorSalaries: [
      { sector: 'Teknoloji & SaaS', medianNet: 74000 },
      { sector: 'İlaç & Sağlık', medianNet: 68000 },
      { sector: 'Perakende & Mağazacılık', medianNet: 52000 },
    ],
    fieldExperiences: [
      { level: 'Mid', city: 'İstanbul', years: 3, comment: 'Tech recruiter rolleri standart İK rollerine göre prim ve taban ücret açısından daha avantajlı.', workType: 'Hibrit', verified: true },
    ],
    faq: [
      { q: 'İK maaşları hangi unvanda sıçrama yapar?', a: 'Kıdemli Uzman ve İK İş Ortağı (HRBP) pozisyonuna geçişte kurumsal firmalarda maaş skalası belirgin şekilde yükselir.' },
    ],
  },
];

export const MARKET_TRENDS = [
  {
    title: 'Yapay Zeka ve MLOps Yetkinliklerinde Ücret Artışı',
    sector: 'Bilişim & Yazılım',
    changeRate: '+34%',
    detail: 'Geleneksel yazılım rollerine kıyasla üretken yapay zeka ve LLM entegrasyonu tecrübesi olan uzmanların talep priminde artış gözlemleniyor.',
  },
  {
    title: 'Savunma Sanayiinde Kıdemli Mühendislik Talebi',
    sector: 'Savunma & Havacılık',
    changeRate: '+28%',
    detail: 'Ankara ve Kocaeli sanayi havzalarında gömülü sistem ve sistem mühendisliği ücret skalaları enflasyonun üzerinde seyrediyor.',
  },
  {
    title: 'Şehirler Arası Reel Ücret Makası',
    sector: 'Genel Pazar',
    changeRate: '%18 Fark',
    detail: 'İstanbul nominal maaş liderliğini sürdürürken, kira ve yaşam endeksi düzeltmesi yapıldığında Eskişehir ve Bursa satın alma gücünde öne çıkıyor.',
  },
];

export const LATEST_DATA_UPDATES = [
  { profession: 'Yazılım Mühendisi', change: '14 yeni bildirim', median: '95.000 ₺', grade: 'D' as const, date: 'Bugün 14:20' },
  { profession: 'Makine Mühendisi', change: '8 yeni bildirim', median: '76.000 ₺', grade: 'D' as const, date: 'Bugün 11:45' },
  { profession: 'Veri Bilimci', change: '5 yeni bildirim', median: '92.000 ₺', grade: 'D' as const, date: 'Dün 18:30' },
  { profession: 'İnsan Kaynakları Uzmanı', change: '11 yeni bildirim', median: '62.000 ₺', grade: 'D' as const, date: 'Dün 16:15' },
];
