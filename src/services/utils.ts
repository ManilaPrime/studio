
'use client';

// This file is currently not used because all API-like calls
// have been consolidated into server actions to support Capacitor builds.
// It is kept for potential future use if a different architecture is needed.

function isNativePlatform() {
  // Check if the Capacitor global object is available on the window
  return typeof window !== 'undefined' && !!(window as any).Capacitor;
}

export async function callApi(endpoint: string, body: any) {
    // When running natively on a device, isNativePlatform() will be true.
    // We use the VERCEL_URL, which must be set in your Vercel project's environment variables.
    // For local development, it will use the local Next.js server.
    const isNative = isNativePlatform();
    const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

    // The backend URL is the Vercel URL if running native.
    // During local dev, it falls back to the relative path, assuming the same host.
    const baseUrl = isNative ? vercelUrl : '';

    if (isNative && !baseUrl) {
      console.error("NEXT_PUBLIC_VERCEL_URL is not set. The native app cannot connect to the backend.");
      // You might want to throw an error or show a message to the user.
      throw new Error("Application is not configured to connect to the server. Please contact support.");
    }
    
    // Construct the full API URL. If baseUrl is empty (e.g. on Vercel server), it will make a relative request.
    const apiUrl = `${baseUrl}/api/${endpoint}`;

    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || `API call to ${endpoint} failed`);
      }
      return response.json();
    } catch (error) {
      console.error(`API call to ${endpoint} failed:`, error);
      throw error;
    }
}
