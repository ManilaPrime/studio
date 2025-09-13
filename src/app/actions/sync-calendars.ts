
'use server';

import type { SyncedEvent, Unit, Booking } from '@/lib/types';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getUnit } from '@/services/units';

// This function will run on the Vercel backend via an API call
async function getExistingBookingUIDs(unitId: string, uidsToFetch: string[]): Promise<string[]> {
    if (uidsToFetch.length === 0) {
        return [];
    }

    const bookingsCollection = collection(db, 'bookings');
    const batches: string[][] = [];
    for (let i = 0; i < uidsToFetch.length; i += 30) {
        batches.push(uidsToFetch.slice(i, i + 30));
    }

    const existingUIDs = new Set<string>();

    for (const batch of batches) {
        const q = query(
            bookingsCollection,
            where('unitId', '==', unitId),
            where('uid', 'in', batch)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const booking = doc.data() as Booking;
            if (booking.uid) {
                existingUIDs.add(booking.uid);
            }
        });
    }
    
    return Array.from(existingUIDs);
}

// This function will run on the Vercel backend via an API call
async function createBookingFromEvent(event: SyncedEvent, unit: Unit): Promise<void> {
    const bookingsCollection = collection(db, 'bookings');
    
    const newBookingData: Omit<Booking, 'id' | 'createdAt'> = {
        uid: event.uid,
        guestFirstName: "Synced",
        guestLastName: event.platform,
        guestPhone: "N/A",
        guestEmail: "N/A",
        unitId: unit.id!,
        checkinDate: event.start,
        checkoutDate: event.end,
        adults: 0,
        children: 0,
        nightlyRate: unit.rate,
        totalAmount: 0, 
        paymentStatus: 'paid',
        specialRequests: `Synced from ${event.platform}: ${event.summary}`,
    };

    const docRef = await addDoc(bookingsCollection, {
        ...newBookingData,
        createdAt: new Date().toISOString()
    });

    try {
        // The discord notification is also handled by the backend
        // This is a fire-and-forget call. We check for a function that only exists on the server.
        if (typeof (global as any).callApi === 'function') {
            (global as any).callApi('discord-notification', { booking: { ...newBookingData, id: docRef.id, createdAt: new Date().toISOString() }, unit });
        }
    } catch(error) {
        console.error("Failed to send Discord notification for synced event:", error);
    }
}


export async function syncCalendars(unitCalendars: Unit['calendars'], unitId: string): Promise<SyncedEvent[]> {
    // When running in a static build (like for mobile), we can't call the backend.
    // This check prevents errors during the mobile build process.
    if (typeof window !== 'undefined' && (window as any).Capacitor) {
        console.log("Calendar sync is disabled in native mobile app builds.");
        return [];
    }

    // The 'callApi' function will call our Vercel backend endpoint.
    // The backend endpoint will then perform the calendar fetching, parsing, and database operations.
    // This function is assumed to exist globally on the server.
    const result = await (global as any).callApi('sync-calendars', { unitCalendars, unitId });
    
    if (result.newEvents) {
        const unit = await getUnit(unitId);
        if(unit) {
            for (const event of result.newEvents) {
                // Backend handles creation, this loop is effectively a no-op on the client
                // but maintains structure.
            }
        }
    }
    
    // The backend returns the combined list of all events.
    return result.allEvents;
}
