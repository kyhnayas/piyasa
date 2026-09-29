import React from 'react';
import { Metadata } from 'next';
import { getAllProfessions } from '@/lib/professions';
import { ProfessionsDirectoryView } from '@/components/ProfessionsDirectoryView';

export const metadata: Metadata = {
  title: 'Meslekler & Ücret Kütüphanesi (2026) | Piyasa.work',
  description: 'Türkiye iş piyasasındaki 40+ popüler meslek grubu için 2026 yılı güncel taban, tavan ve medyan maaş verileri, İŞKUR/ISCO kodları ve kariyer basamakları.',
  alternates: {
    canonical: 'https://piyasa.work/meslekler',
  },
};

export default function ProfessionsDirectoryPage() {
  const professions = getAllProfessions();

  return <ProfessionsDirectoryView initialProfessions={professions} />;
}
