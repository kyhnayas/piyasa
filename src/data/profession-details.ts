/**
 * Detaylı Mesleki Görev Tanımları, Teknolojiler ve Günlük Sorumluluklar Sözlüğü
 */

export interface InterviewQuestion {
  question: string;
  category: 'Teknik / Mesleki' | 'Davranışsal / İK' | 'Vaka & Kriz Çözümü';
  tip: string;
}

export interface DetailedRoleInfo {
  tasks: string[];
  toolsAndTech: string[];
  dailyRoutine: string;
  education: string[];
  skills: string[];
  certifications: { name: string; issuer: string }[];
  interviewQuestions?: InterviewQuestion[];
}

export type DetailedRoleInfoWithQuestions = DetailedRoleInfo & {
  interviewQuestions: InterviewQuestion[];
};

export const DETAILED_PROFESSION_PROFILES: Record<string, DetailedRoleInfo> = {
  'yazilim-muhendisi': {
    tasks: [
      'Büyük ölçekli web veya arka uç (backend) servislerinin mimarisini (mikroservis, REST/GraphQL) tasarlamak ve geliştirmek.',
      'Yüksek eşzamanlılıklı (high-concurrency) veritabanı sorgularını, cache yapılarını (Redis) ve API entegrasyonlarını optimize etmek.',
      'Kod kalitesi, güvenlik açıkları ve performans standartları için düzenli Pull Request incelemeleri (Code Review) yürütmek.',
      'Sistem hatalarını, bellek sızıntılarını ve üretim ortamı (production) çökmelerini izleme araçlarıyla (Sentry, Datadog) analiz edip gidermek.',
      'Birim testleri (Unit Test), entegrasyon testleri ve CI/CD otomasyon süreçlerini uygulayarak kesintisiz dağıtım sağlamak.'
    ],
    toolsAndTech: ['TypeScript / Node.js', 'Go / Java / Python', 'PostgreSQL / MongoDB', 'Docker & Kubernetes', 'Redis / Kafka', 'Git / GitHub CI/CD'],
    dailyRoutine: 'Güne günlük ekip toplantısı (Daily Standup) ile başlar; kod geliştirme görevlerini tamamlar, PR incelemeleri yapar ve sprint hedeflerini günceller.',
    education: ['Bilgisayar Mühendisliği', 'Yazılım Mühendisliği', 'Bilişim Sistemleri Mühendisliği'],
    skills: ['Sistem Mimarisi', 'Algoritmalar & Veri Yapıları', 'Bulut Bilişim', 'Temiz Kod (Clean Code)', 'Dağıtık Sistemler'],
    certifications: [
      { name: 'AWS Certified Developer / Solutions Architect', issuer: 'Amazon Web Services' },
      { name: 'Professional Scrum Developer (PSD)', issuer: 'Scrum.org' }
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
      'Kubernetes kümelerinin (EKS, GKE) orkestrasyonunu, pod autoscaling ve ağ politikalarını (Ingress, Service Mesh) yönetmek.',
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
      { name: 'AWS Certified Solutions Architect - Associate/Professional', issuer: 'Amazon Web Services' }
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
  'kurumsal-avukat': {
    tasks: [
      'Şirketin akdedeceği yerli ve yabancı ticari sözleşmeleri (tedarik, lisans, gizlilik, ortaklık) hazırlamak, müzakere etmek ve revize etmek.',
      'Şirket genel kurul, yönetim kurulu kararları ve sermaye artırımı/azaltımı gibi Türk Ticaret Kanunu işlemlerini yürütmek.',
      'İş Kanunu uyarınca personel fesih süreçleri, iş sözleşmeleri ve işçi-işveren uyuşmazlıklarında hukuki riskleri minimize etmek.',
      'KVKK ve sektörel düzenleyici otoriteler (BDDK, SPK, Rekabet Kurumu) nezdindeki uyum süreçlerini koordine etmek.',
      'Şirket aleyhine açılan davalarda ve icra takiplerinde savunma stratejilerini belirleyip duruşmalara katılmak.'
    ],
    toolsAndTech: ['UYAP Avukat Portalı', 'Lexpera / Kazancı İçtihat Programları', 'Kurumsal Sözleşme Yönetim Sistemleri (CLM)', 'İcra Takip Programları', 'Microsoft Office & Teams'],
    dailyRoutine: 'Sözleşme taslaklarının incelenmesi, iç departmanlardan gelen hukuki görüş taleplerinin cevaplanması ve adliye/arabuluculuk görüşmelerinin takibi.',
    education: ['Hukuk Fakültesi (Lisans)', 'Avukatlık Stajı ve Baro Levhasına Kayıt'],
    skills: ['Ticaret Hukuku', 'Sözleşme Müzakeresi', 'İş Hukuku', 'Risk Analizi', 'Hukuki Mütalaa Yazımı'],
    certifications: [
      { name: 'Baro Ruhsatnamesi', issuer: 'Türkiye Barolar Birliği' },
      { name: 'Arabuluculuk Sicil Kaydı', issuer: 'Adalet Bakanlığı' },
      { name: 'TOEFL / ILEC Hukuk İngilizcesi', issuer: 'Cambridge ESOL' }
    ]
  },
  'mali-musavir': {
    tasks: [
      'Şirketlerin genel muhasebe kayıtlarını Tek Düzen Hesap Planı ve Vergi Usul Kanunu standartlarına uygun tutmak.',
      'KDV, Muhtasar, Geçici Vergi ve Kurumlar Vergisi beyannamelerini hazırlayarak GİB sistemine yasal süresi içinde iletmek.',
      'E-Fatura, e-Arşiv, e-İrsaliye ve e-Defter süreçlerini denetlemek ve beratlarını onaylamak.',
      'Bordro, SGK bildirgeleri, kıdem-ihbar tazminatı hesaplamaları ve istihdam teşviklerinden maksimum yararlanmayı sağlamak.',
      'Dönem sonu envanter ve bilanço kapanışlarını yaparak gelir tablosu ve finansal analiz raporları sunmak.'
    ],
    toolsAndTech: ['Luca / Zirve / Logo / Mikro Muhasebe', 'GİB İnternet Vergi Dairesi', 'SGK E-Bildirge', 'ERP Finans Modülleri (SAP FI)', 'İleri Düzey Excel'],
    dailyRoutine: 'Fatura ve banka ekstrelerinin işlenmesi, vergi beyanname kontrolleri, SGK giriş-çıkış bildirimleri ve mükellef danışmanlığı.',
    education: ['İşletme', 'İktisat', 'Maliye', 'Muhasebe ve Finans Yönetimi'],
    skills: ['Vergi Mevzuatı', 'Tekdüzen Hesap Planı', 'Mali Tablolar Analizi', 'SGK Mevzuatı', 'Denetim & Raporlama'],
    certifications: [
      { name: 'Serbest Muhasebeci Mali Müşavirlik (SMMM) Ruhsatı', issuer: 'TÜRMOB' },
      { name: 'Bağımsız Denetçi Belgesi', issuer: 'KGK (Kamu Gözetimi Kurumu)' }
    ]
  },
  'makine-muhendisi': {
    tasks: [
      'Mekanik sistemlerin, parçaların ve makinelerin 3 boyutlu bilgisayar destekli tasarımlarını (CAD) yapmak.',
      'Sonlu Elemanlar Analizi (FEA) ve Hesaplamalı Akışkanlar Dinamiği (CFD) ile gerilme, yorulma ve ısı transferi simülasyonları yürütmek.',
      'Talaşlı imalat, döküm, sac şekillendirme ve kaynak süreçleri için teknik imalat resimlerini ve toleranslarını (GD&T) hazırlamak.',
      'Üretim hattında prototip testlerini denetlemek, kalite sapmalarını tespit edip tasarım revizyonları yapmak.',
      'Makinelerin montaj talimatlarını, bakım prosedürlerini ve CE uygunluk teknik dosyalarını hazırlamak.'
    ],
    toolsAndTech: ['SolidWorks / CATIA / Siemens NX', 'ANSYS Mechanical / Fluent', 'AutoCAD', 'SAP Üretim Modülü (PP)', '3D Ölçüm & CMM'],
    dailyRoutine: 'Tasarım revizyonları, simülasyon analizlerinin çözümlenmesi, atölye/fabrika üretim kontrolleri ve tedarikçi teknik görüşmeleri.',
    education: ['Makine Mühendisliği', 'Mekatronik Mühendisliği', 'İmalat Mühendisliği'],
    skills: ['3D CAD Modelleme', 'Sonlu Elemanlar Analizi', 'Mukavemet & Malzeme Bilgisi', 'İmalat Yöntemleri', 'Geometrik Toleranslandırma (GD&T)'],
    certifications: [
      { name: 'CSWP (Certified SolidWorks Professional)', issuer: 'Dassault Systèmes' },
      { name: 'ANSYS FEA Specialist', issuer: 'ANSYS' }
    ]
  },
  'endustri-muhendisi': {
    tasks: [
      'Üretim veya hizmet hatlarında iş etüdü, zaman etüdü ve darboğaz (bottleneck) analizleri yaparak verimliliği artırmak.',
      'Yalın Üretim (Lean), 5S, Kaizen ve Altı Sigma metodolojilerini sahada uygulayarak fire ve israf oranlarını düşürmek.',
      'Tedarik zinciri, emniyet stoku ve hammadde ihtiyaç planlamasını (MRP / ERP) optimize etmek.',
      'Tesis yerleşimi, lojistik rotalama ve depo yönetimi süreçlerinin simülasyon modellerini kurmak.',
      'Birim maliyet analizleri yaparak üst yönetime yatırım geri dönüş süresi (ROI) ve süreç fizibilite raporları sunmak.'
    ],
    toolsAndTech: ['SAP / Oracle ERP', 'Arena / AnyLogic Simülasyon', 'Microsoft Power BI / Tableau', 'Minitab (İstatistik)', 'Python / SQL'],
    dailyRoutine: 'Üretim göstergelerinin (OEE) analizi, Kaizen toplantıları, hat dengeleme çalışmaları ve kapasite planlama güncellemeleri.',
    education: ['Endüstri Mühendisliği', 'İşletme Mühendisliği', 'Sistem Mühendisliği'],
    skills: ['Yalın Üretim', 'Süreç Optimizasyonu', 'Tedarik Zinciri Yönetimi', 'Veri Analitiği', 'Proje Yönetimi'],
    certifications: [
      { name: 'Lean Six Sigma Green / Black Belt', issuer: 'IASSC / ASQ' },
      { name: 'PMP (Project Management Professional)', issuer: 'PMI' }
    ]
  },
  'uzman-hekim': {
    tasks: [
      'Poliklinik hastalarının klinik muayenesini yapmak, ileri radyolojik ve biyokimyasal tetkikleri yorumlamak ve kesin tanı koymak.',
      'Cerrahi branşlarda ameliyatları gerçekleştirmek; dahili branşlarda farmakolojik tedavi protokollerini planlamak ve takip etmek.',
      'Yoğun bakım veya yatan servis hastalarının vizitlerini yaparak vital bulgularındaki değişikliklere anında müdahale etmek.',
      'Acil servis konsültasyonlarını karşılamak ve kritik hastaların sevk/tedavi kararlarını yönetmek.',
      'Tıbbi literatürü, güncel kılavuzları ve klinik araştırmaları takip ederek tedavileri kanıta dayalı tıp ilkeleriyle güncellemek.'
    ],
    toolsAndTech: ['Hastane Bilgi Yönetim Sistemi (HBYS)', 'PACS Radyoloji Görüntüleme', 'E-Reçete & E-Nabız', 'Branşa Özgü Cerrahi / Medikal Cihazlar'],
    dailyRoutine: 'Sabah servis viziti, gün boyu cerrahi ameliyatlar veya poliklinik hasta muayeneleri, konsültasyon yanıtları ve vaka raporlaması.',
    education: ['Tıp Fakültesi (6 Yıl Lisans)', 'Tıpta Uzmanlık Sınavı (TUS)', 'Uzmanlık Eğitimi (4-5 Yıl Asistanlık)'],
    skills: ['Klinik Karar Verme', 'Cerrahi / Girişimsel Beceriler', 'Hasta & Aile İletişimi', 'Kriz Yönetimi', 'Kanıta Dayalı Tıp'],
    certifications: [
      { name: 'Uzman Hekimlik Belgesi', issuer: 'Sağlık Bakanlığı' },
      { name: 'Branş Derneği Yeterlilik Belgesi (Board)', issuer: 'İlgili Uzmanlık Derneği' }
    ]
  },
  'klinik-psikolog': {
    tasks: [
      'Danışanların psikolojik durumunu, duygu durum bozukluklarını ve travmalarını klinik görüşme yöntemleriyle değerlendirmek.',
      'Bilişsel Davranışçı Terapi (BDT), Şema Terapi veya EMDR ekolleri çerçevesinde bireysel veya çift terapi seansları yürütmek.',
      'Gerektiğinde standart psikolojik test ve kişilik envanterlerini (MMPI, Rorschach, WISC-R vb.) uygulamak ve raporlamak.',
      'Danışanın tıbbi veya farmakolojik tedaviye ihtiyaç duyması halinde psikiyatristlerle multidisipliner koordinasyon sağlamak.',
      'Danışan gizliliği ve etik kurallarına tam uyum göstererek seans notlarını ve vaka formülasyonlarını arşivlemek.'
    ],
    toolsAndTech: ['Klinik Değerlendirme Testleri', 'Seans Takip & Randevu Yazılımları', 'Online Terapi Platformları', 'SPSS İstatistik Yazılımı'],
    dailyRoutine: 'Günde 4-6 seans danışan görüşmesi, seanslar arası vaka analizi, süpervizyon görüşmeleri ve dosya tutulması.',
    education: ['Psikoloji (Lisans)', 'Klinik Psikoloji Tezli Yüksek Lisans (Uzmanlık)'],
    skills: ['Psikoterapi Ekolleri', 'Aktif Dinleme & Empati', 'Kriz Müdahalesi', 'Psikometrik Test Uygulaması', 'Vaka Formülasyonu'],
    certifications: [
      { name: 'Bilişsel Davranışçı Terapi (BDT) Terapist Sertifikası', issuer: 'Bilişsel Davranışçı Psikoterapiler Derneği' },
      { name: 'EMDR 1. ve 2. Düzey Uygulayıcı Belgesi', issuer: 'EMDR Derneği' }
    ]
  },
  'dijital-pazarlama-uzmani': {
    tasks: [
      'Google Arama, Görüntülü Reklam ve Meta (Instagram/Facebook) reklam kampanyalarını hedef kitle segmentasyonuyla kurmak.',
      'Reklam bütçelerini ROAS (Reklam Harcaması Getirisi), CPA (Edinme Başı Maliyet) ve CTR metriklerine göre günlük optimize etmek.',
      'Web sitesi dönüşüm hunilerini (funnel) ve kullanıcı davranışlarını GA4 ve Hotjar üzerinden analiz etmek.',
      'A/B testleri ile açılış sayfalarının (landing page) ve reklam kreatiflerinin dönüşüm oranlarını artırmak.',
      'E-posta pazarlama (retargeting/nurturing) otomasyonlarını ve sosyal medya içerik takvimini koordine etmek.'
    ],
    toolsAndTech: ['Google Ads & Meta Ads Manager', 'Google Analytics 4 (GA4)', 'Google Tag Manager (GTM)', 'Ahrefs / SEMrush', 'HubSpot / Mailchimp', 'Canva / Figma Temelleri'],
    dailyRoutine: 'Günlük kampanya bütçe ve harcama kontrolleri, dönüşüm metriklerinin analizi, kreatif test sonuçlarının değerlendirilmesi ve haftalık performans raporlaması.',
    education: ['İşletme', 'İktisat', 'Pazarlama', 'İletişim / Yeni Medya'],
    skills: ['Performans Reklamcılığı', 'Veri Analitiği', 'Dönüşüm Optimizasyonu (CRO)', 'Hedef Kitle Segmentasyonu', 'Bütçe Yönetimi'],
    certifications: [
      { name: 'Google Ads Search & Display Certification', issuer: 'Google Digital Academy' },
      { name: 'Meta Certified Digital Marketing Associate', issuer: 'Meta Blueprint' }
    ]
  },
  'ui-ux-tasarimci': {
    tasks: [
      'Kullanıcı araştırmaları, derinlemesine mülakatlar ve persona analizleri yaparak kullanıcı ihtiyaçlarını ve acı noktalarını haritalamak.',
      'Web ve mobil ürünler için bilgi mimarisi (Information Architecture), kullanıcı akışları (User Flows) ve wireframe çizimleri hazırlamak.',
      'Figma üzerinde ölçeklenebilir tasarım sistemleri (Design Systems), UI bileşen kütüphaneleri ve etkileşimli prototipler geliştirmek.',
      'Kullanılabilirlik testleri (Usability Testing) düzenleyerek tasarım kararlarını somut kullanıcı verileriyle doğrulamak.',
      'Geliştirici ekipleriyle (Frontend) el sıkışarak (Hand-off) piksel mükemmelliğinde tasarımların koda dönüştürülmesini denetlemek.'
    ],
    toolsAndTech: ['Figma / FigJam', 'Adobe XD / Illustrator', 'Miro / Notion', 'Maze / UserTesting (Kullanılabilirlik)', 'HTML/CSS Temelleri'],
    dailyRoutine: 'Arayüz tasarımı üretimi, tasarım sistemi güncellemeleri, ürün yöneticileri ve yazılımcılarla tasarım inceleme (design critique) toplantıları.',
    education: ['Grafik Tasarımı', 'Görsel İletişim Tasarımı', 'Endüstriyel Tasarım', 'Bilgisayar Teknolojileri'],
    skills: ['Kullanıcı Deneyimi (UX)', 'Kullanıcı Arayüzü (UI)', 'Prototipleme', 'Tasarım Sistemleri', 'Kullanılabilirlik Testleri'],
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Coursera / Google' },
      { name: 'Nielsen Norman Group UX Master Certified', issuer: 'NN/g' }
    ]
  }
};

export function getProfessionDetails(slug: string, title: string = '', category: string = ''): DetailedRoleInfoWithQuestions {
  const roleProfile = DETAILED_PROFESSION_PROFILES[slug];
  const defaultQuestions: InterviewQuestion[] = [
    {
      question: `${title} olarak geçmişte karşılaştığınız en karmaşık teknik/operasyonel krizi ve bunu nasıl çözdüğünüzü anlatır mısınız?`,
      category: 'Vaka & Kriz Çözümü',
      tip: 'STAR metodolojisini (Situation, Task, Action, Result) kullanarak somut verilerle ve aldığınız kişisel inisiyatifle yanıt verin.'
    },
    {
      question: `Farklı departmanlardan gelen öncelik çatışmalarında veya acil teslimat baskısı altında iş yükünüzü nasıl yönetirsiniz?`,
      category: 'Davranışsal / İK',
      tip: 'Etki/çaba matrisi, açık iletişim ve paydaş yönetimi becerilerinizi örnekleyin.'
    },
    {
      question: `${title} alanında son 1 yılda gelişen yeni trendleri, teknolojileri ve mevzuat değişikliklerini nasıl takip ediyorsunuz?`,
      category: 'Teknik / Mesleki',
      tip: 'Takip ettiğiniz sektörel yayınları, katıldığınız eğitimleri veya hayata geçirdiğiniz kişisel projeleri belirtin.'
    },
    {
      question: `Daha önce uyguladığınız ve beklediğiniz sonucu vermeyen bir kararınız oldu mu? Bu deneyimden ne öğrendiniz?`,
      category: 'Davranışsal / İK',
      tip: 'Sorumluluk alma olgunluğunuzu, özeleştiri yeteneğinizi ve aldığınız önleyici aksiyonu dürüstçe açıklayın.'
    }
  ];

  if (roleProfile) {
    return {
      ...roleProfile,
      interviewQuestions: roleProfile.interviewQuestions || defaultQuestions
    };
  }

  // Smart domain-based fallback generator for any of the 800+ professions
  const cat = (category + ' ' + title).toLowerCase();

  return {
    tasks: [
      `${title} süreçlerinin ve kurumsal iş hedeflerinin mevzuat ve kalite standartlarına uygun icra edilmesi.`,
      `İlgili departmanlar, paydaşlar ve teknik ekiplerle koordinasyon sağlayarak periyodik raporların hazırlanması.`,
      `Sektörel güncellemelerin, yenilikçi teknolojilerin ve verimlilik artıran metotların iş akışına adapte edilmesi.`,
      `Olası operasyonel risklerin önceden tespit edilerek önleyici aksiyon planlarının hayata geçirilmesi.`,
      `Müşteri, danışan veya iç paydaş memnuniyetini artıracak standart operasyon prosedürlerinin (SOP) uygulanması.`
    ],
    toolsAndTech: ['Sektörel ERP & Veri Sistemleri', 'Microsoft Office / 365 Araçları', 'İletişim & Proje Yönetim Araçları', 'Raporlama & İş Zekası Sistemleri'],
    dailyRoutine: 'Günlük operasyonel planlama, paydaş taleplerinin karşılanması, süreç kontrolleri ve performans raporlaması.',
    education: ['İlgili 4 Yıllık Üniversite Lisans / Meslek Yüksekokulu Bölümleri', 'Sektörel Uzmanlık Eğitimleri'],
    skills: ['Analitik Düşünme & Problem Çözme', 'Zaman Yönetimi', 'Sektörel Mevzuat Bilgisi', 'Yazılı & Sözlü İletişim', 'Takım Çalışması'],
    certifications: [
      { name: 'Mesleki Yeterlilik Kurumu (MYK) Belgesi', issuer: 'Yetkili Akreditasyon Kurumu' },
      { name: 'İleri Seviye Sektörel Yetkinlik Sertifikası', issuer: 'Meslek Odası / Enstitü' }
    ],
    interviewQuestions: defaultQuestions
  };
}

export const getDetailedRoleInfo = getProfessionDetails;

