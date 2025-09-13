
'use client';

function isNativePlatform() {
  return typeof window !== 'undefined' && !!(window as any).Capacitor;
}

export async function callApi(action: string, body: any) {
    const isNative = isNativePlatform();
    const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

    const baseUrl = isNative ? vercelUrl : '';

    if (isNative && !baseUrl) {
      console.error("NEXT_PUBLIC_VERCEL_URL is not set. The native app cannot connect to the backend.");
      throw new Error("Application is not configured to connect to the server. Please contact support.");
    }
    
    // All native calls go through the CORS proxy
    const endpoint = 'cors';
    const apiUrl = `${baseUrl}/api/${endpoint}`;

    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          // The body now includes the intended action and the original payload
          body: JSON.stringify({
            action,
            payload: body,
          }),
      });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || `API call to ${endpoint} for action ${action} failed`);
      }
      return response.json();
    } catch (error) {
      console.error(`API call to ${endpoint} for action ${action} failed:`, error);
      throw error;
    }
}
