import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminToken } from '@/lib/admin-auth';
import { 
  ShieldCheck, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  Flame, 
  ArrowUpRight, 
  LogOut, 
  ExternalLink,
  Layers,
  Database
} from 'lucide-react';
import path from 'path';
import fs from 'fs';

function getD1Db() {
  const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
  if (!fs.existsSync(d1Dir)) return null;
  const files = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
  if (files.length === 0) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require('node:sqlite');
  return new DatabaseSync(path.join(d1Dir, files[0]));
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value;

  if (!token || !verifyAdminToken(token)) {
    redirect('/admin/login');
  }

  // Fetch admin stats from D1 SQLite
  let professionCount = 40;
  let totalSubmissions = 0;
  let recentDemands: any[] = [];
  let pendingSubscribersCount = 0;

  try {
    const db = getD1Db();
    if (db) {
      const pRow = db.prepare('SELECT COUNT(*) as cnt FROM ec_professions').get() as any;
      if (pRow) professionCount = pRow.cnt;

      const sRow = db.prepare('SELECT COUNT(*) as cnt FROM salary_submissions').get() as any;
      if (sRow) totalSubmissions = sRow.cnt;

      recentDemands = db.prepare(`
        SELECT c.major_slug, c.major_name, c.faculty_name, c.vote_count,
               (SELECT COUNT(*) FROM major_demand_requests r WHERE r.major_slug = c.major_slug AND r.email IS NOT NULL AND r.email != '' AND r.status = 'pending') as pending_leads
        FROM major_demand_counts c
        ORDER BY c.vote_count DESC
        LIMIT 6
      `).all() as any[];

      const subRow = db.prepare("SELECT COUNT(*) as cnt FROM major_demand_requests WHERE email IS NOT NULL AND email != '' AND status = 'pending'").get() as any;
      if (subRow) pendingSubscribersCount = subRow.cnt;
    }
  } catch (err) {
    console.error('Admin dashboard query error:', err);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Yetkili Yönetici: kyhnayas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Piyasa Yönetim & Moderasyon Merkezi
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="http://localhost:4321/_emdash/admin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-colors"
            >
              <span>EmDash Editörü</span>
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
              <span>Aktif Meslekler</span>
              <Briefcase className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white">{professionCount}</div>
            <div className="text-[11px] text-teal-400">YÖK & İŞKUR Eşleşmeli</div>
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
              <span>Sistem Durumu</span>
              <CheckCircle className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400">Canlı & Güvenli</div>
            <div className="text-[11px] text-slate-400">Next.js 15 + Cloudflare D1</div>
          </div>
        </div>

        {/* Major Demands & Moderation Section */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Öğrencilerin En Çok Talep Ettiği YÖK Bölümleri</span>
              </h2>
              <p className="text-xs text-slate-400">
                Canlı oylamada öne çıkan ve e-posta bırakılan bölümler
              </p>
            </div>
            <a
              href="/hangi-bolum-ne-is-yapar"
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              <span>Sayfayı Aç</span>
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
