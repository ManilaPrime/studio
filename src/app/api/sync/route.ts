
import { NextResponse } from 'next/server';
import { syncCalendars as syncCalendarsAction } from '@/app/actions/sync-calendars';

export const dynamic = 'force-dynamic';

// This function tells Next.js that this route has no static paths to generate,
// effectively excluding it from static builds while keeping it for server-side rendering.
export async function generateStaticParams() {
  return [];
}

export async function POST(request: Request) {
  try {
    const { unitCalendars, unitId } = await request.json();

    if (!unitCalendars || !unitId) {
      return new NextResponse('Missing unitCalendars or unitId', { status: 400 });
    }
    
    // Call the original server action to perform the sync
    const result = await syncCalendarsAction(unitCalendars, unitId);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in /api/sync:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ message }), { status: 500 });
  }
}
