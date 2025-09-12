
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// In-memory cache for config values to reduce Firestore reads.
const configCache = new Map<string, { value: string; timestamp: number }>();
const CACHE_DURATION_MS = 5 * 60 * 1000; // Cache for 5 minutes

/**
 * Retrieves a configuration value from the 'config' collection in Firestore.
 * Uses a simple in-memory cache to reduce reads.
 * For local development, it will first check environment variables.
 * @param key The key of the configuration value (document ID).
 * @returns The configuration value, or null if not found.
 */
export async function getConfigValue(key: string): Promise<string | null> {
  // For local development, prioritize .env variables for ease of use.
  if (process.env.NODE_ENV === 'development') {
    const localValue = process.env[key];
    if (localValue) {
      return localValue;
    }
  }

  // Check cache first
  const cachedItem = configCache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION_MS) {
    return cachedItem.value;
  }

  try {
    const docRef = doc(db, 'config', key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // The document has a single field named 'value'.
      const value = docSnap.data().value;
      if (typeof value === 'string') {
        // Update cache
        configCache.set(key, { value, timestamp: Date.now() });
        return value;
      }
    }
    console.warn(`Config value for key "${key}" not found in Firestore. This may not be an error if the value is determined dynamically.`);
    return null;
  } catch (error) {
    console.error(`Error fetching config value for key "${key}":`, error);
    return null;
  }
}
