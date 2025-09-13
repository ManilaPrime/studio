
'use client';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { ReceiptSettings } from '@/lib/types';

const settingsDocRef = doc(db, 'settings', 'receipt');

export async function getReceiptSettings(): Promise<ReceiptSettings> {
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as ReceiptSettings;
    } else {
        // Return default settings if the document doesn't exist
        return {
            wifiNetwork: 'Manila Prime WiFi',
            contactEmail: 'primestaycation24@gmail.com',
            checkinTime: '3:00 PM',
            checkoutTime: '11:00 AM'
        };
    }
}

export async function updateReceiptSettings(settings: Partial<ReceiptSettings>): Promise<void> {
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
        await updateDoc(settingsDocRef, settings);
    } else {
        // If the document does not exist, create it.
        await setDoc(settingsDocRef, settings, { merge: true });
    }
}
