/**
 * Türkiye YÖK Lisans Programları ve Üniversite Fakülteleri Kataloğu
 * Kaynak: Yükseköğretim Kurulu (YÖK Atlas) Program Rehberi
 * 
 * Yayınlanmış kariyer raporları ve inceleme sırasındaki YÖK bölümleri.
 */

export interface LinkedProfession {
  title: string;
  slug: string;
  salaryMedian: string;
}

export interface DepartmentItem {
  id: string;
  name: string;
  slug: string;
  faculty: string;
  status: 'published' | 'pending';
  overview: string;
  typicalJobs: string[];
  linkedProfessions?: LinkedProfession[];
}

export interface FacultyCluster {
  facultyName: string;
  description: string;
  iconName: string;
  departments: DepartmentItem[];
}

export const ALL_FACULTY_CLUSTERS: FacultyCluster[] = [
  {
    facultyName: 'Mühendislik ve Doğa Bilimleri Fakültesi',
    description: 'Yazılım, elektrik-elektronik, makine, havacılık, endüstri ve temel mühendislik disiplinleri.',
    iconName: 'Wrench',
    departments: [
      {
        id: 'eng-01',
        name: 'Bilgisayar Mühendisliği',
        slug: 'bilgisayar-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'published',
        overview: 'Yazılım mimarisi, büyük veri sistemleri, siber altyapı ve yapay zeka mühendisliği.',
        typicalJobs: ['Yazılım Mühendisi', 'DevOps & Bulut Mühendisi', 'Siber Güvenlik Uzmanı', 'Sistem Mimarı'],
        linkedProfessions: [
          { title: 'Yazılım Mühendisi', slug: 'yazilim-muhendisi', salaryMedian: '95.000 ₺' },
          { title: 'DevOps & Bulut Mühendisi', slug: 'devops-muhendisi', salaryMedian: '110.000 ₺' },
          { title: 'Siber Güvenlik Uzmanı', slug: 'siber-guvenlik-uzmani', salaryMedian: '105.000 ₺' }
        ]
      },
      {
        id: 'eng-02',
        name: 'Yazılım Mühendisliği',
        slug: 'yazilim-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'published',
        overview: 'Geniş ölçekli kurumsal yazılım sistemleri, mobil geliştirme ve modern web teknolojileri.',
        typicalJobs: ['Frontend Geliştirici', 'Mobil Uygulama Geliştiricisi', 'Backend Geliştirici', 'Test Otomasyon Mühendisi'],
        linkedProfessions: [
          { title: 'Frontend Geliştirici', slug: 'frontend-gelistirici', salaryMedian: '82.000 ₺' },
          { title: 'Mobil Uygulama Geliştiricisi', slug: 'mobil-uygulama-gelistiricisi', salaryMedian: '88.000 ₺' },
          { title: 'Yazılım Mühendisi', slug: 'yazilim-muhendisi', salaryMedian: '95.000 ₺' }
        ]
      },
      {
        id: 'eng-03',
        name: 'Yapay Zeka ve Veri Mühendisliği',
        slug: 'yapay-zeka-ve-veri-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'published',
        overview: 'Makine öğrenmesi algoritmaları, büyük dil modelleri (LLM) ve veri ambarı mimarileri.',
        typicalJobs: ['Yapay Zeka Mühendisi', 'Veri Bilimci', 'MLOps Mühendisi', 'Veri Mimarı'],
        linkedProfessions: [
          { title: 'Yapay Zeka Mühendisi', slug: 'yapay-zeka-muhendisi', salaryMedian: '155.000 ₺' },
          { title: 'Veri Bilimci', slug: 'veri-bilimci', salaryMedian: '92.000 ₺' }
        ]
      },
      {
        id: 'eng-04',
        name: 'Elektrik-Elektronik Mühendisliği',
        slug: 'elektrik-elektronik-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'published',
        overview: 'Yüksek gerilim, gömülü sistemler, mikroçip tasarımı ve endüstriyel otomasyon.',
        typicalJobs: ['Elektrik-Elektronik Mühendisi', 'Gömülü Sistem Mühendisi', 'Otomasyon / PLC Mühendisi', 'Donanım Tasarımcısı'],
        linkedProfessions: [
          { title: 'Elektrik-Elektronik Mühendisi', slug: 'elektrik-elektronik-muhendisi', salaryMedian: '80.000 ₺' }
        ]
      },
      {
        id: 'eng-05',
        name: 'Makine Mühendisliği',
        slug: 'makine-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'published',
        overview: 'Savunma ve otomotiv sanayii mekanik parçalarının tasarımı, mukavemet ve akışkanlar analizi.',
        typicalJobs: ['Makine Mühendisi', 'Mekanik Tasarım Uzmanı', 'Sonlu Elemanlar (FEA) Analisti', 'Üretim Planlama Mühendisi'],
        linkedProfessions: [
          { title: 'Makine Mühendisi', slug: 'makine-muhendisi', salaryMedian: '76.000 ₺' }
        ]
      },
      {
        id: 'eng-06',
        name: 'Endüstri Mühendisliği',
        slug: 'endustri-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'published',
        overview: 'Üretim hatları optimizasyonu, tedarik zinciri planlaması, operasyonel mükemmellik ve ürün yönetimi.',
        typicalJobs: ['Endüstri Mühendisi', 'Ürün Yöneticisi (Product Manager)', 'Tedarik Zinciri Uzmanı', 'İş Analisti'],
        linkedProfessions: [
          { title: 'Endüstri Mühendisi', slug: 'endustri-muhendisi', salaryMedian: '84.000 ₺' },
          { title: 'Ürün Yöneticisi', slug: 'urun-yoneticisi', salaryMedian: '98.000 ₺' }
        ]
      },
      {
        id: 'eng-07',
        name: 'İnşaat Mühendisliği',
        slug: 'insaat-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'published',
        overview: 'Deprem dayanıklı statik yapı hesaplamaları, şantiye yönetimi ve büyük altyapı projeleri denetimi.',
        typicalJobs: ['İnşaat Mühendisi', 'Statik Proje Uzmanı', 'Şantiye Şefi', 'Geoteknik Mühendisi'],
        linkedProfessions: [
          { title: 'İnşaat Mühendisi', slug: 'insaat-muhendisi', salaryMedian: '70.000 ₺' }
        ]
      },
      {
        id: 'eng-08',
        name: 'Havacılık ve Uzay Mühendisliği',
        slug: 'havacilik-ve-uzay-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'İnsansız hava araçları (İHA/SİHA), uçak aerodinamiği, aviyonik sistemler ve uydu teknolojileri.',
        typicalJobs: ['İHA/SİHA Sistem Mühendisi', 'Aviyonik Tasarım Mühendisi', 'Aerodinamik Analiz Uzmanı', 'Uçuş Test Mühendisi']
      },
      {
        id: 'eng-09',
        name: 'Mekatronik Mühendisliği',
        slug: 'mekatronik-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Endüstriyel robotik kollar, PLC programlama, sensör füzyonu ve akıllı imalat hatları.',
        typicalJobs: ['Robotik Otomasyon Mühendisi', 'PLC & SCADA Yazılımcısı', 'İnsansız Sistemler Mühendisi']
      },
      {
        id: 'eng-10',
        name: 'Biyomedikal Mühendisliği',
        slug: 'biyomedikal-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'MR, BT, ultrason gibi tıbbi cihaz teknolojilerinin tasarımı, yazılımı ve klinik kalibrasyonu.',
        typicalJobs: ['Klinik Mühendisi', 'Tıbbi Cihaz Kalibrasyon Uzmanı', 'Biyomedikal AR-GE Mühendisi']
      },
      {
        id: 'eng-11',
        name: 'Kimya Mühendisliği',
        slug: 'kimya-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Petrokimya, ilaç sentezi, polimer kimyası ve endüstriyel proses optimizasyonu.',
        typicalJobs: ['Proses Mühendisi', 'Petrokimya Üretim Sorumlusu', 'Kalite Güvence ve Ruhsatlandırma Uzmanı']
      },
      {
        id: 'eng-12',
        name: 'Çevre Mühendisliği',
        slug: 'cevre-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Endüstriyel atıksu arıtımı, sürdürülebilirlik, karbon ayak izi hesaplama ve ÇED raporlaması.',
        typicalJobs: ['Sürdürülebilirlik & ESG Danışmanı', 'Çevresel Etki Değerlendirme (ÇED) Uzmanı', 'Arıtma Tesisi Şefi']
      },
      {
        id: 'eng-13',
        name: 'Gıda Mühendisliği',
        slug: 'gida-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Endüstriyel gıda üretimi, mikrobiyolojik güvenlik, raf ömrü ve ürün formülasyonu.',
        typicalJobs: ['Gıda Güvenliği ve Kalite Müdürü', 'Ürün Geliştirme (AR-GE) Şefi', 'Gıda Denetçisi']
      },
      {
        id: 'eng-14',
        name: 'Metalurji ve Malzeme Mühendisliği',
        slug: 'metalurji-ve-malzeme-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Hafif alaşımlar, kompozit malzemeler, ısıl işlem ve tahribatsız muayene testleri.',
        typicalJobs: ['Döküm ve Isıl İşlem Mühendisi', 'Kompozit Malzeme Uzmanı', 'Kalite Kontrol ve Test Mühendisi']
      },
      {
        id: 'eng-15',
        name: 'Otomotiv Mühendisliği',
        slug: 'otomotiv-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Elektrikli araç batarya sistemleri, şasi dinamiği ve otonom sürüş entegrasyonu.',
        typicalJobs: ['Batarya Sistemleri Mühendisi', 'Araç Dinamiği Uzmanı', 'Otomotiv Kalibrasyon Mühendisi']
      },
      {
        id: 'eng-16',
        name: 'Harita / Geomatik Mühendisliği',
        slug: 'harita-muhendisligi',
        faculty: 'Mühendislik ve Doğa Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Coğrafi Bilgi Sistemleri (CBS / GIS), uydu fotogrametrisi ve İHA ile haritalama.',
        typicalJobs: ['CBS / GIS Uzmanı', 'Fotogrametri ve Lidar Mühendisi', 'Kadastro ve İmar Mühendisi']
      }
    ]
  },
  {
    facultyName: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
    description: 'Şirket sermaye yönetimi, finans, bütçe, uluslararası ticaret ve yönetim bilişimi.',
    iconName: 'BadgeDollarSign',
    departments: [
      {
        id: 'iibf-01',
        name: 'Yönetim Bilişim Sistemleri (YBS)',
        slug: 'yonetim-bilisim-sistemleri',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'pending',
        overview: 'İş analizi, ERP/SAP danışmanlığı, veri tabanı yönetimi ve teknoloji şirketlerinde ürün liderliği.',
        typicalJobs: ['İş Analisti (Business Analyst)', 'SAP / ERP Danışmanı', 'IT Proje Yöneticisi', 'Veri Analisti']
      },
      {
        id: 'iibf-02',
        name: 'İşletme',
        slug: 'isletme',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'published',
        overview: 'Kurumsal yönetim, operasyon, pazarlama stratejisi ve finansal planlama.',
        typicalJobs: ['Finans Uzmanı', 'İnsan Kaynakları Uzmanı', 'Pazarlama Yöneticisi', 'Ürün Yöneticisi'],
        linkedProfessions: [
          { title: 'Finans Uzmanı', slug: 'finans-uzmani', salaryMedian: '70.000 ₺' },
          { title: 'İnsan Kaynakları Uzmanı', slug: 'insan-kaynaklari-uzmani', salaryMedian: '62.000 ₺' },
          { title: 'Ürün Yöneticisi', slug: 'urun-yoneticisi', salaryMedian: '98.000 ₺' }
        ]
      },
      {
        id: 'iibf-03',
        name: 'İktisat / Ekonomi',
        slug: 'iktisat',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'published',
        overview: 'Makroekonomik analiz, para politikaları, bankacılık ve yatırım piyasaları modellemesi.',
        typicalJobs: ['Yatırım Analisti', 'Ekonomist', 'Finansal Raporlama Uzmanı', 'Hazine Uzmanı'],
        linkedProfessions: [
          { title: 'Yatırım ve Risk Analisti', slug: 'yatirim-analisti', salaryMedian: '94.000 ₺' },
          { title: 'Finans Uzmanı', slug: 'finans-uzmani', salaryMedian: '70.000 ₺' }
        ]
      },
      {
        id: 'iibf-04',
        name: 'Maliye',
        slug: 'maliye',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'published',
        overview: 'Vergi hukuku, bütçe denetimi, kamu maliyesi ve kurumsal muhasebe yönetimi.',
        typicalJobs: ['Mali Müşavir (SMMM)', 'Veri Müfettişi', 'Finans Uzmanı', 'Bütçe Planlama Sorumlusu'],
        linkedProfessions: [
          { title: 'Mali Müşavir (SMMM)', slug: 'mali-musavir', salaryMedian: '85.000 ₺' },
          { title: 'Finans Uzmanı', slug: 'finans-uzmani', salaryMedian: '70.000 ₺' }
        ]
      },
      {
        id: 'iibf-05',
        name: 'Uluslararası Ticaret ve Lojistik',
        slug: 'uluslararasi-ticaret-ve-lojistik',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'published',
        overview: 'Küresel tedarik zinciri, gümrük mevzuatı, ihracat operasyonları ve taşımacılık yönetimi.',
        typicalJobs: ['Lojistik Yöneticisi', 'İhracat / İthalat Operasyon Uzmanı', 'Satınalma Uzmanı'],
        linkedProfessions: [
          { title: 'Tedarik Zinciri ve Lojistik Yöneticisi', slug: 'lojistik-yoneticisi', salaryMedian: '78.000 ₺' }
        ]
      },
      {
        id: 'iibf-06',
        name: 'Uluslararası İlişkiler',
        slug: 'uluslararasi-iliskiler',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'pending',
        overview: 'Dış politika analizi, çok uluslu şirketlerde kamu ilişkileri, uluslararası fonlar ve STK yönetimi.',
        typicalJobs: ['Dış Politika ve Risk Analisti', 'Kamu İlişkileri (GR) Uzmanı', 'Uluslararası Proje Koordinatörü']
      },
      {
        id: 'iibf-07',
        name: 'Siyaset Bilimi ve Kamu Yönetimi',
        slug: 'siyaset-bilimi-ve-kamu-yonetimi',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'pending',
        overview: 'İdari yargı, kaymakamlık, kamu politikaları analizi ve belediye yönetim süreçleri.',
        typicalJobs: ['İdari Yargı Hakimi', 'Mülki İdare Amiri (Kaymakam)', 'Kamu Politikaları Danışmanı']
      },
      {
        id: 'iibf-08',
        name: 'Ekonometri',
        slug: 'ekonometri',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'pending',
        overview: 'İstatistiki modelleme, zaman serisi tahminleri, kredi skorlama ve veri analitiği.',
        typicalJobs: ['Kredi Risk Analisti', 'Nicel Veri Analisti (Quant)', 'Pazar Araştırma Modelleme Uzmanı']
      },
      {
        id: 'iibf-09',
        name: 'Çalışma Ekonomisi ve Endüstri İlişkileri',
        slug: 'calisma-ekonomisi',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'published',
        overview: 'İş kanunu uygulamaları, bordro denetimi, sendikal ilişkiler ve insan kaynakları süreçleri.',
        typicalJobs: ['İnsan Kaynakları Uzmanı', 'Bordro ve Özlük İşleri Şefi', 'İş Müfettişi'],
        linkedProfessions: [
          { title: 'İnsan Kaynakları Uzmanı', slug: 'insan-kaynaklari-uzmani', salaryMedian: '62.000 ₺' }
        ]
      },
      {
        id: 'iibf-10',
        name: 'Sağlık Yönetimi',
        slug: 'saglik-yonetimi',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'pending',
        overview: 'Özel ve kamu hastanelerinde idari yönetim, sağlık turizmi operasyonları ve medikal satınalma.',
        typicalJobs: ['Hastane İdari Direktörü', 'Sağlık Turizmi Koordinatörü', 'Medikal Satınalma Sorumlusu']
      },
      {
        id: 'iibf-11',
        name: 'Havacılık Yönetimi',
        slug: 'havacilik-yonetimi',
        faculty: 'İktisadi ve İdari Bilimler / İşletme Fakültesi',
        status: 'pending',
        overview: 'Havalimanı yer hizmetleri, uçuş harekât planlaması (dispatch), havayolu gelir optimizasyonu.',
        typicalJobs: ['Uçuş Harekât Uzmanı (Dispatcher)', 'Havalimanı Operasyon Şefi', 'Havayolu Slot ve Gelir Uzmanı']
      }
    ]
  },
  {
    facultyName: 'Tıp, Diş Hekimliği ve Eczacılık Fakülteleri',
    description: 'Klinik tıp, cerrahi branşlar, ağız ve diş sağlığı ile farmasötik ilaç bilimleri.',
    iconName: 'HeartPulse',
    departments: [
      {
        id: 'health-01',
        name: 'Tıp',
        slug: 'tip',
        faculty: 'Tıp, Diş Hekimliği ve Eczacılık Fakülteleri',
        status: 'published',
        overview: 'Birinci basamak tanı ve tedavi, cerrahi müdahaleler ve ileri klinik branş uzmanlıkları.',
        typicalJobs: ['Pratisyen Hekim', 'Uzman Hekim / Cerrah', 'Klinik Araştırma Direktörü'],
        linkedProfessions: [
          { title: 'Pratisyen Hekim', slug: 'pratisyen-hekim', salaryMedian: '85.000 ₺' },
          { title: 'Uzman Hekim / Cerrah', slug: 'uzman-hekim', salaryMedian: '165.000 ₺' }
        ]
      },
      {
        id: 'health-02',
        name: 'Diş Hekimliği',
        slug: 'dis-hekimligi',
        faculty: 'Tıp, Diş Hekimliği ve Eczacılık Fakülteleri',
        status: 'published',
        overview: 'Ağız, diş ve çene cerrahisi, protetik tedavi, kanal tedavisi ve estetik diş hekimliği.',
        typicalJobs: ['Diş Hekimi', 'Ortodonti Uzmanı', 'Çene Cerrahı', 'Klinik Sahibi'],
        linkedProfessions: [
          { title: 'Diş Hekimi', slug: 'dis-hekimligi', salaryMedian: '82.000 ₺' }
        ]
      },
      {
        id: 'health-03',
        name: 'Eczacılık',
        slug: 'eczacilik',
        faculty: 'Tıp, Diş Hekimliği ve Eczacılık Fakülteleri',
        status: 'published',
        overview: 'Serbest eczane yönetimi, hastane eczacılığı ve ilaç fabrikalarında AR-GE & ruhsatlandırma.',
        typicalJobs: ['Eczacı (Serbest Eczane)', 'Klinik Araştırma Müdürü (CRA)', 'İlaç Ruhsatlandırma Uzmanı'],
        linkedProfessions: [
          { title: 'Eczacı', slug: 'eczaci', salaryMedian: '78.000 ₺' }
        ]
      }
    ]
  },
  {
    facultyName: 'Sağlık Bilimleri Fakültesi',
    description: 'Hemşirelik, rehabilitasyon, diyetetik, konuşma terapisi ve yardımcı sağlık hizmetleri.',
    iconName: 'Activity',
    departments: [
      {
        id: 'sbf-01',
        name: 'Hemşirelik',
        slug: 'hemsirelik',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'published',
        overview: 'Klinik ve yoğun bakım hasta takibi, ameliyathane süreçleri ve koruyucu sağlık hizmetleri.',
        typicalJobs: ['Yoğun Bakım Hemşiresi', 'Ameliyathane Hemşiresi', 'Sorumlu Klinik Hemşiresi'],
        linkedProfessions: [
          { title: 'Hemşire', slug: 'hemsire', salaryMedian: '48.000 ₺' }
        ]
      },
      {
        id: 'sbf-02',
        name: 'Fizyoterapi ve Rehabilitasyon',
        slug: 'fizyoterapi-ve-rehabilitasyon',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'published',
        overview: 'Ortopedik ve nörolojik rehabilitasyon, sporcu sakatlıkları tedavisi ve manuel terapi.',
        typicalJobs: ['Fizyoterapist', 'Sporcu Terapisti', 'Pediatrik Rehabilitasyon Uzmanı'],
        linkedProfessions: [
          { title: 'Fizyoterapist', slug: 'fizyoterapist', salaryMedian: '52.000 ₺' }
        ]
      },
      {
        id: 'sbf-03',
        name: 'Beslenme ve Diyetetik',
        slug: 'beslenme-ve-diyetetik',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Klinik beslenme tedavileri, sporcu performansı beslenmesi ve kurumsal menü yönetimi.',
        typicalJobs: ['Klinik Diyetisyen', 'Bariatrik Cerrahi Diyetisyeni', 'Sporcu Diyetisyeni', 'Kurumsal Beslenme Koçu']
      },
      {
        id: 'sbf-04',
        name: 'Dil ve Konuşma Terapisi',
        slug: 'dil-ve-konusma-terapisi',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Afazi, kekemelik, ses bozuklukları ve çocuklarda artikülasyon bozukluğu tedavisi.',
        typicalJobs: ['Dil ve Konuşma Terapisti', 'Ses Bozuklukları Uzmanı', 'Nörolojik Konuşma Terapisti']
      },
      {
        id: 'sbf-05',
        name: 'Odyoloji',
        slug: 'odyoloji',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'pending',
        overview: 'İşitme kayıplarının tespiti, koklear implant ayarları ve denge sistemi değerlendirmesi.',
        typicalJobs: ['Odyolog', 'İşitme Cihazı Uygulama Uzmanı', 'Vestibüler Denge Test Uzmanı']
      },
      {
        id: 'sbf-06',
        name: 'Ergoterapi (İş ve Uğraşı Terapisi)',
        slug: 'ergoterapi',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Duyu bütünleme terapisi, günlük yaşam aktiviteleri bağımsızlığı ve ergonomik danışmanlık.',
        typicalJobs: ['Ergoterapist', 'Duyu Bütünleme Uzmanı', 'Rehabilitasyon Danışmanı']
      },
      {
        id: 'sbf-07',
        name: 'Ebelik',
        slug: 'ebelik',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Normal doğum yönetimi, gebe takibi, emzirme danışmanlığı ve yenidoğan bakımı.',
        typicalJobs: ['Doğumhane Ebesi', 'Gebe Eğitim Danışmanı', 'Laktasyon (Emzirme) Koçu']
      },
      {
        id: 'sbf-08',
        name: 'Sosyal Hizmet',
        slug: 'sosyal-hizmet',
        faculty: 'Sağlık Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Sosyal hizmet merkezleri, aile danışmanlığı, adli sosyal hizmet ve dezavantajlı grup desteği.',
        typicalJobs: ['Sosyal Hizmet Uzmanı', 'Aile Mahkemesi Bilirkişisi', 'Tıbbi Sosyal Hizmet Sorumlusu']
      }
    ]
  },
  {
    facultyName: 'Hukuk Fakültesi',
    description: 'Avukatlık, savcılık, hakimlik, şirket danışmanlığı ve bilişim/KVKK hukuku.',
    iconName: 'Scale',
    departments: [
      {
        id: 'law-01',
        name: 'Hukuk',
        slug: 'hukuk',
        faculty: 'Hukuk Fakültesi',
        status: 'published',
        overview: 'Dava takibi, şirketler ve ticaret hukuku, sözleşmeler yönetimi ve regülasyon uyumu.',
        typicalJobs: ['Şirket Avukatı', 'Bilişim Hukukçusu', 'Hakim / Savcı', 'Serbest Avukat'],
        linkedProfessions: [
          { title: 'Şirket Avukatı', slug: 'kurumsal-avukat', salaryMedian: '88.000 ₺' },
          { title: 'Bilişim ve KVKK Hukukçusu', slug: 'bilisim-hukukcusu', salaryMedian: '96.000 ₺' }
        ]
      }
    ]
  },
  {
    facultyName: 'Mimarlık ve Tasarım Fakültesi',
    description: 'Bina mimarisi, iç mekan kurgusu, kentsel planlama ve endüstriyel ürün tasarımı.',
    iconName: 'Building',
    departments: [
      {
        id: 'arch-01',
        name: 'Mimarlık',
        slug: 'mimarlik',
        faculty: 'Mimarlık ve Tasarım Fakültesi',
        status: 'published',
        overview: 'Ruhsat ve uygulama projeleri, konsept mekan tasarımı, BIM modelleme ve şantiye koordinasyonu.',
        typicalJobs: ['Mimar', 'BIM Yöneticisi', 'Konsept Tasarım Uzmanı', 'Proje Koordinatörü'],
        linkedProfessions: [
          { title: 'Mimar', slug: 'mimar', salaryMedian: '68.000 ₺' }
        ]
      },
      {
        id: 'arch-02',
        name: 'İç Mimarlık ve Çevre Tasarımı',
        slug: 'ic-mimarlik-ve-cevre-tasarimi',
        faculty: 'Mimarlık ve Tasarım Fakültesi',
        status: 'pending',
        overview: 'Konut, ofis ve ticari mekan iç tasarımı, 3D görselleştirme ve mobilya detay projeleri.',
        typicalJobs: ['İç Mimar', '3D Görselleştirme (Render) Uzmanı', 'Mobilya Tasarımcısı', 'Uygulama Şefi']
      },
      {
        id: 'arch-03',
        name: 'Şehir ve Bölge Planlama',
        slug: 'sehir-ve-bolge-planlama',
        faculty: 'Mimarlık ve Tasarım Fakültesi',
        status: 'pending',
        overview: 'İmar planları, kentsel dönüşüm stratejileri, CBS kentsel veri analizleri ve ulaşım planlaması.',
        typicalJobs: ['Şehir Plancısı', 'Kentsel Dönüşüm Danışmanı', 'CBS / GIS Analisti', 'Gayrimenkul Değerleme Uzmanı']
      },
      {
        id: 'arch-04',
        name: 'Endüstriyel Tasarım',
        slug: 'endustriyel-tasarim',
        faculty: 'Mimarlık ve Tasarım Fakültesi',
        status: 'pending',
        overview: 'Beyaz eşya, elektronik cihaz ve ambalajların fiziksel ergonomisi, kalıp ve seri üretim tasarımı.',
        typicalJobs: ['Endüstriyel Ürün Tasarımcısı', 'CAD/CAM Yüzey Modelleme Uzmanı', 'Tasarım AR-GE Sorumlusu']
      },
      {
        id: 'arch-05',
        name: 'Peyzaj Mimarlığı',
        slug: 'peyzaj-mimarligi',
        faculty: 'Mimarlık ve Tasarım Fakültesi',
        status: 'pending',
        overview: 'Kamusal parklar, yeşil alan planlaması, çevre düzenlemesi ve ekolojik restorasyon projeleri.',
        typicalJobs: ['Peyzaj Mimarı', 'Kentsel Yeşil Alan Tasarımcısı', 'Peyzaj Uygulama Şefi']
      }
    ]
  },
  {
    facultyName: 'Güzel Sanatlar ve Sanat Fakülteleri',
    description: 'Dijital ürün tasarımı, oyun geliştirme, animasyon, moda ve görsel sanatlar.',
    iconName: 'Palette',
    departments: [
      {
        id: 'art-01',
        name: 'Görsel İletişim & Grafik Tasarım',
        slug: 'grafik-ve-gorsel-iletisim-tasarimi',
        faculty: 'Güzel Sanatlar ve Sanat Fakülteleri',
        status: 'published',
        overview: 'Kullanıcı arayüzü tasarımı (UI), kullanıcı deneyimi araştırmaları (UX) ve kurumsal kimlik.',
        typicalJobs: ['UI/UX Tasarımcısı', 'Ürün Tasarımcısı', 'Art Director', 'Görsel İletişim Uzmanı'],
        linkedProfessions: [
          { title: 'UI/UX Tasarımcısı', slug: 'ui-ux-tasarimci', salaryMedian: '75.000 ₺' }
        ]
      },
      {
        id: 'art-02',
        name: 'Dijital Oyun Tasarımı',
        slug: 'dijital-oyun-tasarimi',
        faculty: 'Güzel Sanatlar ve Sanat Fakülteleri',
        status: 'pending',
        overview: 'Seviye tasarımı (Level Design), oyun mekanikleri, Unity/Unreal entegrasyonu ve oyun ekonomisi.',
        typicalJobs: ['Oyun Seviye Tasarımcısı', 'Game Designer', 'Teknik Oyun Sanatçısı (Technical Artist)']
      },
      {
        id: 'art-03',
        name: 'Çizgi Film ve Animasyon',
        slug: 'cizgi-film-ve-animasyon',
        faculty: 'Güzel Sanatlar ve Sanat Fakülteleri',
        status: 'pending',
        overview: '3D modelleme, rigging, hareketli grafikler (motion design) ve film görsel efektleri (VFX).',
        typicalJobs: ['3D Animatör', 'Motion Designer', 'VFX Kompozit Uzmanı', 'Storyboard Artist']
      },
      {
        id: 'art-04',
        name: 'Moda ve Tekstil Tasarımı',
        slug: 'moda-ve-tekstil-tasarimi',
        faculty: 'Güzel Sanatlar ve Sanat Fakülteleri',
        status: 'pending',
        overview: 'Koleksiyon tasarımı, kumaş ve desen AR-GE, trend tahminleri ve konfeksiyon prototipleri.',
        typicalJobs: ['Moda Tasarımcısı', 'Koleksiyon Koordinatörü', 'Tekstil Desinatörü']
      }
    ]
  },
  {
    facultyName: 'İletişim Fakültesi',
    description: 'Dijital pazarlama, performans reklamcılığı, halkla ilişkiler, sinema ve yeni medya.',
    iconName: 'Megaphone',
    departments: [
      {
        id: 'com-01',
        name: 'Halkla İlişkiler ve Tanıtım',
        slug: 'halkla-iliskiler-ve-tanitim',
        faculty: 'İletişim Fakültesi',
        status: 'published',
        overview: 'Kurumsal itibar yönetimi, basın ilişkileri, etkinlik yönetimi ve dijital büyüme.',
        typicalJobs: ['Dijital Pazarlama Uzmanı', 'Kurumsal İletişim Müdürü', 'Marka Stratejisti'],
        linkedProfessions: [
          { title: 'Dijital Pazarlama Uzmanı', slug: 'dijital-pazarlama-uzmani', salaryMedian: '58.000 ₺' }
        ]
      },
      {
        id: 'com-02',
        name: 'Yeni Medya ve İletişim',
        slug: 'yeni-medya-ve-iletisim',
        faculty: 'İletişim Fakültesi',
        status: 'published',
        overview: 'Sosyal medya stratejisi, performans reklamcılığı, SEO ve içerik optimizasyonu.',
        typicalJobs: ['Performans Pazarlama Yöneticisi', 'SEO Uzmanı', 'Dijital İçerik Üreticisi'],
        linkedProfessions: [
          { title: 'Performans Pazarlama Yöneticisi', slug: 'performans-pazarlama-yoneticisi', salaryMedian: '85.000 ₺' },
          { title: 'SEO Uzmanı', slug: 'seo-uzmani', salaryMedian: '68.000 ₺' }
        ]
      },
      {
        id: 'com-03',
        name: 'Radyo, Televizyon ve Sinema (RTS)',
        slug: 'radyo-televizyon-ve-sinema',
        faculty: 'İletişim Fakültesi',
        status: 'pending',
        overview: 'Video kurgu, renk düzenleme (Color Grading), canlı yayın rejisi ve belgesel yapımı.',
        typicalJobs: ['Video Prodüksiyon Uzmanı', 'Kurgu Yönetmeni (Editor)', 'Görüntü Yönetmeni', 'Yayın Rejisi']
      },
      {
        id: 'com-04',
        name: 'Gazetecilik',
        slug: 'gazetecilik',
        faculty: 'İletişim Fakültesi',
        status: 'pending',
        overview: 'Dijital haber merkezleri, veri gazeteciliği, araştırmacı muhabirlik ve haber bülteni editörlüğü.',
        typicalJobs: ['Dijital Haber Editörü', 'Veri Gazetecisi', 'Araştırmacı Muhabir', 'Podcast Yapımcısı']
      }
    ]
  },
  {
    facultyName: 'Eğitim Fakültesi',
    description: 'Alan öğretmenlikleri, psikolojik danışmanlık, özel eğitim ve eğitim teknolojileri.',
    iconName: 'GraduationCap',
    departments: [
      {
        id: 'edu-01',
        name: 'Rehberlik ve Psikolojik Danışmanlık (PDR)',
        slug: 'rehberlik-ve-psikolojik-danismanlik',
        faculty: 'Eğitim Fakültesi',
        status: 'published',
        overview: 'Okul psikolojik danışmanlığı, kariyer rehberliği ve kurumsal yetenek değerlendirme.',
        typicalJobs: ['Okul Psikolojik Danışmanı', 'İnsan Kaynakları Uzmanı', 'Kariyer Koçu'],
        linkedProfessions: [
          { title: 'İnsan Kaynakları Uzmanı', slug: 'insan-kaynaklari-uzmani', salaryMedian: '62.000 ₺' },
          { title: 'Klinik Psikolog', slug: 'klinik-psikolog', salaryMedian: '85.000 ₺' }
        ]
      },
      {
        id: 'edu-02',
        name: 'Özel Eğitim Öğretmenliği',
        slug: 'ozel-egitim-ogretmenligi',
        faculty: 'Eğitim Fakültesi',
        status: 'pending',
        overview: 'Otizm, öğrenme güçlüğü ve zihinsel yetersizliği olan bireyler için bireyselleştirilmiş eğitim planı.',
        typicalJobs: ['Özel Eğitim Öğretmeni', 'Bireysel Gelişim Terapisti', 'RAM Değerlendirme Uzmanı']
      },
      {
        id: 'edu-03',
        name: 'İngilizce Öğretmenliği',
        slug: 'ingilizce-ogretmenligi',
        faculty: 'Eğitim Fakültesi',
        status: 'pending',
        overview: 'Yabancı dil öğretim yöntemleri, kurumsal dil koçluğu ve uluslararası sınav hazırlığı.',
        typicalJobs: ['İngilizce Öğretmeni', 'Kurumsal Dil Danışmanı', 'Eğitim İçerik Yazarı']
      },
      {
        id: 'edu-04',
        name: 'İlköğretim Matematik Öğretmenliği',
        slug: 'ilkogretim-matematik-ogretmenligi',
        faculty: 'Eğitim Fakültesi',
        status: 'pending',
        overview: 'Matematiksel kavram gelişimi, STEM müfredat koordinasyonu ve soru hazırlama yazarlığı.',
        typicalJobs: ['Matematik Öğretmeni', 'STEM Koordinatörü', 'Yayın Editörü ve Soru Yazarı']
      },
      {
        id: 'edu-05',
        name: 'Bilgisayar ve Öğretim Teknolojileri (BÖTE)',
        slug: 'bilgisayar-ve-ogretim-teknolojileri',
        faculty: 'Eğitim Fakültesi',
        status: 'pending',
        overview: 'LMS sistemleri yönetimi, dijital eğitim içerik geliştirme ve robotik kodlama eğitmenliği.',
        typicalJobs: ['Eğitim Teknoloğu (Instructional Designer)', 'E-Öğrenme Uzmanı', 'Robotik Kodlama Eğitmeni']
      },
      {
        id: 'edu-06',
        name: 'Okul Öncesi Öğretmenliği',
        slug: 'okul-oncesi-ogretmenligi',
        faculty: 'Eğitim Fakültesi',
        status: 'pending',
        overview: 'Erken çocukluk bilişsel ve duygusal gelişimi, anaokulu yönetimi ve oyun temelli öğrenme.',
        typicalJobs: ['Okul Öncesi Öğretmeni', 'Anaokulu Yöneticisi', 'Çocuk Gelişim Danışmanı']
      }
    ]
  },
  {
    facultyName: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
    description: 'Psikoloji, istatistik, moleküler biyoloji, temel fen bilimleri ve edebiyat disiplinleri.',
    iconName: 'BookOpen',
    departments: [
      {
        id: 'sci-01',
        name: 'Psikoloji',
        slug: 'psikoloji',
        faculty: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
        status: 'published',
        overview: 'Bireysel ve kurumsal psikoterapi (BDT ekolü), klinik değerlendirme ve yetenek yönetimi.',
        typicalJobs: ['Klinik Psikolog (Terapist)', 'İnsan Kaynakları Uzmanı', 'Kullanıcı Araştırmacısı (UX Researcher)'],
        linkedProfessions: [
          { title: 'Klinik Psikolog', slug: 'klinik-psikolog', salaryMedian: '85.000 ₺' },
          { title: 'İnsan Kaynakları Uzmanı', slug: 'insan-kaynaklari-uzmani', salaryMedian: '62.000 ₺' }
        ]
      },
      {
        id: 'sci-02',
        name: 'İstatistik',
        slug: 'istatistik',
        faculty: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
        status: 'published',
        overview: 'Veri madenciliği, hipotez testleri, A/B testi optimizasyonu ve makine öğrenmesi veri analitiği.',
        typicalJobs: ['Veri Bilimci', 'Yatırım Analisti', 'Risk Modelleme Uzmanı'],
        linkedProfessions: [
          { title: 'Veri Bilimci', slug: 'veri-bilimci', salaryMedian: '92.000 ₺' },
          { title: 'Yatırım ve Risk Analisti', slug: 'yatirim-analisti', salaryMedian: '94.000 ₺' }
        ]
      },
      {
        id: 'sci-03',
        name: 'Matematik',
        slug: 'matematik',
        faculty: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
        status: 'published',
        overview: 'Kriptografi, algoritmik modelleme, nicel finans ve yazılım mimarisi.',
        typicalJobs: ['Yazılım Mühendisi', 'Kriptografi & Veri Uzmanı', 'Nicel Analist'],
        linkedProfessions: [
          { title: 'Yazılım Mühendisi', slug: 'yazilim-muhendisi', salaryMedian: '95.000 ₺' },
          { title: 'Veri Bilimci', slug: 'veri-bilimci', salaryMedian: '92.000 ₺' }
        ]
      },
      {
        id: 'sci-04',
        name: 'Moleküler Biyoloji ve Genetik (MBG)',
        slug: 'molekuler-biyoloji-ve-genetik',
        faculty: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
        status: 'pending',
        overview: 'DNA sekanslama, gen düzenleme (CRISPR), kanser biyolojisi araştırmaları ve biyoinformatik.',
        typicalJobs: ['Biyoinformatik Uzmanı', 'Genetik Tanı Laboratuvar Sorumlusu', 'AR-GE Araştırmacısı']
      },
      {
        id: 'sci-05',
        name: 'Sosyoloji',
        slug: 'sosyoloji',
        faculty: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
        status: 'pending',
        overview: 'Kamuoyu ve pazar araştırmaları, tüketici davranış modelleri, STK saha yöneticiliği.',
        typicalJobs: ['Kamuoyu ve Pazar Araştırma Uzmanı', 'Tüketici İçgörü (Consumer Insights) Analisti', 'Saha Koordinatörü']
      },
      {
        id: 'sci-06',
        name: 'Mütercim ve Tercümanlık (İngilizce)',
        slug: 'mutercim-tercumanlik',
        faculty: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
        status: 'pending',
        overview: 'Simültane ve ardıl çeviri, yazılım lokalizasyonu, teknik ve hukuki metin çevirmenliği.',
        typicalJobs: ['Simültane Konferans Çevirmeni', 'Yazılım Lokalizasyon Uzmanı', 'Hukuki & Medikal Tercüman']
      },
      {
        id: 'sci-07',
        name: 'Kimya',
        slug: 'kimya',
        faculty: 'Fen ve Edebiyat Fakültesi (İnsani Bilimler)',
        status: 'pending',
        overview: 'Kromatografi (HPLC/GC), spektroskopi, kozmetik ve ilaç kalite kontrol analizleri.',
        typicalJobs: ['Kalite Kontrol Kimyageri', 'AR-GE Formülasyon Uzmanı', 'Laboratuvar Şefi']
      }
    ]
  },
  {
    facultyName: 'Havacılık ve Denizcilik Fakülteleri',
    description: 'Ticari pilotluk, hava aracı bakımı, uzakyol gemi kaptanlığı ve deniz işletmeciliği.',
    iconName: 'Compass',
    departments: [
      {
        id: 'aero-01',
        name: 'Pilotaj (Uçak Pilotajı)',
        slug: 'pilotaj',
        faculty: 'Havacılık ve Denizcilik Fakülteleri',
        status: 'pending',
        overview: 'Ticari havayolu uçuş operasyonları, aletli uçuş (IFR) ve çok motorlu uçak seyrüseferi.',
        typicalJobs: ['İkinci Pilot (First Officer)', 'Kaptan Pilot', 'Uçuş Öğretmeni (CFI)']
      },
      {
        id: 'aero-02',
        name: 'Uçak Gövde ve Motor Bakımı',
        slug: 'ucak-govde-motor-bakimi',
        faculty: 'Havacılık ve Denizcilik Fakülteleri',
        status: 'pending',
        overview: 'SHY/EASA lisanslı uçak hat ve üs bakımı, jet motoru revizyonu ve aviyonik testler.',
        typicalJobs: ['B1/B2 Lisanslı Uçak Bakım Teknisyeni', 'Hangar Bakım Şefi', 'Hava Aracı Kalite Müfettişi']
      },
      {
        id: 'mar-01',
        name: 'Deniz Ulaştırma İşletme Mühendisliği (Kaptanlık)',
        slug: 'deniz-ulastirma-isletme-muhendisligi',
        faculty: 'Havacılık ve Denizcilik Fakülteleri',
        status: 'pending',
        overview: 'Uluslararası sularda ticaret gemisi seyrüseferi, liman yükleme operasyonları ve köprüüstü yönetimi.',
        typicalJobs: ['Uzakyol Vardiya Zabiti', 'Uzakyol Kaptanı', 'Liman Operasyon Müdürü']
      },
      {
        id: 'mar-02',
        name: 'Gemi Makineleri İşletme Mühendisliği',
        slug: 'gemi-makineleri-isletme-muhendisligi',
        faculty: 'Havacılık ve Denizcilik Fakülteleri',
        status: 'pending',
        overview: 'Gemi dizel ana makineleri, kazan daireleri, yardımcı sistemler ve tersane revizyonları.',
        typicalJobs: ['Uzakyol Vardiya Mühendisi', 'Uzakyol Başmühendisi', 'Tersane Bakım-Onarım Şefi']
      }
    ]
  },
  {
    facultyName: 'Veteriner Fakültesi',
    description: 'Klinik veteriner hekimliği, cerrahi branşlar, çiftlik sağlığı ve gıda güvenliği.',
    iconName: 'ShieldCheck',
    departments: [
      {
        id: 'vet-01',
        name: 'Veteriner Hekimliği',
        slug: 'veteriner-hekimligi',
        faculty: 'Veteriner Fakültesi',
        status: 'pending',
        overview: 'Küçükbaş, büyükbaş ve pet hayvanları teşhis/tedavisi, veteriner cerrahi ve zoonoz denetimi.',
        typicalJobs: ['Klinik Veteriner Hekimi', 'Çiftlik Hayvanları Hekimi', 'Gıda Güvenliği Denetçisi', 'İlaç Medikal Danışmanı']
      }
    ]
  },
  {
    facultyName: 'Ziraat Fakültesi',
    description: 'Bitki koruma, tarla ve bahçe bitkileri, akıllı tarım teknolojileri ve zootekni.',
    iconName: 'Sprout',
    departments: [
      {
        id: 'agr-01',
        name: 'Ziraat Mühendisliği (Bitki Koruma / Tarla Bitkileri)',
        slug: 'ziraat-muhendisligi',
        faculty: 'Ziraat Fakültesi',
        status: 'pending',
        overview: 'Tohum ıslahı, zirai ilaçlama protokolleri, modern sera yönetimi ve akıllı sulama sistemleri.',
        typicalJobs: ['Ziraat Mühendisi', 'Tohum & Gübre AR-GE Uzmanı', 'Akıllı Tarım & Sera Yöneticisi', 'TARSİM Eksperi']
      },
      {
        id: 'agr-02',
        name: 'Bahçe Bitkileri',
        slug: 'bahce-bitkileri',
        faculty: 'Ziraat Fakültesi',
        status: 'pending',
        overview: 'Meyve, sebze ve bağ yetiştiriciliği, modern fidanlık işletmeciliği ve hasat sonrası fizyolojisi.',
        typicalJobs: ['Bahçe Bitkileri Uzmanı', 'Fidanlık Yöneticisi', 'Kontrollü Örtüaltı Üretim Şefi']
      },
      {
        id: 'agr-03',
        name: 'Zootekni',
        slug: 'zootekni',
        faculty: 'Ziraat Fakültesi',
        status: 'pending',
        overview: 'Büyükbaş ve kanatlı hayvan besleme, yem rasyon optimizasyonu ve damızlık genetik ıslahı.',
        typicalJobs: ['Zooteknist', 'Yem Fabrikası Rasyon Uzmanı', 'Büyük Çiftlik İşletme Müdürü']
      }
    ]
  },
  {
    facultyName: 'Turizm ve Gastronomi Fakültesi',
    description: 'Mutfak sanatları, profesyonel aşçılık, otel gelir yönetimi ve turist rehberliği.',
    iconName: 'Utensils',
    departments: [
      {
        id: 'tour-01',
        name: 'Gastronomi ve Mutfak Sanatları',
        slug: 'gastronomi-ve-mutfak-sanatlari',
        faculty: 'Turizm ve Gastronomi Fakültesi',
        status: 'pending',
        overview: 'Fine dining mutfak yönetimi, menü reçetelendirme, tabak tasarımı ve gıda maliyet analizi.',
        typicalJobs: ['Executive Chef (Mutfak Şefi)', 'AR-GE Menü Danışmanı', 'Sous Chef', 'Gıda Stilisti']
      },
      {
        id: 'tour-02',
        name: 'Turizm İşletmeciliği',
        slug: 'turizm-isletmeciligi',
        faculty: 'Turizm ve Gastronomi Fakültesi',
        status: 'pending',
        overview: '5 yıldızlı otel operasyonları, gelir yönetimi (Revenue Management) ve rezervasyon sistemleri.',
        typicalJobs: ['Otel Genel Müdürü', 'Gelir Yönetimi (Revenue) Uzmanı', 'Ön Büro Direktörü']
      },
      {
        id: 'tour-03',
        name: 'Turizm Rehberliği',
        slug: 'turizm-rehberligi',
        faculty: 'Turizm ve Gastronomi Fakültesi',
        status: 'pending',
        overview: 'Kültür ve doğa turları yönetimi, kokartlı rehberlik, arkeolojik gezi anlatımı ve acente operasyonu.',
        typicalJobs: ['Kokartlı Turist Rehberi', 'Kültür Turları Lideri', 'VIP Seyahat Danışmanı']
      }
    ]
  },
  {
    facultyName: 'Spor Bilimleri Fakültesi',
    description: 'Profesyonel antrenörlük, atletik performans, beden eğitimi ve spor kulübü yönetimi.',
    iconName: 'Trophy',
    departments: [
      {
        id: 'sport-01',
        name: 'Antrenörlük Eğitimi',
        slug: 'antrenorluk-egitimi',
        faculty: 'Spor Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Branş antrenörlüğü (futbol, basketbol, yüzme vb.), biyomekanik ve atletik performans testi.',
        typicalJobs: ['Kulüp Antrenörü', 'Atletik Performans ve Kondisyon Koçu', 'Bireysel Performans Danışmanı']
      },
      {
        id: 'sport-02',
        name: 'Beden Eğitimi ve Spor Öğretmenliği',
        slug: 'beden-egitimi-ogretmenligi',
        faculty: 'Spor Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Okul spor takımları koordinasyonu, temel motorik beceri eğitimi ve spor organizasyonları.',
        typicalJobs: ['Beden Eğitimi Öğretmeni', 'Okul Sporları Koordinatörü', 'GSB Antrenörü']
      },
      {
        id: 'sport-03',
        name: 'Spor Yöneticiliği',
        slug: 'spor-yoneticiligi',
        faculty: 'Spor Bilimleri Fakültesi',
        status: 'pending',
        overview: 'Spor kulübü tesis işletmesi, sponsorluk anlaşmaları, biletleme ve sporcu menajerliği.',
        typicalJobs: ['Spor Kulübü Tesis Müdürü', 'Spor Pazarlaması Uzmanı', 'Etkinlik ve Turnuva Yöneticisi']
      }
    ]
  },
  {
    facultyName: 'İlahiyat ve İslami İlimler Fakültesi',
    description: 'Din bilimleri, felsefe ve din bilimleri, İslam tarihi ve pedagojik din eğitimi.',
    iconName: 'Book',
    departments: [
      {
        id: 'theol-01',
        name: 'İlahiyat / İslami İlimler',
        slug: 'ilahiyat',
        faculty: 'İlahiyat ve İslami İlimler Fakültesi',
        status: 'pending',
        overview: 'Din kültürü ve ahlak bilgisi eğitimi, Arapça metin analizi, din sosyolojisi ve vaizlik.',
        typicalJobs: ['Din Kültürü ve Ahlak Bilgisi Öğretmeni', 'Diyanet Vaiz / Uzman', 'Akademik Araştırmacı']
      }
    ]
  }
];

export function getAllDepartments(): DepartmentItem[] {
  return ALL_FACULTY_CLUSTERS.flatMap(f => f.departments);
}

export function getDepartmentBySlug(slug: string): DepartmentItem | undefined {
  return getAllDepartments().find(d => d.slug === slug);
}
