
'use client';
import {isPlatform} from '@ionic/react';

export async function callApi(endpoint: string, body: any) {
    // When running natively on a device, isPlatform('capacitor') will be true.
    // We use the VERCEL_URL, which must be set in your Vercel project's environment variables.
    // For local development, it will use the local Next.js server.
    const isNative = isPlatform('capacitor');
    const baseUrl = isNative 
      ? process.env.NEXT_PUBLIC_VERCEL_URL 
      : process.env.NEXT_PUBLIC_SITE_URL || '';

    if (isNative && !baseUrl) {
      throw new Error("NEXT_PUBLIC_VERCEL_URL is not set. The native app cannot connect to the backend.");
    }

    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
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
}
