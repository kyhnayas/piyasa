import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminToken } from '@/lib/admin-auth';
import { queryCloudD1 } from '@/lib/cloud-d1';
import { AdminProfessionsManager } from '@/components/AdminProfessionsManager';
import { 
  ShieldCheck, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Flame, 
  ArrowUpRight, 
  LogOut, 
  ExternalLink,
  Database
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value;

  if (!token || !verifyAdminToken(token)) {
    redirect('/admin/login');
  }

  // Fetch admin stats and professions from Cloudflare D1
  let professionCount = 35;
  let totalSubmissions = 0;
  let recentDemands: any[] = [];
  let pendingSubscribersCount = 0;
  let initialProfessions: any[] = [];

  try {
    const pRows = await queryCloudD1(
      'SELECT id, slug, title, isco_code, category, description, min_salary, median_salary, max_salary, sample_count, grade, status, updated_at FROM ec_professions ORDER BY title ASC'
    );
    if (pRows && pRows.length > 0) {
      initialProfessions = pRows;
      professionCount = pRows.length;
    }

    const sRows = await queryCloudD1('SELECT COUNT(*) as cnt FROM salary_submissions');
    if (sRows && sRows[0]) totalSubmissions = Number(sRows[0].cnt) || 0;

    const dRows = await queryCloudD1(`
      SELECT c.major_slug, c.major_name, c.faculty_name, c.vote_count,
             (SELECT COUNT(*) FROM major_demand_requests r WHERE r.major_slug = c.major_slug AND r.email IS NOT NULL AND r.email != '' AND r.status = 'pending') as pending_leads
      FROM major_demand_counts c
      ORDER BY c.vote_count DESC
      LIMIT 6
    `);
    if (dRows && dRows.length > 0) recentDemands = dRows;

    const leadRows = await queryCloudD1(
      "SELECT COUNT(*) as cnt FROM major_demand_requests WHERE email IS NOT NULL AND email != '' AND status = 'pending'"
    );
    if (leadRows && leadRows[0]) pendingSubscribersCount = Number(leadRows[0].cnt) || 0;
  } catch (err) {
    console.error('Cloudflare D1 query error:', err);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Yetkili Yönetici: kyhnayas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Piyasa Yönetim & Meslek Moderasyon Merkezi
            </h1>
            <p className="text-xs text-slate-400">
              Buradan yeni meslek ve iş pozisyonları ekleyebilir, mevcut maaş sınırlarını doğrudan düzenleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-xs font-semibold text-teal-300 transition-colors"
            >
              <span>Siteyi Canlı Gör</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış Yap</span>
              </button>
            </form>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Canlı Meslekler</span>
              <Briefcase className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white">{professionCount}</div>
            <div className="text-[11px] text-teal-400">Cloudflare D1 Senkronize</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Maaş Bildirimleri</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{totalSubmissions}</div>
            <div className="text-[11px] text-emerald-400">Tukey IQR Doğrulamalı</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Bekleyen E-posta Lead</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">{pendingSubscribersCount}</div>
            <div className="text-[11px] text-amber-400">Bildirim Bekleyen Öğrenci</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Veritabanı Durumu</span>
              <CheckCircle className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400">Cloudflare D1 Aktif</div>
            <div className="text-[11px] text-slate-400">piyasa-db (Frankfurt EEUR)</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MESLEK & İŞ YÖNETİM STÜDYOSU (ADD, EDIT, DELETE, LIST) */}
        {/* ========================================================================= */}
        <AdminProfessionsManager initialProfessions={initialProfessions} />

        {/* Major Demands & Moderation Section */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Öğrencilerin En Çok Talep Ettiği YÖK Bölümleri</span>
              </h2>
              <p className="text-xs text-slate-400">
                Canlı oylamada öne çıkan ve e-posta bildirim talebi bırakılan üniversite bölümleri
              </p>
            </div>
            <a
              href="/hangi-bolum-ne-is-yapar"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              <span>Bölüm Atlasını Aç</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentDemands.length === 0 ? (
              <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                Henüz kayıtlı talep bulunmamaktadır.
              </div>
            ) : (
              recentDemands.map((d, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      #{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {d.vote_count} Talep
                    </span>
                  </div>
                  <div className="font-bold text-sm text-white line-clamp-1">{d.major_name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{d.faculty_name}</div>
                  <div className="pt-1 text-[11px] text-teal-400 font-medium">
                    {d.pending_leads} bildirim bekleyen öğrenci
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
