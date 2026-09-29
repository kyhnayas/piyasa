'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Search, 
  TrendingUp, 
  Briefcase, 
  Award, 
  Lightbulb, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Filter, 
  Flame, 
  School, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Bell,
  HelpCircle
} from 'lucide-react';
import { UNIVERSITY_MAJORS, UniversityMajor } from '@/data/majors-data';
import { ALL_FACULTY_CLUSTERS, FacultyCluster, DepartmentItem } from '@/data/all-university-departments';
import { MajorDemandModal } from '@/components/MajorDemandModal';
import { AdBanner } from '@/components/AdBanner';

export default function HangiBolumNeIsYaparPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('Tümü');
  const [viewFilter, setViewFilter] = useState<'all' | 'published' | 'pending'>('all');
  const [expandedMajorId, setExpandedMajorId] = useState<string | null>(null);

  // Modal State for demand vote & lead email
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDepartment, setModalDepartment] = useState<{
    name: string;
    slug: string;
    faculty: string;
    votes: number;
  } | null>(null);

  // Live demand vote counts (starts empty, filled purely from real database votes)
  const [liveVotes, setLiveVotes] = useState<Record<string, number>>({});

  // Fetch latest demand votes from /api/major-demand
  useEffect(() => {
    fetch('/api/major-demand')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.counts) {
          setLiveVotes(data.counts);
        }
      })
      .catch(err => console.error('Error loading live demand counts:', err));
  }, []);

  const facultyNames = useMemo(() => {
    return ['Tümü', ...ALL_FACULTY_CLUSTERS.map(f => f.facultyName)];
  }, []);

  // Filtered clusters based on user search & faculty dropdown
  const filteredClusters = useMemo(() => {
    return ALL_FACULTY_CLUSTERS.map(cluster => {
      const isFacultyMatch = selectedFaculty === 'Tümü' || cluster.facultyName === selectedFaculty;
      if (!isFacultyMatch) return null;

      const filteredDepts = cluster.departments.filter(dept => {
        const matchesView = 
          viewFilter === 'all' || 
          (viewFilter === 'published' && dept.status === 'published') ||
          (viewFilter === 'pending' && dept.status === 'pending');

        const term = searchTerm.toLowerCase().trim();
        const matchesSearch = 
          !term ||
          dept.name.toLowerCase().includes(term) ||
          dept.overview.toLowerCase().includes(term) ||
          dept.faculty.toLowerCase().includes(term) ||
          (dept.typicalJobs && dept.typicalJobs.some(j => j.toLowerCase().includes(term)));

        return matchesView && matchesSearch;
      });

      if (filteredDepts.length === 0) return null;

      return {
        ...cluster,
        departments: filteredDepts
      };
    }).filter((c): c is FacultyCluster => c !== null);
  }, [searchTerm, selectedFaculty, viewFilter]);

  // Total departments count
  const totalListedDepartments = useMemo(() => {
    return filteredClusters.reduce((acc, c) => acc + c.departments.length, 0);
  }, [filteredClusters]);

  // Real Top Demanded Majors (Only majors with at least 1 real vote)
  const topDemandedMajors = useMemo(() => {
    const list: { name: string; slug: string; faculty: string; votes: number }[] = [];
    ALL_FACULTY_CLUSTERS.forEach(c => {
      c.departments.forEach(d => {
        if (d.status === 'pending') {
          const count = liveVotes[d.slug] || 0;
          if (count > 0) {
            list.push({
              name: d.name,
              slug: d.slug,
              faculty: d.faculty,
              votes: count
            });
          }
        }
      });
    });
    return list.sort((a, b) => b.votes - a.votes).slice(0, 5);
  }, [liveVotes]);

  const handleOpenDemandModal = (name: string, slug: string, faculty: string) => {
    setModalDepartment({
      name,
      slug,
      faculty,
      votes: liveVotes[slug] || 0
    });
    setIsModalOpen(true);
  };

  const handleVoteSuccess = (newVotes: number) => {
    if (modalDepartment) {
      setLiveVotes(prev => ({
        ...prev,
        [modalDepartment.slug]: newVotes
      }));
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedMajorId(prev => (prev === id ? null : id));
  };

  const getDemandBadgeColor = (score?: UniversityMajor['demandScore']) => {
    switch (score) {
      case 'Çok Yüksek':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Yüksek':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Dengeli':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Rekabetçi':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  // Schema.org FAQPage structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Üniversite diploması maaşı ne kadar etkiler?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'İş piyasasında ilk 1-2 yılda okulun prestiji kapı açmada rol oynasa da, 3. yıldan sonra somut projeler, yabancı dil ve pratik yetkinlikler belirleyicidir.'
        }
      },
      {
        '@type': 'Question',
        name: 'Bölümüm dışında bir alanda çalışabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet. Özellikle teknoloji, ürün yönetimi, dijital pazarlama, veri analitiği ve satış alanlarında çalışan profesyonellerin %60\'ından fazlası farklı disiplinlerden gelmektedir.'
        }
      },
      {
        '@type': 'Question',
        name: 'Henüz inceleme raporu yayınlanmamış bölümler için ne yapabilirim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Piyasa.work üzerinde ilgilendiğiniz bölüm için "İnceleme Talep Et" butonuna tıklayarak talebinizi iletebilir ve e-posta adresinizi bırakarak analiz yayınlandığı anda doğrudan bildirim alabilirsiniz.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide shadow-inner">
            <GraduationCap className="w-4 h-4 text-teal-400" />
            <span>YÖK Lisans Programları & Mezun Kariyer Atlası</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Hangi Bölüm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">Ne İş Yapar?</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Üniversite diploması tek başına yetmez. Tüm fakülte ve lisans bölümlerinin mezunları piyasada hangi unvanlarla çalışıyor, 2026 başlangıç ve medyan maaşları ne kadar? İnceleme bekleyen bölümler için talebinizi iletin, araştırma ekibimiz öncelikli olarak hazırlayıp yayına alsın.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-xl font-bold text-teal-300">16</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">YÖK Fakülte Kümesi</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-xl font-bold text-teal-300">80+</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Lisans Bölümü</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-xl font-bold text-teal-300">2026</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Piyasa Ücretleri</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-sm">
              <div className="text-xl font-bold text-teal-300">Talep Odaklı</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Editoryal İnceleme</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Dual-Level Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Fakülte, bölüm veya unvan ara... (Örn: Havacılık, Gastronomi, YBS, Biyomedikal, Hukuk)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            {/* Faculty Dropdown Select */}
            <div className="relative min-w-[260px]">
              <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedFaculty}
                onChange={e => setSelectedFaculty(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all appearance-none cursor-pointer"
              >
                {facultyNames.map(fName => (
                  <option key={fName} value={fName}>
                    {fName === 'Tümü' ? 'Tüm Fakülteler' : fName}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status View Pills & Total Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 font-medium mr-1">Görünüm:</span>
              <button
                onClick={() => setViewFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  viewFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tüm Bölümler
              </button>
              <button
                onClick={() => setViewFilter('published')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                  viewFilter === 'published'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Analizi Yayında Olanlar</span>
              </button>
              <button
                onClick={() => setViewFilter('pending')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                  viewFilter === 'pending'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>İnceleme Bekleyenler</span>
              </button>
            </div>

            <span className="text-slate-400 font-medium">
              Toplam <strong>{totalListedDepartments}</strong> bölüm listeleniyor
            </span>
          </div>
        </div>

        {/* Real Demand Leaderboard Box (Shown when there are real requests) */}
        {topDemandedMajors.length > 0 && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-indigo-500/10 border border-teal-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-900 uppercase tracking-wide">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Ziyaretçilerin İnceleme Talep Ettiği Öncelikli Bölümler</span>
                </div>
                <p className="text-xs text-slate-600">
                  Talep yoğunluğuna göre editoryal araştırma ekibimiz sıradaki 2026 maaş ve kariyer raporlarını öncelikli olarak yayına almaktadır.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-teal-800 bg-white px-2.5 py-1 rounded-full border border-teal-200 shadow-2xs whitespace-nowrap self-start sm:self-auto">
                Canlı Talep Sıralaması
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {topDemandedMajors.map((item, idx) => (
                <button
                  key={item.slug}
                  onClick={() => handleOpenDemandModal(item.name, item.slug, item.faculty)}
                  className="p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all text-left group"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-500">#{idx + 1}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold flex items-center gap-0.5 text-[10px]">
                      <Flame className="w-3 h-3 text-amber-500" />
                      {item.votes} Talep
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-1.5 group-hover:text-teal-700 transition-colors line-clamp-1">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-teal-700 font-medium mt-1 flex items-center justify-between">
                    <span>Talep İlet & Takip Et</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Faculties & Departments Hierarchical Directory */}
        <div className="space-y-10">
          {filteredClusters.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Aramanıza uygun bölüm bulunamadı</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Filtreleri sıfırlayarak tüm üniversite bölümlerini tekrar görüntüleyebilirsiniz.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedFaculty('Tümü'); setViewFilter('all'); }}
                className="inline-flex px-4 py-2 rounded-lg bg-teal-50 text-teal-700 font-semibold text-xs border border-teal-200"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          ) : (
            filteredClusters.map((cluster, cIdx) => (
              <div key={cIdx} className="space-y-4">
                {/* Faculty Cluster Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="space-y-0.5">
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <School className="w-5 h-5 text-teal-700" />
                      <span>{cluster.facultyName}</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      {cluster.description} ({cluster.departments.length} Lisans Programı)
                    </p>
                  </div>
                </div>

                {/* Departments Grid under this Faculty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cluster.departments.map(dept => {
                    const isPublished = dept.status === 'published';
                    const fullData = isPublished 
                      ? UNIVERSITY_MAJORS.find(m => m.slug === dept.slug) 
                      : null;
                    const votes = liveVotes[dept.slug] || 0;
                    const isExpanded = expandedMajorId === dept.slug;

                    if (isPublished) {
                      // PUBLISHED DEPARTMENT CARD WITH LINKED PROFESSIONS & SALARIES
                      return (
                        <div
                          key={dept.id}
                          className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
                        >
                          <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>2026 Raporu Yayında</span>
                              </span>
                              {fullData && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDemandBadgeColor(fullData.demandScore)}`}>
                                  Talep: {fullData.demandScore}
                                </span>
                              )}
                            </div>

                            <div>
                              <h3 className="text-base font-bold text-slate-900 hover:text-teal-700 transition-colors">
                                {dept.name}
                              </h3>
                              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                                {dept.overview}
                              </p>
                            </div>

                            {/* Salary Quick Preview if fullData exists */}
                            {fullData && (
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                                  <div className="text-[10px] uppercase font-bold text-slate-400">Başlangıç Maaşı</div>
                                  <div className="font-bold text-slate-800 mt-0.5">{fullData.startingSalary}</div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-teal-50/70 border border-teal-100">
                                  <div className="text-[10px] uppercase font-bold text-teal-700">Medyan (3-5 Yıl)</div>
                                  <div className="font-bold text-teal-900 mt-0.5">{fullData.medianSalary}</div>
                                </div>
                              </div>
                            )}

                            {/* Linked Professions Section */}
                            {dept.linkedProfessions && dept.linkedProfessions.length > 0 && (
                              <div className="pt-2 border-t border-slate-100 space-y-2">
                                <div className="text-[11px] font-bold text-slate-700">İlgili Meslekler & 2026 Medyan Ücretler:</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {dept.linkedProfessions.map((prof, pIdx) => (
                                    <Link
                                      key={pIdx}
                                      href={`/meslekler/${prof.slug}`}
                                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-800 hover:text-teal-900 text-[11px] transition-all"
                                    >
                                      <span className="font-semibold">{prof.title}</span>
                                      <span className="text-[10px] font-bold text-teal-700">({prof.salaryMedian})</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Expandable roles section if fullData */}
                            {isExpanded && fullData && (
                              <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                                <div className="text-xs font-bold text-slate-800">Detaylı Meslek Profilleri:</div>
                                <div className="grid grid-cols-1 gap-2">
                                  {fullData.topProfessions.map((prof, pIdx) => (
                                    <Link
                                      key={pIdx}
                                      href={`/meslekler/${prof.slug}`}
                                      className="p-2.5 rounded-lg bg-slate-50 hover:bg-teal-50/80 border border-slate-100 hover:border-teal-200 transition-all flex items-center justify-between text-xs group"
                                    >
                                      <div>
                                        <span className="font-bold text-slate-800 group-hover:text-teal-900 block">
                                          {prof.title}
                                        </span>
                                        <span className="text-[10px] text-slate-400">ISCO: {prof.isco} · {prof.roleType}</span>
                                      </div>
                                      <div className="text-right">
                                        <span className="font-bold text-teal-800 block">{prof.avgSalary}</span>
                                        <span className="text-[10px] text-teal-600 flex items-center justify-end">
                                          İncele <ArrowRight className="w-3 h-3 ml-0.5" />
                                        </span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>

                                <div className="p-3 rounded-lg bg-gradient-to-r from-teal-950 to-slate-900 text-white text-xs leading-relaxed space-y-1">
                                  <div className="font-bold text-teal-300 text-[11px] uppercase">Kariyer Tavsiyesi:</div>
                                  <p className="text-slate-200 text-[11px]">{fullData.careerAdvice}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-500 font-medium">
                              {dept.typicalJobs.length} Başlıca İstihdam Alanı
                            </span>
                            {fullData ? (
                              <button
                                onClick={() => toggleExpand(dept.slug)}
                                className="font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                              >
                                <span>{isExpanded ? 'Detayları Gizle' : 'Kariyer Detaylarını Gör'}</span>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            ) : (
                              <Link
                                href={dept.linkedProfessions?.[0] ? `/meslekler/${dept.linkedProfessions[0].slug}` : '/meslekler'}
                                className="font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                              >
                                <span>Meslekleri İncele</span>
                                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // PENDING / DEMAND VOTING DEPARTMENT CARD
                    return (
                      <div
                        key={dept.id}
                        className="bg-white rounded-2xl border border-dashed border-slate-300 hover:border-amber-400 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>İnceleme Sırasında</span>
                            </span>
                            {votes > 0 ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                                <Flame className="w-3 h-3 text-amber-500" />
                                <span>{votes} Kişi Talep Etti</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                İlk talep eden siz olun
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="text-base font-bold text-slate-900">
                              {dept.name}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {dept.overview}
                            </p>
                          </div>

                          {/* Typical Jobs / Careers for Pending Majors */}
                          {dept.typicalJobs && dept.typicalJobs.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <div className="text-[11px] font-bold text-slate-700">Piyasada Hedeflenen Başlıca Pozisyonlar:</div>
                              <div className="flex flex-wrap gap-1.5">
                                {dept.typicalJobs.map((job, jIdx) => (
                                  <span key={jIdx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                                    {job}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-slate-600 leading-relaxed">
                            Bu bölüm mezunlarının 2026 yılı piyasa maaşları ve kritik teknik sertifikasyonları editoryal araştırma sırasındadır.
                          </div>
                        </div>

                        <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div className="text-[11px] text-slate-500">
                            Talep yoğunluğuna göre incelenir
                          </div>
                          <button
                            onClick={() => handleOpenDemandModal(dept.name, dept.slug, dept.faculty)}
                            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-all whitespace-nowrap"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            <span>İnceleme Talep Et</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Lead Capture Banner */}
        <AdBanner
          type="lead"
          title="Öğrenci misin? İlk Maaşını Doğru Pazarlık Et"
          description="Piyasa.work mezun maaş veri tabanı, stajyer ve yeni mezun pozisyonları için gerçek piyasa tabanlarını sunar. Anonim maaşını paylaşarak veri havuzunu genişlet!"
          ctaText="Anonim Maaşını Bildir"
          ctaLink="/maas-bildir"
          className="mt-12"
        />

        {/* FAQ Section for SEO */}
        <section className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              Sıkça Sorulan Sorular: Üniversite Bölümleri ve Kariyer Planlama
            </h3>
            <p className="text-xs text-slate-500">
              Üniversite tercihi yapacak adaylar ve mezuniyet aşamasındaki öğrenciler için rehber.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs leading-relaxed text-slate-600">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Üniversite diploması maaşı ne kadar etkiler?</h4>
              <p>
                İş piyasasında ilk 1-2 yılda mezun olunan okulun prestiji kapı açmada rol oynasa da, 3. yıldan sonra tamamen ortaya konulan somut projeler, kullanılan teknolojiler ve yabancı dil yetkinliği belirleyici olur.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Bölümüm dışında bir alanda çalışabilir miyim?</h4>
              <p>
                Evet. Özellikle teknoloji, ürün yönetimi, dijital pazarlama, veri analitiği ve satış alanlarında çalışan profesyonellerin %60'ından fazlası farklı disiplinlerden gelmektedir. Kritik olan portföy ve sektörel sertifikalardır.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Henüz analiz edilmemiş bölümler için ne yapabilirim?</h4>
              <p>
                İlgilendiğiniz bölümün kartında yer alan &quot;İnceleme Talep Et&quot; butonuna tıklayarak talebinizi iletebilir ve e-posta adresinizi bırakabilirsiniz. Piyasa araştırma ekibimiz en çok talep alan bölümleri öncelikli olarak inceleyip rapor hazır olduğunda e-posta ile bildirim göndermektedir.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">İş bulmayı kolaylaştıran en önemli faktör nedir?</h4>
              <p>
                Üniversite eğitimi süresince yapılan uzun dönemli stajlar, açık kaynak projelere katkılar, B2 İngilizce seviyesi ve kurumsal yazılımlar (SAP, Jira, Figma, AWS) konusundaki pratik tecrübe işe alım şansını 4 kat artırmaktadır.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Demand Vote & Email Notification Modal */}
      {modalDepartment && (
        <MajorDemandModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          majorName={modalDepartment.name}
          majorSlug={modalDepartment.slug}
          facultyName={modalDepartment.faculty}
          currentVotes={modalDepartment.votes}
          onVoteSuccess={handleVoteSuccess}
        />
      )}
    </div>
  );
}
