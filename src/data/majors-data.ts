export interface MajorCareerPath {
  title: string;
  slug: string;
  roleType: string;
  isco: string;
  avgSalary: string;
}

export interface UniversityMajor {
  id: string;
  slug: string;
  name: string;
  faculty: string;
  overview: string;
  demandScore: 'Çok Yüksek' | 'Yüksek' | 'Dengeli' | 'Rekabetçi';
  startingSalary: string;
  medianSalary: string;
  topProfessions: MajorCareerPath[];
  criticalSkills: string[];
  recommendedCertifications: string[];
  careerAdvice: string;
}

export const UNIVERSITY_MAJORS: UniversityMajor[] = [
  {
    id: 'major-01',
    slug: 'bilgisayar-ve-yazilim-muhendisligi',
    name: 'Bilgisayar & Yazılım Mühendisliği',
    faculty: 'Mühendislik & Doğa Bilimleri',
    overview: 'Yazılım geliştirme, yapay zeka algoritmaları, bulut bilişim ve siber güvenlik alanlarında teknolojik ürün ve altyapı tasarlayan temel teknoloji disiplini.',
    demandScore: 'Çok Yüksek',
    startingSalary: '48.000 ₺ - 65.000 ₺',
    medianSalary: '95.000 ₺',
    topProfessions: [
      { title: 'Yazılım Mühendisi', slug: 'yazilim-muhendisi', roleType: 'Teknik Çekirdek', isco: '2512', avgSalary: '95.000 ₺' },
      { title: 'Yapay Zeka Mühendisi', slug: 'yapay-zeka-muhendisi', roleType: 'İleri Teknoloji', isco: '2512', avgSalary: '155.000 ₺' },
      { title: 'Veri Bilimci (Data Scientist)', slug: 'veri-bilimci', roleType: 'Analitik & AI', isco: '2511', avgSalary: '92.000 ₺' },
      { title: 'DevOps & Bulut Mühendisi', slug: 'devops-muhendisi', roleType: 'Altyapı', isco: '2512', avgSalary: '110.000 ₺' },
      { title: 'Siber Güvenlik Uzmanı', slug: 'siber-guvenlik-uzmani', roleType: 'Güvenlik', isco: '2529', avgSalary: '105.000 ₺' }
    ],
    criticalSkills: ['Algoritmalar & Veri Yapıları', 'Bulut Mimari (AWS/GCP)', 'Docker & Kubernetes', 'CI/CD Pipeline', 'Sistem Mimarisi Tasarımı'],
    recommendedCertifications: ['AWS Certified Solutions Architect', 'CKA (Kubernetes)', 'CompTIA Security+', 'Google Cloud Professional'],
    careerAdvice: 'Üniversite not ortalamasından çok GitHub portföyünüz ve açık kaynak katkılarınız belirleyicidir. İlk yıldan itibaren gerçek bir projede kod yazın.'
  },
  {
    id: 'major-02',
    slug: 'endustri-muhendisligi',
    name: 'Endüstri Mühendisliği',
    faculty: 'Mühendislik Fakültesi',
    overview: 'İnsan, makine, malzeme ve bilgiden oluşan karmaşık sistemleri optimize eden, iş süreçlerini ve tedarik zincirini verimlilik odaklı tasarlayan analitik mühendislik alanı.',
    demandScore: 'Çok Yüksek',
    startingSalary: '44.000 ₺ - 58.000 ₺',
    medianSalary: '84.000 ₺',
    topProfessions: [
      { title: 'Ürün Yöneticisi (Product Manager)', slug: 'urun-yoneticisi', roleType: 'Yönetim & Strateji', isco: '1219', avgSalary: '98.000 ₺' },
      { title: 'Veri Analisti', slug: 'veri-analisti', roleType: 'Veri & İş Zekası', isco: '2511', avgSalary: '75.000 ₺' },
      { title: 'Tedarik Zinciri & Lojistik Mühendisi', slug: 'lojistik-yoneticisi', roleType: 'Operasyon', isco: '1324', avgSalary: '78.000 ₺' },
      { title: 'Yönetim Danışmanı', slug: 'yonetim-danismani', roleType: 'Danışmanlık', isco: '2421', avgSalary: '92.000 ₺' },
      { title: 'Üretim Planlama Mühendisi', slug: 'uretim-planlama-muhendisi', roleType: 'İmalat', isco: '2141', avgSalary: '72.000 ₺' }
    ],
    criticalSkills: ['SQL & İleri Veri Tabanı', 'Power BI / Tableau', 'Python ile Veri Analizi', 'Yalın Üretim (Lean Six Sigma)', 'Süreç Simülasyonu (Arena)'],
    recommendedCertifications: ['Lean Six Sigma Green Belt', 'APICS CPIM (Tedarik Zinciri)', 'PMP / CAPM (Proje Yönetimi)', 'Microsoft Power BI Data Analyst'],
    careerAdvice: 'Teknik mühendislik ile iş dünyası arasında köprü rolündesiniz. Kodlama (Python/SQL) ve sunum becerisini birlikte harmanlayan mezunlar çok hızlı yükselir.'
  },
  {
    id: 'major-03',
    slug: 'iktisat-ve-isletme',
    name: 'İktisat, İşletme & Finans',
    faculty: 'İktisadi ve İdari Bilimler',
    overview: 'Şirketlerin sermaye yönetimi, bütçeleme, stratejik pazarlama, insan kaynağı ve uluslararası ticaret operasyonlarını yöneten köklü iş dünyası disiplini.',
    demandScore: 'Dengeli',
    startingSalary: '38.000 ₺ - 52.000 ₺',
    medianSalary: '72.000 ₺',
    topProfessions: [
      { title: 'Finans Uzmanı', slug: 'finans-uzmani', roleType: 'Finans & Raporlama', isco: '2412', avgSalary: '70.000 ₺' },
      { title: 'Mali Müşavir (SMMM)', slug: 'mali-musavir', roleType: 'Muhasebe & Denetim', isco: '2411', avgSalary: '85.000 ₺' },
      { title: 'İnsan Kaynakları Uzmanı', slug: 'insan-kaynaklari-uzmani', roleType: 'İK & Yetenek', isco: '2423', avgSalary: '62.000 ₺' },
      { title: 'Yatırım ve Risk Analisti', slug: 'yatirim-analisti', roleType: 'Fintech & Borsa', isco: '2413', avgSalary: '94.000 ₺' },
      { title: 'B2B Kurumsal Satış Yöneticisi', slug: 'satis-yoneticisi', roleType: 'Ticari Büyüme', isco: '1221', avgSalary: '88.000 ₺' }
    ],
    criticalSkills: ['Finansal Modelleme (Excel)', 'ERP Sistemleri (SAP/Oracle)', 'SPK & Vergi Mevzuatı', 'Bütçe Planlama', 'Ticari İngilizce'],
    recommendedCertifications: ['SPK Düzey 1-2-3 Lisansı', 'CFA (Chartered Financial Analyst)', 'SMMM Staj Giriş', 'SAP Finans (FI/CO)'],
    careerAdvice: 'Mezun sayısı çok yüksek olduğu için sadece diploma yetmez. İleri finansal Excel modellemesi, SPK lisansı veya SAP bilmek sizi ilk %5 içine sokar.'
  },
  {
    id: 'major-04',
    slug: 'hukuk',
    name: 'Hukuk',
    faculty: 'Hukuk Fakültesi',
    overview: 'Adalet sistemi, şirketler hukuku, ceza, sözleşmeler ve gelişen dijital hukuk (KVKK, Bilişim Hukuku, Fikri Mülkiyet) süreçlerini yürüten yasal danışmanlık alanı.',
    demandScore: 'Rekabetçi',
    startingSalary: '32.000 ₺ - 48.000 ₺',
    medianSalary: '78.000 ₺',
    topProfessions: [
      { title: 'Şirket / Kurumsal Avukat', slug: 'kurumsal-avukat', roleType: 'Kurumsal Hukuk', isco: '2611', avgSalary: '88.000 ₺' },
      { title: 'Uyum ve KVKK Yöneticisi', slug: 'kvkk-uyum-yoneticisi', roleType: 'Regülasyon', isco: '2422', avgSalary: '76.000 ₺' },
      { title: 'Bilişim ve Yapay Zeka Hukukçusu', slug: 'bilisim-hukukcusu', roleType: 'Teknoloji Hukuku', isco: '2611', avgSalary: '96.000 ₺' },
      { title: 'Hukuk Müşaviri', slug: 'hukuk-musaviri', roleType: 'Üst Düzey Danışmanlık', isco: '2611', avgSalary: '125.000 ₺' },
      { title: 'Serbest Avukat (Büro Sahibi)', slug: 'serbest-avukat', roleType: 'Dava & Danışmanlık', isco: '2611', avgSalary: '90.000 ₺' }
    ],
    criticalSkills: ['Sözleşme Taslağı Hazırlama', 'İngilizce Hukuk Terminolojisi', 'KVKK & GDPR Uyumluluğu', 'Uyuşmazlık Çözümü', 'Ticaret Hukuku'],
    recommendedCertifications: ['Uluslararası Ticaret Hukuku (TOBB/Baro)', 'KVKK DPO Sertifikası', 'TOEFL / ILEC Hukuk İngilizcesi', 'Arabuluculuk Yetkisi'],
    careerAdvice: 'Klasik dava avukatlığı yerine Şirketler Hukuku, Uluslararası Tahkim veya Bilişim Hukukuna odaklananlar çok daha yüksek gelir çarpanına ulaşır.'
  },
  {
    id: 'major-05',
    slug: 'makine-muhendisi',
    name: 'Makine Mühendisliği',
    faculty: 'Mühendislik Fakültesi',
    overview: 'Enerji, otomotiv, savunma sanayii, havacılık ve imalat sanayiinde mekanik aksamların, motorların ve ısı transfer sistemlerinin tasarımını yapan temel mühendislik.',
    demandScore: 'Yüksek',
    startingSalary: '42.000 ₺ - 56.000 ₺',
    medianSalary: '76.000 ₺',
    topProfessions: [
      { title: 'Makine Mühendisi', slug: 'makine-muhendisi', roleType: 'Tasarım & Analiz', isco: '2144', avgSalary: '76.000 ₺' },
      { title: 'Otomotiv / Savunma Ar-Ge Mühendisi', slug: 'arge-muhendisi', roleType: 'Ar-Ge', isco: '2144', avgSalary: '92.000 ₺' },
      { title: 'Üretim & Kalite Kontrol Mühendisi', slug: 'kalite-muhendisi', roleType: 'Üretim', isco: '2141', avgSalary: '68.000 ₺' },
      { title: 'Isıtma-Soğutma (HVAC) Proje Mühendisi', slug: 'hvac-muhendisi', roleType: 'Tesisat & Proje', isco: '2144', avgSalary: '74.000 ₺' },
      { title: 'Mekanik Tasarım Uzmanı (CAD/CAM)', slug: 'mekanik-tasarim-uzmani', roleType: 'Modelleme', isco: '2144', avgSalary: '80.000 ₺' }
    ],
    criticalSkills: ['3D CAD (SolidWorks/CATIA)', 'Sonlu Elemanlar Analizi (ANSYS)', 'Termodinamik Modelleme', 'Talaşlı İmalat Bilgisi', 'Savunma Sanayii Standartları'],
    recommendedCertifications: ['CSWP (Certified SolidWorks Professional)', 'ANSYS FEA Sertifikası', 'ASME Standartları Eğitimi', 'GD&T Geometrik Boyutlandırma'],
    careerAdvice: 'Savunma sanayii ve otomotiv batarya/hibrit teknolojileri Türkiye\'de en yüksek maaş ödeyen makine istihdam alanlarıdır. ANSYS ve CATIA şarttır.'
  },
  {
    id: 'major-06',
    slug: 'iletisim-reklamcilik-ve-pazarlama',
    name: 'İletişim, Medya & Pazarlama',
    faculty: 'İletişim Fakültesi',
    overview: 'Marka iletişimi, arama motoru optimizasyonu (SEO), performans reklamcılığı, sosyal medya stratejisi ve dijital içerik yönetimini birleştiren kreatif alan.',
    demandScore: 'Yüksek',
    startingSalary: '36.000 ₺ - 48.000 ₺',
    medianSalary: '65.000 ₺',
    topProfessions: [
      { title: 'Dijital Pazarlama Uzmanı', slug: 'dijital-pazarlama-uzmani', roleType: 'Büyüme & Reklam', isco: '2431', avgSalary: '58.000 ₺' },
      { title: 'Performans Pazarlama Yöneticisi', slug: 'performans-pazarlama-yoneticisi', roleType: 'Bütçe & ROI', isco: '2431', avgSalary: '85.000 ₺' },
      { title: 'SEO & İçerik Stratejisti', slug: 'seo-uzmani', roleType: 'Organik Büyüme', isco: '2431', avgSalary: '68.000 ₺' },
      { title: 'Kurumsal İletişim Yöneticisi', slug: 'kurumsal-iletisim-yoneticisi', roleType: 'Halkla İlişkiler', isco: '2432', avgSalary: '75.000 ₺' },
      { title: 'Sosyal Medya Direktörü', slug: 'sosyal-medya-direktoru', roleType: 'Topluluk Yönetimi', isco: '2431', avgSalary: '72.000 ₺' }
    ],
    criticalSkills: ['Google Ads & Meta Ads', 'Google Analytics 4 (GA4)', 'Ahrefs / SEMrush ile SEO', 'İçerik Yazımı & Copywriting', 'Dönüşüm Optimizasyonu (CRO)'],
    recommendedCertifications: ['Google Ads Sertifikaları', 'Meta Certified Digital Marketing Associate', 'HubSpot Inbound Marketing', 'Google Analytics Individual Qualification'],
    careerAdvice: 'Düz sosyal medya paylaşımı yapanlar düşük maaş alır; bütçe yöneten, veri analizi (ROAS) yapabilen performans pazarlamacıları 3 katı kazanır.'
  },
  {
    id: 'major-07',
    slug: 'psikoloji-ve-pdr',
    name: 'Psikoloji & PDR',
    faculty: 'İnsan ve Toplum Bilimleri',
    overview: 'İnsan davranışı, bilişsel süreçler, klinik terapi, kurumsal örgüt psikolojisi ve rehberlik alanlarında çalışan insan odaklı bilim dalı.',
    demandScore: 'Dengeli',
    startingSalary: '35.000 ₺ - 50.000 ₺',
    medianSalary: '68.000 ₺',
    topProfessions: [
      { title: 'Klinik Psikolog (Terapist)', slug: 'klinik-psikolog', roleType: 'Ruh Sağlığı', isco: '2634', avgSalary: '85.000 ₺' },
      { title: 'Örgütsel Psikolog / İK Uzmanı', slug: 'insan-kaynaklari-uzmani', roleType: 'Kurumsal', isco: '2423', avgSalary: '62.000 ₺' },
      { title: 'Kullanıcı Deneyimi Araştırmacısı (UX Researcher)', slug: 'ux-researcher', roleType: 'Teknoloji', isco: '2166', avgSalary: '92.000 ₺' },
      { title: 'Okul / Eğitim Danışmanı', slug: 'okul-psikolojik-danismani', roleType: 'Eğitim', isco: '2359', avgSalary: '48.000 ₺' },
      { title: 'Yönetici & Kariyer Koçu', slug: 'kariyer-kocu', roleType: 'Profesyonel Gelişim', isco: '2423', avgSalary: '80.000 ₺' }
    ],
    criticalSkills: ['Bilişsel Davranışçı Terapi (BDT)', 'Kullanıcı Araştırması Mülakatları', 'SPSS / İstatistiksel Analiz', 'Test ve Envanter Uygulamaları', 'Aktif Dinleme & İletişim'],
    recommendedCertifications: ['BDT Klinik Sertifikası', 'MMPI Kişilik Envanteri Yetkisi', 'Nielsen Norman UX Research', 'ICF Akredite Koçluk'],
    careerAdvice: 'Klinik açmak için yüksek lisans şarttır. Teknoloji sektörüne kaymak isteyen psikologlar için "UX Researcher" pozisyonları çok yüksek maaşlı bir fırsat kapısıdır.'
  },
  {
    id: 'major-08',
    slug: 'tip-ve-saglik-bilimleri',
    name: 'Tıp & Sağlık Bilimleri',
    faculty: 'Tıp / Sağlık Bilimleri Fakültesi',
    overview: 'Koruyucu sağlık, klinik tanı, cerrahi tedavi, hasta bakımı ve ilaç sektöründe insan sağlığını korumaya adanmış yüksek nitelikli sağlık alanı.',
    demandScore: 'Çok Yüksek',
    startingSalary: '60.000 ₺ - 85.000 ₺',
    medianSalary: '115.000 ₺',
    topProfessions: [
      { title: 'Uzman Hekim / Cerrah', slug: 'uzman-hekim', roleType: 'İhtisas Sağlık', isco: '2212', avgSalary: '165.000 ₺' },
      { title: 'Pratisyen Hekim', slug: 'pratisyen-hekim', roleType: 'Birinci Basamak', isco: '2211', avgSalary: '85.000 ₺' },
      { title: 'İlaç Medikal Direktörü', slug: 'ilac-medikal-direktoru', roleType: 'İlaç Sanayii', isco: '1219', avgSalary: '145.000 ₺' },
      { title: 'Klinik Araştırma Yöneticisi', slug: 'klinik-arastirma-yoneticisi', roleType: 'Biyoteknoloji', isco: '2211', avgSalary: '98.000 ₺' },
      { title: 'Yoğun Bakım & Servis Hemşiresi', slug: 'hemsire', roleType: 'Hasta Bakımı', isco: '2221', avgSalary: '48.000 ₺' }
    ],
    criticalSkills: ['Klinik Karar Verme', 'Acil Müdahale ve Resüsitasyon', 'Hasta İletişimi ve Etik', 'Klinik Raporlama', 'İlaç Etkileşim Bilgisi'],
    recommendedCertifications: ['TUS (Tıpta Uzmanlık Sınavı)', 'İleri Yaşam Desteği (ALS/BLS)', 'GCP (İyi Klinik Uygulamaları)', 'Girişimsel Tıp Sertifikaları'],
    careerAdvice: 'Klasik hastane hekimliğinin yanı sıra küresel ilaç şirketlerinin "Medikal Danışmanlık" ve "Klinik Araştırma" rolleri çok yüksek yan haklar ve uluslararası kariyer sağlar.'
  }
];
