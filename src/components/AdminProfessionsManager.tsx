'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  Filter,
  Layers,
  TrendingUp,
  Mail,
  Send,
  Sparkles,
  Copy,
  Users,
  Check,
  Inbox,
  ArrowRight,
  Download,
  FileSpreadsheet,
  CheckCheck,
  Clock,
  ShieldAlert,
  Database,
  RefreshCw,
  Ban,
  UserCheck,
} from 'lucide-react';

interface ProfessionItem {
  id?: string;
  slug: string;
  title: string;
  category: string;
  isco_code?: string;
  description?: string;
  min_salary: number;
  median_salary: number;
  max_salary: number;
  sample_count: number;
  grade?: string;
  status?: string;
  updated_at?: string;
}

interface DemandItem {
  major_slug: string;
  major_name: string;
  faculty_name: string;
  vote_count: number;
}

interface SubscriberItem {
  id: number;
  faculty_name: string;
  major_name: string;
  major_slug: string;
  email: string;
  status: string;
  created_at: string;
}

interface NewsletterItem {
  id: number;
  email: string;
  source: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

interface SalarySubmissionItem {
  id: string;
  profession_slug: string;
  salary_amount: number;
  gross_or_net: string;
  city: string;
  sector: string;
  experience_years: number;
  employment_type: string;
  company_size: string;
  bonus_included: number;
  status: string;
  ip_hash?: string;
  created_at: string;
}

type TabType = 'professions' | 'newsletter' | 'demands' | 'submissions' | 'spark';

// CSV Exporter Helper with UTF-8 BOM for Turkish character support in Excel
function downloadCSV(filename: string, headers: string[], rows: (string | number | undefined | null)[][]) {
  const content = [
    headers.join(';'),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(';')
    ),
  ].join('\r\n');

  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function AdminProfessionsManager({
  initialProfessions = [],
}: {
  initialProfessions?: ProfessionItem[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>('professions');
  const [professions, setProfessions] = useState<ProfessionItem[]>(initialProfessions);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Newsletter State
  const [newsletterList, setNewsletterList] = useState<NewsletterItem[]>([]);
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  const [newsletterSearch, setNewsletterSearch] = useState('');
  const [newsletterFilter, setNewsletterFilter] = useState<'ALL' | 'active'>('ALL');
  const [quickAddEmail, setQuickAddEmail] = useState('');
  const [isAddingNewsletter, setIsAddingNewsletter] = useState(false);

  // Demands & Student Leads state
  const [demands, setDemands] = useState<DemandItem[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loadingDemands, setLoadingDemands] = useState(false);
  const [demandsSearch, setDemandsSearch] = useState('');
  const [sendingMajorSlug, setSendingMajorSlug] = useState<string | null>(null);

  // Salary Submissions Moderation State
  const [submissionsList, setSubmissionsList] = useState<SalarySubmissionItem[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState('ALL');

  // Copied prompt state
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Spark Automation State
  const [isSparkRunning, setIsSparkRunning] = useState(false);
  const [sparkResult, setSparkResult] = useState<any | null>(null);

  // Modal & Notification states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state for professions
  const [formData, setFormData] = useState<ProfessionItem>({
    slug: '',
    title: '',
    category: 'Bilişim & SaaS',
    isco_code: '2512',
    description: '',
    min_salary: 45000,
    median_salary: 75000,
    max_salary: 120000,
    sample_count: 250,
    grade: 'Grade B',
    status: 'published',
  });

  const categories = Array.from(new Set(professions.map((p) => p.category))).filter(Boolean);

  // Fetchers
  const fetchProfessions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/professions');
      const data = await res.json();
      if (data.success && data.data) {
        setProfessions(data.data);
      }
    } catch (err: any) {
      console.error('Fetch professions error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsletter = async () => {
    setLoadingNewsletter(true);
    try {
      const res = await fetch('/api/admin/newsletter');
      const data = await res.json();
      if (data.success && data.data) {
        setNewsletterList(data.data);
      }
    } catch (err: any) {
      console.error('Fetch newsletter error:', err);
    } finally {
      setLoadingNewsletter(false);
    }
  };

  const fetchDemands = async () => {
    setLoadingDemands(true);
    try {
      const res = await fetch('/api/admin/notify-subscribers');
      const data = await res.json();
      if (data.success) {
        setDemands(data.demands || []);
        setSubscribers(data.subscribers || []);
      }
    } catch (err: any) {
      console.error('Fetch demands error:', err);
    } finally {
      setLoadingDemands(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch('/api/admin/submissions');
      const data = await res.json();
      if (data.success && data.data) {
        setSubmissionsList(data.data);
      }
    } catch (err: any) {
      console.error('Fetch submissions error:', err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchProfessions();
    fetchDemands();
    fetchNewsletter();
    fetchSubmissions();
  }, []);

  // Quick Add Newsletter Subscriber
  const handleQuickAddNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddEmail || !quickAddEmail.includes('@')) {
      setNotification({ type: 'error', message: 'Lütfen geçerli bir e-posta adresi girin.' });
      return;
    }

    setIsAddingNewsletter(true);
    setNotification(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: quickAddEmail, source: 'admin_manuel_kayit' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Abone eklenemedi.');
      }
      setNotification({ type: 'success', message: `'${quickAddEmail}' başarıyla bültene abone yapıldı!` });
      setQuickAddEmail('');
      fetchNewsletter();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setIsAddingNewsletter(false);
    }
  };

  // Delete Newsletter Subscriber
  const handleDeleteNewsletter = async (id: number, email: string) => {
    if (!window.confirm(`'${email}' adresini bülten abonelerinden kaldırmak istediğinizden emin misiniz?`)) return;

    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ type: 'success', message: `'${email}' bülten listesinden silindi.` });
        fetchNewsletter();
      } else {
        setNotification({ type: 'error', message: data.error || 'Silme işlemi başarısız.' });
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  // Update Salary Submission Status
  const handleUpdateSubmissionStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ type: 'success', message: `Maaş bildirimi durumu '${status}' olarak güncellendi.` });
        fetchSubmissions();
      } else {
        setNotification({ type: 'error', message: data.error || 'Güncelleme başarısız.' });
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  // Delete Salary Submission
  const handleDeleteSubmission = async (id: string) => {
    if (!window.confirm('Bu maaş bildirimini veritabanından kalıcı olarak silmek istediğinizden emin misiniz?')) return;

    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ type: 'success', message: 'Maaş bildirimi başarıyla silindi.' });
        fetchSubmissions();
      } else {
        setNotification({ type: 'error', message: data.error || 'Silme işlemi başarısız.' });
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  // Send major notifications to student leads
  const handleSendNotification = async (majorSlug: string, majorName: string) => {
    if (!window.confirm(`'${majorName}' için bekleyen öğrencilere duyuru e-postası göndermek istiyor musunuz?`)) {
      return;
    }

    setSendingMajorSlug(majorSlug);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/notify-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ majorSlug }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'E-posta gönderiminde hata oluştu.');
      }

      setNotification({
        type: 'success',
        message: data.message || `Tebrikler! ${data.sentCount} öğrenciye e-posta duyurusu iletildi.`,
      });

      fetchDemands();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setSendingMajorSlug(null);
    }
  };

  // Run Gemini Spark
  const handleRunSpark = async (forceMajorSlug?: string) => {
    setIsSparkRunning(true);
    setSparkResult(null);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/spark/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ majorSlug: forceMajorSlug }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Spark otomasyonu çalıştırılırken bir hata oluştu.');
      }

      setSparkResult(data);
      setNotification({
        type: 'success',
        message: data.message || 'Gemini Spark analizi tamamlandı ve meslekler yayına alındı!',
      });

      fetchProfessions();
      fetchDemands();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setIsSparkRunning(false);
    }
  };

  // Copy helper
  const copyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2500);
  };

  // CSV Export Handlers
  const handleExportNewsletterCSV = () => {
    downloadCSV(
      `piyasa-bulten-aboneleri-${new Date().toISOString().slice(0, 10)}.csv`,
      ['ID', 'E-posta', 'Kayıt Kaynağı', 'Durum', 'Kayıt Tarihi'],
      newsletterList.map((n) => [n.id, n.email, n.source, n.status, n.created_at])
    );
  };

  const handleExportStudentsCSV = () => {
    downloadCSV(
      `piyasa-ogrenci-talepleri-${new Date().toISOString().slice(0, 10)}.csv`,
      ['ID', 'E-posta', 'Talep Edilen Bölüm', 'Fakülte', 'Durum', 'Talep Tarihi'],
      subscribers.map((s) => [s.id, s.email, s.major_name, s.faculty_name, s.status, s.created_at])
    );
  };

  const handleExportSubmissionsCSV = () => {
    downloadCSV(
      `piyasa-maas-bildirimleri-${new Date().toISOString().slice(0, 10)}.csv`,
      [
        'ID',
        'Meslek Slug',
        'Maaş Tutarı (TL)',
        'Net/Brüt',
        'Deneyim (Yıl)',
        'Şehir',
        'Sektör',
        'Şirket Ölçeği',
        'Durum',
        'Tarih',
      ],
      submissionsList.map((s) => [
        s.id,
        s.profession_slug,
        s.salary_amount,
        s.gross_or_net,
        s.experience_years,
        s.city,
        s.sector,
        s.company_size,
        s.status,
        s.created_at,
      ])
    );
  };

  // Profession Modal Handlers
  const handleOpenAdd = () => {
    setFormData({
      slug: '',
      title: '',
      category: 'Bilişim & SaaS',
      isco_code: '2512',
      description: '',
      min_salary: 45000,
      median_salary: 75000,
      max_salary: 120000,
      sample_count: 250,
      grade: 'Grade B',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: ProfessionItem) => {
    setFormData({
      ...p,
      min_salary: Number(p.min_salary) || 45000,
      median_salary: Number(p.median_salary) || 75000,
      max_salary: Number(p.max_salary) || 120000,
      sample_count: Number(p.sample_count) || 250,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProfession = async (slug: string, title: string) => {
    if (!window.confirm(`'${title}' mesleğini silmek istediğinizden emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/professions?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ type: 'success', message: `'${title}' başarıyla silindi.` });
        fetchProfessions();
      } else {
        setNotification({ type: 'error', message: data.error || 'Silme işlemi başarısız.' });
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const handleSubmitProfession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/professions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Kaydetme işlemi başarısız.');
      }

      setNotification({
        type: 'success',
        message: `'${data.data.title}' mesleği Cloudflare D1 veritabanına kaydedildi ve canlıya alındı!`,
      });

      setIsModalOpen(false);
      fetchProfessions();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered lists
  const filteredProfessions = professions.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredNewsletter = newsletterList.filter((item) => {
    const matchesSearch = item.email.toLowerCase().includes(newsletterSearch.toLowerCase());
    const matchesFilter = newsletterFilter === 'ALL' || item.status === newsletterFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredSubscribers = subscribers.filter((s) => {
    if (!demandsSearch) return true;
    const q = demandsSearch.toLowerCase();
    return (
      s.email.toLowerCase().includes(q) ||
      s.major_name.toLowerCase().includes(q) ||
      s.faculty_name.toLowerCase().includes(q)
    );
  });

  const filteredSubmissions = submissionsList.filter((item) => {
    const matchesSearch =
      !submissionSearch ||
      item.profession_slug.toLowerCase().includes(submissionSearch.toLowerCase()) ||
      item.city.toLowerCase().includes(submissionSearch.toLowerCase()) ||
      item.sector.toLowerCase().includes(submissionSearch.toLowerCase());
    const matchesStatus =
      submissionStatusFilter === 'ALL' || item.status === submissionStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('professions')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'professions'
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Meslek Veri Tabanı ({professions.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('newsletter');
            fetchNewsletter();
          }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'newsletter'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Mail className="w-4 h-4 text-sky-400" />
          <span>Haftalık Bülten Aboneleri ({newsletterList.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('demands');
            fetchDemands();
          }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'demands'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-400" />
          <span>Öğrenci Talepleri & E-postalar ({subscribers.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('submissions');
            fetchSubmissions();
          }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'submissions'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Maaş Moderasyon Havuzu ({submissionsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('spark')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'spark'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Gemini Spark Asistanı</span>
        </button>
      </div>

      {/* Global Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold animate-in fade-in duration-200 ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: MESLEKLER & MAAŞLAR */}
      {/* ========================================================================= */}
      {activeTab === 'professions' && (
        <>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Meslek adı, slug veya ISCO kodu ile ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  <option value="ALL">Tüm Kategoriler ({professions.length})</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={fetchProfessions}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                title="Listeyi Yenile"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Yenile</span>
              </button>

              <button
                onClick={handleOpenAdd}
                className="flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Meslek Ekle</span>
              </button>
            </div>
          </div>

          {/* Professions Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Meslek Unvanı</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4 text-center">TÜİK / ISCO</th>
                    <th className="py-3 px-4 text-right">P25 Taban</th>
                    <th className="py-3 px-4 text-right">P50 Medyan</th>
                    <th className="py-3 px-4 text-right">P75 Tavan</th>
                    <th className="py-3 px-4 text-center">Örneklem</th>
                    <th className="py-3 px-4 text-center">Güven</th>
                    <th className="py-3 px-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProfessions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-500 text-xs">
                        Arama kriterlerine uygun meslek bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredProfessions.map((p) => (
                      <tr key={p.slug} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm flex items-center space-x-2">
                            <span>{p.title}</span>
                            <a
                              href={`/meslek/${p.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-teal-400"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">/meslek/{p.slug}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{p.category}</td>
                        <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-400">
                          {p.isco_code || '-'}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-400">
                          {p.min_salary ? p.min_salary.toLocaleString('tr-TR') + ' ₺' : '-'}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-teal-300">
                          {p.median_salary ? p.median_salary.toLocaleString('tr-TR') + ' ₺' : '-'}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-400">
                          {p.max_salary ? p.max_salary.toLocaleString('tr-TR') + ' ₺' : '-'}
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                          {p.sample_count || 100}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.grade === 'Grade A'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : p.grade === 'Grade B'
                                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {p.grade || 'Grade B'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProfession(p.slug, p.title)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HAFTALIK BÜLTEN ABONELERİ */}
      {/* ========================================================================= */}
      {activeTab === 'newsletter' && (
        <div className="space-y-6">
          {/* Quick Stats & Add Subscriber Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Hızlı Abone Ekle (Manuel Kayıt)</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Arkadaşınızı veya bültene doğrudan eklemek istediğiniz e-posta adresini buraya girerek anında Cloudflare D1 veritabanına kaydedebilirsiniz.
              </p>
              <form onSubmit={handleQuickAddNewsletter} className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="abone@ornek.com..."
                  value={quickAddEmail}
                  onChange={(e) => setQuickAddEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  disabled={isAddingNewsletter}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingNewsletter ? 'Ekleniyor...' : 'Bültene Ekle'}</span>
                </button>
              </form>
            </div>

            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Bülten İstatistikleri</span>
                <div className="text-2xl font-bold text-white">
                  {newsletterList.length}{' '}
                  <span className="text-xs font-normal text-slate-400">Toplam Abone</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  {newsletterList.filter((n) => n.status === 'active').length} Aktif Gönderim Durumunda
                </div>
              </div>

              <button
                onClick={handleExportNewsletterCSV}
                disabled={newsletterList.length === 0}
                className="mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-sky-300 text-xs font-bold rounded-xl border border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV Olarak Dışa Aktar (Excel)</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Abone e-posta adreslerinde ara..."
                value={newsletterSearch}
                onChange={(e) => setNewsletterSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={newsletterFilter}
                onChange={(e: any) => setNewsletterFilter(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="ALL">Tüm Durumlar ({newsletterList.length})</option>
                <option value="active">Yalnızca Aktif Olanlar</option>
              </select>

              <button
                onClick={fetchNewsletter}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                title="Yenile"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingNewsletter ? 'animate-spin' : ''}`} />
                <span>Yenile</span>
              </button>
            </div>
          </div>

          {/* Newsletter Subscribers Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">
                  Kayıtlı Bülten Aboneleri Listesi ({filteredNewsletter.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Veritabanı: newsletter_subscribers</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">E-posta Adresi</th>
                    <th className="py-3 px-4">Kayıt Kaynağı</th>
                    <th className="py-3 px-4">Kayıt Tarihi</th>
                    <th className="py-3 px-4 text-center">Durum</th>
                    <th className="py-3 px-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredNewsletter.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-slate-500 text-xs">
                        {loadingNewsletter
                          ? 'Aboneler yükleniyor...'
                          : 'Henüz kayıtlı bülten abonesi bulunmuyor. Yukarıdaki formdan arkadaşınızı ekleyebilirsiniz.'}
                      </td>
                    </tr>
                  ) : (
                    filteredNewsletter.map((sub, idx) => (
                      <tr key={sub.id || idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                        <td className="py-3 px-4 font-mono font-bold text-sky-300 text-sm">
                          {sub.email}
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                            {sub.source || 'homepage_footer'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {sub.created_at ? new Date(sub.created_at).toLocaleString('tr-TR') : '-'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sub.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {sub.status === 'active' ? 'Aktif Abone' : 'Pasif'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteNewsletter(sub.id, sub.email)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Aboneliği Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ÖĞRENCİ TALEPLERİ & E-POSTALAR */}
      {/* ========================================================================= */}
      {activeTab === 'demands' && (
        <div className="space-y-6">
          {/* Email Routing Info Banner */}
          <div className="bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 rounded-3xl p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Inbox className="w-4 h-4 text-teal-400" />
                  <h3 className="text-sm font-bold text-white">Cloudflare E-posta Yönlendirme (Aktif)</h3>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-teal-300">info@piyasa.work</strong> ve tüm{' '}
                  <strong className="text-teal-300">*@piyasa.work</strong> adreslerine gelen e-postalar doğrudan{' '}
                  <strong className="text-white">kyhnayas@gmail.com</strong> kutunuza yönlendirilir.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportStudentsCSV}
                  disabled={subscribers.length === 0}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold border border-slate-700 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Öğrenci Listesini CSV İndir</span>
                </button>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex-shrink-0">
                  ● Gelen Kutusu Aktif
                </span>
              </div>
            </div>
          </div>

          {/* Demands Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white">
                  Öğrencilerin En Çok Merak Ettiği Bölümler ({demands.length} Bölüm)
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">Veritabanı: major_demand_counts</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Bölüm Adı</th>
                    <th className="py-3 px-4">Fakülte</th>
                    <th className="py-3 px-4 text-center">Talep Oyu</th>
                    <th className="py-3 px-4 text-center">Bekleyen E-posta</th>
                    <th className="py-3 px-4 text-right">E-posta Bildirimi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {demands.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-500 text-xs">
                        {loadingDemands ? 'Talepler taranıyor...' : 'Henüz talep toplanmadı.'}
                      </td>
                    </tr>
                  ) : (
                    demands.map((d, idx) => {
                      const deptPendingSubs = subscribers.filter(
                        (s) => s.major_slug === d.major_slug && s.status === 'pending'
                      );
                      const isSending = sendingMajorSlug === d.major_slug;

                      return (
                        <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white text-sm">{d.major_name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">/bolum/{d.major_slug}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-400">{d.faculty_name}</td>
                          <td className="py-3 px-4 text-center font-bold text-teal-400">{d.vote_count} Oy</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                              {deptPendingSubs.length} Bekleyen Abone
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleSendNotification(d.major_slug, d.major_name)}
                              disabled={deptPendingSubs.length === 0 || isSending}
                              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                deptPendingSubs.length > 0
                                  ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <Send className="w-3 h-3" />
                              <span>
                                {isSending
                                  ? 'Gönderiliyor...'
                                  : `Duyuru Gönder (${deptPendingSubs.length})`}
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subscribers Raw Log Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-3">
            <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white">
                  E-posta Bırakan Öğrenci Listesi ({filteredSubscribers.length})
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Öğrenci veya bölüm ara..."
                    value={demandsSearch}
                    onChange={(e) => setDemandsSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 w-48 sm:w-64"
                  />
                </div>
                <button
                  onClick={fetchDemands}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                  title="Yenile"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingDemands ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto max-h-80">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 text-[10px] uppercase border-b border-slate-800 sticky top-0 z-10">
                  <tr>
                    <th className="py-2.5 px-4">E-posta</th>
                    <th className="py-2.5 px-4">Talep Edilen Bölüm</th>
                    <th className="py-2.5 px-4">Fakülte</th>
                    <th className="py-2.5 px-4">Tarih</th>
                    <th className="py-2.5 px-4 text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-500">
                        {loadingDemands ? 'Yükleniyor...' : 'Kayıtlı öğrenci e-postası bulunmuyor.'}
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-4 font-mono font-bold text-teal-300">{s.email}</td>
                        <td className="py-2.5 px-4 text-white font-medium">{s.major_name}</td>
                        <td className="py-2.5 px-4 text-slate-400">{s.faculty_name}</td>
                        <td className="py-2.5 px-4 text-slate-400">
                          {s.created_at ? new Date(s.created_at).toLocaleString('tr-TR') : '-'}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              s.status === 'notified'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {s.status === 'notified' ? 'İletildi' : 'Bekliyor'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: MAAŞ BİLDİRİMLERİ & MODERASYON */}
      {/* ========================================================================= */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Meslek slug, şehir veya sektör ile ara..."
                  value={submissionSearch}
                  onChange={(e) => setSubmissionSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={submissionStatusFilter}
                onChange={(e) => setSubmissionStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="ALL">Tüm Durumlar ({submissionsList.length})</option>
                <option value="APPROVED">Onaylananlar (APPROVED)</option>
                <option value="SUBMITTED">Bekleyenler (SUBMITTED)</option>
                <option value="FLAGGED">Şüpheli / Flagged</option>
                <option value="REJECTED">Reddedilenler (REJECTED)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={fetchSubmissions}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                title="Yenile"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingSubmissions ? 'animate-spin' : ''}`} />
                <span>Yenile</span>
              </button>

              <button
                onClick={handleExportSubmissionsCSV}
                disabled={submissionsList.length === 0}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV Olarak İndir</span>
              </button>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Kullanıcı Maaş Beyanları ({filteredSubmissions.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Veritabanı: salary_submissions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Meslek</th>
                    <th className="py-3 px-4 text-right">Maaş Tutarı</th>
                    <th className="py-3 px-4 text-center">Net / Brüt</th>
                    <th className="py-3 px-4 text-center">Deneyim</th>
                    <th className="py-3 px-4">Şehir & Sektör</th>
                    <th className="py-3 px-4">Şirket</th>
                    <th className="py-3 px-4">Tarih</th>
                    <th className="py-3 px-4 text-center">Durum</th>
                    <th className="py-3 px-4 text-right">Moderasyon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-slate-500 text-xs">
                        {loadingSubmissions
                          ? 'Maaş bildirimleri taranıyor...'
                          : 'Henüz kullanıcı maaş bildirimi bulunmuyor. (/maas-bildir sayfası üzerinden paylaşım yapıldığında burada listelenir)'}
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">{sub.profession_slug}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{sub.id}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-300 text-sm">
                          {Number(sub.salary_amount).toLocaleString('tr-TR')} ₺
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                            {sub.gross_or_net}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-slate-300">
                          {sub.experience_years} yıl
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          <div>{sub.city}</div>
                          <div className="text-[10px] text-slate-500">{sub.sector}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          <span className="text-[11px]">{sub.company_size} çalışan</span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {sub.created_at ? new Date(sub.created_at).toLocaleDateString('tr-TR') : '-'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sub.status === 'APPROVED'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : sub.status === 'FLAGGED'
                                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                                : sub.status === 'REJECTED'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          {sub.status !== 'APPROVED' && (
                            <button
                              onClick={() => handleUpdateSubmissionStatus(sub.id, 'APPROVED')}
                              className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-bold transition-colors"
                              title="Onayla"
                            >
                              Onayla
                            </button>
                          )}
                          {sub.status !== 'REJECTED' && (
                            <button
                              onClick={() => handleUpdateSubmissionStatus(sub.id, 'REJECTED')}
                              className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[11px] font-bold transition-colors"
                              title="Reddet"
                            >
                              Reddet
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: GEMINI SPARK ASSISTANT */}
      {/* ========================================================================= */}
      {activeTab === 'spark' && (
        <div className="space-y-6">
          {/* Spark Intro Banner */}
          <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h2 className="text-base font-bold text-white">Piyasa Spark - Günlük Piyasa & Maaş Editörü</h2>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  Google Gemini hesabınızda (<strong className="text-white">kyhnayas@gmail.com</strong>) sizin için özel
                  bir <strong>"Piyasa Spark - Piyasa.work Editörü"</strong> Gem&apos;i oluşturuldu ve İŞKUR, TÜİK, YÖK Atlas
                  ve 2026 piyasa kaynaklarıyla yapılandırıldı.
                </p>
              </div>
              <a
                href="https://gemini.google.com/gems/view"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-md active:scale-95 flex-shrink-0"
              >
                <span>Gemini Gem&apos;e Git</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Spark Automation Engine Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">⚡ Gemini Spark Otomasyon Motoru (Tek Tıkla Canlı Yayın)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  Spark otomasyonu, öğrenci talebi en yüksek YÖK bölümünü otomatik tespit eder, 2026 yılı piyasa maaşlarını (TÜİK & İŞKUR) hesaplar, Cloudflare D1 veritabanına ekler ve varsa e-posta bırakan öğrencilere duyuruyu anında gönderir.
                </p>
              </div>

              <button
                onClick={() => handleRunSpark()}
                disabled={isSparkRunning}
                className="flex items-center space-x-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95 disabled:opacity-50 flex-shrink-0"
              >
                <Sparkles className={`w-4 h-4 ${isSparkRunning ? 'animate-spin' : ''}`} />
                <span>{isSparkRunning ? 'Spark Analiz Ediyor & Yayınlıyor...' : 'Spark Otomasyonunu Şimdi Çalıştır'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400 border-t border-slate-800">
              <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Otomatik Cron: Her Gün 08:00&apos;de Vercel Tarafından Çalıştırılır</span>
              </span>
              <span>Kaynaklar: İŞKUR, TÜİK Kazanç Yapısı, YÖK Atlas Mezun Endeksi, TCMB</span>
            </div>

            {/* Spark Run Result Banner */}
            {sparkResult && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2 animate-in fade-in duration-200">
                <div className="font-bold text-amber-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{sparkResult.message}</span>
                </div>
                {sparkResult.department && (
                  <div className="text-slate-300 text-[11px]">
                    <strong>İncelenen Bölüm:</strong> {sparkResult.department.name} ({sparkResult.department.faculty}) •{' '}
                    <strong>Seçim Sebebi:</strong> {sparkResult.department.reason}
                  </div>
                )}
                {sparkResult.createdProfessions && sparkResult.createdProfessions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {sparkResult.createdProfessions.map((cp: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-200 font-medium text-[11px]"
                      >
                        🎯 {cp.title} — {cp.median_salary.toLocaleString('tr-TR')} ₺ Net (Medyan)
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30 text-[10px] font-bold">
                  GÖREV 1: Sıradaki Bölümü Analiz Et
                </span>
                <button
                  onClick={() =>
                    copyPrompt(
                      'Piyasa.work için sıradaki en çok talep edilen YÖK bölümünü analiz et. İŞKUR açık iş ilanları, TÜİK kazanç yapısı ve sektör ilanlarına göre 2026 yılı güncel medyan net maaşlarını, sorumluluklarını ve mülakat sorularını https://piyasa.work/admin formuna girebileceğim şekilde hazırla.',
                      1
                    )
                  }
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  {copiedPromptIndex === 1 ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>İstemi Kopyala</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-300 font-mono bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                &quot;Piyasa.work için sıradaki en çok talep edilen YÖK bölümünü analiz et. İŞKUR açık iş ilanları, TÜİK kazanç yapısı ve sektör ilanlarına göre 2026 yılı güncel medyan net maaşlarını, sorumluluklarını ve mülakat sorularını https://piyasa.work/admin formuna girebileceğim şekilde hazırla.&quot;
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold">
                  GÖREV 2: Maaş Skalası Güncelleme
                </span>
                <button
                  onClick={() =>
                    copyPrompt(
                      'Piyasa.work üzerindeki [Meslek Adı] mesleği için 2026 yılı güncel enflasyon, asgari ücret artış oranı ve reel piyasa tekliflerine göre P25 taban, P50 medyan ve P75 tavan net maaşlarını TÜİK ve İŞKUR metodolojisiyle güncelle.',
                      2
                    )
                  }
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  {copiedPromptIndex === 2 ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>İstemi Kopyala</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-300 font-mono bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                &quot;Piyasa.work üzerindeki [Meslek Adı] mesleği için 2026 yılı güncel enflasyon, asgari ücret artış oranı ve reel piyasa tekliflerine göre P25 taban, P50 medyan ve P75 tavan net maaşlarını TÜİK ve İŞKUR metodolojisiyle güncelle.&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD / EDIT PROFESSION MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-white">
                  {formData.slug && professions.some((p) => p.slug === formData.slug)
                    ? 'Meslek & Maaş Verilerini Güncelle'
                    : 'Veritabanına Yeni Meslek Ekle'}
                </h3>
                <p className="text-xs text-slate-400">
                  Değişiklikler doğrudan Cloudflare D1 veritabanına işlenir ve sitede hemen görünür.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProfession} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Meslek Başlığı (Unvan)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Frontend Developer"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Slug (URL Uzantısı)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: frontend-developer (boş bırakılırsa otomatik)"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Sektör / Kategori
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Bilişim & Yazılım"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    ISCO-08 / TÜİK Meslek Kodu
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 2512"
                    value={formData.isco_code || ''}
                    onChange={(e) => setFormData({ ...formData, isco_code: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Salary Fields */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                  2026 Yılı Aylık Net Maaş Aralıkları (TL)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">P25 (Taban / Giriş)</label>
                    <input
                      type="number"
                      required
                      min={15000}
                      step={500}
                      value={formData.min_salary}
                      onChange={(e) => setFormData({ ...formData, min_salary: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">P50 (Medyan Maaş)</label>
                    <input
                      type="number"
                      required
                      min={15000}
                      step={500}
                      value={formData.median_salary}
                      onChange={(e) => setFormData({ ...formData, median_salary: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono font-bold text-teal-300 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">P75 (Tavan / Kıdemli)</label>
                    <input
                      type="number"
                      required
                      min={15000}
                      step={500}
                      value={formData.max_salary}
                      onChange={(e) => setFormData({ ...formData, max_salary: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Sample & Grade & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Örneklem Sayısı
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.sample_count}
                    onChange={(e) => setFormData({ ...formData, sample_count: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Güvenilirlik Notu
                  </label>
                  <select
                    value={formData.grade || 'Grade B'}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="Grade A">Grade A (Yüksek Güvenilirlik)</option>
                    <option value="Grade B">Grade B (Standart Piyasa)</option>
                    <option value="Grade C">Grade C (Gelişmekte Olan)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Yayın Durumu
                  </label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="published">Yayında (Published)</option>
                    <option value="draft">Taslak (Draft)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Meslek Tanımı ve Görev Özeti
                </label>
                <textarea
                  rows={3}
                  placeholder="Mesleğin Türkiye iş piyasasındaki rolü ve temel sorumlulukları..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Kaydediliyor...' : 'Kaydet ve Canlıya Al'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
