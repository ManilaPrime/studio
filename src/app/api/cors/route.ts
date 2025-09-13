
import { NextResponse } from 'next/server';
import Cors from 'cors';
import { syncCalendars as syncCalendarsAction } from '@/app/actions/sync-calendars';
import { sendDiscordNotification } from '@/services/discord';

// Initialize the cors middleware
const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  // Add other origins if needed, e.g., your Vercel deployment URL for web-to-web calls
  origin: ['capacitor://localhost', 'http://localhost'], 
});

// Helper to run the middleware
function runMiddleware(req: Request, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Handler for OPTIONS requests (part of CORS preflight)
export async function OPTIONS(request: Request) {
    const response = new NextResponse(null, { status: 204 });
    await runMiddleware(request, response, cors);
    return response;
}

export async function POST(request: Request) {
  const response = new NextResponse();
  try {
    // Run the CORS middleware
    await runMiddleware(request, response, cors);
    
    const { action, payload } = await request.json();

    if (!action) {
      return NextResponse.json({ message: 'Missing action' }, { status: 400 });
    }

    let result;

    // Route the request based on the action
    switch (action) {
      case 'sync':
        const { unitCalendars, unitId } = payload;
        if (!unitCalendars || !unitId) {
          return NextResponse.json({ message: 'Missing unitCalendars or unitId for sync' }, { status: 400 });
        }
        result = await syncCalendarsAction(unitCalendars, unitId);
        break;
      
      case 'discord-notification':
        const { booking, unit } = payload;
        if (!booking || !unit) {
          return NextResponse.json({ message: 'Missing booking or unit for notification' }, { status: 400 });
        }
        // Fire-and-forget, no result needed to send back to client
        await sendDiscordNotification(booking, unit);
        result = { success: true, message: 'Notification sent' };
        break;

      default:
        return NextResponse.json({ message: `Unknown action: ${action}` }, { status: 400 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error(`Error in /api/cors for action:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
