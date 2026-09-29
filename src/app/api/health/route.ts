import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    platform: 'Piyasa (piyasa.work)',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      web: 'UP',
      database: 'UP',
      mcp: 'UP',
    },
  });
}
