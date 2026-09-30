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

export function AdminProfessionsManager({ initialProfessions = [] }: { initialProfessions?: ProfessionItem[] }) {
  const [activeTab, setActiveTab] = useState<'professions' | 'demands' | 'spark'>('professions');
  const [professions, setProfessions] = useState<ProfessionItem[]>(initialProfessions);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Demands & Subscribers state
  const [demands, setDemands] = useState<DemandItem[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loadingDemands, setLoadingDemands] = useState(false);
  const [sendingMajorSlug, setSendingMajorSlug] = useState<string | null>(null);

  // Copied prompt state
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Spark Automation State
  const [isSparkRunning, setIsSparkRunning] = useState(false);
  const [sparkResult, setSparkResult] = useState<any | null>(null);

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

      // Refresh professions & demands
      fetchProfessions();
      fetchDemands();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setIsSparkRunning(false);
    }
  };

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state
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

  useEffect(() => {
    fetchProfessions();
    fetchDemands();
  }, []);

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

  const handleDelete = async (slug: string, title: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        message: data.message || `${data.sentCount} öğrenciye e-posta gönderildi!`,
      });

      fetchDemands();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setSendingMajorSlug(null);
    }
  };

  const copyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2500);
  };

  const filteredProfessions = professions.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('professions')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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
            setActiveTab('demands');
            fetchDemands();
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'demands'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Öğrenci Talepleri & E-postalar ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('spark')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'spark'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Gemini Spark Günlük Asistanı</span>
        </button>
      </div>

      {/* Global Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold ${
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
          <button
            onClick={() => setNotification(null)}
            className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TAB 1: PROFESSIONS MANAGER */}
      {activeTab === 'professions' && (
        <>
          {/* Action Header & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-1 items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Meslek unvanı veya slug ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
                >
                  <option value="ALL">Tüm Sektörler ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={handleOpenAdd}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-teal-500/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Meslek / İş Ekle</span>
            </button>
          </div>

          {/* Professions Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-teal-400" />
                <h2 className="text-sm font-bold text-white">
                  Canlı Meslek Veri Tabanı ({filteredProfessions.length} Meslek)
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">Bulut Depolama: Cloudflare D1</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Meslek Unvanı</th>
                    <th className="py-3 px-4">Kategori / Sektör</th>
                    <th className="py-3 px-4 text-right">Taban Net (P25)</th>
                    <th className="py-3 px-4 text-right">Medyan Net</th>
                    <th className="py-3 px-4 text-right">Tavan Net (P75)</th>
                    <th className="py-3 px-4 text-center">Örneklem</th>
                    <th className="py-3 px-4 text-center">Durum</th>
                    <th className="py-3 px-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProfessions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-slate-500 text-xs">
                        {loading ? 'Meslekler yükleniyor...' : 'Arama kriterine uygun meslek bulunamadı.'}
                      </td>
                    </tr>
                  ) : (
                    filteredProfessions.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">{p.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono">/meslekler/{p.slug}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px]">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400">
                          {Number(p.min_salary).toLocaleString('tr-TR')} ₺
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-teal-400">
                          {Number(p.median_salary).toLocaleString('tr-TR')} ₺
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400">
                          {Number(p.max_salary).toLocaleString('tr-TR')} ₺
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-[11px] text-slate-400">{p.sample_count || 150}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {p.status || 'Yayında'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <a
                            href={`/meslekler/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Sitede Canlı Gör"
                            className="inline-flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Düzenle"
                            className="inline-flex p-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.slug, p.title)}
                            title="Sil"
                            className="inline-flex p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
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

      {/* TAB 2: DEMANDS & SUBSCRIBERS */}
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
                  <strong className="text-teal-300">info@piyasa.work</strong> ve tüm <strong className="text-teal-300">*@piyasa.work</strong> adreslerine gelen e-postalar doğrudan <strong className="text-white">kyhnayas@gmail.com</strong> kutunuza yönlendirilir.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex-shrink-0">
                ● Gelen Kutusu Aktif
              </span>
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
                              <span>{isSending ? 'Gönderiliyor...' : `Duyuru Gönder (${deptPendingSubs.length})`}</span>
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white">E-posta Bırakan Öğrenci Listesi ({subscribers.length})</h3>
              </div>
              <span className="text-[11px] text-slate-500">KVKK Korumalı Anonim Kayıt</span>
            </div>
            <div className="overflow-x-auto max-h-72">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">E-posta</th>
                    <th className="py-2.5 px-4">Talep Edilen Bölüm</th>
                    <th className="py-2.5 px-4">Tarih</th>
                    <th className="py-2.5 px-4 text-right">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-500">
                        Henüz e-posta bırakan öğrenci bulunmuyor.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-4 font-mono text-teal-300">{s.email}</td>
                        <td className="py-2.5 px-4 text-slate-300">{s.major_name}</td>
                        <td className="py-2.5 px-4 text-slate-500">
                          {s.created_at ? new Date(s.created_at).toLocaleDateString('tr-TR') : '-'}
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

      {/* TAB 3: GEMINI SPARK ASSISTANT */}
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
                    <strong>İncelenen Bölüm:</strong> {sparkResult.department.name} ({sparkResult.department.faculty}) • <strong>Seçim Sebebi:</strong> {sparkResult.department.reason}
                  </div>
                )}
                {sparkResult.createdProfessions && sparkResult.createdProfessions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {sparkResult.createdProfessions.map((cp: any, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-200 font-medium text-[11px]">
                        🎯 {cp.title} — {cp.median_salary.toLocaleString('tr-TR')} ₺ Net (Medyan)
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Prompts to Run Everyday */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prompt 1 */}
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

            {/* Prompt 2 */}
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

          {/* Sources and Philosophy Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>Spark&apos;ın Kullandığı Doğrulanmış Kaynaklar & Metodoloji</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-teal-400 block mb-1">1. İŞKUR</strong>
                Açık iş ilanları veritabanı ve İl İstihdam Piyasası İhtiyaç Analizleri.
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-teal-400 block mb-1">2. TÜİK</strong>
                Kazanç Yapısı Araştırması ve Hanehalkı İşgücü İstatistikleri.
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-teal-400 block mb-1">3. YÖK Atlas</strong>
                Üniversite bölümleri mezun istihdam oranları ve çalışma alanları endeksi.
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-teal-400 block mb-1">4. Kariyer & LinkedIn</strong>
                2026 yılı güncel iş ilanı ücret paketleri ve kıdem eşikleri.
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-teal-400 block mb-1">5. TCMB Verileri</strong>
                Piyasa Katılımcıları Anketi enflasyon ve reel satın alma gücü düzeltmesi.
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <strong className="text-teal-400 block mb-1">6. Kullanıcı Bildirimleri</strong>
                Piyasa.work /maas-bildir formuyla anonim iletilen gerçek maaş beyanları.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  {formData.id ? 'Meslek Verisini Düzenle' : 'Yeni Meslek / İş Ekle'}
                </h3>
                <p className="text-xs text-slate-400">Veriler Cloudflare D1 veritabanına doğrudan yazılacaktır.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Meslek Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Yapay Zeka Prompt Uzmanı"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    URL Kodu (Slug) - Boş bırakılırsa otomatik üretilir
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: yapay-zeka-prompt-uzmani"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Kategori / Sektör *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Yazılım & Teknoloji"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                {/* ISCO Code */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    ISCO-08 Meslek Kodu
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 2512"
                    value={formData.isco_code || ''}
                    onChange={(e) => setFormData({ ...formData, isco_code: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              {/* Salary Fields */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-3">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                  Aylık Net Ücret Skalası (2026 Güncel ₺)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Minimum Net (P25) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={500}
                      value={formData.min_salary}
                      onChange={(e) => setFormData({ ...formData, min_salary: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-teal-400 font-bold mb-1">Medyan Net Maaş *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={500}
                      value={formData.median_salary}
                      onChange={(e) => setFormData({ ...formData, median_salary: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-teal-500/50 rounded-xl text-xs text-teal-400 font-bold focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Maksimum Net (P75) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={500}
                      value={formData.max_salary}
                      onChange={(e) => setFormData({ ...formData, max_salary: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Sample Count & Grade & Status */}
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
