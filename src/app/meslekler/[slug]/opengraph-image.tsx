import { ImageResponse } from 'next/og';
import { getProfessionFromD1 } from '@/lib/professions';

export const runtime = 'nodejs';
export const alt = 'Piyasa.work 2026 Maaş ve Kariyer Rehberi';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const profession = getProfessionFromD1(slug);

  const title = profession?.title || 'Meslek Maaş Rehberi';
  const category = profession?.category || 'Türkiye İş Piyasası';
  const medianSalary = profession?.salaryStats?.median 
    ? `${profession.salaryStats.median.toLocaleString('tr-TR')} ₺`
    : 'Güncel 2026 Verileri';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0f172a',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#0f766e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              P
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff' }}>
                Piyasa<span style={{ color: '#14b8a6' }}>.work</span>
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Türkiye İş Piyasası & Ücret Atlası</span>
            </div>
          </div>

          <div
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(20, 184, 166, 0.15)',
              border: '1px solid rgba(20, 184, 166, 0.4)',
              color: '#5eead4',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            2026 Piyasa Verileri
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 'auto 0' }}>
          <span style={{ fontSize: '20px', color: '#14b8a6', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {category}
          </span>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: '1.1',
              margin: '0',
            }}
          >
            {title} Maaşları
          </h1>
          <p style={{ fontSize: '22px', color: '#cbd5e1', margin: '0' }}>
            Kariyer basamakları, 81 il farkları, yan haklar ve mülakat soruları
          </p>
        </div>

        {/* Bottom Salary Stat Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 32px',
            backgroundColor: '#1e293b',
            borderRadius: '20px',
            border: '1px solid #334155',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>
              Türkiye Geneli Medyan Net Ücret
            </span>
            <span style={{ fontSize: '42px', fontWeight: '900', color: '#2dd4bf' }}>
              {medianSalary} <span style={{ fontSize: '20px', color: '#94a3b8', fontWeight: 'normal' }}>/ ay</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '15px' }}>
            <span>✓ Tukey IQR İstatistiki Doğrulama</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
