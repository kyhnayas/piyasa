/**
 * Detaylı Mesleki Görev Tanımları, Teknolojiler, Günlük Rutinler,
 * Yasal İmza Yetkileri, Meslek Odası Kayıtları ve Özgün Mülakat Soruları Sözlüğü
 */

export interface InterviewQuestion {
  question: string;
  category: 'Teknik / Mesleki' | 'Davranışsal / İK' | 'Vaka & Kriz Çözümü';
  tip: string;
}

export interface LegalRequirement {
  isRegulated: boolean;
  lawName?: string;
  chamber?: string;
  requiredDegree: string;
  licenseOrRegistry?: string;
  summaryText: string;
}

export interface DetailedRoleInfo {
  tasks: string[];
  toolsAndTech: string[];
  dailyRoutine: string;
  education: string[];
  skills: string[];
  certifications: { name: string; issuer: string }[];
  legalRequirement?: LegalRequirement;
  interviewQuestions?: InterviewQuestion[];
}

export type DetailedRoleInfoWithQuestions = DetailedRoleInfo & {
  interviewQuestions: InterviewQuestion[];
};

export const DETAILED_PROFESSION_PROFILES: Record<string, DetailedRoleInfo> = {
  // =========================================================================
  // 1. MAKİNE MÜHENDİSLİĞİ
  // =========================================================================
  'makine-muhendisi': {
    tasks: [
      'Mekanik sistemlerin, parçaların ve makinelerin 3 boyutlu bilgisayar destekli tasarımlarını (CAD) yapmak ve imalat çizimlerini hazırlamak.',
      'Sonlu Elemanlar Analizi (FEA) ve Hesaplamalı Akışkanlar Dinamiği (CFD) ile statik gerilme, yorulma, titreşim ve ısı transferi simülasyonları yürütmek.',
      'Talaşlı imalat, döküm, sac şekillendirme ve kaynak süreçleri için teknik imalat toleranslarını (GD&T) belirlemek.',
      'Üretim hattında prototip testlerini denetlemek, kalite sapmalarını tespit edip tasarım iyileştirmelerini gerçekleştirmek.',
      'Makinelerin montaj talimatlarını, bakım prosedürlerini ve CE/TSE uygunluk teknik dosyalarını hazırlamak.'
    ],
    toolsAndTech: ['SolidWorks / CATIA / Siemens NX', 'ANSYS Mechanical / Fluent', 'AutoCAD', 'SAP Üretim Modülü (PP)', '3D Ölçüm & CMM', 'HyperMesh'],
    dailyRoutine: 'Güne CAD model revizyonları ve ANSYS gerilme/akışkanlar analizlerinin incelenmesiyle başlar; öğleden sonra talaşlı imalat ve prototip montaj hattında ölçüm ve tolerans kontrolleri yapar, tedarikçi teknik şartname toplantılarını koordine eder.',
    education: ['Makine Mühendisliği (Lisans)', 'Mekatronik Mühendisliği', 'İmalat Mühendisliği'],
    skills: ['3D CAD Modelleme', 'Sonlu Elemanlar Analizi (FEA)', 'Mukavemet & Malzeme Bilgisi', 'İmalat Yöntemleri & Kalıpçılık', 'Geometrik Boyutlandırma ve Toleranslandırma (GD&T)'],
    certifications: [
      { name: 'TMMOB MMO Serbest Müşavir Mühendis (SMM) Belgesi', issuer: 'TMMOB Makine Mühendisleri Odası' },
      { name: 'CSWP (Certified SolidWorks Professional)', issuer: 'Dassault Systèmes' },
      { name: 'ANSYS FEA Specialist Akreditasyonu', issuer: 'ANSYS' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '3458 Sayılı Mühendislik ve Mimarlık Hakkında Kanun',
      chamber: 'TMMOB Makine Mühendisleri Odası (MMO)',
      requiredDegree: 'YÖK Onaylı 4 Yıllık Makine Mühendisliği Lisans Diploması',
      licenseOrRegistry: 'MMO Sicil Kaydı & SMM İmza Yetkisi',
      summaryText: 'Türkiye Cumhuriyeti kanunlarına göre makine mühendisi unvanı kullanmak ve mekanik tesisat, şantiye şefliği, asansör periyodik kontrolü veya proje imza yetkisine sahip olmak için Makine Mühendisliği lisans diploması ve TMMOB Makine Mühendisleri Odası (MMO) kaydı zorunludur.'
    },
    interviewQuestions: [
      {
        question: 'Tasarladığınız mekanik bir parçada ANSYS FEA analizinde kritik gerilme yoğunlaşması (stress concentration) çıkarsa nasıl bir optimizasyon yolu izlersiniz?',
        category: 'Teknik / Mesleki',
        tip: 'Radyus büyütme, çentik etkisini giderme, yerel et kalınlığı optimizasyonu, malzeme akma sınırı kontrolü ve mesh yakınsama (convergence) testlerini somut bir örnekle açıklayın.'
      },
      {
        question: 'Talaşlı imalatta veya sac şekillendirmede parçanın tolerans zinciri (GD&T) sapması durumunda üretim operatörü ve kalite birimiyle süreci nasıl çözersiniz?',
        category: 'Vaka & Kriz Çözümü',
        tip: 'CMM 3D koordinat ölçüm raporu analizi, fikstür aşınması, kesici takım aşınması ve ISO 2768/ISO 1101 standartlarına referans vererek tolerans zinciri hesaplamasını anlatın.'
      },
      {
        question: 'Şantiye veya fabrika sahasında acil teslimat baskısı altında iş güvenliği (İSG) standartlarıyla üretim temposu çeliştiğinde tavrınız ne olur?',
        category: 'Davranışsal / İK',
        tip: '6331 sayılı İSG Kanunu ve mühendislik etik sorumluluğunuzu temel alarak, durdurma yetkisi ve önleyici alternatif çözümleri dengeleyin.'
      }
    ]
  },

  // =========================================================================
  // 2. İNŞAAT MÜHENDİSLİĞİ
  // =========================================================================
  'insaat-muhendisi': {
    tasks: [
      'Betonarme, çelik ve prefabrik yapıların Türkiye Bina Deprem Yönetmeliği (TBDY-2018) standartlarına göre statik hesap ve analizlerini yapmak.',
      'Şantiye sahasında demir donatı, kalıp, beton dökümü ve kırım dayanım testlerinin projeye uygunluğunu denetlemek.',
      'Zemin etüt raporlarını inceleyerek geoteknik hesaplamalar (kazık, radye temel, istinat duvarı) gerçekleştirmek.',
      'Hakediş, metraj, pursantaj ve kesin hesap tablolarını hazırlayarak alt yüklenici ve idare süreçlerini yönetmek.',
      'İş güvenliği ve yapı denetim mevzuatına tam uyum sağlayarak resmi şantiye kayıtlarını tutmak.'
    ],
    toolsAndTech: ['ideCAD / Sta4CAD / SAP2000', 'AutoCAD / Revit (BIM)', 'ETABS & SAFE', 'MS Project / Primavera P6', 'Microsoft Excel (Metraj)'],
    dailyRoutine: 'Sabah erken saatlerde şantiye saha turu (demir donatı ve kalıp kontrolleri), beton döküm denetimi ve karot numuneleri takibi; öğleden sonra statik hesap modellerinin (ideCAD/sta4cad) revizyonu ve yapı denetim heyetiyle koordinasyon.',
    education: ['İnşaat Mühendisliği (Lisans)'],
    skills: ['Deprem Dayanıklı Yapı Tasarımı', 'Statik & Dinamik Analiz', 'Şantiye Yönetimi & Metraj', 'Geoteknik & Zemin Mekaniği', 'Hakediş & Sözleşme Yönetimi'],
    certifications: [
      { name: 'TMMOB İMO Serbest İnşaat Mühendisi (SIM) Tescil Belgesi', issuer: 'TMMOB İnşaat Mühendisleri Odası' },
      { name: 'Şantiye Şefliği Yetki Belgesi', issuer: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı' },
      { name: 'Yapı Denetim Denetçi Belgesi', issuer: 'Yapı Denetim Komisyonu' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '3458 Sayılı Mühendislik ve Mimarlık Hakkında Kanun & 4708 Sayılı Yapı Denetimi Hakkında Kanun',
      chamber: 'TMMOB İnşaat Mühendisleri Odası (İMO)',
      requiredDegree: 'YÖK Onaylı 4 Yıllık İnşaat Mühendisliği Lisans Diploması',
      licenseOrRegistry: 'İMO Sicil Kaydı & Statik Proje / Şantiye Şefliği İmza Yetkisi',
      summaryText: 'Statik proje hazırlama, ruhsat imza yetkisi, fenni mesuliyet ve şantiye şefliği üstlenebilmek için İnşaat Mühendisliği lisans diploması ve TMMOB İnşaat Mühendisleri Odası (İMO) kaydı yasal şarttır.'
    },
    interviewQuestions: [
      {
        question: 'TBDY-2018 kapsamında zemin etüt raporunda sıvılaşma riski tespit edilen yüksek katlı bir konut projesinde temel sistemini nasıl tasarlarsınız?',
        category: 'Teknik / Mesleki',
        tip: 'Zemin iyileştirme metotları (jet-grouting, derin karıştırma), fore kazık tasarımı, radye temel kalınlığı ve üst yapı-temel ortak rijitlik modellemesini etraflıca aktarın.'
      },
      {
        question: 'Şantiyede dökülen taze betonda 28 günlük kırım basınç dayanımı sonuçları proje sınıfının (örneğin C30/37) altında kalırsa uygulayacağınız resmi prosedür nedir?',
        category: 'Vaka & Kriz Çözümü',
        tip: 'Karot alımı (TS EN 12504-1), tahribatsız testler (Schmidt çekici, ultrasonik), yapı denetim ve idareye resmi bildirim, statik güçlendirme hesabı ve 4708 sayılı Kanun sorumluluklarını belirtin.'
      },
      {
        question: 'Taşeron ekiplerin metraj ve pursantaj hakediş talepleriyle sahadaki fiili ilerleme uyuşmadığında krizi nasıl yönetirsiniz?',
        category: 'Davranışsal / İK',
        tip: 'Ataşman kayıtları, şantiye günlük defteri, sözleşme birim fiyatları ve objektif ölçüm verileriyle adil dengeyi kurduğunuzu örnekleyin.'
      }
    ]
  },

  // =========================================================================
  // 3. ELEKTRİK-ELEKTRONİK MÜHENDİSLİĞİ
  // =========================================================================
  'elektrik-elektronik-muhendisi': {
    tasks: [
      'Alçak Gerilim (AG) ve Yüksek Gerilim (YG) dağıtım panoları, trafo merkezleri ve kompanzasyon sistemlerini projelendirmek.',
      'Fabrika ve tesislerde PLC (Siemens S7-1200/1500), SCADA ve otomasyon panolarının yazılım ve donanım entegrasyonunu sağlamak.',
      'Gömülü sistemler için mikrodenetleyici (ARM, STM32, ESP32) devre kartı (PCB) tasarımı ve C/C++ firmware kodlaması yapmak.',
      'Endüstriyel tesislerin topraklama, paratoner ve aydınlatma hesaplarını EMO standartlarına göre gerçekleştirmek.',
      'Elektriksel güvenlik, harmonik ölçümleri ve periyodik trafo işletme sorumluluğu denetimlerini yürütmek.'
    ],
    toolsAndTech: ['Altium Designer / KiCAD', 'EPLAN Electric P8 / AutoCAD Electrical', 'TIA Portal (Siemens PLC)', 'MATLAB / Simulink', 'Fluke Ölçüm Cihazları'],
    dailyRoutine: 'Sabah trafo ve kompanzasyon pano verilerinin analizi, EPLAN üzerinde tek hat şemalarının güncellenmesi; öğleden sonra otomasyon sahasında PLC kod devreye alma veya PCB tasarım prototip testleri.',
    education: ['Elektrik-Elektronik Mühendisliği (Lisans)', 'Elektrik Mühendisliği'],
    skills: ['AG / YG Tesisatı & Trafo İşletmesi', 'PLC & SCADA Otomasyonu', 'PCB Tasarımı & Donanım Geliştirme', 'Kompanzasyon & Harmonik Filtreleme', 'Gömülü Yazılım (C/C++)'],
    certifications: [
      { name: 'TMMOB EMO SMM (1 kV Altı ve 1 kV Üstü Tesisler) Belgesi', issuer: 'TMMOB Elektrik Mühendisleri Odası' },
      { name: 'YG Tesislerinde İşletme Sorumluluğu Belgesi', issuer: 'TMMOB EMO' },
      { name: 'Siemens Certified PLC Developer', issuer: 'Siemens SITRAIN' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '3458 Sayılı Mühendislik ve Mimarlık Kanunu & Elektrik Kuvvetli Akım Tesisleri Yönetmeliği',
      chamber: 'TMMOB Elektrik Mühendisleri Odası (EMO)',
      requiredDegree: 'YÖK Onaylı 4 Yıllık Elektrik veya Elektrik-Elektronik Mühendisliği Lisans Diploması',
      licenseOrRegistry: 'EMO Sicil Kaydı & 1kV Altı / 1kV Üstü SMM ve Trafo İşletme Sorumluluğu',
      summaryText: 'Elektrik projelerine imza atabilmek, şantiye veya fabrika yüksek gerilim trafo işletme sorumluluğunu üstlenebilmek için Elektrik / Elektrik-Elektronik Mühendisliği lisans diploması ve EMO tescili zorunludur.'
    },
    interviewQuestions: [
      {
        question: 'Büyük ölçekli bir endüstriyel tesiste reaktif güç cezası (indüktif/kapasitif) riski doğduğunda ve hatta yüksek harmonikler varken kompanzasyon panosunu nasıl projelendirirsiniz?',
        category: 'Teknik / Mesleki',
        tip: 'Tristörlü dinamik kompanzasyon, pasif/aktif harmonik filtre seçimi, harmonik analizör ölçümleri ve rezonans riskini önleme adımlarını anlatın.'
      },
      {
        question: 'Endüstriyel bir otomasyon hattında haberleşme (Profinet/Modbus) kopması nedeniyle hat durursa kök nedeni aramak için hangi adımları izlersiniz?',
        category: 'Vaka & Kriz Çözümü',
        tip: 'Topraklama ve kablo ekranlama kontrolleri, ağ switch teşhis logları, IP/çakışma kontrolü ve PLC tampon bellek analizi süreçlerini aktarın.'
      }
    ]
  },

  // =========================================================================
  // 4. ŞİRKET / KURUMSAL AVUKAT
  // =========================================================================
  'kurumsal-avukat': {
    tasks: [
      'Şirketin yerli ve yabancı ticari sözleşmelerini (tedarik, distribütörlük, lisans, ortaklık, gizlilik) hazırlamak ve müzakere etmek.',
      'Türk Ticaret Kanunu çerçevesinde genel kurul, yönetim kurulu kararları ve sermaye artırımı gibi kurumsal işlemleri yürütmek.',
      'İş Kanunu uyarınca personel fesih süreçleri, iş sözleşmeleri ve işçi-işveren uyuşmazlıklarında hukuki riskleri minimize etmek.',
      'KVKK ve sektörel düzenleyici kurumlar (BDDK, SPK, Rekabet Kurumu) nezdinde uyum denetimlerini koordine etmek.',
      'Şirket aleyhine açılan davalarda ve icra takiplerinde savunma stratejilerini belirleyip duruşmalara katılmak.'
    ],
    toolsAndTech: ['UYAP Avukat Portalı', 'Lexpera / Kazancı İçtihat Programları', 'Kurumsal Sözleşme Yönetim Sistemleri (CLM)', 'İcra Takip Programları', 'Microsoft Office & Teams'],
    dailyRoutine: 'Sabah UYAP duruşma ve arabuluculuk takipleri; gün içinde ticari sözleşme maddelerinin müzakeresi, departmanlardan gelen hukuki risk sorularının mütalaalandırılması ve yönetim kurulu kararlarının tescil hazırlığı.',
    education: ['Hukuk Fakültesi (Lisans)', '1 Yıllık Yasal Avukatlık Stajı'],
    skills: ['Ticaret & Şirketler Hukuku', 'Sözleşme Müzakeresi & Taslağı', 'İş Hukuku & Arabuluculuk', 'Hukuki Risk Analizi & Mütalaa', 'KVKK & Regülasyon Uyumu'],
    certifications: [
      { name: 'Avukatlık Ruhsatnamesi', issuer: 'Türkiye Barolar Birliği (TBB)' },
      { name: 'Arabuluculuk Sicil Kaydı', issuer: 'Adalet Bakanlığı Arabuluculuk Daire Başkanlığı' },
      { name: 'TOEFL / ILEC Hukuk İngilizcesi Belgesi', issuer: 'Cambridge / ETS' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '1136 Sayılı Avukatlık Kanunu',
      chamber: 'Türkiye Barolar Birliği & İlgili İl Barosu',
      requiredDegree: 'Hukuk Fakültesi Lisans Diploması',
      licenseOrRegistry: '1 Yıllık Yasal Avukatlık Stajı + Baro Ruhsatnamesi',
      summaryText: 'Mahkemelerde ve resmi mercilerde şirket temsili yapmak, dava ve icra takipleri yürütmek için Hukuk Fakültesi mezuniyeti, 1 yıllık yasal staj ve Baro levhasına kayıtlı olmak kanuni zorunluluktur.'
    },
    interviewQuestions: [
      {
        question: 'Uluslararası bir tedarik sözleşmesinde karşı taraf sorumluluğu tamamen hariç tutan (Limitation of Liability) bir madde dayatırsa şirket menfaatini nasıl korursunuz?',
        category: 'Teknik / Mesleki',
        tip: 'Dolaylı zararların hariç tutulması, sözleşme bedeliyle tavan (cap) koyma, Türk Borçlar Kanunu md. 115 (ağır kusurdan sorumsuzluk yasağı) emredici hükümlerini vurgulayın.'
      },
      {
        question: 'İş Kanunu md. 18 ve 25 kapsamında performans düşüklüğü gerekçesiyle iş akdi feshedilecek üst düzey bir çalışan için dava riskini nasıl minimize edersiniz?',
        category: 'Vaka & Kriz Çözümü',
        tip: 'Yazılı savunma talebi, performans kriterlerinin objektifliği, ikale (anlaşmalı fesih) müzakeresi ve arabuluculuk tutanağı güvencesini detaylandırın.'
      }
    ]
  },

  // =========================================================================
  // 5. SERBEST MUHASEBECİ MALİ MÜŞAVİR (SMMM)
  // =========================================================================
  'mali-musavir': {
    tasks: [
      'Şirketlerin genel muhasebe kayıtlarını Tek Düzen Hesap Planı, VUK ve TMS/TFRS standartlarına uygun olarak tutmak.',
      'KDV, Muhtasar, Geçici Vergi ve Kurumlar Vergisi beyannamelerini hazırlayarak GİB sistemine yasal süresinde onaylamak.',
      'E-Fatura, e-Arşiv, e-İrsaliye ve e-Defter süreçlerini denetlemek ve yasal beratlarını zamanında almak.',
      'Bordro, SGK bildirgeleri, kıdem-ihbar tazminatları ve istihdam teşviklerini hatasız hesaplamak.',
      'Dönem sonu envanter ve bilanço kapanışlarını yaparak gelir tablosu ve finansal analiz raporları sunmak.'
    ],
    toolsAndTech: ['Luca / Zirve / Logo / Mikro Muhasebe', 'GİB İnternet Vergi Dairesi', 'SGK E-Bildirge', 'ERP Finans Modülleri (SAP FI)', 'İleri Düzey Excel'],
    dailyRoutine: 'E-Fatura ve banka ekstrelerinin Luca/Zirve sistemine entegrasyonu, vergi beyanname kontrolleri (KDV/Muhtasar/Geçici Vergi), SGK bildirgeleri ve şirket yöneticilerine nakit akış/mizan danışmanlığı.',
    education: ['İşletme (Lisans)', 'İktisat (Lisans)', 'Maliye', 'Muhasebe ve Finans Yönetimi'],
    skills: ['Vergi Mevzuatı (VUK, KDV, KVK)', 'Tekdüzen Hesap Planı', 'Mali Tablolar Analizi & Mizan', 'SGK Mevzuatı & Teşvikler', 'Denetim & Bilanço Çıkarma'],
    certifications: [
      { name: 'SMMM Ruhsatnamesi', issuer: 'TÜRMOB' },
      { name: 'Bağımsız Denetçi Belgesi', issuer: 'Kamu Gözetimi Kurumu (KGK)' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '3568 Sayılı Serbest Muhasebeci Mali Müşavirlik ve Yeminli Mali Müşavirlik Kanunu',
      chamber: 'TÜRMOB & İlgili SMMM Odası',
      requiredDegree: 'İktisadi ve İdari Bilimler / Hukuk Lisans Diploması',
      licenseOrRegistry: 'TÜRMOB Staja Giriş Sınavı + 3 Yıl Staj + SMMM Yeterlilik Sınavı & Ruhsatı',
      summaryText: 'Mali müşavirlik unvanı kullanmak, resmi vergi beyannamelerini imzalamak ve şirket defterlerini yasal olarak tasdik edebilmek için 3568 sayılı Kanun kapsamında TÜRMOB SMMM Ruhsatı şarttır.'
    },
    interviewQuestions: [
      {
        question: 'Vergi dairesinden mükellefe / şirkete SMİYB (Naylon Fatura / Sahte Belge) kullanım şüphesiyle izahat yazısı geldiğinde hangi adımları atarsınız?',
        category: 'Vaka & Kriz Çözümü',
        tip: 'Özel esaslardan genel esaslara geçiş başvurusu, banka havale dekontları, fiili sevk irsaliyeleri, sözleşme ve kantar fişi gibi ispat belgelerini hazırlama prosedürünü anlatın.'
      },
      {
        question: 'Enflasyon muhasebesi (VUK Mükerrer 298/A) uygulamasında parasal olmayan kıymetlerin düzeltilmesi şirket bilançosunu ve vergi matrahını nasıl etkiler?',
        category: 'Teknik / Mesleki',
        tip: 'Stoklar, duran varlıklar ve özkaynak kalemlerinin düzeltme katsayılarıyla endekslenmesi, geçmiş yıl karları ve finansman gider kısıtlaması etkilerini açıklayın.'
      }
    ]
  },

  // =========================================================================
  // 6. UZMAN HEKİM / CERRAH
  // =========================================================================
  'uzman-hekim': {
    tasks: [
      'Poliklinik hastalarının klinik muayenesini yapmak, radyolojik ve biyokimyasal tetkikleri yorumlamak ve kesin tanı koymak.',
      'Cerrahi branşlarda ameliyatları gerçekleştirmek; dahili branşlarda farmakolojik tedavi protokollerini planlamak ve takip etmek.',
      'Yoğun bakım ve servis hastalarının vizitlerini yaparak kritik parametre değişikliklerine anında müdahale etmek.',
      'Acil servis konsültasyonlarını karşılamak ve kritik hastaların sevk/tedavi kararlarını yönetmek.',
      'Tıbbi literatürü ve kılavuzları takip ederek tedavileri kanıta dayalı tıp ilkeleriyle güncellemek.'
    ],
    toolsAndTech: ['Hastane Bilgi Yönetim Sistemi (HBYS)', 'PACS Radyoloji Görüntüleme', 'E-Reçete & E-Nabız', 'Branşa Özgü Medikal / Cerrahi Ekipmanlar'],
    dailyRoutine: '08:00 servis vizitleri ve yatan hasta değerlendirmeleri, gün boyu poliklinik muayeneleri veya cerrahi ameliyatlar, acil konsültasyon yanıtları ve epikriz raporlaması.',
    education: ['Tıp Fakültesi (6 Yıl Lisans)', 'Tıpta Uzmanlık Sınavı (TUS)', 'Uzmanlık Eğitimi (4-5 Yıl Asistanlık)'],
    skills: ['Klinik Karar Verme', 'Cerrahi / Girişimsel Beceriler', 'Hasta & Aile İletişimi', 'Acil Durum Yönetimi', 'Kanıta Dayalı Tıp'],
    certifications: [
      { name: 'Uzman Hekimlik Belgesi', issuer: 'Sağlık Bakanlığı' },
      { name: 'Branş Derneği Yeterlilik Belgesi (Board)', issuer: 'İlgili Uzmanlık Derneği' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '1219 Sayılı Tababet ve Şuabatı San\'atlarının Tarzı İcrasına Dair Kanun',
      chamber: 'Türk Tabipleri Birliği (TTB)',
      requiredDegree: '6 Yıllık Tıp Fakültesi Diploması + TUS İhtisası',
      licenseOrRegistry: 'Sağlık Bakanlığı Diploma ve Uzmanlık Tescili + TTB Kaydı',
      summaryText: 'Türkiye Cumhuriyeti sınırlarında hekimlik ve uzman hekimlik icra etmek, reçete yazmak ve cerrahi operasyon gerçekleştirmek için 1219 sayılı Kanun uyarınca Sağlık Bakanlığı onaylı Tıp diploması ve uzmanlık tescili zorunludur.'
    },
    interviewQuestions: [
      {
        question: 'Poliklinikte veya acilde tanı koymada zorlandığınız ve birden fazla branşı ilgilendiren atipik bir vaka ile karşılaştığınızda klinik yönetiminiz nasıl olur?',
        category: 'Vaka & Kriz Çözümü',
        tip: 'Konsültasyon protokolleri, kanıta dayalı kılavuzlar (UpToDate), ayırıcı tanı basamakları ve hasta güvenliğini önceleyen yaklaşımı özetleyin.'
      }
    ]
  },

  // =========================================================================
  // 7. DİŞ HEKİMİ
  // =========================================================================
  'dis-hekimi': {
    tasks: [
      'Ağız, diş ve çene dokularının klinik muayenesini ve panoramik/CBCT radyolojik değerlendirmesini yapmak.',
      'Konservatif ve endodontik tedavileri (kompozit dolgu, kanal tedavisi) gerçekleştirmek.',
      'Protez uygulamaları (zirkonyum kuron, porselen lamine, hareketli protez) için ölçü almak ve kapanış uyumlaması yapmak.',
      'Gömülü diş çekimleri ve implant cerrahisi gibi cerrahi operasyonları steril şartlarda uygulamak.',
      'Ağız hijyeni ve koruyucu diş hekimliği uygulamalarını hastalara aktarmak.'
    ],
    toolsAndTech: ['Dental Ünit & Mikromotor', 'Panoramik Röntgen & Dental Tomografi (CBCT)', 'Ağız İçi Tarayıcı (CAD/CAM)', 'Apex Locator & Döner Aletler'],
    dailyRoutine: 'Randevulu hasta seansları (kanal tedavisi, implant cerrahisi, protetik restorasyonlar), panoramik röntgen teşhisleri ve sterilizasyon protokollerinin denetimi.',
    education: ['Diş Hekimliği Fakültesi (5 Yıl Lisans)'],
    skills: ['Endodonti & Restoratif Tedavi', 'Dental Cerrahi & İmplantoloji', 'Protetik Diş Tedavisi', 'Ağız İçi Dijital Modelleme', 'Hasta İletişimi & Anksiyete Yönetimi'],
    certifications: [
      { name: 'Diş Hekimliği Ruhsatı', issuer: 'Sağlık Bakanlığı' },
      { name: 'Oda Sicil Kaydı', issuer: 'Türk Dişhekimleri Birliği (TDB)' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '1219 Sayılı Tababet Kanunu',
      chamber: 'Türk Dişhekimleri Birliği (TDB)',
      requiredDegree: '5 Yıllık Diş Hekimliği Fakültesi Lisans Diploması',
      licenseOrRegistry: 'Sağlık Bakanlığı Diploma Tescili & TDB Oda Kaydı',
      summaryText: 'Diş hekimliği muayenehanesi açmak veya kliniklerde diş tedavisi uygulamak için 5 yıllık Diş Hekimliği diploması, Sağlık Bakanlığı tescili ve TDB oda kaydı yasal zorunluluktur.'
    }
  },

  // =========================================================================
  // 8. ECZACI
  // =========================================================================
  'eczaci': {
    tasks: [
      'Reçeteli ve reçetesiz ilaçların hastaya doğru dozda, kullanım talimatlarıyla ve olası yan etkiler anlatılarak teslimini sağlamak.',
      'Hastaların kullandığı ilaçlar arasındaki etkileşimleri (ilaç-ilaç, ilaç-besin) kontrol ederek güvenli tedaviyi gözetmek.',
      'Eczane stoklarını, soğuk zincir ilaçlarını ve miat kontrollerini İlaç Takip Sistemi (İTS) üzerinden düzenli denetlemek.',
      'Majistral ilaç formüllerini laboratuvar ortamında hazırlamak ve kayıt altına almak.',
      'Kronik hastalıklarda (diyabet, hipertansiyon vb.) hasta danışmanlığı ve sağlık okuryazarlığı desteği vermek.'
    ],
    toolsAndTech: ['İlaç Takip Sistemi (İTS)', 'SGK Medula Eczane Sistemi', 'Eczane Otomasyon Yazılımları (RxMediaPharma / TEB)', 'Hassas Terazi & Laboratuvar Malzemeleri'],
    dailyRoutine: 'Sabah Medula ve İTS sistem kontrolleri, reçete girişleri ve provizyon onayları; gün boyu hasta danışmanlığı, soğuk zincir kontrolleri ve ecza deposu sipariş yönetimi.',
    education: ['Eczacılık Fakültesi (5 Yıl Lisans)'],
    skills: ['Farmakoloji & İlaç Etkileşimleri', 'Majistral İlaç Yapımı', 'İTS & Medula Sistemleri', 'Hasta Danışmanlığı & İletişim', 'Eczane İşletmeciliği'],
    certifications: [
      { name: 'Eczacılık Ruhsatnamesi', issuer: 'Sağlık Bakanlığı TİTCK' },
      { name: 'Oda Kayıt Belgesi', issuer: 'Türk Eczacıları Birliği (TEB)' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '6197 Sayılı Eczacılar ve Eczaneler Hakkında Kanun',
      chamber: 'Türk Eczacıları Birliği (TEB)',
      requiredDegree: '5 Yıllık Eczacılık Fakültesi Lisans Diploması',
      licenseOrRegistry: 'Sağlık Bakanlığı Diploma Tescili & Eczane Açma Ruhsatı',
      summaryText: 'Serbest eczane açabilmek veya hastane/ilaç sanayiinde mesul müdür eczacı olarak çalışabilmek için 6197 sayılı Kanun uyarınca Eczacılık Fakültesi diploması, 1 yıl yardımcı eczacılık ve TEB oda kaydı şarttır.'
    }
  },

  // =========================================================================
  // 9. MİMAR
  // =========================================================================
  'mimar': {
    tasks: [
      'Konut, ticari ve kamu binalarının imar mevzuatına ve işlevsel gereksinimlere uygun mimari konsept ve avan projelerini tasarlamak.',
      'Ruhsat ve uygulama projelerini hazırlamak, statik, mekanik ve elektrik mühendisleriyle koordinasyon sağlayarak çakışmaları (clash detection) gidermek.',
      'Belediye ve ilgili kamu kurumlarında imar durumu, ruhsat onayı ve yapı kullanım izni süreçlerini takip etmek.',
      'Saha şantiyelerinde tasarımın uygulamaya aktarılmasını denetlemek ve malzeme seçimlerini koordine etmek.'
    ],
    toolsAndTech: ['AutoCAD / Revit (BIM)', 'SketchUp / Rhino', 'Lumion / V-Ray / Enscape', 'Adobe Photoshop & InDesign'],
    dailyRoutine: 'Konsept tasarım eskizleri, Revit BIM modelleme ve çakışma analizleri, belediye imar müdürlüğü görüşmeleri ve şantiye malzeme kontrolleri.',
    education: ['Mimarlık (Lisans)'],
    skills: ['Mimari Tasarım & BIM', 'İmar Mevzuatı & Ruhsat Projeleri', '3D Görselleştirme & Render', 'Disiplinlerarası Koordinasyon', 'Malzeme & Detay Bilgisi'],
    certifications: [
      { name: 'TMMOB Mimarlar Odası Büro Tescil Belgesi (BTB)', issuer: 'TMMOB Mimarlar Odası' },
      { name: 'Autodesk Certified Professional: Revit for Architectural Design', issuer: 'Autodesk' }
    ],
    legalRequirement: {
      isRegulated: true,
      lawName: '3458 Sayılı Mühendislik ve Mimarlık Hakkında Kanun',
      chamber: 'TMMOB Mimarlar Odası',
      requiredDegree: '4 Yıllık Mimarlık Fakültesi Lisans Diploması',
      licenseOrRegistry: 'Mimarlar Odası Sicil Kaydı & Mimari Proje Müellifliği',
      summaryText: 'Mimari proje müellifliği yapmak, belediyelerden inşaat ruhsatı almak ve mimari imza yetkisini kullanabilmek için 3458 sayılı Kanun gereğince Mimarlık lisans diploması ve TMMOB Mimarlar Odası kaydı zorunludur.'
    }
  },

  // =========================================================================
  // 10. ENDÜSTRİ MÜHENDİSİ
  // =========================================================================
  'endustri-muhendisi': {
    tasks: [
      'Üretim ve hizmet süreçlerinde iş etüdü, zaman etüdü ve darboğaz (bottleneck) analizleri yaparak verimliliği artırmak.',
      'Yalın Üretim (Lean), 5S, Kaizen ve Altı Sigma metodolojilerini sahada uygulayarak fire ve israf oranlarını düşürmek.',
      'Tedarik zinciri, emniyet stoku ve hammadde ihtiyaç planlamasını (MRP / ERP) optimize etmek.',
      'Tesis yerleşimi, lojistik rotalama ve kapasite planlama simülasyon modellerini kurmak.',
      'Birim maliyet analizleri yaparak üst yönetime fizibilite ve yatırım geri dönüş süresi (ROI) raporları sunmak.'
    ],
    toolsAndTech: ['SAP / Oracle ERP', 'Arena / AnyLogic Simülasyon', 'Microsoft Power BI / Tableau', 'Minitab (İstatistik)', 'Python / SQL', 'JIRA'],
    dailyRoutine: 'Üretim göstergelerinin (OEE) analizi, hat dengeleme ve Kaizen toplantıları, tedarik zinciri stok simülasyonları ve kapasite planlama güncellemeleri.',
    education: ['Endüstri Mühendisliği (Lisans)', 'İşletme Mühendisliği', 'Sistem Mühendisliği'],
    skills: ['Yalın Üretim & Kaizen', 'Süreç Optimizasyonu & İş Etüdü', 'Tedarik Zinciri & Stok Yönetimi', 'Veri Analitiği (SQL/BI)', 'Proje Yönetimi'],
    certifications: [
      { name: 'Lean Six Sigma Green / Black Belt', issuer: 'IASSC / ASQ' },
      { name: 'PMP (Project Management Professional)', issuer: 'PMI' }
    ]
  },

  // =========================================================================
  // 11. BİLİŞİM & YAZILIM ROLLERİ
  // =========================================================================
  'yazilim-muhendisi': {
    tasks: [
      'Büyük ölçekli web ve arka uç (backend) servislerinin mimarisini (mikroservis, REST/GraphQL) tasarlamak ve geliştirmek.',
      'Yüksek eşzamanlılıklı (high-concurrency) veritabanı sorgularını, cache yapılarını (Redis) ve API entegrasyonlarını optimize etmek.',
      'Kod kalitesi, güvenlik açıkları ve performans standartları için düzenli Pull Request incelemeleri (Code Review) yürütmek.',
      'Sistem hatalarını, bellek sızıntılarını ve üretim ortamı çökmelerini izleme araçlarıyla (Sentry, Datadog) analiz edip gidermek.',
      'Birim testleri (Unit Test), entegrasyon testleri ve CI/CD otomasyon süreçlerini uygulayarak kesintisiz dağıtım sağlamak.'
    ],
    toolsAndTech: ['TypeScript / Node.js', 'Go / Java / Python', 'PostgreSQL / MongoDB', 'Docker & Kubernetes', 'Redis / Kafka', 'Git / GitHub CI/CD'],
    dailyRoutine: 'Daily Standup toplantısı, JIRA görevleri doğrultusunda mikroservis mimarisinde kod geliştirme, PR incelemeleri ve CI/CD deployment izleme.',
    education: ['Bilgisayar Mühendisliği', 'Yazılım Mühendisliği', 'Bilişim Sistemleri Mühendisliği', 'Yönetim Bilişim Sistemleri'],
    skills: ['Sistem Mimarisi', 'Algoritmalar & Veri Yapıları', 'Bulut Bilişim', 'Temiz Kod (Clean Code)', 'Dağıtık Sistemler'],
    certifications: [
      { name: 'AWS Certified Developer / Solutions Architect', issuer: 'Amazon Web Services' },
      { name: 'Professional Scrum Developer (PSD)', issuer: 'Scrum.org' }
    ],
    interviewQuestions: [
      {
        question: 'Üretim ortamında (Production) çalışan bir API servisinin p99 yanıt süresi aniden 200ms\'den 4 saniyeye fırladığında kök nedeni nasıl izole eder ve sistemi kurtarırsınız?',
        category: 'Vaka & Kriz Çözümü',
        tip: 'APM araçları (Datadog/Sentry), veritabanı kilitleri (slow query / lock contention), connection pool tükenmesi, bellek sızıntısı ve circuit breaker stratejilerini anlatın.'
      },
      {
        question: 'Monolitik bir mimariyi mikroservislere bölerken veri tutarlılığını (Data Consistency) nasıl sağlarsınız?',
        category: 'Teknik / Mesleki',
        tip: 'İki fazlı onay (2PC) yerine Saga Deseni (Orchestration/Choreography), Event Sourcing, Outbox pattern ve nihai tutarlılık (Eventual Consistency) kavramlarını örnekleyin.'
      }
    ]
  },

  'yapay-zeka-muhendisi': {
    tasks: [
      'Büyük Dil Modelleri (LLM), RAG (Retrieval-Augmented Generation) mimarileri ve fine-tuning süreçlerini tasarlamak.',
      'Doğal Dil İşleme (NLP) veya Bilgisayarlı Görü (Computer Vision) algoritmalarını kurumsal iş akışlarına entegre etmek.',
      'Eğitim veri setlerini temizlemek, vektör veritabanlarını (Pinecone, Chroma, Qdrant) yapılandırmak ve model sapmalarını (bias/hallucination) ölçümlemek.',
      'Yapay zeka modellerini düşük gecikme (low-latency) ile sunucu altyapılarında (TensorRT, ONNX, vLLM) üretim ortamına almak.',
      'A/B testleri ile model doğruluğunu, kullanıcı etkileşimini ve maliyet (token tüketimi) dengesini optimize etmek.'
    ],
    toolsAndTech: ['Python / PyTorch', 'Hugging Face / LangChain / LlamaIndex', 'CUDA / GPU Optimizasyonu', 'Vektör DBs (Pinecone/Qdrant)', 'Docker / FastAPI', 'MLflow / Weights & Biases'],
    dailyRoutine: 'Veri hazırlığı, model eğitim deneylerinin incelenmesi, çıkarım gecikmelerinin izlenmesi ve ürün ekibiyle AI özelliklerinin planlanması.',
    education: ['Bilgisayar Mühendisliği', 'Yapay Zeka ve Veri Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Matematik'],
    skills: ['Derin Öğrenme (Deep Learning)', 'LLM & Prompt Mühendisliği', 'Vektör Arama', 'Model Optimizasyonu', 'İstatistiksel Modelleme'],
    certifications: [
      { name: 'TensorFlow Developer Certificate', issuer: 'Google' },
      { name: 'DeepLearning.AI Generative AI for Data & Engineering', issuer: 'DeepLearning.AI' }
    ]
  },

  'devops-muhendisi': {
    tasks: [
      'Bulut altyapısını Kod Olarak Altyapı (IaC - Terraform, CloudFormation) prensipleriyle kurmak, sürdürmek ve güvenliğini sağlamak.',
      'Kubernetes kümelerinin (EKS, GKE) orkestrasyonunu, pod autoscaling ve ağ politikalarını yönetmek.',
      'Yazılım dağıtımları için otomatik test, derleme ve sıfır kesintili (Blue/Green, Canary) CI/CD pipeline hatları kurmak.',
      'Sistem izleme (monitoring), log toplama ve uyarı sistemlerini (Prometheus, Grafana, ELK Stack) 7/24 aktif tutmak.',
      'Afet kurtarma (Disaster Recovery), veri tabanı yedekleme rutinleri ve bulut maliyet optimizasyonunu (FinOps) yürütmek.'
    ],
    toolsAndTech: ['Kubernetes & Docker', 'Terraform / Ansible', 'AWS / Google Cloud / Azure', 'Prometheus & Grafana', 'GitLab CI / GitHub Actions', 'Linux Bash / Shell Scripting'],
    dailyRoutine: 'Sistem altyapı metriklerinin kontrolü, açık pipeline hatalarının çözülmesi, altyapı kodlarının (Terraform) güncellenmesi ve güvenlik yamalarının uygulanması.',
    education: ['Bilgisayar Mühendisliği', 'Yazılım Mühendisliği', 'Elektrik-Elektronik Mühendisliği'],
    skills: ['Konteyner Orkestrasyonu', 'Bulut Mimarisi', 'Sistem Güvenliği', 'FinOps (Maliyet Yönetimi)', 'Yüksek Erişilebilirlik (HA)'],
    certifications: [
      { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation / CNCF' },
      { name: 'AWS Certified Solutions Architect - Professional', issuer: 'Amazon Web Services' }
    ]
  },

  'siber-guvenlik-uzmani': {
    tasks: [
      'Kurumsal ağlara, sunuculara ve web uygulamalarına düzenli sızma testleri (Penetration Testing) gerçekleştirmek.',
      'Güvenlik Olayları ve Yönetimi (SIEM / SOC) sistemleri üzerinden siber tehdit ve izinsiz giriş denemelerini tespit edip engellemek.',
      'Sıfır Gün (Zero-day) açıklarını ve CVE bültenlerini takip ederek güvenlik yamalarını koordine etmek.',
      'ISO 27001, KVKK ve GDPR teknik güvenlik gereksinimlerine uyumluluk denetimleri yürütmek.',
      'Çalışanlara yönelik sosyal mühendislik ve oltalama (phishing) simülasyonları düzenlemek.'
    ],
    toolsAndTech: ['Burp Suite / OWASP ZAP', 'Wireshark / Nmap / Metasploit', 'SIEM (Splunk / QRadar)', 'EDR Çözümleri', 'Python & Bash', 'Firewall / WAF'],
    dailyRoutine: 'Tehdit loglarının incelenmesi, sızma testi bulgularının raporlanması ve kritik güvenlik açığı bulunan sunucuların izolasyonu.',
    education: ['Siber Güvenlik Mühendisliği', 'Bilgisayar Mühendisliği', 'Adli Bilişim Mühendisliği'],
    skills: ['Ağ Güvenliği', 'Tersine Mühendislik', 'Web Uygulama Güvenliği', 'Kriptografi', 'Olay Müdahalesi (Incident Response)'],
    certifications: [
      { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council' },
      { name: 'Offensive Security Certified Professional (OSCP)', issuer: 'OffSec' },
      { name: 'CompTIA Security+', issuer: 'CompTIA' }
    ]
  },

  'veri-bilimci': {
    tasks: [
      'Büyük veri kümelerini SQL ve Python kullanarak temizlemek, birleştirmek ve keşifsel veri analizi (EDA) yapmak.',
      'Müşteri kaybı (churn), talep tahmini, kredi skoru ve öneri sistemleri için makine öğrenimi modelleri geliştirmek.',
      'A/B testleri tasarlamak ve iş birimlerine istatistiksel hipotez testleri sonuçlarını raporlamak.',
      'Modelleri Docker ve API servisleri ile canlı üretim ortamına taşımak ve veri kaymasını (data drift) izlemek.'
    ],
    toolsAndTech: ['Python (Pandas, Scikit-learn, XGBoost)', 'SQL & PostgreSQL / Snowflake', 'Apache Spark / Databricks', 'Tableau / Power BI', 'Docker / MLflow'],
    dailyRoutine: 'Veri ambarı sorgulamaları, makine öğrenmesi modellerinin hiperparametre optimizasyonu, iş birimleriyle hipotez toplantıları ve dashboard güncellemeleri.',
    education: ['İstatistik', 'Endüstri Mühendisliği', 'Bilgisayar Mühendisliği', 'Matematik'],
    skills: ['Makine Öğrenimi', 'İstatistiksel Analiz & Hipotez Testi', 'İleri Seviye SQL', 'Veri Görselleştirme', 'Tahminsel Modelleme'],
    certifications: [
      { name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud' },
      { name: 'Databricks Certified Data Scientist Associate', issuer: 'Databricks' }
    ]
  },

  'ui-ux-tasarimci': {
    tasks: [
      'Kullanıcı araştırmaları, derinlemesine mülakatlar ve persona analizleri yaparak kullanıcı ihtiyaçlarını haritalamak.',
      'Web ve mobil ürünler için bilgi mimarisi, kullanıcı akışları (User Flows) ve tel kafes (wireframe) çizimleri hazırlamak.',
      'Figma üzerinde ölçeklenebilir tasarım sistemleri (Design Systems), UI bileşen kütüphaneleri ve etkileşimli prototipler geliştirmek.',
      'Kullanılabilirlik testleri (Usability Testing) düzenleyerek tasarım kararlarını somut kullanıcı verileriyle doğrulamak.',
      'Yazılımcılarla (Frontend) piksel mükemmelliğinde el sıkışma (Hand-off) süreçlerini yönetmek.'
    ],
    toolsAndTech: ['Figma / FigJam', 'Adobe XD / Illustrator', 'Miro / Notion', 'Maze / UserTesting', 'HTML/CSS Temelleri'],
    dailyRoutine: 'Arayüz tasarımı üretimi, tasarım sistemi güncellemeleri, ürün yöneticileri ve yazılımcılarla tasarım inceleme (design critique) toplantıları.',
    education: ['Grafik Tasarımı', 'Görsel İletişim Tasarımı', 'Endüstriyel Tasarım', 'Bilgisayar Teknolojileri'],
    skills: ['Kullanıcı Deneyimi (UX)', 'Kullanıcı Arayüzü (UI)', 'Prototipleme', 'Tasarım Sistemleri', 'Kullanılabilirlik Testleri'],
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Coursera / Google' },
      { name: 'Nielsen Norman Group UX Master Certified', issuer: 'NN/g' }
    ]
  },

  'urun-yoneticisi': {
    tasks: [
      'Ürünün stratejik vizyonunu ve yol haritasını (Product Roadmap) şirket hedefleri ve kullanıcı geri bildirimleriyle belirlemek.',
      'Yazılım, tasarım, pazarlama ve veri ekipleriyle çapraz fonksiyonel çalışarak sprint önceliklerini yönetmek.',
      'Kullanıcı hikayeleri (User Stories), kabul kriterleri (Acceptance Criteria) ve PRD dökümanlarını eksiksiz hazırlamak.',
      'Ürün metriklerini (CAC, LTV, Retention, Churn, NPS) günlük izleyerek A/B testleriyle dönüşüm oranlarını artırmak.'
    ],
    toolsAndTech: ['JIRA / Confluence', 'Mixpanel / Amplitude / GA4', 'Figma (İnceleme)', 'Notion / Miro', 'SQL (Temel Veri Çekme)'],
    dailyRoutine: 'Sabah sprint standup katılımı, ürün metriklerinin (kullanıcı tutunma/dönüşüm) analizi, kullanıcı mülakatları ve geliştirici ekiple backlog rafinmanı.',
    education: ['Endüstri Mühendisliği', 'İşletme', 'Bilgisayar Mühendisliği', 'Yönetim Bilişim Sistemleri'],
    skills: ['Ürün Stratejisi & Yol Haritası', 'Kullanıcı Odaklılık', 'Veri Temelli Karar Alma', 'Çevik (Agile/Scrum) Yönetim', 'Paydaş İletişimi'],
    certifications: [
      { name: 'Professional Scrum Product Owner (PSPO)', issuer: 'Scrum.org' },
      { name: 'Product Management Certified (PMC)', issuer: 'Product School' }
    ]
  }
};

/**
 * Akıllı Alan & Sektör Heuristic Motoru:
 * Eğer meslek önceden tanımlanmamış bir meslekse (örneğin Spark ile yeni eklendiyse),
 * jenerik bir kalıp yerine unvan ve kategori köklerini analiz ederek
 * gerçekçi görevler, saat saat günlük rutin, kanuni oda şartları ve mülakat soruları üretir.
 */
export function getProfessionDetails(slug: string, title: string = '', category: string = ''): DetailedRoleInfoWithQuestions {
  const roleProfile = DETAILED_PROFESSION_PROFILES[slug];
  if (roleProfile) {
    return {
      ...roleProfile,
      interviewQuestions: roleProfile.interviewQuestions || generateSmartInterviewQuestions(title, category)
    };
  }

  const titleLower = title.toLowerCase();
  const catLower = category.toLowerCase();

  // 1. MÜHENDİSLİK ALANI
  if (titleLower.includes('mühendis') || titleLower.includes('muhendis') || catLower.includes('mühendis')) {
    const isImzaYetkisi = titleLower.includes('makine') || titleLower.includes('inşaat') || titleLower.includes('insaat') || 
                          titleLower.includes('elektrik') || titleLower.includes('harita') || titleLower.includes('çevre') || titleLower.includes('gıda');

    return {
      tasks: [
        `${title} disiplinine özgü teknik projelerin, hesaplamaların ve mühendislik şartnamelerinin hazırlanması.`,
        `Saha, üretim veya laboratuvar ortamında teknik standartlara (TSE/ISO/CE) ve iş güvenliği kurallarına tam uyumun denetlenmesi.`,
        `CAD/CAE, simülasyon ve hesaplama araçları kullanılarak maliyet düşürücü ve verimlilik artırıcı tasarım revizyonlarının yapılması.`,
        `Tedarikçiler, taşeronlar ve denetim heyetleriyle teknik el sıkışma toplantılarının koordine edilmesi.`,
        `Periyodik teknik hakediş, ilerleme raporları ve risk değerlendirme analizlerinin yönetime sunulması.`
      ],
      toolsAndTech: ['Sektörel 3D CAD & Analiz Programları', 'Teknik Hesaplama & Simülasyon Araçları', 'ERP & Üretim Planlama Modülleri', 'MS Excel & Proje Yönetim Araçları'],
      dailyRoutine: `Sabah saha ve operasyon planlamasının kontrolü, teknik hesap ve tasarım revizyonlarının incelenmesi; öğleden sonra kalite kontrol ve tedarikçi teknik görüşmeleri.`,
      education: [`${title.replace(' Uzmanı', '').replace(' Yöneticisi', '')} Lisans Programı (4 Yıl)`],
      skills: ['Mühendislik Hesaplamaları', 'Mevzuat & Kalite Standartları', 'Proje Yönetimi', 'Problem Çözme', 'Risk Analizi'],
      certifications: [
        { name: 'TMMOB İlgili Mühendis Odası Kayıt & Sicil Belgesi', issuer: 'TMMOB' },
        { name: 'Sektörel Uzmanlık & İş Güvenliği Belgesi', issuer: 'Yetkili Akreditasyon Kurumu' }
      ],
      legalRequirement: isImzaYetkisi ? {
        isRegulated: true,
        lawName: '3458 Sayılı Mühendislik ve Mimarlık Hakkında Kanun',
        chamber: 'TMMOB İlgili Meslek Odası',
        requiredDegree: 'YÖK Onaylı 4 Yıllık İlgili Mühendislik Lisans Diploması',
        licenseOrRegistry: 'Oda Kaydı ve Proje / Şantiye İmza Yetkisi',
        summaryText: `3458 sayılı Mühendislik Kanunu uyarınca bu unvanı taşımak ve resmi projelerde imza yetkisi kullanabilmek için ilgili mühendislik lisans diploması ve TMMOB meslek odası kaydı zorunludur.`
      } : undefined,
      interviewQuestions: generateSmartInterviewQuestions(title, 'Mühendislik')
    };
  }

  // 2. SAĞLIK VE TIP ALANI
  if (catLower.includes('sağlık') || catLower.includes('tıp') || titleLower.includes('hekim') || titleLower.includes('terapist') || titleLower.includes('sağlık')) {
    return {
      tasks: [
        `Danışan veya hastaların klinik değerlendirmesini yapmak, etik standartlara uygun tedavi ve bakım süreçlerini planlamak.`,
        `Sağlık Bakanlığı protokollerine, tıbbi mevzuata ve hasta hakları ilkelerine tam riayet etmek.`,
        `Klinik tetkik ve vaka kayıtlarını ilgili sağlık bilgi yönetim sistemlerine (HBYS) eksiksiz işlemek.`,
        `Multidisipliner sağlık ekibiyle düzenli vaka toplantıları yaparak hasta takip planını güncellemek.`
      ],
      toolsAndTech: ['Sağlık Bilgi Yönetim Sistemi (HBYS)', 'Medikal Takip & Dozaj Yazılımları', 'Branşa Özgü Teşhis / Muayene Ekipmanları'],
      dailyRoutine: `Sabah vizit ve randevulu hasta seansları, teşhis ve tedavi protokollerinin uygulanması, vaka epikrizlerinin arşivlenmesi.`,
      education: [`İlgili 4-6 Yıllık Sağlık / Fakülte Lisans Diploması`],
      skills: ['Klinik Değerlendirme', 'Hasta İletişimi & Empati', 'Tıbbi Etik & Mevzuat', 'Kriz Müdahalesi'],
      certifications: [
        { name: 'Sağlık Bakanlığı Tescilli Diploma / Uzmanlık Belgesi', issuer: 'Sağlık Bakanlığı' },
        { name: 'Mesleki Birlik / Oda Kaydı', issuer: 'İlgili Meslek Birliği' }
      ],
      legalRequirement: {
        isRegulated: true,
        lawName: '1219 Sayılı Tababet ve Şuabatı San\'atlarının Tarzı İcrasına Dair Kanun',
        chamber: 'Sağlık Bakanlığı & İlgili Meslek Birliği',
        requiredDegree: 'Sağlık Bakanlığı Tescilli İlgili Lisans Diploması',
        licenseOrRegistry: 'Bakanlık Diploma Tescili & Mesleki Uygulama Ruhsatı',
        summaryText: `Sağlık hizmeti sunabilmek ve hasta kabul edebilmek için Sağlık Bakanlığı onaylı ilgili lisans diploması ve yasal mesleki tescil zorunludur.`
      },
      interviewQuestions: generateSmartInterviewQuestions(title, 'Sağlık')
    };
  }

  // 3. GENEL AKILLI FALLBACK
  return {
    tasks: [
      `${title} operasyonel süreçlerinin kurumsal hedeflere ve kalite standartlarına uygun icra edilmesi.`,
      `İlgili iç departmanlar ve dış paydaşlarla koordinasyon sağlanarak performans raporlarının hazırlanması.`,
      `Sektörel güncellemelerin ve verimlilik artıran metodolojilerin iş akışlarına entegre edilmesi.`,
      `Müşteri veya paydaş memnuniyetini artıracak standart operasyon prosedürlerinin (SOP) uygulanması.`
    ],
    toolsAndTech: ['Sektörel ERP & Veri Sistemleri', 'Microsoft Office / 365 Araçları', 'Proje Yönetimi & Raporlama Araçları'],
    dailyRoutine: `Günlük iş planlaması, operasyonel süreç kontrolleri, paydaş taleplerinin karşılanması ve performans değerlendirme raporlaması.`,
    education: ['İlgili 4 Yıllık Üniversite Lisans / Meslek Yüksekokulu Bölümleri'],
    skills: ['Analitik Düşünme', 'Zaman Yönetimi', 'Yazılı & Sözlü İletişim', 'Süreç Takibi & Raporlama'],
    certifications: [
      { name: 'Mesleki Yeterlilik Kurumu (MYK) Belgesi', issuer: 'MYK Yetkili Belgelendirme Kuruluşu' },
      { name: 'Sektörel Yetkinlik Sertifikası', issuer: 'İlgili Meslek Enstitüsü' }
    ],
    interviewQuestions: generateSmartInterviewQuestions(title, category)
  };
}

function generateSmartInterviewQuestions(title: string, category: string): InterviewQuestion[] {
  return [
    {
      question: `${title} olarak kritik bir projede veya operasyonda teslimat süresi yaklaşırken teknik/operasyonel bir aksaklık yaşandığında süreci nasıl yönetirsiniz?`,
      category: 'Vaka & Kriz Çözümü',
      tip: `Kök neden analizi, önceliklendirme matrisi ve paydaşları şeffaf bilgilendirme adımlarını net verilerle açıklayın.`
    },
    {
      question: `Farklı departmanların çelişen beklentileri olduğunda iş önceliklerinizi ve bütçe/zaman dengesini nasıl belirlersiniz?`,
      category: 'Davranışsal / İK',
      tip: `Şirketin ana iş hedeflerini referans alarak analitik etki-çaba analizi yaptığınızı somut bir örnekle vurgulayın.`
    },
    {
      question: `${title} rolünde son 1-2 yıl içinde ortaya çıkan teknolojik trendleri veya mevzuat değişikliklerini iş yapış şeklinize nasıl yansıtıyorsunuz?`,
      category: 'Teknik / Mesleki',
      tip: `Takip ettiğiniz sektörel yayınları, uyguladığınız yeni dijital araçları veya tamamladığınız somut bir iyileştirme projesini belirtin.`
    }
  ];
}

export const getDetailedRoleInfo = getProfessionDetails;
