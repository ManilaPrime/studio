
'use server';

import type { SyncedEvent, Unit, Booking, Platform } from '@/lib/types';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getUnit } from '@/services/units';
import { CalendarService } from '@/services/calendar';
import { callApi }from '@/services/utils';

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
    // When running in a static build (like for mobile), we need to call the API on the Vercel server.
    if (process.env.BUILD_TARGET === 'mobile') {
        console.log("Running in mobile build, calling API endpoint for sync.");
        return callApi('sync', { unitCalendars, unitId });
    }

    const unit = await getUnit(unitId);
    if(!unit) {
        throw new Error("Unit not found");
    }

    let allEvents: SyncedEvent[] = [];
    const calendarPromises: Promise<void>[] = [];

    const processCalendar = async (url: string, platform: Platform) => {
        if (url) {
            try {
                const events = await CalendarService.fetchAndParseCalendar(url);
                const platformEvents: SyncedEvent[] = events.map(e => ({...e, platform}));
                allEvents.push(...platformEvents);
            } catch (error) {
                console.error(`Error processing calendar for ${platform}:`, error);
                // Continue with other calendars even if one fails
            }
        }
    };

    calendarPromises.push(processCalendar(unitCalendars.airbnb, 'Airbnb'));
    calendarPromises.push(processCalendar(unitCalendars.bookingcom, 'Booking.com'));
    calendarPromises.push(processCalendar(unitCalendars.direct, 'Direct'));

    await Promise.all(calendarPromises);
    
    // Deduplicate UIDs and check against existing bookings
    const uidsToFetch = [...new Set(allEvents.map(e => e.uid))];
    const existingUIDs = await getExistingBookingUIDs(unitId, uidsToFetch);
    const newEvents = allEvents.filter(event => !existingUIDs.includes(event.uid));

    // Create bookings for new, non-existing events
    for (const event of newEvents) {
        await createBookingFromEvent(event, unit);
    }
    
    return allEvents;
}


