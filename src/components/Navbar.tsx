'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, PlusCircle, BarChart3 } from 'lucide-react';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2.5 group focus:outline-none">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-teal-400 group-hover:bg-teal-900 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
                  <rect x="10" y="8" width="6" height="32" rx="3" fill="#FFFFFF" />
                  <path
                    d="M16 8H28C32.9706 8 37 12.0294 37 17C37 21.9706 32.9706 26 28 26H16"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="26" cy="17" r="4" fill="#2DD4BF" />
                  <line x1="10" y1="40" x2="37" y2="40" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">Piyasa</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-700">
                  .WORK
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium text-slate-600">
              <Link href="/meslekler" className="hover:text-slate-950 transition-colors">
                Meslekler
              </Link>
              <Link href="/hangi-bolum-ne-is-yapar" className="hover:text-teal-700 text-teal-800 font-semibold transition-colors flex items-center gap-1">
                <span>Bölüm Rehberi</span>
                <span className="text-[9px] px-1 py-0.2 bg-teal-100 text-teal-800 rounded font-bold">YENİ</span>
              </Link>
              <Link href="/maas-hesapla" className="hover:text-slate-950 transition-colors">
                Maaşlar
              </Link>
              <Link href="/maas-karsilastir" className="hover:text-slate-950 transition-colors">
                Karşılaştır
              </Link>
              <Link href="/veri-metodolojisi" className="hover:text-slate-950 transition-colors">
                Metodoloji
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3">
            {/* Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-medium transition-all"
              aria-label="Arama yap"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Meslek, maaş veya unvan ara...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* CTA Button */}
            <Link
              href="/maas-bildir"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Maaşını Paylaş</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100"
              aria-label="Menüyü aç"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
            <Link
              href="/meslekler"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Meslekler Dizini
            </Link>
            <Link
              href="/hangi-bolum-ne-is-yapar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-bold text-teal-800 bg-teal-50/60 hover:bg-teal-50"
            >
              🎓 Bölüm Rehberi (Hangi Bölüm Ne İş Yapar?)
            </Link>
            <Link
              href="/maas-hesapla"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Maaş Hesapla
            </Link>
            <Link
              href="/maas-karsilastir"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Maaş Karşılaştır
            </Link>
            <Link
              href="/veri-metodolojisi"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Veri Metodolojisi & Güven
            </Link>
            <div className="pt-2">
              <Link
                href="/maas-bildir"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Anonim Maaşını Paylaş</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
